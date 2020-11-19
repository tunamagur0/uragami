import AnywherePaint from 'anywhere-paint';
import React, { useEffect, useRef } from 'react';
const context: { awPaint: AnywherePaint | null } = {
  awPaint: null,
};

export const PaintContext = React.createContext<typeof context>(context);

const Paint: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { width, height } = await (window as any).api.getBounds();
      console.log(width, height);
      if (ref.current) {
        context.awPaint = new AnywherePaint(
          ref.current as HTMLDivElement,
          width,
          height
        );
      }
    };

    init();

    return () => {
      context.awPaint = null;
    };
  }, []);

  return (
    <PaintContext.Provider value={context}>
      <div className="w-screen h-screen overflow-hidden">
        <div className="flex w-full h-full justify-center items-center">
          <div className="bg-gray-300 w-full h-full" ref={ref}></div>
        </div>
      </div>
    </PaintContext.Provider>
  );
};

export default Paint;
