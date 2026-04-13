import { useMemo, useState, useEffect, useCallback, useRef } from 'react';
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

// GitHub's dark-mode contribution green palette
const COLORS = {
  base:   '#161b22',   // empty cell background
  level1: '#0e4429',   // low
  level2: '#006d32',   // medium
  level3: '#26a641',   // high
  level4: '#39d353',   // max
};

const COLOR_SCALE = [COLORS.base, COLORS.level1, COLORS.level2, COLORS.level3, COLORS.level4];

interface ActiveBox {
  w: number;       // week index
  di: number;      // day-of-week index within that week
  day: ContributionDay;
}

const GitHubGraph3D = () => {
  const [data, setData] = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

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
    const today = new Date().toISOString().split('T')[0];
    return data.contributions.filter(d => d.date <= today);
  }, [data]);

  const weeks = useMemo(() => {
    if (!filteredContributions.length) return [];
    return groupIntoWeeks(filteredContributions);
  }, [filteredContributions]);

  // Only render boxes for days that have actual contributions
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

  // Build 3D SVG — only active contribution days get boxes
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

  // Tooltip: after SVG renders, tag each polygon with its contribution data
  // by matching polygon centroids to the nearest known box screen-position.
  // Heerich depth-sorts faces, so polygon order ≠ insertion order.
  useEffect(() => {
    if (!svgContainerRef.current || !activeBoxes.length) return;

    const svg = svgContainerRef.current.querySelector('svg');
    if (!svg) return;

    const polygons = svg.querySelectorAll('polygon');
    if (!polygons.length) return;

    // Compute each polygon's screen-space centroid
    const polyCentroids: { el: SVGPolygonElement; cx: number; cy: number }[] = [];
    polygons.forEach(poly => {
      const pts = poly.getAttribute('points');
      if (!pts) return;
      const coords = pts.trim().split(/\s+/).map(p => {
        const [x, y] = p.split(',').map(Number);
        return { x, y };
      });
      const cx = coords.reduce((s, c) => s + c.x, 0) / coords.length;
      const cy = coords.reduce((s, c) => s + c.y, 0) / coords.length;
      polyCentroids.push({ el: poly, cx, cy });
    });

    // For each polygon centroid, find the nearest active box and tag it.
    // We approximate by rendering a single test box per active-box position
    // using a mini Heerich instance to get the screen-space center.
    // Instead, we cluster polygons: the 3 faces of a box share a common
    // bounding center. We cluster by proximity using the box grid positions.
    // With isometric projection, boxes at different (w, di) map to distinct
    // screen regions. We sort polygons into the nearest box by Euclidean distance.

    // Step 1: Compute approximate screen-space centers for each active box
    // by rendering each box individually with a fresh Heerich.
    const boxScreenCenters: { box: ActiveBox; cx: number; cy: number }[] = [];

    for (const box of activeBoxes) {
      const testH = new Heerich({
        tile: 16,
        camera: { type: 'isometric', angle: 45 }
      });
      const level = box.day.level;
      const height = 0.5 + level * 1.2;
      const color = COLOR_SCALE[level] || COLOR_SCALE[1];

      testH.applyGeometry({
        type: 'box',
        position: [box.w * 1.5, -height, box.di * 1.5],
        size: [1, height, 1],
        style: {
          default: { fill: color, stroke: color, strokeWidth: 0.5 },
          top: { fill: color, stroke: color, strokeWidth: 0.5 }
        }
      });

      const testSvg = testH.toSVG({ padding: 30 });
      const parser = new DOMParser();
      const doc = parser.parseFromString(testSvg, 'image/svg+xml');
      const testPolys = doc.querySelectorAll('polygon');
      let totalX = 0, totalY = 0, count = 0;
      testPolys.forEach(tp => {
        const pts = tp.getAttribute('points');
        if (!pts) return;
        const coords = pts.trim().split(/\s+/).map(p => {
          const [x, y] = p.split(',').map(Number);
          return { x, y };
        });
        coords.forEach(c => { totalX += c.x; totalY += c.y; count++; });
      });
      if (count > 0) {
        boxScreenCenters.push({ box, cx: totalX / count, cy: totalY / count });
      }
    }

    // Step 2: For each real polygon, find the nearest box by Euclidean distance
    // between the polygon's centroid and each box's screen center.
    // We need to account for the fact that the main SVG has all boxes combined,
    // so positions are in the same coordinate system (the padding and viewBox
    // are the same concept but shifted). The offset between individual-box SVGs
    // and the combined SVG is constant — we just need relative distances.
    // Since each individual SVG is rendered with padding:30, the viewBox adjusts.
    // In the combined SVG, the viewBox encompasses all boxes. We can't directly
    // compare absolute coords. Instead, use the RELATIVE position approach:
    // rank boxes by their grid position, which maps monotonically to screen position.

    // Simpler approach: use the grid-space coordinates directly.
    // In isometric 45° view:
    //   screen_x ∝ (w - di)    (columns go right, rows go left)
    //   screen_y ∝ (w + di)    (both go down)
    // So we can map each polygon's centroid to the closest (w, di) cell.

    // First find the viewBox of the actual SVG to normalize
    const viewBox = svg.getAttribute('viewBox');
    if (!viewBox) return;

    // Compute the expected isometric screen position relative to other boxes
    // using (w - di) for X-axis and (w + di) for Y-axis. Then normalize polygon
    // centroids the same way by fitting a linear transform.

    // Practical shortcut: sort all polygon centroids by (cx + cy) which
    // approximates depth in isometric view, group every 3 consecutive as one box,
    // and match to boxes sorted by depth (w + di).

    // Sort active boxes by depth: isometric depth ~ (w + di), breaking ties by di
    const sortedBoxes = [...activeBoxes].sort((a, b) => {
      const depthA = a.w + a.di;
      const depthB = b.w + b.di;
      if (depthA !== depthB) return depthA - depthB;
      return a.di - b.di;
    });

    // Sort polygon centroids by approximate depth (cy is strongly correlated with depth)
    // In isometric view, objects further from camera have LOWER y. As depth increases,
    // y increases (painted later = front). So sort by cy ascending = back-to-front.
    const sortedPolys = [...polyCentroids].sort((a, b) => a.cy - b.cy);

    // Group every 3 consecutive polygons → 1 box
    for (let i = 0; i < sortedPolys.length; i++) {
      const boxIdx = Math.floor(i / 3);
      const matchedBox = sortedBoxes[boxIdx];
      if (matchedBox) {
        sortedPolys[i].el.setAttribute('data-date', matchedBox.day.date);
        sortedPolys[i].el.setAttribute('data-count', String(matchedBox.day.count));
      }
    }
  }, [svgContent, activeBoxes]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    if (target.tagName !== 'polygon') {
      setTooltip(null);
      return;
    }

    const date = target.getAttribute('data-date');
    const count = target.getAttribute('data-count');
    if (!date || !count) {
      setTooltip(null);
      return;
    }

    const c = parseInt(count, 10);
    const text = `${formatDate(date)}: ${c} contribution${c !== 1 ? 's' : ''}`;

    const containerRect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      text,
      x: e.clientX - containerRect.left,
      y: e.clientY - containerRect.top - 14,
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // Stats from real data
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
          ref={svgContainerRef}
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
              filter: brightness(1.4);
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
