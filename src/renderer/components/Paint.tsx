import AnywherePaint from 'anywhere-paint';
import React, { useEffect, useRef } from 'react';
const context: { awPaint: AnywherePaint | null } = {
  awPaint: null,
};

export const PaintContext = React.createContext<typeof context>(context);
const width = 640;
const height = 480;

const Paint: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      context.awPaint = new AnywherePaint(
        ref.current as HTMLDivElement,
        width,
        height
      );
    }

    return () => {
      context.awPaint = null;
    };
  }, []);

  return (
    <PaintContext.Provider value={context}>
      <div className="w-full h-full">
        <div className="flex w-full h-full justify-center items-center">
          <div
            className="bg-white border-blue-600 border"
            style={{ width: width, height: height }}
            ref={ref}
          ></div>
        </div>
      </div>
    </PaintContext.Provider>
  );
};

export default Paint;
