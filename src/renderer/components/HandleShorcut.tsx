import React, { useContext, useEffect } from 'react';
import { PaintContext } from '../App';
import hotkeys from 'hotkeys-js';
import { ctrlOrCmd } from '../lib/shortcut';

const HandleShortcut: React.FC = () => {
  const context = useContext(PaintContext);
  const handleFunc = () => {
    const metaKey = ctrlOrCmd();
    hotkeys(metaKey + '+z', (event: KeyboardEvent) => {
      event.preventDefault();
      context.awPaint?.undo();
    });
    hotkeys(metaKey + '+shift+z', (event: KeyboardEvent) => {
      event.preventDefault();
      context.awPaint?.redo();
    });
    hotkeys(metaKey + '+y', (event: KeyboardEvent) => {
      event.preventDefault();
      context.awPaint?.redo();
    });
    hotkeys('c', (event: KeyboardEvent) => {
      event.preventDefault();
      context.awPaint?.clearLayer(context.awPaint?.selectingLayer);
    });
  };

  useEffect(() => {
    handleFunc();
  }, [context.awPaint]);
  return null;
};

export default HandleShortcut;
