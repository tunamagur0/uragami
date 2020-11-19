import React, { useContext, useEffect } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';

type Props = {
  close: () => void;
  selectTool: () => void;
  setLineWidth: (width: number) => void;
  lineWidth: number;
};

const EraserItem: React.FC<Props> = ({
  close,
  selectTool,
  setLineWidth,
  lineWidth,
}: Props) => {
  const context = useContext(PaintContext);
  useEffect(() => {
    if (context.awPaint) {
      context.awPaint.changeMode('Eraser');
      selectTool();
    }
  }, []);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2"
        onClick={close}
      >
        <IconX className="w-5 h-5" />
      </span>
      <p>消しゴムの太さ</p>
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

export default EraserItem;
