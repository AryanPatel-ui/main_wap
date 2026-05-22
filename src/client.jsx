import { useState } from "react";
import "./ClientDashboard.css";

/* ── Mock Data ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    id: 1,
    title: "Brand Identity Redesign",
    freelancer: "Aria Mehta",
    avatar: "AM",
    budget: "₹2,65,600",
    escrowed: "₹1,32,800",
    due: "Jun 14, 2025",
    status: "In Progress",
    milestone: "Logo Concepts",
    progress: 52,
    yieldEarned: "₹1,527.20",
  },
  {
    id: 2,
    title: "E-commerce Web App",
    freelancer: "Dev Patel",
    avatar: "DP",
    budget: "₹7,05,500",
    escrowed: "₹3,52,750",
    due: "Jul 02, 2025",
    status: "Under Review",
    milestone: "Frontend UI",
    progress: 78,
    yieldEarned: "₹5,079.60",
  },
  {
    id: 3,
    title: "Motion Graphics Pack",
    freelancer: "Lena Koch",
    avatar: "LK",
    budget: "₹1,49,400",
    escrowed: "₹74,700",
    due: "May 28, 2025",
    status: "Pending Start",
    milestone: "Storyboard",
    progress: 10,
    yieldEarned: "₹298.80",
  },
  {
    id: 4,
    title: "API Integration Suite",
    freelancer: "Omar Farooq",
    avatar: "OF",
    budget: "₹4,15,000",
    escrowed: "₹4,15,000",
    due: "May 20, 2025",
    status: "Completed",
    milestone: "Delivery",
    progress: 100,
    yieldEarned: "₹7,636",
  },
];

const STATUS_META = {
  "In Progress":   { cls: "cd-badge--blue",    label: "In Progress"   },
  "Under Review":  { cls: "cd-badge--yellow",   label: "Under Review"  },
  "Pending Start": { cls: "cd-badge--neutral",  label: "Pending Start" },
  "Completed":     { cls: "cd-badge--green",    label: "Completed"     },
};

const NAV_ITEMS = [
  { icon: <GridIcon />,     label: "Dashboard",   id: "dashboard" },
  { icon: <BriefcaseIcon />,label: "Projects",    id: "projects"  },
  { icon: <VaultIcon />,    label: "Escrow Vault",id: "vault"     },
  { icon: <ActivityIcon />, label: "Activity",    id: "activity"  },
  { icon: <MessageIcon />,  label: "Messages",    id: "messages", badge: 3 },
  { icon: <SettingsIcon />, label: "Settings",    id: "settings"  },
];

/* ── Root Component ─────────────────────────────────────────── */
export default function ClientDashboard({ name = "Client", onSignOut }) {
  const [activeNav, setActiveNav]       = useState("dashboard");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedId, setExpandedId]     = useState(null);
  const [showModal, setShowModal]       = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const filters = ["All", "In Progress", "Under Review", "Pending Start", "Completed"];

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.status === activeFilter);

  const totalEscrowed  = "₹9,75,250";
  const totalYield     = "₹14,541.60";
  const activeProjects = PROJECTS.filter(p => p.status !== "Completed").length;
  const firstName = name.trim().split(/\s+/)[0] || "Client";
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "C";

  return (
    <div className="cd-root">

      {/* ── Background FX ── */}
      <div className="cd-bg" aria-hidden="true">
        <div className="sr-orb sr-orb-1" />
        <div className="sr-orb sr-orb-2" />
        <div className="sr-grid-bg" />
      </div>

      {/* ── Sidebar ── */}
      <aside className="cd-sidebar">
        <div className="cd-sidebar-inner">

          {/* Logo */}
          <div className="cd-logo">
            <div className="cd-logo-icon">
              <ShieldIcon />
            </div>
            <span className="cd-logo-text">
              Trust<span className="cd-logo-accent">Lock</span>
            </span>
          </div>

          {/* Nav */}
          <nav className="cd-nav">
            <span className="cd-nav-label">MAIN MENU</span>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`cd-nav-item${activeNav === item.id ? " cd-nav-item--active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="cd-nav-icon">{item.icon}</span>
                <span className="cd-nav-text">{item.label}</span>
                {item.badge && (
                  <span className="cd-nav-badge">{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Vault teaser */}
          <div className="cd-vault-teaser">
            <div className="cd-vt-top">
              <YieldIcon />
              <span className="cd-vt-label">Yield Earned</span>
            </div>
            <div className="cd-vt-amount">{totalYield}</div>
            <p className="cd-vt-sub">Funds working while locked in escrow</p>
          </div>

          {/* User */}
          <div className="cd-sidebar-user" style={{ position: "relative" }}>
            <div className="cd-user-avatar">{initials}</div>
            <div className="cd-user-info">
              <span className="cd-user-name">{name}</span>
              <span className="cd-user-role">Client Account</span>
            </div>
            <button 
              className="cd-user-more" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex' }}
            >
              <DotsIcon />
            </button>
            
            {showUserMenu && (
              <div style={{
                position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
                background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8,
                padding: 4, width: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 10
              }}>
                <button
                  onClick={onSignOut}
                  style={{
                    width: '100%', padding: '8px 12px', textAlign: 'left', background: 'transparent',
                    border: 'none', color: '#ff6b6b', fontSize: 13, cursor: 'pointer', borderRadius: 6
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="cd-main">

        {/* Top bar */}
        <header className="cd-topbar">
          <div className="cd-topbar-left">
            <p className="cd-topbar-kicker">Client Dashboard</p>
            <h1 className="cd-topbar-title">Welcome back, {firstName}</h1>
          </div>
          <div className="cd-topbar-right">
            <button className="cd-icon-btn">
              <BellIcon />
              <span className="cd-notif-dot" />
            </button>
            <button className="cd-primary-btn" onClick={() => setShowModal(true)}>
              <PlusIcon />
              New Project
            </button>
          </div>
        </header>

        {/* ── Stat Cards ── */}
        <section className="cd-stats">
          <StatCard
            icon={<VaultIcon />}
            iconCls="cd-sci--blue"
            label="Total Escrowed"
            value={totalEscrowed}
            sub="Across 4 contracts"
            trend="+₹74,700 this month"
            trendUp
          />
          <StatCard
            icon={<YieldIcon />}
            iconCls="cd-sci--green"
            label="Yield Generated"
            value={totalYield}
            sub="On idle escrow funds"
            trend="+₹2,722.40 this week"
            trendUp
          />
          <StatCard
            icon={<BriefcaseIcon />}
            iconCls="cd-sci--blue"
            label="Active Projects"
            value={activeProjects}
            sub="1 awaiting your review"
            trend="2 milestones due soon"
          />
          <StatCard
            icon={<ShieldIcon />}
            iconCls="cd-sci--green"
            label="Trust Score"
            value="98%"
            sub="Based on 14 contracts"
            trend="Top 5% of clients"
            trendUp
          />
        </section>

        {/* ── Projects Panel ── */}
        <section className="cd-panel">

          <div className="cd-panel-head">
            <div>
              <h2 className="cd-panel-title">Active Contracts</h2>
              <p className="cd-panel-sub">Manage milestones, escrow releases &amp; disputes</p>
            </div>
            <div className="cd-filter-row">
              {filters.map(f => (
                <button
                  key={f}
                  className={`cd-filter-btn${activeFilter === f ? " cd-filter-btn--active" : ""}`}
                  onClick={() => setActiveFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="cd-project-list">
            {filtered.map(proj => (
              <ProjectCard
                key={proj.id}
                project={proj}
                expanded={expandedId === proj.id}
                onToggle={() => setExpandedId(expandedId === proj.id ? null : proj.id)}
              />
            ))}
            {filtered.length === 0 && (
              <div className="cd-empty">No contracts match this filter.</div>
            )}
          </div>
        </section>

        {/* ── Bottom Grid ── */}
        <div className="cd-bottom-grid">
          <RecentActivity />
          <EscrowBreakdown projects={PROJECTS} />
        </div>
      </main>

      {/* ── New Project Modal ── */}
      {showModal && <NewProjectModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

/* ── Stat Card ─────────────────────────────────────────────── */
function StatCard({ icon, iconCls, label, value, sub, trend, trendUp }) {
  return (
    <div className="cd-stat-card">
      <div className={`cd-stat-icon ${iconCls}`}>{icon}</div>
      <div className="cd-stat-body">
        <span className="cd-stat-label">{label}</span>
        <strong className="cd-stat-value">{value}</strong>
        <span className="cd-stat-sub">{sub}</span>
      </div>
      {trend && (
        <div className={`cd-stat-trend${trendUp ? " cd-stat-trend--up" : ""}`}>
          {trendUp ? <TrendUpIcon /> : <ClockIcon />}
          {trend}
        </div>
      )}
    </div>
  );
}

/* ── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project: p, expanded, onToggle }) {
  const meta = STATUS_META[p.status];
  return (
    <div className={`cd-project-card${expanded ? " cd-project-card--open" : ""}`}>
      <div className="cd-project-main" onClick={onToggle}>

        {/* Avatar + info */}
        <div className="cd-project-left">
          <div className="cd-avatar">{p.avatar}</div>
          <div className="cd-project-info">
            <h3 className="cd-project-title">{p.title}</h3>
            <p className="cd-project-meta">
              <span>{p.freelancer}</span>
              <span className="cd-dot" />
              <span>Due {p.due}</span>
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="cd-project-right">
          <div className="cd-project-amounts">
            <span className="cd-amount-label">Escrowed</span>
            <span className="cd-amount-val">{p.escrowed}</span>
          </div>
          <div className="cd-project-amounts">
            <span className="cd-amount-label">Yield</span>
            <span className="cd-amount-val cd-amount-val--green">{p.yieldEarned}</span>
          </div>
          <span className={`cd-badge ${meta.cls}`}>{meta.label}</span>
          <button className={`cd-chevron${expanded ? " cd-chevron--open" : ""}`}>
            <ChevronIcon />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="cd-progress-bar">
        <div className="cd-progress-fill" style={{ width: `${p.progress}%` }} />
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="cd-project-detail">
          <div className="cd-detail-row">
            <div className="cd-detail-block">
              <span className="cd-detail-label">Total Budget</span>
              <span className="cd-detail-val">{p.budget}</span>
            </div>
            <div className="cd-detail-block">
              <span className="cd-detail-label">Current Milestone</span>
              <span className="cd-detail-val">{p.milestone}</span>
            </div>
            <div className="cd-detail-block">
              <span className="cd-detail-label">Completion</span>
              <span className="cd-detail-val">{p.progress}%</span>
            </div>
          </div>
          <div className="cd-detail-actions">
            {p.status === "Under Review" && (
              <button className="cd-action-btn cd-action-btn--green">
                <CheckIcon /> Approve &amp; Release
              </button>
            )}
            {p.status !== "Completed" && (
              <button className="cd-action-btn cd-action-btn--outline">
                <MessageIcon /> Message Freelancer
              </button>
            )}
            {p.status !== "Completed" && (
              <button className="cd-action-btn cd-action-btn--red">
                <FlagIcon /> Raise Dispute
              </button>
            )}
            {p.status === "Completed" && (
              <button className="cd-action-btn cd-action-btn--outline">
                <StarIcon /> Leave Review
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Recent Activity ────────────────────────────────────────── */
const ACTIVITY = [
  { icon: <CheckIcon />,   cls: "cd-act--green",  text: "Omar Farooq submitted final delivery",    time: "2h ago"  },
  { icon: <VaultIcon />,   cls: "cd-act--blue",   text: "₹3,52,750 escrowed for E-commerce Web App",  time: "1d ago"  },
  { icon: <YieldIcon />,   cls: "cd-act--green",  text: "Yield of ₹1,527.20 credited to vault",       time: "2d ago"  },
  { icon: <AlertIcon />,   cls: "cd-act--yellow", text: "Milestone review pending: Frontend UI",   time: "3d ago"  },
  { icon: <PlusIcon />,    cls: "cd-act--blue",   text: "New contract started with Lena Koch",     time: "5d ago"  },
];

function RecentActivity() {
  return (
    <div className="cd-panel cd-activity-panel">
      <div className="cd-panel-head cd-panel-head--flush">
        <h2 className="cd-panel-title">Recent Activity</h2>
      </div>
      <ul className="cd-activity-list">
        {ACTIVITY.map((a, i) => (
          <li key={i} className="cd-activity-item">
            <div className={`cd-act-icon ${a.cls}`}>{a.icon}</div>
            <div className="cd-act-body">
              <p className="cd-act-text">{a.text}</p>
              <span className="cd-act-time">{a.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Escrow Breakdown ───────────────────────────────────────── */
function EscrowBreakdown({ projects }) {
  const total = 11750;
  const colors = ["var(--blue)", "var(--green)", "#a78bfa", "#f59e0b"];
  return (
    <div className="cd-panel cd-breakdown-panel">
      <div className="cd-panel-head cd-panel-head--flush">
        <h2 className="cd-panel-title">Escrow Breakdown</h2>
      </div>
      <div className="cd-breakdown-list">
        {projects.map((p, i) => {
          const val = parseInt(p.escrowed.replace(/[₹,]/g, ""));
          const pct = Math.round((val / total) * 100);
          return (
            <div key={p.id} className="cd-breakdown-row">
              <div className="cd-breakdown-meta">
                <span className="cd-breakdown-dot" style={{ background: colors[i] }} />
                <span className="cd-breakdown-name">{p.title}</span>
                <span className="cd-breakdown-pct">{pct}%</span>
              </div>
              <div className="cd-breakdown-track">
                <div
                  className="cd-breakdown-fill"
                  style={{ width: `${pct}%`, background: colors[i] }}
                />
              </div>
              <span className="cd-breakdown-val">{p.escrowed}</span>
            </div>
          );
        })}
      </div>
      <div className="cd-breakdown-total">
        <span>Total in Escrow</span>
        <strong>₹9,75,250</strong>
      </div>
    </div>
  );
}

/* ── New Project Modal ──────────────────────────────────────── */
function NewProjectModal({ onClose }) {
  const [step, setStep] = useState(1);
  return (
    <div className="cd-modal-overlay" onClick={onClose}>
      <div className="cd-modal" onClick={e => e.stopPropagation()}>
        <div className="cd-modal-head">
          <div>
            <h3 className="cd-modal-title">Create New Contract</h3>
            <p className="cd-modal-sub">Step {step} of 3 — {step === 1 ? "Project Details" : step === 2 ? "Escrow Setup" : "Confirm"}</p>
          </div>
          <button className="cd-icon-btn" onClick={onClose}><CloseIcon /></button>
        </div>

        <div className="cd-modal-steps">
          {[1,2,3].map(s => (
            <div key={s} className={`cd-step${step >= s ? " cd-step--done" : ""}`}>
              <div className="cd-step-dot">{step > s ? <CheckIcon /> : s}</div>
              <span>{s === 1 ? "Details" : s === 2 ? "Escrow" : "Confirm"}</span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="cd-modal-body">
            <div className="sr-field-group">
              <label className="sr-field-label">Project Title</label>
              <input className="sr-input" placeholder="e.g. Mobile App Redesign" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Freelancer Email</label>
              <input className="sr-input" placeholder="freelancer@example.com" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Project Description</label>
              <textarea className="sr-input cd-textarea" placeholder="Describe the scope of work..." />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Deadline</label>
              <input className="sr-input" type="date" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="cd-modal-body">
            <div className="sr-field-group">
              <label className="sr-field-label">Total Budget (INR)</label>
              <input className="sr-input" placeholder="₹0.00" />
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Initial Escrow Deposit</label>
              <input className="sr-input" placeholder="₹0.00" />
            </div>
            <div className="cd-yield-notice">
              <YieldIcon />
              <p>Locked funds earn yield while held in escrow — returned to you or released to freelancer at milestone completion.</p>
            </div>
            <div className="sr-field-group">
              <label className="sr-field-label">Milestone Name</label>
              <input className="sr-input" placeholder="e.g. Initial Wireframes" />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="cd-modal-body">
            <div className="cd-confirm-block">
              <div className="cd-confirm-row"><span>Project</span><strong>Mobile App Redesign</strong></div>
              <div className="cd-confirm-row"><span>Budget</span><strong>₹3,32,000</strong></div>
              <div className="cd-confirm-row"><span>Escrow Deposit</span><strong>₹1,66,000</strong></div>
              <div className="cd-confirm-row"><span>Milestone</span><strong>Initial Wireframes</strong></div>
            </div>
            <div className="cd-yield-notice">
              <ShieldIcon />
              <p>By creating this contract, funds will be locked in escrow and both parties are protected by TrustLock's dispute resolution policy.</p>
            </div>
          </div>
        )}

        <div className="cd-modal-foot">
          {step > 1 && (
            <button className="cd-action-btn cd-action-btn--outline" onClick={() => setStep(s => s - 1)}>
              Back
            </button>
          )}
          {step < 3
            ? <button className="sr-cta-btn" style={{width:"auto",padding:"0 28px"}} onClick={() => setStep(s => s + 1)}>Continue</button>
            : <button className="sr-cta-btn" style={{width:"auto",padding:"0 28px"}} onClick={onClose}><CheckIcon /> Create Contract</button>
          }
        </div>
      </div>
    </div>
  );
}

/* ── SVG Icons ──────────────────────────────────────────────── */
function ShieldIcon()    { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>; }
function GridIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>; }
function BriefcaseIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>; }
function VaultIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v-2M12 17v-2M9 12H7M17 12h-2"/></svg>; }
function ActivityIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>; }
function MessageIcon()   { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>; }
function SettingsIcon()  { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }
function YieldIcon()     { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>; }
function PlusIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>; }
function BellIcon()      { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>; }
function DotsIcon()      { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>; }
function ChevronIcon()   { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>; }
function CheckIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>; }
function FlagIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>; }
function StarIcon()      { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>; }
function TrendUpIcon()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>; }
function ClockIcon()     { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>; }
function AlertIcon()     { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><triangle points="10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>; }
function CloseIcon()     { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>; }
