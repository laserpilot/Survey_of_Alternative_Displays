/*
 * Survey of Alternative Displays — comparison data layer
 * ------------------------------------------------------
 * One entry per CHOOSABLE display technology category (not every product).
 *
 * Ratings are QUALITATIVE AFFORDANCES grounded in the survey prose — NOT lab
 * benchmarks. Every axis carries a short `note` paraphrased from the linked
 * source .md. Where the prose says nothing about an axis, the value is `null`
 * and the tool renders it as "not stated" (—) so the gaps stay honest.
 *
 * Score axes (0–3):
 *   ambientLight  0 needs darkness        → 3 readable in direct sunlight
 *   scale         0 handheld/tiny         → 3 architectural / unlimited
 *   resolution    0 blocky/point-light    → 3 sharp / high fidelity
 *   motion        0 static / very slow    → 3 full-motion video / high refresh
 *   transparency  0 fully opaque          → 3 highly see-through / floats in air
 *   cost          0 DIY / cheap           → 3 premium / six-figure+
 *   safety        0 hazardous / licensed  → 3 inherently safe, low power
 *
 * Categorical axes (value strings):
 *   color          "mono" | "limited" | "full"
 *   dimensionality "flat" | "curved" | "parallax" | "volumetric"
 *   availability   "lab" | "diy" | "rent" | "buy"   (buy = purchasable product today)
 *
 * status:     "comparable" (deployable today) | "borderline" (real but pre-commercial/niche)
 * confidence: "high" | "medium" | "low"  — how strongly the prose supported these ratings
 *
 * To add or correct a row: copy a block, keep the axis keys, and ground each
 * note in the cited source file. Leave an axis `null` rather than guessing.
 */
