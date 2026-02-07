import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Heart from './components/Heart';
import Proposal from './components/Proposal';
import { VALENTINE_WEEK } from './constants/content';

const convinceEmojis = ['🥺', '😢', '😭', '💔', '🌹', '🙏', '🧸', '😔'];

const App = () => {
  const [phase, setPhase] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [dayInfo, setDayInfo] = useState({ name: "Special Day", emoji: "✨" });
  const [activeEmoji, setActiveEmoji] = useState(null);

  useEffect(() => {
    const today = new Date().getDate();
    if (VALENTINE_WEEK[today]) setDayInfo(VALENTINE_WEEK[today]);
  }, []);

  const handleNoInteraction = () => {
    // Runaway logic: Ensure the button stays within screen bounds
    const padding = 100;
    const x = Math.random() * (window.innerWidth - padding * 2) + padding - (window.innerWidth / 2);
    const y = Math.random() * (window.innerHeight - padding * 2) + padding - (window.innerHeight / 2);
    
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
    setYesButtonSize(prev => Math.min(prev + 0.5, 15)); // Yes button grows significantly

    // Show a sad emoji
    const randomEmoji = convinceEmojis[Math.floor(Math.random() * convinceEmojis.length)];
    setActiveEmoji(randomEmoji);
    setTimeout(() => setActiveEmoji(null), 1000);
  };

  const handleYes = () => {
    setIsAccepted(true);
    confetti({ 
        particleCount: 250, 
        spread: 100, 
        origin: { y: 0.6 }, 
        colors: ['#e11d48', '#fb7185', '#ffffff'] 
    });
  };

  return (
    <div className="h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-b from-rose-50 to-pink-100">
      
      {/* 🌸 Floating Rose Petals Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: window.innerHeight + 100,
              opacity: [0, 1, 1, 0],
              x: [Math.random() * 20, Math.random() * -20],
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 5 + 7,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-2xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            🌹
          </motion.div>
        ))}
        {[...Array(15)].map((_, i) => (
          <Heart key={i} delay={i * 0.8} x={`${Math.random() * 100}%`} />
        ))}
      </div>

      {/* 🥺 Pleading Emoji Pop-up */}
      <AnimatePresence>
        {activeEmoji && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 0 }}
            animate={{ scale: 2, opacity: 1, y: -100 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute z-50 text-7xl pointer-events-none"
          >
            {activeEmoji}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key="stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="love-stage w-full max-w-lg min-h-[500px] p-8 md:p-12 text-center z-10"
          >
            <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="mb-8">
              <span className="text-6xl mb-2 block drop-shadow-sm">{dayInfo.emoji}</span>
              <p className="text-rose-500 font-semibold tracking-widest uppercase text-xs">
                {dayInfo.name}
              </p>
            </motion.div>

            {/* Elegant Custom Font */}
            <h1 className="font-elegant text-rose-600 mb-12 leading-tight" 
                style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}>
              {phase === 0 ? `Happy ${dayInfo.name}, My Love!` : "Will you be mine forever?"}
            </h1>

            <div className="w-full flex flex-col items-center gap-8">
              {phase === 0 ? (
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPhase(1)}
                  className="bg-rose-500 text-white px-12 py-4 rounded-full font-bold text-xl shadow-xl shadow-rose-200"
                >
                  I have a question... 💌
                </motion.button>
              ) : (
                <div className="flex flex-col items-center gap-12 w-full relative">
                  <motion.button
                    style={{ scale: yesButtonSize }}
                    onClick={handleYes}
                    className="bg-green-500 text-white px-14 py-5 rounded-2xl font-black shadow-2xl z-50 animate-yes text-2xl"
                  >
                    YES! 😍💍
                  </motion.button>

                  <motion.button
                    onMouseEnter={handleNoInteraction}
                    onTouchStart={handleNoInteraction}
                    animate={{ x: noButtonPos.x, y: noButtonPos.y }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="bg-gray-200 text-gray-500 px-10 py-3 rounded-xl font-semibold border border-gray-300 absolute"
                  >
                    No 🙈
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="love-stage w-full max-w-lg min-h-[400px] p-12 text-center z-10"
          >
            <h2 className="font-elegant text-rose-600 mb-10"
                style={{ fontSize: 'clamp(3rem, 10vw, 5rem)' }}>
                Yayyy! ❤️🥰
            </h2>
            <div 
              className="group cursor-pointer flex flex-col items-center"
              onClick={() => setShowLetter(true)}
            >
              <motion.div 
                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                className="text-9xl mb-4 filter drop-shadow-xl"
              >
                ✉️
              </motion.div>
              <p className="font-bold text-gray-700 text-lg">Open your secret letter 💕</p>
              <p className="text-sm text-rose-400 mt-2 animate-pulse font-medium italic">Tap to open with all my love</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && <Proposal onClose={() => setShowLetter(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default App;