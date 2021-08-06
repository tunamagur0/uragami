import AnywherePaint from 'anywhere-paint';
import React, { useState } from 'react';
import Paint from './components/Paint';
import Header from './components/Header';
import HandleShortcut from './components/HandleShorcut';
import { bgOpacity } from './types/bgOpacaity';

const context: {
  awPaint: AnywherePaint | null;
  opacity: bgOpacity;
  setOpacity: React.Dispatch<React.SetStateAction<bgOpacity>>;
} = {
  awPaint: null,
  opacity: 40,
  setOpacity: () => {
    return;
  },
};

export const PaintContext = React.createContext<typeof context>(context);

const App: React.FC = () => {
  const [opacity, setOpacity] = useState<bgOpacity>(40);
  return (
    <PaintContext.Provider value={{ ...context, opacity, setOpacity }}>
      <HandleShortcut />
      <div className="w-screen h-screen">
        <Header />
        <Paint />
      </div>
    </PaintContext.Provider>
  );
};

export default App;
