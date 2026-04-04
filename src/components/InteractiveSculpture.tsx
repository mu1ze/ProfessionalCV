import { useMemo } from 'react';
import { Heerich } from 'heerich';

const InteractiveSculpture = () => {
  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 20, 
      camera: { type: 'isometric', angle: 45 }
    });

    // Base large cube
    h.applyGeometry({
      type: 'box',
      center: [5, 5, 5],
      size: [7, 7, 7],
      style: {
        default: { fill: '#0a0a0f', stroke: '#1f1f2e', strokeWidth: 1 },
        top: { fill: '#12121a' }
      }
    });

    // Carve out a cross section to reveal inside
    h.removeGeometry({
      type: 'box',
      center: [5, 5, 5],
      size: [9, 3, 3],
      style: { default: { fill: '#7c3aed', stroke: '#5b21b6' } } 
    });

    h.removeGeometry({
      type: 'box',
      center: [5, 5, 5],
      size: [3, 9, 3],
      style: { default: { fill: '#06b6d4', stroke: '#0891b2' } } 
    });

    h.removeGeometry({
      type: 'box',
      center: [5, 5, 5],
      size: [3, 3, 9],
      style: { default: { fill: '#10b981', stroke: '#059669' } } 
    });

    // Add a floating core
    h.applyGeometry({
      type: 'sphere',
      center: [5, 5, 5],
      radius: 1.5,
      style: {
        default: { fill: '#ffffff', stroke: '#06b6d4', strokeWidth: 1.5 }
      }
    });

    // Add some satellite blocks
        const satellites = [
      { pos: [1, 1, 1], color: '#06b6d4', stroke: '#0891b2' }, // cyan
      { pos: [9, 1, 1], color: '#7c3aed', stroke: '#a78bfa' }, // purple
      { pos: [1, 9, 1], color: '#7c3aed', stroke: '#a78bfa' }, // purple
      { pos: [9, 9, 1], color: '#06b6d4', stroke: '#0891b2' }, // cyan
      { pos: [1, 1, 9], color: '#7c3aed', stroke: '#a78bfa' }, // purple
      { pos: [9, 1, 9], color: '#06b6d4', stroke: '#0891b2' }, // cyan
      { pos: [1, 9, 9], color: '#06b6d4', stroke: '#0891b2' }, // cyan
      { pos: [9, 9, 9], color: '#7c3aed', stroke: '#a78bfa' }  // purple
    ];
    satellites.forEach(({pos, color, stroke}) => {
      h.applyGeometry({
        type: 'box',
        center: pos,
        size: 1,
        style: { default: { fill: color, stroke: stroke } }
      });
    });

    return h.toSVG({ padding: 20 });
  }, []);

  return (
    <div 
      className="heerich-container"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        maxWidth: '450px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10
      }}
    >
      <style>{`
        .heerich-container svg {
          width: 100%;
          height: auto;
          overflow: visible;
          filter: drop-shadow(0 0 30px rgba(124, 58, 237, 0.2));
          animation: float-sculpture 6s ease-in-out infinite;
        }
        @keyframes float-sculpture {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .heerich-container polygon {
          transition: all 0.2s ease-out;
          cursor: crosshair;
        }
        /* Hover effect on faces */
        .heerich-container polygon:hover {
          fill: #06b6d4 !important;
          stroke: #ffffff !important;
          stroke-width: 1.5px !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default InteractiveSculpture;
