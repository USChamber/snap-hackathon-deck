# Galactic Snaptastic — SNAP Hackathon Deck

**Build brief for Claude Code.** A single-page HTML presentation that flows seamlessly between a running product demo (Kite video) and interactive engineering visualizations. Space theme ("Mission Control"). Built to be projected, run offline, and demoed live.

---

## 0. How to use this doc

Drive the build with Claude Code in the phases from §8. Each phase is a discrete, verifiable task. The design tokens (§3), reveal skeleton (§2), and slide map (§4) are copy-ready — start there, then fill in content. Don't over-engineer: this is a deck, not an app. Fewest files that stay maintainable.

---

## 1. What we're building

A talk that makes two arguments at once and proves both by *showing*, not telling:

1. **The product** — SNAP: a layer on uschamber.com where state-chamber users log in, post content, and discuss in comment threads. It fills a coordination gap as legislative decisions move to the state houses.
2. **The method** — a new way of building software at the Chamber: prompts as inputs, a design-to-code pipeline, and a 5-person team directing fleets of AI agents.

**Guiding metaphor (use it everywhere):** 50 state houses are scattered, unconnected stars. SNAP draws the constellation. Open with dim, disconnected stars; light the lines as the product appears; end on a full constellation.

**Non-negotiables**
- The running product is the centerpiece (judges explicitly want to see it working).
- Space theme, consistent, restrained — no cheesy rockets. Deep space, starfield, plasma/nebula accents.
- Seamless transitions between demo and engineering visuals (auto-animate).
- Runs from a single `index.html`, offline, no build step at present time.

---

## 2. Architecture & stack

**Framework:** reveal.js 5.x via CDN. Rationale: keyboard nav, `fragments` map perfectly to the step-reveals in the visualizations, `auto-animate` gives cinematic demo↔viz transitions, built-in speaker-notes view, and it embeds video/iframes cleanly. Custom theme layered on top — do **not** use a built-in reveal theme.

**File structure**
```
/
  index.html          all slides live here
  css/
    theme.css         Mission Control design system (§3)
  js/
    deck.js           reveal init + starfield background
    viz.js            the four interactive visualizations (§6)
  assets/
    snap-demo.mp4      Kite export (or a hosted URL — see §5)
    snap-poster.jpg    demo poster frame + fallback screenshot
    logo-galactic.svg  team mark (optional)
```

**CDN allowlist** (use cdnjs.cloudflare.com / Google Fonts only):
- reveal core CSS + JS: `https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/reveal.min.js` and `.../reveal.min.css`
- notes plugin: `.../plugin/notes/notes.min.js`
- fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code/spec)

**Starter `index.html` skeleton**
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Galactic Snaptastic — SNAP</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/reveal.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/theme.css">
</head>
<body>
  <canvas id="starfield" aria-hidden="true"></canvas>
  <div class="reveal">
    <div class="slides">
      <!-- sections go here, one <section> per slide -->
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/reveal.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/reveal.js/5.1.0/plugin/notes/notes.min.js"></script>
  <script src="js/deck.js"></script>
  <script src="js/viz.js"></script>
</body>
</html>
```

**reveal init (`js/deck.js`)**
```js
Reveal.initialize({
  hash: true,
  transition: 'fade',      // slow, calm — space, not slideshow
  transitionSpeed: 'slow',
  controls: true,
  progress: false,         // hide the bar; it fights the theme
  center: true,
  plugins: [ RevealNotes ],
});
// starfield: see §3 for the canvas draw loop
```

Speaker notes open with `S`. Fullscreen with `F`. Overview with `Esc`.

---

## 3. Design system — "Mission Control"

Dark, deep-space, high-contrast. Two accent ramps max per slide. Motion is slow and purposeful (drifting stars, fades, glow pulses) — never bouncy.

**Tokens (`css/theme.css`, on `:root`)**
```css
:root {
  /* Surfaces — deep space */
  --void:    #05070f;   /* page background */
  --deep:    #0b1022;   /* slide panels */
  --panel:   #121a33;   /* cards */
  --panel-2: #1a2444;   /* raised cards */

  /* Constellation accents */
  --star:     #e8ecf8;  /* primary text (near-white) */
  --star-dim: #9aa6c8;  /* muted text */
  --plasma:   #35e0d0;  /* teal — primary accent */
  --nebula:   #8b7bff;  /* purple — secondary accent */
  --solar:    #ffb547;  /* amber — highlight / "attention" */
  --signal:   #4d9bff;  /* chamber blue — data / links */

  /* Lines + glow */
  --edge:        rgba(232,236,248,0.12);
  --edge-strong: rgba(232,236,248,0.24);
  --glow-plasma: 0 0 28px rgba(53,224,208,0.35);
  --glow-nebula: 0 0 28px rgba(139,123,255,0.35);

  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body:    'Inter', system-ui, sans-serif;
  --font-mono:    'JetBrains Mono', ui-monospace, monospace;
}

