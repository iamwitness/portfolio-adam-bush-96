"use client";

import React, { useCallback, useState, useEffect, useRef } from "react";
import { WindowState } from "@/context/WindowManager";
import { useWindowManager } from "@/hooks/useWindowManager";
import { useDraggable } from "@/hooks/useDraggable";
import { useResizable } from "@/hooks/useResizable";
import { TitleBar } from "./TitleBar";
import { ResizeHandles } from "./ResizeHandles";
import { BREAKPOINTS, TASKBAR_HEIGHT } from "@/lib/constants";
import { PortfolioViewer } from "@/components/Portfolio/PortfolioViewer";
import { AboutMe } from "@/components/Apps/AboutMe";
import { ContactForm } from "@/components/Apps/ContactForm";
import { RecycleBin } from "@/components/Apps/RecycleBin";
import { MyComputer } from "@/components/Apps/MyComputer";
import { Welcome } from "@/components/Apps/Welcome";
import { Music } from "@/components/Apps/Music";

interface AppWindowProps {
  window: WindowState;
}

export function AppWindow({ window: win }: AppWindowProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    moveWindow,
    resizeWindow,
    state,
  } = useWindowManager();

  const isActive = state.activeWindowId === win.id;

  // Close animation: intercept close, play animation, then remove
  const [isClosing, setIsClosing] = useState(false);
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => closeWindow(win.id), 95);
  }, [closeWindow, win.id]);

  // Maximize transition: add CSS transition class briefly when maximized state toggles
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevMaximized = useRef(win.maximized);
  useEffect(() => {
    if (prevMaximized.current !== win.maximized) {
      setIsTransitioning(true);
      const t = setTimeout(() => setIsTransitioning(false), 210);
      prevMaximized.current = win.maximized;
      return () => clearTimeout(t);
    }
  }, [win.maximized]);

  const handleMove = useCallback(
    (pos: { x: number; y: number }) => moveWindow(win.id, pos),
    [moveWindow, win.id]
  );

  const handleResize = useCallback(
    (size: { width: number; height: number }, pos?: { x: number; y: number }) =>
      resizeWindow(win.id, size, pos),
    [resizeWindow, win.id]
  );

  const handleFocus = useCallback(
    () => focusWindow(win.id),
    [focusWindow, win.id]
  );

  const isMobile =
    typeof window !== "undefined" && window.innerWidth < BREAKPOINTS.mobile;

  const draggableBounds = isMobile
    ? {
        windowWidth: win.size.width,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        taskbarHeight: TASKBAR_HEIGHT,
        titleBarHeight: 28,
      }
    : undefined;

  const resizableMaxSize = isMobile
    ? {
        width: window.innerWidth,
        height: window.innerHeight - TASKBAR_HEIGHT,
      }
    : undefined;

  const { handlePointerDown, handlePointerMove, handlePointerUp } = useDraggable({
    position: win.position,
    onMove: handleMove,
    onFocus: handleFocus,
    disabled: win.maximized,
    bounds: draggableBounds,
  });

  const { handleResizeStart, handleResizeMove, handleResizeEnd } = useResizable({
    position: win.position,
    size: win.size,
    minSize: win.minSize,
    maxSize: resizableMaxSize,
    onResize: handleResize,
    onFocus: handleFocus,
    disabled: win.maximized,
  });

  if (win.minimized) return null;

  const classes = [
    "win95-window",
    isClosing ? "window-closing" : "",
    isTransitioning ? "window-maximizing" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={classes}
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      }}
      onPointerDown={handleFocus}
    >
      {/* Resize handles — only when not maximized */}
      {!win.maximized && (
        <ResizeHandles
          onResizeStart={handleResizeStart}
          onResizeMove={handleResizeMove}
          onResizeEnd={handleResizeEnd}
        />
      )}

      {/* Title bar */}
      <TitleBar
        title={win.title}
        icon={win.icon}
        isActive={isActive}
        isMaximized={win.maximized}
        isMinimized={win.minimized}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMinimize={() => minimizeWindow(win.id)}
        onMaximize={() => maximizeWindow(win.id)}
        onClose={handleClose}
        onDoubleClick={() => maximizeWindow(win.id)}
      />

      {/* Divider */}
      <div style={{ height: 1, background: "rgba(0,0,0,0.08)", flexShrink: 0 }} />

      {/* Content area */}
      <div
        className="win95-scrollable"
        style={{
          flex: 1,
          background: "var(--win95-window-bg)",
          overflow: "auto",
          position: "relative",
        }}
      >
        <WindowContent window={win} />
      </div>
    </div>
  );
}

function WindowContent({ window: win }: { window: WindowState }) {
  switch (win.contentType) {
    case "portfolio":
      return <PortfolioViewer contentId={win.contentId ?? ""} />;
    case "welcome":
      return <Welcome />;
    case "about":
      return <AboutMe />;
    case "contact":
      return <ContactForm />;
    case "recycle-bin":
      return <RecycleBin />;
    case "my-computer":
      return <MyComputer />;
    case "music":
      return <Music />;
    default:
      return <div style={{ padding: 16 }}>Unknown content type.</div>;
  }
}
