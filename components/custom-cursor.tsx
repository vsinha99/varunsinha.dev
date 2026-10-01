"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mediaQuery.matches || navigator.maxTouchPoints > 0) return;

    const cursor = cursorRef.current;
    cursor?.setAttribute("data-active", "true");

    let isVisible = false;

    const handleMove = (event: MouseEvent) => {
      dotRef.current?.style.setProperty(
        "transform",
        `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate3d(-50%, -50%, 0)`,
      );

      if (!isVisible) {
        isVisible = true;
        dotRef.current?.setAttribute("data-visible", "true");
      }
    };

    const interactiveSelector = "a, button, [role='button']";
    const updateInteractiveState = (target: EventTarget | null) => {
      const isInteractive =
        target instanceof Element && Boolean(target.closest(interactiveSelector));

      if (isInteractive) {
        cursor?.setAttribute("data-interactive", "true");
      } else {
        cursor?.removeAttribute("data-interactive");
      }
    };
    const handlePointerOver = (event: PointerEvent) => updateInteractiveState(event.target);
    const handlePointerOut = (event: PointerEvent) => updateInteractiveState(event.relatedTarget);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("pointerover", handlePointerOver, { passive: true });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("pointerover", handlePointerOver);
      window.removeEventListener("pointerout", handlePointerOut);
      cursor?.removeAttribute("data-active");
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor" aria-hidden="true">
      <div ref={dotRef} className="custom-cursor-dot" />
    </div>
  );
}
