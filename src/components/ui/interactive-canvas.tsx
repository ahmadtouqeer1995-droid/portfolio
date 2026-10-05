import { useEffect, useRef } from 'react';

// 21st.dev "Interactive Canvas" by designali-in: a full-screen dot grid on a
// canvas; dots near the cursor grow and lean toward it. Adapted: dots placed
// by spacing instead of a fixed 120x120 count (far fewer to draw), drawn in
// CSS pixels with one setTransform (the original compounded ctx.scale on
// every resize), rebuilt on resize, the animation loop cancelled on unmount,
// a single static frame under prefers-reduced-motion, and white/grey colors.

interface InteractiveCanvasProps {
  /** Distance between dots, px. */
  spacing?: number;
  dotColor?: string;
  backgroundColor?: string;
  /** Base dot radius, px. */
  dotRadius?: number;
  /** Cursor influence radius, px: dots inside it grow. */
  influence?: number;
  /** How far a dot leans toward the cursor, px. */
  maxShift?: number;
  className?: string;
}

type Dot = { x: number; y: number };

export function InteractiveCanvas({
  spacing = 24,
  dotColor = '#cfcfcf',
  backgroundColor = '#ffffff',
  dotRadius = 1,
  influence = 180,
  maxShift = 3,
  className = 'fixed inset-0 h-screen w-screen',
}: InteractiveCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // Far away until the cursor first moves, so nothing is enlarged at load
    const mouse = { x: -9999, y: -9999 };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;

    const build = () => {
      const ratio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      dots = [];
      // Centre the grid so the margins match on both sides
      const offX = (width % spacing) / 2;
      const offY = (height % spacing) / 2;
      for (let x = offX; x <= width; x += spacing) {
        for (let y = offY; y <= height; y += spacing) dots.push({ x, y });
      }
    };

    const draw = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = dotColor;
      for (const dot of dots) {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const d = Math.hypot(dx, dy);
        let x = dot.x;
        let y = dot.y;
        let r = dotRadius;
        if (d < influence) {
          // Grow toward the cursor and lean a few px in its direction
          r = dotRadius + ((influence - d) / influence) * 2.5;
          const shift = Math.min(maxShift, d) / (d || 1);
          x += dx * shift;
          y += dy * shift;
        }
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onResize = () => {
      build();
      if (reduceMotion) draw();
    };

    build();
    window.addEventListener('resize', onResize);
    if (reduceMotion) {
      draw();
    } else {
      window.addEventListener('mousemove', onMove);
      document.addEventListener('mouseleave', onLeave);
      loop();
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [spacing, dotColor, backgroundColor, dotRadius, influence, maxShift]);

  return <canvas ref={canvasRef} aria-hidden='true' className={className} style={{ display: 'block' }} />;
}
