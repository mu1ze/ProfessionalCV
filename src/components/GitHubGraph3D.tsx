import { useMemo, useState, useCallback } from 'react';
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

function groupIntoWeeks(contributions: ContributionDay[]): ContributionDay[][] {
  const weeks: ContributionDay[][] = [];
  let currentWeek: ContributionDay[] = [];

  for (const day of contributions) {
    const d = new Date(day.date + 'T00:00:00');
    const dow = d.getUTCDay();

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

// GitHub dark-mode green palette
const COLORS = {
  level1: '#0e4429',
  level2: '#006d32',
  level3: '#26a641',
  level4: '#39d353',
};
const COLOR_SCALE = ['#161b22', COLORS.level1, COLORS.level2, COLORS.level3, COLORS.level4];

// Map fill color back to a level for tooltip lookups
const FILL_TO_LEVEL: Record<string, number> = {
  [COLORS.level1]: 1,
  [COLORS.level2]: 2,
  [COLORS.level3]: 3,
  [COLORS.level4]: 4,
};

interface ActiveBox {
  w: number;
  di: number;
  day: ContributionDay;
}

const GitHubGraph3D = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);

  // Fetch data on mount
  useState(() => {
    fetch(API_URL)
      .then(r => {
        if (!r.ok) throw new Error(`GitHub API returned ${r.status}`);
        return r.json();
      })
      .then((d: ContributionData) => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  });

  // Filter to only include days up through today
  const filteredContributions = useMemo(() => {
    if (!data) return [];
    const today = new Date().toISOString().split('T')[0];
    return data.contributions.filter(d => d.date <= today);
  }, [data]);

  const weeks = useMemo(() => {
    if (!filteredContributions.length) return [];
    return groupIntoWeeks(filteredContributions);
  }, [filteredContributions]);

  // Only render boxes for days with actual contributions
  const activeBoxes = useMemo((): ActiveBox[] => {
    const boxes: ActiveBox[] = [];
    for (let w = 0; w < weeks.length; w++) {
      for (let di = 0; di < weeks[w].length; di++) {
        if (weeks[w][di].count > 0) {
          boxes.push({ w, di, day: weeks[w][di] });
        }
      }
    }
    return boxes;
  }, [weeks]);

  // Build a lookup: given a level, return all active boxes at that level
  // grouped by their grid position for tooltip matching
  const levelToBoxes = useMemo(() => {
    const map = new Map<number, ActiveBox[]>();
    for (const box of activeBoxes) {
      const level = box.day.level;
      if (!map.has(level)) map.set(level, []);
      map.get(level)!.push(box);
    }
    return map;
  }, [activeBoxes]);

  // Build 3D SVG with embedded data attributes in the SVG string
  const svgContent = useMemo(() => {
    if (activeBoxes.length === 0) return '';

    const h = new Heerich({
      tile: 16,
      camera: { type: 'isometric', angle: 45 }
    });

    for (const box of activeBoxes) {
      const level = box.day.level;
      const height = 0.5 + level * 1.2;
      const color = COLOR_SCALE[level] || COLOR_SCALE[1];

      h.applyGeometry({
        type: 'box',
        position: [box.w * 1.5, -height, box.di * 1.5],
        size: [1, height, 1],
        style: {
          default: { fill: color, stroke: `${color}99`, strokeWidth: 0.5 },
          top: {
            fill: color,
            stroke: '#ffffff',
            strokeWidth: 1.2,
          }
        }
      });
    }

    return h.toSVG({ padding: 30 });
  }, [activeBoxes]);

  // Tooltip handler: read the fill color from the hovered polygon,
  // determine the contribution level, and show appropriate info.
  // For exact day matching, we find the nearest box at that level
  // by checking which polygon group we're closest to.
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName !== 'polygon') {
      setTooltip(null);
      return;
    }

    // Read the fill color from the polygon's inline style or attribute
    const fill = target.getAttribute('fill') || target.style?.fill || '';
    const normalizedFill = fill.toLowerCase().trim();

    // Try to match to a contribution level
    const level = FILL_TO_LEVEL[normalizedFill];
    if (!level) {
      setTooltip(null);
      return;
    }

    // Find matching boxes at this level
    const matchingBoxes = levelToBoxes.get(level);
    if (!matchingBoxes || matchingBoxes.length === 0) {
      setTooltip(null);
      return;
    }

    // If there's only one box at this level, we know exactly which day
    let text: string;
    if (matchingBoxes.length === 1) {
      const day = matchingBoxes[0].day;
      text = `${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
    } else {
      // Multiple boxes at same level — try to find the right one
      // by checking the polygon's screen position relative to the SVG.
      // In isometric view, x_screen ∝ (w - di), y_screen ∝ (w + di).
      // We use the centroid of the hovered polygon to approximate.
      const svg = target.closest('svg');
      if (svg) {
        const pts = target.getAttribute('points');
        if (pts) {
          const coords = pts.trim().split(/\s+/).map(p => {
            const [x, y] = p.split(',').map(Number);
            return { x, y };
          });
          const cx = coords.reduce((s, c) => s + c.x, 0) / coords.length;
          const cy = coords.reduce((s, c) => s + c.y, 0) / coords.length;

          // Score each matching box by how likely it is based on
          // the polygon's screen position. In isometric projection:
          //   screen_x increases as w increases and di decreases
          //   screen_y increases as w increases and di increases
          // So: w ∝ (cx + cy), di ∝ (cy - cx)
          // We rank boxes by how close their (w, di) → projected position
          // is to the polygon's centroid.
          let bestBox = matchingBoxes[0];
          let bestScore = Infinity;

          for (const box of matchingBoxes) {
            // Approximate projected position (relative, not absolute)
            const projX = (box.w - box.di);
            const projY = (box.w + box.di);
            // Normalize polygon centroid to similar scale
            // The exact scale doesn't matter — we just need relative ordering
            const score = Math.abs(cx - projX * 12) + Math.abs(cy - projY * 12);
            if (score < bestScore) {
              bestScore = score;
              bestBox = box;
            }
          }

          const day = bestBox.day;
          text = `${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
        } else {
          // Fallback: just show level info
          const totalAtLevel = matchingBoxes.reduce((s, b) => s + b.day.count, 0);
          text = `${matchingBoxes.length} days · ${totalAtLevel} contributions`;
        }
      } else {
        const day = matchingBoxes[0].day;
        text = `${formatDate(day.date)}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`;
      }
    }

    const containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      text,
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top - 14,
    });
  }, [levelToBoxes]);

  const handlePointerLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Stats
  const totalContributions = data?.total ? Object.values(data.total)[0] ?? 0 : 0;
  const activeDays = filteredContributions.filter(d => d.count > 0).length;
  const maxDay = filteredContributions.reduce((a, b) => b.count > a.count ? b : a, { date: '', count: 0, level: 0 });
  const currentStreak = useMemo(() => {
    if (!filteredContributions.length) return 0;
    const reversed = [...filteredContributions].reverse();
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
            Contribution <span style={{ color: '#39d353' }}>Matrix</span>
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
              (e.currentTarget as HTMLElement).style.background = 'rgba(38,166,65,0.08)';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(38,166,65,0.25)';
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
                background: 'linear-gradient(135deg, #26a641, #39d353)',
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
              filter: drop-shadow(0 15px 35px rgba(38, 166, 65, 0.15));
            }
            .heerich-graph-container polygon {
              transition: all 0.2s ease-out;
              cursor: pointer;
            }
            .heerich-graph-container polygon:hover {
              filter: brightness(1.5);
            }
            .contrib-tooltip {
              position: absolute;
              pointer-events: none;
              background: rgba(12, 12, 20, 0.95);
              border: 1px solid rgba(38, 166, 65, 0.5);
              color: #e2e8f0;
              padding: 8px 14px;
              border-radius: 10px;
              font-size: 0.8rem;
              font-weight: 500;
              white-space: nowrap;
              transform: translate(-50%, -100%);
              z-index: 50;
              backdrop-filter: blur(12px);
              box-shadow: 0 8px 24px rgba(0,0,0,0.4), 0 0 12px rgba(38,166,65,0.2);
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
              border-top: 6px solid rgba(38, 166, 65, 0.5);
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
              border: 3px solid rgba(38, 166, 65, 0.2);
              border-top-color: #26a641;
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
            {[COLORS.level1, COLORS.level2, COLORS.level3, COLORS.level4].map((color, i) => (
              <div
                key={i}
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '3px',
                  background: color,
                  border: `1px solid ${color}80`,
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
