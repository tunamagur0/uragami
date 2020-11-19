import React, { useContext } from 'react';
import { PaintContext } from '../App';

const PenItem: React.FC = () => {
  const context = useContext(PaintContext);
  return (
    <span
      className="ml-2 pr-2 py-2 h-full cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      テスト
    </span>
  );
};

export default PenItem;
