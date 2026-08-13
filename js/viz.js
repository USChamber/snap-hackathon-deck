/* The four interactive visualizations (brief §6).
   Each renders into its slide's .viz-slot as reveal fragments — click-driven,
   fade/translate only. First-draft versions to hack on. */

(function () {

  /* ---------- Viz 1 — Prompt → spec → software ---------- */

  function pipeline(slot) {
    // real artifacts: design-system/systems/snap/components/comment.md
    // → snap-app/src/components/SnapComment.vue (shipped)
    slot.innerHTML = `
      <div class="pipeline">
        <div class="card pipeline-panel fragment" data-caption-text="A plain-English prompt.">
          <p class="panel-label dim">Prompt</p>
          <p class="pipeline-prompt">"Build the comment component for APEX discussions —
          avatar, byline with staff badge, plain-text body, Reply / Edit / Delete / Like.
          Follow the spec."</p>
        </div>
        <div class="pipeline-arrow fragment" aria-hidden="true">→</div>
        <div class="card pipeline-panel fragment"
             data-caption-text="comment.md — the real spec, committed to the repo.">
          <p class="panel-label dim">Spec — comment.md</p>
          <pre class="pipeline-spec"># Comment
> One row of a discussion thread:
  avatar, byline (name, org, staff
  badge, time), body, action links.

| Prop        | Values      | Default |
| author      | AuthorCard  |    —    |
| body        | string      |    —    |
| viewerLiked | boolean     |  false  |
| isOwn       | boolean     |  false  |

❌ Never render body as HTML —
   comments are member content.</pre>
        </div>
        <div class="pipeline-arrow fragment" aria-hidden="true">→</div>
        <div class="card raised glow-plasma pipeline-panel fragment"
             data-caption-text="SnapComment.vue — in production today. Nobody hand-wrote it.">
          <p class="panel-label dim">Shipped — SnapComment.vue</p>
          <div class="snap-comment">
            <span class="sc-avatar" aria-hidden="true">JM</span>
            <div class="sc-body">
              <p class="sc-byline">Jordan Meyer <span class="dim">· Ohio Chamber</span>
                <span class="sc-badge">Staff</span> <span class="dim">• 12h ago</span></p>
              <p class="sc-text">Has anyone tracked the licensing-bill amendments
                 that came out of committee this week?</p>
              <p class="sc-actions plasma">Reply&nbsp;&nbsp;Like</p>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Viz 2 — One developer directing a crew of agents ---------- */

  function crew(slot) {
    // real agents/skills from our repos (.claude/skills, resources)
    const LANES = [
      { agent: 'the builder',       task: 'turns the written spec into the working component' },
      { agent: 'the design syncer', task: 'pulls colors and spacing straight out of Figma — exactly, every time' },
      { agent: 'the inspector',     task: 'grades the result against the style guide — pass or fail' },
      { agent: 'the tester',        task: 'makes sure nothing breaks' },
      { agent: 'the reviewer',      task: 'does the first code review before a human ever looks' },
    ];
    slot.innerHTML = `
      <div class="swarm">
        <div class="swarm-stage">
          <div class="dev-node">developer</div>
          <div class="card swarm-directive">
            <p class="panel-label dim">The directive</p>
            <p>"Build the APEX comment component."</p>
          </div>
        </div>
        <div class="swarm-stage swarm-lanes">
          ${LANES.map((l, i) => `
            <div class="swarm-lane fragment" data-fragment-index="${i}">
              <span class="agent-node">${l.agent}</span>
              <span class="lane-task dim">${l.task}</span>
            </div>`).join('')}
        </div>
        <div class="swarm-stage">
          <div class="card swarm-verify fragment" data-fragment-index="${LANES.length}">
            <p class="panel-label nebula">Cross-check</p>
            <p class="lane-task">agents gate each other's work
               <span class="dim">— before a human looks</span></p>
          </div>
          <div class="card glow-plasma swarm-merged fragment" data-fragment-index="${LANES.length + 1}">
            <p class="panel-label plasma">Merged</p>
            <p class="lane-task">one reviewed pull request<br>
               <span class="solar">hours, not sprints</span></p>
          </div>
        </div>
      </div>
      <p class="swarm-footnote dim fragment" data-fragment-index="${LANES.length + 2}">
        Real agents from our repos — not hypotheticals. The developer reviews outcomes, not keystrokes.
      </p>`;
  }

  /* ---------- History — five years of AI adoption ---------- */

  function history(slot) {
    const ERAS = [
      {
        name: 'Fancy autocomplete', years: '2021–22', tone: 'dim',
        items: [
          'GitHub Copilot beta access — fall 2021',
          'Daily-driver autocomplete on the team',
        ],
      },
      {
        name: 'Knowledge companion', years: '2022–23', tone: 'signal',
        items: [
          'ChatGPT for coding knowledge — Dec 2022',
          'Teamwide Copilot adoption',
        ],
      },
      {
        name: 'Agentic workflows emerge', years: '2024–25', tone: 'nebula',
        items: [
          'Early agentic betas — rough, but we ran them',
          'First AI code review · first LLM-directed commit',
          'MCP servers wired in — Jira, Chrome, Figma',
        ],
      },
      {
        name: 'True agentic use', years: '2026', tone: 'plasma',
        items: [
          'Agents get good — Claude Code becomes the workbench',
          'Our own MCP servers, skills committed to repos',
          'Multi-agent threading · first-party Chamber plugins',
        ],
      },
    ];
    slot.innerHTML = `
      <div class="history">
        <div class="history-rail" aria-hidden="true"></div>
        <div class="history-eras">
          ${ERAS.map((e, i) => `
            <div class="history-era fragment" data-fragment-index="${i}">
              <span class="era-dot ${e.tone}-dot" aria-hidden="true"></span>
              <p class="era-years dim">${e.years}</p>
              <p class="era-name ${e.tone}">${e.name}</p>
              <ul class="era-items">
                ${e.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>`).join('')}
        </div>
        <p class="history-punchline fragment" data-fragment-index="${ERAS.length}">
          Every wave, adopted early. <span class="plasma">By 2026, we were ready.</span>
        </p>
      </div>`;
  }

  /* ---------- Voice — speaking to the computer ---------- */

  function voice(slot) {
    const TRANSCRIPT = `"The following features will all be for the APEX logged-in portal.
      What we're working on is an AI-based summary for users to see when they first log in.
      This will be on their home page when they log in to APEX, and they should see actionable
      content that they can jump into. We don't need to use AI for the search here — we can
      just use Craft queries and take into account the user's preferences. So, for example,
      if the user is interested in data centers and PFAS, then we would run a query against
      all APEX entries and pull any content that's tagged with those topics. We should also
      take into account user behavior. So if a user interacts with certain content, then we
      should be storing that even if they don't have that selected as a topic — similar to a
      Facebook algorithm. And maybe we just store that on the user model, in an uneditable
      section, something called, like, inferred interests or something. And then when we run
      our query to populate this data, we should say since they last logged in — that would
      be the date constraint — what new content has been added, and what content has been
      updated that matches their stated and inferred preferences? This is all pretty new, so
      I want you to take a little time to work with me on the planning here to think through
      other layers. I think we'll probably have to have multiple queries. One would be things
      they are for sure interested in, and then if that doesn't have enough content, then it
      would be things we think they're interested in based off of inference. And then a third
      layer could be things that are tangential — so maybe we can build a mapping of topics
      and relate them to each other. We could have the editors do that via the entries field —
      on each topic, they could add related topics, type thing."`;

    const RESULTS = [
      { icon: '✓', tone: 'plasma', text: 'understood the goal — a personalized home page for members' },
      { icon: '⚡', tone: 'nebula', text: 'sketched the plan — what you follow, what you seem to like, what’s related' },
      { icon: '✓', tone: 'plasma', text: 'started the write-up — remembering each user’s “inferred interests”' },
      { icon: '✓', tone: 'nebula', text: 'followed the house rules — used our existing search, no AI bolted on' },
      { icon: '✓', tone: 'solar',  text: 'heard “work with me on this” — and asked questions instead of building' },
    ];
    slot.innerHTML = `
      <div class="voice">
        <div class="card raised voice-transcript">
          <div class="voice-wave" aria-hidden="true">
            ${Array.from({ length: 24 }, () => '<span class="wave-bar"></span>').join('')}
          </div>
          <p class="voice-words">${TRANSCRIPT}</p>
          <p class="panel-label dim">spoken — two minutes, zero keystrokes</p>
        </div>
        <div class="voice-results">
          ${RESULTS.map((r, i) => `
            <div class="card voice-result fragment" data-fragment-index="${i}">
              <span class="${r.tone}">${r.icon}</span> ${r.text}
            </div>`).join('')}
        </div>
      </div>
      <p class="voice-punchline fragment" data-fragment-index="${RESULTS.length}">
        A rambling paragraph in. A plan out.
        <span class="plasma">The skills, rules, and agents do the interpreting.</span>
      </p>`;
  }

  /* ---------- Viz 3 — Sandcastle vs bedrock ---------- */

  function bedrock(slot) {
    // labels positioned over assets/sandcastle.png (percentages of the image box)
    const STRATA = [           // top-to-bottom on the rock layers; revealed bottom-up
      { name: 'hardening',     detail: 'security assessments',              top: 67 },
      { name: 'system design', detail: 'frontend + backend goals',          top: 76 },
      { name: 'handholding',   detail: 'skills · plugins · testing',        top: 85 },
      { name: 'framework',     detail: 'Craft CMS · Auth0 · Vue',           top: 93 },
    ];
    const MISSING = ['no auth', 'no data model', 'no security', 'no real foundation'];

    slot.innerHTML = `
      <div class="bedrock-hero">
        <img src="assets/sandcastle.png" alt="A crumbling sandcastle on shifting sand next to an identical castle standing on deep bedrock strata">
        <p class="hero-label dim" style="left:27.5%; top:10%;">Vibecoding</p>
        <p class="hero-label plasma" style="left:71%; top:6%;">APEX</p>
        <ul class="sand-missing">
          ${MISSING.map((m, i) => `<li class="fragment" data-fragment-index="${i}">${m}</li>`).join('')}
        </ul>
        ${STRATA.map((s, i) => `
          <span class="stratum-chip fragment"
                data-fragment-index="${MISSING.length + (STRATA.length - 1 - i)}"
                style="left:71%; top:${s.top}%;">${s.name}
            <span class="chip-detail dim">${s.detail}</span></span>`).join('')}
        <p class="hero-note dim fragment" data-fragment-index="${MISSING.length + STRATA.length}"
           style="left:71%; top:100%;">years of Chamber architecture</p>
      </div>`;
  }

  /* ---------- Viz 4 — Old way vs new way ---------- */

  function velocity(slot) {
    const OLD = ['designer', 'mockup', 'ticket', 'build', 'QA', 'revise'];
    const LOOP = ['prompt', 'generate', 'review', 'refine'];  // 12 / 3 / 6 / 9 o'clock
    slot.innerHTML = `
      <div class="velocity">
        <div class="timeline old">
          <p class="panel-label dim">The old way — a line. One direction, six handoffs, weeks.</p>
          <div class="timeline-track dim">
            ${OLD.map((s, i) =>
              `<span class="tl-step fragment brighten" data-fragment-index="${i}">${s}</span>`
            ).join('<span class="tl-sep">→</span>')}
          </div>
        </div>
        <p class="apex-way fragment" data-fragment-index="${OLD.length}">
          The <span class="plasma">APEX</span> way
        </p>
        <div class="loop-row fragment" data-fragment-index="${OLD.length + 1}">
          <div class="loop-ring" aria-hidden="true">
            ${LOOP.map((s, i) => `<span class="loop-node pos-${i}">${s}</span>`).join('')}
          </div>
          <div class="loop-text">
            <p class="lane-task dim">Prompt, generate, review, refine — around again
               until it's right. No handoffs; the loop is the process.</p>
            <p class="loop-ship">↳ then <span class="plasma">ship</span></p>
          </div>
        </div>
        <p class="velocity-callout solar fragment" data-fragment-index="${OLD.length + 2}">
          six handoffs became one loop — weeks became days
        </p>
      </div>`;
  }

  /* ---------- Team — the squadron ---------- */

  function team(slot) {
    const CREW = ['anthony', 'erik', 'james', 'matt', 'mimi', 'vasu', 'wags', 'zahwa'];
    slot.innerHTML = `
      <div class="team-grid">
        ${CREW.map((n, i) => `
          <figure class="sw-card" style="animation-delay:${0.25 + i * 0.12}s">
            <img src="assets/team/deck/${n}.jpg" alt="${n}" loading="lazy">
            <figcaption class="sw-name">${n[0].toUpperCase() + n.slice(1)}</figcaption>
          </figure>`).join('')}
      </div>`;
  }

  /* ---------- Mount + caption wiring ---------- */

  const BUILDERS = { pipeline, crew, voice, bedrock, velocity, history, team };

  document.querySelectorAll('.viz-slot').forEach((slot) => {
    const build = BUILDERS[slot.dataset.viz];
    if (build) build(slot);
  });

  // captions swap as pipeline fragments reveal (and restore on back-nav)
  function updateCaption(section) {
    const cap = section.querySelector('[data-caption]');
    if (!cap) return;
    const visible = section.querySelectorAll('.fragment.visible[data-caption-text]');
    if (visible.length) cap.textContent = visible[visible.length - 1].dataset.captionText;
  }

  // (the rebrand/Falcon sequence is pure CSS — driven by
  //  .rebrand:has(.rebrand-trigger.visible) in theme.css)

  // auto-reveal fragments on arrival: every 0.5s by default; `delay` overrides
  // the wait before the FIRST reveal (credits holds 5s before the roll starts)
  const AUTO_REVEAL = {
    'persona-slide': {},
    'viz-history':   {},
    'viz-velocity':  {},
    'viz-pipeline':  {},
    'viz-crew':      {},
    'viz-voice':     {},
    'viz-bedrock':   {},
    'credits-slide': { delay: 5000 },
  };
  let autoDelayTimer = null, autoStepTimer = null;
  Reveal.on('slidechanged', (e) => {
    clearTimeout(autoDelayTimer);
    clearInterval(autoStepTimer);
    const cfg = AUTO_REVEAL[e.currentSlide.id];
    if (!cfg) return;
    const step = () => {
      if (Reveal.availableFragments().next) Reveal.nextFragment();
      else clearInterval(autoStepTimer);
    };
    autoDelayTimer = setTimeout(() => {
      step();
      autoStepTimer = setInterval(step, 500);
    }, cfg.delay ?? 500);
  });

  Reveal.on('ready', () => Reveal.sync());
  Reveal.on('fragmentshown',  (e) => updateCaption(e.fragment.closest('section')));
  Reveal.on('fragmenthidden', (e) => updateCaption(e.fragment.closest('section')));
})();
