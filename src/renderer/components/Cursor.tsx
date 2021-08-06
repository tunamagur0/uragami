import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useContext,
} from 'react';
import { PaintContext } from '../App';

const useAnimationFrame = (callback: () => void) => {
  const requestRef = useRef<ReturnType<typeof requestAnimationFrame>>();

  const animate = useCallback(() => {
    callback();
    requestRef.current = requestAnimationFrame(animate);
  }, [callback]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) {
        return cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate]);
};

const OpacityItem: React.VFC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { cursorSize: size } = useContext(PaintContext);

  useEffect(() => {
    const listener: (e: MouseEvent) => void = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      setPos({ x, y });
    };
    document.addEventListener('mousemove', listener);
    return () => {
      document.removeEventListener('mousemove', listener);
    };
  }, []);

  useAnimationFrame(() => {
    if (ref.current !== null) {
      ref.current.style.left = pos.x - size / 4 + 'px';
      ref.current.style.top = pos.y - size / 4 + 'px';
    }
  });

  return (
    <div
      className="rounded-full border-white absolute z-10 pointer-events-none border transition-transform ease-linear"
      style={{ width: size / 2, height: size / 2 }}
      ref={ref}
    ></div>
  );
};

export default OpacityItem;
