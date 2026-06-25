# DESIGN.md

## Project Identity

Project name: 纸上生花：中国剪纸非遗多维信息可视化设计

The interface should feel like a digital exhibition for Chinese paper-cutting heritage: calm, ceremonial, handmade, and contemporary. It should not look like a generic dashboard, corporate SaaS page, or Western luxury brand site. The core feeling is "new Chinese cultural exhibition": paper texture, cinnabar red, ink-dark typography, restrained gold, generous breathing room, and meaningful ornamental geometry inspired by paper-cut symmetry.

## Visual Principles

1. Cultural first, decorative second.
   Every visual flourish should come from paper-cutting: symmetry, hollowed shapes, window flowers, auspicious motifs, folk patterns, repeated radial geometry, and sharp cut edges.

2. Data and art should be integrated.
   Charts should look precise and readable, but their containers, colors, and surrounding copy should match the cultural exhibition tone.

3. Avoid photo collage.
   The assignment forbids simply stacking photos. Use vector-like shapes, generated patterns, diagrammatic marks, and reconstructed motifs instead.

4. Prefer calm richness.
   The page can be visually warm and atmospheric, but it should remain readable. Avoid noisy backgrounds, excessive gradients, or too many competing ornaments.

## Color Tokens

Use these as the main palette:

- Cinnabar red: `#b21f2d`
- Deep paper-cut red: `#7d1420`
- Paper white: `#fffaf2`
- Warm rice paper: `#f7efe2`
- Aged paper: `#ead9c1`
- Ink black-brown: `#251714`
- Muted text brown: `#755f55`
- Restrained gold: `#c99742`
- Pale border: `rgba(89, 45, 35, 0.16)`

Usage:

- Cinnabar red is for primary identity, hero marks, important highlights, and generated paper-cut motifs.
- Paper tones are for backgrounds and chart panels.
- Ink black-brown is for primary text.
- Muted brown is for supporting text.
- Gold is an accent only; do not let it dominate.

## Typography

Use system Chinese fonts:

- Primary: `Microsoft YaHei`, `PingFang SC`, Arial, sans-serif
- Display headings should be large, steady, and exhibition-like.
- Body copy should be 16px to 18px with comfortable line height around 1.75 to 1.9.
- Do not use negative letter spacing.
- Avoid tiny text in chart explanations.

## Layout

- Use wide, full-width sections with constrained inner content.
- Keep page sections unframed; reserve cards for specific repeated items such as insights.
- Hero section should feel like an opening exhibition wall, not a marketing landing page.
- Charts should sit in paper-like panels with subtle borders and soft shadows.
- Use generous vertical spacing between narrative sections.
- Avoid nested cards.

## Components

### Hero

The hero should include:

- Project eyebrow: 数字遗珍 · 中国剪纸
- Main title: 纸上生花
- Short narrative statement
- Generated or CSS-built paper-cut symbol as the primary visual signal

### Chart Panels

Chart panels should:

- Use `#fffaf2` or translucent paper white backgrounds
- Use subtle brown borders
- Use ECharts colors from the project palette
- Include short contextual copy beside or above each chart
- Avoid dense technical labels unless needed for interpretation

### Insight Cards

Insight cards should:

- Use a left cinnabar accent rule
- Include a concise title and one paragraph
- Highlight findings from real data, not generic cultural claims

### Generated Art Module

The paper-cut generator should:

- Use radial or bilateral symmetry
- Use red foreground and paper background
- Include hollowed areas or negative-space cutouts
- Let users change motif type or complexity
- Avoid imported photos

### Poster

The 1080x1920 poster should:

- Feature the generated paper-cut motif prominently
- Include the title, theme statement, three data findings, and QR/link placeholder if needed
- Use the same palette and typography tokens
- Feel like a cultural exhibition poster rather than a software screenshot collage

## Interaction

Required interaction style:

- Hover tooltips for charts
- Click controls for generated motifs
- Smooth scrolling between narrative sections
- Simple controls with clear labels

Interactions should support understanding, not distract. Animation should be gentle and purposeful.

## What To Avoid

- Generic blue dashboard style
- Purple/blue gradients
- Photo collage of paper-cut works
- Overly glossy 3D effects
- Western luxury brand visual language
- Dense tables as the main visual experience
- Cards inside cards
- Excessively rounded components
- Text explaining how to use every UI element inside the page

## Deliverable Consistency

The webpage, report, and poster should share the same project identity:

- Same title: 纸上生花
- Same color palette
- Same three core findings
- Same explanation of data source and visual extraction
- Same generated paper-cut motif language
