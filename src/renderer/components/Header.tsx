import React, { useContext, useState } from 'react';
import { PaintContext } from '../App';
import PenItem from './PenItem';
import EraserItem from './EraserItem';
import PaletteItem from './PaletteItem';
import DownloadItem from './DownloadItem';
import OpacityItem from './OpacityItem';
import {
  IconChevronsDown,
  IconChevronsUp,
  IconPencil,
  IconEraser,
  IconX,
  IconPalette,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconLoader,
  IconFileDownload,
  IconBrightness,
} from '@tabler/icons';

const Header: React.FC = () => {
  const context = useContext(PaintContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [openIndex, setOpenIndex] = useState<number>(-1);
  const [currentTool, setCurrentTool] = useState<number>(0);

  const icon = isOpen ? (
    <IconChevronsUp className="w-5 h-5" stroke={2} />
  ) : (
    <IconChevronsDown className="w-5 h-5" stroke={2} />
  );

  const items: {
    icon: (color: string) => React.ReactNode;
    modal: (isOpen: boolean) => React.ReactNode;
  }[] = [
    {
      icon: function icon(color) {
        return <IconPencil className="w-12 h-12" stroke={2} color={color} />;
      },
      modal: function modal(isOpen) {
        return (
          <PenItem
            close={() => setOpenIndex(-1)}
            selectTool={() => setCurrentTool(0)}
            isOpen={isOpen}
          />
        );
      },
    },
    {
      icon: function icon(color) {
        return <IconEraser className="w-12 h-12" stroke={2} color={color} />;
      },
      modal: function modal(isOpen) {
        return (
          <EraserItem
            close={() => setOpenIndex(-1)}
            selectTool={() => setCurrentTool(1)}
            isOpen={isOpen}
          />
        );
      },
    },
    {
      icon: function icon(color) {
        return <IconPalette className="w-12 h-12" stroke={2} color={color} />;
      },
      modal: function modal() {
        return <PaletteItem close={() => setOpenIndex(-1)} />;
      },
    },
    {
      icon: function icon(color) {
        return (
          <IconArrowBackUp
            className="w-12 h-12"
            stroke={2}
            color={color}
            onClick={() => {
              if (context.awPaint) {
                context.awPaint.undo();
              }
            }}
          />
        );
      },
      modal: function modal() {
        return null;
      },
    },
    {
      icon: function icon(color) {
        return (
          <IconArrowForwardUp
            className="w-12 h-12"
            stroke={2}
            color={color}
            onClick={() => {
              if (context.awPaint) {
                context.awPaint.redo();
              }
            }}
          />
        );
      },
      modal: function modal() {
        return null;
      },
    },
    {
      icon: function icon(color) {
        return (
          <IconLoader
            className="w-12 h-12"
            stroke={2}
            color={color}
            onClick={() => {
              if (context.awPaint) {
                context.awPaint.clearLayer(context.awPaint.selectingLayer);
              }
            }}
          />
        );
      },
      modal: function modal() {
        return null;
      },
    },
    {
      icon: function icon(color) {
        return (
          <IconBrightness className="w-12 h-12" stroke={2} color={color} />
        );
      },
      modal: function modal() {
        return <OpacityItem close={() => setOpenIndex(-1)} />;
      },
    },
    {
      icon: function icon(color) {
        return (
          <IconFileDownload className="w-12 h-12" stroke={2} color={color} />
        );
      },
      modal: function modal() {
        return <DownloadItem close={() => setOpenIndex(-1)} />;
      },
    },
  ];

  const menu = (isOpen: boolean) => (
    <div className={`flex flex-row flex-1 pl-2 ${isOpen ? '' : 'hidden'}`}>
      {items.map(({ icon }, index) => (
        <button
          className="p-2"
          onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          key={index}
        >
          {icon(index < 2 && currentTool === index ? 'red' : 'black')}
        </button>
      ))}
    </div>
  );

  const modals = items.map(({ modal }, index) => (
    <div
      className={`absolute top-0 transform translate-y-24 ${
        index === openIndex ? '' : 'invisible'
      }`}
      key={index}
    >
      {modal(index === openIndex)}
    </div>
  ));

  return (
    <div
      className={`w-screen overflow-visible bg-gray-100 fixed z-50 flex flex-col transition-all duration-100 ${
        isOpen ? 'h-20' : 'h-5'
      }`}
    >
      {modals}
      <span
        className="absolute right-0 cursor-pointer"
        onClick={() => {
          (window as any).api.closeWindow();
        }}
      >
        <IconX className="w-5 h-5" />
      </span>
      {menu(isOpen)}
      <div
        className="w-full flex justify-center cursor-pointer"
        onClick={() => {
          if (isOpen) setOpenIndex(-1);
          setIsOpen(!isOpen);
        }}
      >
        {icon}
      </div>
    </div>
  );
};

export default Header;