.reveal { font-family: var(--font-body); color: var(--star); }
.reveal h1,.reveal h2,.reveal h3 { font-family: var(--font-display); font-weight: 500; letter-spacing: -0.01em; text-transform: none; }
.reveal .slides section { text-align: left; }
body { background: var(--void); }
#starfield { position: fixed; inset: 0; z-index: 0; }
.reveal { z-index: 1; }
```

**Color usage rules**
- Backgrounds: `--void` behind everything; `--panel`/`--panel-2` for cards.
- Accents encode meaning, don't decorate: `--plasma` = the product/SNAP, `--nebula` = the AI/method, `--solar` = the moment you want the eye to land (a metric, the "attention" line, the punchline), `--signal` = data/architecture.
- Text on dark: `--star` for headings/body, `--star-dim` for captions.
- All caps is banned. Sentence case everywhere.

**Starfield (`js/deck.js`)** — a lightweight canvas: ~180 static stars at varied opacity, a dozen slow-drifting ones, subtle parallax on slide change. No libraries. Keep it under the content and `aria-hidden`. Respect `prefers-reduced-motion` — freeze drift if set.

**Typography scale**
- Slide title (h1/h2): 2.4–3rem display.
- Body: 1.25rem Inter, line-height 1.6.
- Spec/code: 0.95rem JetBrains Mono.
- No text smaller than 1rem on a projected slide.

---

## 4. Narrative & slide map

Nine beats. Front-loads the running product; wraps the engineering story around it. The right column names which judging criterion each beat scores against (see §9).

| # | Beat | Content | Criterion |
|---|------|---------|-----------|
| 1 | Cold open | "Galactic Snaptastic presents SNAP." Tagline: *50 state houses. One constellation.* Full starfield, dim/disconnected stars. | Presentation |
| 2 | The gap | Legislative power is shifting to the state houses. State chambers operate in isolation — no shared room to coordinate. Visual: scattered, unlinked stars. | Impact |
| 3 | SNAP | The layer on uschamber.com where state-chamber users log in, post, and discuss threads. Draw the constellation lines between the stars as it appears. State the two problems solved: (a) state-legislative coordination gap; (b) leverage for a 5-person web team. | Impact |
| 4 | **Demo** | Kite video, full-bleed. The product actually running: log in → post → comment thread. Minimal chrome, let it play. This is the primary scoring moment. | Presentation |
| 5 | The new way | Transition slide: *"We didn't just build a product. We built a new way to build."* Sets up the four visuals. | New Way |
| 6 | Viz 1 — Pipeline | Prompt → spec (markdown atom) → working Vue. "Prompts are the new source code." Step-reveal. *(Already prototyped in chat — reuse the interaction pattern.)* | New Way |
| 7 | Viz 2 — Conductor | 5 developers each directing a crew of specialized agents. The leverage story. Follows with the vibe-coding joke + Viz 3. | New Way |
| 7b | Viz 3 — Bedrock | Sandcastle (Lovable/Replit) vs bedrock (SNAP on years of Chamber architecture: Craft CMS, Auth0, Fastly, PostgreSQL, Algolia). Same speed, opposite discipline. | New Way |
| 7c | Viz 4 — Velocity | Old way (weeks of handoffs) vs new way (days of directed loops), two timelines. | New Way |
| 8 | Impact & results | What shipped end-to-end — first project on the new workflow. Velocity + what it means for Chamber goals. Tie back to the constellation. | Impact |
| 9 | Close | Constellation fully lit. Galactic Snaptastic. What's next. | Presentation |

**Speaker-note cues (put these in reveal `<aside class="notes">`):**
- Slide 3: "SNAP solves two problems — the state-legislative coordination gap, and how a 5-person team ships at scale."
- Slide 7b: deliver the joke here, *after* they've seen the spec stage. "The internet calls this vibe coding. It's not. Lovable and Replit jump from a sentence to a throwaway app — no spec, no design system, no foundation. We generate against a documented atom on top of years of architecture. Same speed, opposite discipline." Point at the spec panel.
- Slide 8: "This is the first thing we shipped end-to-end the new way. Small team, big surface area."

---

## 5. The demo slot (Kite)

Slide 4 is full-bleed and quiet — the product does the talking.

**If Kite exports an MP4** → `assets/snap-demo.mp4`:
```html
<section data-background-color="#05070f">
  <video src="assets/snap-demo.mp4" poster="assets/snap-poster.jpg"
         controls playsinline
         style="width:88vw; max-height:82vh; border-radius:14px;
                box-shadow:var(--glow-plasma); border:1px solid var(--edge-strong)">
  </video>
  <aside class="notes">Log in → post → reply. Let it run, narrate lightly.</aside>
