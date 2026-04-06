import { useMemo, useState, useEffect } from 'react';
import { Heerich } from 'heerich';

const islandData = [
  { 
    id: 0, 
    title: 'Frontend', 
    skill: 'React & Vite', 
    color: '#06b6d4',
    details: ['React', 'Vue.js', 'TypeScript', 'HTML5/CSS3', 'Vite'],
    shape: 'pyramid'
  },
  { 
    id: 1, 
    title: 'Backend', 
    skill: 'Node.js & Express', 
    color: '#7c3aed',
    details: ['Node.js', 'Express', 'EJS', 'Python', 'REST APIs'],
    shape: 'cube'
  },
  { 
    id: 2, 
    title: 'DevOps', 
    skill: 'Docker & Cloud', 
    color: '#10b981',
    details: ['Docker', 'Git / GitHub', 'Vercel', 'Netlify'],
    shape: 'cylinder'
  },
  { 
    id: 3, 
    title: 'Data', 
    skill: 'PostgreSQL & SQL', 
    color: '#f59e0b',
    details: ['PostgreSQL', 'PLpgSQL', 'Supabase', 'Database Design'],
    shape: 'crystal'
  },
];

// Generate 3D island SVG using Heerich
const generateIsland3D = (shape: string, color: string, time: number) => {
  const h = new Heerich({
    tile: 14,
    camera: { type: 'isometric', angle: -45 }
  });

  // Floating animation offset based on time
  const floatY = Math.sin(time * 2) * 0.3;

  if (shape === 'cube') {
    // Rotating cube with pulsing edges
    const rotation = Math.sin(time * 0.5) * 0.1;
    h.applyGeometry({
      type: 'box',
      position: [0, floatY, 0],
      size: [3, 3, 3],
      style: {
        default: { fill: color, stroke: '#ffffff', strokeWidth: 0.5 },
        top: { fill: color, stroke: '#ffffff', strokeWidth: 0.5 }
      }
    });
    // Inner glowing core
    h.applyGeometry({
      type: 'box',
      position: [0, floatY, 0],
      size: [1.5, 1.5, 1.5],
      style: { default: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 } }
    });
  } 
  else if (shape === 'pyramid') {
    // Tetrahedron/pyramid
    h.applyGeometry({
      type: 'pyramid',
      position: [0, floatY, 0],
      size: 3.5,
      style: {
        default: { fill: color, stroke: '#ffffff', strokeWidth: 0.5 },
        top: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 }
      }
    });
    // Base platform
    h.applyGeometry({
      type: 'box',
      position: [0, floatY - 2, 0],
      size: [3, 0.3, 3],
      style: { default: { fill: '#1a1a24', stroke: color, strokeWidth: 0.5 } }
    });
  }
  else if (shape === 'cylinder') {
    // Cylinder with rings
    h.applyGeometry({
      type: 'cylinder',
      position: [0, floatY, 0],
      radius: 1.5,
      height: 3,
      style: {
        default: { fill: color, stroke: '#ffffff', strokeWidth: 0.5 },
        top: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 }
      }
    });
    // Ring decoration
    h.applyGeometry({
      type: 'torus',
      position: [0, floatY, 0],
      radius: 2,
      tube: 0.15,
      style: { default: { fill: color, stroke: '#ffffff', strokeWidth: 0.3 } }
    });
  }
  else if (shape === 'crystal') {
    // Elongated crystal/double pyramid
    h.applyGeometry({
      type: 'pyramid',
      position: [0, floatY, 0],
      size: 4,
      style: {
        default: { fill: color, stroke: '#ffffff', strokeWidth: 0.5 },
        top: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 }
      }
    });
    // Floating facets
    h.applyGeometry({
      type: 'box',
      position: [-1.5, floatY, 1.5],
      size: [0.8, 2, 0.8],
      style: { default: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 } }
    });
    h.applyGeometry({
      type: 'box',
      position: [1.5, floatY, -1.5],
      size: [0.8, 2, 0.8],
      style: { default: { fill: '#ffffff', stroke: color, strokeWidth: 0.3 } }
    });
  }

  return h.toSVG({ padding: 8 };
};

