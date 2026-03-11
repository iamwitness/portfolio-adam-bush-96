"use client";

import React from "react";
import Image from "next/image";
import siteConfig from "@/site.config";

const S = {
  root: {
    fontFamily: "var(--font-body)",
    fontSize: 14,
    lineHeight: 1.75,
    background: "var(--win95-window-bg)",
    color: "var(--win95-text)",
    overflowY: "auto" as const,
    height: "100%",
  },
  inner: {
    padding: 28,
    maxWidth: 640,
    margin: "0 auto",
  },
  // ── Header ──────────────────────────────────────────────────
  header: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottom: "1px solid rgba(0,0,0,0.08)",
  },
  avatar: {
    width: 88,
    height: 88,
    flexShrink: 0,
    position: "relative" as const,
    border: "2px solid var(--win95-border-dark)",
    boxShadow: "inset 1px 1px 0 var(--win95-border-light), 0 2px 8px rgba(0,0,0,0.12)",
    overflow: "hidden",
    borderRadius: 4,
  },
  headerText: { flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: "-0.01em",
    marginBottom: 2,
    lineHeight: 1.2,
  },
  title: {
    fontSize: 13,
    color: "var(--win95-text-disabled)",
    marginBottom: 6,
    lineHeight: 1.4,
  },
  location: {
    fontSize: 12,
    color: "var(--win95-text-disabled)",
    marginBottom: 12,
  },
  ctaRow: { display: "flex", gap: 6, flexWrap: "wrap" as const },
  // ── TL;DR ────────────────────────────────────────────────────
  tldr: {
    background: "rgba(0,0,128,0.05)",
    border: "1px solid rgba(0,0,128,0.18)",
    borderRadius: 4,
    padding: "12px 16px",
    marginBottom: 24,
    fontSize: 13,
    lineHeight: 1.65,
  },
  tldrLabel: {
    fontWeight: 700,
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "var(--win95-titlebar)",
    textTransform: "uppercase" as const,
    marginBottom: 4,
  },
  tldrLead: {
    fontWeight: 700,
    fontSize: 15,
    color: "var(--win95-titlebar)",
    marginBottom: 6,
    display: "block",
    letterSpacing: "-0.01em",
  },
  // ── Sections ─────────────────────────────────────────────────
  section: {
    marginBottom: 24,
    paddingBottom: 24,
    borderBottom: "1px solid rgba(0,0,0,0.07)",
  },
  sectionLast: { marginBottom: 0, paddingBottom: 0, borderBottom: "none" },
  sectionHeader: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "var(--win95-text-disabled)",
    marginBottom: 14,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    background: "rgba(0,0,0,0.08)",
  },
  // ── Experience ───────────────────────────────────────────────
  jobHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 4,
    flexWrap: "wrap" as const,
  },
  jobTitle: { fontWeight: 700, fontSize: 14 },
  jobMeta: {
    fontSize: 12,
    color: "var(--win95-text-disabled)",
    textAlign: "right" as const,
    lineHeight: 1.5,
    flexShrink: 0,
  },
  jobSubtitle: {
    fontSize: 12,
    color: "var(--win95-text-disabled)",
    marginBottom: 10,
  },
  bullet: {
    display: "flex",
    gap: 8,
    marginBottom: 7,
    fontSize: 13,
    lineHeight: 1.65,
  },
  bulletDot: {
    color: "var(--win95-titlebar)",
    flexShrink: 0,
    marginTop: 2,
    fontWeight: 700,
  },
  jobSpacer: { marginBottom: 20 },
  // ── Skills ───────────────────────────────────────────────────
  skillGroup: { marginBottom: 12 },
  skillGroupLabel: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 6,
    color: "var(--win95-text)",
  },
  tagRow: { display: "flex", flexWrap: "wrap" as const, gap: 5 },
  tag: {
    background: "rgba(0,0,0,0.05)",
    border: "1px solid rgba(0,0,0,0.10)",
    borderRadius: 3,
    padding: "3px 9px",
    fontSize: 12,
    lineHeight: 1.4,
    color: "var(--win95-text)",
  },
  // ── Stats ─────────────────────────────────────────────────────
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 10,
    marginBottom: 16,
  },
  stat: {
    background: "rgba(0,0,128,0.05)",
    border: "1px solid rgba(0,0,128,0.14)",
    borderRadius: 4,
    padding: "10px 12px",
    textAlign: "center" as const,
  },
  statValue: { fontSize: 16, fontWeight: 700, color: "var(--win95-titlebar)", lineHeight: 1.2 },
  statLabel: { fontSize: 11, color: "var(--win95-text-disabled)", marginTop: 2 },
  // ── Quote ────────────────────────────────────────────────────
  quote: {
    fontStyle: "italic",
    fontSize: 13,
    color: "var(--win95-text-disabled)",
    borderLeft: "3px solid var(--win95-titlebar)",
    paddingLeft: 12,
    lineHeight: 1.65,
  },
};

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span style={S.tag}>{children}</span>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <div style={S.sectionHeader}>
    {children}
    <div style={S.sectionDivider} />
  </div>
);

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <div style={S.bullet}>
    <span style={S.bulletDot}>›</span>
    <span>{children}</span>
  </div>
);

