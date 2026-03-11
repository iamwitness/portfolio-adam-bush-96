"use client";

import React, { useState } from "react";
import siteConfig from "@/site.config";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <div
      style={{
        padding: 24,
        fontFamily: "var(--win95-font)",
        fontSize: "var(--win95-font-size)",
        background: "var(--win95-window-bg)",
        maxWidth: 480,
      }}
    >
      <h1 style={{ fontSize: 14, fontWeight: "bold", marginBottom: 16 }}>
        Get in touch
      </h1>

      {sent ? (
        <div
          className="win95-inset"
          style={{ padding: 16, textAlign: "center" }}
        >
          <p>✓ Message sent! I&apos;ll get back to you soon.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span>Name</span>
            <input
              type="text"
              className="win95-inset"
              required
              style={{
                padding: "4px 6px",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                width: "100%",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span>Email</span>
            <input
              type="email"
              className="win95-inset"
              required
              style={{
                padding: "4px 6px",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                width: "100%",
              }}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span>Message</span>
            <textarea
              className="win95-inset"
              required
              rows={5}
              style={{
                padding: "4px 6px",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                resize: "vertical",
                width: "100%",
              }}
            />
          </label>

          <div style={{ display: "flex", gap: 8 }}>
            <button type="submit" className="win95-btn">
              Send Message
            </button>
            <a
              href={`mailto:${siteConfig.email}`}
              className="win95-btn"
              style={{ textDecoration: "none" }}
            >
              Email directly ↗
            </a>
          </div>
        </form>
      )}

      <div
        style={{
          marginTop: 24,
          paddingTop: 12,
          borderTop: "1px solid var(--win95-border-dark)",
          color: "var(--win95-text-disabled)",
          fontSize: "var(--win95-font-size)",
        }}
      >
        <p>{siteConfig.email}</p>
        <p>{siteConfig.location}</p>
      </div>
    </div>
  );
}
