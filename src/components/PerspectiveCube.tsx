import { useState, useMemo, useCallback } from 'react';
import { Heerich } from 'heerich';

const FACE_COLORS = {
  top:    { fill: '#c7d2fe', stroke: '#818cf8' },  // light indigo top
  bottom: { fill: '#1e1b4b', stroke: '#312e81' },  // deep indigo bottom
  front:  { fill: '#7c3aed', stroke: '#a78bfa' },  // violet front
  back:   { fill: '#4c1d95', stroke: '#6d28d9' },  // darker violet back
  left:   { fill: '#06b6d4', stroke: '#22d3ee' },  // cyan left
  right:  { fill: '#10b981', stroke: '#34d399' },  // emerald right
};

const CAMERA_Y = 5;    // fixed camera Y (height above scene)
const CAMERA_Z = 18;   // fixed camera Z (distance in front of scene plane, positive = in front)

const PerspectiveCube = () => {
  const [camX, setCamX] = useState(2);

  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 20,
      camera: {
        type: 'perspective',
        position: [camX, CAMERA_Y],
        distance: CAMERA_Z,
      },
    });

    // Centered 6x6x6 cube
    h.applyGeometry({
      type: 'box',
      center: [5, 5, 5],
      size: [6, 6, 6],
      style: {
        top:    FACE_COLORS.top,
        bottom: FACE_COLORS.bottom,
        front:  FACE_COLORS.front,
        back:   FACE_COLORS.back,
        left:   FACE_COLORS.left,
        right:  FACE_COLORS.right,
      },
    });

    return h.toSVG({ padding: 20 });
  }, [camX]);

  const handleSlider = useCallback((val: number) => {
    setCamX(val);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        width: '100%',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* SVG */}
      <div
        style={{
          width: '100%',
          filter: 'drop-shadow(0 0 40px rgba(124,58,237,0.2))',
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: svgContent }} />
      </div>

      {/* Slider */}
      <div style={{ width: '100%', maxWidth: '360px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <span
            style={{
              fontSize: '0.72rem',
              color: '#94a3b8',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            Camera X
          </span>
          <span
            style={{
              fontSize: '0.8rem',
              color: '#7c3aed',
              fontWeight: 700,
              fontFamily: 'monospace',
              background: 'rgba(124,58,237,0.12)',
              padding: '2px 10px',
              borderRadius: '100px',
              border: '1px solid rgba(124,58,237,0.25)',
            }}
          >
            {camX.toFixed(1)}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={10}
          step={0.05}
          value={camX}
          onChange={e => handleSlider(parseFloat(e.target.value))}
          style={{
            width: '100%',
            height: '4px',
            appearance: 'none',
            WebkitAppearance: 'none',
            background: `linear-gradient(90deg, #7c3aed ${(camX / 10) * 100}%, #1e1b4b ${(camX / 10) * 100}%)`,
            borderRadius: '4px',
            outline: 'none',
            cursor: 'pointer',
          }}
        />

        <style>{`
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #7c3aed;
            border: 2px solid #a78bfa;
            box-shadow: 0 0 10px rgba(124,58,237,0.5);
            cursor: pointer;
            transition: transform 0.15s ease;
          }
          input[type='range']::-webkit-slider-thumb:hover {
            transform: scale(1.25);
          }
          input[type='range']::-moz-range-thumb {
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: #7c3aed;
            border: 2px solid #a78bfa;
            box-shadow: 0 0 10px rgba(124,58,237,0.5);
            cursor: pointer;
          }
        `}</style>

        {/* Axis labels */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '6px',
            fontSize: '0.65rem',
            color: '#475569',
            fontFamily: 'monospace',
          }}
        >
          <span>0 ← left</span>
          <span>right → 10</span>
        </div>
      </div>

      {/* Face legend */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {Object.entries(FACE_COLORS).map(([face, colors]) => (
          <div key={face} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '3px',
                background: colors.fill,
                border: `1px solid ${colors.stroke}`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: '0.68rem',
                color: '#64748b',
                textTransform: 'capitalize',
                fontWeight: 500,
              }}
            >
              {face}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        .perspective-cube-svg polygon {
          transition: fill 0.2s ease;
        }
        .perspective-cube-svg svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
      `}</style>
    </div>
  );
};

export default PerspectiveCube;
