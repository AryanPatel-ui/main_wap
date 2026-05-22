import { useState } from "react";

/* ── Inline styles extending the CSS design system ── */
const G = {
  bg: "#0F1115",
  surface: "#171A21",
  surface2: "#1D2029",
  border: "#262B36",
  borderSubtle: "rgba(38,43,54,0.6)",
  text1: "#F5F7FA",
  text2: "#9AA4B2",
  text3: "rgba(154,164,178,0.5)",
  blue: "#5B8CFF",
  blueGlow: "rgba(91,140,255,0.15)",
  blueBorder: "rgba(91,140,255,0.25)",
  green: "#4FAF8F",
  greenGlow: "rgba(79,175,143,0.15)",
  greenBorder: "rgba(79,175,143,0.25)",
  amber: "#F5A623",
  amberGlow: "rgba(245,166,35,0.15)",
  amberBorder: "rgba(245,166,35,0.25)",
  red: "#FF6B6B",
  redGlow: "rgba(255,107,107,0.15)",
  redBorder: "rgba(255,107,107,0.25)",
};

const font = { sora: "'Sora', sans-serif", dm: "'DM Sans', sans-serif" };

/* ── SVG Icons ── */
const Icon = {
  shield: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  briefcase: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  dollar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  check: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  upload: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  ),
  trending: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
  bell: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  search: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  ),
  award: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  zap: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  arrow: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  eye: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  wallet: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
      <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4z" />
    </svg>
  ),
  user: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  lock: (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  dots: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="5" r="1"/>
      <circle cx="12" cy="12" r="1"/>
      <circle cx="12" cy="19" r="1"/>
    </svg>
  ),
};

/* ── Data ── */
const MY_WORK_PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Redesign",
    client: "Nexus Digital",
    escrow: "₹3,48,600",
    due: "Jun 12",
    progress: 72,
    milestone: "UI Prototype",
    status: "active",
    yield: "+₹1,527.20",
  },
  {
    id: 2,
    title: "Mobile App MVP",
    client: "Startup Labs",
    escrow: "₹7,05,500",
    due: "Jun 28",
    progress: 38,
    milestone: "Backend API",
    status: "active",
    yield: "+₹3,087.60",
  },
  {
    id: 3,
    title: "Brand Identity Kit",
    client: "Bloom Co.",
    escrow: "₹1,49,400",
    due: "May 30",
    progress: 90,
    milestone: "Final Delivery",
    status: "review",
    yield: "+₹655.70",
  },
  {
    id: 4,
    title: "SaaS Landing Page",
    client: "Orbit Stack",
    escrow: "₹2,07,500",
    due: "Apr 18",
    progress: 100,
    milestone: "Project Completed",
    status: "completed",
    yield: "+₹1,120.00",
  },
];

const EXPLORE_PROJECTS = [
  {
    id: 101,
    title: "Fintech Mobile App UI",
    client: "RupeeFlow",
    budget: "₹4,80,000",
    duration: "6 weeks",
    skills: "Figma · Design System · Mobile UI",
  },
  {
    id: 102,
    title: "React Admin Dashboard",
    client: "CloudMint",
    budget: "₹3,20,000",
    duration: "4 weeks",
    skills: "React · Charts · API Integration",
  },
  {
    id: 103,
    title: "Brand Identity Package",
    client: "Studio Bloom",
    budget: "₹1,75,000",
    duration: "3 weeks",
    skills: "Logo · Typography · Brand Guide",
  },
  {
    id: 104,
    title: "E-commerce Checkout Revamp",
    client: "CartNest",
    budget: "₹2,90,000",
    duration: "5 weeks",
    skills: "UX Audit · Prototyping · Conversion",
  },
];

const MILESTONES = [
  { label: "Submit UI Prototype", project: "E-Commerce Redesign", due: "Jun 5", done: false, pct: 35 },
  { label: "API Integration", project: "Mobile App MVP", due: "Jun 8", done: false, pct: 20 },
  { label: "Final Brand Kit", project: "Brand Identity Kit", due: "May 30", done: false, pct: 90 },
  { label: "Wireframes Approved", project: "E-Commerce Redesign", due: "May 22", done: true, pct: 100 },
];

