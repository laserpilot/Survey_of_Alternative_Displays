# Display Chooser — comparison tool

A small, dependency-free web tool that turns the *Survey of Alternative Displays* from a
**taxonomy** (organized by how each display works) into a **decision aid** (organized by what each
display affords). It's a sortable, filterable matrix of display technologies rated on qualitative
affordance axes, so you can narrow toward a medium that fits a given experience or intention.

> **Phase 1.** ~53 technologies covering the survey's `comparable` and `borderline` categories
> across 20 families. Pure art one-offs, lab-only experiments, and obsolete numeric displays are
> intentionally excluded (see below).

## What's here

| File | Role |
|------|------|
| `displays.js` | **The data layer.** One `window.DISPLAYS` entry per choosable technology. This is the source of truth and the spine for any future view (web, PDF, etc.). |
| `index.html` | Page shell: header, affordance legend/disclaimer, filter bar, table, detail panel. |
| `app.js` | Renders the matrix; handles sorting, filtering, and the per-row detail panel. Vanilla JS. |
| `styles.css` | Styling (dark/light aware). |

No build step, no dependencies. Data is a JS global (not JSON loaded over `fetch`), so the tool
also works when you just **double-click `index.html`** — no local server needed.

## Running locally

Easiest: double-click `index.html`.

To mirror GitHub Pages exactly (serving over HTTP):

```sh
cd comparison-tool
python3 -m http.server 8000
# then open http://localhost:8000/
```

## The ratings (read this before trusting a number)

These are **qualitative affordances** distilled from the survey's prose — a sense of what each
medium is *like* to work with — **not lab benchmarks**. Treat them the way a painter weighs oil
vs. watercolor, not the way a reviewer benchmarks a monitor.

**Scored axes run 0–3:**

| Axis | 0 | 3 |
|------|---|---|
| `ambientLight` | needs darkness | readable in direct sunlight |
| `scale` | handheld / tiny | architectural / unlimited |
| `resolution` | blocky / point-light | sharp / high fidelity |
| `motion` | static / very slow | full-motion video / high refresh |
| `transparency` | fully opaque | highly see-through / floats in air |
| `cost` | DIY / cheap | premium / six-figure+ |
| `safety` | hazardous / licensed | inherently safe, low power |

**Categorical axes:**

- `color` — `mono` | `limited` | `full`
- `dimensionality` — `flat` | `curved` | `parallax` | `volumetric`
- `availability` — `lab` | `diy` | `rent` | `buy` (buy = a purchasable product today)

**`null` means "the source text doesn't say"** — an honest gap, rendered as a dash (—), *not* a
zero. A min-score filter excludes `null` cells (we can't claim they pass). Each row also carries a
`confidence` (`high`/`medium`/`low`) for how strongly the prose supported its ratings, and a
`source` path so any rating can be checked against the section it came from.

## What's included vs. excluded

One row per **choosable** technology — something a creative technologist could realistically deploy.
Each is labeled `comparable` (deployable today) or `borderline` (real but pre-commercial / niche).
Deliberately **excluded**: pure one-off art pieces, lab-only experiments, and obsolete numeric
displays (nixie, eggcrate, etc.) — they're wonderful in the survey but don't belong in a buyer's
matrix.

## Adding or correcting a technology

Edit `displays.js`. Copy an existing block and keep the axis keys. Two rules:

1. **Ground every `note` in the cited `source` file.** The note is what makes a rating checkable.
2. **Leave an axis `null` rather than guessing.** Visible gaps beat invented specs.

```js
{
  id: "kebab-case-unique-id",
  name: "Display Name",
  family: "Grouping",                 // becomes a filter option automatically
  status: "comparable",               // or "borderline"
  summary: "One-line plain-language description.",
  source: "alternative-displays/whatever.md",        // path within the gitbook repo
  gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/...",
  confidence: "high",                 // high | medium | low
  axes: {
    ambientLight:   { score: 2, note: "…grounded in the source…" },
    scale:          { score: 1, note: "…" },
    resolution:     { score: 2, note: "…" },
    color:          { value: "full", note: "…" },     // categorical: use `value`, not `score`
    motion:         { score: 3, note: "…" },
    transparency:   { score: 0, note: "…" },
    dimensionality: { value: "flat", note: "…" },
    availability:   { value: "buy",  note: "…" },
    cost:           { score: 1, note: "…" },
    safety:         { score: 3, note: "…" }
  }
}
```

Spotted a wrong rating? Open a PR or issue on the
[main repo](https://github.com/laserpilot/Survey_of_Alternative_Displays).

## Deploying via GitHub Pages

1. Push the branch and merge to the default branch.
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, branch = default,
   folder = `/ (root)`.
3. The tool will be live at:
   `https://laserpilot.github.io/Survey_of_Alternative_Displays/comparison-tool/`
4. Add a link to that URL from the GitBook (e.g. a line in `outline.md`) so readers can find it.

## Roadmap

- Fold in any newly added survey technologies as the book grows; revisit `borderline` items as they ship.
- Candidate future axes: interactivity/touch, indoor/outdoor durability, permanence/longevity.
- Phase 2: drive a printable PDF artifact from this same data layer, retiring the brittle
  `utilities/` pipeline.