export function AboutMe() {
  return (
    <div className="win95-scrollable" style={S.root}>
      <div style={S.inner}>

        {/* ── Header ── */}
        <div style={S.header}>
          <div style={S.avatar}>
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.name}
              fill
              sizes="88px"
              style={{ objectFit: "cover", objectPosition: "center top" }}
              unoptimized
            />
          </div>
          <div style={S.headerText}>
            <div style={S.name}>{siteConfig.name}</div>
            <div style={S.title}>Design Lead @ Parcl | I Build Intelligent Design Systems | AI Consulting | UI Eng</div>
            <div style={S.location}>Naples, FL · adamchrisbush@gmail.com · 440-708-8593</div>
            <div style={S.ctaRow}>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn"
                style={{ textDecoration: "none", fontSize: 12, padding: "4px 12px", minHeight: 28 }}
              >
                LinkedIn ↗
              </a>
              <a
                href={siteConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="win95-btn"
                style={{ textDecoration: "none", fontSize: 12, padding: "4px 12px", minHeight: 28 }}
              >
                Resume PDF ↗
              </a>
            </div>
          </div>
        </div>

        {/* ── TL;DR ── */}
        <div style={S.tldr}>
          <div style={S.tldrLabel}>TL;DR</div>
          <span style={S.tldrLead}>I am the Designer that builds.</span>
          Simplicity is my style. I make intricate experiences as easy as they are elegant. Specialized in building and scaling design systems that bridge design and engineering — translating complexity into clarity and measurable growth.
        </div>

        {/* ── Impact Stats ── */}
        <div style={{ ...S.section }}>
          <SectionHeading>Impact at a Glance</SectionHeading>
          <div style={S.statsRow}>
            <div style={S.stat}>
              <div style={S.statValue}>$5.6B+</div>
              <div style={S.statLabel}>Trading Volume</div>
            </div>
            <div style={S.stat}>
              <div style={S.statValue}>50+</div>
              <div style={S.statLabel}>Products Shipped</div>
            </div>
            <div style={S.stat}>
              <div style={S.statValue}>24K+</div>
              <div style={S.statLabel}>Monthly Active Users</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: "var(--win95-text-disabled)" }}>
            6+ years leading design across SaaS, Web3, FinTech, healthcare, and e-commerce. Cut design-engineering handoff time by 80% with an automated design-to-code pipeline, and design iteration time by 60%+ for enterprise clients.
          </p>
        </div>

        {/* ── Experience ── */}
        <div style={S.section}>
          <SectionHeading>Experience</SectionHeading>

          <div style={S.jobSpacer}>
            <div style={S.jobHeader}>
              <div style={S.jobTitle}>Lead Product Designer — Parcl</div>
              <div style={S.jobMeta}>Jun 2022 – Present<br />Remote · FinTech / Real Estate</div>
            </div>
            <Bullet>
              Architected Parcl&apos;s unified multi-brand design system powering both <strong>app.parcl.co</strong> (DeFi perpetuals: $5.6B+ total volume, $25M+ TVL, 700K+ point participants, 24K+ MAU) and <strong>parcl.co</strong> (consumer real estate investing platform) — with advanced theming, WCAG accessibility, and tokenized component architecture.
            </Bullet>
            <Bullet>
              Translated complex DeFi mechanics into intuitive, high-performing UX driving adoption across institutional traders, retail investors, and automated bot users.
            </Bullet>
            <Bullet>
              Engineered an automated design-to-code pipeline leveraging <strong>Figma Tokens, Tailwind, and Cursor</strong> to generate production-ready React components with full visual parity — cutting handoff time by <strong>80%</strong> and creating a shared design language across FE and BE teams.
            </Bullet>
            <Bullet>
              Partnered cross-functionally with founders, PMs, and engineers to shape product strategy, evolve brand systems, and launch ecosystem features aligned with long-term liquidity and growth objectives.
            </Bullet>
          </div>

          <div>
            <div style={S.jobHeader}>
              <div style={S.jobTitle}>Lead UX/UI & Product Design Consultant</div>
              <div style={S.jobMeta}>Oct 2019 – Jun 2022<br />Nashville, TN · Contract</div>
            </div>
            <div style={S.jobSubtitle}>Atiba Agency & Independent — SaaS, Healthcare, Logistics, Public Sector</div>
            <Bullet>
              Led end-to-end design for <strong>45+ web and mobile products</strong> across industries — owning discovery, IA, prototyping, delivery, and launch.
            </Bullet>
            <Bullet>
              Built scalable enterprise-grade design systems for <strong>Johnson Controls, Fortified Data, Hashed Health, and RJ Young</strong> — cutting design iteration time by <strong>60%+</strong> via atomic architecture and reusable component libraries.
            </Bullet>
            <Bullet>
              Modernized legacy products through front-end design and implementation, driving accessibility, usability, and engineering efficiency.
            </Bullet>
            <Bullet>
              Drove digital transformation initiatives by aligning user research, business KPIs, and UX strategy to deliver measurable ROI and long-term product adoption.
            </Bullet>
          </div>
        </div>

        {/* ── Skills ── */}
        <div style={S.section}>
          <SectionHeading>Skills</SectionHeading>

          <div style={S.skillGroup}>
            <div style={S.skillGroupLabel}>Design & Systems</div>
            <div style={S.tagRow}>
              {["Product Design", "UX/UI Strategy", "Design System Architecture", "Design Tokenization", "Accessibility (WCAG)", "Information Architecture", "Rapid Prototyping"].map(s => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>

          <div style={S.skillGroup}>
            <div style={S.skillGroupLabel}>Leadership & Strategy</div>
            <div style={S.tagRow}>
              {["Cross-Functional Collaboration", "Systems Thinking", "Growth & Brand Strategy", "Product-Led Design", "Mentoring Designers"].map(s => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>

          <div style={S.skillGroup}>
            <div style={S.skillGroupLabel}>Technical</div>
            <div style={S.tagRow}>
              {["Cursor", "Claude Code", "Figma", "Figma Tokens", "Tailwind CSS", "React", "TypeScript", "Framer", "Framer Motion", "Storybook", "Webflow", "Notion", "GitHub"].map(s => <Tag key={s}>{s}</Tag>)}
            </div>
          </div>
        </div>

        {/* ── Education & Speaking ── */}
        <div style={S.section}>
          <SectionHeading>Education & Recognition</SectionHeading>
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>B.S. Interactive Media Studies & Entrepreneurship</div>
            <div style={{ fontSize: 12, color: "var(--win95-text-disabled)" }}>Miami University · Oxford, OH</div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>Work Featured In</div>
            <div style={{ fontSize: 12, color: "var(--win95-text-disabled)", lineHeight: 1.8 }}>
              SQL Bits Conference (2022) · Breakpoint (2022, 2023, 2024)
            </div>
          </div>
        </div>

        {/* ── Philosophy ── */}
        <div style={S.sectionLast}>
          <SectionHeading>Philosophy</SectionHeading>
          <blockquote style={S.quote}>
            Design, at its core, is alchemy — turning the mundane into the magnetic. I don&apos;t just craft visuals; I weave ideas into experiences that captivate, provoke, and endure. Simplicity isn&apos;t just elegant — it&apos;s the secret weapon that makes every design profoundly effective.
          </blockquote>
        </div>

      </div>
    </div>
  );
}