const NAV = [
  { icon: Icon.search, label: "Explore", id: "explore" },
  { icon: Icon.briefcase, label: "My Work", id: "mywork" },
  { icon: Icon.dollar, label: "Earnings" },
  { icon: Icon.shield, label: "Escrow" },
  { icon: Icon.award, label: "Profile" },
];

/* ── Sub-components ── */

function Badge({ color, children }) {
  const colors = {
    blue: { bg: G.blueGlow, c: G.blue, border: G.blueBorder },
    green: { bg: G.greenGlow, c: G.green, border: G.greenBorder },
    amber: { bg: G.amberGlow, c: G.amber, border: G.amberBorder },
    red: { bg: G.redGlow, c: G.red, border: G.redBorder },
  };
  const s = colors[color] || colors.blue;
  return (
    <span style={{
      fontSize: 10,
      fontWeight: 600,
      padding: "3px 9px",
      borderRadius: 100,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      background: s.bg,
      color: s.c,
      border: `1px solid ${s.border}`,
      whiteSpace: "nowrap",
    }}>
      {children}
    </span>
  );
}

function ProgressBar({ value, color = G.blue }) {
  return (
    <div style={{
      width: "100%",
      height: 4,
      borderRadius: 99,
      background: "rgba(38,43,54,0.9)",
      overflow: "hidden",
    }}>
      <div style={{
        width: `${value}%`,
        height: "100%",
        borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        transition: "width 0.6s ease",
        boxShadow: `0 0 8px ${color}55`,
      }} />
    </div>
  );
}

