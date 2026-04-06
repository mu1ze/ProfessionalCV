import { useState, useEffect } from 'react';

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

// Pure SVG 3D-like shapes with animation
const IslandShape = ({ shape, color, time }: { shape: string; color: string; time: number }) => {
  const floatY = Math.sin(time * 2) * 3;
  const pulse = 0.8 + Math.sin(time * 3) * 0.2;
  
  if (shape === 'cube') {
    const rotate = Math.sin(time * 0.5) * 15;
    return (
      <g transform={`translate(0, ${floatY})`}>
        {/* Back face */}
        <polygon points="18,25 32,17 32,35 18,43" fill={color} opacity={0.6} transform={`rotate(${rotate}, 25, 30)`} />
        {/* Top face */}
        <polygon points="18,25 32,17 25,10 11,18" fill={color} opacity={0.9} transform={`rotate(${rotate}, 25, 30)`} />
        {/* Front face */}
        <polygon points="11,18 25,10 25,28 11,36" fill={color} opacity={1} transform={`rotate(${rotate}, 25, 30)`} />
        {/* Side face */}
        <polygon points="25,10 32,17 32,35 25,28" fill={color} opacity={0.75} transform={`rotate(${rotate}, 25, 30)`} />
        {/* Inner glow */}
        <polygon points="20,26 28,21 28,33 20,38" fill="#fff" opacity={pulse * 0.4} transform={`rotate(${rotate}, 25, 30)`} />
      </g>
    );
  }
  
  if (shape === 'pyramid') {
    return (
      <g transform={`translate(0, ${floatY})`}>
        {/* Base */}
        <polygon points="8,45 42,45 32,30 18,30" fill="#1a1a24" stroke={color} strokeWidth="1" />
        {/* Left face */}
        <polygon points="25,8 8,45 18,30" fill={color} opacity={0.85} />
        {/* Right face */}
        <polygon points="25,8 42,45 32,30" fill={color} opacity={0.7} />
        {/* Front face */}
        <polygon points="25,8 18,30 32,30" fill="#fff" opacity={pulse * 0.3} />
      </g>
    );
  }
  
  if (shape === 'cylinder') {
    return (
      <g transform={`translate(0, ${floatY})`}>
        {/* Top ellipse */}
        <ellipse cx="25" cy="12" rx="14" ry="5" fill={color} opacity={0.9} />
        {/* Body */}
        <rect x="11" y="12" width="28" height="30" fill={color} opacity={0.75} />
        {/* Bottom ellipse */}
        <ellipse cx="25" cy="42" rx="14" ry="5" fill={color} opacity={0.6} />
        {/* Ring */}
        <ellipse cx="25" cy="25" rx="18" ry="6" fill="none" stroke={color} strokeWidth="1.5" opacity={pulse} />
      </g>
    );
  }
  
  // crystal - hexagon-like
  return (
    <g transform={`translate(0, ${floatY})`}>
      {/* Left facet */}
      <polygon points="25,5 12,20 12,35 25,50" fill={color} opacity={0.7} />
      {/* Right facet */}
      <polygon points="25,5 38,20 38,35 25,50" fill={color} opacity={0.85} />
      {/* Center highlight */}
      <polygon points="25,10 25,45 30,35 30,20" fill="#fff" opacity={pulse * 0.35} />
      {/* Left satellite */}
      <rect x="8" y="20" width="4" height="12" fill="#fff" opacity={0.6} />
      {/* Right satellite */}
      <rect x="38" y="20" width="4" height="12" fill="#fff" opacity={0.6} />
    </g>
  );
};

const FloatingIslands = () => {
  const [selectedIsland, setSelectedIsland] = useState<number | null>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (selectedIsland !== null) {
      const interval = setInterval(() => setTime(t => t + 0.016), 50);
      return () => clearInterval(interval);
    } else {
      const interval = setInterval(() => setTime(t => t + 0.03), 30);
      return () => clearInterval(interval);
    }
  }, [selectedIsland]);

  const selectedData = selectedIsland !== null ? islandData[selectedIsland] : null;

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
      
      {/* SVG Canvas with 3D shapes */}
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
        </defs>
        
        <rect width="360" height="360" fill="url(#bgGlow)" />

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
              
              {/* 3D Shape */}
              <g transform="translate(-25, -25) scale(0.65)">
                <IslandShape shape={island.shape} color={island.color} time={time + index * 1.5} />
              </g>
              
              {!isOtherSelected && (
                <text
                  x={0}
                  y={55}
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
