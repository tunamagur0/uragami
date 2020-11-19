import React, { useContext, useState } from 'react';
import { PaintContext } from '../App';
import PenItem from './PenItem';
import EraserItem from './EraserItem';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconPencil,
  IconEraser,
  IconX,
} from '@tabler/icons';

const Header: React.FC = () => {
  const context = useContext(PaintContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [currentTool, setCurrentTool] = useState<number>(0);
  const [lineWidth, setLineWidth] = useState<number>(10);

  const icon = isOpen ? (
    <IconChevronsUp stroke={2} />
  ) : (
    <IconChevronsDown stroke={2} />
  );

  const items: {
    icon: (color: string) => React.ReactNode;
    modal: React.ReactNode;
  }[] = [
    {
      icon: function icon(color) {
        return <IconPencil className="w-12 h-12" stroke={2} color={color} />;
      },
      modal: (
        <PenItem
          close={() => setOpenIndex(-1)}
          selectTool={() => setCurrentTool(0)}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
      ),
    },
    {
      icon: function icon(color) {
        return <IconEraser className="w-12 h-12" stroke={2} color={color} />;
      },
      modal: (
        <EraserItem
          close={() => setOpenIndex(-1)}
          selectTool={() => setCurrentTool(1)}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
        />
      ),
    },
  ];

  const menu = (
    <div className="flex flex-row flex-1 pl-2">
      {items.map(({ icon }, index) => (
        <button
          className="p-2"
          onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          key={index}
        >
          {icon(index < 3 && currentTool === index ? 'red' : 'black')}
        </button>
      ))}
    </div>
  );

  const item = items.filter((_, index) => index === openIndex);
  const modal = (
    <div className="absolute top-0 transform translate-y-24">
      {item.length !== 0 ? item[0].modal : null}
    </div>
  );

  return (
    <div
      className={`w-screen overflow-visible bg-gray-100 fixed z-10 flex flex-col transition-all duration-100 ${
        isOpen ? 'h-20' : 'h-5'
      }`}
    >
      {modal}
      <span
        className="absolute right-0 cursor-pointer"
        onClick={() => {
          (window as any).api.closeWindow();
        }}
      >
        <IconX className="w-5 h-5" />
      </span>
      {isOpen ? menu : null}
      <div
        className="w-full flex justify-center cursor-pointer"
        onClick={() => {
          if (isOpen) setOpenIndex(-1);
          setIsOpen(!isOpen);
        }}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {icon}
        </svg>
      </div>
    </div>
  );
};

export default Header;