function StatCard({ icon, label, value, sub, color = "blue", delay = 0 }) {
  const [hov, setHov] = useState(false);
  const c = color === "green" ? G.green : color === "amber" ? G.amber : G.blue;
  const bg = color === "green" ? G.greenGlow : color === "amber" ? G.amberGlow : G.blueGlow;
  const bd = color === "green" ? G.greenBorder : color === "amber" ? G.amberBorder : G.blueBorder;
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? bd : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov
          ? `0 8px 32px rgba(0,0,0,0.45), 0 0 20px ${bg}`
          : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8,
          background: bg, color: c, border: `1px solid ${bd}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: 11, fontWeight: 500, color: G.text2,
          letterSpacing: "0.05em", textTransform: "uppercase",
        }}>{label}</span>
      </div>
      <div>
        <div style={{
          fontFamily: font.sora, fontSize: 26, fontWeight: 700,
          color: G.text1, letterSpacing: "-0.03em", lineHeight: 1.1,
        }}>{value}</div>
        <div style={{ fontSize: 12, color: G.text2, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  );
}

function ProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);
  const [submitHov, setSubmitHov] = useState(false);
  const statusColor = p.status === "review" ? "amber" : p.status === "completed" ? "green" : "blue";
  const statusLabel = p.status === "review" ? "In Review" : p.status === "completed" ? "Completed" : "Ongoing";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? G.blueBorder : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov
          ? "0 12px 40px rgba(0,0,0,0.5), 0 0 24px rgba(91,140,255,0.1)"
          : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{
            fontFamily: font.sora, fontSize: 15, fontWeight: 600,
            color: G.text1, letterSpacing: "-0.02em", marginBottom: 3,
          }}>{p.title}</div>
          <div style={{ fontSize: 12, color: G.text2 }}>
            <span style={{ color: G.text3 }}>Client: </span>{p.client}
          </div>
        </div>
        <Badge color={statusColor}>{statusLabel}</Badge>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11.5, color: G.text2, fontWeight: 500 }}>
            {Icon.clock}&nbsp;{p.milestone}
          </span>
          <span style={{ fontFamily: font.sora, fontSize: 12, fontWeight: 700, color: G.text1 }}>
            {p.progress}%
          </span>
        </div>
        <ProgressBar value={p.progress} color={p.status === "review" ? G.amber : p.status === "completed" ? G.green : G.blue} />
      </div>

      {/* Escrow row */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: G.surface2, borderRadius: 10, padding: "11px 14px",
        border: `1px solid ${G.border}`,
      }}>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            Escrow Locked
          </div>
          <div style={{ fontFamily: font.sora, fontSize: 16, fontWeight: 700, color: G.text1 }}>
            {p.escrow}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
            Yield Earned
          </div>
          <div style={{ fontFamily: font.sora, fontSize: 14, fontWeight: 700, color: G.green }}>
            {p.yield}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span style={{ fontSize: 11.5, color: G.text2 }}>
          <span style={{ color: G.text3 }}>Due: </span>{p.due}
        </span>
        {p.status !== "completed" && <button
          onMouseEnter={() => setSubmitHov(true)}
          onMouseLeave={() => setSubmitHov(false)}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            background: submitHov ? G.blue : "transparent",
            border: `1px solid ${submitHov ? G.blue : G.blueBorder}`,
            color: submitHov ? "#fff" : G.blue,
            fontSize: 12, fontWeight: 600,
            fontFamily: font.dm,
            transition: "all 0.22s ease",
            cursor: "pointer",
          }}
        >
          {Icon.upload} Submit Work
        </button>}
      </div>
    </div>
  );
}

function ExploreProjectCard({ p, delay }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: G.surface,
        border: `1px solid ${hov ? G.blueBorder : G.border}`,
        borderRadius: 16,
        padding: "20px 22px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
        transition: "border-color 0.22s ease, box-shadow 0.22s ease",
        boxShadow: hov ? "0 12px 40px rgba(0,0,0,0.5)" : "0 4px 16px rgba(0,0,0,0.3)",
        animation: `fadeSlideUp 0.65s ${delay}s ease both`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontFamily: font.sora, fontSize: 15, fontWeight: 600, marginBottom: 3 }}>
            {p.title}
          </div>
          <div style={{ fontSize: 12, color: G.text2 }}>
            <span style={{ color: G.text3 }}>Client: </span>{p.client}
          </div>
        </div>
        <Badge color="green">Open</Badge>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 12,
        background: G.surface2,
        border: `1px solid ${G.border}`,
        borderRadius: 10,
        padding: "12px 14px",
      }}>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", marginBottom: 3 }}>Budget</div>
          <div style={{ fontFamily: font.sora, fontWeight: 700 }}>{p.budget}</div>
        </div>
        <div>
          <div style={{ fontSize: 10.5, color: G.text3, textTransform: "uppercase", marginBottom: 3 }}>Duration</div>
          <div style={{ fontFamily: font.sora, fontWeight: 700 }}>{p.duration}</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: G.text2 }}>{p.skills}</div>

      <button style={{
        alignSelf: "flex-start",
        padding: "8px 14px",
        borderRadius: 8,
        border: `1px solid ${G.blueBorder}`,
        color: G.blue,
        fontSize: 12,
        fontWeight: 600,
      }}>
        Apply Now
      </button>
    </div>
  );
}

function MilestoneRow({ m, idx }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 14,
        padding: "12px 14px",
        borderRadius: 10,
        background: hov ? "rgba(91,140,255,0.04)" : "transparent",
        border: `1px solid ${hov ? G.blueBorder : "transparent"}`,
        transition: "all 0.22s ease",
        animation: `fadeSlideUp 0.6s ${0.4 + idx * 0.08}s ease both`,
      }}
    >
      <div style={{
        width: 22, height: 22, borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        background: m.done ? G.greenGlow : G.blueGlow,
        border: `1.5px solid ${m.done ? G.greenBorder : G.blueBorder}`,
        color: m.done ? G.green : G.blue,
      }}>
        {m.done ? Icon.check : <span style={{ fontSize: 9, fontWeight: 700 }}>{m.pct}%</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: m.done ? G.text2 : G.text1,
          textDecoration: m.done ? "line-through" : "none",
          whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
        }}>{m.label}</div>
        <div style={{ fontSize: 11, color: G.text3, marginTop: 1 }}>{m.project}</div>
      </div>
      <div style={{ fontSize: 11, color: G.text2, whiteSpace: "nowrap" }}>
        {m.done ? <Badge color="green">Done</Badge> : <span style={{ color: G.amber }}>{m.due}</span>}
      </div>
    </div>
  );
}

/* ── Main Dashboard ── */
export default function FreelancerDashboard({ name = "Freelancer", onSignOut }) {
  const [activeNav, setActiveNav] = useState("mywork");
  const [notifHov, setNotifHov] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const firstName = name.trim().split(/\s+/)[0] || "Freelancer";
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase())
    .join("") || "F";
  const normalizedSearch = searchVal.trim().toLowerCase();
  const filteredExploreProjects = EXPLORE_PROJECTS.filter((p) =>
    [p.title, p.client, p.skills].some((value) => value.toLowerCase().includes(normalizedSearch))
  );
  const filteredMyWorkProjects = MY_WORK_PROJECTS.filter((p) =>
    [p.title, p.client, p.milestone, p.status].some((value) => value.toLowerCase().includes(normalizedSearch))
  );

  return (
    <>
      <div style={{
        display: "flex", minHeight: "100vh", fontFamily: font.dm,
        background: G.bg, color: G.text1,
      }}>
        {/* ── Sidebar ── */}
        <aside className="fd-sidebar" style={{
          width: 240, flexShrink: 0,
          display: "flex", flexDirection: "column",
          background: G.surface, borderRight: `1px solid ${G.border}`,
          padding: "28px 16px", gap: 6,
          position: "sticky", top: 0, height: "100vh",
          animation: "fadeSlideUp 0.6s ease both",
        }}>
          {/* Brand */}
          <div style={{
            display: "flex", alignItems: "center", gap: 9,
            marginBottom: 32, paddingLeft: 8,
          }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: G.blueGlow, border: `1px solid ${G.blueBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center", color: G.blue,
            }}>
              {Icon.shield}
            </div>
            <span style={{
              fontFamily: font.sora, fontSize: 16, fontWeight: 700,
              letterSpacing: "-0.025em", color: G.text1,
            }}>
              Trust<span style={{ color: G.blue }}>.</span>work
            </span>
          </div>

          {/* User pill was here */}

          {/* Nav */}
          {NAV.map((n) => (
            <button
              key={n.label}
              className="nav-item"
              onClick={() => n.id && setActiveNav(n.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 10, border: "none",
                background: activeNav === n.id ? G.blueGlow : "transparent",
                color: activeNav === n.id ? G.blue : G.text2,
                fontFamily: font.dm, fontSize: 13.5, fontWeight: activeNav === n.id ? 600 : 400,
                cursor: "pointer", textAlign: "left",
                borderLeft: activeNav === n.id ? `2px solid ${G.blue}` : "2px solid transparent",
              }}
            >
              {n.icon} {n.label}
            </button>
          ))}

          {/* Bottom escrow health */}
          <div style={{ marginTop: "auto" }}>
            <div style={{
              background: G.surface2, borderRadius: 12, padding: "14px",
              border: `1px solid ${G.border}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G.green, boxShadow: `0 0 8px ${G.green}`, animation: "pulse 2.2s ease-in-out infinite" }} />
                <span style={{ fontSize: 10.5, color: G.text2, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 500 }}>
                  Escrow Health
                </span>
              </div>
              <div style={{ fontFamily: font.sora, fontSize: 18, fontWeight: 700, color: G.green, marginBottom: 4 }}>
                98.4%
              </div>
              <div style={{ fontSize: 11, color: G.text3, lineHeight: 1.5 }}>
                All funds secured & yielding
              </div>
            </div>

            {/* User pill */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              background: G.surface2, borderRadius: 10, padding: "10px 12px",
              border: `1px solid ${G.border}`, marginTop: 16, position: 'relative'
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: `linear-gradient(135deg, ${G.blue}, #93B4FF)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0,
              }}>{initials}</div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 600, color: G.text1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {name}
                </div>
                <div style={{ fontSize: 10.5, color: G.text3 }}>Freelancer</div>
              </div>
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', color: G.text2 }}
              >
                {Icon.dots}
              </button>
              
              {showUserMenu && (
                <div style={{
                  position: 'absolute', bottom: '100%', right: 0, marginBottom: 8,
                  background: G.surface, border: `1px solid ${G.border}`, borderRadius: 8,
                  padding: 4, width: 140, boxShadow: '0 4px 12px rgba(0,0,0,0.2)', zIndex: 10
                }}>
                  <button
                    onClick={onSignOut}
                    style={{
                      width: '100%', padding: '8px 12px', textAlign: 'left', background: 'transparent',
                      border: 'none', color: G.red, fontSize: 13, cursor: 'pointer', borderRadius: 6
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = G.redGlow}
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
        <main style={{
          flex: 1, overflowY: "auto", position: "relative",
          background: G.bg,
        }}>
          {/* Ambient orbs */}
          <div className="orb-1" />
          <div className="orb-2" />
          <div className="grid-bg" />

          <div className="fd-content">

            {/* Top bar */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: 32, animation: "fadeSlideUp 0.6s ease both",
            }}>
              <div>
                <div style={{ fontFamily: font.sora, fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em", color: G.text1 }}>
                  Good morning, {firstName} 👋
                </div>
                <div style={{ fontSize: 13, color: G.text2, marginTop: 3 }}>
                  3 active projects · Escrow earning yield
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                {/* Search */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: G.surface, border: `1px solid ${G.border}`,
                  borderRadius: 8, padding: "8px 14px", height: 38,
                }}>
                  <span style={{ color: G.text3 }}>{Icon.search}</span>
                  <input
                    value={searchVal}
                    onChange={e => setSearchVal(e.target.value)}
                  placeholder={activeNav === "explore" ? "Search available projects…" : "Search my work…"}
                    style={{
                      background: "none", border: "none", outline: "none",
                      color: G.text1, fontFamily: font.dm, fontSize: 13,
                      width: 140,
                    }}
                  />
                </div>
                {/* Notification */}
                <button
                  onMouseEnter={() => setNotifHov(true)}
                  onMouseLeave={() => setNotifHov(false)}
                  style={{
                    width: 38, height: 38, borderRadius: 8, display: "flex",
                    alignItems: "center", justifyContent: "center",
                    background: notifHov ? G.blueGlow : G.surface,
                    border: `1px solid ${notifHov ? G.blueBorder : G.border}`,
                    color: notifHov ? G.blue : G.text2,
                    cursor: "pointer", position: "relative",
                    transition: "all 0.22s ease",
                  }}
                >
                  {Icon.bell}
                  <div style={{
                    position: "absolute", top: 7, right: 7,
                    width: 7, height: 7, borderRadius: "50%",
                    background: G.red, border: `1.5px solid ${G.bg}`,
                  }} />
                </button>
              </div>
            </div>

            {/* Stat Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16, marginBottom: 36,
            }}>
              <StatCard icon={Icon.wallet} label="Total Escrow" value="₹12,03,500" sub="Across 3 projects" color="blue" delay={0.05} />
              <StatCard icon={Icon.trending} label="Yield Earned" value="₹5,270.50" sub="This month · DeFi optimized" color="green" delay={0.12} />
              <StatCard icon={Icon.briefcase} label="Active Jobs" value="3" sub="2 ongoing · 1 in review" color="blue" delay={0.19} />
              <StatCard icon={Icon.award} label="Reputation" value="4.92★" sub="47 completed contracts" color="amber" delay={0.26} />
            </div>

            {/* Trust Banner */}
            <div style={{
              background: `linear-gradient(135deg, rgba(91,140,255,0.07) 0%, rgba(79,175,143,0.07) 100%)`,
              border: `1px solid ${G.blueBorder}`,
              borderRadius: 14, padding: "16px 22px",
              display: "flex", alignItems: "center", gap: 16,
              marginBottom: 36,
              animation: "fadeSlideUp 0.65s 0.3s ease both",
            }}>
              <div style={{ color: G.blue, flexShrink: 0 }}>{Icon.zap}</div>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: G.text1 }}>
                  Your escrow is working for you.&nbsp;
                </span>
                <span style={{ fontSize: 13, color: G.text2 }}>
                  ₹12,03,500 locked across your contracts is earning <span style={{ color: G.green, fontWeight: 600 }}>+5.2% APY</span> in yield — fully accessible upon milestone approval.
                </span>
              </div>
              <div style={{ marginLeft: "auto", flexShrink: 0, color: G.blue, display: "flex", alignItems: "center", gap: 4, fontSize: 12, fontWeight: 500 }}>
                Learn more {Icon.arrow}
              </div>
            </div>

            {/* Projects + Milestones grid */}
            <div className="fd-main-grid">
              {/* Projects */}
              <div>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  marginBottom: 16, animation: "fadeSlideUp 0.65s 0.35s ease both",
                }}>
                  <h2 style={{
                    fontFamily: font.sora, fontSize: 16, fontWeight: 700,
                    letterSpacing: "-0.025em", color: G.text1,
                  }}>{activeNav === "explore" ? "Explore Projects" : "My Work"}</h2>
                  <button style={{
                    fontSize: 12, color: G.blue, background: "none", border: "none",
                    fontFamily: font.dm, cursor: "pointer", display: "flex",
                    alignItems: "center", gap: 4, fontWeight: 500,
                  }}>
                    {activeNav === "explore" ? `${filteredExploreProjects.length} available` : `${filteredMyWorkProjects.length} projects`} {Icon.arrow}
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {activeNav === "explore"
                    ? filteredExploreProjects.map((p, i) => (
                        <ExploreProjectCard key={p.id} p={p} delay={0.4 + i * 0.1} />
                      ))
                    : filteredMyWorkProjects.map((p, i) => (
                        <ProjectCard key={p.id} p={p} delay={0.4 + i * 0.1} />
                      ))}
                </div>
              </div>

              {/* Milestones + Payout preview */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* Milestones */}
                <div style={{
                  background: G.surface, borderRadius: 16, padding: "20px",
                  border: `1px solid ${G.border}`,
                  animation: "fadeSlideUp 0.65s 0.4s ease both",
                }}>
                  <div style={{
                    fontFamily: font.sora, fontSize: 14.5, fontWeight: 700,
                    letterSpacing: "-0.02em", color: G.text1, marginBottom: 14,
                  }}>Upcoming Milestones</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {MILESTONES.map((m, i) => (
                      <MilestoneRow key={i} m={m} idx={i} />
                    ))}
                  </div>
                </div>

                {/* Payout card */}
                <div style={{
                  background: G.surface, borderRadius: 16, padding: "20px",
                  border: `1px solid ${G.greenBorder}`,
                  animation: "fadeSlideUp 0.65s 0.5s ease both",
                  boxShadow: `0 0 28px rgba(79,175,143,0.08)`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 6,
                      background: G.greenGlow, border: `1px solid ${G.greenBorder}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: G.green,
                    }}>
                      {Icon.dollar}
                    </div>
                    <span style={{ fontFamily: font.sora, fontSize: 14, fontWeight: 700, color: G.text1 }}>
                      Next Payout
                    </span>
                  </div>

                  <div style={{ fontFamily: font.sora, fontSize: 28, fontWeight: 800, color: G.green, letterSpacing: "-0.035em", marginBottom: 4 }}>
                    ₹1,49,400
                  </div>
                  <div style={{ fontSize: 12, color: G.text2, marginBottom: 16 }}>
                    Brand Identity Kit · Final delivery
                  </div>

                  <ProgressBar value={90} color={G.green} />
                  <div style={{ fontSize: 11, color: G.text3, marginTop: 6 }}>
                    90% complete · Est. release May 30
                  </div>

                  <div style={{
                    marginTop: 16, padding: "10px 12px",
                    background: G.surface2, borderRadius: 8, border: `1px solid ${G.border}`,
                    display: "flex", alignItems: "center", gap: 6,
                  }}>
                    <span style={{ color: G.green, flexShrink: 0 }}>{Icon.lock}</span>
                    <span style={{ fontSize: 11, color: G.text2 }}>
                      Funds held in non-custodial escrow · auto-released on approval
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer note */}
            <div style={{
              marginTop: 40, paddingTop: 20, borderTop: `1px solid ${G.border}`,
              display: "flex", alignItems: "center", gap: 7,
              fontSize: 11, color: "rgba(154,164,178,0.4)", letterSpacing: "0.01em",
            }}>
              {Icon.lock}
              Funds secured via non-custodial smart contracts · 256-bit encrypted · Audited by ChainSec
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
