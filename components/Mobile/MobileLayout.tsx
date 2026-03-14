"use client";

import React, { useState } from "react";
import portfolioDataRaw from "@/data/portfolio.json";
import type { PortfolioData } from "@/data/types";
import siteConfig from "@/site.config";
import { SectionRenderer } from "@/components/Portfolio/SectionRenderer";

const portfolioData = portfolioDataRaw as PortfolioData;

// ─── Expandable Card ──────────────────────────────────────────────────────────

function PortfolioCard({ item }: { item: PortfolioData["items"][number] }) {
  const [expanded, setExpanded] = useState(false);
  const { header, sections } = item.content;
  const heroSection = sections.find((s) => s.type === "hero-image");

  return (
    <div className="m-card">
      {heroSection && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={heroSection.src}
          alt={heroSection.alt ?? item.title}
          className="m-card-hero"
        />
      )}
      <div className="m-card-body">
        <h3 className="m-card-title">{header.title}</h3>
        <p className="m-card-subtitle">{header.subtitle}</p>
        <div className="m-tags">
          {header.tags.map((tag) => (
            <span key={tag} className="m-tag">
              {tag}
            </span>
          ))}
        </div>

        {expanded && (
          <div style={{ marginTop: 20 }}>
            {sections
              .filter((s) => s.type !== "hero-image")
              .map((section, i) => (
                <SectionRenderer key={i} section={section} />
              ))}
          </div>
        )}

        <button className="m-btn" onClick={() => setExpanded((v) => !v)}>
          {expanded ? "Show less" : "View case study"}
        </button>
      </div>
    </div>
  );
}

// ─── About Me (condensed) ─────────────────────────────────────────────────────

function AboutSection() {
  return (
    <div className="m-about">
      <div className="m-about-header">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={siteConfig.avatar}
          alt={siteConfig.name}
          className="m-about-avatar"
        />
        <div>
          <h3 className="m-about-name">{siteConfig.name}</h3>
          <p className="m-about-title">{siteConfig.title}</p>
          <p className="m-about-location">{siteConfig.location}</p>
        </div>
      </div>

      <div className="m-about-stats">
        <div className="m-stat">
          <span className="m-stat-value">$5.6B+</span>
          <span className="m-stat-label">Volume Designed</span>
        </div>
        <div className="m-stat">
          <span className="m-stat-value">50+</span>
          <span className="m-stat-label">Shipped Features</span>
        </div>
        <div className="m-stat">
          <span className="m-stat-value">24K+</span>
          <span className="m-stat-label">Monthly Users</span>
        </div>
      </div>

      <p className="m-about-bio">
        Design Lead at Parcl. I build intelligent design systems and product
        experiences at the intersection of fintech, real estate, and DeFi. I
        don&apos;t just push pixels — I write production code, architect
        component libraries, and ship features end-to-end.
      </p>

      <div className="m-about-links">
        <a
          href={siteConfig.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="m-btn-outline"
        >
          LinkedIn
        </a>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="m-btn-outline"
        >
          GitHub
        </a>
        <a
          href={siteConfig.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="m-btn-outline"
        >
          Resume
        </a>
      </div>
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export function MobileLayout() {
  return (
    <div className="m-layout">
      {/* ── Welcome hero ──────────────────────────────────────────── */}
      <div className="m-hero">
        <p className="m-hero-label">Welcome to my portfolio</p>
        <h1 className="m-hero-heading">I am the designer that builds.</h1>
        <p className="m-hero-sub">
          Design Lead at Parcl &middot; {siteConfig.location}
        </p>

        {/* Quick nav */}
        <div className="m-hero-nav">
          <a href="#portfolio" className="m-hero-btn">
            View Work
          </a>
        </div>
      </div>

      {/* ── About ─────────────────────────────────────────────────── */}
      <div className="m-section">
        <h2 className="m-section-title">About Me</h2>
        <AboutSection />
      </div>

      {/* ── Portfolio ─────────────────────────────────────────────── */}
      <div id="portfolio" className="m-section">
        <h2 className="m-section-title">Selected Work</h2>
        {portfolioData.items.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="m-footer">
        <p>
          {siteConfig.osName} &middot; {siteConfig.email}
        </p>
      </div>

      {/* Spacer for fixed toggle button */}
      <div style={{ height: 80 }} />
    </div>
  );
}
