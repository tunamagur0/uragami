import React, { useContext, useEffect, useState } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';

type Props = {
  close: () => void;
  selectTool: () => void;
  isOpen: boolean;
};

const PenItem: React.FC<Props> = ({ close, selectTool, isOpen }: Props) => {
  const context = useContext(PaintContext);
  const [lineWidth, setLineWidth] = useState<number>(10);

  useEffect(() => {
    if (isOpen && context.awPaint) {
      context.awPaint.changeMode('Pencil');
      context.awPaint.setLineWidth(lineWidth);
      selectTool();
    }
  }, [isOpen]);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2 z-10"
        onClick={close}
      >
        <IconX className="w-5 h-5" />
      </span>
      <p>ペンの太さ</p>
      <input
        className="w-64"
        type="range"
        onChange={(e) => {
          if (context.awPaint) {
            const width = parseInt(e.target.value);
            setLineWidth(width);
            context.awPaint.setLineWidth(width);
          }
        }}
        value={lineWidth}
        step="1"
        min="1"
        max="50"
      />
      <p>{lineWidth}px</p>
    </div>
  );
};

export default PenItem;
