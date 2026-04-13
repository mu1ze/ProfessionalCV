import { useMemo, useState, useEffect, useCallback } from 'react';
import { Heerich } from 'heerich';
import { ScrollReveal } from './ScrollReveal';

const GITHUB_USERNAME = 'mu1ze';
const CURRENT_YEAR = new Date().getFullYear();
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=${CURRENT_YEAR}`;

interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0-4
}

interface ContributionData {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

// Group contributions into weeks (columns), each with up to 7 days (rows)
function groupIntoWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  for (const day of contributions) {
    const d = new Date(day.date + 'T00:00:00');
    const dow = d.getUTCDay(); // 0=Sun

    if (dow === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  return weeks;
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_LABELS[d.getUTCDay()]}, ${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

const GitHubGraph3D = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(API_URL)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API returned ${r.status}`);
        return r.json();
      })
      .then((d: ContributionData) => {
        if (!cancelled) {
          setData(d);
          setLoading(false);
        }
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, []);

  // Filter to only include days up through today
  const filteredContributions = useMemo(() => {
    if (!data) return [];
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    return data.contributions.filter(d => d.date <= today);
  }, [data]);

  const weeks = useMemo(() => {
    if (!filteredContributions.length) return [];
    return groupIntoWeeks(filteredContributions);
  }, [filteredContributions]);

  // Build 3D SVG from real data
  const svgContent = useMemo(() => {
    if (!data || weeks.length === 0) return '';

    const h = new Heerich({
      tile: 16,
      camera: { type: 'isometric', angle: 45 }
    });

    const colors = [
      '#12121a', // 0: no contributions
      '#4c1d95', // 1: low (dark violet)
      '#7c3aed', // 2: medium (electric violet)
      '#c4b5fd', // 3: high (light violet)
      '#06b6d4'  // 4: max (cyan)
    ];

    for (let w = 0; w < weeks.length; w++) {
      const week = weeks[w];
      for (let di = 0; di < week.length; di++) {
        const day = week[di];
        const level = day.level;
        const height = level === 0 ? 0.2 : level * 1.2;
        const color = colors[level];
        const strokeColor = level === 0 ? '#1f1f2e' : `${color}80`;

        h.applyGeometry({
          type: 'box',
          position: [w * 1.5, -height, di * 1.5],
          size: [1, height, 1],
          style: {
            default: { fill: color, stroke: strokeColor, strokeWidth: 0.5 },
            top: {
              fill: level === 0 ? '#1a1a24' : color,
              stroke: level === 0 ? '#2a2a35' : '#ffffff',
              strokeWidth: level === 0 ? 0.5 : 1.2
            }
          }
        });
      }
    }

    return h.toSVG({ padding: 30 });
  }, [data, weeks]);

  // Map from SVG polygon index to contribution data for tooltips
  // Heerich renders 3 faces per box (top, left, right) in order, but we
  // only care about matching — we build a flat index per-box.
  const boxDataMap = useMemo(() => {
    if (!weeks.length) return [];
    const map: ContributionDay[] = [];
    for (let w = 0; w < weeks.length; w++) {
      for (let di = 0; di < weeks[w].length; di++) {
        map.push(weeks[w][di]);
      }
    }
    return map;
  }, [weeks]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName !== 'polygon') {
      setTooltip(null);
      return;
    }

    // Each box generates 3 polygons; find the box index
    const svg = target.closest('svg');
    if (!svg) return;
    const polygons = svg.querySelectorAll('polygon');
    const idx = Array.from(polygons).indexOf(target as SVGPolygonElement);
    if (idx === -1) return;

    const boxIdx = Math.floor(idx / 3);
    const day = boxDataMap[boxIdx];
    if (!day) return;

    const text = `${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
    
    const containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      text,
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top - 14,
    });
  }, [boxDataMap]);

  const handlePointerLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Stats from real data — use the year key from the API response
  const totalContributions = data?.total ? Object.values(data.total)[0] ?? 0 : 0;
  const activeDays = filteredContributions.filter(d => d.count > 0).length;
  const maxDay = filteredContributions.reduce((a, b) => b.count > a.count ? b : a, { date: '', count: 0, level: 0 });
  const currentStreak = useMemo(() => {
    if (!filteredContributions.length) return 0;
    const reversed = [...filteredContributions].reverse();
    // skip today if it's 0 (day not over yet)
    const start = reversed[0]?.count === 0 ? 1 : 0;
    let streak = 0;
    for (let i = start; i < reversed.length; i++) {
      if (reversed[i].count > 0) streak++;
      else break;
    }
    return streak;
  }, [filteredContributions]);

  return (
    <section style={{
      padding: '80px 32px 120px',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
    }}>
      <ScrollReveal width="100%">
        <div style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            marginBottom: '12px',
          }}>
            Contribution <span style={{ color: '#06b6d4' }}>Matrix</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Live data from my GitHub — {CURRENT_YEAR} commit activity.
          </p>
        </div>
      </ScrollReveal>

      {/* Stats Row */}
      <ScrollReveal width="100%" delay={0.15}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
          maxWidth: '700px',
          margin: '0 auto 32px',
        }}>
          {[
            { label: 'Contributions', value: loading ? '—' : totalContributions, icon: '📊' },
            { label: 'Active Days', value: loading ? '—' : activeDays, icon: '🔥' },
            { label: 'Current Streak', value: loading ? '—' : `${currentStreak}d`, icon: '⚡' },
            { label: 'Best Day', value: loading ? '—' : maxDay?.count ?? 0, sub: maxDay?.date ? formatDate(maxDay.date).split(',')[1]?.trim() : '', icon: '🏆' },
          ].map((stat) => (
            <div key={stat.label} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '16px',
              padding: '20px 16px',
              textAlign: 'center',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(124,58,237,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(124,58,237,0.25)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{stat.icon}</div>
              <div style={{
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontWeight: 800,
                background: 'linear-gradient(135deg, #c4b5fd, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                lineHeight: 1.1,
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
              {stat.sub && (
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px', opacity: 0.7 }}>
                  {stat.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal width="100%" delay={0.2}>
        <div
          className="heerich-graph-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            overflow: 'visible',
            background: 'rgba(255,255,255,0.01)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '24px',
            padding: '40px 20px',
            position: 'relative',
            minHeight: '300px',
          }}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <style>{`
            .heerich-graph-container svg {
              width: 100%;
              max-width: 900px;
              height: auto;
              overflow: visible;
              filter: drop-shadow(0 15px 35px rgba(124, 58, 237, 0.15));
            }
            .heerich-graph-container polygon {
              transition: all 0.2s ease-out;
              cursor: pointer;
            }
            .heerich-graph-container polygon:hover {
              filter: brightness(1.4);
            }
            .contrib-tooltip {
              position: absolute;
              pointer-events: none;
              background: rgba(12, 12, 20, 0.95);
              border: 1px solid rgba(124, 58, 237, 0.4);
              color: #e2e8f0;
              padding: 8px 14px;
              border-radius: 10px;
              font-size: 0.8rem;
              font-weight: 500;
              white-space: nowrap;
              transform: translate(-50%, -100%);
              z-index: 50;
              backdrop-filter: blur(12px);
              box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(124,58,237,0.2);
              letter-spacing: 0.01em;
            }
            .contrib-tooltip::after {
              content: '';
              position: absolute;
              bottom: -6px;
              left: 50%;
              transform: translateX(-50%);
              width: 0; height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid rgba(124, 58, 237, 0.4);
            }
            .contrib-loading {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 16px;
              color: var(--text-muted);
              font-size: 0.95rem;
            }
            .contrib-spinner {
              width: 36px;
              height: 36px;
              border: 3px solid rgba(124, 58, 237, 0.2);
              border-top-color: #7c3aed;
              border-radius: 50%;
              animation: spin 0.8s linear infinite;
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .contrib-error {
              color: #f87171;
              text-align: center;
              font-size: 0.9rem;
            }
          `}</style>

          {/* Tooltip */}
          {tooltip && (
            <div
              className="contrib-tooltip"
              style={{ left: tooltip.x, top: tooltip.y }}
            >
              {tooltip.text}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="contrib-loading">
              <div className="contrib-spinner" />
              <span>Loading contribution data…</span>
            </div>
          ) : error ? (
            <div className="contrib-error">
              <p>Failed to load contributions</p>
              <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>{error}</p>
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
          )}
        </div>
      </ScrollReveal>

      {/* Legend */}
      {!loading && !error && (
        <ScrollReveal width="100%" delay={0.3}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
            marginTop: '20px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}>
            <span>Less</span>
            {['#12121a', '#4c1d95', '#7c3aed', '#c4b5fd', '#06b6d4'].map((color, i) => (
              <div
                key={i}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  background: color,
                  border: `1px solid ${i === 0 ? '#2a2a35' : color + '80'}`,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </ScrollReveal>
      )}
    </section>
  );
};

export default GitHubGraph3D;
