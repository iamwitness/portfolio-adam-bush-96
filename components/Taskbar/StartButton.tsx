"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { playSound } from "@/lib/sounds";
import siteConfig from "@/site.config";

interface MenuItem {
  label: string;
  icon: string;
  action: () => void;
  dividerAfter?: boolean;
}

export function StartButton() {
  const [open, setOpen] = useState(false);
  const { openWindow } = useWindowManager();
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => {
    setOpen((v) => !v);
    playSound("click");
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  const items: MenuItem[] = [
    {
      label: "About Me",
      icon: "/pro-pic.jpg",
      action: () => {
        openWindow({ contentType: "about", title: "About Me", icon: "/pro-pic.jpg" });
        setOpen(false);
      },
    },
    {
      label: "Contact",
      icon: "/icons/folder.webp",
      action: () => {
        openWindow({ contentType: "contact", title: "Contact", icon: "/icons/folder.webp" });
        setOpen(false);
      },
      dividerAfter: true,
    },
    {
      label: "GitHub",
      icon: "/icons/ie.webp",
      action: () => {
        window.open(siteConfig.github, "_blank");
        setOpen(false);
      },
    },
    {
      label: "LinkedIn",
      icon: "/icons/chrome.webp",
      action: () => {
        window.open(siteConfig.linkedin, "_blank");
        setOpen(false);
      },
    },
  ];

  return (
    <div style={{ position: "relative" }}>
      <button
        ref={btnRef}
        className={`win95-start-btn ${open ? "open" : ""}`}
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {/* Windows logo placeholder */}
        <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
          <rect x="0" y="0" width="6" height="6" fill="#FF0000" />
          <rect x="8" y="0" width="6" height="6" fill="#00FF00" />
          <rect x="0" y="8" width="6" height="6" fill="#0000FF" />
          <rect x="8" y="8" width="6" height="6" fill="#FFFF00" />
        </svg>
        <strong>Start</strong>
      </button>

      {open && (
        <div ref={menuRef} className="win95-start-menu" role="menu">
          {/* Sidebar */}
          <div className="win95-start-menu-sidebar">
            <span>{siteConfig.osName}</span>
          </div>

          {/* Menu items */}
          <div className="win95-start-menu-items">
            {items.map((item, i) => (
              <React.Fragment key={item.label}>
                <div
                  className="win95-start-menu-item"
                  role="menuitem"
                  onClick={item.action}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") item.action();
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.icon}
                    alt=""
                    width={16}
                    height={16}
                    style={{ imageRendering: "pixelated", flexShrink: 0 }}
                  />
                  {item.label}
                </div>
                {item.dividerAfter && (
                  <div className="win95-start-menu-divider" role="separator" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
