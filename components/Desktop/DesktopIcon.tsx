"use client";

import React, { useRef, useCallback, useState } from "react";
import Image from "next/image";
import { useWindowManager } from "@/hooks/useWindowManager";
import { ContentType } from "@/context/WindowManager";

export interface DesktopIconConfig {
  id: string;
  label: string;
  icon: string;
  contentType: ContentType;
  contentId?: string;
  defaultSize?: { width: number; height: number };
  minSize?: { width: number; height: number };
}

interface DesktopIconProps {
  config: DesktopIconConfig;
}

const DOUBLE_CLICK_DELAY = 300;
const DRAG_THRESHOLD = 8;

export function DesktopIcon({ config }: DesktopIconProps) {
  const { openWindow, selectIcon, state } = useWindowManager();
  const lastClickRef = useRef<number>(0);
  const isSelected = state.selectedIconId === config.id;

  // Drag state
  const iconRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const isPressing = useRef(false);
  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const startPointer = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef({ x: 0, y: 0 });

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.stopPropagation();

    const rect = iconRef.current!.getBoundingClientRect();
    const currentPos = pos ?? { x: rect.left, y: rect.top };

    isPressing.current = true;
    isDragging.current = false;
    hasDragged.current = false;
    startPointer.current = { x: e.clientX, y: e.clientY };
    dragOffset.current = {
      x: e.clientX - currentPos.x,
      y: e.clientY - currentPos.y,
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  }, [pos]);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing.current) return;

    const dx = e.clientX - startPointer.current.x;
    const dy = e.clientY - startPointer.current.y;

    // Only commit to drag once threshold is crossed
    if (!isDragging.current) {
      if (Math.sqrt(dx * dx + dy * dy) < DRAG_THRESHOLD) return;
      isDragging.current = true;
      hasDragged.current = true;
    }

    e.preventDefault();
    pendingPos.current = {
      x: e.clientX - dragOffset.current.x,
      y: e.clientY - dragOffset.current.y,
    };

    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(() => {
        setPos({ ...pendingPos.current });
        rafRef.current = null;
      });
    }
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPressing.current) return;
    isPressing.current = false;
    isDragging.current = false;
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      setPos({ ...pendingPos.current });
    }
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasDragged.current) {
        hasDragged.current = false;
        return;
      }
      const now = Date.now();
      const elapsed = now - lastClickRef.current;
      lastClickRef.current = now;

      if (elapsed < DOUBLE_CLICK_DELAY) {
        openWindow({
          contentType: config.contentType,
          contentId: config.contentId,
          title: config.label,
          icon: config.icon,
          defaultSize: config.defaultSize,
          minSize: config.minSize,
        });
        selectIcon(null);
      } else {
        selectIcon(config.id);
      }
    },
    [config, openWindow, selectIcon]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        openWindow({
          contentType: config.contentType,
          contentId: config.contentId,
          title: config.label,
          icon: config.icon,
          defaultSize: config.defaultSize,
          minSize: config.minSize,
        });
      }
    },
    [config, openWindow]
  );

  return (
    <div
      ref={iconRef}
      className={`win95-desktop-icon ${isSelected ? "selected" : ""}`}
      style={pos ? {
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 8500,
        cursor: isDragging.current ? "grabbing" : "default",
      } : undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${config.label}`}
    >
      <div style={{ width: 48, height: 48, position: "relative", flexShrink: 0 }}>
        <Image
          src={config.icon}
          alt={config.label}
          fill
          sizes="48px"
          style={{ objectFit: "contain" }}
          unoptimized
        />
      </div>
      <span className="win95-icon-label">{config.label}</span>
    </div>
  );
}
