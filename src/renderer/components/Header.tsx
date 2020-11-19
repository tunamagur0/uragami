import React, { useContext, useState } from 'react';
import { PaintContext } from '../App';
import PenItem from './PenItem';
import { IconChevronsDown, IconChevronsUp, IconPencil } from '@tabler/icons';

const Header: React.FC = () => {
  const context = useContext(PaintContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  const icon = isOpen ? (
    <IconChevronsUp stroke={2} />
  ) : (
    <IconChevronsDown stroke={2} />
  );

  const items: {
    icon: React.ReactNode;
    modal: React.ReactNode;
  }[] = [
    {
      icon: <IconPencil className="w-12 h-12" stroke={2} />,
      modal: <PenItem />,
    },
  ];

  const menu = (
    <div className="flex flex-row flex-1 pl-2">
      {items.map(({ icon }, index) => (
        <button
          className="p-2"
          onClick={() => setOpenIndex(openIndex === -1 ? index : -1)}
          key={index}
        >
          {icon}
        </button>
      ))}
    </div>
  );

  const item = items.filter((_, index) => index === openIndex);
  const modal = (
    <div className="absolute top-0 transform translate-y-24 transition-all duration-100">
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
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
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
