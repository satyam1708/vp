import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Heart from './components/Heart';
import Proposal from './components/Proposal';
import { VALENTINE_WEEK } from './constants/content';

const App = () => {
  const [phase, setPhase] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [dayInfo, setDayInfo] = useState({ name: "Special Day", emoji: "✨" });

  useEffect(() => {
    const today = new Date().getDate();
    if (VALENTINE_WEEK[today]) setDayInfo(VALENTINE_WEEK[today]);
  }, []);

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
    setYesButtonSize(prev => Math.min(prev + 0.35, 15)); 
  };

  const handleYes = () => {
    setIsAccepted(true);
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#ff4d6d', '#ff85a1'] });
  };

  return (
    <div className="min-h-[100dvh] w-full flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-rose-200 bg-[#fff5f7]">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart key={i} delay={i * 1.2} x={`${Math.random() * 100}%`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="main"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="glass-card p-8 md:p-12 w-full max-w-md text-center shadow-2xl z-10"
          >
            <div className="mb-6">
              <span className="text-5xl block animate-bounce">{dayInfo.emoji}</span>
              <p className="text-romantic-red font-bold uppercase tracking-widest text-sm mt-2">{dayInfo.name}</p>
            </div>

            <h1 className="text-3xl md:text-4xl font-cursive text-romantic-red mb-10 leading-snug">
              {phase === 0 ? `Happy ${dayInfo.name}, My Love! ❤️` : "Will you be mine forever? 💍"}
            </h1>

            <div className="flex flex-col items-center gap-6">
              {phase === 0 ? (
                <button 
                  onClick={() => setPhase(1)}
                  className="bg-romantic-red text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-romantic-pink transition-colors w-full"
                >
                  I have a question...
                </button>
              ) : (
                <div className="relative w-full flex flex-col items-center gap-12">
                  <motion.button
                    style={{ scale: yesButtonSize }}
                    onClick={handleYes}
                    className="bg-green-500 text-white px-12 py-4 rounded-2xl font-black shadow-xl z-50 animate-yes text-xl"
                  >
                    YES! 💍
                  </motion.button>

                  <motion.button
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    animate={noButtonPos.x ? { left: noButtonPos.x, top: noButtonPos.y, position: 'fixed' } : { position: 'relative' }}
                    className="bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold opacity-80"
                  >
                    {noCount === 0 ? "No" : "Wait, what?"}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            className="text-center z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <h2 className="text-6xl font-cursive text-romantic-red mb-8">Yayyy! ❤️</h2>
            <div 
              className="bg-white p-6 rounded-2xl shadow-2xl cursor-pointer hover:rotate-3 transition-transform"
              onClick={() => setShowLetter(true)}
            >
              <div className="text-7xl mb-2">✉️</div>
              <p className="font-bold text-gray-600">You have 1 new love letter</p>
              <p className="text-xs text-romantic-red mt-1 animate-pulse">Click to open</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
  {showLetter && (
    <Proposal onClose={() => setShowLetter(false)} />
  )}
</AnimatePresence>
    </div>
  );
};

export default App;