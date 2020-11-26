import AnywherePaint from 'anywhere-paint';
import React from 'react';
import Paint from './components/Paint';
import Header from './components/Header';
import HandleShortcut from './components/HandleShorcut';

const context: { awPaint: AnywherePaint | null } = {
  awPaint: null,
};

export const PaintContext = React.createContext<typeof context>(context);

const App: React.FC = () => {
  return (
    <PaintContext.Provider value={context}>
      <HandleShortcut />
      <div className="w-screen h-screen">
        <Header />
        <Paint />
      </div>
    </PaintContext.Provider>
  );
};

export default App;
