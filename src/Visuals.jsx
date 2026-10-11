import { Link } from "react-router-dom";
import { modules } from "./data";

const Glyph = ({ name }) => (
  <img
    className="visual-icon"
    src={`/assets/icons/${name}.svg`}
    width="22"
    height="22"
    alt=""
    aria-hidden="true"
  />
);
const Label = ({ children }) => (
  <span className="visual-label">{children}</span>
);
const Card = ({ children, className = "" }) => (
  <div className={`visual-card ${className}`} data-motion-piece>
    {children}
  </div>
);
const Fact = ({ label, children }) => (
  <div className="visual-fact">
    <span>{label}</span>
    <strong>{children}</strong>
  </div>
);
const Stamp = () => (
  <div className="visual-boundary">
    DEMO — SYNTHETIC DATA <span>CONCEPT PREVIEW</span>
  </div>
);

export function visualKind(path) {
  return (
    {
      "/why-version-evidence": "delta",
      "/platform": "workbench",
      "/how-it-works": "workflow",
      "/evidence-standard": "schema",
      "/independence": "governance",
      "/review-limits": "boundary",
      "/about": "harbor",
      "/integrations": "ecosystem",
      "/results": "experiment",
      "/solutions/marketplaces": "listing",
      "/solutions/procurement": "purchase",
      "/products": "module-map",
      "/solutions": "gates",
      "/sample-evidence-pack": "report",
      "/sign-in": "access",
      "/pilot": "pilot",
      "/contact": "contact",
      "/resources": "sources",
      "/privacy": "privacy",
      "/terms": "terms",
      "/pilot-pricing": "pricing",
    }[path] ||
    path.split("/").pop() ||
    "home"
  );
}
export function routeTheme(path) {
  const k = visualKind(path);
  if (["publisher-identity", "harbor", "home", "listing", "access"].includes(k))
    return "forest";
  if (
    ["permission-manifest", "delta", "schema", "sources", "terms"].includes(k)
  )
    return "lilac";
  if (["sandbox-tests", "boundary", "workbench"].includes(k)) return "plum";
  if (["review-attestation", "governance", "contact", "experiment"].includes(k))
    return "peach";
  if (
    [
      "change-monitoring",
      "ecosystem",
      "workflow",
      "gates",
      "report",
      "privacy",
    ].includes(k)
  )
    return "sky";
  if (["pricing", "pilot", "purchase", "module-map"].includes(k))
    return "honey";
  return "sage";
}

