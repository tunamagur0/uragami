import AnywherePaint from 'anywhere-paint';
import React, { useState } from 'react';
import Paint from './components/Paint';
import Header from './components/Header';
import Cursor from './components/Cursor';
import HandleShortcut from './components/HandleShorcut';
import { bgOpacity } from './types/bgOpacaity';

const context: {
  awPaint: AnywherePaint | null;
  setAwPaint: React.Dispatch<React.SetStateAction<AnywherePaint | null>>;
  opacity: bgOpacity;
  setOpacity: React.Dispatch<React.SetStateAction<bgOpacity>>;
  cursorSize: number;
  setCursorSize: React.Dispatch<React.SetStateAction<number>>;
} = {
  awPaint: null,
  setAwPaint: () => {
    return;
  },
  opacity: 40,
  setOpacity: () => {
    return;
  },
  cursorSize: 10,
  setCursorSize: () => {
    return;
  },
};

export const PaintContext = React.createContext<typeof context>(context);

const App: React.FC = () => {
  const [opacity, setOpacity] = useState<bgOpacity>(40);
  const [cursorSize, setCursorSize] = useState<number>(10);
  const [awPaint, setAwPaint] = useState<AnywherePaint | null>(null);
  const provided = {
    awPaint,
    setAwPaint,
    opacity,
    setOpacity,
    cursorSize,
    setCursorSize,
  };

  return (
    <PaintContext.Provider value={provided}>
      <HandleShortcut />
      <Cursor />
      <div className="w-screen h-screen">
        <Header />
        <Paint />
      </div>
    </PaintContext.Provider>
  );
};

export default App;
