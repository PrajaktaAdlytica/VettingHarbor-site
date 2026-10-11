export const modules = [
  {
    slug: "publisher-identity",
    short: "Identity",
    name: "Vetting Harbor Review Desk",
    question: "Who builds the agent?",
    icon: "user-round",
    description: "Connect the publisher name to consented ownership evidence.",
    input:
      "Publisher-submitted identity and ownership documents, with explicit consent.",
    steps: [
      "Record the submitting publisher and consent boundary.",
      "Compare documented entity, owner and listing identifiers.",
      "Flag missing or conflicting evidence for a human reviewer.",
    ],
    output:
      "A dated publisher record with source references and unresolved exceptions.",
    limit:
      "Documentation can support identity checks. It cannot establish the behavior of an agent or guarantee future ownership.",
    state: "Sample verification · documentation only",
    source: "CP-ID-12",
    feature: "An accountable starting point.",
  },
  {
    slug: "permission-manifest",
    short: "Scope",
    name: "Vetting Harbor Review Review",
    question: "What can it do?",
    icon: "git-branch",
    description:
      "Read requested permissions against the exact version under review.",
    input:
      "Version-bound permission manifests and their publisher-supplied source files.",
    steps: [
      "Bind the manifest to an explicit agent version.",
      "Compare reviewed scopes with the current submission.",
      "Route added scopes to a new review, rather than carrying an old conclusion forward.",
    ],
    output:
      "A permission manifest and version delta with untested scopes made visible.",
    limit:
      "Requested scopes do not by themselves establish actual runtime behavior. Telemetry access remains a pilot dependency.",
    state: "v1.3 adds write:contacts · not tested",
    source: "CP-MAN-13",
    feature: "Same agent. A different scope.",
  },
  {
    slug: "sandbox-tests",
    short: "Behavior",
    name: "Vetting Harbor Review Proof",
    question: "How does it perform?",
    icon: "flask-conical",
    description:
      "Link risky-action tests to a reproducible protocol and observed evidence.",
    input:
      "A consented build, agreed sandbox, test protocol, environment and test fixtures.",
    steps: [
      "Agree the test boundaries and risky actions before execution.",
      "Record environment, protocol and observed outcomes.",
      "Preserve inconclusive results and failures alongside completed tests.",
    ],
    output:
      "A reproducible report of the specific tests performed and their limitations.",
    limit:
      "A sandbox is bounded. Untested actions, deployment differences and adversarial behavior can remain outside its coverage.",
    state: "New contact-write test · not run",
    source: "CP-TST-12",
    feature: "Show the protocol behind the result.",
  },
  {
    slug: "review-attestation",
    short: "Review",
    name: "Vetting Harbor Review Signal",
    question: "What has been reviewed?",
    icon: "file-text",
    description:
      "Bind a dated review attestation to its version, issuer and lifecycle.",
    input:
      "A reviewed evidence pack, reviewer decision, declared funding and validity period.",
    steps: [
      "Record reviewer, sources, exact version and conflicts.",
      "Issue a version-bound attestation with an explicit expiry.",
      "Expose revocation, reason and superseding evidence without erasing history.",
    ],
    output:
      "A proposed signed review attestation with expiry and revocation metadata.",
    limit:
      "The demo contains simulated attestations. No real signatures, accreditation or universal safety certification are issued.",
    state: "Sample attestation · version 1.2 only",
    source: "CP-ATT-12",
    feature: "A review with a visible boundary.",
  },
  {
    slug: "change-monitoring",
    short: "Change",
    name: "Vetting Harbor Review Report",
    question: "What changed since?",
    icon: "calendar-clock",
    description:
      "Bring scope and version changes back to the buyer’s decision workflow.",
    input:
      "A reviewed baseline and an agreed source of future listing or manifest changes.",
    steps: [
      "Detect a supplied version or permission change.",
      "Mark the current version as requiring review.",
      "Notify the buyer through an agreed workflow, with human approval.",
    ],
    output:
      "A change record linking the delta, affected evidence and proposed next action.",
    limit:
      "Monitoring is a proposed later capability. This preview uses fixed fixtures; there is no live scanning or connected notification channel.",
    state: "Buyer notification · preview only",
    source: "CP-CHG-13",
    feature: "Keep the evidence conversation current.",
  },
];
export const fixtures = [
  {
    id: "CP-013",
    publisher: "Clearpath Agents",
    agent: "Support Assistant",
    version: "1.3",
    status: "Pending",
    owner: "Mira Sol",
    date: "10 Oct",
    source: "CP-MAN-13",
    exception: "New scope: write:contacts",
    next: "Agree contact-write test boundaries",
    due: "12 Oct 2026",
  },
  {
    id: "NA-004",
    publisher: "Northline Assist",
    agent: "Queue Helper",
    version: "0.4",
    status: "Blocked",
    owner: "Ivo Lane",
    date: "10 Oct",
    source: "NA-INT-04",
    exception: "Publisher consent missing",
    next: "Obtain explicit sandbox consent",
    due: "12 Oct 2026",
  },
  {
    id: "RC-021",
    publisher: "Rowan Context",
    agent: "Context Reader",
    version: "2.1",
    status: "Completed",
    owner: "Lea Moss",
    date: "09 Oct",
    source: "RC-TST-21",
    exception: "Agreed read-only tests recorded",
    next: "Buyer reviews bounded report",
    due: "13 Oct 2026",
  },
  {
    id: "DP-008",
    publisher: "Dockpath Tools",
    agent: "Intake Assistant",
    version: "0.8",
    status: "Pending",
    owner: "Mira Sol",
    date: "09 Oct",
    source: "DP-MAN-08",
    exception: "Manifest provenance incomplete",
    next: "Request version-bound source",
    due: "13 Oct 2026",
  },
  {
    id: "SF-012",
    publisher: "Sable Forms",
    agent: "Form Operator",
    version: "1.2",
    status: "Rejected",
    owner: "Ivo Lane",
    date: "08 Oct",
    source: "SF-ID-12",
    exception: "Ownership documents conflict",
    next: "Explain evidence rejection",
    due: "12 Oct 2026",
  },
  {
    id: "AW-031",
    publisher: "Alder Workflow",
    agent: "Routing Helper",
    version: "3.1",
    status: "Pending",
    owner: "Lea Moss",
    date: "08 Oct",
    source: "AW-TST-31",
    exception: "Protocol awaiting review",
    next: "Approve proposed test protocol",
    due: "14 Oct 2026",
  },
  {
    id: "FN-006",
    publisher: "Fern Notes",
    agent: "Notes Reader",
    version: "0.6",
    status: "Completed",
    owner: "Mira Sol",
    date: "07 Oct",
    source: "FN-TST-06",
    exception: "Read-only report prepared",
    next: "Confirm evidence expiry with buyer",
    due: "14 Oct 2026",
  },
  {
    id: "CT-017",
    publisher: "Cedar Tasks",
    agent: "Task Assistant",
    version: "1.7",
    status: "Blocked",
    owner: "Ivo Lane",
    date: "07 Oct",
    source: "CT-TST-17",
    exception: "Test result inconclusive",
    next: "Review inconsistent sandbox outcome",
    due: "13 Oct 2026",
  },
  {
    id: "OW-009",
    publisher: "Orchard Writes",
    agent: "Record Writer",
    version: "0.9",
    status: "Rejected",
    owner: "Lea Moss",
    date: "06 Oct",
    source: "OW-MAN-09",
    exception: "Requested scope outside agreed study",
    next: "Discuss a revised study boundary",
    due: "12 Oct 2026",
  },
  {
    id: "PR-014",
    publisher: "Pine Relay",
    agent: "Relay Assistant",
    version: "1.4",
    status: "Pending",
    owner: "Mira Sol",
    date: "06 Oct",
    source: "PR-ID-14",
    exception: "Ownership review not completed",
    next: "Review submitted identity evidence",
    due: "14 Oct 2026",
  },
];
export const faqs = [
  [
    "Is this a live product?",
    "Vetting Harbor is a research-stage concept. The workspace and every publisher, report and outcome shown here are synthetic. Initial studies would be manually prepared for consenting publishers. Demand and willingness to pay remain unvalidated.",
  ],
  [
    "Does an old review cover a new version?",
    "No. The sample review is bound to v1.2 and read:tickets. The additional write:contacts permission in v1.3 has not been tested. A version or scope change requires a new review boundary.",
  ],
  [
    "Is this a safety certification?",
    "No. A version-specific evidence report describes sources, tested actions, dates and limits. It does not establish universal safety, regulatory accreditation or approval to install.",
  ],
  [
    "How would this work with existing marketplaces?",
    "The proposed evidence pack would complement existing marketplace checks. A pilot needs verified listing or install-flow access, an accepted review standard and explicit buyer agreement to use the evidence. No integrations are live.",
  ],
  [
    "Who pays, and who controls the findings?",
    "Funding is a research question. The proposed independence policy requires payer disclosure, assessor control over findings, recusal for conflicts and no payment contingent on a favorable conclusion.",
  ],
  [
    "What would make the pilot successful?",
    "A marketplace distribution pilot, or a procurement team formally using the report in a purchase gate, with named criteria and ideally a funded evaluation. A polished demo or a form draft is not customer validation.",
  ],
];
export const pages = {
  "/why-version-evidence": {
    eyebrow: "Why version evidence",
    title: "A listing is a starting point.\nThe version is the question.",
    intro:
      "Ownership, requested scopes and observed behavior can change after a review. Buyers need to see the relationship between the version they are evaluating and the evidence they are reading.",
    image: "version-folios",
    sections: [
      [
        "The gap between reviewed and current",
        "An old report can be accurate about its original subject and still say nothing about a newly requested action. In our sample, v1.3 adds write:contacts to a v1.2 manifest that only requested read:tickets.",
      ],
      [
        "Existing review is real",
        "Salesforce’s security review, Microsoft’s Agent Store controls, enterprise vendor-risk review and penetration testing are established alternatives. Portable independent evidence has to earn acceptance inside these workflows.",
      ],
      [
        "A narrower, inspectable proposal",
        "Link publisher, version, manifest, protocol, source and lifecycle. Put untested actions and missing evidence beside the findings, so a human buyer can decide what else is needed.",
      ],
    ],
    cta: "Compare the sample versions",
  },
  "/platform": {
    eyebrow: "Proposed evidence workbench",
    title: "One record.\nA traceable decision.",
    intro:
      "The shared workbench connects the five proposed modules around an exact publisher and agent version. The first pilot is a manual evidence pack, with one module selected for evaluation.",
    image: "open-report",
    sections: [
      [
        "Intake and provenance",
        "Consent boundary, publisher-submitted documents, version-bound manifest and source references enter the same record. Public forms do not accept contracts, credentials or logs.",
      ],
      [
        "Exceptions and human review",
        "Missing consent blocks testing. Conflicting ownership evidence can reject a submission. Inconclusive results stay visible; a reviewer owns a dated next action.",
      ],
      [
        "Decision and lifecycle",
        "A buyer reviews sources and limits, records an internal next step and inspects expiry or revocation. Monitoring and cross-store reuse are future hypotheses, dependent on source access.",
      ],
    ],
    cta: "Open the evidence workbench",
  },
  "/how-it-works": {
    eyebrow: "The proposed process",
    title: "From consented sources\nto an inspectable pack.",
    intro:
      "Agree what will be reviewed before any sandbox work begins. Preserve the boundary through intake, testing, review and buyer use.",
    image: "module-atlas",
    sections: [
      [
        "01 / Agree the decision",
        "Name the marketplace flow or purchase gate, buyer, accepted criteria, reviewer and consenting publishers. Select one proposed module for the first pilot.",
      ],
      [
        "02 / Bind the sources",
        "Record consent, publisher documentation, submitted version and requested permission manifest. Every observation points to a source and timestamp.",
      ],
      [
        "03 / Test and review",
        "Run only the agreed sandbox protocol. Record environment and reproducibility, unresolved exceptions and observed results. The assessor controls the findings.",
      ],
      [
        "04 / Use and revisit",
        "The buyer decides whether the evidence satisfies its gate. Issue a dated version-specific report; a scope change, expiry or revocation becomes a separate visible event.",
      ],
    ],
    cta: "Inspect a sample pack",
  },
  "/evidence-standard": {
    eyebrow: "Proposed evidence standard",
    title: "Every finding needs\na source and a boundary.",
    intro:
      "The standard below is a proposal for pilot discussion. Acceptance by a marketplace or procurement team has not been demonstrated.",
    image: "open-report",
    sections: [
      [
        "Identity and version",
        "Name the submitted publisher, documentation status, agent version and manifest source. Preserve the exact artifact identifiers used in review.",
      ],
      [
        "Test reproducibility",
        "State the protocol, test environment, inputs, expected action, observed outcome, date and limitations. “Not tested” and “inconclusive” remain first-class outcomes.",
      ],
      [
        "Issuer and conflicts",
        "Name the assessor and payer, disclose relationships, explain recusals, and keep the issuer’s authority separate from the buyer’s install decision.",
      ],
      [
        "Validity and lifecycle",
        "State issue date, expiry, version applicability, revocation status and reason. Distinguish withdrawn evidence from new work that has not been reviewed.",
      ],
    ],
    cta: "Read the sample report",
  },
  "/independence": {
    eyebrow: "Proposed review governance",
    title: "Evidence needs\nroom to disagree.",
    intro:
      "The assessor must be free to record inconvenient findings. Independence is a condition to establish before a pilot, not a claim made by this preview.",
    image: "open-report",
    sections: [
      [
        "Publisher supplies the artifacts",
        "Consent, identity documents and builds come from the publisher. Submission or payment does not purchase a favorable result, a badge or an install approval.",
      ],
      [
        "Assessor controls the findings",
        "Proposed controls: written conflict declarations, recusal, no outcome-contingent fees, a documented review trail and separation between sales and assessment decisions.",
      ],
      [
        "Buyer owns the decision",
        "The marketplace or procurement team sets acceptance criteria and decides how evidence affects listing, installation or purchase. The report does not replace that authority.",
      ],
      [
        "Funding and challenge",
        "Disclose who commissioned and funded each study. A correction or challenge must preserve earlier findings and reasons for change. Actual governance, liability and reviewer qualification require pilot agreement.",
      ],
    ],
    cta: "Discuss an independence-first pilot",
  },
  "/review-limits": {
    eyebrow: "Assurance boundaries",
    title: "The limits belong\nnext to the findings.",
    intro:
      "A report explains what was observed in an agreed setting. It must also explain what that observation does not cover.",
    image: "version-folios",
    sections: [
      [
        "Version applicability",
        "A v1.2 review does not cover the additional write:contacts scope in v1.3. This is a boundary gap, not evidence that v1.3 is unsafe.",
      ],
      [
        "Environment and untested actions",
        "Submitted artifacts and a sandbox may differ from production. Non-tested actions, future changes, adversarial publishers and unavailable telemetry remain limits.",
      ],
      [
        "Expiry and revocation",
        "Expiry is the end of a declared validity period. Revocation is an issuer withdrawal with a reason. A new version is a third, separate event; inspect the demo presets to compare them.",
      ],
      [
        "No universal certification",
        "Neither a vendor review nor this proposed evidence pack establishes universal safety, regulatory accreditation, legal compliance or an install authorization.",
      ],
    ],
    cta: "Explore lifecycle states",
  },
  "/about": {
    eyebrow: "About the concept",
    title: "A more open\nagent economy.",
    intro:
      "Vetting Harbor explores how version-specific evidence could help marketplace operators and procurement teams make third-party agent decisions.",
    image: "hero-atlas",
    sections: [
      [
        "Our vision",
        "Buyers inspect current-version behavior and scope before authorizing third-party agents.",
      ],
      [
        "Our mission",
        "Make publisher identity, permissions, evidence age and revocation visible in procurement.",
      ],
      [
        "Where the work stands",
        "This is Concept 8, a research-stage prototype. No real customers, live integrations, accepted pricing, operating review service or revenue has been demonstrated. The proposed brand and domain still need registration and trademark review.",
      ],
      [
        "What we need to learn",
        "Can buyers agree on review criteria? Can a marketplace embed evidence in its listing or install flow? Can an assessor preserve independence? These are the questions the pilot is designed to test.",
      ],
    ],
    cta: "See the pilot criteria",
  },
  "/integrations": {
    eyebrow: "Ecosystem fit · proposed",
    title: "Evidence belongs\ninside the decision flow.",
    intro:
      "Distribution depends on verified listing or install-flow access. No third-party integrations, stores or telemetry channels are connected to this preview.",
    image: "module-atlas",
    sections: [
      [
        "Marketplace operators",
        "Explore a report link or evidence panel at an existing listing, publishing or installation gate. Agree who can attach evidence and how a changed version is handled.",
      ],
      [
        "Procurement workflows",
        "Explore a version-bound pack as an input to an existing vendor-risk purchase gate. Define the accepted standard, reviewer and escalation owner.",
      ],
      [
        "Telemetry and notifications",
        "Access to change signals, source artifacts and notification destinations is unresolved. Monitoring follows a successful manual study; it is not a live capability here.",
      ],
    ],
    cta: "Discuss your distribution workflow",
  },
  "/results": {
    eyebrow: "Validation, not vanity metrics",
    title: "The next proof\nis a buyer commitment.",
    intro:
      "Demand evidence and willingness to pay are low and unvalidated. Synthetic sample records illustrate the workflow; they are not measured business results.",
    image: "open-report",
    sections: [
      [
        "The first experiment",
        "Prepare manually reviewed evidence packs for two consenting agents. Observe an actual marketplace operator and procurement reviewers using them in a real decision workflow.",
      ],
      [
        "Advance criteria",
        "A named marketplace distribution pilot, or a procurement team formally agreeing to use the report in a purchase gate. Require attributable evidence and named review criteria; ideally a funded evaluation.",
      ],
      [
        "Stop criteria",
        "Stop or revise if no gatekeeper grants access, the buyer cannot name an acceptance standard, independence cannot be established, or evidence has no effect on the purchase decision.",
      ],
      [
        "Record what happened",
        "Track sponsor, budget owner, consenting publishers, artifacts, qualified meetings and pilot commitments. Keep unknown values distinct from zero. No milestone is complete without evidence.",
      ],
    ],
    cta: "Prepare a pilot discussion",
  },
};
