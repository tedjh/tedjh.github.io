# Personal Website — Build Specification

This document is a complete brief for building a personal academic/portfolio website. It is intended to be read by an AI coding assistant (Claude Code) with no prior context on the project. All design decisions below have already been agreed with the site owner; do not re-litigate them unless something is technically infeasible.

---

## 1. Owner & purpose

The site owner is an independent researcher with an advanced ML background, currently working on mechanistic interpretability research (the first major project to be written up is a "Sparse Polynomial Crosscoder" — a transformer interpretability tool combining sparse crosscoders with polynomial decoders). The site needs to:

- Present an academic-style bio and CV link
- Showcase research projects with detailed write-ups including LaTeX math, figures, and code
- List publications/papers in a scannable academic format
- Feel polished but understated — not flashy

The owner is comfortable editing markdown and HTML and will maintain the site themselves after the initial build.

## 2. Visual references

The design is a hybrid of two existing sites. Read both before building:

- **https://www.aaedmusa.com/** — drives the landing page hero structure, the project card grid, the hover-effect feel, the centered/whitespace-heavy aesthetic, and the typography direction.
- **https://tedxiao.me/** — drives the publications list format (small thumbnail + title + author list + venue + link row), the academic tone, and the size/scale of the profile photo on the landing page (notably *smaller* than Aaed's hero photo).

**Explicitly do not copy from Aaed's site:** the Patreon/support section, the YouTube-creator framing, the oversized hero photo.

**Explicitly do not copy from Ted's site:** the left sidebar layout, the tabbed content panel, the very dense single-page format.

## 3. Tech stack (locked)

- **Jekyll** as the static site generator
- **GitHub Pages** for hosting (native Jekyll support, push-to-deploy from `main`)
- **KaTeX** for math rendering in project write-ups (preferred over MathJax for speed)
- **Custom CSS/SCSS** — do *not* use the `minima` theme or any heavy off-the-shelf theme. Start from a near-blank Jekyll setup and write the styles. The owner wants full control over the aesthetic.
- **Markdown + Liquid templates** for all content. New projects/publications should be addable by dropping a single markdown file into a collection — no hand-editing of HTML pages to add entries.

## 4. Site map & sections

Four content areas, three pages:

1. **Landing page (`index.html`)** — about/bio + featured projects grid. About content lives on the landing page itself, not a separate `/about` page.
2. **Projects page (`projects.html` or `/projects/`)** — full grid of all projects.
3. **Publications page (`publications.html` or `/publications/`)** — Ted-style publication list.
4. **Individual project pages** — one per project, generated from the `_projects/` collection via a `project.html` layout.

CV is a linked PDF, not a separate page.

## 5. Repository structure

```
site-root/
├── _config.yml
├── index.html                     # Landing page
├── projects.html                  # All projects grid
├── publications.html              # Publication list
├── _projects/                     # Collection: one .md per project
│   └── sparse-polynomial-crosscoder.md   (example)
├── _publications/                 # Collection: one .md per publication
├── _layouts/
│   ├── default.html               # Base layout (header/footer/KaTeX include)
│   ├── home.html                  # Landing page layout
│   └── project.html               # Individual project write-up layout
├── _includes/
│   ├── header.html                # Nav + site title
│   ├── footer.html                # Contact links
│   ├── project-card.html          # Card used in grids
│   └── publication-entry.html     # Row used in publication list
├── assets/
│   ├── css/
│   │   └── main.scss              # Compiled by Jekyll's built-in Sass
│   ├── images/
│   │   ├── profile.jpg            # Placeholder OK for now
│   │   └── projects/
│   ├── js/
│   │   └── main.js                # Minimal — only if needed
│   └── pdf/
│       └── cv.pdf                 # Placeholder OK for now
├── Gemfile
└── README.md
```

Configure the two collections in `_config.yml` with `output: true` for `_projects` (each project gets its own page) and `output: false` for `_publications` (rendered as list items only, not standalone pages — they link out to papers/code).

