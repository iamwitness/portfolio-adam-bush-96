"use client";

import React from "react";

const DELETED_ITEMS = [
  {
    name: "first_portfolio_2019.psd",
    size: "142 MB",
    deleted: "3/14/2020",
    note: "Included a Comic Sans logo. Never speak of this.",
  },
  {
    name: "uber_redesign_concept.fig",
    size: "88 MB",
    deleted: "6/2/2021",
    note: "Spent 40 hours on this. Uber launched the opposite.",
  },
  {
    name: "my_app_idea.txt",
    size: "2 KB",
    deleted: "1/1/2022",
    note: "Just said 'Uber for dogs' 14 times.",
  },
  {
    name: "freelance_client_project_FINAL_v3_REAL_FINAL.psd",
    size: "234 MB",
    deleted: "8/19/2022",
    note: "The client said they 'just needed a small change'.",
  },
  {
    name: "dark_mode_is_overrated.doc",
    size: "12 KB",
    deleted: "4/1/2023",
    note: "I was wrong. Dark mode rules. Deleted out of shame.",
  },
];

export function RecycleBin() {
  return (
    <div style={{ background: "var(--win95-window-bg)", height: "100%" }}>
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          padding: "4px 8px",
          borderBottom: "1px solid var(--win95-border-dark)",
          background: "var(--win95-chrome)",
        }}
      >
        <button className="win95-btn" disabled style={{ color: "var(--win95-text-disabled)" }}>
          Empty Recycle Bin
        </button>
        <button className="win95-btn" disabled style={{ color: "var(--win95-text-disabled)" }}>
          Restore All
        </button>
      </div>

      {/* File list */}
      <div>
        {/* Header row */}
        <div
          className="win95-raised"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 80px 100px",
            padding: "2px 8px",
            fontFamily: "var(--win95-font)",
            fontSize: "var(--win95-font-size)",
            fontWeight: "bold",
            background: "var(--win95-chrome)",
          }}
        >
          <span>Name</span>
          <span>Size</span>
          <span>Date Deleted</span>
        </div>

        {DELETED_ITEMS.map((item, i) => (
          <div key={i}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 80px 100px",
                padding: "3px 8px",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                background: i % 2 === 0 ? "var(--win95-window-bg)" : "#f8f8f8",
                borderBottom: "1px solid #eee",
                cursor: "default",
              }}
              title={item.note}
            >
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>🗑️</span>
                {item.name}
              </span>
              <span style={{ color: "var(--win95-text-disabled)" }}>{item.size}</span>
              <span style={{ color: "var(--win95-text-disabled)" }}>{item.deleted}</span>
            </div>
            <div
              style={{
                padding: "2px 8px 6px 30px",
                fontFamily: "var(--win95-font)",
                fontSize: "var(--win95-font-size)",
                color: "var(--win95-text-disabled)",
                fontStyle: "italic",
                background: i % 2 === 0 ? "var(--win95-window-bg)" : "#f8f8f8",
              }}
            >
              {item.note}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          padding: "8px 12px",
          fontFamily: "var(--win95-font)",
          fontSize: "var(--win95-font-size)",
          color: "var(--win95-text-disabled)",
          borderTop: "1px solid var(--win95-border-dark)",
          marginTop: 8,
        }}
      >
        {DELETED_ITEMS.length} object(s) · None of these are coming back.
      </div>
    </div>
  );
}