function Identity() {
  return (
    <div className="identity-dossier">
      <Card className="identity-main">
        <Label>Publisher dossier / CP-ID-12</Label>
        <div className="identity-heading">
          <span className="monogram">C</span>
          <div>
            <h3>Clearpath Agents</h3>
            <p>Fictional publisher</p>
          </div>
        </div>
        <Fact label="Submitted entity">Clearpath Agents</Fact>
        <Fact label="Ownership evidence">Publisher-supplied sample</Fact>
        <Fact label="Documentation date">01 Oct 2026</Fact>
        <div className="visual-note">
          Sample documentation. No real verification.
        </div>
      </Card>
      <Card className="identity-note">
        <Glyph name="user-round" />
        <Label>Human review</Label>
        <strong>
          Names must point
          <br />
          to sources.
        </strong>
        <span>Consent → Documentation → Exception</span>
      </Card>
      <div className="artifact-tab" data-motion-piece>
        01 / Identity before inference
      </div>
    </div>
  );
}
function Delta() {
  return (
    <div className="manifest-stage">
      <div className="version-heading">
        <span>Reviewed</span>
        <span>Current</span>
      </div>
      <div className="manifest-pair">
        <Card>
          <Label>CP-MAN-12</Label>
          <b className="version-number">1.2</b>
          <h3>Permission manifest</h3>
          <code>read:tickets</code>
          <div className="manifest-rule" />
          <small>Review dated 01 Oct 2026</small>
        </Card>
        <Card className="current-manifest">
          <Label>CP-MAN-13</Label>
          <b className="version-number">1.3</b>
          <h3>Permission manifest</h3>
          <code>read:tickets</code>
          <code className="added-permission">+ write:contacts</code>
          <small>Submitted 08 Oct 2026</small>
        </Card>
      </div>
      <div className="scope-connector" data-motion-piece>
        <Glyph name="git-branch" />
        <span>One added scope.</span>
        <strong>A new review question.</strong>
      </div>
    </div>
  );
}
function ScopeTable() {
  return (
    <div className="scope-table-stage">
      <div
        className="scope-bar-chart"
        role="img"
        aria-label="Synthetic requested-scope count: reviewed version1.2 has one permission; current version1.3 has two."
      >
        <div data-motion-piece>
          <span>Reviewed v1.2</span>
          <b>1</b>
          <i className="bar-one" />
          <small>requested scope</small>
        </div>
        <div data-motion-piece>
          <span>Current v1.3</span>
          <b>2</b>
          <i className="bar-two" />
          <small>requested scopes</small>
        </div>
      </div>
      <table>
        <caption>Exact permissions / sample manifest delta</caption>
        <thead>
          <tr>
            <th scope="col">Requested action</th>
            <th scope="col">v1.2</th>
            <th scope="col">v1.3</th>
          </tr>
        </thead>
        <tbody>
          <tr data-motion-piece>
            <th scope="row">read:tickets</th>
            <td>Requested</td>
            <td>Unchanged</td>
          </tr>
          <tr data-motion-piece>
            <th scope="row">write:contacts</th>
            <td>Absent</td>
            <td className="added-cell">Added · not tested</td>
          </tr>
        </tbody>
      </table>
      <p>One changed permission can create a new review question.</p>
    </div>
  );
}
function ProtocolMatrix() {
  return (
    <div className="protocol-matrix">
      <Label>Sample protocol matrix</Label>
      <table>
        <thead>
          <tr>
            <th scope="col">Action</th>
            <th scope="col">Environment</th>
            <th scope="col">Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr data-motion-piece>
            <th scope="row">Ticket read</th>
            <td>Mock store</td>
            <td>Fixture recorded</td>
          </tr>
          <tr data-motion-piece>
            <th scope="row">Contact write</th>
            <td>To agree</td>
            <td>Not run</td>
          </tr>
        </tbody>
      </table>
      <div className="protocol-boundary" data-motion-piece>
        <Glyph name="flask-conical" />
        <strong>Reproducibility needs a declared boundary.</strong>
      </div>
    </div>
  );
}
function Sandbox() {
  return (
    <div className="sandbox-stage">
      <img
        className="editorial-raster"
        src="/assets/sandbox-boundary.webp"
        width="1400"
        height="933"
        alt="Concept illustration: ticket actions inside a glass sandbox boundary, with a contact-write action outside the test scope"
      />
      <Card className="sandbox-protocol">
        <Label>CP-TST-12 / bounded protocol</Label>
        <div>
          <span>Ticket read</span>
          <b>Recorded fixture</b>
        </div>
        <div>
          <span>Contact write</span>
          <b className="not-tested">Not run</b>
        </div>
        <small>Mock store · no live agent execution</small>
      </Card>
    </div>
  );
}
function Attestation() {
  return (
    <div className="attestation-stage">
      <Card className="review-slip">
        <Label>CP-ATT-12 / sample attestation</Label>
        <h3>
          A dated review.
          <br />
          <em>A declared boundary.</em>
        </h3>
        <div className="stamp-version">
          v1.2 <span>ONLY</span>
        </div>
        <Fact label="Fictional issuer">Harbor Review Lab</Fact>
        <Fact label="Funding">Fictional marketplace sponsor</Fact>
        <Fact label="Validity">01–31 Oct 2026</Fact>
        <small>Simulated record · no cryptographic signature</small>
      </Card>
      <div className="attestation-rail">
        <span data-motion-piece>
          Issued<small>01 Oct</small>
        </span>
        <span data-motion-piece>
          New version<small>08 Oct / needs review</small>
        </span>
        <span data-motion-piece>
          Expiry<small>31 Oct / baseline scenario</small>
        </span>
      </div>
    </div>
  );
}
function Change() {
  return (
    <div className="change-stage">
      <div className="change-rail">
        <div data-motion-piece>
          <span className="timeline-dot" />
          <small>01 OCT</small>
          <strong>Reviewed v1.2</strong>
          <code>read:tickets</code>
        </div>
        <div data-motion-piece>
          <span className="timeline-dot new" />
          <small>08 OCT</small>
          <strong>Submitted v1.3</strong>
          <code>+ write:contacts</code>
        </div>
        <div data-motion-piece>
          <span className="timeline-dot pending" />
          <small>NEXT ACTION</small>
          <strong>Buyer discussion</strong>
          <code>Agree test boundary</code>
        </div>
      </div>
      <Card className="notification-slip">
        <Glyph name="mail" />
        <Label>Notification preview</Label>
        <h3>
          The scope changed.
          <br />
          The evidence didn’t.
        </h3>
        <p>
          Review the added contact-write permission before relying on the old
          report.
        </p>
        <span className="preview-only">Not sent · no connected channel</span>
      </Card>
    </div>
  );
}
function Workbench() {
  return (
    <div className="workbench-stage">
      <div className="mini-window">
        <div className="window-bar">
          <span>Review workbench</span>
          <Label>CP-013 / sample</Label>
        </div>
        <div className="window-nav">
          <span>Overview</span>
          <span>Manifest</span>
          <span>Sources</span>
        </div>
        <div className="window-record">
          <h3>
            Support Assistant <span>v1.3</span>
          </h3>
          <p>Clearpath Agents · fictional publisher</p>
          <div className="workbench-grid">
            <Card>
              <Label>Current exception</Label>
              <strong>write:contacts</strong>
              <p>Added · not tested</p>
            </Card>
            <Card>
              <Label>Assigned reviewer</Label>
              <strong>Mira Sol</strong>
              <p>Next action due 12 Oct</p>
            </Card>
          </div>
          <div className="source-strip" data-motion-piece>
            <Glyph name="file-text" />
            <span>CP-MAN-13</span>
            <strong>Inspect the source ↗</strong>
          </div>
        </div>
      </div>
      <div className="workbench-float" data-motion-piece>
        Source → Exception → Reviewer
      </div>
    </div>
  );
}
function Flow() {
  return (
    <div className="flow-stage">
      <svg viewBox="0 0 600 410" aria-hidden="true" className="flow-connector">
        <path
          data-flow-line
          d="M75 70H510V205H80V350H500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="7 7"
        />
      </svg>
      {[
        ["01", "Agree the gate", "Criteria + consent"],
        ["02", "Bind the source", "Publisher + exact version"],
        ["03", "Record the protocol", "Environment + outcomes"],
        ["04", "Human decision", "Findings + next action"],
      ].map(([n, t, d]) => (
        <Card key={n}>
          <span className="step-numeral">{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Card>
      ))}
    </div>
  );
}
function Schema() {
  return (
    <div className="schema-stage">
      <div className="schema-header">
        <Label>Proposed report schema</Label>
        <span>8 required fields</span>
      </div>
      <table>
        <caption className="sr-only">
          Synthetic version-bound evidence fields
        </caption>
        <tbody>
          {[
            ["publisher", "Clearpath Agents"],
            ["version", "1.2"],
            ["manifest", "CP-MAN-12"],
            ["protocol", "CP-TST-12"],
            ["reviewed_at", "01 Oct 2026"],
            ["issuer", "Harbor Review Lab · fictional"],
            ["funding", "Marketplace sponsor · fictional"],
            ["limits", "Contact write not tested"],
          ].map(([k, v]) => (
            <tr key={k} data-motion-piece>
              <th scope="row">{k}</th>
              <td>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Acceptance criteria must be agreed with the buyer.</p>
    </div>
  );
}
function Governance() {
  return (
    <div className="roles-stage">
      <div className="roles-center" data-motion-piece>
        <Label>The evidence record</Label>
        <strong>
          Shared facts.
          <br />
          Distinct authority.
        </strong>
      </div>
      {[
        ["Publisher", "Supplies consented artifacts", "user-round"],
        ["Assessor", "Controls findings · proposed", "files"],
        ["Buyer", "Owns acceptance and decision", "eye"],
      ].map(([t, d, i]) => (
        <Card key={t}>
          <Glyph name={i} />
          <h3>{t}</h3>
          <p>{d}</p>
        </Card>
      ))}
      <div className="funding-line" data-motion-piece>
        Funding disclosed · recusal documented · no outcome-based fees
      </div>
    </div>
  );
}
function Boundary() {
  return (
    <div className="boundary-stage">
      <div className="boundary-box" data-motion-piece>
        <Label>Inside the reviewed boundary</Label>
        <h3>v1.2 / ticket read</h3>
        <div className="scope-capsule">Isolated mock store</div>
        <div className="scope-capsule">CP-TST-12 protocol</div>
        <small>Fixed sample evidence · 01 Oct</small>
      </div>
      <div className="outside-scope" data-motion-piece>
        <Glyph name="plus" />
        <Label>Outside this review</Label>
        <h3>write:contacts</h3>
        <p>v1.3 · not tested</p>
      </div>
      <div className="boundary-caption">
        An evidence gap is not an unsafe-behavior finding.
      </div>
    </div>
  );
}
function Ecosystem() {
  return (
    <div className="ecosystem-stage">
      <Card className="ecosystem-store">
        <Label>Marketplace</Label>
        <h3>Listing / install flow</h3>
        <span>Verified operator access needed</span>
      </Card>
      <div className="ecosystem-arrow" data-motion-piece>
        Proposed evidence link ↓
      </div>
      <Card className="ecosystem-pack">
        <Glyph name="files" />
        <h3>Version-bound pack</h3>
        <p>Identity · Scope · Tests · Limits</p>
      </Card>
      <div className="ecosystem-arrow" data-motion-piece>
        Accepted evidence use ↓
      </div>
      <Card className="ecosystem-buyer">
        <Label>Procurement</Label>
        <h3>Existing purchase gate</h3>
        <span>Buyer criteria + human decision</span>
      </Card>
      <div className="ecosystem-status">No stores or telemetry connected</div>
    </div>
  );
}
function Experiment() {
  return (
    <div className="experiment-stage">
      <div className="experiment-top">
        <Label>The demand test</Label>
        <span>Unknown ≠ zero</span>
      </div>
      <div className="experiment-input" data-motion-piece>
        <b>2</b>
        <div>
          <h3>consenting agents</h3>
          <p>Manual evidence packs first</p>
        </div>
      </div>
      <div className="experiment-gates">
        <Card>
          <Label>Advance / route A</Label>
          <h3>
            Marketplace
            <br />
            distribution pilot
          </h3>
          <span className="unknown-tag">Unvalidated</span>
        </Card>
        <Card>
          <Label>Advance / route B</Label>
          <h3>
            Formal use in
            <br />a purchase gate
          </h3>
          <span className="unknown-tag">Unvalidated</span>
        </Card>
      </div>
      <div className="stop-rule" data-motion-piece>
        <Glyph name="circle-x" />
        <span>Stop if access or decision impact is absent.</span>
      </div>
    </div>
  );
}
function ModuleMap() {
  return (
    <div className="module-map-stage">
      {modules.map((m, i) => (
        <Link
          data-motion-piece
          className={`module-tile tile-${i}`}
          to={`/products/${m.slug}`}
          key={m.slug}
        >
          <span>0{i + 1}</span>
          <Glyph name={m.icon} />
          <h3>{m.short}</h3>
          <p>{m.question}</p>
          <small>Proposed module ↗</small>
        </Link>
      ))}
    </div>
  );
}
function Listing() {
  return (
    <div className="listing-stage">
      <div className="listing-catalog">
        <Label>Marketplace listing / synthetic</Label>
        {[
          ["Clearpath", "Support Assistant", "Pending"],
          ["Northline", "Queue Helper", "Consent missing"],
          ["Rowan", "Context Reader", "Sample complete"],
        ].map(([t, d, s]) => (
          <Card key={t}>
            <span className="listing-initial">{t[0]}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
            <small>{s}</small>
          </Card>
        ))}
      </div>
      <Card className="listing-gate">
        <Glyph name="panel-right-open" />
        <Label>Before the install decision</Label>
        <h3>
          Current version:
          <br />
          v1.3
        </h3>
        <p>Added write:contacts</p>
        <span>Inspect evidence & limits</span>
        <small>No installation is authorized here.</small>
      </Card>
    </div>
  );
}
function Purchase() {
  return (
    <div className="purchase-stage">
      <Card className="purchase-memo">
        <Label>Purchase-gate worksheet</Label>
        <h3>
          What would your
          <br />
          team accept?
        </h3>
        {[
          ["Exact agent version", "1.3 / sample"],
          ["New requested scope", "write:contacts"],
          ["Protocol coverage", "Ticket read only"],
          ["Purchase decision", "Buyer-owned · not issued"],
        ].map(([a, b]) => (
          <Fact key={a} label={a}>
            {b}
          </Fact>
        ))}
      </Card>
      <div className="purchase-margin" data-motion-piece>
        <span>01 / Name criteria</span>
        <span>02 / Inspect source</span>
        <span>03 / Record decision</span>
      </div>
    </div>
  );
}
function Report() {
  return (
    <div className="report-stage">
      <div className="report-back" data-motion-piece>
        Source references
      </div>
      <Card className="report-sheet">
        <div className="report-corner">01</div>
        <Label>CP-ATT-12 / evidence pack</Label>
        <h3>
          Clearpath
          <br />
          Support Assistant
        </h3>
        <p>Reviewed version1.2 · fictional publisher</p>
        <div className="report-reading">
          <span>01</span>
          <div>
            <strong>Requested scope</strong>
            <code>read:tickets</code>
          </div>
          <span>02</span>
          <div>
            <strong>Current-version delta</strong>
            <code>+ write:contacts · not tested</code>
          </div>
          <span>03</span>
          <div>
            <strong>Evidence age</strong>
            <code>9 days / fixed sample clock</code>
          </div>
        </div>
        <div className="report-issuer">
          Harbor Review Lab · fictional issuer
          <br />
          No real signature or safety certification
        </div>
      </Card>
    </div>
  );
}
function Gates() {
  return (
    <div className="gates-stage">
      <Card>
        <Label>At the marketplace</Label>
        <div className="gate-frame">
          <Glyph name="files" />
        </div>
        <h3>Listing → Install</h3>
        <p>
          Access, publisher consent
          <br />
          and review standards
        </p>
      </Card>
      <Card>
        <Label>In procurement</Label>
        <div className="gate-frame">
          <Glyph name="eye" />
        </div>
        <h3>Review → Purchase</h3>
        <p>
          Acceptance criteria
          <br />
          and human decision
        </p>
      </Card>
      <div className="gates-foot">Two buyers. Evidence use agreed by both.</div>
    </div>
  );
}
function Access() {
  return (
    <div className="access-stage">
      <div className="open-door" data-motion-piece>
        <span>
          PUBLIC
          <br />
          DEMO
        </span>
        <Glyph name="arrow-up-right" />
      </div>
      <div className="access-tickets">
        <Card>
          <Glyph name="eye" />
          <strong>Inspect the source</strong>
        </Card>
        <Card>
          <Glyph name="download" />
          <strong>Export a sample</strong>
        </Card>
        <Card>
          <Glyph name="rotate-ccw" />
          <strong>Reset the fixtures</strong>
        </Card>
      </div>
      <p>No account, password or connected identity provider.</p>
    </div>
  );
}
function Intake({ contact = false }) {
  return (
    <div className={`intake-visual ${contact ? "contact-visual" : ""}`}>
      <Label>
        {contact
          ? "A useful conversation starts here"
          : "A pilot begins with access"}
      </Label>
      <div className="intake-path">
        {(contact
          ? [
              ["Question", "What review criteria?"],
              ["Context", "Where will evidence be used?"],
              ["Discussion", "Who owns the decision?"],
            ]
          : [
              ["Gate", "Marketplace or purchase flow"],
              ["Publishers", "Two consented submissions"],
              ["Criteria", "Accepted evidence standard"],
            ]
        ).map(([t, d], i) => (
          <Card key={t}>
            <span className="intake-index">0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </Card>
        ))}
      </div>
      <span className="intake-bottom">Prepare locally · nothing sent</span>
    </div>
  );
}
function Sources() {
  return (
    <div className="sources-stage">
      {[
        ["01", "Salesforce", "Existing security review"],
        ["02", "Microsoft", "Agent discovery and deployment"],
        ["03", "Your buyer", "Named review acceptance criteria"],
      ].map(([n, t, d]) => (
        <Card key={n}>
          <span className="source-numeral">{n}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </Card>
      ))}
      <p>Factual comparators, not endorsements.</p>
    </div>
  );
}
function Privacy({ terms = false }) {
  return (
    <div className="privacy-stage">
      <Label>{terms ? "A bounded preview" : "A minimal data path"}</Label>
      <div className="privacy-path">
        {(terms
          ? ["Synthetic records", "No certification", "Human decision"]
          : ["Your local draft", "Your tab memory", "Your downloaded file"]
        ).map((s, i) => (
          <Card key={s}>
            <Glyph
              name={
                terms
                  ? ["files", "info", "user-round"][i]
                  : ["file-text", "lock-keyhole", "download"][i]
              }
            />
            <strong>{s}</strong>
          </Card>
        ))}
      </div>
      <div className="privacy-line" data-motion-piece>
        {terms
          ? "No purchase, installation or external action is authorized."
          : "No lead inbox · no client analytics transmission"}
      </div>
    </div>
  );
}
function PricingVisual() {
  return (
    <div className="pricing-visual">
      <Label>Two hypotheses / no checkout</Label>
      <div className="pricing-bridge">
        <div data-motion-piece>
          <b>$2,500</b>
          <span>Per listing study</span>
        </div>
        <div className="pricing-link">or</div>
        <div data-motion-piece>
          <b>$1,500</b>
          <span>Monthly marketplace pilot</span>
        </div>
      </div>
      <p>Test willingness to pay in a real decision workflow.</p>
    </div>
  );
}

export function VisualStage({ kind, compact = false }) {
  const views = {
    "publisher-identity": <Identity />,
    "permission-manifest": <Delta />,
    "sandbox-tests": compact ? <ProtocolMatrix /> : <Sandbox />,
    "review-attestation": <Attestation />,
    "change-monitoring": <Change />,
    delta: <ScopeTable />,
    workbench: <Workbench />,
    workflow: <Flow />,
    schema: <Schema />,
    governance: <Governance />,
    boundary: <Boundary />,
    ecosystem: <Ecosystem />,
    experiment: <Experiment />,
    "module-map": <ModuleMap />,
    listing: <Listing />,
    purchase: <Purchase />,
    report: <Report />,
    gates: <Gates />,
    access: <Access />,
    pilot: <Intake />,
    contact: <Intake contact />,
    sources: <Sources />,
    privacy: <Privacy />,
    terms: <Privacy terms />,
    pricing: <PricingVisual />,
    harbor: (
      <div className="harbor-editorial">
        <img
          className="editorial-raster"
          src="/assets/decision-harbor.webp"
          width="1400"
          height="933"
          alt="Original conceptual harbor illustration: three distinct gates connected by a path, representing publisher, assessor and buyer responsibilities"
        />
        <div data-motion-piece>
          <Label>A more open agent economy</Label>
          <strong>
            Different gates.
            <br />
            Shared evidence.
          </strong>
        </div>
      </div>
    ),
  };
  return (
    <figure
      className={`visual-stage visual-${kind} ${compact ? "visual-compact" : ""}`}
      data-visual-kind={kind}
    >
      <div className="visual-content">{views[kind] || <Workbench />}</div>
      <figcaption>
        <Stamp />
      </figcaption>
    </figure>
  );
}

const chapterLabels = {
  delta: ["Reviewed v1.2", "Current v1.3", "Added scope"],
  workbench: ["Consent & source", "Exception & owner", "Decision & lifecycle"],
  workflow: [
    "Decision criteria",
    "Version-bound sources",
    "Protocol & evidence",
    "Buyer use",
  ],
  schema: [
    "Identity + version",
    "Reproducibility",
    "Issuer + conflicts",
    "Validity + status",
  ],
  governance: [
    "Submitted artifacts",
    "Independent findings",
    "Buyer authority",
    "Funding disclosure",
  ],
  boundary: [
    "Version applicability",
    "Environment limits",
    "Lifecycle reasons",
    "No universal certification",
  ],
  harbor: [
    "Current scope",
    "Inspectable sources",
    "Research-stage concept",
    "Actual buyer commitment",
  ],
  ecosystem: ["Listing access", "Purchase criteria", "Unresolved telemetry"],
  experiment: [
    "Consented studies",
    "Evidence-use commitment",
    "Stop conditions",
    "Attributable milestones",
  ],
  listing: [
    "Operator access",
    "Evidence-use agreement",
    "Consenting publishers",
    "Existing store controls",
  ],
  purchase: [
    "Current-version evidence",
    "Accepted standards",
    "Manual study",
    "Human authority",
  ],
};
export function ChapterFigure({ kind, index, title }) {
  const labels = chapterLabels[kind] || [
    "Source",
    "Review",
    "Decision",
    "Limit",
  ];
  const current = labels[index] || title;
  return (
    <figure
      className={`chapter-figure chapter-format-${index % 4}`}
      aria-label={`Concept diagram for ${title}`}
    >
      <div className="chapter-figure-heading">
        <span>0{index + 1}</span>
        <Label>Concept / {current}</Label>
      </div>
      {index % 4 === 0 ? (
        <div className="chapter-chain">
          {[current, "Source reference", "Human next step"].map((s, i) => (
            <div data-motion-piece key={s}>
              <span>0{i + 1}</span>
              <strong>{s}</strong>
              {i < 2 && <Glyph name="arrow-right" />}
            </div>
          ))}
        </div>
      ) : index % 4 === 1 ? (
        <div className="chapter-comparison">
          <div data-motion-piece>
            <Label>Required</Label>
            <strong>{current}</strong>
            <p>Agreed, attributable evidence</p>
          </div>
          <div data-motion-piece>
            <Label>Visible exception</Label>
            <strong>Missing / inconclusive</strong>
            <p>A reviewer defines the next step</p>
          </div>
        </div>
      ) : index % 4 === 2 ? (
        <div className="chapter-triangle">
          <div data-motion-piece>
            <Glyph name="files" />
            <span>Source</span>
          </div>
          <div data-motion-piece>
            <Glyph name="user-round" />
            <strong>{current}</strong>
          </div>
          <div data-motion-piece>
            <Glyph name="eye" />
            <span>Buyer</span>
          </div>
        </div>
      ) : (
        <div className="chapter-ledger">
          <div data-motion-piece>
            <span>Question</span>
            <strong>{current}</strong>
          </div>
          <div data-motion-piece>
            <span>Evidence status</span>
            <strong>To agree in a real pilot</strong>
          </div>
          <div data-motion-piece>
            <span>Decision authority</span>
            <strong>Human reviewer / buyer</strong>
          </div>
        </div>
      )}
      <figcaption>
        Illustrative relationship · not a live product state
      </figcaption>
    </figure>
  );
}
