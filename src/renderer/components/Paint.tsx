import AnywherePaint from 'anywhere-paint';
import React, { useContext, useEffect, useRef } from 'react';
import { PaintContext } from '../App';

const Paint: React.FC = () => {
  const context = useContext(PaintContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const { width, height } = await (window as any).api.getBounds();
      if (ref.current) {
        context.awPaint = new AnywherePaint(
          ref.current as HTMLDivElement,
          width,
          height
        );
        context.awPaint.setColor(255, 0, 0);
        context.awPaint.setLineWidth(10);
      }
    };

    init();

    return () => {
      context.awPaint = null;
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="flex w-full h-full justify-center items-center">
        <div
          className={`bg-gray-900 bg-opacity-${context.opacity} w-full h-full`}
          ref={ref}
        ></div>
      </div>
    </div>
  );
};

export default Paint;