## 6. Page specifications

### 6.1 Landing page (`index.html`)

Vertical stack, centered, max-width container ~900px:

1. **Profile photo** — circular or rounded-square, ~180–220px wide. *Smaller than Aaed's; closer to Ted's scale.*
2. **Name** — large display weight, centered.
3. **One-line tagline** — subdued color, centered.
4. **Bio** — 2–3 paragraphs, body weight, centered or left-aligned within the centered container.
5. **Inline links row** — text links separated by middle dots or pipes, in the style of Ted's site (CV · Google Scholar · GitHub · Email). Not buttons.
6. **"Featured Projects" heading**.
7. **Project card grid** — pulls projects from `_projects/` where `featured: true` in front matter. 2–3 columns on desktop, single column on mobile.

### 6.2 Projects page

Same card grid, all projects from `_projects/`, reverse-chronological by date in front matter. Optionally group by year if there are enough.

### 6.3 Individual project page (`_layouts/project.html`)

1. **Title** + **tagline** at top.
2. **Links row** — Paper / Code / Demo / etc., styled the same as the publication entry links for consistency. Driven by front matter fields.
3. **Hero figure** — large image at the top of the body if specified in front matter.
4. **Markdown body** — full markdown rendering with: section headers (h2/h3), embedded figures with captions, KaTeX inline (`$...$`) and display (`$$...$$`) math, fenced code blocks with syntax highlighting (Jekyll's Rouge default is fine), blockquotes.
5. **"← Back to Projects"** link at the bottom.

Body content max-width should be narrower than the landing page — around 720–760px — so prose stays comfortably readable.

### 6.4 Publications page

Ted-style entries. Each row:

- Small thumbnail on the left (fixed size, e.g. 120×90px)
- On the right: paper title (linked to paper page or PDF), author list with the owner's name bolded, venue + year in italics, then a row of inline text links (PDF · Code · Website · Video · Blog) separated by middle dots.

Reverse-chronological. Group by year with year headings if there are enough entries.

## 7. Front matter schemas

### `_projects/*.md`

```yaml
---
layout: project
title: "Sparse Polynomial Crosscoder"
tagline: "A nonlinear, multi-layer feature decomposition for transformer interpretability"
date: 2025-XX-XX
featured: true
thumbnail: /assets/images/projects/spc-thumb.png
hero: /assets/images/projects/spc-hero.png
links:
  - {label: "Paper",   url: "https://arxiv.org/abs/..."}
  - {label: "Code",    url: "https://github.com/..."}
  - {label: "Website", url: "https://..."}
---
```

### `_publications/*.md`

```yaml
---
title: "Paper Title"
authors: "Author One, **Owner Name**, Author Three"   # owner bolded via markdown
venue: "NeurIPS 2026"
year: 2026
thumbnail: /assets/images/pubs/paper-thumb.png
links:
  - {label: "PDF",     url: "..."}
  - {label: "Code",    url: "..."}
  - {label: "Website", url: "..."}
---
```

## 8. Styling guidance

The owner wants the **Aaed look** — clean, centered, generous whitespace, polished — softened with the **academic restraint** of Ted's site. Specific guidance:

- **Single accent color** rather than a multi-color palette. Pick one calm color (a desaturated blue, warm grey, deep green, or muted terracotta all work). Avoid purple gradients and neon. The accent is used for links, hover states, and small details — never as a large fill.
- **Background** white or off-white (`#fafafa`-ish). Body text near-black but not pure black (`#1a1a1a` or similar).
- **Typography**: the owner liked Aaed's typography, which is a clean geometric sans-serif. Use a Google Font that gives a similar feel. **Note:** Inter, Roboto, and Arial are overused defaults — prefer something with more character that still reads as academic and clean. Reasonable candidates: *Geist*, *General Sans*, *Söhne* (paid — skip), *Manrope*, *Plus Jakarta Sans*, or *DM Sans*. Pick one and use it for both headings and body, varying weight rather than mixing families. Do *not* use Space Grotesk (overused in this context).
- **Whitespace**: be generous. Sections separated by clear vertical gaps, not by horizontal rules.
- **Line height**: 1.6–1.7 for body prose.
- **Project card**:
  - Image on top (16:9 or 4:3, consistent across cards), title below, optional 1-line description below title.
  - Subtle border or very soft shadow at rest.
  - **Hover effect**: card lifts slightly (translate-y a few px), shadow deepens, image zooms ~3–5%. CSS-only, smooth transition (~200–250ms ease).
- **Publication entry**: thumbnail at fixed size on the left, content right-aligned with it. Inline link separators are middle dots (`·`) with surrounding spaces, in the accent color or a slightly muted version.
- **No flashy animations.** No parallax, no scroll-triggered reveals, no big page transitions. The card hover and link hovers are the only motion.
- **Mobile**: single column for everything below ~700px. Card grid collapses to one column. Profile photo and content centered.

## 9. KaTeX integration

Use the auto-render extension. Include KaTeX CSS + JS + auto-render script in `default.html` (or only on the `project` layout if you want to scope it). Render delimiters: `$...$` for inline, `$$...$$` for display, `\(...\)` and `\[...\]` as alternates. Do not enable HTML rendering inside math (security).

## 10. Build order

Suggested incremental sequence — each step should produce a working, viewable site:

1. **Skeleton + deploy pipeline.** Initialize Jekyll, configure `_config.yml`, set up `Gemfile`, get a placeholder `index.html` rendering. Confirm it builds locally with `bundle exec jekyll serve`. Add a brief README with build/deploy instructions.
2. **Base layout + global styles.** `default.html`, `header.html`, `footer.html`, `main.scss` with CSS variables for colors and fonts, font loading from Google Fonts, base typography rules, container max-widths. The site should look intentional even with placeholder content.
3. **Landing page content.** Photo placeholder, name, tagline, bio paragraphs (use lorem ipsum if no real bio yet), inline links row. Polish this until the hero looks right *before* adding any cards — the hero sets the tone for everything else.
4. **Projects collection + card component.** Set up `_projects/` collection in `_config.yml`, write `project-card.html` include, add 2–3 placeholder project markdown files with thumbnails (any image works for testing), build the grid on the landing page (filtered to `featured: true`) and the standalone projects page.
5. **Project layout + KaTeX.** Build `project.html` layout, integrate KaTeX, test with one real project page that includes math, code, and figures. The Sparse Polynomial Crosscoder is the natural first real project — leave a placeholder if the owner hasn't supplied content yet.
6. **Publications page.** Set up `_publications/` collection, write `publication-entry.html` include, build the page with year grouping. Populate with placeholders.
7. **Polish + deploy.** Cross-browser check, mobile check, any remaining spacing/typography refinement. Push to GitHub, enable Pages in repo settings, confirm the live site renders correctly.

A custom domain can be added at any point after step 7 by adding a `CNAME` file and configuring DNS — defer this until the owner has chosen a domain.

## 11. Open decisions for the owner to make during build

These do not block starting; flag them when you reach the relevant step:

- **Accent color** — needed by step 2. Use a placeholder neutral and ask the owner to choose.
- **Specific Google Font** — needed by step 2. Recommend 2–3 options with rationale and let the owner pick.
- **Domain name** — needed only for step 7's final config.
- **Real bio text and CV PDF** — placeholders are fine until the owner supplies them.

## 12. Things to avoid

- Heavy themes, framework lock-in, or build tooling beyond what Jekyll ships with.
- JavaScript frameworks. The site should work fine with JS disabled apart from KaTeX.
- Client-side routers, SPAs, lazy hydration — none of it.
- Generic AI-default styling (Inter on white with a purple accent and Space Grotesk headings is the exact aesthetic to avoid).
- Adding features the spec doesn't mention. If something seems missing, ask before adding it.
