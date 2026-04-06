import { useMemo, useState } from 'react';
import { Heerich } from 'heerich';

const bladesData = [
  { 
    id: 0, 
    title: 'Database', 
    skill: 'PostgreSQL & SQL', 
    color: '#f59e0b',
    details: ['PostgreSQL', 'PLpgSQL', 'Supabase', 'RESTful APIs']
  },
  { 
    id: 1, 
    title: 'DevOps', 
    skill: 'Docker & AWS', 
    color: '#10b981',
    details: ['Docker', 'Git / GitHub', 'Vite', 'Vercel']
  },
  { 
    id: 2, 
    title: 'Backend', 
    skill: 'Node.js & Express', 
    color: '#7c3aed',
    details: ['Node.js', 'Express', 'EJS', 'Python']
  },
  { 
    id: 3, 
    title: 'Frontend', 
    skill: 'React & Vite', 
    color: '#06b6d4',
    details: ['React', 'Vue.js', 'TypeScript', 'HTML5/CSS3']
  },
];

const ServerRack3D = () => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [zoomedBlade, setZoomedBlade] = useState<number | null>(null);
  const [isZooming, setIsZooming] = useState(false);

  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 18, 
      camera: { type: 'isometric', angle: -45 }
    });

    // Base Rack Cabinet
    h.applyGeometry({
      type: 'box',
      position: [0, 0, 0],
      size: [6, 14, 5],
      style: {
        default: { fill: '#0a0a0f', stroke: '#1f1f2e', strokeWidth: 1 },
        top: { fill: '#12121a' }
      }
    });

    // Carve out the front bay
    h.removeGeometry({
      type: 'box',
      position: [0.5, 1, -0.1],
      size: [5, 12, 4],
      style: { default: { fill: '#050508', stroke: '#111' } }
    });

    const bladeYPositions = [10.5, 7.5, 4.5, 1.5];
    
    bladeYPositions.forEach((y, i) => {
      h.applyGeometry({
        type: 'box',
        position: [0.8, y, 0],
        size: [4.4, 1.5, 3.5],
        meta: { blade: i },
        style: {
          default: { fill: '#1a1a24', stroke: '#2a2a35', strokeWidth: 0.5 },
          front: { fill: '#232330' },
          top: { fill: '#1e1e28' }
        }
      });

      const lightColor = bladesData[i].color;
      
      h.applyGeometry({
        type: 'box',
        position: [1.2, y + 0.5, -0.2],
        size: [0.4, 0.4, 0.3],
        meta: { blade: i },
        style: { default: { fill: lightColor, stroke: '#fff', strokeWidth: 0.5 } }
      });

      h.applyGeometry({
        type: 'box',
        position: [2.0, y + 0.5, -0.2],
        size: [0.4, 0.4, 0.3],
        meta: { blade: i },
        style: { default: { fill: '#ffffff', stroke: lightColor, strokeWidth: 0.5 } }
      });
    });

    h.applyGeometry({
      type: 'line',
      from: [5, 2, 4],
      to: [5, 12, 4],
      radius: 0.2,
      shape: 'rounded',
      style: { default: { fill: '#ef4444' } }
    });
    
    h.applyGeometry({
      type: 'line',
      from: [4.5, 5, 4],
      to: [4.5, 12, 4],
      radius: 0.2,
      shape: 'rounded',
      style: { default: { fill: '#06b6d4' } }
    });

    return h.toSVG({ padding: 20 });
  }, []);

  const handleBladeClick = (bladeId: number) => {
    if (zoomedBlade === bladeId) {
      // Zoom out
      setIsZooming(true);
      setZoomLevel(1);
      setTimeout(() => {
        setZoomedBlade(null);
        setIsZooming(false);
      }, 400);
    } else {
      // Zoom in to this blade
      setIsZooming(true);
      setZoomedBlade(bladeId);
      setZoomLevel(2.5);
      setTimeout(() => setIsZooming(false), 400);
    }
  };

  const activeBladeData = zoomedBlade !== null ? bladesData[zoomedBlade] : null;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '340px', 
      margin: '0 auto'
    }}>
      {/* Zoomed-in Skill Detail Blocks */}
      {zoomedBlade !== null && !isZooming && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          animation: 'fadeSlideIn 0.4s ease-out'
        }}>
          <style>{`
            @keyframes fadeSlideIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          
          {/* Back button */}
          <button
            onClick={() => handleBladeClick(zoomedBlade)}
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backdropFilter: 'blur(10px)'
            }}
          >
            ← Back to Rack
          </button>

          {/* Header */}
          <div style={{
            background: 'var(--bg-card)',
            border: `1px solid ${activeBladeData!.color}40`,
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '12px'
          }}>
            <div style={{ 
              fontSize: '0.75rem', 
              color: activeBladeData!.color, 
              fontWeight: 700, 
              textTransform: 'uppercase', 
              letterSpacing: '0.05em',
              marginBottom: '4px'
            }}>
              {activeBladeData!.title}
            </div>
            <div style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700 }}>
              {activeBladeData!.skill}
            </div>
          </div>

          {/* Skill Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {activeBladeData!.details.map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: '8px 14px',
                  background: `${activeBladeData!.color}12`,
                  border: `1px solid ${activeBladeData!.color}30`,
                  borderRadius: '100px',
                  fontSize: '0.85rem',
                  color: '#e2e8f0',
                  fontWeight: 500
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Server Rack SVG */}
      <div 
        className={`server-rack-wrapper zoom-${zoomedBlade}`}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          filter: 'drop-shadow(0 20px 40px rgba(6, 182, 212, 0.15))',
          cursor: zoomedBlade === null ? 'pointer' : 'default',
          opacity: isZooming ? 0.5 : zoomedBlade !== null ? 0.3 : 1,
          transition: 'opacity 0.3s, transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `scale(${zoomLevel})`,
          transformOrigin: 'center center'
        }}
        onClick={(e) => {
          if (zoomedBlade !== null || isZooming) return;
          let target = e.target as HTMLElement;
          while (target && target !== e.currentTarget) {
            if (target.hasAttribute('data-blade')) {
              handleBladeClick(Number(target.getAttribute('data-blade')));
              return;
            }
            target = target.parentElement as HTMLElement;
          }
        }}
      >
        <style>{`
          .server-rack-wrapper svg {
            width: 100%;
            height: auto;
            overflow: visible;
            animation: float-rack 8s ease-in-out infinite;
          }
          @keyframes float-rack {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          .server-rack-wrapper polygon[data-blade] {
            transition: filter 0.2s;
          }
          .server-rack-wrapper polygon[data-blade]:hover {
            filter: brightness(1.3);
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
    </div>
  );
};

export default ServerRack3D;
