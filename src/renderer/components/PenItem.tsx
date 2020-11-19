import React, { useContext, useState } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';

type Props = {
  close: () => void;
};

const PenItem: React.FC<Props> = ({ close }: Props) => {
  const context = useContext(PaintContext);
  const [width, setWidth] = useState<number>(10);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2"
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
            const lineWidth = parseInt(e.target.value);
            setWidth(lineWidth);
            context.awPaint.setLineWidth(lineWidth);
          }
        }}
        value={width}
        step="1"
        min="1"
        max="50"
      />
      <p>{width}px</p>
    </div>
  );
};

export default PenItem;
