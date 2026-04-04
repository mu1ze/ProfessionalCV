import { useMemo } from 'react';
import { Heerich } from 'heerich';
import { ScrollReveal } from './ScrollReveal';

const GitHubGraph3D = () => {
  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 16, 
      camera: { type: 'isometric', angle: 45 }
    });

    // Generate a mock contribution matrix (20 weeks x 7 days)
    const weeks = 22;
    const days = 7;
    
    // Color scale mapping to our redesign palette
    const colors = [
      '#12121a', // 0: empty
      '#4c1d95', // 1: low (dark violet)
      '#7c3aed', // 2: med (electric violet)
      '#c4b5fd', // 3: high (light violet)
      '#06b6d4'  // 4: max (cyan)
    ];

    // Seeded random for consistent render
    let seed = 12345;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    // Build the grid
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        // Create an interesting pattern (more activity towards the front/center)
        let activityScore = random() * 2 + (w / weeks) * 2 + (d === 3 ? 1 : 0);
        let level = Math.floor(activityScore);
        if (level > 4) level = 4;
        if (random() > 0.8) level = 0; // some empty spots

        const height = level === 0 ? 0.2 : level * 1.2;
        const color = colors[level];
        const strokeColor = level === 0 ? '#1f1f2e' : `${color}80`;

        h.applyGeometry({
          type: 'box',
          // Note: Y points down in Heerich, so we start at -height to grow "up" from the 0 plane
          position: [w * 1.5, -height, d * 1.5],
          size: [1, height, 1],
          style: {
            default: { fill: color, stroke: strokeColor, strokeWidth: 0.5 },
            top: { fill: level === 0 ? '#1a1a24' : color, stroke: level === 0 ? '#2a2a35' : '#ffffff', strokeWidth: level === 0 ? 0.5 : 1.2 }
          }
        });
      }
    }

    return h.toSVG({ padding: 30 });
  }, []);

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
            A 3D visualization of my recent code commits.
          </p>
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
            position: 'relative'
          }}
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
            }
            .heerich-graph-container polygon:hover {
              fill: #06b6d4 !important;
              filter: brightness(1.3);
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: svgContent }} style={{ width: '100%', display: 'flex', justifyContent: 'center' }} />
        </div>
      </ScrollReveal>
    </section>
  );
};

export default GitHubGraph3D;
