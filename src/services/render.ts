import { dragPockets, leverageIndex, payload, riskMap, scalingMotions, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Operating Leverage Index";
const domain = "https://leverage.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/leverage-index", "Leverage index"],
    ["/drag-pockets", "Drag pockets"],
    ["/scaling-motions", "Scaling motions"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = leverageIndex().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Theme:</strong> ${escapeHtml(item.leverageTheme)}</p>
        <p><strong>Leverage score:</strong> ${item.leverageScore}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Operating leverage</span>
      <h1>Where is leverage already compounding, where is drag still sitting, and what can the board safely scale next?</h1>
      <p class="lede">Board Operating Leverage Index turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into one board-readable leverage packet for scaling motions and unresolved drag.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Leverage lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled lanes in the current operating-leverage index.</div></div>
        <div class="metric"><span class="metric-label">Leverage score</span><span class="metric-value">${executiveSummary.averageLeverageScore}</span><div class="metric-copy">Average leverage score across the current operating packet.</div></div>
        <div class="metric"><span class="metric-label">Escalation lanes</span><span class="metric-value">${executiveSummary.escalationLanes}</span><div class="metric-copy">Lanes that still need escalation before another board claim lands.</div></div>
        <div class="metric"><span class="metric-label">Annual value</span><span class="metric-value">$${executiveSummary.annualLeverageValueMillions}M</span><div class="metric-copy">Modeled annual leverage value across the current packet.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Leverage index</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Proof findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for operating leverage, drag pressure, and reinvestment confidence across the executive estate."
  );
}

export function renderLeverageIndex() {
  const rows = leverageIndex()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.leverageTheme)}</td>
        <td>${item.leverageScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Leverage index",
    "/leverage-index",
    `<section class="hero">
      <span class="eyebrow">Leverage index</span>
      <h1>Every leverage claim stays tied to one audience, one theme, and one scaling move.</h1>
      <p class="lede">The leverage index keeps scalable operating gains readable instead of scattering them across disconnected update decks.</p>
      <div class="nav">${navLinks("/leverage-index")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Leverage score</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Operating leverage index showing actions, themes, and leverage scores."
  );
}

export function renderDragPockets() {
  const rows = dragPockets()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.dragPressureScore}</td>
        <td>${item.ownerReadinessScore}</td>
        <td>${item.reinvestmentConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Drag pockets",
    "/drag-pockets",
    `<section class="hero">
      <span class="eyebrow">Drag pockets</span>
      <h1>See where drag is still heavy, owners are still thin, and reinvestment confidence is still weak.</h1>
      <p class="lede">This view makes it obvious which leverage stories are scale-ready and which ones still carry too much operational drag.</p>
      <div class="nav">${navLinks("/drag-pockets")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Drag pressure</th><th>Owner readiness</th><th>Reinvestment confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Drag-pocket view for pressure, owner readiness, and reinvestment confidence."
  );
}

export function renderScalingMotions() {
  const rows = scalingMotions()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>$${item.annualLeverageValueMillions}M</td>
        <td>${item.leverageScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Scaling motions",
    "/scaling-motions",
    `<section class="hero">
      <span class="eyebrow">Scaling motions</span>
      <h1>Scale motions, annual value, and leverage strength stay connected to named owners.</h1>
      <p class="lede">The board needs to see which motions are worth scaling next, not just which ideas once looked efficient.</p>
      <div class="nav">${navLinks("/scaling-motions")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Annual value</th><th>Leverage score</th><th>Company tags</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Scaling-motion view for annual leverage value and scale-ready strength."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this operating leverage packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, leverage boundaries, and reproducibility notes visible before anyone treats the sample as live board evidence.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Operating Leverage Index sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Operating Leverage Index docs</h1>
      <p class="lede">This surface packages board-readable operating leverage into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/leverage-index</code> keeps leverage themes, actions, and next moves readable.</li>
        <li><code>/drag-pockets</code> compares drag pressure, owner readiness, and reinvestment confidence.</li>
        <li><code>/scaling-motions</code> shows which named owners can scale annual leverage next.</li>
        <li><code>/api/payload</code> exposes the reproducible operating-leverage packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Operating Leverage Index and its board-ready routes."
  );
}
