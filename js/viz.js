/* The four interactive visualizations (brief §6).
   Each renders into its slide's .viz-slot as reveal fragments — click-driven,
   fade/translate only. First-draft versions to hack on. */

(function () {

  /* ---------- Viz 1 — Prompt → spec → software ---------- */

  function pipeline(slot) {
    slot.innerHTML = `
      <div class="pipeline">
        <div class="card pipeline-panel fragment" data-caption-text="A plain-English prompt.">
          <p class="panel-label dim">Prompt</p>
          <p class="pipeline-prompt">"Build a discussion-thread card for SNAP:
          author, state chamber, bill topic, reply count. Match the design system."</p>
        </div>
        <div class="pipeline-arrow fragment" aria-hidden="true">→</div>
        <div class="card pipeline-panel fragment" data-caption-text="A markdown atom spec — documented, reviewable.">
          <p class="panel-label dim">Spec — thread-card.md</p>
          <pre class="pipeline-spec"># atom: thread-card
props:
  author: string
  chamber: string
  topic: string
  replies: number
states: [default, unread]
tokens: panel, plasma, edge</pre>
        </div>
        <div class="pipeline-arrow fragment" aria-hidden="true">→</div>
        <div class="card raised glow-plasma pipeline-panel fragment"
             data-caption-text="Nobody hand-wrote that code.">
          <p class="panel-label dim">Rendered — working Vue</p>
          <div class="thread-card">
            <p class="thread-author">Jordan Meyer <span class="dim">· Ohio Chamber</span></p>
            <p class="thread-topic">State licensing bill — HB 214 coordination</p>
            <p class="thread-meta plasma">14 replies · active today</p>
          </div>
        </div>
      </div>`;
  }

  /* ---------- Viz 2 — Coder → conductor ---------- */

  function conductor(slot) {
    const AGENTS = ['design', 'component', 'test', 'review'];
    const DEVS = [
      { label: 'dev 1', cross: false },
      { label: 'dev 2', cross: false },
      { label: 'dev 3', cross: true },   // from a team we'd never worked with
    ];
    const fleets = DEVS.map(d => `
      <div class="conductor-row">
        <div class="dev-node${d.cross ? ' cross-team' : ''}">${d.label}</div>
        <div class="fleet fragment" data-fragment-index="1">
          <span class="fleet-line" aria-hidden="true"></span>
          ${AGENTS.map(a => `<span class="agent-node">${a}</span>`).join('')}
        </div>
      </div>`).join('');

    slot.innerHTML = `
      <div class="conductor">
        ${fleets}
        <p class="conductor-note fragment" data-fragment-index="2">
          <span class="solar">◆</span> one developer from a different team —
          <span class="dim">we'd never worked together before SNAP</span>
        </p>
        <p class="conductor-headline fragment" data-fragment-index="3">
          3 developers. <span class="nebula">A dozen agents.</span>
          <span class="solar">Two teams, one shared language.</span>
        </p>
      </div>`;
  }

  /* ---------- Viz 3 — Sandcastle vs bedrock ---------- */

  function bedrock(slot) {
    // labels positioned over assets/sandcastle.png (percentages of the image box)
    const STRATA = [           // top-to-bottom on the rock layers
      { name: 'Craft CMS',  top: 67 },
      { name: 'Algolia',    top: 74.5 },
      { name: 'Fastly CDN', top: 81.5 },
      { name: 'Auth0',      top: 88 },
      { name: 'PostgreSQL', top: 94 },
    ];
    const MISSING = ['no auth', 'no data model', 'no security', 'no real foundation'];

    slot.innerHTML = `
      <div class="bedrock-hero">
        <img src="assets/sandcastle.png" alt="A crumbling sandcastle on shifting sand next to an identical castle standing on deep bedrock strata">
        <p class="hero-label dim" style="left:27.5%; top:10%;">Lovable / Replit</p>
        <p class="hero-label plasma" style="left:71%; top:6%;">SNAP</p>
        <ul class="sand-missing">
          ${MISSING.map((m, i) => `<li class="fragment" data-fragment-index="${i}">${m}</li>`).join('')}
        </ul>
        ${STRATA.map((s, i) => `
          <span class="stratum-chip fragment"
                data-fragment-index="${MISSING.length + (STRATA.length - 1 - i)}"
                style="left:71%; top:${s.top}%;">${s.name}</span>`).join('')}
        <p class="hero-note dim fragment" data-fragment-index="${MISSING.length + STRATA.length}"
           style="left:71%; top:100%;">years of Chamber architecture</p>
      </div>`;
  }

  /* ---------- Viz 4 — Old way vs new way ---------- */

  function velocity(slot) {
    const OLD = ['designer', 'mockup', 'ticket', 'build', 'QA', 'revise'];
    const NEW = ['prompt', 'generate', 'review', 'refine'];
    slot.innerHTML = `
      <div class="velocity">
        <div class="timeline old fragment">
          <p class="panel-label dim">The old way — weeks</p>
          <div class="timeline-track dim">
            ${OLD.map(s => `<span class="tl-step">${s}</span>`).join('<span class="tl-sep">—</span>')}
          </div>
        </div>
        <div class="timeline new fragment">
          <p class="panel-label plasma">The new way — days</p>
          <div class="timeline-track compressed">
            ${NEW.map(s => `<span class="tl-step plasma">${s}</span>`).join('<span class="tl-sep">—</span>')}
          </div>
        </div>
        <p class="velocity-callout solar fragment">weeks → days</p>
      </div>`;
  }

  /* ---------- Mount + caption wiring ---------- */

  const BUILDERS = { pipeline, conductor, bedrock, velocity };

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

  Reveal.on('ready', () => Reveal.sync());
  Reveal.on('fragmentshown',  (e) => updateCaption(e.fragment.closest('section')));
  Reveal.on('fragmenthidden', (e) => updateCaption(e.fragment.closest('section')));
})();
