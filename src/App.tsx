import React from 'react';
import Toolbar from './components/Builder/Toolbar';
import Canvas from './components/Builder/Canvas';
import Footer from './components/Builder/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toolbar />
      <Canvas />
      <Footer />
    </div>
  );
}

export default App;