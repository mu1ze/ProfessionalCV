import { useMemo, useState, useCallback } from 'react';
import { Heerich } from 'heerich';

type Tool = {
  id: string;
  name: string;
  proficiency: number; // 0-1, affects block height
};

type Category = {
  id: string;
  title: string;
  color: string;
  accent: string;
  tools: Tool[];
};

const categories: Category[] = [
  {
    id: 'languages',
    title: 'Languages',
    color: '#7c3aed',
    accent: '#a78bfa',
    tools: [
      { id: 'typescript', name: 'TypeScript', proficiency: 0.95 },
      { id: 'javascript', name: 'JavaScript', proficiency: 0.90 },
      { id: 'python', name: 'Python', proficiency: 0.70 },
      { id: 'html', name: 'HTML5', proficiency: 0.88 },
      { id: 'css', name: 'CSS3', proficiency: 0.85 },
      { id: 'sql', name: 'SQL', proficiency: 0.78 },
    ],
  },
  {
    id: 'frameworks',
    title: 'Frameworks',
    color: '#06b6d4',
    accent: '#22d3ee',
    tools: [
      { id: 'react', name: 'React', proficiency: 0.92 },
      { id: 'vue', name: 'Vue.js', proficiency: 0.80 },
      { id: 'node', name: 'Node.js', proficiency: 0.88 },
      { id: 'express', name: 'Express', proficiency: 0.85 },
      { id: 'vite', name: 'Vite', proficiency: 0.82 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps',
    color: '#10b981',
    accent: '#34d399',
    tools: [
      { id: 'docker', name: 'Docker', proficiency: 0.75 },
      { id: 'git', name: 'Git / GitHub', proficiency: 0.90 },
      { id: 'vercel', name: 'Vercel', proficiency: 0.85 },
      { id: 'netlify', name: 'Netlify', proficiency: 0.78 },
    ],
  },
  {
    id: 'data',
    title: 'Data & APIs',
    color: '#f59e0b',
    accent: '#fbbf24',
    tools: [
      { id: 'postgresql', name: 'PostgreSQL', proficiency: 0.82 },
      { id: 'plpgsql', name: 'PLpgSQL', proficiency: 0.75 },
      { id: 'supabase', name: 'Supabase', proficiency: 0.80 },
      { id: 'rest', name: 'REST APIs', proficiency: 0.88 },
    ],
  },
];

const MAX_BLOCK_HEIGHT = 4.5;
const BLOCK_SIZE = 1.3;

// Helper to darken/lighten a hex color
function shadeColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00FF) + amt;
  let b = (num & 0x0000FF) + amt;
  r = r < 255 ? (r < 0 ? 0 : r) : 255;
  g = g < 255 ? (g < 0 ? 0 : g) : 255;
  b = b < 255 ? (b < 0 ? 0 : b) : 255;
  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

const TechStackBlueprint = () => {
  const [selectedTool, setSelectedTool] = useState<{ category: Category; tool: Tool } | null>(null);
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);

  // Compute block positions for label alignment
  const blockPositions = useMemo(() => {
    const totalWidth = categories.length * 14;
    const startX = -totalWidth / 2;
    const toolsPerRow = 2;

    return categories.map((cat, catIndex) => {
      const zoneStartX = startX + catIndex * 14;
      return {
        category: cat,
        tools: cat.tools.map((tool, toolIndex) => {
          const row = Math.floor(toolIndex / toolsPerRow);
          const col = toolIndex % toolsPerRow;
          return {
            tool,
            x: zoneStartX + 2.5 + col * 2.4,
            z: -1 + row * 2.2,
            row,
            col,
          };
        }),
      };
    });
  }, []);

  const svgContent = useMemo(() => {
    const h = new Heerich({
      tile: 18,
      camera: { type: 'isometric', angle: -40 },
    });

    const totalWidth = categories.length * 14;
    const startX = -totalWidth / 2;

    categories.forEach((cat, catIndex) => {
      const zoneStartX = startX + catIndex * 14;

      // Zone floor (dark platform)
      h.applyGeometry({
        type: 'box',
        position: [zoneStartX + 2, 0.2, -3],
        size: [10, 0.4, 10],
        style: {
          top: { fill: '#0d0d14', stroke: cat.color, strokeWidth: 1.5 },
          default: { fill: '#0a0a10', stroke: '#1a1a24' },
        },
      });

      // Category label marker (thin colored pillar at zone entrance)
      h.applyGeometry({
        type: 'box',
        position: [zoneStartX + 0.5, 0.5, -2.5],
        size: [0.4, 0.8, 0.4],
        style: {
          top: { fill: cat.color, stroke: '#fff', strokeWidth: 0.3 },
          default: { fill: shadeColor(cat.color, -20), stroke: cat.color },
        },
      });

      // Tool blocks arranged in a 2-column grid within zone
      const toolsPerRow = 2;
      cat.tools.forEach((tool, toolIndex) => {
        const row = Math.floor(toolIndex / toolsPerRow);
        const col = toolIndex % toolsPerRow;
        const x = zoneStartX + 2.5 + col * 2.4;
        const z = -1 + row * 2.2;
        const height = tool.proficiency * MAX_BLOCK_HEIGHT;
        const baseY = 0.4 + height / 2;
        const isSelected = selectedTool?.tool.id === tool.id;
        const isHovered = hoveredTool === tool.id;

        h.applyGeometry({
          type: 'box',
          position: [x, baseY, z],
          size: [BLOCK_SIZE, height, BLOCK_SIZE],
          meta: { toolId: tool.id, categoryId: cat.id },
          style: {
            top: {
              fill: isSelected ? cat.accent : isHovered ? shadeColor(cat.color, 15) : cat.color,
              stroke: '#ffffff',
              strokeWidth: isSelected ? 2 : isHovered ? 1.2 : 0.5,
            },
            default: {
              fill: shadeColor(cat.color, -30),
              stroke: shadeColor(cat.color, -50),
              strokeWidth: 0.3,
            },
          },
        });

        // Small accent marker on top of each block
        if (tool.proficiency > 0.85) {
          h.applyGeometry({
            type: 'box',
            position: [x, baseY + height / 2 + 0.25, z],
            size: [0.5, 0.5, 0.5],
            style: {
              top: { fill: cat.accent, stroke: '#fff', strokeWidth: 0.2 },
              default: { fill: shadeColor(cat.accent, -15), stroke: cat.accent },
            },
          });
        }
      });

      // Connection lines between related tools
      if (cat.id === 'frameworks') {
        h.applyGeometry({
          type: 'line',
          from: [zoneStartX + 2.5 + 0.7, 0.4 + (0.92 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          to: [zoneStartX + 2.5 + 2 * 2.4 - 0.7, 0.4 + (0.82 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          radius: 0.08,
          shape: 'hexagon',
          style: { default: { fill: cat.color, stroke: cat.accent, strokeWidth: 0.2 } },
        });
        h.applyGeometry({
          type: 'line',
          from: [zoneStartX + 2.5 + 2.4 + 0.7, 0.4 + (0.88 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          to: [zoneStartX + 2.5 + 3 * 2.4 - 0.7, 0.4 + (0.85 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          radius: 0.08,
          shape: 'hexagon',
          style: { default: { fill: cat.color, stroke: cat.accent, strokeWidth: 0.2 } },
        });
      }

      if (cat.id === 'devops') {
        h.applyGeometry({
          type: 'line',
          from: [zoneStartX + 2.5 + 2 * 2.4 + 0.7, 0.4 + (0.85 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          to: [zoneStartX + 2.5 + 3 * 2.4 - 0.7, 0.4 + (0.78 * MAX_BLOCK_HEIGHT) / 2 + 0.4, -1],
          radius: 0.08,
          shape: 'hexagon',
          style: { default: { fill: cat.color, stroke: cat.accent, strokeWidth: 0.2 } },
        });
      }
    });

    return h.toSVG({ padding: 30 });
  }, [selectedTool, hoveredTool]);

  const handleSvgClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as SVGElement;
    const toolEl = target.closest('[data-tool-id]') as SVGElement | null;
    if (!toolEl) {
      setSelectedTool(null);
      return;
    }
    const toolId = toolEl.getAttribute('data-tool-id');
    const categoryId = toolEl.getAttribute('data-category-id');
    if (!toolId || !categoryId) return;

    const category = categories.find(c => c.id === categoryId);
    const tool = category?.tools.find(t => t.id === toolId);
    if (category && tool) {
      setSelectedTool(prev => prev?.tool.id === toolId ? null : { category, tool });
    }
  }, []);

  const selectedCategory = selectedTool?.category;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <style>{`
        .tech-blueprint-svg polygon,
        .tech-blueprint-svg path {
          cursor: pointer;
          transition: fill 0.15s ease, stroke 0.15s ease;
        }
        .tech-blueprint-svg polygon:hover,
        .tech-blueprint-svg path:hover {
          filter: brightness(1.3);
        }
      `}</style>

      {/* SVG Visualization */}
      <div
        className="tech-blueprint-svg"
        dangerouslySetInnerHTML={{ __html: svgContent }}
        onClick={handleSvgClick}
        onMouseLeave={() => setHoveredTool(null)}
        style={{
          width: '100%',
          filter: 'drop-shadow(0 0 60px rgba(124,58,237,0.08))',
        }}
      />

      {/* Tool Labels Grid - positioned below each block */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: '32px',
        justifyContent: 'center',
        marginTop: '8px',
        padding: '0 20px',
      }}>
        {blockPositions.map(({ category, tools }) => (
          <div
            key={category.id}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '8px',
              minWidth: '200px',
            }}
          >
            {tools.map(({ tool }) => {
              const isSelected = selectedTool?.tool.id === tool.id;
              const isHovered = hoveredTool === tool.id;
              return (
                <div
                  key={tool.id}
                  data-tool-id={tool.id}
                  data-category-id={category.id}
                  onClick={() => setSelectedTool(prev => prev?.tool.id === tool.id ? null : { category, tool })}
                  onMouseEnter={() => setHoveredTool(tool.id)}
                  onMouseLeave={() => setHoveredTool(null)}
                  style={{
                    padding: '8px 12px',
                    background: isSelected
                      ? `${category.color}25`
                      : isHovered
                        ? `${category.color}15`
                        : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isSelected ? category.color : isHovered ? `${category.color}50` : 'rgba(255,255,255,0.08)'}`,
                    borderRadius: '10px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    fontSize: '0.75rem',
                    fontWeight: isSelected ? 700 : 500,
                    color: isSelected ? '#fff' : '#94a3b8',
                    boxShadow: isSelected ? `0 0 20px ${category.color}30` : 'none',
                  }}
                >
                  {tool.name}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Tool Detail Panel */}
      {selectedTool && (
        <div
          style={{
            position: 'absolute',
            bottom: '-20px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(400px, 90vw)',
            background: 'rgba(8,8,12,0.98)',
            border: `1px solid ${selectedCategory!.color}50`,
            borderRadius: '20px',
            padding: '24px',
            backdropFilter: 'blur(16px)',
            boxShadow: `0 16px 60px rgba(0,0,0,0.7), 0 0 40px ${selectedCategory!.color}20`,
            zIndex: 20,
            animation: 'slideUpFade 0.35s cubic-bezier(0.22,1,0.36,1) both',
          }}
        >
          <style>{`
            @keyframes slideUpFade {
              from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.94); }
              to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
            }
          `}</style>

          <button
            onClick={() => setSelectedTool(null)}
            aria-label="Close"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              width: '28px',
              height: '28px',
              border: 'none',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)',
              color: '#94a3b8',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', alignItems: 'center' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: `${selectedCategory!.color}20`,
                border: `1px solid ${selectedCategory!.color}40`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                color: selectedCategory!.color,
                flexShrink: 0,
              }}
            >
              {selectedCategory!.id === 'languages' && '⌨️'}
              {selectedCategory!.id === 'frameworks' && '⚛️'}
              {selectedCategory!.id === 'devops' && '🔧'}
              {selectedCategory!.id === 'data' && '💾'}
            </div>
            <div>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: selectedCategory!.color,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '2px',
                }}
              >
                {selectedCategory!.title}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>
                {selectedTool.tool.name}
              </div>
            </div>
          </div>

          {/* Proficiency Bar */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Proficiency</span>
              <span style={{ fontSize: '0.75rem', color: selectedCategory!.color, fontWeight: 600 }}>
                {Math.round(selectedTool.tool.proficiency * 100)}%
              </span>
            </div>
            <div
              style={{
                height: '6px',
                background: 'rgba(255,255,255,0.08)',
                borderRadius: '3px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${selectedTool.tool.proficiency * 100}%`,
                  background: `linear-gradient(90deg, ${selectedCategory!.color}, ${selectedCategory!.accent})`,
                  borderRadius: '3px',
                  transition: 'width 0.5s ease',
                }}
              />
            </div>
          </div>

          {/* Other tools in category */}
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '8px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Also in {selectedCategory!.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {selectedCategory!.tools
                .filter(t => t.id !== selectedTool.tool.id)
                .map(tool => (
                  <span
                    key={tool.id}
                    onClick={() => setSelectedTool({ category: selectedCategory!, tool })}
                    style={{
                      padding: '4px 10px',
                      background: `${selectedCategory!.color}10`,
                      border: `1px solid ${selectedCategory!.color}25`,
                      borderRadius: '100px',
                      fontSize: '0.75rem',
                      color: '#94a3b8',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = `${selectedCategory!.color}20`;
                      e.currentTarget.style.color = '#fff';
                      e.currentTarget.style.borderColor = `${selectedCategory!.color}40`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = `${selectedCategory!.color}10`;
                      e.currentTarget.style.color = '#94a3b8';
                      e.currentTarget.style.borderColor = `${selectedCategory!.color}25`;
                    }}
                  >
                    {tool.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStackBlueprint;
