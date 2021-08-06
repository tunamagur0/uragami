import React, { useContext } from 'react';
import { PaintContext } from '../App';
import { IconX } from '@tabler/icons';
import { bgOpacity } from '../types/bgOpacaity';

type Props = {
  close: () => void;
};

const OpacityItem: React.FC<Props> = ({ close }: Props) => {
  const { opacity, setOpacity } = useContext(PaintContext);

  return (
    <div className="header-item popup">
      <span
        className="absolute right-0 cursor-pointer mr-2 -mt-2 z-10"
        onClick={close}
      >
        <IconX className="w-5 h-5" />
      </span>
      <p>背景の不透明度</p>
      <input
        className="w-64"
        type="range"
        onChange={(e) => {
          const val = parseInt(e.target.value) as bgOpacity;
          setOpacity(val);
        }}
        value={opacity}
        step="10"
        min="0"
        max="100"
      />
      <p>{opacity}%</p>
    </div>
  );
};

export default OpacityItem;