</section>
```
Set the video to not autoplay — trigger it manually so you control the beat. Consider muting + narrating live over it.

**If Kite gives a hosted/embed URL** → use an `<iframe>` with the same framing. Keep a downloaded MP4 as offline fallback regardless; conference wifi is a known failure mode.

**Always** ship `snap-poster.jpg` as a still of the running app so the slide looks intentional before you hit play and survives a video failure.

---

## 6. Visualization specs

Rebuild these as reveal-native fragments styled with the §3 tokens (the chat prototype used a different design system — reuse the *interaction*, not the CSS). Each is one `<section>`; reveal `fragments` drive the reveals.

**Viz 1 — Prompt → spec → software (prototyped).** Three panels left-to-right: a plain-English prompt, a markdown atom spec (mono, `--star-dim`), and a rendered SNAP discussion-thread card (`--plasma` accent, `--glow-plasma`). Each panel is a `.fragment` so you reveal one per click; connectors light in `--plasma` as they appear. Caption line changes per stage. Punchline on the third reveal: *"Nobody hand-wrote that code."* Use the sample content from the chat prototype (author "Jordan Meyer", a state-licensing-bill thread, 14 replies).

**Viz 2 — Coder → conductor.** Left: 5 identical developer nodes, capacity-bound (`--star-dim`). Right, on reveal: each developer becomes a hub directing a small fleet of labeled agent nodes — design agent, component agent, test agent, review agent (`--nebula`, `--glow-nebula`). Connecting lines animate outward. Headline: *"From writing code to directing a team."* This is the thesis visual — make it the most memorable frame.

**Viz 3 — Sandcastle vs bedrock.** Two columns. Left: a pretty house on shifting sand — labels for what's missing (no auth, no data model, no security, no real foundation); tag it "Lovable / Replit," muted, faintly unstable. Right: the same fast build on layered bedrock — stack the strata bottom-to-top: PostgreSQL, Auth0, Fastly CDN, Algolia, Craft CMS → SNAP on top, in `--signal`/`--plasma`. Headline: *"Same AI speed. On bedrock."* Reveal the strata one at a time.

**Viz 4 — Old way vs new way.** Two horizontal timelines. Top (old): designer → mockup → ticket → build → QA → revise, spanning "weeks," in `--star-dim`. Bottom (new): prompt → generate → review → refine, compressed to "days," in `--plasma`, with a glow on the compressed span. Let the length contrast carry the point; a single `--solar` callout on the time delta.

**Interaction discipline:** all reveals are click-driven fragments (predictable on stage), motion is fade/translate only, nothing autoplays except the ambient starfield. Respect `prefers-reduced-motion`.

---

## 7. Presenter mode & timing

- reveal notes plugin is wired in the skeleton; press `S` for the speaker view (current slide, next slide, notes, timer).
- Put every cue from §4 into `<aside class="notes">` on the matching slide.
- Rehearse to a target: ~1 min problem, ~2 min demo, ~3 min method visuals, ~1 min impact/close. Adjust to the slot.
- Add `data-autoslide` to nothing — you control every advance.

---

## 8. Build phases (task list for Claude Code)

**Phase 1 — Scaffold.** Create the file structure (§2). Wire reveal + fonts + `theme.css` tokens (§3). Implement the starfield canvas in `deck.js` with reduced-motion support. Add two placeholder slides. Verify: deck runs offline, arrow-key nav works, starfield drifts, speaker view opens with `S`.

**Phase 2 — Static slides.** Build slides 1, 2, 3, 5, 8, 9 (§4) with real copy. Use `auto-animate` between 2→3 (scattered stars → constellation) and 8→9 (constellation lights fully). Verify contrast and font sizes at projection scale.

**Phase 3 — Demo slot.** Build slide 4 per §5. Drop in the Kite MP4 (or iframe) + poster. Verify manual play, offline fallback, and framing.

**Phase 4 — Visualizations.** Build viz 1–4 (§6) in `viz.js` as reveal fragments, styled with the tokens. Verify each step-reveal fires on click and reverses cleanly on back-nav.

**Phase 5 — Polish.** Speaker notes on every slide, transition timing, responsive check (present at 1080p and 720p), reduced-motion pass, and a full offline dry-run with wifi disabled.

---

## 9. Judging-criteria checklist

Confirm each is unmistakably present before the dry-run:

- **Impact** — the gap named (state houses, chamber isolation), the two problems stated, and results tied to Chamber goals. Slides 2, 3, 8.
- **The new way of working & innovation** — the pipeline, the agent-directing model, the foundation discipline, and the velocity delta, shown as visuals not claims. Slides 5, 6, 7, 7b, 7c.
- **Presentation & demo** — the product runs on screen; the deck is engaging and self-explanatory; the constellation metaphor carries start to finish. Slides 1, 4, 9.

If a slide doesn't advance one of these three, cut it.
