# SNAP Hackathon Deck — Galactic Snaptastic

This is the slide deck for the SNAP hackathon presentation. It's a single web page —
open `index.html` in any browser and you have the full presentation. No special
software needed to *view* it.

**Live version:** https://uschamber.github.io/snap-hackathon-deck/

## Viewing the deck

- Open `index.html` in a browser (double-click it), or use the live link above.
- **Arrow keys** move between slides and trigger the click-by-click reveals.
- **F** = fullscreen, **Esc** = zoomed-out overview of every slide.
- **S** = speaker view (your notes, a timer, and a preview of the next slide) —
  use this when presenting.

## Editing the deck (no coding required)

You'll use **Claude Code** inside the **Claude desktop app** — you describe the change
you want in plain English, and Claude edits the files for you.

### One-time setup

1. **Install the Claude desktop app** from [claude.ai/download](https://claude.ai/download)
   and sign in.
2. **Download this project.** Go to the
   [repository page](https://github.com/USChamber/snap-hackathon-deck), click the
   green **Code** button, then **Download ZIP**. Unzip it somewhere easy to find, like
   your Desktop.
   - *Alternative:* skip the manual download — in step 4, just ask Claude:
     *"Clone https://github.com/USChamber/snap-hackathon-deck and open it."*
3. In the Claude desktop app, open the **Claude Code** tab (the `>_` icon).
4. Point it at the project folder you unzipped (choose it as the working directory).

### Making changes

Just tell Claude what you want, like you'd tell a teammate:

> "On the impact slide, change the third bullet to say we launched in 12 states."

> "The demo video feels buried — make it bigger and remove the border."

> "Add a slide after the velocity slide thanking the review committee."

> "Change 'a dozen agents' to 'twenty agents' everywhere it appears."

Then check the result: ask Claude to *"open the deck in my browser"* (or double-click
`index.html`) and arrow through the slides you changed.

A few tips:

- **Be specific about which slide** — refer to them by their titles
  ("the 'Same AI speed. On bedrock.' slide").
- **You can't break anything.** Every version is saved in history; if something goes
  wrong, tell Claude *"undo that last change"* or *"put it back how it was."*
- **Design consistency is built in.** The colors, fonts, and spacing all come from one
  design system, and Claude knows to stay inside it — you don't need to pick colors.

### Publishing your changes to the live site

Changes on your computer don't appear on the live link until they're pushed to GitHub.
When you're happy with an edit, tell Claude:

> "Commit and push this."

The live site updates itself about a minute later. (First time, Claude may walk you
through logging in to GitHub — just follow its prompts.)

## What's in this folder

| File / folder | What it is |
|---|---|
| `index.html` | Every slide's text and structure — most copy edits happen here |
| `css/theme.css` | The "Mission Control" design system: colors, fonts, spacing |
| `js/deck.js` | Slide engine setup + the drifting starfield background |
| `js/viz.js` | The interactive visualizations (pipeline, agents, bedrock, timelines) |
| `assets/` | Images and the demo video (the video stays local; it isn't uploaded) |
| `SNAP_DECK_BUILD_BRIEF.md` | The original build brief — the deck's "source of truth" for tone and content |

## Presenting on the big day

- Present from a **downloaded copy** on the presenter's laptop, not the live URL —
  conference wifi is a known failure mode.
- Make sure `assets/snap-demo.mp4` (the product demo video) is on that laptop; it is
  deliberately **not** stored on GitHub, so it doesn't come with the ZIP.
- Do one full run-through with wifi off before you go on.
