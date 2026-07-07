'use client';
import { useEffect } from 'react';

import fluidCursor from '@/hooks/use-FluidCursor';

// `hues`: optional page-specific color mix (hue values 0..1).
// Without it the splats use the full rainbow (home page).
const FluidCursor = ({ hues }: { hues?: number[] }) => {
  useEffect(() => {
    fluidCursor(hues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed top-0 left-0 z-0">
      <canvas id="fluid" className="h-screen w-screen" />
    </div>
  );
};
export default FluidCursor;
