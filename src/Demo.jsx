import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { fixtures } from "./data";
import { I, Button, Badge, DemoLabel, Lifecycle } from "./App";
import { track, downloadText, sampleReport } from "./utils";
const tabList = [
  ["overview", "Overview"],
  ["diff", "Version diff"],
  ["tests", "Test protocol"],
  ["report", "Report"],
  ["lifecycle", "Lifecycle"],
  ["notifications", "Notifications"],
];
export function Demo() {
  const location = useLocation();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedSource, setSelectedSource] = useState(null);
  const [action, setAction] = useState("");
  const [completed, setCompleted] = useState(false);
  const [menu, setMenu] = useState(false);
  const [reset, setReset] = useState(false);
  const [reportSection, setReportSection] = useState("Overview");
  const parts = location.pathname.split("/");
  const id = parts[3];
  const tab = parts[4] || "overview";
  const record = fixtures.find((f) => f.id === id);
  const isCP = record?.id === "CP-013";
  const dictionary = location.pathname === "/demo/dictionary";
  useEffect(() => {
    track("demo_open", "synthetic-demo");
    setAction("");
    setSelectedSource(null);
    setMenu(false);
  }, [location.pathname]);
  function finish() {
    setCompleted(true);
    setAction(
      "Local review note recorded: agree a scope-specific test. No approval, notification or external write occurred.",
    );
    track("demo_complete", "synthetic-demo", "CP-013-local-review");
  }
  function doReset() {
    setSearch("");
    setFilter("All");
    setSelectedSource(null);
    setAction("");
    setCompleted(false);
    setReportSection("Overview");
    setReset(false);
    navigate("/demo");
  }
  const rows = fixtures.filter(
    (f) =>
      (filter === "All" || f.status === filter) &&
      `${f.id} ${f.publisher} ${f.agent}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div className="workspace">
      <div className="workspace-ribbon">
        <strong>DEMO — SYNTHETIC DATA</strong>
        <span>
          CONCEPT PREVIEW · fixed sample clock: 10 Oct 2026, 12:00 UTC
        </span>
        <Link to="/">
          Exit preview <I name="arrow-up-right" />
        </Link>
      </div>
      <div className="workspace-top">
        <Link to="/" className="brand" aria-label="Vetting Harbor home">
          <img
            src="/assets/brand/horizontal-primary.svg"
            alt="Vetting Harbor"
            width="210"
            height="40"
          />
        </Link>
        <div>
          <span className="workspace-name">
            Harbor Review Lab <small>Fictional workspace</small>
          </span>
          <button className="text-button" onClick={() => setReset(true)}>
            <I name="rotate-ccw" /> Reset demo
          </button>
          <button
            className="menu-button demo-menu"
            aria-label="Toggle workspace navigation"
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            <I name="menu" />
          </button>
        </div>
      </div>
      <div className="workspace-layout">
        <aside className={`workspace-sidebar ${menu ? "open" : ""}`}>
          <p className="eyebrow">REVIEW WORKSPACE</p>
          <NavLink end to="/demo">
            <I name="files" />
            Review queue <span>10</span>
          </NavLink>
          <NavLink to="/demo/reviews/CP-013/overview">
            <I name="file-text" />
            Clearpath record
          </NavLink>
          <NavLink to="/demo/reviews/CP-013/diff">
            <I name="git-branch" />
            Version comparison
          </NavLink>
          <NavLink to="/demo/reviews/CP-013/notifications">
            <I name="calendar-clock" />
            Change preview
          </NavLink>
          <NavLink to="/demo/dictionary">
            <I name="info" />
            Data dictionary
          </NavLink>
          <div className="sidebar-note">
            <I name="lock-keyhole" />
            <strong>Fixture-only mode</strong>
            <p>
              No agents scanned. No integrations, sends, billing or external
              writes.
            </p>
            <Link to="/review-limits">Review limits ↗</Link>
          </div>
          <div className="demo-owner">
            <span>MS</span>
            <div>
              Mira Sol<small>Fictional reviewer</small>
            </div>
          </div>
        </aside>
        <div className="workspace-content">
          {dictionary ? (
            <Dictionary />
          ) : record ? (
            <>
              <div className="breadcrumb">
                <Link to="/demo">Review queue</Link>
                <I name="chevron-right" />
                <span>{record.id}</span>
              </div>
              <div className="record-heading">
                <div>
                  <small>{record.id} / FICTIONAL PUBLISHER</small>
                  <h1>{record.publisher}</h1>
                  <p>
                    {record.agent} · Current submission v{record.version}
                  </p>
                </div>
                <Badge
                  tone={
                    record.status === "Blocked" || record.status === "Rejected"
                      ? "danger"
                      : record.status === "Completed"
                        ? "success"
                        : "warning"
                  }
                >
                  {record.status}
                </Badge>
              </div>
              <nav className="record-tabs" aria-label="Evidence record views">
                {tabList.map(([t, label]) => (
                  <NavLink key={t} to={`/demo/reviews/${record.id}/${t}`}>
                    {label}
                  </NavLink>
                ))}
              </nav>
              {!isCP && tab !== "overview" ? (
                <div className="empty-state">
                  <I name="info" />
                  <h2>This fixture includes intake evidence only.</h2>
                  <p>
                    The full two-version walkthrough is seeded for Clearpath
                    Agents. No tests or reports have been invented for this
                    record.
                  </p>
                  <Button
                    to={`/demo/reviews/${record.id}/overview`}
                    variant="outline"
                  >
                    View this intake record
                  </Button>
                  <Button to="/demo/reviews/CP-013/diff">
                    Open the seeded comparison
                  </Button>
                </div>
              ) : (
                <div className="record-grid">
                  <div className="record-main">
                    {tab === "overview" && (
                      <>
                        <section className="work-panel">
                          <div className="panel-title">
                            <h2>Review summary</h2>
                            <Badge
                              tone={completed && isCP ? "success" : "warning"}
                            >
                              {completed && isCP
                                ? "Next action recorded"
                                : "Human review required"}
                            </Badge>
                          </div>
                          <dl className="facts-list">
                            <dt>Publisher verification</dt>
                            <dd>
                              Sample documentation ·{" "}
                              {record.status === "Rejected"
                                ? "conflicting evidence"
                                : "not real verification"}
                            </dd>
                            <dt>Current exception</dt>
                            <dd>{record.exception}</dd>
                            <dt>Assigned owner</dt>
                            <dd>{record.owner} · fictional reviewer</dd>
                            <dt>Updated / next action</dt>
                            <dd>
                              {record.date} 2026 / due {record.due}
                            </dd>
                            <dt>Proposed next action</dt>
                            <dd>{record.next}</dd>
                          </dl>
                        </section>
                        {isCP && (
                          <section className="change-summary">
                            <small>VERSION / PERMISSION DELTA</small>
                            <h2>A read permission became a write question.</h2>
                            <div className="scope-delta">
                              <span>v1.2 · read:tickets</span>
                              <I name="arrow-right" />
                              <span className="added">
                                v1.3 · + write:contacts
                              </span>
                            </div>
                            <p>
                              The old review is version-bound. The added action
                              has not been tested.
                            </p>
                            <Button
                              to="/demo/reviews/CP-013/diff"
                              variant="outline"
                            >
                              Inspect the version diff
                            </Button>
                          </section>
                        )}
                        <section className="work-panel">
                          <h2>Proposed reviewer action</h2>
                          <p>
                            {record.next}. This remains an internal preview; no
                            approval to install or external action is issued.
                          </p>
                          <Button
                            onClick={
                              isCP
                                ? finish
                                : () =>
                                    setAction(
                                      "Local intake note previewed. No publisher was contacted and no external action occurred.",
                                    )
                            }
                          >
                            {isCP
                              ? "Record local next step"
                              : "Preview internal next step"}
                          </Button>
                          <p className="caption">
                            Human approval is required before any real external
                            action.
                          </p>
                        </section>
                      </>
                    )}
                    {tab === "diff" && (
                      <>
                        <section className="work-panel">
                          <div className="panel-title">
                            <h2>Reviewed vs. current</h2>
                            <Badge tone="warning">
                              1 added scope · not tested
                            </Badge>
                          </div>
                          <div className="version-grid">
                            <article>
                              <small>REVIEWED / 01 OCT 2026</small>
                              <h3>Version 1.2</h3>
                              <p>CP-MAN-12</p>
                              <div className="permission unchanged">
                                <I name="check" />
                                <code>read:tickets</code>
                                <span>Recorded in v1.2 protocol</span>
                              </div>
                            </article>
                            <article className="current-version">
                              <small>CURRENT / 08 OCT 2026</small>
                              <h3>Version 1.3</h3>
                              <p>CP-MAN-13</p>
                              <div className="permission unchanged">
                                <I name="check" />
                                <code>read:tickets</code>
                                <span>Unchanged requested scope</span>
                              </div>
                              <div className="permission new">
                                <I name="plus" />
                                <code>write:contacts</code>
                                <span>Added · not tested</span>
                              </div>
                            </article>
                          </div>
                          <p className="notice">
                            “Not tested” is an evidence gap. It does not mean a
                            risky action was observed or the current agent is
                            unsafe.
                          </p>
                        </section>
                        <section className="work-panel">
                          <h2>Review boundary</h2>
                          <dl className="facts-list">
                            <dt>Reviewed scope</dt>
                            <dd>Ticket read in an isolated mock store</dd>
                            <dt>Not covered</dt>
                            <dd>
                              Contact writes, production deployment, v1.3
                              behavior
                            </dd>
                            <dt>Evidence age</dt>
                            <dd>9 days · fixed sample clock 10 Oct 2026</dd>
                            <dt>Source provenance</dt>
                            <dd>Publisher-submitted synthetic manifests</dd>
                          </dl>
                          <Button
                            to="/demo/reviews/CP-013/tests"
                            variant="outline"
                          >
                            Read the test protocol
                          </Button>
                        </section>
                      </>
                    )}
                    {tab === "tests" && (
                      <>
                        <section className="work-panel">
                          <div className="panel-title">
                            <h2>Protocol CP-TST-12</h2>
                            <Badge tone="success">v1.2 fixture recorded</Badge>
                          </div>
                          <p>
                            Reproducibility record for the reviewed read-only
                            action. Every artifact below is synthetic; this site
                            does not execute sandbox tests.
                          </p>
                          <ol className="protocol-list">
                            <li>
                              <strong>Environment</strong>
                              <span>
                                Mock ticket store · isolated fixture mode · no
                                outbound calls
                              </span>
                            </li>
                            <li>
                              <strong>Input</strong>
                              <span>
                                Ticket T-042, fictional customer record,
                                read:tickets manifest
                              </span>
                            </li>
                            <li>
                              <strong>Expected action</strong>
                              <span>
                                Read an existing ticket without modifying
                                records
                              </span>
                            </li>
                            <li>
                              <strong>Observed fixture</strong>
                              <span>
                                Read action recorded; no write action in this
                                submitted protocol
                              </span>
                            </li>
                            <li>
                              <strong>Reviewer and date</strong>
                              <span>Mira Sol · 01 Oct 2026 · sample only</span>
                            </li>
                          </ol>
                        </section>
                        <section className="work-panel">
                          <div className="panel-title">
                            <h2>v1.3 contact-write test</h2>
                            <Badge tone="info">Not run</Badge>
                          </div>
                          <p>
                            CP-TST-13 is a proposed protocol, not executed
                            evidence. Contact writes need agreed boundaries, an
                            isolated contact fixture and an accepted outcome
                            criterion.
                          </p>
                          <Button
                            onClick={() =>
                              setAction(
                                "Proposed test boundary opened for discussion. No sandbox or agent call was made.",
                              )
                            }
                            variant="outline"
                          >
                            Preview proposed test boundary
                          </Button>
                        </section>
                        <section className="work-panel">
                          <h2>An honest edge case</h2>
                          <p>
                            Cedar Tasks CT-017 has an inconclusive outcome. It
                            stays blocked for reviewer follow-up, rather than
                            receiving a successful recommendation.
                          </p>
                          <Link
                            className="text-link"
                            to="/demo/reviews/CT-017/overview"
                          >
                            Inspect the blocked record
                            <I name="arrow-right" />
                          </Link>
                        </section>
                      </>
                    )}
                    {tab === "report" && (
                      <section className="work-panel printable-report">
                        <DemoLabel />
                        <div className="panel-title">
                          <div>
                            <small>CP-ATT-12 / SAMPLE REPORT</small>
                            <h2>Version-bound evidence pack</h2>
                          </div>
                          <button
                            className="icon-button"
                            aria-label="Download synthetic evidence report"
                            onClick={() =>
                              downloadText(
                                "DEMO-clearpath-evidence-pack.txt",
                                sampleReport(),
                              )
                            }
                          >
                            <I name="download" />
                          </button>
                        </div>
                        <div
                          className="report-sections"
                          aria-label="Report sections"
                        >
                          {[
                            "Overview",
                            "Permissions",
                            "Test results",
                            "Changes",
                            "Sources",
                            "Issuer & limits",
                          ].map((s) => (
                            <button
                              key={s}
                              aria-pressed={s === reportSection}
                              onClick={() => setReportSection(s)}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <ReportContent section={reportSection} />
                        <div className="report-disclaimer">
                          <strong>Exact limit of assurance</strong>
                          <p>
                            Version 1.2, submitted read:tickets manifest and
                            recorded mock ticket-read protocol only. No coverage
                            of the added v1.3 write scope. No universal safety
                            certification, real signature or install approval.
                          </p>
                        </div>
                        <Button
                          onClick={() =>
                            downloadText(
                              "DEMO-clearpath-evidence-pack.txt",
                              sampleReport(),
                            )
                          }
                          variant="outline"
                        >
                          Export labeled sample report
                        </Button>
                        <DemoLabel />
                      </section>
                    )}
                    {tab === "lifecycle" && (
                      <>
                        <Lifecycle />
                        <section className="work-panel">
                          <h2>Three independent sample presets</h2>
                          <p>
                            The presets do not overwrite the baseline or claim
                            that a scope change automatically revoked an
                            attestation. Baseline issue: 01 Oct. Baseline
                            expiry: 31 Oct. Alternate expired preset: 09 Oct.
                            Alternate revoked preset: 09 Oct with incomplete
                            protocol provenance.
                          </p>
                          <Button
                            onClick={() =>
                              downloadText(
                                "DEMO-lifecycle-dictionary.txt",
                                sampleReport(
                                  "separate version / expiry / revocation scenarios",
                                ),
                              )
                            }
                            variant="outline"
                          >
                            Export lifecycle explanation
                          </Button>
                        </section>
                      </>
                    )}
                    {tab === "notifications" && (
                      <>
                        <section className="notification-preview">
                          <DemoLabel />
                          <small>BUYER NOTIFICATION / NOT SENT</small>
                          <h2>
                            The scope changed.
                            <br />
                            Your evidence needs a new boundary.
                          </h2>
                          <p>
                            Clearpath Support Assistant v1.3 adds{" "}
                            <code>write:contacts</code>. The reviewed v1.2
                            protocol covered ticket reads only.
                          </p>
                          <dl className="facts-list">
                            <dt>Intended recipient</dt>
                            <dd>Buyer review team · fictional</dd>
                            <dt>Trigger</dt>
                            <dd>CP-MAN-13 permission delta · 08 Oct 2026</dd>
                            <dt>Suggested action</dt>
                            <dd>Agree v1.3 contact-write test criteria</dd>
                            <dt>Channel</dt>
                            <dd>Preview only · no integration</dd>
                          </dl>
                          <Button
                            onClick={() =>
                              setAction(
                                "Notification marked reviewed in this tab only. No email, webhook or buyer message was sent.",
                              )
                            }
                          >
                            Mark preview reviewed locally
                          </Button>
                          <p className="caption">
                            Real sending is disabled. Human approval and
                            configured buyer consent would be required.
                          </p>
                        </section>
                      </>
                    )}
                    {action && (
                      <p className="action-feedback" role="status">
                        <I name="check" />
                        {action}
                      </p>
                    )}
                  </div>
                  <aside className="source-pane">
                    <div className="panel-title">
                      <h2>Source evidence</h2>
                      <I name="panel-right-open" />
                    </div>
                    <p className="caption">
                      Synthetic artifacts · inspectable provenance
                    </p>
                    {(isCP
                      ? [
                          [
                            "CP-ID-12",
                            "Publisher documentation",
                            "01 Oct 2026",
                          ],
                          [
                            "CP-MAN-12",
                            "Reviewed manifest · v1.2",
                            "01 Oct 2026",
                          ],
                          [
                            "CP-MAN-13",
                            "Current manifest · v1.3",
                            "08 Oct 2026",
                          ],
                          [
                            "CP-TST-12",
                            "Test protocol · ticket read",
                            "01 Oct 2026",
                          ],
                          ["CP-ATT-12", "Sample attestation", "01 Oct 2026"],
                        ]
                      : [
                          [
                            record.source,
                            "Intake evidence fixture",
                            `${record.date} 2026`,
                          ],
                        ]
                    ).map(([s, label, date]) => (
                      <button
                        key={s}
                        className={`source-link ${selectedSource === s ? "selected" : ""}`}
                        onClick={() =>
                          setSelectedSource(selectedSource === s ? null : s)
                        }
                        aria-expanded={selectedSource === s}
                      >
                        <I name="file-text" />
                        <span>
                          <strong>{s}</strong>
                          {label}
                          <small>{date} · sample</small>
                        </span>
                        <I name="chevron-right" />
                      </button>
                    ))}
                    {selectedSource && (
                      <div
                        className="source-open"
                        role="region"
                        aria-label={`${selectedSource} source preview`}
                      >
                        <Badge>Source fixture</Badge>
                        <h3>{selectedSource}</h3>
                        <p>
                          {selectedSource === "CP-MAN-13"
                            ? "Submitted version: 1.3. Requested scopes: read:tickets, write:contacts. Source date: 08 Oct 2026. New scope not tested."
                            : selectedSource === "CP-MAN-12"
                              ? "Reviewed version: 1.2. Requested scopes: read:tickets. Source date: 01 Oct 2026."
                              : selectedSource === "CP-TST-12"
                                ? "Protocol: mock ticket T-042 read. Isolated fixture store. Submitted v1.2 only. Not a live sandbox result."
                                : selectedSource === "CP-ATT-12"
                                  ? "Simulated issuer: Harbor Review Lab. Issue 01 Oct, baseline expiry 31 Oct. Version 1.2 only. No real cryptographic signature."
                                  : `Fictional publisher-submitted document for ${record.publisher}. No real verification or evidence collection occurred.`}
                        </p>
                        <DemoLabel />
                      </div>
                    )}
                    <div className="source-limits">
                      <h3>Before relying on this</h3>
                      <p>
                        Inspect issuer, payer, version, protocol and limits. The
                        buyer owns the decision.
                      </p>
                      <Link to="/independence">
                        Proposed independence policy ↗
                      </Link>
                    </div>
                  </aside>
                </div>
              )}
            </>
          ) : id ? (
            <div className="empty-state">
              <h1>Record not found</h1>
              <p>This record is not part of the synthetic fixture set.</p>
              <Button to="/demo">Return to the queue</Button>
            </div>
          ) : (
            <>
              <div className="queue-heading">
                <div>
                  <p className="eyebrow">EVIDENCE REVIEW / INTAKE</p>
                  <h1>Review queue</h1>
                  <p>
                    Ten fictional records. A version-bound next action for each.
                  </p>
                </div>
                <Button to="/demo/reviews/CP-013/overview" variant="wine">
                  Open the guided sample
                </Button>
              </div>
              <div className="queue-stats">
                {[
                  ["Pending", 4],
                  ["Blocked", 2],
                  ["Completed", 2],
                  ["Rejected", 2],
                ].map(([s, n]) => (
                  <button
                    key={s}
                    onClick={() => setFilter(filter === s ? "All" : s)}
                    aria-pressed={filter === s}
                  >
                    <span>{s}</span>
                    <strong>{n}</strong>
                    <small>synthetic records</small>
                  </button>
                ))}
              </div>
              <div className="queue-controls">
                <label className="search-field">
                  <I name="search" />
                  <input
                    aria-label="Search synthetic review queue"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search publisher, agent or record…"
                  />
                </label>
                <label>
                  Status
                  <select
                    aria-label="Filter review status"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    {["All", "Pending", "Blocked", "Completed", "Rejected"].map(
                      (s) => (
                        <option key={s}>{s}</option>
                      ),
                    )}
                  </select>
                </label>
              </div>
              <div className="table-scroll">
                <table className="queue-table">
                  <thead>
                    <tr>
                      <th>Publisher / agent</th>
                      <th>Version</th>
                      <th>Review state</th>
                      <th>Exception / next question</th>
                      <th>Owner</th>
                      <th>Updated</th>
                      <th>
                        <span className="sr-only">Open record</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((f) => (
                      <tr key={f.id}>
                        <td>
                          <Link to={`/demo/reviews/${f.id}/overview`}>
                            <strong>{f.publisher}</strong>
                            <span>
                              {f.agent} · {f.id}
                            </span>
                          </Link>
                        </td>
                        <td>v{f.version}</td>
                        <td>
                          <Badge
                            tone={
                              f.status === "Completed"
                                ? "success"
                                : f.status === "Blocked" ||
                                    f.status === "Rejected"
                                  ? "danger"
                                  : "warning"
                            }
                          >
                            {f.status}
                          </Badge>
                        </td>
                        <td>
                          {f.exception}
                          <small>Due {f.due}</small>
                        </td>
                        <td>{f.owner}</td>
                        <td>{f.date}</td>
                        <td>
                          <Link
                            className="row-open"
                            to={`/demo/reviews/${f.id}/overview`}
                            aria-label={`Open ${f.publisher} record`}
                          >
                            <I name="arrow-up-right" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!rows.length && (
                  <div className="empty-state">
                    <I name="search" />
                    <h2>No matching sample records</h2>
                    <p>Try a publisher name or reset the filters.</p>
                    <button
                      className="button outline"
                      onClick={() => {
                        setSearch("");
                        setFilter("All");
                      }}
                    >
                      Clear filters
                    </button>
                  </div>
                )}
              </div>
              <div className="queue-bottom">
                <span>{rows.length} of 10 synthetic records</span>
                <Link to="/demo/dictionary">
                  Read the data dictionary
                  <I name="arrow-up-right" />
                </Link>
              </div>
              <div className="queue-guidance">
                <I name="info" />
                <p>
                  Completed means a bounded report was prepared. It does not
                  mean safe, certified or approved to install.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      {reset && (
        <div className="dialog-backdrop" onClick={() => setReset(false)}>
          <section
            className="reset-dialog"
            role="dialog"
            aria-modal="true"
            onKeyDown={(e) => {
              if (e.key === "Escape") setReset(false);
              if (e.key === "Tab") {
                const els = e.currentTarget.querySelectorAll("button,a");
                const first = els[0],
                  last = els[els.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
            aria-labelledby="reset-title"
            onClick={(e) => e.stopPropagation()}
          >
            <I name="rotate-ccw" />
            <h2 id="reset-title">Reset this demo?</h2>
            <p>
              Clear search, filters, source selections and local review notes.
              Restore the ten original synthetic records. No external data is
              affected.
            </p>
            <Button autoFocus onClick={doReset}>
              Reset demo
            </Button>
            <button className="text-button" onClick={() => setReset(false)}>
              Keep exploring
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
function ReportContent({ section }) {
  const data = {
    Overview: [
      [
        "Subject",
        "Clearpath Agents · Support Assistant · reviewed v1.2, current v1.3.",
      ],
      [
        "Dates",
        "Reviewed 01 Oct 2026. Fixed sample clock 10 Oct 2026, 12:00 UTC. Evidence age: 9 days.",
      ],
      [
        "Publisher status",
        "Sample documentation only. Publisher identity and ownership are fictional.",
      ],
    ],
    Permissions: [
      ["Reviewed v1.2", "read:tickets · CP-MAN-12"],
      ["Current v1.3", "read:tickets + write:contacts · CP-MAN-13"],
      [
        "Boundary",
        "Added contact-write scope not tested. Old review does not cover v1.3.",
      ],
    ],
    "Test results": [
      [
        "Recorded protocol",
        "CP-TST-12 · read mock ticket T-042 · fixture outcome read-only.",
      ],
      ["Not tested", "v1.3 contact write · proposed CP-TST-13 not run."],
      [
        "Reproducibility",
        "Isolated mock store, fixed synthetic input, no third-party calls.",
      ],
    ],
    Changes: [
      ["08 Oct 2026", "v1.3 manifest supplied; adds write:contacts."],
      [
        "10 Oct 2026",
        "Reviewer assigned; next action: agree contact-write test criteria.",
      ],
      [
        "Lifecycle",
        "Version applicability is distinct from expiry and issuer revocation.",
      ],
    ],
    Sources: [
      ["Identity", "CP-ID-12 · publisher documentation fixture · 01 Oct."],
      ["Manifests", "CP-MAN-12 / CP-MAN-13 · 01 Oct / 08 Oct."],
      [
        "Protocol and attestation",
        "CP-TST-12 / CP-ATT-12 · 01 Oct. All fabricated fixtures.",
      ],
    ],
    "Issuer & limits": [
      [
        "Issuer",
        "Harbor Review Lab · fictional assessor. Mira Sol · fictional reviewer.",
      ],
      [
        "Funding",
        "Fictional marketplace sponsor. Actual independence not established. Proposed conflict policy requires disclosure, recusal and no outcome-contingent payment.",
      ],
      [
        "Assurance limits",
        "No live verification, real signature, production telemetry, regulatory accreditation or universal certification. Buyer owns the decision.",
      ],
    ],
  };
  return (
    <div className="report-content" aria-live="polite">
      {data[section].map(([t, p]) => (
        <div key={t}>
          <h3>{t}</h3>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}
function Dictionary() {
  const rows = [
    ["Record ID", "Stable fictional submission reference, e.g. CP-013."],
    [
      "Publisher / agent",
      "Fabricated organization and agent names. No customers implied.",
    ],
    [
      "Workflow state",
      "Pending4 / Blocked2 / Completed2 / Rejected2. Completion is bounded report preparation, not install approval.",
    ],
    ["Owner", "Fictional human reviewer accountable for the next action."],
    [
      "Version / scope",
      "Publisher-submitted sample version and requested permissions, not observed runtime telemetry.",
    ],
    ["Source ID", "Fictional document reference with date and provenance."],
    [
      "Evidence age",
      "9 days: 01 Oct review to fixed sample clock 10 Oct 2026, 12:00 UTC.",
    ],
    [
      "Not tested",
      "Action outside the executed fixture protocol; neither pass nor fail.",
    ],
    [
      "Expired",
      "Alternate preset: validity ended 09 Oct; baseline expiry is 31 Oct.",
    ],
    [
      "Revoked",
      "Alternate preset: issuer withdrew on 09 Oct for incomplete protocol provenance. Separate from a version change.",
    ],
    [
      "Local next step",
      "A temporary browser-memory note. No external approval or notification.",
    ],
  ];
  return (
    <>
      <p className="eyebrow">FIXTURE DEFINITIONS</p>
      <h1>Data dictionary</h1>
      <p className="lead">
        Know what each sample field means before relying on the interface.
      </p>
      <section className="work-panel">
        <DemoLabel />
        <dl className="dictionary-list">
          {rows.map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </section>
      <div className="notice">
        <strong>No network side effects.</strong>
        <p>
          Reset restores UI state. Fixtures do not leave this site, real sending
          is disabled, and downloads always carry a synthetic-data label.
        </p>
      </div>
    </>
  );
}
