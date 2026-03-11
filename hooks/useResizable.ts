"use client";

import { useCallback, useRef } from "react";

export type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface ResizeState {
  direction: ResizeDirection;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startLeft: number;
  startTop: number;
}

interface UseResizableOptions {
  position: { x: number; y: number };
  size: { width: number; height: number };
  minSize: { width: number; height: number };
  onResize: (
    size: { width: number; height: number },
    position?: { x: number; y: number }
  ) => void;
  onFocus?: () => void;
  disabled?: boolean;
}

export function useResizable({
  position,
  size,
  minSize,
  onResize,
  onFocus,
  disabled = false,
}: UseResizableOptions) {
  const resizing = useRef<ResizeState | null>(null);
  const rafRef = useRef<number | null>(null);
  const pendingRef = useRef<{
    size: { width: number; height: number };
    position?: { x: number; y: number };
  } | null>(null);

  const handleResizeStart = useCallback(
    (e: React.PointerEvent<HTMLElement>, direction: ResizeDirection) => {
      if (disabled) return;
      if (e.button !== 0) return;
      onFocus?.();

      resizing.current = {
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: size.width,
        startHeight: size.height,
        startLeft: position.x,
        startTop: position.y,
      };

      e.currentTarget.setPointerCapture(e.pointerId);
      e.preventDefault();
      e.stopPropagation();
    },
    [disabled, size, position, onFocus]
  );

  const handleResizeMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!resizing.current) return;
      e.preventDefault();

      const rs = resizing.current;
      const dx = e.clientX - rs.startX;
      const dy = e.clientY - rs.startY;
      const dir = rs.direction;

      let newWidth = rs.startWidth;
      let newHeight = rs.startHeight;
      let newLeft = rs.startLeft;
      let newTop = rs.startTop;

      if (dir.includes("e")) newWidth = Math.max(rs.startWidth + dx, minSize.width);
      if (dir.includes("s")) newHeight = Math.max(rs.startHeight + dy, minSize.height);
      if (dir.includes("w")) {
        const clamped = Math.min(dx, rs.startWidth - minSize.width);
        newWidth = rs.startWidth - clamped;
        newLeft = rs.startLeft + clamped;
      }
      if (dir.includes("n")) {
        const clamped = Math.min(dy, rs.startHeight - minSize.height);
        newHeight = rs.startHeight - clamped;
        newTop = rs.startTop + clamped;
      }

      const hasPosition =
        dir.includes("w") || dir.includes("n");

      pendingRef.current = {
        size: { width: newWidth, height: newHeight },
        position: hasPosition ? { x: newLeft, y: newTop } : undefined,
      };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          if (pendingRef.current) {
            onResize(pendingRef.current.size, pendingRef.current.position);
          }
          rafRef.current = null;
        });
      }
    },
    [minSize, onResize]
  );

  const handleResizeEnd = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!resizing.current) return;
      resizing.current = null;
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        if (pendingRef.current) {
          onResize(pendingRef.current.size, pendingRef.current.position);
          pendingRef.current = null;
        }
      }
    },
    [onResize]
  );

  return { handleResizeStart, handleResizeMove, handleResizeEnd };
}
