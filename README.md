# Personal site

Jekyll site, deployed via GitHub Pages.

## Local preview

Requires Ruby (3.3.x recommended — that's what GitHub Pages runs in
production) and Bundler. On Windows, install via
[RubyInstaller](https://rubyinstaller.org/) and pick the version with
DevKit.

```bash
bundle install
bundle exec jekyll serve --livereload
```

The site will be at <http://localhost:4000>.

If livereload doesn't pick up file changes on Windows, add
`--force_polling`:

```bash
bundle exec jekyll serve --livereload --force_polling
```

Note: changes to `_config.yml` require a server restart — livereload
only handles content/theme changes.

## Adding content

- **A new project**: drop a markdown file into `_projects/` with the
  front matter shown in `site-build-spec.md` §7.1. Set `featured: true`
  to surface it on the landing page.
- **A new publication**: drop a markdown file into `_publications/`
  with the front matter shown in §7.2. Year grouping is automatic.

No HTML editing required for new entries.

## First-time deploy to GitHub Pages

There are two repo setups for a personal Jekyll site on GitHub Pages:

- **User site (recommended).** Create a GitHub repo named exactly
  `<your-username>.github.io`. Served at `https://<your-username>.github.io/`
  with no baseurl, so absolute asset paths like
  `/assets/images/profile.svg` work directly.
- **Project site.** Repo with any other name, served at
  `https://<your-username>.github.io/<repo>/`. Requires
  `baseurl: "/<repo>"` in `_config.yml` and Liquid `relative_url`
  filters on every asset path in markdown.

Option A is much simpler. The instructions below assume it.

### 1. Initialise git and push

From the project root:

```bash
git init
git branch -M main
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin main
```

### 2. Enable Pages

1. Open the repo on GitHub.
2. **Settings** → **Pages** (left sidebar).
3. **Source**: *Deploy from a branch*.
4. **Branch**: `main`, **Folder**: `/ (root)`. Save.
5. Wait ~30 s for the first build. Site goes live at
   `https://<your-username>.github.io/`.

### 3. Update `_config.yml`

Once the site is live, set:

```yaml
url: "https://<your-username>.github.io"
baseurl: ""
```

Commit and push. This makes any absolute URLs the site emits (canonical
links, future feeds, social meta tags) point at the live domain.

### Subsequent updates

```bash
git add .
git commit -m "Describe your change"
git push
```

Pages rebuilds automatically (~30 s).

## Custom domain (optional)

After the site is live you can point a custom domain at it:

1. Add a `CNAME` file at the project root containing only your domain
   (e.g. `example.com`).
2. In your DNS provider, add the records GitHub specifies in
   [their docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
3. In repo **Settings → Pages**, enter the custom domain.
4. Update `url:` in `_config.yml` to the custom domain.

## Where things live

- `index.html` — landing page (hero + featured project grid)
- `projects.html` — all projects grid
- `publications.html` — year-grouped publication list
- `_layouts/` — page templates (`default`, `project`)
- `_includes/` — partials (`header`, `footer`, `project-card`, `publication-entry`)
- `_projects/`, `_publications/` — content collections
- `assets/css/main.scss` — all styles, with CSS-variable design tokens at the top
- `assets/images/` — profile photo, project thumbnails/heroes, publication thumbnails
- `assets/pdf/cv.pdf` — drop your CV here

See `site-build-spec.md` for the canonical brief.
