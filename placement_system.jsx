import { useState, useEffect, useRef } from "react";

// ─── Icons (inline SVG components) ─────────────────────────────────────────
const Icon = ({ name, size = 18, className = "" }) => {
  const icons = {
    dashboard: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>,
    drives: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>,
    applications: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>,
    resume: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>,
    ai: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>,
    interview: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>,
    analytics: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>,
    profile: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>,
    arrow: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>,
    star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>,
    send: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>,
    spark: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>,
    menu: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>,
    close: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>,
    briefcase: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
    location: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>,
    trending: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>,
    code: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/>,
    target: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>,
    robot: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {icons[name] || icons.dashboard}
    </svg>
  );
};

// ─── Color & Design System ─────────────────────────────────────────────────
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg-base: #070B14;
    --bg-surface: #0D1525;
    --bg-card: rgba(255,255,255,0.04);
    --bg-card-hover: rgba(255,255,255,0.07);
    --bg-glass: rgba(13, 21, 37, 0.7);
    --border: rgba(255,255,255,0.08);
    --border-accent: rgba(99,102,241,0.4);
    --text-primary: #F1F5FF;
    --text-secondary: #8892A4;
    --text-muted: #4A5568;
    --blue: #3B82F6;
    --indigo: #6366F1;
    --purple: #A855F7;
    --cyan: #22D3EE;
    --green: #10B981;
    --orange: #F59E0B;
    --red: #EF4444;
    --pink: #EC4899;
    --grad-primary: linear-gradient(135deg, #3B82F6 0%, #6366F1 50%, #A855F7 100%);
    --grad-card: linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(168,85,247,0.08) 100%);
    --grad-success: linear-gradient(135deg, #10B981, #059669);
    --grad-orange: linear-gradient(135deg, #F59E0B, #D97706);
    --shadow-glow: 0 0 40px rgba(99,102,241,0.15);
    --shadow-card: 0 4px 24px rgba(0,0,0,0.3);
    --radius-sm: 8px;
    --radius: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --sidebar-w: 240px;
    --font: 'Inter', sans-serif;
    --mono: 'JetBrains Mono', monospace;
    --transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  body { font-family: var(--font); background: var(--bg-base); color: var(--text-primary); min-height: 100vh; overflow-x: hidden; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 99px; }

  /* Layout */
  .app { display: flex; min-height: 100vh; }
  .main { flex: 1; margin-left: var(--sidebar-w); display: flex; flex-direction: column; min-height: 100vh; }
  .content { flex: 1; padding: 24px 28px; overflow-y: auto; }

  /* Sidebar */
  .sidebar {
    width: var(--sidebar-w); height: 100vh; position: fixed; left: 0; top: 0; z-index: 100;
    background: var(--bg-surface); border-right: 1px solid var(--border);
    display: flex; flex-direction: column; padding: 20px 12px;
    backdrop-filter: blur(20px);
  }
  .sidebar-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 4px 8px 20px; margin-bottom: 8px; border-bottom: 1px solid var(--border);
  }
  .logo-icon {
    width: 34px; height: 34px; border-radius: 10px;
    background: var(--grad-primary); display: flex; align-items: center; justify-content: center;
    font-size: 16px; font-weight: 800; color: white; flex-shrink: 0;
    box-shadow: 0 4px 14px rgba(99,102,241,0.4);
  }
  .logo-text { font-size: 14px; font-weight: 700; color: var(--text-primary); line-height: 1.2; }
  .logo-sub { font-size: 10px; color: var(--text-secondary); font-weight: 400; }
  .nav-section { margin-bottom: 4px; }
  .nav-label { font-size: 10px; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.08em; padding: 8px 8px 4px; }
  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 10px; border-radius: var(--radius-sm); cursor: pointer;
    transition: var(--transition); position: relative; margin-bottom: 2px;
    color: var(--text-secondary); font-size: 13.5px; font-weight: 500;
    border: 1px solid transparent;
  }
  .nav-item:hover { background: var(--bg-card-hover); color: var(--text-primary); }
  .nav-item.active {
    background: var(--grad-card); color: var(--indigo);
    border-color: var(--border-accent);
    box-shadow: 0 2px 12px rgba(99,102,241,0.12);
  }
  .nav-item.active svg { color: var(--indigo); }
  .nav-badge {
    margin-left: auto; background: var(--indigo); color: white;
    font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 99px;
  }
  .nav-badge.red { background: var(--red); }
  .sidebar-bottom { margin-top: auto; padding-top: 12px; border-top: 1px solid var(--border); }
  .user-card {
    display: flex; align-items: center; gap: 10px; padding: 10px 8px; border-radius: var(--radius-sm);
    cursor: pointer; transition: var(--transition);
  }
  .user-card:hover { background: var(--bg-card-hover); }
  .avatar {
    width: 34px; height: 34px; border-radius: 50%; background: var(--grad-primary);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: white; flex-shrink: 0;
    box-shadow: 0 0 0 2px rgba(99,102,241,0.3);
  }
  .avatar.sm { width: 28px; height: 28px; font-size: 11px; }
  .avatar.lg { width: 56px; height: 56px; font-size: 20px; }
  .user-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
  .user-role { font-size: 11px; color: var(--text-secondary); }

  /* Topbar */
  .topbar {
    height: 60px; border-bottom: 1px solid var(--border); display: flex; align-items: center;
    padding: 0 28px; gap: 16px; position: sticky; top: 0; z-index: 50;
    background: rgba(7, 11, 20, 0.8); backdrop-filter: blur(20px);
  }
  .topbar-title { font-size: 16px; font-weight: 700; color: var(--text-primary); }
  .topbar-subtitle { font-size: 13px; color: var(--text-secondary); margin-left: 4px; }
  .topbar-right { margin-left: auto; display: flex; align-items: center; gap: 12px; }
  .icon-btn {
    width: 36px; height: 36px; border-radius: var(--radius-sm);
    background: var(--bg-card); border: 1px solid var(--border);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: var(--transition); color: var(--text-secondary);
  }
  .icon-btn:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--border-accent); }
  .search-bar {
    display: flex; align-items: center; gap: 8px;
    background: var(--bg-card); border: 1px solid var(--border);
    border-radius: var(--radius-sm); padding: 7px 12px; transition: var(--transition);
  }
  .search-bar:focus-within { border-color: var(--border-accent); }
  .search-bar input { background: none; border: none; outline: none; color: var(--text-primary); font-size: 13px; width: 180px; font-family: var(--font); }
  .search-bar input::placeholder { color: var(--text-muted); }

  /* Cards */
  .card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
    padding: 20px; transition: var(--transition); position: relative; overflow: hidden;
  }
  .card:hover { border-color: rgba(255,255,255,0.12); background: var(--bg-card-hover); box-shadow: var(--shadow-card); }
  .card-glow { box-shadow: var(--shadow-glow); border-color: var(--border-accent); }
  .card-accent { background: var(--grad-card); border-color: var(--border-accent); }

  /* Stats Grid */
  .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }
  .stat-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
    padding: 20px; transition: var(--transition); position: relative; overflow: hidden;
  }
  .stat-card:hover { border-color: var(--border-accent); transform: translateY(-2px); box-shadow: var(--shadow-card); }
  .stat-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: var(--grad-primary); opacity: 0; transition: var(--transition);
  }
  .stat-card:hover::before { opacity: 1; }
  .stat-icon { width: 40px; height: 40px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 14px; }
  .stat-value { font-size: 28px; font-weight: 800; color: var(--text-primary); line-height: 1; margin-bottom: 4px; }
  .stat-label { font-size: 12px; color: var(--text-secondary); font-weight: 500; }
  .stat-change { font-size: 11px; font-weight: 600; margin-top: 8px; display: flex; align-items: center; gap: 4px; }
  .stat-change.up { color: var(--green); }
  .stat-change.down { color: var(--red); }

  /* Grid Layouts */
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .grid-2-1 { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; }
  .grid-1-2 { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; }
  .mb-20 { margin-bottom: 20px; }
  .mb-24 { margin-bottom: 24px; }

  /* Section headers */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-size: 15px; font-weight: 700; color: var(--text-primary); }
  .section-sub { font-size: 12px; color: var(--text-secondary); margin-top: 2px; }
  .see-all { font-size: 12px; color: var(--indigo); cursor: pointer; font-weight: 500; transition: var(--transition); }
  .see-all:hover { color: var(--purple); }

  /* Buttons */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 600;
    cursor: pointer; transition: var(--transition); border: none; font-family: var(--font);
    white-space: nowrap;
  }
  .btn-primary {
    background: var(--grad-primary); color: white;
    box-shadow: 0 4px 14px rgba(99,102,241,0.35);
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.45); }
  .btn-ghost { background: var(--bg-card); color: var(--text-secondary); border: 1px solid var(--border); }
  .btn-ghost:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--border-accent); }
  .btn-sm { padding: 6px 12px; font-size: 12px; }
  .btn-danger { background: rgba(239,68,68,0.15); color: var(--red); border: 1px solid rgba(239,68,68,0.3); }

  /* Tags / Badges */
  .tag {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 99px; font-size: 11px; font-weight: 600;
  }
  .tag-blue { background: rgba(59,130,246,0.15); color: var(--blue); border: 1px solid rgba(59,130,246,0.25); }
  .tag-green { background: rgba(16,185,129,0.15); color: var(--green); border: 1px solid rgba(16,185,129,0.25); }
  .tag-orange { background: rgba(245,158,11,0.15); color: var(--orange); border: 1px solid rgba(245,158,11,0.25); }
  .tag-purple { background: rgba(168,85,247,0.15); color: var(--purple); border: 1px solid rgba(168,85,247,0.25); }
  .tag-red { background: rgba(239,68,68,0.15); color: var(--red); border: 1px solid rgba(239,68,68,0.3); }
  .tag-indigo { background: rgba(99,102,241,0.15); color: var(--indigo); border: 1px solid rgba(99,102,241,0.25); }
  .tag-cyan { background: rgba(34,211,238,0.15); color: var(--cyan); border: 1px solid rgba(34,211,238,0.25); }

  /* Progress bar */
  .progress-wrap { background: rgba(255,255,255,0.06); border-radius: 99px; overflow: hidden; }
  .progress-bar { height: 6px; border-radius: 99px; transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1); }
  .progress-bar.primary { background: var(--grad-primary); }
  .progress-bar.green { background: var(--grad-success); }
  .progress-bar.orange { background: var(--grad-orange); }

  /* Hero section */
  .hero {
    border-radius: var(--radius-xl); padding: 28px 32px; margin-bottom: 24px;
    background: linear-gradient(135deg, #0f1f4e 0%, #1a0a3d 50%, #0d2137 100%);
    border: 1px solid rgba(99,102,241,0.2); position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; top: -50%; right: -10%;
    width: 400px; height: 400px; border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero::after {
    content: ''; position: absolute; bottom: -30%; left: 20%;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-greeting { font-size: 13px; color: rgba(165,180,252,0.8); font-weight: 500; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
  .hero-name { font-size: 26px; font-weight: 800; color: white; margin-bottom: 10px; line-height: 1.2; }
  .hero-sub { font-size: 13.5px; color: rgba(165,180,252,0.7); max-width: 400px; line-height: 1.6; }
  .hero-stats { display: flex; gap: 24px; margin-top: 24px; }
  .hero-stat { display: flex; flex-direction: column; }
  .hero-stat-val { font-size: 22px; font-weight: 800; color: white; }
  .hero-stat-label { font-size: 11px; color: rgba(165,180,252,0.6); margin-top: 2px; }
  .hero-divider { width: 1px; background: rgba(165,180,252,0.15); }

  /* Company cards */
  .company-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);
    padding: 20px; transition: var(--transition); cursor: pointer; position: relative; overflow: hidden;
  }
  .company-card:hover { border-color: var(--border-accent); transform: translateY(-3px); box-shadow: var(--shadow-card), var(--shadow-glow); }
  .company-logo {
    width: 48px; height: 48px; border-radius: 12px; background: white;
    display: flex; align-items: center; justify-content: center; font-size: 20px;
    margin-bottom: 14px; box-shadow: 0 4px 14px rgba(0,0,0,0.2);
  }
  .company-name { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 4px; }
  .company-role { font-size: 13px; color: var(--text-secondary); margin-bottom: 12px; }
  .company-package { font-size: 20px; font-weight: 800; background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .match-pill {
    position: absolute; top: 16px; right: 16px;
    background: rgba(16,185,129,0.15); color: var(--green);
    border: 1px solid rgba(16,185,129,0.3); border-radius: 99px;
    font-size: 11px; font-weight: 700; padding: 3px 10px;
  }

  /* Timeline */
  .timeline-item { display: flex; gap: 14px; margin-bottom: 16px; }
  .timeline-dot {
    width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 5px;
    position: relative;
  }
  .timeline-dot::before {
    content: ''; position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
    width: 1px; height: calc(100% + 12px); background: var(--border);
  }
  .timeline-item:last-child .timeline-dot::before { display: none; }
  .timeline-text { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
  .timeline-time { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
  .timeline-title { font-size: 13.5px; font-weight: 600; color: var(--text-primary); }

  /* Application status */
  .status-flow { display: flex; align-items: center; gap: 4px; overflow-x: auto; padding-bottom: 4px; }
  .status-step {
    display: flex; flex-direction: column; align-items: center; gap: 4px;
    flex: 1; min-width: 64px;
  }
  .status-circle {
    width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; transition: var(--transition);
  }
  .status-circle.done { background: var(--grad-primary); color: white; }
  .status-circle.active { background: rgba(99,102,241,0.2); color: var(--indigo); border: 2px solid var(--indigo); animation: pulse 2s infinite; }
  .status-circle.pending { background: rgba(255,255,255,0.05); color: var(--text-muted); border: 1px solid var(--border); }
  .status-label { font-size: 10px; color: var(--text-secondary); text-align: center; line-height: 1.3; }
  .status-line { flex: 1; height: 2px; background: var(--border); border-radius: 99px; margin-top: -16px; min-width: 20px; }
  .status-line.done { background: var(--grad-primary); }

  @keyframes pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.4); } 50% { box-shadow: 0 0 0 6px rgba(99,102,241,0); } }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }

  .fade-in { animation: fadeInUp 0.4s ease both; }
  .delay-1 { animation-delay: 0.05s; }
  .delay-2 { animation-delay: 0.1s; }
  .delay-3 { animation-delay: 0.15s; }
  .delay-4 { animation-delay: 0.2s; }

  /* Chat styles */
  .chat-area { display: flex; flex-direction: column; height: 440px; }
  .chat-messages { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
  .chat-msg { display: flex; gap: 10px; animation: fadeInUp 0.3s ease; }
  .chat-msg.user { flex-direction: row-reverse; }
  .chat-bubble {
    max-width: 75%; padding: 12px 16px; border-radius: 16px; font-size: 13.5px; line-height: 1.6;
  }
  .chat-msg.ai .chat-bubble { background: var(--bg-card); border: 1px solid var(--border); border-radius: 4px 16px 16px 16px; color: var(--text-primary); }
  .chat-msg.user .chat-bubble { background: var(--grad-primary); color: white; border-radius: 16px 4px 16px 16px; }
  .chat-input-row { display: flex; gap: 10px; padding: 16px; border-top: 1px solid var(--border); }
  .chat-input {
    flex: 1; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 10px 14px; color: var(--text-primary); font-size: 13px; outline: none; font-family: var(--font);
    transition: var(--transition);
  }
  .chat-input:focus { border-color: var(--border-accent); }
  .ai-avatar { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--purple), var(--indigo)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

  /* Score circles */
  .score-ring { position: relative; display: inline-flex; align-items: center; justify-content: center; }
  .score-center { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; }
  .score-value { font-size: 24px; font-weight: 800; color: var(--text-primary); line-height: 1; }
  .score-label { font-size: 10px; color: var(--text-secondary); }

  /* Notification items */
  .notif-item {
    display: flex; gap: 12px; padding: 14px 16px; border-radius: var(--radius-sm);
    border-bottom: 1px solid var(--border); transition: var(--transition); cursor: pointer;
  }
  .notif-item:hover { background: var(--bg-card); }
  .notif-item.unread { background: rgba(99,102,241,0.05); }
  .notif-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 6px; }
  .notif-body { font-size: 13px; color: var(--text-secondary); line-height: 1.5; }
  .notif-title { font-size: 13.5px; font-weight: 600; color: var(--text-primary); margin-bottom: 3px; }
  .notif-time { font-size: 11px; color: var(--text-muted); margin-top: 4px; }

  /* Skills */
  .skill-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.05); border: 1px solid var(--border);
    border-radius: 8px; padding: 5px 10px; font-size: 12px; color: var(--text-secondary);
    transition: var(--transition); cursor: default;
  }
  .skill-chip:hover { border-color: var(--border-accent); color: var(--text-primary); background: var(--bg-card-hover); }
  .skills-wrap { display: flex; flex-wrap: wrap; gap: 8px; }

  /* Charts */
  .mini-bar { display: flex; align-items: flex-end; gap: 4px; height: 56px; }
  .bar { flex: 1; border-radius: 4px 4px 0 0; transition: all 0.6s cubic-bezier(0.4,0,0.2,1); cursor: pointer; }
  .bar:hover { opacity: 0.8; }

  /* Tab nav */
  .tabs { display: flex; gap: 4px; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm); padding: 4px; margin-bottom: 20px; }
  .tab { padding: 7px 16px; border-radius: 6px; font-size: 13px; font-weight: 500; cursor: pointer; transition: var(--transition); color: var(--text-secondary); }
  .tab.active { background: var(--grad-primary); color: white; font-weight: 600; }
  .tab:not(.active):hover { color: var(--text-primary); background: var(--bg-card-hover); }

  /* Input field */
  .field { margin-bottom: 16px; }
  .field label { display: block; font-size: 12px; font-weight: 600; color: var(--text-secondary); margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; }
  .field input, .field select, .field textarea {
    width: 100%; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-sm);
    padding: 10px 14px; color: var(--text-primary); font-size: 13.5px; outline: none; font-family: var(--font);
    transition: var(--transition);
  }
  .field input:focus, .field select:focus, .field textarea:focus { border-color: var(--border-accent); box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  .field select option { background: var(--bg-surface); }

  /* Drop zone */
  .drop-zone {
    border: 2px dashed var(--border); border-radius: var(--radius-lg); padding: 40px 24px;
    text-align: center; cursor: pointer; transition: var(--transition);
  }
  .drop-zone:hover { border-color: var(--indigo); background: rgba(99,102,241,0.05); }
  .drop-icon { font-size: 40px; margin-bottom: 12px; }

  /* Funnel / step tracker */
  .funnel-row { display: flex; align-items: center; margin-bottom: 10px; gap: 12px; }
  .funnel-label { font-size: 12px; color: var(--text-secondary); width: 100px; flex-shrink: 0; }
  .funnel-bar-wrap { flex: 1; background: rgba(255,255,255,0.05); border-radius: 99px; height: 8px; }
  .funnel-bar { height: 8px; border-radius: 99px; transition: width 0.8s ease; }
  .funnel-count { font-size: 12px; font-weight: 600; color: var(--text-primary); width: 36px; text-align: right; }

  /* Landing page styles */
  .landing { min-height: 100vh; background: var(--bg-base); }
  .lp-nav { display: flex; align-items: center; padding: 20px 60px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 99; background: rgba(7,11,20,0.85); backdrop-filter: blur(20px); }
  .lp-hero {
    text-align: center; padding: 100px 60px 60px; position: relative;
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.2), transparent);
  }
  .lp-hero-eyebrow { display: inline-flex; align-items: center; gap: 8px; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); border-radius: 99px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: var(--indigo); margin-bottom: 28px; }
  .lp-h1 { font-size: 64px; font-weight: 900; line-height: 1.05; color: white; margin-bottom: 24px; letter-spacing: -0.03em; }
  .lp-h1 span { background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .lp-sub { font-size: 18px; color: var(--text-secondary); max-width: 560px; margin: 0 auto 40px; line-height: 1.7; }
  .lp-cta { display: flex; align-items: center; gap: 14px; justify-content: center; }
  .btn-xl { padding: 14px 28px; font-size: 15px; border-radius: var(--radius); }
  .lp-features { padding: 80px 60px; }
  .lp-feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .feat-card {
    background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-xl);
    padding: 28px; transition: var(--transition);
  }
  .feat-card:hover { border-color: var(--border-accent); transform: translateY(-4px); box-shadow: var(--shadow-glow); }
  .feat-icon { width: 48px; height: 48px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; margin-bottom: 18px; }
  .feat-title { font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px; }
  .feat-desc { font-size: 13.5px; color: var(--text-secondary); line-height: 1.7; }
  .lp-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; border: 1px solid var(--border); border-radius: var(--radius-xl); overflow: hidden; margin: 0 60px 80px; }
  .lp-stat { padding: 36px 28px; text-align: center; border-right: 1px solid var(--border); }
  .lp-stat:last-child { border-right: none; }
  .lp-stat-val { font-size: 40px; font-weight: 900; background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1; margin-bottom: 8px; }
  .lp-stat-label { font-size: 13px; color: var(--text-secondary); }

  .role-switcher { display: flex; gap: 4px; }
  .role-btn { padding: 6px 14px; border-radius: 8px; font-size: 12px; font-weight: 600; cursor: pointer; transition: var(--transition); border: 1px solid transparent; color: var(--text-secondary); background: transparent; }
  .role-btn.active { background: var(--grad-primary); color: white; }
  .role-btn:not(.active):hover { border-color: var(--border-accent); color: var(--text-primary); }

  .ai-glow { animation: glow 2s ease-in-out infinite; }
  .floating { animation: float 3s ease-in-out infinite; }

  .separator { height: 1px; background: var(--border); margin: 24px 0; }

  /* Circular progress SVG */
  .circ-progress { transform: rotate(-90deg); }
  .circ-track { fill: none; stroke: rgba(255,255,255,0.06); }
  .circ-bar { fill: none; stroke-linecap: round; transition: stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1); }

  @media (max-width: 900px) {
    :root { --sidebar-w: 0px; }
    .main { margin-left: 0; }
    .sidebar { display: none; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .grid-2, .grid-3, .grid-2-1, .grid-1-2, .lp-feat-grid { grid-template-columns: 1fr; }
    .lp-stats { grid-template-columns: repeat(2, 1fr); }
    .lp-h1 { font-size: 36px; }
    .lp-nav, .lp-hero, .lp-features { padding-left: 20px; padding-right: 20px; }
  }
`;

// ─── Data ─────────────────────────────────────────────────────────────────
const COMPANIES = [
  { id: 1, name: "Google", emoji: "🔵", role: "SDE - II", package: "₹45 LPA", location: "Bangalore", deadline: "Jul 15", match: 92, skills: ["React", "Node.js", "System Design", "DSA"], missing: ["Kubernetes"], branch: "CSE/IT", logo: "#4285F4" },
  { id: 2, name: "Microsoft", emoji: "⬛", role: "Software Engineer", package: "₹38 LPA", location: "Hyderabad", deadline: "Jul 22", match: 87, skills: ["C#/.NET", "Azure", "React", "SQL"], missing: ["Azure DevOps"], branch: "CSE/ECE/IT", logo: "#00A4EF" },
  { id: 3, name: "Amazon", emoji: "🟠", role: "SDE-1", package: "₹32 LPA", location: "Pune", deadline: "Aug 5", match: 78, skills: ["Java", "AWS", "Microservices", "DSA"], missing: ["AWS Lambda", "DynamoDB"], branch: "CSE/IT", logo: "#FF9900" },
  { id: 4, name: "Flipkart", emoji: "🟡", role: "SDE-1", package: "₹28 LPA", location: "Bangalore", deadline: "Aug 12", match: 95, skills: ["Java", "Spring Boot", "MySQL"], missing: [], branch: "CSE/IT/ECE", logo: "#F74D00" },
  { id: 5, name: "Infosys", emoji: "🔷", role: "Systems Engineer", package: "₹8 LPA", location: "Multiple", deadline: "Sep 1", match: 99, skills: ["Java", "SQL", "Python"], missing: [], branch: "All Branches", logo: "#007CC3" },
  { id: 6, name: "Goldman Sachs", emoji: "💙", role: "Analyst - Tech", package: "₹22 LPA", location: "Bangalore", deadline: "Jul 30", match: 71, skills: ["Python", "C++", "Finance Basics", "SQL"], missing: ["Quant Finance", "VBA"], branch: "CSE/Maths", logo: "#6699CC" },
];

const NOTIFICATIONS = [
  { id: 1, type: "placement", title: "Google Drive Open!", body: "Google has opened placement registrations for SDE-2. Deadline: Jul 15. You're 92% eligible.", time: "2m ago", read: false, color: "var(--blue)" },
  { id: 2, type: "ai", title: "AI Resume Insight", body: "Your resume ATS score improved to 78 after adding the 'System Design' keyword. Add 'Kubernetes' to hit 85+.", time: "1h ago", read: false, color: "var(--purple)" },
  { id: 3, type: "interview", title: "Interview Scheduled", body: "Your Microsoft technical interview is confirmed for July 18 at 2:00 PM IST. Check interview prep resources.", time: "3h ago", read: false, color: "var(--indigo)" },
  { id: 4, type: "deadline", title: "Application Deadline Approaching", body: "Amazon placement application closes in 3 days (Aug 5). Complete your application now.", time: "5h ago", read: true, color: "var(--orange)" },
  { id: 5, type: "general", title: "Pre-Placement Talk by Flipkart", body: "Flipkart will hold an online PPT session tomorrow at 4 PM. Attendance is mandatory for registered students.", time: "1d ago", read: true, color: "var(--green)" },
  { id: 6, type: "placement", title: "Shortlisted by Microsoft!", body: "Congratulations! You've been shortlisted for the Microsoft interview round. Check your schedule.", time: "2d ago", read: true, color: "var(--blue)" },
];

const APP_STATUS = [
  { label: "Applied", status: "done" },
  { label: "Under Review", status: "done" },
  { label: "Shortlisted", status: "done" },
  { label: "Online Assessment", status: "active" },
  { label: "Technical", status: "pending" },
  { label: "HR Round", status: "pending" },
  { label: "Selected", status: "pending" },
];

const AI_CHAT_INIT = [
  { role: "ai", text: "Hey! 👋 I'm your AI Career Assistant. I can help you with resume tips, interview prep, career roadmaps, company-specific guidance, and more. What would you like to work on today?" },
];

const AI_RESPONSES = {
  resume: "Based on your profile, here are the top improvements for your resume:\n\n**1. Add Quantified Impact** — Change 'Worked on backend APIs' to 'Built 12 REST APIs handling 10K+ daily requests, reducing latency by 35%.'\n\n**2. ATS Keywords Missing** — Add these terms: Kubernetes, CI/CD, System Design, Microservices\n\n**3. Project Descriptions** — Your CGPA project section lacks tech stack tags. Recruiters scan these first.\n\n**4. Header Section** — Add your GitHub and LinkedIn URLs. Google recruiters specifically look for this.",
  google: "🔵 **Google SDE-2 Preparation Roadmap:**\n\n**Round 1 — Phone Screen (45 min)**\n• 2 LeetCode Medium problems\n• Focus: Arrays, HashMaps, Sliding Window\n\n**Round 2-4 — Onsite Coding**\n• 1 Medium + 1 Hard per round\n• Think aloud — Google values communication\n\n**Round 5 — System Design**\n• Design YouTube, Google Drive, or URL Shortener\n• Study: CAP theorem, consistent hashing, sharding\n\n**Round 6 — Googliness + Leadership**\n• STAR format answers\n• Prepare: failure story, cross-team collaboration\n\n**Estimated Prep Time:** 6-8 weeks at 3-4 hrs/day",
  default: "That's a great question! Let me pull the most relevant guidance for your current placement stage...\n\nBased on your profile showing **78% resume strength**, **3 active applications**, and **1 interview scheduled**, here's what I recommend focusing on this week:\n\n1. **Priority:** Finish the Amazon Online Assessment mock tests\n2. **Resume:** Add Kubernetes to your skills section\n3. **Practice:** Solve 2 Graph problems daily for Microsoft\n4. **Schedule:** Block 4 PM tomorrow for Flipkart PPT\n\nWant me to go deeper into any of these?"
};

// ─── Mini Chart (Canvas-based bar chart) ─────────────────────────────────
const MiniBarChart = ({ data, color = "var(--indigo)" }) => {
  const max = Math.max(...data);
  return (
    <div className="mini-bar">
      {data.map((v, i) => (
        <div key={i} className="bar" style={{ height: `${(v / max) * 100}%`, background: color, opacity: i === data.length - 1 ? 1 : 0.5 }} />
      ))}
    </div>
  );
};

// ─── Circular Score ───────────────────────────────────────────────────────
const CircleScore = ({ score, size = 90, color = "url(#grad1)", label = "Score" }) => {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div className="score-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="circ-progress">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#6366F1" />
            <stop offset="100%" stopColor="#A855F7" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>
        <circle className="circ-track" cx={size/2} cy={size/2} r={r} strokeWidth={6} />
        <circle className="circ-bar" cx={size/2} cy={size/2} r={r} strokeWidth={6} stroke={color} strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="score-center">
        <span className="score-value" style={{ fontSize: size > 80 ? 20 : 14 }}>{score}</span>
        <span className="score-label">{label}</span>
      </div>
    </div>
  );
};

// ─── Pages ───────────────────────────────────────────────────────────────

const StudentDashboard = () => (
  <div>
    {/* Hero */}
    <div className="hero fade-in">
      <div className="hero-greeting">
        <span style={{ background: "var(--grad-primary)", borderRadius: "50%", width: 22, height: 22, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>✨</span>
        Good morning, final year student
      </div>
      <div className="hero-name">Welcome back, Aryan Sharma 👋</div>
      <div className="hero-sub">You have 2 new placement drives, 1 interview tomorrow, and your resume needs 2 improvements to reach 85+ ATS score.</div>
      <div className="hero-stats">
        <div className="hero-stat"><span className="hero-stat-val">8.6</span><span className="hero-stat-label">CGPA</span></div>
        <div className="hero-divider" />
        <div className="hero-stat"><span className="hero-stat-val">B.Tech CSE</span><span className="hero-stat-label">Branch</span></div>
        <div className="hero-divider" />
        <div className="hero-stat"><span className="hero-stat-val">2025</span><span className="hero-stat-label">Passout</span></div>
        <div className="hero-divider" />
        <div style={{ marginLeft: "auto" }}>
          <button className="btn btn-primary"><Icon name="drives" size={15} /> View All Drives</button>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="stats-grid">
      {[
        { label: "Applied", value: "6", icon: "applications", change: "+2 this week", up: true, bg: "rgba(59,130,246,0.15)", color: "var(--blue)" },
        { label: "Eligible Drives", value: "14", icon: "drives", change: "3 new drives", up: true, bg: "rgba(16,185,129,0.15)", color: "var(--green)" },
        { label: "Interviews", value: "2", icon: "interview", change: "1 tomorrow", up: true, bg: "rgba(168,85,247,0.15)", color: "var(--purple)" },
        { label: "Selected", value: "1", icon: "check", change: "Flipkart offer", up: true, bg: "rgba(245,158,11,0.15)", color: "var(--orange)" },
      ].map((s, i) => (
        <div key={s.label} className={`stat-card fade-in delay-${i+1}`}>
          <div className="stat-icon" style={{ background: s.bg, color: s.color }}><Icon name={s.icon} size={20} /></div>
          <div className="stat-value" style={{ background: "var(--grad-primary)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
          <div className={`stat-change ${s.up ? "up" : "down"}`}>↑ {s.change}</div>
        </div>
      ))}
    </div>

    <div className="grid-2-1 mb-24">
      {/* Application tracker */}
      <div className="card fade-in">
        <div className="section-header">
          <div><div className="section-title">Application Tracker</div><div className="section-sub">Microsoft SDE — Active Application</div></div>
          <span className="tag tag-indigo">In Progress</span>
        </div>
        <div className="status-flow" style={{ marginBottom: 20 }}>
          {APP_STATUS.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="status-step">
                <div className={`status-circle ${s.status}`}>{s.status === "done" ? "✓" : s.status === "active" ? "⟳" : i + 1}</div>
                <span className="status-label">{s.label}</span>
              </div>
              {i < APP_STATUS.length - 1 && <div className={`status-line ${s.status === "done" ? "done" : ""}`} />}
            </React.Fragment>
          ))}
        </div>
        <div style={{ padding: "14px 16px", background: "rgba(99,102,241,0.08)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border-accent)", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 20 }}>📋</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>Online Assessment Due</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>Complete within 48 hours · Sent to aryan@college.edu</div>
          </div>
          <button className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }}>Start OA</button>
        </div>
      </div>

      {/* Resume score */}
      <div className="card card-accent fade-in">
        <div className="section-title" style={{ marginBottom: 16 }}>Resume Health</div>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <CircleScore score={78} size={110} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "ATS Score", val: 78, color: "primary" },
            { label: "Grammar", val: 92, color: "green" },
            { label: "Keywords", val: 65, color: "orange" },
          ].map(s => (
            <div key={s.label}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                <span style={{ color: "var(--text-secondary)" }}>{s.label}</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{s.val}%</span>
              </div>
              <div className="progress-wrap"><div className={`progress-bar ${s.color}`} style={{ width: `${s.val}%` }} /></div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary" style={{ width: "100%", marginTop: 16, justifyContent: "center" }}>
          <Icon name="spark" size={14} /> Analyze with AI
        </button>
      </div>
    </div>

    <div className="grid-2 mb-24">
      {/* Upcoming drives */}
      <div className="card fade-in">
        <div className="section-header">
          <div className="section-title">Upcoming Drives</div>
          <span className="see-all">View all →</span>
        </div>
        {COMPANIES.slice(0, 3).map(c => (
          <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <div className="company-logo" style={{ width: 38, height: 38, fontSize: 18, borderRadius: 10, marginBottom: 0, background: "white", flexShrink: 0 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--text-primary)" }}>{c.name} — {c.role}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>{c.package} · {c.location} · Deadline: {c.deadline}</div>
            </div>
            <span className="tag tag-green" style={{ fontSize: 10 }}>{c.match}% match</span>
          </div>
        ))}
      </div>

      {/* Skill progress */}
      <div className="card fade-in">
        <div className="section-header">
          <div className="section-title">Skill Progress</div>
          <span className="tag tag-purple"><Icon name="spark" size={10} /> AI Suggested</span>
        </div>
        {[
          { skill: "Data Structures & Algo", level: 72, color: "var(--indigo)" },
          { skill: "System Design", level: 55, color: "var(--purple)" },
          { skill: "React / Frontend", level: 88, color: "var(--blue)" },
          { skill: "Node.js / Backend", level: 80, color: "var(--cyan)" },
          { skill: "Kubernetes", level: 20, color: "var(--orange)" },
        ].map(s => (
          <div key={s.skill} style={{ marginBottom: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 6 }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{s.skill}</span>
              <span style={{ color: "var(--text-secondary)" }}>{s.level}%</span>
            </div>
            <div className="progress-wrap">
              <div className="progress-bar" style={{ width: `${s.level}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recommendations */}
    <div className="card fade-in" style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))", borderColor: "var(--border-accent)" }}>
      <div className="section-header">
        <div>
          <div className="section-title" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--purple)", animation: "glow 2s infinite" }}>✨</span> AI Company Recommendations
          </div>
          <div className="section-sub">Based on your skills, CGPA, and past performance</div>
        </div>
      </div>
      <div className="skills-wrap">
        {COMPANIES.map(c => (
          <div key={c.id} className="skill-chip" style={{ cursor: "pointer" }}>
            <span>{c.emoji}</span> {c.name} <span style={{ color: "var(--green)", fontWeight: 700 }}>{c.match}%</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PlacementDrives = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "High Package", "Remote", "Bangalore", "Applied"];
  const filtered = COMPANIES.filter(c =>
    (filter === "All" || c.location.includes(filter) || filter === "High Package" && parseInt(c.package) > 25) &&
    (c.name.toLowerCase().includes(search.toLowerCase()) || c.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      {/* Filters */}
      <div className="card mb-24 fade-in" style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <div className="search-bar" style={{ flex: 1, minWidth: 200 }}>
            <Icon name="search" size={15} style={{ color: "var(--text-muted)" }} />
            <input placeholder="Search companies, roles, skills…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {filters.map(f => (
              <button key={f} className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(f)}>{f}</button>
            ))}
          </div>
          <button className="btn btn-ghost btn-sm"><Icon name="filter" size={14} /> Filters</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {filtered.map((c, i) => (
          <div key={c.id} className={`company-card fade-in delay-${(i % 4) + 1}`}>
            <div className="match-pill">🎯 {c.match}% Match</div>
            <div className="company-logo">{c.emoji}</div>
            <div className="company-name">{c.name}</div>
            <div className="company-role">{c.role}</div>
            <div className="company-package">{c.package}</div>
            <div style={{ display: "flex", gap: 8, margin: "12px 0", flexWrap: "wrap" }}>
              <span className="tag tag-blue"><Icon name="location" size={10} /> {c.location}</span>
              <span className="tag tag-orange"><Icon name="clock" size={10} /> {c.deadline}</span>
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", marginBottom: 8 }}>Required Skills:</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
              {c.skills.map(s => <span key={s} className="tag tag-indigo">{s}</span>)}
              {c.missing.map(s => <span key={s} className="tag tag-red">⚠ {s}</span>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Apply Now</button>
              <button className="btn btn-ghost btn-sm">Overview</button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 8 }}>No drives found</div>
          <div style={{ color: "var(--text-secondary)" }}>Try adjusting your filters or search terms</div>
        </div>
      )}
    </div>
  );
};

