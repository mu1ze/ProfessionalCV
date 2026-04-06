import { useMemo, useState, useEffect } from 'react';
import { Heerich } from 'heerich';

const bladesData = [
  { id: 0, title: 'Database', skill: 'PostgreSQL & SQL', color: '#f59e0b', top: '75%' },
  { id: 1, title: 'DevOps', skill: 'Docker & AWS', color: '#10b981', top: '55%' },
  { id: 2, title: 'Backend', skill: 'Node.js & Express', color: '#7c3aed', top: '35%' },
  { id: 3, title: 'Frontend', skill: 'React & Vite', color: '#06b6d4', top: '15%' },
];

const ServerRack3D = () => {
  const [activeBlade, setActiveBlade] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;

  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 18, 
      camera: { type: 'isometric', angle: -45 }
    });

    h.applyGeometry({
      type: 'box',
      position: [0, 0, 0],
      size: [6, 14, 5],
      style: {
        default: { fill: '#0a0a0f', stroke: '#1f1f2e', strokeWidth: 1 },
        top: { fill: '#12121a' }
      }
    });

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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    let target = e.target as HTMLElement;
    while (target && target !== e.currentTarget) {
      if (target.hasAttribute('data-blade')) {
        const bladeId = Number(target.getAttribute('data-blade'));
        setActiveBlade(prev => prev === bladeId ? null : bladeId);
        return;
      }
      target = target.parentElement as HTMLElement;
    }
    setActiveBlade(null);
  };

  // Desktop: label to the left, Mobile: label above
  const containerWidth = isMobile ? '180px' : '320px';
  const labelPosition = isMobile 
    ? { top: '-90px', left: '50%', transform: 'translateX(-50%)' }
    : { top: blade => blade.top, left: '-15%', transform: 'translate(-30px, -50%)' };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: containerWidth, 
      margin: '0 auto',
      paddingTop: isMobile ? '100px' : '0' // space for label on mobile
    }}>
      {/* Floating Skill Labels - Above on mobile, Side on desktop */}
      {bladesData.map((blade) => (
        <div
          key={blade.id}
          style={{
            position: 'absolute',
            ...(isMobile 
              ? { top: `-${(3 - blade.id) * 70 + 30}px`, left: '50%', transform: 'translateX(-50%)' }
              : { top: blade.top, left: '-15%', transform: 'translate(-30px, -50%)' }
            ),
            background: 'rgba(10, 10, 15, 0.92)',
            border: `1px solid ${blade.color}40`,
            padding: isMobile ? '10px 16px' : '14px 18px',
            borderRadius: '12px',
            pointerEvents: 'none',
            opacity: activeBlade === blade.id ? 1 : 0,
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            boxShadow: `0 10px 30px ${blade.color}25`,
            backdropFilter: 'blur(10px)',
            zIndex: 20,
            minWidth: isMobile ? '160px' : '180px',
            textAlign: 'center'
          }}
        >
          <div style={{ 
            fontSize: isMobile ? '0.65rem' : '0.75rem', 
            color: blade.color, 
            fontWeight: 700, 
            textTransform: 'uppercase', 
            letterSpacing: '0.05em', 
            marginBottom: '6px' 
          }}>
            {blade.title}
          </div>
          <div style={{ 
            color: '#ffffff', 
            fontSize: isMobile ? '0.9rem' : '1.05rem', 
            fontWeight: 600 
          }}>
            {blade.skill}
          </div>
        </div>
      ))}

      {/* SVG Rack */}
      <div 
        className={`server-rack-wrapper active-${activeBlade}`}
        onClick={handleClick}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          filter: 'drop-shadow(0 20px 40px rgba(6, 182, 212, 0.15))',
          cursor: 'pointer'
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
            transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.2s;
          }
          .server-rack-wrapper polygon[data-blade]:hover {
            filter: brightness(1.3);
          }
          
          @media (min-width: 640px) {
            .server-rack-wrapper.active-0 polygon[data-blade="0"],
            .server-rack-wrapper.active-1 polygon[data-blade="1"],
            .server-rack-wrapper.active-2 polygon[data-blade="2"],
            .server-rack-wrapper.active-3 polygon[data-blade="3"] {
              transform: translate(-35px, 20px);
            }
          }
          
          @media (max-width: 639px) {
            .server-rack-wrapper.active-0 polygon[data-blade="0"],
            .server-rack-wrapper.active-1 polygon[data-blade="1"],
            .server-rack-wrapper.active-2 polygon[data-blade="2"],
            .server-rack-wrapper.active-3 polygon[data-blade="3"] {
              transform: translate(-18px, 10px);
            }
          }
        `}</style>
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>
    </div>
  );
};

export default ServerRack3D;
