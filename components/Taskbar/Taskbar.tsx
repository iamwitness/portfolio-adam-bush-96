"use client";

import React, { useCallback } from "react";
import { useWindowManager } from "@/hooks/useWindowManager";
import { StartButton } from "./StartButton";
import { TaskbarItem } from "./TaskbarItem";
import { TaskbarClock } from "./TaskbarClock";

export function Taskbar() {
  const { state, focusWindow, minimizeWindow } = useWindowManager();

  const handleItemClick = useCallback(
    (id: string) => {
      const win = state.windows.find((w) => w.id === id);
      if (!win) return;

      if (win.minimized) {
        focusWindow(id);
      } else if (state.activeWindowId === id) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    },
    [state, focusWindow, minimizeWindow]
  );

  return (
    <div className="win95-taskbar" role="toolbar" aria-label="Taskbar">
      {/* Start button */}
      <StartButton />

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 20,
          background: "var(--win95-border-dark)",
          marginRight: 2,
          flexShrink: 0,
        }}
      />
      <div
        style={{
          width: 1,
          height: 20,
          background: "var(--win95-border-light)",
          marginRight: 4,
          flexShrink: 0,
        }}
      />

      {/* Window buttons */}
      <div
        style={{
          flex: 1,
          display: "flex",
          gap: 4,
          overflow: "hidden",
          flexWrap: "nowrap",
        }}
      >
        {state.windows.map((win) => (
          <TaskbarItem
            key={win.id}
            window={win}
            isActive={state.activeWindowId === win.id && !win.minimized}
            onClick={() => handleItemClick(win.id)}
          />
        ))}
      </div>

      {/* Clock */}
      <TaskbarClock />
    </div>
  );
}
