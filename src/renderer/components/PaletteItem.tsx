import React, { useContext, useEffect, useRef } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';

type Props = {
  close: () => void;
};

const PaletteItem: React.FC<Props> = ({ close }: Props) => {
  const context = useContext(PaintContext);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (context.awPaint && ref.current) {
      context.awPaint.createColorCircle(ref.current);
    }
  }, [context.awPaint]);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2"
        onClick={close}
      >
        <IconX className="w-5 h-5" />
      </span>
      <div className="w-64 h-64 color-circle" ref={ref}></div>
    </div>
  );
};

export default PaletteItem;