window.DISPLAYS = [
  {
    id: "standard-flat-panel",
    name: "Standard Flat Panel (LCD / OLED)",
    family: "Standard",
    status: "comparable",
    summary: "The baseline: consumer LCD/OLED monitors and TVs. High res, affordable, flat, indoor.",
    source: "standard-displays/standard-displays-overview.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/standard-displays/standard-displays-overview",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "~300 nits typical; indoor. Outdoor needs special 1500+ nit panels." },
      scale:          { score: 2, note: "Single units max ~120in/305cm diagonal; larger needs tiling with bezels." },
      resolution:     { score: 3, note: "High resolution; ideal for close viewing." },
      color:          { value: "full", note: "Decent color/contrast (better on OLED); still misses part of visible gamut." },
      motion:         { score: 3, note: "Usually locked at 60hz; fine for video. Gaming panels go higher." },
      transparency:   { score: 0, note: "Opaque." },
      dimensionality: { value: "flat", note: "Two-dimensional and flat, even when showing 3D content." },
      availability:   { value: "buy", note: "Ubiquitous; affordable for most applications; long lasting." },
      cost:           { score: 0, note: "Most affordable option in this survey." },
      safety:         { score: 3, note: "Safe, standard power." }
    }
  },
  {
    id: "led-video-wall",
    name: "LED Video Wall",
    family: "Standard",
    status: "comparable",
    summary: "Tiled emissive LED panels. Very bright, scalable to architectural size, custom shapes.",
    source: "standard-displays/led.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/standard-displays/led",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "3000+ nits; viewable in direct sunlight." },
      scale:          { score: 3, note: "Tiles link into large walls; custom spheres, curves, triangles." },
      resolution:     { score: 2, note: "Depends on pixel pitch (0.9mm fine → 16-20mm for distance viewing)." },
      color:          { value: "full", note: "Full RGB color." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: 1, note: "High-pitch panels read as semi-transparent from a distance." },
      dimensionality: { value: "curved", note: "Flat, but custom curves and shapes available." },
      availability:   { value: "rent", note: "Mature market; buy or rent; many integrators." },
      cost:           { score: 3, note: "Hundreds of thousands to millions; often rented due to cost." },
      safety:         { score: 2, note: "High power draw; bright enough to strain eyes indoors." }
    }
  },
  {
    id: "projector",
    name: "Projector",
    family: "Standard",
    status: "comparable",
    summary: "Throws an image onto a surface. Economical at large scale; needs a darker room.",
    source: "standard-displays/projector.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/standard-displays/projector",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Best in darker environments; ambient light washes it out." },
      scale:          { score: 3, note: "Scales large; flexible throw ratio; multi-projector blending." },
      resolution:     { score: 2, note: "Source/lens dependent; not stated in detail." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Full video." },
      transparency:   { score: 0, note: "Projects onto a surface (can be a transparent one — see techniques)." },
      dimensionality: { value: "flat", note: "Flat projection onto a surface." },
      availability:   { value: "buy", note: "Mature, widely available." },
      cost:           { score: 1, note: "Most economical route to large-scale imagery." },
      safety:         { score: 3, note: "Not stated; generally safe." }
    }
  },
  {
    id: "transparent-lcd",
    name: "Transparent LCD",
    family: "Transparent",
    status: "comparable",
    summary: "See-through LCD, usually backlit inside a box. Best with B/W content; muted color.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Needs a controlled light source behind it; not for outdoor." },
      scale:          { score: 1, note: "Limited sizes; hard to tile (driver board on an edge)." },
      resolution:     { score: 2, note: "Cloudier than glass; duller color; B/W/gray reads best." },
      color:          { value: "limited", note: "Color possible but muted vs backlit LCD." },
      motion:         { score: 3, note: "Standard LCD refresh." },
      transparency:   { score: 2, note: "Very opaque on black (great reveal effect); cloudy when clear." },
      dimensionality: { value: "flat", note: "Flat." },
      availability:   { value: "buy", note: "Few specialty vendors (Hypebox, JDI Raelclear); DIY route is mediocre." },
      cost:           { score: 2, note: "Pricier than comparable backlit screens; specialty premium." },
      safety:         { score: 3, note: "Standard display power." }
    }
  },
  {
    id: "transparent-oled",
    name: "Transparent OLED",
    family: "Transparent",
    status: "comparable",
    summary: "Emissive see-through panel; better color than transparent LCD but dim and one-sided.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Not bright; unsuitable for outdoor or brightly lit spaces." },
      scale:          { score: 2, note: "55in models available; larger sizes rare." },
      resolution:     { score: 2, note: "1920x1080 on 55in; OLED color quality." },
      color:          { value: "full", note: "Full color OLED; 2023+ 'black mode' allows opaque blacks." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: 3, note: "~50%+ transparent; emissive points one direction; stacking darkens." },
      dimensionality: { value: "flat", note: "Flat (the rear driver bar limits tight layering)." },
      availability:   { value: "buy", note: "LG / Planar commercial 55in units; rental options; cheaper consumer models promised." },
      cost:           { score: 2, note: "~$20-25k for a 55in commercial display." },
      safety:         { score: 3, note: "Standard OLED power; touch combinations possible." }
    }
  },
  {
    id: "transparent-led",
    name: "Transparent LED",
    family: "Transparent",
    status: "comparable",
    summary: "See-through LED grid for stage/architecture. Scalable and bright; gaps visible up close.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "high",
    axes: {
      ambientLight:   { score: 2, note: "LED brightness, with a brightness/resolution tradeoff." },
      scale:          { score: 3, note: "Large architectural installs; strip-on-glass solutions very scalable." },
      resolution:     { score: 1, note: "Lower than backlit LED due to transparent gaps; for distance viewing." },
      color:          { value: "full", note: "Full RGB color." },
      motion:         { score: 3, note: "Full video." },
      transparency:   { score: 3, note: "True transparency; gaps between LEDs visible up close." },
      dimensionality: { value: "curved", note: "Flat but can wrap columns and curves." },
      availability:   { value: "buy", note: "Commercial (ROE Vanish, GLAAM G-Glass, Muxwave); stage/architecture standard." },
      cost:           { score: 2, note: "Premium pricing; suited to large-scale installs." },
      safety:         { score: 2, note: "Standard LED power; mounting requires engineering." }
    }
  },
  {
    id: "e-ink",
    name: "E-Ink / Electronic Paper",
    family: "Electronic Paper",
    status: "comparable",
    summary: "Reflective, sunlight-readable, near-zero power. Slow refresh, mostly monochrome, hard to source large.",
    source: "alternative-displays/electronic-paper-e-ink.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/electronic-paper-e-ink",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Reflective; one of the only displays readable in direct sunlight." },
      scale:          { score: 1, note: "Mostly <12in; Visionect 32in tiles and Prism architectural panels emerging." },
      resolution:     { score: 2, note: "Crisp static image; ghosting artifacts on refresh." },
      color:          { value: "mono", note: "Monochrome/grayscale primarily; color still in development." },
      motion:         { score: 0, note: "Very low refresh; unsuitable for motion graphics." },
      transparency:   { score: 0, note: "Opaque." },
      dimensionality: { value: "flat", note: "Flat." },
      availability:   { value: "buy", note: "Mostly e-readers; few dev kits / USB monitors in limited quantity." },
      cost:           { score: 2, note: "High cost relative to traditional displays at usable sizes." },
      safety:         { score: 3, note: "Extremely low power; only draws energy on change." }
    }
  },
  {
    id: "flexible-oled",
    name: "Flexible OLED",
    family: "Flexible",
    status: "comparable",
    summary: "Bendable/rollable OLED. Full color, high res; premium cost; flat once deployed.",
    source: "alternative-displays/flexible-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/flexible-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Emissive OLED; good color but dimmer than rigid panels." },
      scale:          { score: 2, note: "LG 55in/77in rollables; foldable phones; Royole panels." },
      resolution:     { score: 3, note: "High-resolution OLED quality." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: 0, note: "Not typically transparent (one unreleased 40% model)." },
      dimensionality: { value: "curved", note: "Can be curved or rolled; essentially flat when deployed." },
      availability:   { value: "buy", note: "Niche but accessible: phones, LG commercial models, Royole RoKit (~$959)." },
      cost:           { score: 3, note: "$20-25k for a 55in commercial unit; premium pricing." },
      safety:         { score: 3, note: "Standard power." }
    }
  },
  {
    id: "volumetric-swept",
    name: "Volumetric — Swept Volume (Voxon)",
    family: "Volumetric",
    status: "comparable",
    summary: "A fast-moving surface + high-FPS projector builds a true 3D voxel volume you walk around.",
    source: "alternative-displays/volumetric.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/volumetric",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Projected light; best in controlled lighting." },
      scale:          { score: 1, note: "Voxon VX1 is a compact desktop unit; scaling up is mechanically hard." },
      resolution:     { score: 1, note: "Z-resolution limited by projector framerate and platform speed." },
      color:          { value: "full", note: "Full color with a color projector." },
      motion:         { score: 2, note: "Needs very high projector FPS (VX1 ~4000fps)." },
      transparency:   { score: 2, note: "Additive light stacking; reads as a glowing volume." },
      dimensionality: { value: "volumetric", note: "True 3D, viewable from multiple angles." },
      availability:   { value: "buy", note: "Voxon VX1 commercial; DIY swept-volume builds documented." },
      cost:           { score: 2, note: "VX1 professional pricing; DIY possible with Raspberry Pi." },
      safety:         { score: 2, note: "Moving mechanical platform plus projector." }
    }
  },
  {
    id: "volumetric-led-cube",
    name: "Volumetric — LED Cube",
    family: "Volumetric",
    status: "comparable",
    summary: "3D grid of addressable LEDs. True multi-angle 3D at low fidelity; classic DIY build.",
    source: "alternative-displays/volumetric.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/volumetric",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 2, note: "LED brightness; moderate, indoor." },
      scale:          { score: 2, note: "Scales with LED count; LEDPulse Dragon is a productized example." },
      resolution:     { score: 1, note: "Lower fidelity; limited by LED density." },
      color:          { value: "full", note: "Full RGB color." },
      motion:         { score: 3, note: "Full video capable." },
      transparency:   { score: 2, note: "Semi-transparent due to grid spacing." },
      dimensionality: { value: "volumetric", note: "True 3D; more viewing angles than layered screens." },
      availability:   { value: "buy", note: "LEDPulse Dragon commercial; many DIY designs." },
      cost:           { score: 1, note: "Commercial products exist; DIY is affordable." },
      safety:         { score: 2, note: "LED power; heat management for dense arrays." }
    }
  },
  {
    id: "looking-glass",
    name: "Lenticular Light-field (Looking Glass)",
    family: "Lenticular / Multiview",
    status: "comparable",
    summary: "Glasses-free 3D via lenticular optics. Floating parallax image in a ~53° cone.",
    source: "alternative-displays/lenticular-and-multiview-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/lenticular-and-multiview-displays",
    confidence: "high",
    axes: {
      ambientLight:   { score: null, note: "Not stated; OLED-backed." },
      scale:          { score: 2, note: "7in portable up to 16/32/65in displays." },
      resolution:     { score: 2, note: "High base OLED res; depth resolution limited by view count." },
      color:          { value: "full", note: "Full color OLED." },
      motion:         { score: 3, note: "Standard refresh plus depth slices." },
      transparency:   { score: 0, note: "Not transparent; image appears to float behind glass." },
      dimensionality: { value: "parallax", note: "3D parallax (horizontal stronger than vertical); ~53° cone." },
      availability:   { value: "buy", note: "Buy directly from Looking Glass Factory; recurring releases." },
      cost:           { score: 2, note: "7in consumer units affordable; larger displays expensive." },
      safety:         { score: 3, note: "Standard display power." }
    }
  },
  {
    id: "sony-spatial-reality",
    name: "Eye-tracked Autostereo (Sony Spatial Reality)",
    family: "Lenticular / Multiview",
    status: "comparable",
    summary: "Single-viewer glasses-free 3D with eye tracking for full parallax. Sharp, one user.",
    source: "alternative-displays/lenticular-and-multiview-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/lenticular-and-multiview-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Desktop monitor brightness; indoor." },
      scale:          { score: 1, note: "15in and 27in models; single-user." },
      resolution:     { score: 3, note: "4K underlying panel; sharp; full parallax via eye tracking." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "parallax", note: "Glasses-free 3D; full H+V parallax for one tracked viewer." },
      availability:   { value: "buy", note: "Commercial professional product." },
      cost:           { score: 2, note: "Professional pricing (not stated precisely)." },
      safety:         { score: 3, note: "Standard display power." }
    }
  },
  {
    id: "laser-projector",
    name: "Laser Projector",
    family: "Laser",
    status: "comparable",
    summary: "Scanned RGB laser draws sharp bright vector lines in space/haze. Powerful aesthetic; serious hazard.",
    source: "alternative-displays/laser-projectors.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/laser-projectors",
    confidence: "high",
    axes: {
      ambientLight:   { score: 2, note: "Sharp bright lines, very high contrast, no black bleed." },
      scale:          { score: 2, note: "Scales without much light loss; throw distance required." },
      resolution:     { score: 1, note: "Outline/vector imagery only; limited by points-per-second (20-40kpps+)." },
      color:          { value: "full", note: "RGB lasers; 7-color low end to wide gamut high end." },
      motion:         { score: 2, note: "Flicker risk if content too complex at 60fps." },
      transparency:   { score: 3, note: "Draws lines in mid-air/haze." },
      dimensionality: { value: "flat", note: "Draws 2D vector outlines; in haze the beams read as lines/cones in mid-air, but it isn't a controllable 3D volume." },
      availability:   { value: "buy", note: "Mature niche; vendors supply units and safety variances; licensed operators." },
      cost:           { score: 2, note: "Professional equipment (485mW, 1W, 2W+ classes)." },
      safety:         { score: 0, note: "Severe: 1mW can damage eyes; 5mW+ needs protection; fire/ozone; licensing required." }
    }
  },
  {
    id: "peppers-ghost",
    name: "Pepper's Ghost",
    family: "Optical / Reflective",
    status: "comparable",
    summary: "150-year-old reflection illusion. Bright source + angled glass/film makes an image float. DIY-friendly.",
    source: "techniques/peppers-ghost.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/peppers-ghost",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Needs a bright source and a dark/controlled viewing space." },
      scale:          { score: 2, note: "Glass limited; specialized film scales to large stages." },
      resolution:     { score: 2, note: "As good as the source (monitor/projector); image is mirrored." },
      color:          { value: "full", note: "Source-dependent." },
      motion:         { score: 3, note: "Source-dependent; full video." },
      transparency:   { score: 3, note: "Image appears to float; half-silvered mirror/film." },
      dimensionality: { value: "parallax", note: "2D with a 3D illusion; pyramid rigs give discrete viewing angles." },
      availability:   { value: "diy", note: "DIY glass possible; vendors (Musion, Arena 3D); reflective film (3M, DuPont)." },
      cost:           { score: 1, note: "Glass costly at scale; film economical; Musion patent/licensing notes." },
      safety:         { score: 3, note: "Source power; careful alignment, but safe." }
    }
  },
  {
    id: "fog-screen",
    name: "Fog / Haze Screen",
    family: "Fog / Water / Mist",
    status: "comparable",
    summary: "Projection onto a thin laminar haze layer; image hangs in the air and you can walk through it.",
    source: "techniques/projection-on-water-or-fog.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/projection-on-water-or-fog",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Needs contrast/darker space; projector hotspot visible." },
      scale:          { score: 1, note: "Physics-limited; ~2m x 1.5m typical commercial max." },
      resolution:     { score: 1, note: "Moderate sharpness; mist particle refraction." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Full video." },
      transparency:   { score: 3, note: "Very transparent; you can pass through it." },
      dimensionality: { value: "flat", note: "2D projection; mist gives a subtle volume feel." },
      availability:   { value: "buy", note: "Commercial units (~$20k+); DIY possible but haze control is hard." },
      cost:           { score: 2, note: "Commercial systems expensive; DIY needs materials investment." },
      safety:         { score: 2, note: "Projector power; haze and air-current management." }
    }
  },
  {
    id: "switchable-glass-pdlc",
    name: "Switchable Glass (PDLC)",
    family: "Switchable Materials",
    status: "comparable",
    summary: "Smart glass that flips clear↔opaque. Not an image display — an addressable opacity surface.",
    source: "techniques/switchable-glass.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/switchable-glass",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Works with ambient light; acts as a variable tint." },
      scale:          { score: 2, note: "Standard window/partition sizes; custom fragmented elements via Gauzy." },
      resolution:     { score: 0, note: "Not a display; pure opacity control." },
      color:          { value: "mono", note: "Clear-to-opaque state only." },
      motion:         { score: 2, note: "Fast switching; can dim continuously." },
      transparency:   { score: 3, note: "Clear-to-opaque, dimmable." },
      dimensionality: { value: "flat", note: "Flat surface." },
      availability:   { value: "buy", note: "Mature commercial smart glass; custom applications available." },
      cost:           { score: 2, note: "Commercial glass available; custom work pricier." },
      safety:         { score: 3, note: "Low power; safe." }
    }
  },
  {
    id: "flip-dot",
    name: "Flip-Dot",
    family: "Mechanical / Kinetic",
    status: "comparable",
    summary: "Electromagnetic disks flip between two colors. Reflective, sunlight-readable, with a signature clatter.",
    source: "experimental-other/physical-mechanical-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/physical-mechanical-displays",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Reflective disks; daylight visible." },
      scale:          { score: 2, note: "Large arrays exist (588x216); curved implementations done." },
      resolution:     { score: 1, note: "Binary on/off pixels; spinning variants add some grayscale." },
      color:          { value: "mono", note: "Two colors per disk (front/back); no full color." },
      motion:         { score: 2, note: "Mechanical switching fast enough for crude video." },
      transparency:   { score: 0, note: "Opaque mechanical elements." },
      dimensionality: { value: "curved", note: "Flat typical; can be curved." },
      availability:   { value: "buy", note: "Few vendors worldwide (Scoretronics, Flipdots)." },
      cost:           { score: 2, note: "Expensive per pixel; labor-intensive to install." },
      safety:         { score: 3, note: "Electromagnet power; audible flipping; safe." }
    }
  },
  {
    id: "drone-swarm",
    name: "Drone Swarm Display",
    family: "Aerial",
    status: "comparable",
    summary: "Hundreds–thousands of LED drones as flying voxels. Massive 3D sky imagery; temporary and pricey.",
    source: "experimental-other/drone-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/drone-displays",
    confidence: "high",
    axes: {
      ambientLight:   { score: 2, note: "Bright LEDs visible up to ~2km; a night-sky medium." },
      scale:          { score: 3, note: "Hundreds standard; record 3281 UAVs; massive scale possible." },
      resolution:     { score: 0, note: "Very low; point-light images only." },
      color:          { value: "full", note: "RGB LEDs; full color." },
      motion:         { score: 1, note: "Real-time positioning limited by flight dynamics." },
      transparency:   { score: 3, note: "Floating points of light in the sky." },
      dimensionality: { value: "volumetric", note: "True 3D volumetric formations." },
      availability:   { value: "rent", note: "Commercial services (Intel, SkyMagic, Celestial); permits/logistics." },
      cost:           { score: 3, note: "Intel ~$99k for 200 drones, ~$299k for 500; thousands for dense images." },
      safety:         { score: 1, note: "~30min battery; airspace clearance and flight restrictions." }
    }
  },
  {
    id: "crt",
    name: "Cathode Ray Tube (CRT)",
    family: "Legacy",
    status: "comparable",
    summary: "Obsolete but still sourced for museums and vector art. Superb sharp vector lines; heavy, high-voltage.",
    source: "legacy/cathode-ray-tube.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/legacy/cathode-ray-tube",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Moderate brightness; not for outdoor." },
      scale:          { score: 0, note: "Limited by tube manufacturing; no longer in production." },
      resolution:     { score: 3, note: "Excellent sharpness, especially for vector graphics." },
      color:          { value: "limited", note: "Color phosphor possible; monochrome most common." },
      motion:         { score: 3, note: "Vector drawing; high refresh possible." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "flat", note: "2D display." },
      availability:   { value: "rent", note: "Obsolete; few sources (Dotronix) for museum installs." },
      cost:           { score: 2, note: "Expensive to source/maintain for new installs." },
      safety:         { score: 1, note: "High voltage; heat; aging-unit safety concerns." }
    }
  },
  {
    id: "flexible-led",
    name: "Flexible LED",
    family: "Flexible",
    status: "comparable",
    summary: "Wrappable LED mesh for architecture. Lower res than OLED but bends around columns at scale.",
    source: "alternative-displays/flexible-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/flexible-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 2, note: "Typical LED brightness." },
      scale:          { score: 3, note: "Wraps columns; large architectural installs." },
      resolution:     { score: 1, note: "Lower than OLED; large pixel pitch." },
      color:          { value: "full", note: "Full RGB." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: null, note: "Not stated." },
      dimensionality: { value: "curved", note: "Curves and wraps around structures." },
      availability:   { value: "buy", note: "Commercial (amFlex LED); microLED versions in development." },
      cost:           { score: null, note: "Not stated." },
      safety:         { score: null, note: "Not stated." }
    }
  },
  {
    id: "hmd",
    name: "Head-Mounted Display (VR / AR / MR)",
    family: "Head-Mounted",
    status: "comparable",
    summary: "Near-eye stereoscopic display worn on the head. Fully immersive (VR) or see-through (AR/MR); one viewer.",
    source: "alternative-displays/head-mounted-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/head-mounted-displays",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Indoor-focused; AR/MR adds optional passthrough." },
      scale:          { score: 0, note: "Single-user near-eye; not for group viewing." },
      resolution:     { score: 3, note: "High resolution in modern headsets." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: ">60hz required; latency-critical." },
      transparency:   { score: 1, note: "AR/MR passthrough; VR fully enclosed." },
      dimensionality: { value: "volumetric", note: "Stereoscopic rendering of a 3D virtual space." },
      availability:   { value: "buy", note: "Mature consumer (Quest, Index); pro MR (Varjo, Magic Leap) costly." },
      cost:           { score: 1, note: "Consumer VR ~$300-1000; professional MR $2000+." },
      safety:         { score: 2, note: "Battery-powered; thermal management for long sessions." }
    }
  },
  {
    id: "leia-dimenco",
    name: "Diffractive Lightfield (Leia / Dimenco)",
    family: "Lenticular / Multiview",
    status: "comparable",
    summary: "Glasses-free 3D tablet using a diffractive backlight. Consumer form factor, parallax depth.",
    source: "alternative-displays/lenticular-and-multiview-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/lenticular-and-multiview-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Tablet brightness; indoor." },
      scale:          { score: 0, note: "Tablet form factor (Lumepad)." },
      resolution:     { score: 2, note: "3D light-field experience on a tablet panel." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "parallax", note: "3D parallax via diffractive backlight." },
      availability:   { value: "buy", note: "Lumepad tablet; monitor possibly in development." },
      cost:           { score: 1, note: "Consumer tablet pricing." },
      safety:         { score: 3, note: "Battery tablet; safe." }
    }
  },
  {
    id: "modified-polarizer-lcd",
    name: "Modified-Polarizer LCD",
    family: "Modified Polarizer",
    status: "comparable",
    summary: "LCD with its polarizer removed: reads blank white until you look through a separate polarizing filter.",
    source: "alternative-displays/modified-polarizers.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/modified-polarizers",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Depends on backlight; neutral white appearance." },
      scale:          { score: 2, note: "Standard LCD sizes; external polarizer can sit at any distance." },
      resolution:     { score: 2, note: "Standard LCD resolution." },
      color:          { value: "limited", note: "Blank white without a polarizer; colors invert/warp by polarizer angle." },
      motion:         { score: 3, note: "Standard LCD refresh." },
      transparency:   { score: 2, note: "Reads white to the naked eye; high transparency behind a mirror setup." },
      dimensionality: { value: "flat", note: "Flat." },
      availability:   { value: "rent", note: "Fuse WhiteSpace displays rent/sell; DIY polarizer removal documented." },
      cost:           { score: 2, note: "Commercial rental/purchase available." },
      safety:         { score: 3, note: "Standard power; handle the polarizer film carefully." }
    }
  },
  {
    id: "spinning-fan-pov",
    name: "Spinning-Fan POV (Hypervsn)",
    family: "Transparent",
    status: "comparable",
    summary: "LED blades spin to paint a persistence-of-vision image that appears to float in mid-air. Looks 3D, is flat.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 2, note: "LEDs on blades; decent brightness." },
      scale:          { score: 2, note: "Multiple units link for larger images." },
      resolution:     { score: 1, note: "Low resolution; perceptually flat." },
      color:          { value: "full", note: "Full RGB LED." },
      motion:         { score: 2, note: "POV effect limited by spin rate." },
      transparency:   { score: 3, note: "Appears to float in mid-air; semi-transparent." },
      dimensionality: { value: "flat", note: "Looks 3D but is a flat visual trick." },
      availability:   { value: "buy", note: "Hypervsn commercial; used in installations." },
      cost:           { score: 1, note: "Affordable novelty displays." },
      safety:         { score: 1, note: "Exposed spinning blade hazard." }
    }
  },
  {
    id: "volumetric-layered",
    name: "Volumetric — Layered Screens",
    family: "Volumetric",
    status: "comparable",
    summary: "A stack of transparent LCD/OLED layers builds depth. True 3D but few Z-slices; each layer dims the stack.",
    source: "alternative-displays/volumetric.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/volumetric",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Stacking reduces brightness per layer." },
      scale:          { score: 1, note: "Z-depth limited by layer count (Depthcube ~20 LCDs)." },
      resolution:     { score: 1, note: "Depth resolution limited by layers; XY ok but brightness degrades." },
      color:          { value: "limited", note: "Grayscale often preferred; color hard through stacked panels." },
      motion:         { score: 2, note: "Each layer needs its own video stream." },
      transparency:   { score: 2, note: "Requires transparent layers; internal reflections possible." },
      dimensionality: { value: "volumetric", note: "True 3D with limited Z resolution." },
      availability:   { value: "rent", note: "MIT research; LightSpace Depthcube for medical/engineering; DIY builds." },
      cost:           { score: 2, note: "Commercial Depthcube expensive; medical/pro use." },
      safety:         { score: 2, note: "High power for many drivers; heat management." }
    }
  },
  {
    id: "water-screen",
    name: "Water Screen",
    family: "Fog / Water / Mist",
    status: "comparable",
    summary: "Projection onto a sheet of jetted or falling water. Huge outdoor scale; soft, haloed, semi-transparent.",
    source: "techniques/projection-on-water-or-fog.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/projection-on-water-or-fog",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Rear projection; semi-transparent haze; best in lower light." },
      scale:          { score: 3, note: "Upward jets reach 20-30m wide x 6-10m high." },
      resolution:     { score: 1, note: "Lower sharpness; halo from mist; reduced contrast." },
      color:          { value: "full", note: "Full color projection." },
      motion:         { score: 3, note: "Full video." },
      transparency:   { score: 3, note: "Semi-transparent screen; you can see through it." },
      dimensionality: { value: "flat", note: "2D projection; mist adds a subtle volume." },
      availability:   { value: "buy", note: "Commercial systems; outdoor fountain installs common." },
      cost:           { score: 3, note: "Premium; needs water-pump infrastructure (indoor falling cheaper)." },
      safety:         { score: 2, note: "High-power projectors; water; weather-dependent outdoors." }
    }
  },
  {
    id: "projection-scrim",
    name: "Projection on Scrim / Gauze",
    family: "Projection on Material",
    status: "comparable",
    summary: "The accessible transparent-projection workhorse: project onto tulle, gauze, or scrim. Cheap and DIY-friendly.",
    source: "techniques/projection-on-static-material.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/projection-on-static-material",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Needs controlled lighting; rear projection hotspot." },
      scale:          { score: 3, note: "Large seamless theater fabric; glass film ~$1200 for 2.2x1.2m." },
      resolution:     { score: 2, note: "Material-dependent; layering adds depth." },
      color:          { value: "full", note: "Full color projection." },
      motion:         { score: 3, note: "Full video." },
      transparency:   { score: 2, note: "Semi-transparent; depends on weave." },
      dimensionality: { value: "flat", note: "2D; layered materials add depth perception." },
      availability:   { value: "diy", note: "Theatrical standard; DIY with tulle/netting; specialty vendors for big installs." },
      cost:           { score: 1, note: "Fabric economical; specialty glass film expensive." },
      safety:         { score: 2, note: "Projector power; fabric is fire-sensitive." }
    }
  },
  {
    id: "switchable-glass-spd",
    name: "Switchable Glass (SPD)",
    family: "Switchable Materials",
    status: "comparable",
    summary: "Suspended-particle smart glass. Tints clear↔dark (purple-blue); slower than PDLC. Opacity, not imagery.",
    source: "techniques/switchable-glass.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/switchable-glass",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Variable tint; works with ambient light." },
      scale:          { score: 2, note: "Standard window sizes; Gauzy custom applications." },
      resolution:     { score: 0, note: "Not a display; opacity control." },
      color:          { value: "mono", note: "Purple-blue tint only." },
      motion:         { score: 1, note: "Slower transition than PDLC." },
      transparency:   { score: 3, note: "Opacity control; limited color." },
      dimensionality: { value: "flat", note: "Flat surface." },
      availability:   { value: "buy", note: "Commercial via Gauzy; niche." },
      cost:           { score: 2, note: "Commercial; specialty product." },
      safety:         { score: 3, note: "Standard power; safe." }
    }
  },
  {
    id: "switchable-glass-electrochromic",
    name: "Switchable Glass (Electrochromic)",
    family: "Switchable Materials",
    status: "comparable",
    summary: "Electrochromic smart glass (e.g. SageGlass, airplane windows). Tints slowly; no diffusion.",
    source: "techniques/switchable-glass.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/switchable-glass",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Reduces incoming light via tint." },
      scale:          { score: 2, note: "Window / aircraft panel sizes." },
      resolution:     { score: 0, note: "Not a display; tint control." },
      color:          { value: "mono", note: "Tint shift between two states." },
      motion:         { score: 0, note: "Very slow transition." },
      transparency:   { score: 3, note: "Clear-to-tint range." },
      dimensionality: { value: "flat", note: "Flat surface." },
      availability:   { value: "buy", note: "Mature (SageGlass); widespread airplane-window use." },
      cost:           { score: 2, note: "Premium pricing." },
      safety:         { score: 3, note: "Low power; safe." }
    }
  },
  {
    id: "switchable-glass-lcd",
    name: "LCD Panels as Switchable Pixels",
    family: "Switchable Materials",
    status: "comparable",
    summary: "Custom LCD panels used as large grayscale 'pixels' for sculptural, semi-transparent installations.",
    source: "techniques/switchable-glass.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/switchable-glass",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Depends on backlight; grayscale." },
      scale:          { score: 2, note: "Custom panel sizes; tiling possible." },
      resolution:     { score: 1, note: "Grayscale value per panel; limited by panel count." },
      color:          { value: "mono", note: "Grayscale typically; color possible." },
      motion:         { score: 3, note: "Standard LCD refresh." },
      transparency:   { score: 2, note: "Can reach a semi-transparent state." },
      dimensionality: { value: "flat", note: "2D display." },
      availability:   { value: "buy", note: "Custom sources (Pacer, White Wing Logic); used by Hypersonic, Jason Bruges." },
      cost:           { score: 3, note: "Custom manufacturing; expensive." },
      safety:         { score: 3, note: "Standard LCD power." }
    }
  },
  {
    id: "volumetric-projection-fog",
    name: "Volumetric Projection (Fog + Mirrors)",
    family: "Volumetric",
    status: "comparable",
    summary: "Converging projections in fog via a parabolic-mirror array (Kimchi and Chips). True 3D points in space.",
    source: "techniques/volumetric-projection.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/volumetric-projection",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Additive light in fog; moderate brightness." },
      scale:          { score: 2, note: "Limited by mirror-array size; expandable with larger arrays." },
      resolution:     { score: 1, note: "Limited by converging-point resolution; fine detail needs high-res projectors." },
      color:          { value: "limited", note: "Overlapping colors shift hue; white reads best." },
      motion:         { score: 3, note: "Full video via custom rendering pipeline." },
      transparency:   { score: 3, note: "True 3D points hanging in fog." },
      dimensionality: { value: "volumetric", note: "True volumetric display." },
      availability:   { value: "diy", note: "Advanced technique; custom software; artist projects documented." },
      cost:           { score: 3, note: "High equipment cost plus custom software development." },
      safety:         { score: 1, note: "Fog + projectors; laser versions are extremely hazardous." }
    }
  },
  {
    id: "diffusion-fiber-acrylic",
    name: "Fiber-Optic / Acrylic Diffusion",
    family: "Diffusion / Distortion",
    status: "comparable",
    summary: "Pipe light/video through fiber bundles or acrylic for a soft, glowing, low-res image. Very DIY-friendly.",
    source: "techniques/diffusion-and-distortion.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/diffusion-and-distortion",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Depends on the light source behind it." },
      scale:          { score: 2, note: "Scalable via strand count or acrylic size." },
      resolution:     { score: 1, note: "Low resolution; diffuse quality." },
      color:          { value: "full", note: "Full color with an LED or projector source." },
      motion:         { score: 3, note: "Full video capable." },
      transparency:   { score: 2, note: "Translucent; diffuse light." },
      dimensionality: { value: "flat", note: "Appears volumetric via diffusion but the source is 2D." },
      availability:   { value: "diy", note: "Materials widely available; DIY documented; used in high-end pieces." },
      cost:           { score: 1, note: "Moderate; custom fabrication." },
      safety:         { score: 3, note: "Standard projector/LED power; safe." }
    }
  },
  {
    id: "computational-caustics",
    name: "Computational Caustics (Rayform)",
    family: "Diffusion / Distortion",
    status: "comparable",
    summary: "A precisely-shaped clear surface bends light into a hidden image. Magic from a blank-looking object — but static.",
    source: "techniques/diffusion-and-distortion.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/diffusion-and-distortion",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 2, note: "Works with a point light source (optimal) or sunlight." },
      scale:          { score: 2, note: "Scalable via custom mold / manufacturing." },
      resolution:     { score: 2, note: "Image formed by refraction through a wavy surface." },
      color:          { value: "full", note: "Color comes from the light source." },
      motion:         { score: 0, note: "Static images only; not video." },
      transparency:   { score: 3, note: "Transparent surface; image appears via light manipulation." },
      dimensionality: { value: "flat", note: "2D image on a projection surface." },
      availability:   { value: "buy", note: "Rayform commercial custom service." },
      cost:           { score: 2, note: "Custom manufacturing; premium at larger sizes." },
      safety:         { score: 3, note: "Needs a light source; safe." }
    }
  },
  {
    id: "led-wood-veneer",
    name: "LED Behind Wood Veneer (DetaiLED)",
    family: "Diffusion / Distortion",
    status: "comparable",
    summary: "An LED wall hidden behind thin wood veneer — a surface that looks like solid wood until it lights up.",
    source: "techniques/diffusion-and-distortion.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/diffusion-and-distortion",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "LED brightness reduced by the veneer." },
      scale:          { score: 3, note: "Scalable via tile count." },
      resolution:     { score: 1, note: "Diffused LED; natural color shift from the wood." },
      color:          { value: "full", note: "Full color (warm-shifted by the wood)." },
      motion:         { score: 3, note: "Full video capable." },
      transparency:   { score: 1, note: "Semi-transparent veneer." },
      dimensionality: { value: "flat", note: "Flat LED wall with veneer texture." },
      availability:   { value: "buy", note: "DetaiLED commercial; specialized fabrication." },
      cost:           { score: 2, note: "Premium; custom fabrication required." },
      safety:         { score: 2, note: "LED heat; wood needs proper sealing." }
    }
  },
  {
    id: "high-refresh",
    name: "High-Refresh-Rate Display",
    family: "Standard",
    status: "comparable",
    summary: "An ordinary panel pushed to 240–1000hz. Same image space, but the temporal dimension becomes a medium.",
    source: "experimental-other/high-refresh-rate-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/high-refresh-rate-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Standard display brightness." },
      scale:          { score: 2, note: "Standard display sizes; LED walls too." },
      resolution:     { score: 2, note: "Standard spatial res; high framerate adds smoothness." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "240/360/390hz+ consumer; 500hz LED walls; 1000hz research." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "flat", note: "Flat display." },
      availability:   { value: "buy", note: "Gaming monitors; high-refresh LED walls." },
      cost:           { score: 2, note: "Premium for high refresh." },
      safety:         { score: 2, note: "Higher power than 60hz; cooling matters." }
    }
  },
  {
    id: "glow-in-dark",
    name: "UV + Glow-in-the-Dark Surface",
    family: "Reactive / Light-Activated",
    status: "comparable",
    summary: "A UV array 'draws' onto phosphorescent material; the image glows and slowly fades. Persistence as a medium.",
    source: "experimental-other/light-activated-and-other-reactive-surfaces-and-materials.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/light-activated-and-other-reactive-surfaces-and-materials",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 0, note: "Glow only reads in darkness after UV exposure." },
      scale:          { score: 2, note: "Scalable with UV array size." },
      resolution:     { score: 1, note: "Depends on UV element resolution and glow material." },
      color:          { value: "limited", note: "Color via different glow pigments." },
      motion:         { score: 0, note: "Fades gradually; not real-time animation." },
      transparency:   { score: 0, note: "Glowing surface." },
      dimensionality: { value: "flat", note: "2D surface glow." },
      availability:   { value: "diy", note: "Materials available; DIY; artists (Harvey Moon's Persistence)." },
      cost:           { score: 1, note: "Moderate cost for UV LEDs and glow materials." },
      safety:         { score: 2, note: "UV safety with intense arrays." }
    }
  },
  {
    id: "split-flap",
    name: "Split-Flap",
    family: "Mechanical / Kinetic",
    status: "comparable",
    summary: "Rotating printed flaps (the train-station board). Reflective, retro, satisfying clatter; slow updates.",
    source: "experimental-other/physical-mechanical-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/physical-mechanical-displays",
    confidence: "high",
    axes: {
      ambientLight:   { score: 3, note: "Reflective elements; daylight visible." },
      scale:          { score: 2, note: "Scalable flap array; custom options." },
      resolution:     { score: 1, note: "One glyph/image per flap; Picture Flap allows custom images." },
      color:          { value: "limited", note: "Depends on flap design; two-sided possible." },
      motion:         { score: 1, note: "Mechanical; limited update speed; best for text/static." },
      transparency:   { score: 0, note: "Opaque mechanical elements." },
      dimensionality: { value: "flat", note: "Flat surface." },
      availability:   { value: "buy", note: "Commercial (Oat Foundry); API-driven updates." },
      cost:           { score: 2, note: "Moderately priced commercial product." },
      safety:         { score: 2, note: "Motor per flap; signature noise; mechanical maintenance." }
    }
  },
  {
    id: "kinetic-mechanical",
    name: "Kinetic / Motorized Pixel Displays",
    family: "Mechanical / Kinetic",
    status: "comparable",
    summary: "Motorized physical elements — mirrors, balls, blocks, thread (Rozin, Breakfast Brixels). Sculptural, tactile.",
    source: "experimental-other/physical-mechanical-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/physical-mechanical-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 2, note: "Reflective / light-interactive materials; surface-dependent." },
      scale:          { score: 3, note: "Highly scalable; small to room-scale." },
      resolution:     { score: 1, note: "Limited by motor count and element resolution." },
      color:          { value: "limited", note: "Depends on materials; can be full color." },
      motion:         { score: 2, note: "Mechanical refresh; depends on motor speed." },
      transparency:   { score: 1, note: "Often semi-transparent when elements disperse." },
      dimensionality: { value: "curved", note: "Can reach 3D via elements suspended on wires." },
      availability:   { value: "buy", note: "Artist-driven; Breakfast Brixels/Pins commercial." },
      cost:           { score: 3, note: "Expensive; cost scales with resolution (motors + control)." },
      safety:         { score: 2, note: "Motor power; heat and noise in dense arrays." }
    }
  },
  {
    id: "haptic-shape",
    name: "Shape-Shifting / Haptic Surface",
    family: "Mechanical / Kinetic",
    status: "comparable",
    summary: "An actuated surface that physically rises into 3D topology (MIT inFORM) or projects mid-air touch (Ultraleap).",
    source: "experimental-other/physical-mechanical-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/physical-mechanical-displays",
    confidence: "medium",
    axes: {
      ambientLight:   { score: null, note: "Usually paired with a separate visual display." },
      scale:          { score: 2, note: "Desktop to room-scale." },
      resolution:     { score: 1, note: "Depends on actuator density." },
      color:          { value: "mono", note: "Typically a B/W depth/height surface." },
      motion:         { score: 3, note: "Real-time haptic feedback." },
      transparency:   { score: 0, note: "Usually an opaque surface." },
      dimensionality: { value: "volumetric", note: "Physical 3D surface topology." },
      availability:   { value: "rent", note: "inFORM is research; Ultraleap (ultrasonic) and TanvasTouch are commercial." },
      cost:           { score: 3, note: "Research-grade expensive; commercial haptics emerging." },
      safety:         { score: 2, note: "Actuator / ultrasonic / electrical power." }
    }
  },
  {
    id: "circular-nonrect",
    name: "Circular / Non-Rectangular Display",
    family: "Circular / Non-Rect",
    status: "comparable",
    summary: "Round or odd-shaped panels (round LCDs, masked rectangles). Small and cheap; great for objects and dials.",
    source: "alternative-displays/circular-and-non-rectangular.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/circular-and-non-rectangular",
    confidence: "high",
    axes: {
      ambientLight:   { score: 1, note: "Standard LCD brightness." },
      scale:          { score: 0, note: "1-5in circular displays common; triangular rare." },
      resolution:     { score: 2, note: "240x240 up to 1080x1080 circular options." },
      color:          { value: "full", note: "Full color or monochrome." },
      motion:         { score: 3, note: "Standard LCD refresh." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "flat", note: "Flat; custom outlines." },
      availability:   { value: "buy", note: "Waveshare/Adafruit; HDMI ~$200; many use SPI/ribbon connectors." },
      cost:           { score: 0, note: "Under ~$200 for circular displays." },
      safety:         { score: 3, note: "Standard LCD power." }
    }
  },
  {
    id: "flexible-microled",
    name: "Flexible microLED",
    family: "Flexible",
    status: "borderline",
    summary: "Bendable/stretchable microLED. Very high res and bright in principle, but still lab prototypes.",
    source: "alternative-displays/flexible-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/flexible-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: 2, note: "microLED tends to be bright; not stated for flexible versions." },
      scale:          { score: 1, note: "Stretchable prototype shown; Royole flexible microLED." },
      resolution:     { score: 3, note: "Very high resolution potential." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Standard video refresh." },
      transparency:   { score: null, note: "Not stated." },
      dimensionality: { value: "curved", note: "Flexible; stretchable." },
      availability:   { value: "lab", note: "Lab prototype; Royole RoTree product mentioned." },
      cost:           { score: null, note: "Not stated." },
      safety:         { score: null, note: "Not stated." }
    }
  },
  {
    id: "transparent-microled",
    name: "Transparent microLED",
    family: "Transparent",
    status: "borderline",
    summary: "Samsung's CES 2024 transparent microLED. Expected to outshine transparent OLED; not yet purchasable.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "low",
    axes: {
      ambientLight:   { score: 2, note: "Expected to exceed OLED brightness." },
      scale:          { score: null, note: "Samsung prototype shown; sizing not stated." },
      resolution:     { score: null, note: "Not stated." },
      color:          { value: "full", note: "Full color microLED." },
      motion:         { score: null, note: "Not stated." },
      transparency:   { score: 3, note: "Transparent like other transparent LED." },
      dimensionality: { value: "flat", note: "Flat." },
      availability:   { value: "lab", note: "CES 2024 debut; no commercial availability." },
      cost:           { score: 3, note: "Expected to be expensive." },
      safety:         { score: null, note: "Not stated." }
    }
  },
  {
    id: "realfiction",
    name: "Directional-Pixel Multiview (RealFiction)",
    family: "Lenticular / Multiview",
    status: "borderline",
    summary: "Multiview 3D that keeps full spatial resolution (no lossy lenticular). Demonstrated, not yet mainstream.",
    source: "alternative-displays/lenticular-and-multiview-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/lenticular-and-multiview-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: 1, note: "LED/LCD brightness." },
      scale:          { score: 2, note: "Microelectronics and LCD scales." },
      resolution:     { score: 3, note: "Keeps full spatial resolution (no lenticular loss)." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 2, note: "Time-multiplexed via a ferroelectric LC overlay." },
      transparency:   { score: 0, note: "Not transparent." },
      dimensionality: { value: "parallax", note: "Multiview 3D with eye tracking." },
      availability:   { value: "lab", note: "Lab demonstrations; commercial development ongoing." },
      cost:           { score: null, note: "Not stated." },
      safety:         { score: null, note: "Not stated." }
    }
  },
  {
    id: "misapplied-sciences",
    name: "Parallel Reality (Misapplied Sciences)",
    family: "Lenticular / Multiview",
    status: "borderline",
    summary: "A single screen shows different personalized images to many people at once. One airport install; very custom.",
    source: "alternative-displays/lenticular-and-multiview-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/lenticular-and-multiview-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: null, note: "Dense pico-projector array; brightness not stated." },
      scale:          { score: 2, note: "One terminal-scale installation; further scaling unclear." },
      resolution:     { score: 2, note: "Millions of independently-aimed light rays." },
      color:          { value: "full", note: "Full color." },
      motion:         { score: 3, note: "Real-time tracking and rendering." },
      transparency:   { score: 0, note: "Opaque; aims images to specific viewer positions." },
      dimensionality: { value: "flat", note: "Per-viewer personalized 2D images (not 3D parallax)." },
      availability:   { value: "lab", note: "One public airport installation; not consumer-available." },
      cost:           { score: 3, note: "Extremely expensive custom installation." },
      safety:         { score: 1, note: "High power density from the pico-projector array." }
    }
  },
  {
    id: "light-field-labs",
    name: "SolidLight (Light Field Labs)",
    family: "Light Field",
    status: "borderline",
    summary: "A dense true-light-field panel where imagery floats free of the surface. Announced 2021; pre-commercial.",
    source: "alternative-displays/light-field-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/light-field-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: null, note: "Not stated." },
      scale:          { score: 2, note: "28in single unit; claimed tileable into larger walls." },
      resolution:     { score: 3, note: "Claimed billions of pixels; full P3 color." },
      color:          { value: "full", note: "Full P3 color space." },
      motion:         { score: null, note: "Not stated; custom WaveTracer pipeline." },
      transparency:   { score: 3, note: "Image floats in space; full parallax." },
      dimensionality: { value: "volumetric", note: "True light field." },
      availability:   { value: "lab", note: "Announced 2021; not released; pre-commercial." },
      cost:           { score: 3, note: "Commercial development; high power density." },
      safety:         { score: null, note: "Not stated (high power referenced)." }
    }
  },
  {
    id: "avalon-holographics",
    name: "Light Field Table (Avalon Holographics)",
    family: "Light Field",
    status: "borderline",
    summary: "A glasses-free light-field table/monitor for medical and military. Real but power-hungry and not consumer.",
    source: "alternative-displays/light-field-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/light-field-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: null, note: "Not stated." },
      scale:          { score: 2, note: "40in holographic table; 29in monitor (discontinued)." },
      resolution:     { score: 3, note: "Claimed ~5 billion light rays." },
      color:          { value: "full", note: "Full color (inferred)." },
      motion:         { score: 3, note: "Game-engine input supported." },
      transparency:   { score: 3, note: "Volumetric; image floats." },
      dimensionality: { value: "volumetric", note: "Full parallax light field." },
      availability:   { value: "lab", note: "Commercial for medical/military; not consumer market." },
      cost:           { score: 3, note: "Extremely expensive; 6700W; 930lb package." },
      safety:         { score: 1, note: "6700W power requirement; heavy installation." }
    }
  },
  {
    id: "electroluminescent",
    name: "Electroluminescent (Lumineq)",
    family: "Transparent",
    status: "borderline",
    summary: "Segmented electroluminescent displays laminated inside glass. Glow, very low res, more signage than imagery.",
    source: "alternative-displays/transparent.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/alternative-displays/transparent",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Electroluminescent glow." },
      scale:          { score: 1, note: "Specialized laminated glass; non-standard sizes." },
      resolution:     { score: 0, note: "Very low; segmented like an old LCD calculator." },
      color:          { value: "mono", note: "Monochrome glow." },
      motion:         { score: 0, note: "Limited; not video-capable." },
      transparency:   { score: 2, note: "Semi-transparent; integrated into glass." },
      dimensionality: { value: "flat", note: "Flat; embedded in glass." },
      availability:   { value: "buy", note: "Niche commercial product (Lumineq)." },
      cost:           { score: null, note: "Not stated; specialty product." },
      safety:         { score: 3, note: "Low power; no heat; safe." }
    }
  },
  {
    id: "switchable-mirror",
    name: "Switchable Mirror (KentOptronics)",
    family: "Switchable Materials",
    status: "borderline",
    summary: "A surface that flips between mirror and clear window (variable 0.1–90%). Reflectivity as the medium.",
    source: "techniques/switchable-glass.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/switchable-glass",
    confidence: "medium",
    axes: {
      ambientLight:   { score: null, note: "Not stated." },
      scale:          { score: null, note: "Not stated." },
      resolution:     { score: 0, note: "Not a display; mirror/window switching." },
      color:          { value: "mono", note: "Clear-to-mirror state." },
      motion:         { score: 2, note: "Instant switching; can fade between states." },
      transparency:   { score: 3, note: "Variable 0.1-90% transmittance / reflection." },
      dimensionality: { value: "flat", note: "Flat surface." },
      availability:   { value: "buy", note: "Specialty commercial (KentOptronics); niche." },
      cost:           { score: 2, note: "Specialty product." },
      safety:         { score: 3, note: "Safe; gas-free technology." }
    }
  },
  {
    id: "ulexite",
    name: "Ulexite (TV Stone)",
    family: "Diffusion / Distortion",
    status: "borderline",
    summary: "A natural fiber-optic-like mineral that projects whatever's behind it onto its top face. Tiny, static curiosity.",
    source: "techniques/diffusion-and-distortion.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/techniques/diffusion-and-distortion",
    confidence: "low",
    axes: {
      ambientLight:   { score: 1, note: "Works with any correctly positioned light source." },
      scale:          { score: 0, note: "Small polished pieces only; not scalable." },
      resolution:     { score: 0, note: "Very low; more texture than image." },
      color:          { value: "full", note: "Color comes from the light source." },
      motion:         { score: 0, note: "Static; not suitable for video." },
      transparency:   { score: 2, note: "Semi-transparent crystal; image carried to the top surface." },
      dimensionality: { value: "flat", note: "Flat surface projection via natural fibers." },
      availability:   { value: "buy", note: "Natural material sold as a novelty; not a commercial display." },
      cost:           { score: 0, note: "Inexpensive small pieces." },
      safety:         { score: 3, note: "Needs a point light source; safe." }
    }
  },
  {
    id: "electrochromic-paint",
    name: "Electroluminescent Paint (Lumilor)",
    family: "Reactive / Light-Activated",
    status: "borderline",
    summary: "Sprayable paint that glows when energized. Paint any surface into a light element — but it dims over time.",
    source: "experimental-other/electrochromic-paint.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/electrochromic-paint",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Glows when energized; fades over time." },
      scale:          { score: 1, note: "~280 sq in max per lit sector; sectors can tile." },
      resolution:     { score: 0, note: "Very low; glow patterns only." },
      color:          { value: "limited", note: "Color depends on paint formulation." },
      motion:         { score: 1, note: "Static / slow changes." },
      transparency:   { score: 0, note: "Glow on a painted surface." },
      dimensionality: { value: "flat", note: "2D surface." },
      availability:   { value: "buy", note: "Lumilor commercial; specialty; not for permanent installs." },
      cost:           { score: 2, note: "Specialist material plus application labor." },
      safety:         { score: 1, note: "Electrical current; brightness fades over its lifespan." }
    }
  },
  {
    id: "photochromic",
    name: "Photochromic (UV-Reactive) Surface",
    family: "Reactive / Light-Activated",
    status: "borderline",
    summary: "Pigments that change color under UV light. Print onto anything; slow, low-res, but cheap and physical.",
    source: "experimental-other/light-activated-and-other-reactive-surfaces-and-materials.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/light-activated-and-other-reactive-surfaces-and-materials",
    confidence: "low",
    axes: {
      ambientLight:   { score: 1, note: "UV-activated color change; pigment-dependent." },
      scale:          { score: 2, note: "Scalable via pigment application." },
      resolution:     { score: 1, note: "Low; depends on pigment particle size." },
      color:          { value: "limited", note: "Colorless-to-color state change." },
      motion:         { score: 0, note: "Slow state change; not video." },
      transparency:   { score: 1, note: "Colorless inert state; color when activated." },
      dimensionality: { value: "flat", note: "2D surface." },
      availability:   { value: "diy", note: "Materials (SFXC); DIY; artist projects documented." },
      cost:           { score: 0, note: "Inexpensive pigments." },
      safety:         { score: 1, note: "Requires a UV light source; UV safety considerations." }
    }
  },
  {
    id: "mechanical-led",
    name: "Mechanical Pushout LED (PJ-Link)",
    family: "Mechanical / Kinetic",
    status: "borderline",
    summary: "LED pixels that physically extend outward for a 3D relief effect. Billboard-scale but few makers; maintenance-heavy.",
    source: "experimental-other/physical-mechanical-displays.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/physical-mechanical-displays",
    confidence: "low",
    axes: {
      ambientLight:   { score: 2, note: "LED brightness." },
      scale:          { score: 3, note: "Billboard scale possible; one Times Square install attempted." },
      resolution:     { score: 1, note: "Mechanical elements plus an LED grid." },
      color:          { value: "full", note: "Full RGB LED." },
      motion:         { score: 3, note: "Full video capable." },
      transparency:   { score: 1, note: "Semi-transparent if elements are sparse." },
      dimensionality: { value: "curved", note: "3D pushout/relief effect possible." },
      availability:   { value: "lab", note: "Limited manufacturers (PJ-Link et al.); niche installs." },
      cost:           { score: 3, note: "Premium; novelty factor." },
      safety:         { score: 2, note: "LED + mechanical power; maintenance-intensive." }
    }
  },
  {
    id: "ultrasonic-water",
    name: "Ultrasonic Water Mist (Lozano-Hemmer)",
    family: "Fog / Water / Mist",
    status: "borderline",
    summary: "Ultrasonic atomizers act as 'pixels' of mist (Cloud Display, Pareidolium). Volumetric, interactive, gallery-scale.",
    source: "experimental-other/ultrasonic-atomization-of-water.md",
    gitbookUrl: "https://blair-neal.gitbook.io/survey-of-alternative-displays/experimental-other/ultrasonic-atomization-of-water",
    confidence: "medium",
    axes: {
      ambientLight:   { score: 1, note: "Needs backlighting to be visible." },
      scale:          { score: 2, note: "Gallery / public-space installs; scale via more atomizers." },
      resolution:     { score: 0, note: "Very low; atomizer positions only." },
      color:          { value: "limited", note: "Droplets respond to light; color from the source." },
      motion:         { score: 1, note: "Real-time mist generation; not a video display." },
      transparency:   { score: 3, note: "Semi-transparent fog / mist." },
      dimensionality: { value: "volumetric", note: "3D volumetric; interactive water surface." },
      availability:   { value: "rent", note: "Artist-created installations; not a commercial product." },
      cost:           { score: 3, note: "Custom, high-end art-project budget." },
      safety:         { score: 2, note: "Ultrasonic + water circulation; safe but splash." }
    }
  }
];
