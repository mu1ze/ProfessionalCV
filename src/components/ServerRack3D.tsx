import { useMemo } from 'react';
import { Heerich } from 'heerich';

const ServerRack3D = () => {
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
      position: [0.5, 1, -0.1], // Slightly offset Z to carve cleanly
      size: [5, 12, 4],
      style: { default: { fill: '#050508', stroke: '#111' } }
    });

    // Add 4 Server Blades
    const bladeYPositions = [1.5, 4.5, 7.5, 10.5];
    
    bladeYPositions.forEach((y, i) => {
      // Blade chassis
      h.applyGeometry({
        type: 'box',
        position: [0.8, y, 0],
        size: [4.4, 1.5, 3.5],
        style: {
          default: { fill: '#1a1a24', stroke: '#2a2a35', strokeWidth: 0.5 },
          front: { fill: '#232330' }
        }
      });

      // Status Lights (cyan/violet)
      const lightColor = i % 2 === 0 ? '#06b6d4' : '#10b981'; // Mix cyan and emerald
      
      // Light 1
      h.applyGeometry({
        type: 'box',
        position: [1.2, y + 0.5, -0.2],
        size: [0.4, 0.4, 0.3],
        style: { default: { fill: lightColor, stroke: '#fff', strokeWidth: 0.5 } }
      });

      // Light 2
      h.applyGeometry({
        type: 'box',
        position: [2.0, y + 0.5, -0.2],
        size: [0.4, 0.4, 0.3],
        style: { default: { fill: '#7c3aed', stroke: '#fff', strokeWidth: 0.5 } }
      });
    });

    // Add cables in the back
    h.applyGeometry({
      type: 'line',
      from: [5, 2, 4],
      to: [5, 12, 4],
      radius: 0.2,
      shape: 'rounded',
      style: { default: { fill: '#ef4444' } } // red cable
    });
    
    h.applyGeometry({
      type: 'line',
      from: [4.5, 5, 4],
      to: [4.5, 12, 4],
      radius: 0.2,
      shape: 'rounded',
      style: { default: { fill: '#06b6d4' } } // cyan cable
    });

    return h.toSVG({ padding: 20 });
  }, []);

  return (
    <div 
      className="server-rack-container"
      style={{
        width: '100%',
        maxWidth: '280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        filter: 'drop-shadow(0 20px 40px rgba(6, 182, 212, 0.15))'
      }}
    >
      <style>{`
        .server-rack-container svg {
          width: 100%;
          height: auto;
          overflow: visible;
          animation: float-rack 8s ease-in-out infinite;
        }
        @keyframes float-rack {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .server-rack-container polygon {
          transition: fill 0.2s;
        }
        .server-rack-container polygon:hover {
          fill: #7c3aed !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: svgContent }} />
    </div>
  );
};

export default ServerRack3D;
