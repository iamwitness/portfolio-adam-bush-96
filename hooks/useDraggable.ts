"use client";

import { useCallback, useRef } from "react";

interface UseDraggableOptions {
  position: { x: number; y: number };
  onMove: (pos: { x: number; y: number }) => void;
  onFocus?: () => void;
  disabled?: boolean;
}

export function useDraggable({
  position,
  onMove,
  onFocus,
  disabled = false,
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

      pendingPos.current = {
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      };

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(() => {
          onMove(pendingPos.current);
          rafRef.current = null;
        });
      }
    },
    [onMove]
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
