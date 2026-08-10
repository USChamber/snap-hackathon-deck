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

  /* ---------- Viz 2.5 — Inside a multi-agent workflow ---------- */

  function swarm(slot) {
    const LANES = [
      { agent: 'component agent', task: 'builds the Vue thread card' },
      { agent: 'test agent',      task: 'writes tests against the spec' },
      { agent: 'security agent',  task: 'audits auth + input handling' },
      { agent: 'design agent',    task: 'checks tokens + accessibility' },
    ];
    slot.innerHTML = `
      <div class="swarm">
        <div class="swarm-stage">
          <div class="card swarm-directive">
            <p class="panel-label dim">The directive</p>
            <p>"Add comment moderation to SNAP threads."</p>
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
            <p class="lane-task">agents adversarially review each other's work
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
        The work went parallel. The developer reviews outcomes, not keystrokes.
      </p>`;
  }

  /* ---------- Voice — speaking to the computer ---------- */

  function voice(slot) {
    const RESULTS = [
      { icon: '✓', tone: 'plasma', text: 'spec updated — moderation-states.md' },
      { icon: '⚡', tone: 'nebula', text: '4 agents spawned' },
      { icon: '✓', tone: 'plasma', text: 'tests passing — 24/24' },
      { icon: '✓', tone: 'solar',  text: 'pull request opened — ready for review' },
    ];
    slot.innerHTML = `
      <div class="voice">
        <div class="card raised voice-transcript">
          <div class="voice-wave" aria-hidden="true">
            ${Array.from({ length: 24 }, () => '<span class="wave-bar"></span>').join('')}
          </div>
          <p class="voice-words">"Take the thread card, add the moderation states from
             this morning's discussion, test it, and open a PR."</p>
          <p class="panel-label dim">spoken — 8 seconds, no keyboard</p>
        </div>
        <div class="voice-results">
          ${RESULTS.map((r, i) => `
            <div class="card voice-result fragment" data-fragment-index="${i}">
              <span class="${r.tone}">${r.icon}</span> ${r.text}
            </div>`).join('')}
        </div>
      </div>
      <p class="voice-punchline fragment" data-fragment-index="${RESULTS.length}">
        The keyboard is optional. <span class="plasma">Intent is the interface.</span>
      </p>`;
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

  const BUILDERS = { pipeline, conductor, swarm, voice, bedrock, velocity };

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
