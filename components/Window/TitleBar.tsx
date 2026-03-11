"use client";

import React from "react";
import Image from "next/image";

interface TitleBarProps {
  title: string;
  icon: string;
  isActive: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerMove: (e: React.PointerEvent<HTMLElement>) => void;
  onPointerUp: (e: React.PointerEvent<HTMLElement>) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onDoubleClick: () => void;
}

export function TitleBar({
  title,
  icon,
  isActive,
  isMaximized,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onMinimize,
  onMaximize,
  onClose,
  onDoubleClick,
}: TitleBarProps) {
  return (
    <div
      className={`win95-titlebar ${isActive ? "" : "inactive"}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={onDoubleClick}
      style={{ touchAction: "none" }}
    >
      {/* Icon */}
      <div style={{ width: 16, height: 16, flexShrink: 0, position: "relative" }}>
        <Image
          src={icon}
          alt=""
          fill
          sizes="16px"
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </div>

      {/* Title */}
      <span className="win95-titlebar-title">{title}</span>

      {/* Window controls */}
      <div style={{ display: "flex", gap: 3, marginLeft: 6 }}>
        {/* Minimize */}
        <button
          className="win95-titlebar-btn"
          onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          onPointerDown={(e) => e.stopPropagation()}
          title="Minimize"
          aria-label="Minimize"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <rect x="1.5" y="8.25" width="9" height="1.5" rx="0.75" fill="currentColor" />
          </svg>
        </button>

        {/* Maximize / Restore */}
        <button
          className="win95-titlebar-btn"
          onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          onPointerDown={(e) => e.stopPropagation()}
          title={isMaximized ? "Restore" : "Maximize"}
          aria-label={isMaximized ? "Restore" : "Maximize"}
        >
          {isMaximized ? (
            /* Restore: two overlapping squares */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="3.5" y="0.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" />
              <rect x="0.5" y="3.5" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.25" fill="rgba(255,255,255,0.0)" />
            </svg>
          ) : (
            /* Maximize: square with bold top bar */
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <rect x="1" y="1" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
              <rect x="1" y="1" width="10" height="3" rx="1" fill="currentColor" />
            </svg>
          )}
        </button>

        {/* Close */}
        <button
          className="win95-titlebar-btn btn-close"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          onPointerDown={(e) => e.stopPropagation()}
          title="Close"
          aria-label="Close"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <line x1="2" y1="2" x2="10" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="10" y1="2" x2="2" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
