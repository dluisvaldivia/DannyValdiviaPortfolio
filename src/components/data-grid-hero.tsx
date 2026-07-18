import React, { useEffect, useRef, useCallback } from "react";

interface DataGridHeroProps {
  rows: number;
  cols: number;
  spacing: number;
  duration: number;
  color: string;
  animationType: "pulse" | "wave" | "random";
  pulseEffect: boolean;
  mouseGlow: boolean;
  opacityMin: number;
  opacityMax: number;
  background: string;
  children?: React.ReactNode;
}

export default function DataGridHero({
  rows,
  cols,
  spacing,
  duration,
  color,
  animationType,
  pulseEffect,
  mouseGlow,
  opacityMin,
  opacityMax,
  background,
  children,
}: DataGridHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<HTMLDivElement[]>([]);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Build grid cells
  useEffect(() => {
    const container = gridRef.current;
    if (!container) return;

    container.innerHTML = "";
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    container.style.gap = `${spacing}px`;

    cellsRef.current = [];
    const total = rows * cols;

    for (let i = 0; i < total; i++) {
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.style.backgroundColor = color;
      cell.style.setProperty("--opacity-min", String(opacityMin));
      cell.style.setProperty("--opacity-max", String(opacityMax));
      container.appendChild(cell);
      cellsRef.current.push(cell);
    }
  }, [rows, cols, spacing, color, opacityMin, opacityMax, mouseGlow]);

  const triggerRipple = useCallback(
    (originRow: number, originCol: number) => {
      const cells = cellsRef.current;
      if (!cells.length || prefersReducedMotion()) return;

      cells.forEach((cell, i) => {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const dist = Math.sqrt((r - originRow) ** 2 + (c - originCol) ** 2);
        const delay = dist * 0.06;

        cell.style.animation = "none";
        void cell.offsetWidth;
        cell.style.animation = `ripple-flash ${duration * 0.6}s ${delay.toFixed(3)}s ease-out forwards`;
      });
    },
    [cols, duration]
  );

  // Auto-ripple loop
  useEffect(() => {
    if (!pulseEffect || prefersReducedMotion()) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const fire = () => {
      let originRow: number;
      let originCol: number;

      if (animationType === "wave") {
        originRow = 0;
        originCol = 0;
      } else if (animationType === "random") {
        originRow = Math.floor(Math.random() * rows);
        originCol = Math.floor(Math.random() * cols);
      } else {
        originRow = Math.floor(rows / 2);
        originCol = Math.floor(cols / 2);
      }

      triggerRipple(originRow, originCol);
      timeoutId = setTimeout(fire, duration * 1000 + 800);
    };

    fire();
    return () => clearTimeout(timeoutId);
  }, [pulseEffect, animationType, rows, cols, duration, triggerRipple]);

  // Mouse glow + click-to-ripple
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const grid = gridRef.current;
    if (!wrapper || !grid) return;

    const handleClick = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const cellW = rect.width / cols;
      const cellH = rect.height / rows;
      const col = Math.floor((e.clientX - rect.left) / cellW);
      const row = Math.floor((e.clientY - rect.top) / cellH);
      triggerRipple(
        Math.max(0, Math.min(rows - 1, row)),
        Math.max(0, Math.min(cols - 1, col))
      );
    };

    wrapper.addEventListener("click", handleClick);

    return () => {
      wrapper.removeEventListener("click", handleClick);
    };
  }, [cols, rows, triggerRipple]);

  return (
    <div ref={wrapperRef} className="data-grid-hero" style={{ background }}>
      <div ref={gridRef} className="grid-container" aria-hidden="true" />
      <div className="hero-content" role="region" aria-label="Hero Content">
        {children}
      </div>
    </div>
  );
}
