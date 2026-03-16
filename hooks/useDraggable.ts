"use client";

import { useCallback, useRef } from "react";

interface DraggableBounds {
  windowWidth: number;
  viewportWidth: number;
  viewportHeight: number;
  taskbarHeight: number;
  titleBarHeight: number;
}

interface UseDraggableOptions {
  position: { x: number; y: number };
  onMove: (pos: { x: number; y: number }) => void;
  onFocus?: () => void;
  disabled?: boolean;
  bounds?: DraggableBounds;
}

function clampDragPosition(
  x: number,
  y: number,
  bounds: DraggableBounds
): { x: number; y: number } {
  const VISIBLE = 80;
  return {
    x: Math.max(
      -(bounds.windowWidth - VISIBLE),
      Math.min(x, bounds.viewportWidth - VISIBLE)
    ),
    y: Math.max(
      0,
      Math.min(y, bounds.viewportHeight - bounds.taskbarHeight - bounds.titleBarHeight)
    ),
  };
}

export function useDraggable({
  position,
  onMove,
  onFocus,
  disabled = false,
  bounds,
}: UseDraggableOptions) {
  const dragging = useRef(false);
  const offsetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const pendingPos = useRef(position);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (disabled) return;
      if (e.button !== 0) return;

      onFocus?.();

      dragging.current = true;
      offsetRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };

      e.currentTarget.setPointerCapture(e.pointerId);
      e.preventDefault();
    },
    [disabled, position, onFocus]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!dragging.current) return;
      e.preventDefault();

      const rawX = e.clientX - offsetRef.current.x;
      const rawY = e.clientY - offsetRef.current.y;
      pendingPos.current = bounds
        ? clampDragPosition(rawX, rawY, bounds)
        : { x: rawX, y: rawY };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          onMove(pendingPos.current);
          rafRef.current = null;
        });
      }
    },
    [onMove, bounds]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (!dragging.current) return;
      dragging.current = false;
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        onMove(pendingPos.current);
      }
    },
    [onMove]
  );

  return { handlePointerDown, handlePointerMove, handlePointerUp };
}
