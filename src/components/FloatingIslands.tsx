import { useMemo, useState } from 'react';
import { Heerich } from 'heerich';

const islandData = [
  { 
    id: 0, 
    title: 'Frontend', 
    skill: 'React & Vite', 
    color: '#06b6d4',
    details: ['React', 'Vue.js', 'TypeScript', 'HTML5/CSS3', 'Vite'],
    shape: 'pyramid',
    icon: '◢'
  },
  { 
    id: 1, 
    title: 'Backend', 
    skill: 'Node.js & Express', 
    color: '#7c3aed',
    details: ['Node.js', 'Express', 'EJS', 'Python', 'REST APIs'],
    shape: 'cube',
    icon: '◻'
  },
  { 
    id: 2, 
    title: 'DevOps', 
    skill: 'Docker & Cloud', 
    color: '#10b981',
    details: ['Docker', 'Git / GitHub', 'Vercel', 'Netlify'],
    shape: 'cylinder',
    icon: '◎'
  },
  { 
    id: 3, 
    title: 'Data', 
    skill: 'PostgreSQL & SQL', 
    color: '#f59e0b',
    details: ['PostgreSQL', 'PLpgSQL', 'Supabase', 'Database Design'],
    shape: 'hexagon',
    icon: '⬡'
  },
];

const FloatingIslands = () => {
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);

  const generateIslands = (selectedId: number | null) => {
    const islands: JSX.Element[] = [];
    
    islandData.forEach((island, index) => {
      const isSelected = selectedId === index;
      const isOtherSelected = selectedId !== null && !isSelected;
      
      // Circular arrangement - 4 islands in a circle
      const angle = (index * 90 - 90) * (Math.PI / 180); // Start from top
      const radius = 70;
      const x = 90 + Math.cos(angle) * radius;
      const y = 90 + Math.sin(angle) * radius;
      
      // Floating animation delay - each island bobs at different time
      const floatDelay = index * -0.5;
      
      // Scale up selected, scale down others
      const scale = isSelected ? 1.3 : isOtherSelected ? 0.6 : 1;
      const opacity = isOtherSelected ? 0.3 : 1;
      
      islands.push(
        <g 
          key={island.id}
          transform={`translate(${x}, ${y})`}
          style={{
            transformOrigin: `${x}px ${y}px`,
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: `translate(${x}px, ${y}px) scale(${scale})`,
            opacity
          }}
        >
          {/* Platform Base */}
          <g 
            className="island-clickable"
            data-island={island.id}
            style={{ cursor: 'pointer' }}
          >
            {/* Floating platform shadow */}
            <ellipse 
              cx={0} 
              cy={25} 
              rx={22} 
              ry={6} 
              fill={island.color}
              opacity={0.15}
              style={{
                animation: `shadowPulse 3s ease-in-out infinite`,
                animationDelay: `${floatDelay}s`
              }}
            />
            
            {/* Platform - isometric hexagonal platform */}
            <polygon
              points="0,-20 18,-10 18,10 0,20 -18,10 -18,-10"
              fill="#1a1a24"
              stroke={island.color}
              strokeWidth={isSelected ? 2 : 1}
              opacity={0.9}
              style={{
                animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${floatDelay}s`,
                filter: isSelected ? `drop-shadow(0 0 15px ${island.color})` : 'none'
              }}
            />
            
            {/* Platform top surface */}
            <polygon
              points="0,-15 13,-7.5 13,7.5 0,15 -13,7.5 -13,-7.5"
              fill="#232330"
              stroke={island.color}
              strokeWidth={1}
              opacity={0.6}
            />
            
            {/* Category Icon/Shape */}
            <g style={{
              animation: `float ${4 + index * 0.5}s ease-in-out infinite`,
              animationDelay: `${floatDelay - 0.2}s`
            }}>
              {island.shape === 'pyramid' && (
                <polygon
                  points="0,-8 7,5 -7,5"
                  fill={island.color}
                  opacity={0.85}
                  stroke="#fff"
                  strokeWidth={0.5}
                />
              )}
              {island.shape === 'cube' && (
                <rect
                  x={-6} y={-6}
                  width={12} height={12}
                  fill={island.color}
                  opacity={0.85}
                  stroke="#fff"
                  strokeWidth={0.5}
                  transform="rotate(45)"
                />
              )}
              {island.shape === 'cylinder' && (
                <ellipse
                  cx={0} cy={-2}
                  rx={7} ry={3}
                  fill={island.color}
                  opacity={0.85}
                  stroke="#fff"
                  strokeWidth={0.5}
                />
              )}
              {island.shape === 'hexagon' && (
                <polygon
                  points="0,-7 6,-3.5 6,3.5 0,7 -6,3.5 -6,-3.5"
                  fill={island.color}
                  opacity={0.85}
                  stroke="#fff"
                  strokeWidth={0.5}
                />
              )}
            </g>
            
            {/* Glow ring when selected */}
            {isSelected && (
              <circle
                cx={0} cy={0} r={28}
                fill="none"
                stroke={island.color}
                strokeWidth={1}
                opacity={0.6}
                style={{
                  animation: 'ringExpand 1s ease-out infinite'
                }}
              />
            )}
          </g>
          
          {/* Label below island */}
          {!isOtherSelected && (
            <text
              x={0}
              y={38}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize={isSelected ? 13 : 10}
              fontWeight={isSelected ? 700 : 500}
              style={{
                opacity: isSelected ? 1 : 0.7,
                transition: 'all 0.3s'
              }}
            >
              {island.title}
            </text>
          )}
        </g>
      );
    });
    
    return islands;
  };

  const selectedData = selectedIsland !== null ? islandData[selectedIsland] : null;

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      maxWidth: '320px', 
      margin: '0 auto',
      minHeight: '320px'
    }}>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes shadowPulse {
          0%, 100% { opacity: 0.15; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.1); }
        }
        @keyframes ringExpand {
          0% { r: 20; opacity: 0.8; }
          100% { r: 35; opacity: 0; }
        }
      `}</style>

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
          
          {/* Close button */}
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
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
          
          {/* Header */}
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
              {selectedData!.icon}
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
          
          {/* Skill Tags */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
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
      
      {/* Main SVG Canvas */}
      <svg
        viewBox="0 0 180 180"
        style={{
          width: '100%',
          height: 'auto',
          cursor: selectedIsland === null ? 'default' : 'default'
        }}
        onClick={(e) => {
          const target = e.target as SVGElement;
          const islandGroup = target.closest('.island-clickable');
          if (islandGroup) {
            const id = parseInt(islandGroup.getAttribute('data-island') || '0');
            setSelectedIsland(prev => prev === id ? null : id);
          }
        }}
      >
        {/* Background glow */}
        <defs>
          <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#0a0a12" stopOpacity="1" />
            <stop offset="100%" stopColor="#050508" stopOpacity="1" />
          </radialGradient>
        </defs>
        <rect width="180" height="180" fill="url(#bgGlow)" />
        
        {/* Floating Islands */}
        {generateIslands(selectedIsland)}
      </svg>
    </div>
  );
};

export default FloatingIslands;
