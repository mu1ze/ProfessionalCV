# Plan: Heerich.js Skills Visualization for ProfessionalCV

## Goal

Replace the removed DataIsland and FloatingIslands components with a single, cohesive heerich.js-powered 3D visualization that displays the tech stack/tools used in the project. The visualization must be meaningful, interactive, and visually impressive.

---

## What Was Removed

1. **DataIsland** (`src/components/DataIsland.tsx`) — 3D island with 5 extruding knowledge crystals (Projects, Skills, Experience, About, GitHub) in `#knowledge` section. Click didn't work properly.
2. **FloatingIslands** (`src/components/FloatingIslands.tsx`) — Floating 3D shapes (cube, pyramid, cylinder, crystal) in `#skills` section. "Meaningless" according to user.

---

## Heerich.js Capabilities (Constraints)

| Supported | NOT Supported |
|---|---|
| `box` (uses `position`) | `cylinder` (use `fill` with radial predicate) |
| `sphere` (uses `center`) | `cone`, `torus` |
| `line` (cylindrical) | Arbitrary curves |
| `fill` (procedural via predicate function) | |

- Camera: isometric preset with configurable angle
- Click detection: `meta` object → `data-*` attributes on SVG polygons
- No native animation — regenerate geometry on state change (fast for <1000 voxels)

---

## Proposed Concept: "The Arsenal Blueprint"

A technical schematic / floor-plan visualization showing your **tech stack as an architectural blueprint**. Instead of meaningless floating islands or crystals, the tech tools are arranged in a logical spatial layout that communicates structure.

### Layout Philosophy

The visualization is a **top-down isometric blueprint** of your skills as a "building" or "circuit":

```
┌─────────────────────────────────────────────────────────────┐
│                      [Languages Zone]                        │
│     TypeScript    JavaScript    Python    HTML5    CSS3     │
│         ▓▓          ▓▓         ▓▓        ▓       ▓        │
│         ▓▓          ▓▓         ▓▓        ▓       ▓        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Frontend]          [Backend]           [DevOps]           │
│  ████████           ████████            ████████            │
│  ██ React ██        ██ Node ██          ██ Docker ██        │
│  ██ Vue.js ██       ██ Express█         ██ GitHub ██        │
│  ██ Vite  ██        ██ EJS   ██         ██ Vercel ██        │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                      [Data & APIs]                          │
│     PostgreSQL    Supabase    REST APIs    Google Maps       │
│         ▓▓          ▓▓          ▓▓            ▓▓           │
└─────────────────────────────────────────────────────────────┘
```

### Key Principles

1. **Meaningful spatial organization** — Technologies are grouped by category, not random
2. **Height = Proficiency** — Taller blocks = more experienced/mastered
3. **Color = Category** — Consistent color per category for instant recognition
4. **Click to reveal** — Clicking a block shows tool details in a floating panel
5. **Connections** — Thin `line` geometry connecting related tools (e.g., React → Vite, Node → Express)

### Category Color Scheme

| Category | Color | Hex |
|---|---|---|
| Languages | Purple | `#7c3aed` |
| Frameworks & Libs | Cyan | `#06b6d4` |
| DevOps & Tools | Green | `#10b981` |
| Data & APIs | Amber | `#f59e0b` |

---

## Implementation Plan

### Step 1: Create New Component `TechStackBlueprint.tsx`

**Location:** `src/components/TechStackBlueprint.tsx`

**Structure:**
- Single isometric heerich scene
- 4 zone groups with labeled boundaries
- Tech blocks as `box` geometry with `meta: { toolId, category, name }`
- `fill` geometry for zone floor/ground
- `line` geometry for connections (optional, if time permits)
- Click handler reads `data-tool-id` from clicked polygon

### Step 2: Data Structure

```ts
const techStack = [
  {
    category: 'Languages',
    color: '#7c3aed',
    tools: [
      { id: 'typescript', name: 'TypeScript', proficiency: 0.95 },
      { id: 'javascript', name: 'JavaScript', proficiency: 0.90 },
      { id: 'python', name: 'Python', proficiency: 0.75 },
      { id: 'html', name: 'HTML5', proficiency: 0.90 },
      { id: 'css', name: 'CSS3', proficiency: 0.85 },
      { id: 'sql', name: 'SQL', proficiency: 0.80 },
    ],
  },
  // ... Frameworks, DevOps, Data categories
];
```

### Step 3: Geometry Generation Logic

- **Zone floors:** Large `fill` rectangles with category color at low opacity
- **Tool blocks:** `box` geometry
  - Width/Depth: fixed ~1.0 unit
  - Height: `proficiency * maxHeight` (so TypeScript is taller than Python)
  - Position: arranged in a grid within each zone
- **Labels:** Since heerich can't render text, use a companion HTML overlay or SVG `<text>` elements positioned under each block

### Step 4: Click Interaction

- State: `selectedTool: string | null`
- On click: `e.target.closest('[data-tool-id]')` → extract tool ID → show detail panel
- Detail panel: floating card below the visualization showing:
  - Tool name
  - Category badge
  - Skill list (for grouped categories)

### Step 5: Integrate into SkillsMatrix

**File:** `src/components/SkillsMatrix.tsx`

Replace the removed FloatingIslands `<div>` with:
```tsx
<ScrollReveal width="100%" delay={0.4}>
  <div style={{ flex: '1 1 30%', display: 'flex', justifyContent: 'center' }}>
    <TechStackBlueprint />
  </div>
</ScrollReveal>
```

### Step 6: Styling & Polish

- Add subtle grid lines to the blueprint (thin `line` geometry at y=0)
- Zone labels as SVG text
- Glow effect on selected block (brighter stroke)
- Smooth transition when switching selected tool

---

## Files to Change

| File | Change |
|---|---|
| `src/components/TechStackBlueprint.tsx` | **CREATE** — new visualization component |
| `src/components/SkillsMatrix.tsx` | Import and embed `<TechStackBlueprint />` |
| `src/components/DataIsland.tsx` | **DELETE** or leave unused |
| `src/components/FloatingIslands.tsx` | **DELETE** or leave unused |

---

## Verification

1. Run `npm run dev` in `/Users/dvlli/Websites/ProfessionalCV`
2. Navigate to `#skills` section
3. Verify:
   - All 4 category zones render with correct colors
   - Tool blocks are clickable and show detail panel
   - Selected state visually distinguishes the active tool
   - Responsive: scales correctly on smaller screens

---

## Risks & Tradeoffs

| Risk | Mitigation |
|---|---|
| Text labels in SVG are tricky to position | Use HTML overlay positioned via absolute coords derived from block positions |
| heerich `fill` for zone floors can be slow | Use a single `box` slab per zone instead of `fill` |
| Many small blocks = large SVG | Limit to top ~15 tools total, group less important ones |
| Click detection misses inner polygons | Ensure `meta` is on all visible faces of each box |

---

## Open Question

Should the visualization be **full-width** (replacing the 2-column layout) or remain **side-by-side** with the skill cards grid? 

Given the "blueprint" concept works best as a wide floor-plan, I recommend going **full-width** and placing it above the existing skill cards, creating a visual "hero" for the Arsenal section. The skill cards then serve as the detailed legend beneath it.