const FloatingIslands = () => {
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  // Animation loop for real-time 3D updates
  useEffect(() => {
    if (selectedIsland !== null) {
      // Slow down animation when one is selected
      const interval = setInterval(() => {
        setTime(t => t + 0.016);
      }, 50);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => {
        setTime(t => t + 0.03);
      }, 30);
      return () => clearInterval(interval);
    }
  }, [selectedIsland]);

  const selectedData = selectedIsland !== null ? islandData[selectedIsland] : null;

  // Calculate positions - circular arrangement
  const getPosition = (index: number) => {
    const angle = (index * 90 - 90) * (Math.PI / 180);
    const radius = 90;
    return {
      x: 180 + Math.cos(angle) * radius,
      y: 180 + Math.sin(angle) * radius
    };
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '400px', 
      margin: '0 auto',
      minHeight: '400px'
    }}>
      {/* Selected Island Detail Panel */}
      {selectedIsland !== null && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'rgba(10, 10, 15, 0.95)',
            border: `1px solid ${selectedData!.color}40`,
            borderRadius: '20px',
            padding: '24px',
            zIndex: 20,
            backdropFilter: 'blur(12px)',
            animation: 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <style>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px) scale(0.95); }
              to { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
          
          <button
            onClick={() => setSelectedIsland(null)}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255,255,255,0.05)',
              border: 'none',
              color: '#64748b',
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ✕
          </button>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '16px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: `${selectedData!.color}20`,
              border: `1px solid ${selectedData!.color}40`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: selectedData!.color
            }}>
              ◆
            </div>
            <div>
              <div style={{
                fontSize: '0.7rem',
                color: selectedData!.color,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}>
                {selectedData!.title}
              </div>
              <div style={{
                fontSize: '1.1rem',
                color: '#fff',
                fontWeight: 600
              }}>
                {selectedData!.skill}
              </div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {selectedData!.details.map((skill, i) => (
              <span
                key={i}
                style={{
                  padding: '6px 14px',
                  background: `${selectedData!.color}12`,
                  border: `1px solid ${selectedData!.color}25`,
                  borderRadius: '100px',
                  fontSize: '0.8rem',
                  color: '#cbd5e1',
                  fontWeight: 500
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* 3D Islands Canvas */}
      <svg
        viewBox="0 0 360 360"
        style={{
          width: '100%',
          height: 'auto',
          cursor: selectedIsland === null ? 'pointer' : 'default'
        }}
        onClick={(e) => {
          if (selectedIsland !== null) return;
          const target = e.target as SVGElement;
          const group = target.closest('[data-island]');
          if (group) {
            const id = parseInt(group.getAttribute('data-island') || '0');
            setSelectedIsland(prev => prev === id ? null : id);
          }
        }}
      >
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a0a12" />
            <stop offset="100%" stopColor="#050508" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <rect width="360" height="360" fill="url(#bgGlow)" />

        {/* Render 3D islands */}
        {islandData.map((island, index) => {
          const pos = getPosition(index);
          const isSelected = selectedIsland === index;
          const isOtherSelected = selectedIsland !== null && !isSelected;
          
          const scale = isSelected ? 1.4 : isOtherSelected ? 0.5 : 1;
          const opacity = isOtherSelected ? 0.2 : 1;
          
          return (
            <g
              key={island.id}
              data-island={island.id}
              transform={`translate(${pos.x}, ${pos.y})`}
              style={{
                transformOrigin: `${pos.x}px ${pos.y}px`,
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                opacity,
                filter: isSelected ? `drop-shadow(0 0 20px ${island.color})` : 'none'
              }}
            >
              {/* Shadow */}
              <ellipse
                cx={0} cy={25} rx={20} ry={8}
                fill={island.color}
                opacity={isSelected ? 0.3 : 0.15}
              />
              
              {/* 3D Heerich Render */}
              <g transform="translate(-18, -30)">
                <foreignObject width="36" height="60">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: generateIsland3D(island.shape, island.color, time + index * 1.5)
                    }}
                    style={{ width: '100%', height: '100%' }}
                  />
                </foreignObject>
              </g>
              
              {!isOtherSelected && (
                <text
                  x={0}
                  y={45}
                  textAnchor="middle"
                  fill="#94a3b8"
                  fontSize={isSelected ? 14 : 11}
                  fontWeight={isSelected ? 700 : 500}
                  style={{ opacity: isSelected ? 1 : 0.7 }}
                >
                  {island.title}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default FloatingIslands;