const AIResumeAnalyzer = () => {
  const [uploaded, setUploaded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  const handleUpload = () => {
    setUploaded(true);
    setAnalyzing(true);
    setTimeout(() => { setAnalyzing(false); setDone(true); }, 2200);
  };

  return (
    <div>
      {!uploaded && (
        <div className="card fade-in" style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 28, marginBottom: 12, animation: "float 3s ease-in-out infinite" }}>🤖</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", marginBottom: 8 }}>AI Resume Analyzer</div>
            <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>Get an instant ATS score, keyword analysis, and personalized improvement suggestions.</div>
          </div>
          <div className="drop-zone" onClick={handleUpload}>
            <div className="drop-icon">📄</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Drop your resume here</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 20 }}>PDF, DOCX up to 5MB</div>
            <button className="btn btn-primary"><Icon name="upload" size={14} /> Choose File</button>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
            {["ATS Score", "Grammar Check", "Keyword Gap", "Improvement Tips"].map(f => (
              <span key={f} className="tag tag-purple"><Icon name="spark" size={10} /> {f}</span>
            ))}
          </div>
        </div>
      )}

      {analyzing && (
        <div className="card fade-in" style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 40, marginBottom: 20, animation: "spin 2s linear infinite", display: "inline-block" }}>⚙️</div>
          <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>Analyzing your resume…</div>
          <div style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 28 }}>Running ATS scan, grammar check, and keyword analysis</div>
          {["Parsing document structure…", "Running ATS compatibility check…", "Analyzing keyword density…", "Generating improvement suggestions…"].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "center", marginBottom: 10, opacity: 0.7 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--indigo)", animation: `pulse 1s ${i * 0.2}s infinite` }} />
              <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>{t}</span>
            </div>
          ))}
        </div>
      )}

      {done && (
        <div>
          {/* Score overview */}
          <div className="grid-2 mb-24">
            <div className="card fade-in">
              <div className="section-title" style={{ marginBottom: 20 }}>Resume Scores</div>
              <div style={{ display: "flex", gap: 24, justifyContent: "space-around", flexWrap: "wrap" }}>
                <div style={{ textAlign: "center" }}>
                  <CircleScore score={78} size={100} color="url(#grad1)" label="ATS" />
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>ATS Score</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <CircleScore score={92} size={100} color="url(#grad2)" label="Grammar" />
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>Grammar</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <CircleScore score={65} size={100} color="url(#grad3)" label="Keywords" />
                  <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 8 }}>Keywords</div>
                </div>
              </div>
              <div className="separator" />
              <div style={{ fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
                Overall Strength: <span style={{ color: "var(--orange)", fontWeight: 700 }}>Above Average</span> — Add 3 more keywords to reach 90+
              </div>
            </div>

            <div className="card card-accent fade-in">
              <div className="section-title" style={{ marginBottom: 16 }}>⚡ Quick Wins</div>
              {[
                { icon: "🔑", text: "Add missing keywords: Kubernetes, CI/CD, System Design", impact: "+12 pts" },
                { icon: "📊", text: "Quantify impact: 'Reduced API latency by 35%' vs just 'Built APIs'", impact: "+8 pts" },
                { icon: "🔗", text: "Add GitHub and LinkedIn URLs to header", impact: "+5 pts" },
                { icon: "📐", text: "Use bullet points consistently (some bullets have mixed styles)", impact: "+3 pts" },
              ].map(q => (
                <div key={q.icon} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{q.icon}</span>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{q.text}</span>
                  </div>
                  <span className="tag tag-green" style={{ flexShrink: 0 }}>{q.impact}</span>
                </div>
              ))}
              <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
                <Icon name="spark" size={14} /> Auto-Improve with AI
              </button>
            </div>
          </div>

          {/* Keywords */}
          <div className="card fade-in mb-24">
            <div className="section-header">
              <div className="section-title">Keyword Analysis</div>
              <span className="tag tag-orange">13 missing</span>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--green)", marginBottom: 10 }}>✅ Found ({12})</div>
                <div className="skills-wrap">
                  {["React", "Node.js", "MongoDB", "Express", "Python", "Git", "REST APIs", "JavaScript", "SQL", "AWS", "Agile", "Machine Learning"].map(s => (
                    <span key={s} className="tag tag-green">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--red)", marginBottom: 10 }}>❌ Missing ({13})</div>
                <div className="skills-wrap">
                  {["Kubernetes", "CI/CD", "Docker", "System Design", "Microservices", "GraphQL", "TypeScript", "Redis", "Kafka", "Terraform", "Jest", "GitHub Actions", "SOLID Principles"].map(s => (
                    <span key={s} className="tag tag-red">{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AIAssistant = () => {
  const [messages, setMessages] = useState(AI_CHAT_INIT);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const suggestions = ["Help me prepare for Google interview", "Analyze my resume", "Career roadmap for SDE", "Common HR questions", "System design resources"];

  const sendMsg = async (text) => {
    if (!text.trim()) return;
    const userMsg = { role: "user", text };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const reply = text.toLowerCase().includes("resume") ? AI_RESPONSES.resume :
        text.toLowerCase().includes("google") ? AI_RESPONSES.google : AI_RESPONSES.default;
      setMessages(prev => [...prev, { role: "ai", text: reply }]);
      setLoading(false);
    }, 1400);
  };

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  return (
    <div className="fade-in">
      <div className="card mb-20" style={{ background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(99,102,241,0.08))", borderColor: "rgba(168,85,247,0.3)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: "50%", background: "linear-gradient(135deg, var(--purple), var(--indigo))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, animation: "float 3s ease-in-out infinite" }}>🤖</div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>PlaceAI Career Assistant</div>
            <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>Powered by advanced AI · Personalized for your profile · Always learning</div>
          </div>
          <span className="tag tag-green" style={{ marginLeft: "auto" }}>● Online</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="chat-messages" style={{ height: 380 }}>
          {messages.map((m, i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              {m.role === "ai" && <div className="ai-avatar"><span style={{ fontSize: 14 }}>🤖</span></div>}
              {m.role === "user" && <div className="avatar sm">AS</div>}
              <div className="chat-bubble" style={{ whiteSpace: "pre-wrap" }}>
                {m.text.split("**").map((part, j) => j % 2 === 0 ? part : <strong key={j}>{part}</strong>)}
              </div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg ai">
              <div className="ai-avatar"><span style={{ fontSize: 14 }}>🤖</span></div>
              <div className="chat-bubble" style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--indigo)", animation: `pulse 1.2s ${i * 0.2}s ease-in-out infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        <div style={{ padding: "10px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8, overflowX: "auto" }}>
          {suggestions.map(s => (
            <button key={s} className="btn btn-ghost btn-sm" style={{ whiteSpace: "nowrap", fontSize: 11 }} onClick={() => sendMsg(s)}>{s}</button>
          ))}
        </div>

        <div className="chat-input-row">
          <input className="chat-input" placeholder="Ask anything about your placement journey…" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg(input)} />
          <button className="btn btn-primary" onClick={() => sendMsg(input)}><Icon name="send" size={15} /></button>
        </div>
      </div>
    </div>
  );
};

const Applications = () => (
  <div className="fade-in">
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[
        { company: "Microsoft", role: "Software Engineer", package: "₹38 LPA", status: "Online Assessment", statusColor: "var(--orange)", step: 3, emoji: "⬛" },
        { company: "Google", role: "SDE - II", package: "₹45 LPA", status: "Under Review", statusColor: "var(--blue)", step: 2, emoji: "🔵" },
        { company: "Flipkart", role: "SDE-1", package: "₹28 LPA", status: "Selected 🎉", statusColor: "var(--green)", step: 7, emoji: "🟡" },
        { company: "Amazon", role: "SDE-1", package: "₹32 LPA", status: "Applied", statusColor: "var(--text-secondary)", step: 1, emoji: "🟠" },
      ].map((app, idx) => (
        <div key={app.company} className={`card fade-in delay-${idx + 1}`}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
            <div style={{ fontSize: 32 }}>{app.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8, flexWrap: "wrap" }}>
                <span style={{ fontSize: 16, fontWeight: 700, color: "var(--text-primary)" }}>{app.company}</span>
                <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>— {app.role}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--indigo)" }}>{app.package}</span>
                <span className="tag" style={{ marginLeft: "auto", color: app.statusColor, background: `${app.statusColor}18`, border: `1px solid ${app.statusColor}40` }}>{app.status}</span>
              </div>
              {/* Mini progress */}
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                {["Applied", "Review", "Shortlist", "OA", "Technical", "HR", "Selected"].map((st, i) => (
                  <React.Fragment key={st}>
                    <div style={{
                      width: 24, height: 24, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 10, fontWeight: 700, flexShrink: 0,
                      background: i < app.step ? "var(--grad-primary)" : i === app.step ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.05)",
                      color: i < app.step ? "white" : i === app.step ? "var(--indigo)" : "var(--text-muted)",
                      border: i === app.step ? "2px solid var(--indigo)" : "none",
                    }}>{i < app.step ? "✓" : i + 1}</div>
                    {i < 6 && <div style={{ flex: 1, height: 2, background: i < app.step - 1 ? "var(--indigo)" : "rgba(255,255,255,0.06)", borderRadius: 99 }} />}
                  </React.Fragment>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {["Applied", "Review", "Shortlist", "OA", "Technical", "HR", "Selected"].slice(0, app.step + 1).map((st, i) => (
                  <span key={st} style={{ fontSize: 10, color: "var(--text-muted)" }}>{st} {i < app.step && "✓"}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("All");
  const tabs = ["All", "Placement", "Interview", "AI Insights", "Deadlines"];
  return (
    <div className="fade-in">
      <div className="tabs">
        {tabs.map(t => <div key={t} className={`tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>{t}</div>)}
      </div>
      <div className="card" style={{ padding: 0 }}>
        {NOTIFICATIONS.filter(n => activeTab === "All" || n.type === activeTab.toLowerCase().replace(" insights", "").replace("ai", "ai")).map(n => (
          <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`}>
            <div className="notif-dot" style={{ background: n.color }} />
            <div>
              <div className="notif-title">{n.title}</div>
              <div className="notif-body">{n.body}</div>
              <div className="notif-time">{n.time}</div>
            </div>
            {!n.read && <span className="tag tag-indigo" style={{ marginLeft: "auto", flexShrink: 0 }}>New</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

const Analytics = () => (
  <div className="fade-in">
    <div className="stats-grid mb-24">
      {[
        { label: "Placement Rate", value: "82%", change: "+14% YoY", up: true, color: "var(--green)" },
        { label: "Avg Package", value: "₹18.4L", change: "+₹2.1L YoY", up: true, color: "var(--blue)" },
        { label: "Highest Package", value: "₹45L", change: "Google SDE-2", up: true, color: "var(--purple)" },
        { label: "Companies Visited", value: "48", change: "+8 new this yr", up: true, color: "var(--orange)" },
      ].map((s, i) => (
        <div key={s.label} className={`stat-card fade-in delay-${i + 1}`}>
          <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-change up">{s.change}</div>
        </div>
      ))}
    </div>

    <div className="grid-2 mb-24">
      {/* Placement funnel */}
      <div className="card fade-in">
        <div className="section-title" style={{ marginBottom: 20 }}>Placement Funnel</div>
        {[
          { label: "Registered", count: 342, pct: 100, color: "var(--indigo)" },
          { label: "Eligible", count: 298, pct: 87, color: "var(--blue)" },
          { label: "Applied", count: 256, pct: 75, color: "var(--cyan)" },
          { label: "Shortlisted", count: 180, pct: 53, color: "var(--purple)" },
          { label: "Interviewed", count: 120, pct: 35, color: "var(--orange)" },
          { label: "Selected", count: 81, pct: 24, color: "var(--green)" },
        ].map(f => (
          <div key={f.label} className="funnel-row">
            <span className="funnel-label">{f.label}</span>
            <div className="funnel-bar-wrap"><div className="funnel-bar" style={{ width: `${f.pct}%`, background: f.color }} /></div>
            <span className="funnel-count">{f.count}</span>
          </div>
        ))}
      </div>

      {/* Branch wise */}
      <div className="card fade-in">
        <div className="section-title" style={{ marginBottom: 20 }}>Dept-wise Placement Rate</div>
        {[
          { dept: "Computer Science", rate: 94, bar: "var(--indigo)" },
          { dept: "Information Tech", rate: 89, bar: "var(--blue)" },
          { dept: "Electronics", rate: 76, bar: "var(--cyan)" },
          { dept: "Mechanical", rate: 58, bar: "var(--orange)" },
          { dept: "Civil", rate: 42, bar: "var(--text-muted)" },
        ].map(d => (
          <div key={d.dept} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 500 }}>{d.dept}</span>
              <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>{d.rate}%</span>
            </div>
            <div className="progress-wrap"><div className="progress-bar" style={{ width: `${d.rate}%`, background: d.bar }} /></div>
          </div>
        ))}
      </div>
    </div>

    {/* Package distribution */}
    <div className="card fade-in">
      <div className="section-title" style={{ marginBottom: 20 }}>Package Distribution (Batch 2025)</div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 140, padding: "0 8px" }}>
        {[
          { range: "3-6 LPA", count: 28, color: "var(--text-muted)" },
          { range: "6-10 LPA", count: 45, color: "var(--blue)" },
          { range: "10-15 LPA", count: 62, color: "var(--indigo)" },
          { range: "15-25 LPA", count: 38, color: "var(--purple)" },
          { range: "25-35 LPA", count: 18, color: "var(--cyan)" },
          { range: "35+ LPA", count: 8, color: "var(--green)" },
        ].map(b => (
          <div key={b.range} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: b.color }}>{b.count}</span>
            <div style={{ width: "100%", background: b.color, borderRadius: "6px 6px 0 0", height: `${(b.count / 62) * 110}px`, transition: "height 0.8s ease", opacity: 0.85 }} />
            <span style={{ fontSize: 10, color: "var(--text-muted)", textAlign: "center" }}>{b.range}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const CoordinatorDashboard = () => (
  <div>
    {/* Hero */}
    <div className="hero fade-in">
      <div className="hero-greeting">👔 Coordinator View</div>
      <div className="hero-name">Placement Dashboard</div>
      <div className="hero-sub">Manage drives, track students, and coordinate placements from one unified dashboard.</div>
      <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
        <button className="btn btn-primary"><Icon name="plus" size={15} /> Create Drive</button>
        <button className="btn btn-ghost"><Icon name="users" size={15} /> View Students</button>
        <button className="btn btn-ghost"><Icon name="download" size={15} /> Export Data</button>
      </div>
    </div>

    <div className="stats-grid mb-24">
      {[
        { label: "Active Drives", val: "12", icon: "drives", color: "var(--blue)", bg: "rgba(59,130,246,0.15)" },
        { label: "Total Students", val: "342", icon: "users", color: "var(--green)", bg: "rgba(16,185,129,0.15)" },
        { label: "Applications", val: "1,248", icon: "applications", color: "var(--purple)", bg: "rgba(168,85,247,0.15)" },
        { label: "Selected", val: "81", icon: "star", color: "var(--orange)", bg: "rgba(245,158,11,0.15)" },
      ].map((s, i) => (
        <div key={s.label} className={`stat-card fade-in delay-${i + 1}`}>
          <div className="stat-icon" style={{ background: s.bg, color: s.color }}><Icon name={s.icon} size={20} /></div>
          <div className="stat-value">{s.val}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>

    <div className="grid-2 mb-24">
      {/* Recent applicants */}
      <div className="card fade-in">
        <div className="section-header">
          <div className="section-title">Recent Applicants</div>
          <button className="btn btn-ghost btn-sm"><Icon name="download" size={13} /> Export</button>
        </div>
        {[
          { name: "Aryan Sharma", branch: "CSE", cgpa: 8.6, company: "Google", status: "Shortlisted" },
          { name: "Priya Patel", branch: "IT", cgpa: 9.1, company: "Microsoft", status: "Selected" },
          { name: "Rohan Gupta", branch: "CSE", cgpa: 7.8, company: "Amazon", status: "Applied" },
          { name: "Sneha Joshi", branch: "ECE", cgpa: 8.3, company: "Flipkart", status: "Review" },
          { name: "Amit Kumar", branch: "CSE", cgpa: 8.0, company: "Google", status: "OA Sent" },
        ].map(s => (
          <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <div className="avatar sm">{s.name.split(" ").map(n => n[0]).join("")}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{s.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{s.branch} · CGPA: {s.cgpa} · Applied: {s.company}</div>
            </div>
            <span className={`tag ${s.status === "Selected" ? "tag-green" : s.status === "Shortlisted" ? "tag-indigo" : s.status === "OA Sent" ? "tag-orange" : "tag-blue"}`} style={{ fontSize: 10 }}>{s.status}</span>
          </div>
        ))}
      </div>

      {/* Active drives summary */}
      <div className="card fade-in">
        <div className="section-header"><div className="section-title">Active Drives</div><button className="btn btn-primary btn-sm"><Icon name="plus" size={12} /> New</button></div>
        {COMPANIES.slice(0, 4).map(c => (
          <div key={c.id} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ fontSize: 22 }}>{c.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{c.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{c.role} · Deadline: {c.deadline}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                <span style={{ color: "var(--indigo)" }}>24 applied</span> · <span style={{ color: "var(--orange)" }}>8 shortlisted</span>
              </div>
            </div>
            <button className="btn btn-ghost btn-sm">Manage</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const InterviewPrep = () => {
  const [selectedType, setSelectedType] = useState("Technical");
  const types = [
    { label: "Technical", icon: "⚙️", color: "var(--blue)" },
    { label: "HR", icon: "👔", color: "var(--green)" },
    { label: "Coding", icon: "💻", color: "var(--indigo)" },
    { label: "Behavioral", icon: "🧠", color: "var(--purple)" },
  ];
  const questions = {
    Technical: ["Explain the difference between REST and GraphQL APIs.", "How does garbage collection work in Java?", "Design a rate limiter for an API.", "Explain SOLID principles with examples.", "What is the CAP theorem?"],
    HR: ["Tell me about yourself.", "Where do you see yourself in 5 years?", "Why do you want to join this company?", "Describe a challenge you overcame.", "What is your greatest strength?"],
    Coding: ["Two Sum (LeetCode #1)", "Merge Intervals", "LRU Cache Implementation", "Binary Tree Level Order Traversal", "Longest Palindromic Substring"],
    Behavioral: ["Describe a time you led a team under pressure.", "Tell me about a conflict with a teammate.", "Describe your biggest professional failure.", "How do you prioritize when everything is urgent?", "Talk about a project you're most proud of."],
  };
  return (
    <div className="fade-in">
      <div className="grid-2 mb-24" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {types.map(t => (
          <div key={t.label} className="card" style={{ textAlign: "center", cursor: "pointer", border: selectedType === t.label ? "2px solid var(--indigo)" : "", background: selectedType === t.label ? "var(--grad-card)" : "" }} onClick={() => setSelectedType(t.label)}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{t.icon}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: selectedType === t.label ? "var(--text-primary)" : "var(--text-secondary)" }}>{t.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2-1">
        <div className="card fade-in">
          <div className="section-title" style={{ marginBottom: 16 }}>{selectedType} Questions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {questions[selectedType].map((q, i) => (
              <div key={i} style={{ display: "flex", gap: 12, padding: "14px 16px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-accent)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
              >
                <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--indigo)", fontWeight: 700, flexShrink: 0 }}>Q{i + 1}</span>
                <span style={{ fontSize: 13.5, color: "var(--text-primary)" }}>{q}</span>
                <button className="btn btn-ghost btn-sm" style={{ marginLeft: "auto", flexShrink: 0 }}>Practice</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card card-accent fade-in">
            <div style={{ fontSize: 28, marginBottom: 12, textAlign: "center" }}>🎯</div>
            <div className="section-title" style={{ textAlign: "center", marginBottom: 8 }}>AI Confidence Score</div>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <CircleScore score={73} size={90} />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", textAlign: "center" }}>Based on your mock sessions · Improving steadily</div>
          </div>

          <div className="card fade-in">
            <div className="section-title" style={{ marginBottom: 12 }}>Preparation Tips</div>
            {["Think out loud during coding rounds", "Always ask clarifying questions", "Practice on a whiteboard / shared editor", "Know your projects inside out", "Prepare 5 STAR stories for behavioral"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <span style={{ color: "var(--green)", flexShrink: 0 }}>✓</span>
                <span style={{ fontSize: 12.5, color: "var(--text-secondary)" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LandingPage = ({ onEnter }) => (
  <div className="landing">
    {/* Nav */}
    <nav className="lp-nav">
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="logo-icon" style={{ width: 36, height: 36 }}>P</div>
        <span style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)" }}>PlaceIQ</span>
      </div>
      <div style={{ display: "flex", gap: 24, marginLeft: 40 }}>
        {["Features", "For Students", "For Coordinators", "Analytics"].map(l => (
          <span key={l} style={{ fontSize: 13.5, color: "var(--text-secondary)", cursor: "pointer", transition: "color 0.2s" }}
            onMouseEnter={e => e.target.style.color = "var(--text-primary)"}
            onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}
          >{l}</span>
        ))}
      </div>
      <div style={{ marginLeft: "auto", display: "flex", gap: 10 }}>
        <button className="btn btn-ghost btn-sm">Sign in</button>
        <button className="btn btn-primary btn-sm" onClick={onEnter}>Get Started →</button>
      </div>
    </nav>

    {/* Hero */}
    <section className="lp-hero">
      <div className="lp-hero-eyebrow"><Icon name="spark" size={13} /> Powered by AI · Built for Modern Campuses</div>
      <h1 className="lp-h1">The smartest way to<br /><span>manage college placements</span></h1>
      <p className="lp-sub">AI-powered placement management that automates job matching, resume analysis, eligibility checks, and interview prep — all in one beautiful platform.</p>
      <div className="lp-cta">
        <button className="btn btn-primary btn-xl" onClick={onEnter}>Launch App Demo <Icon name="arrow" size={16} /></button>
        <button className="btn btn-ghost btn-xl">Watch Demo ▶</button>
      </div>

      {/* Dashboard preview */}
      <div style={{ marginTop: 60, border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden", background: "var(--bg-surface)", boxShadow: "0 40px 80px rgba(0,0,0,0.6)", textAlign: "left" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid var(--border)", background: "rgba(255,255,255,0.02)" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FEBC2E" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
          <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>placeiq.app — Student Dashboard</span>
        </div>
        <div style={{ padding: "20px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {[{ l: "Applied", v: "6", c: "var(--blue)" }, { l: "Eligible", v: "14", c: "var(--green)" }, { l: "Interviews", v: "2", c: "var(--purple)" }, { l: "Offers", v: "1", c: "var(--orange)" }].map(s => (
            <div key={s.l} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: "0 20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>🎯 AI Match Score</div>
            {[{n:"Google",m:92},{n:"Microsoft",m:87},{n:"Amazon",m:78}].map(c=>(
              <div key={c.n} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <span style={{fontSize:12,color:"var(--text-primary)",flex:1}}>{c.n}</span>
                <div style={{flex:2,height:6,background:"rgba(255,255,255,0.06)",borderRadius:99,overflow:"hidden"}}><div style={{width:`${c.m}%`,height:"100%",background:"var(--grad-primary)",borderRadius:99}}/></div>
                <span style={{fontSize:11,color:"var(--text-secondary)",width:30,textAlign:"right"}}>{c.m}%</span>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 12, padding: "16px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>📊 Application Status</div>
            <div style={{ fontSize: 12, color: "var(--text-secondary)", lineHeight: 2 }}>
              <div>Microsoft SDE · <span style={{color:"var(--orange)"}}>Online Assessment</span></div>
              <div>Google SDE-2 · <span style={{color:"var(--blue)"}}>Under Review</span></div>
              <div>Flipkart SDE-1 · <span style={{color:"var(--green)"}}>Selected 🎉</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Stats */}
    <div className="lp-stats">
      {[{ v: "500+", l: "Colleges" }, { v: "1.2L+", l: "Students Placed" }, { v: "82%", l: "Placement Rate" }, { v: "₹18.4L", l: "Avg Package" }].map(s => (
        <div key={s.l} className="lp-stat">
          <div className="lp-stat-val">{s.v}</div>
          <div className="lp-stat-label">{s.l}</div>
        </div>
      ))}
    </div>

    {/* Features */}
    <section className="lp-features">
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div className="lp-hero-eyebrow" style={{ display: "inline-flex", marginBottom: 16 }}>Features</div>
        <h2 style={{ fontSize: 40, fontWeight: 900, color: "var(--text-primary)", letterSpacing: "-0.02em", marginBottom: 16 }}>Everything your placement cell needs</h2>
        <p style={{ fontSize: 16, color: "var(--text-secondary)" }}>From job matching to offer letters, PlaceIQ handles the entire placement lifecycle.</p>
      </div>
      <div className="lp-feat-grid">
        {[
          { icon: "🤖", bg: "rgba(168,85,247,0.15)", title: "AI Resume Analyzer", desc: "Get instant ATS scores, keyword gap analysis, and one-click AI improvements. Stay ahead of every applicant tracking system." },
          { icon: "🎯", bg: "rgba(99,102,241,0.15)", title: "Smart Job Matching", desc: "Our AI matches students to drives based on skills, CGPA, branch, and preferences. Students only see roles they're actually eligible for." },
          { icon: "📊", bg: "rgba(59,130,246,0.15)", title: "Live Analytics", desc: "Real-time placement dashboards for coordinators and admins. Track funnel drop-offs, department performance, and hiring trends instantly." },
          { icon: "🗓️", bg: "rgba(16,185,129,0.15)", title: "Interview Scheduler", desc: "Automated interview scheduling with calendar sync, reminders, and feedback collection — no more manual coordination chaos." },
          { icon: "💬", bg: "rgba(245,158,11,0.15)", title: "AI Career Assistant", desc: "24/7 AI-powered chat that guides students through resume building, interview prep, and career planning with personalized advice." },
          { icon: "🔔", bg: "rgba(239,68,68,0.15)", title: "Smart Notifications", desc: "Priority-based notifications for deadlines, drive announcements, shortlists, and AI insights — delivered in real time." },
        ].map(f => (
          <div key={f.title} className="feat-card">
            <div className="feat-icon" style={{ background: f.bg, fontSize: 24 }}>{f.icon}</div>
            <div className="feat-title">{f.title}</div>
            <div className="feat-desc">{f.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section style={{ textAlign: "center", padding: "80px 60px", background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(168,85,247,0.05))", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <h2 style={{ fontSize: 40, fontWeight: 900, color: "var(--text-primary)", marginBottom: 16, letterSpacing: "-0.02em" }}>Ready to transform placements?</h2>
      <p style={{ fontSize: 16, color: "var(--text-secondary)", marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>Join 500+ colleges who've automated their placement process and increased placement rates by 40%.</p>
      <button className="btn btn-primary btn-xl" onClick={onEnter}>Launch the Demo <Icon name="arrow" size={16} /></button>
    </section>

    {/* Footer */}
    <footer style={{ padding: "32px 60px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div className="logo-icon" style={{ width: 28, height: 28, fontSize: 12 }}>P</div>
        <span style={{ fontSize: 14, fontWeight: 700 }}>PlaceIQ</span>
      </div>
      <span style={{ fontSize: 12, color: "var(--text-muted)" }}>© 2025 PlaceIQ. Built with ❤️ for campus placement teams.</span>
    </footer>
  </div>
);

// ─── Main App ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [role, setRole] = useState("student");
  const [activePage, setActivePage] = useState("dashboard");

  const studentNav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "drives", label: "Placement Drives", icon: "drives", badge: "2" },
    { id: "applications", label: "Applications", icon: "applications" },
    { id: "resume", label: "Resume", icon: "resume" },
    { id: "ai", label: "AI Assistant", icon: "ai" },
    { id: "interview", label: "Interview Prep", icon: "interview" },
    { id: "notifications", label: "Notifications", icon: "bell", badge: "3", badgeRed: true },
    { id: "analytics", label: "Analytics", icon: "analytics" },
  ];

  const coordNav = [
    { id: "dashboard", label: "Dashboard", icon: "dashboard" },
    { id: "drives", label: "Drives", icon: "drives" },
    { id: "applications", label: "Applicants", icon: "applications" },
    { id: "analytics", label: "Analytics", icon: "analytics" },
    { id: "notifications", label: "Announcements", icon: "bell" },
  ];

  const nav = role === "coordinator" ? coordNav : studentNav;

  const pageContent = {
    dashboard: role === "coordinator" ? <CoordinatorDashboard /> : <StudentDashboard />,
    drives: <PlacementDrives />,
    applications: <Applications />,
    resume: <AIResumeAnalyzer />,
    ai: <AIAssistant />,
    interview: <InterviewPrep />,
    notifications: <Notifications />,
    analytics: <Analytics />,
  };

  const pageTitles = {
    dashboard: ["Dashboard", "Overview"],
    drives: ["Placement Drives", "Browse & apply"],
    applications: ["My Applications", "Track your journey"],
    resume: ["AI Resume Analyzer", "Improve your resume"],
    ai: ["AI Career Assistant", "Personalized guidance"],
    interview: ["Interview Prep", "Practice & improve"],
    notifications: ["Notifications", "Stay updated"],
    analytics: ["Analytics", "Placement insights"],
  };

  if (page === "landing") {
    return (
      <>
        <style>{CSS}</style>
        <LandingPage onEnter={() => setPage("app")} />
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="logo-icon">P</div>
            <div>
              <div className="logo-text">PlaceIQ</div>
              <div className="logo-sub">Campus Placement</div>
            </div>
          </div>

          {/* Role switcher */}
          <div style={{ display: "flex", gap: 4, marginBottom: 16, background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: 4 }}>
            {["student", "coordinator"].map(r => (
              <button key={r} className={`role-btn`} style={{ flex: 1, textAlign: "center", padding: "5px 6px", background: role === r ? "var(--indigo)" : "transparent", color: role === r ? "white" : "var(--text-muted)", border: "none", borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }} onClick={() => { setRole(r); setActivePage("dashboard"); }}>
                {r === "student" ? "Student" : "Coordinator"}
              </button>
            ))}
          </div>

          <div className="nav-section">
            <div className="nav-label">Menu</div>
            {nav.map(item => (
              <div key={item.id} className={`nav-item ${activePage === item.id ? "active" : ""}`} onClick={() => setActivePage(item.id)}>
                <Icon name={item.icon} size={16} />
                {item.label}
                {item.badge && <span className={`nav-badge ${item.badgeRed ? "red" : ""}`}>{item.badge}</span>}
              </div>
            ))}
          </div>

          <div className="sidebar-bottom">
            <div className="nav-item" onClick={() => setPage("landing")}>
              <Icon name="arrow" size={16} style={{ transform: "rotate(180deg)" }} />
              Back to Home
            </div>
            <div className="user-card">
              <div className="avatar">{role === "student" ? "AS" : "RC"}</div>
              <div>
                <div className="user-name">{role === "student" ? "Aryan Sharma" : "Riya Coordinator"}</div>
                <div className="user-role">{role === "student" ? "B.Tech CSE · 2025" : "Placement Cell"}</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="main">
          <div className="topbar">
            <div>
              <span className="topbar-title">{pageTitles[activePage]?.[0]}</span>
              <span className="topbar-subtitle">— {pageTitles[activePage]?.[1]}</span>
            </div>
            <div className="topbar-right">
              <div className="search-bar">
                <Icon name="search" size={14} />
                <input placeholder="Search…" />
              </div>
              <div className="icon-btn"><Icon name="bell" size={16} /></div>
              <div className="avatar sm">{role === "student" ? "AS" : "RC"}</div>
            </div>
          </div>

          <div className="content">
            {pageContent[activePage] || pageContent.dashboard}
          </div>
        </main>
      </div>
    </>
  );
}
