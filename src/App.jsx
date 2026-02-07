import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Heart from './components/Heart';

const App = () => {
  const [phase, setPhase] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const noTexts = [
    "No", "Are you sure?", "Really sure??", "Think again!", 
    "Last chance!", "Surely not?", "My heart is breaking...", 
    "Don't be so cold!", "Is that your final answer?", "Pls say yes 🥺"
  ];

  const questions = [
    { text: "Hey Beautiful... I have something to ask you ❤️", icon: "✨" },
    { text: "Every moment with you feels like a dream...", icon: "💭" },
    { text: "You make my world a lot brighter just by being in it.", icon: "🌟" },
    { text: "Will you be my Valentine and my forever? 💍", icon: "💍" }
  ];

  const handleNoHover = () => {
    // Better mobile bounds
    const padding = 50;
    const x = Math.random() * (window.innerWidth - 150 - padding) + padding;
    const y = Math.random() * (window.innerHeight - 80 - padding) + padding;
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
    setYesButtonSize(prev => Math.min(prev + 0.3, 10)); 
  };

  const fireConfetti = () => {
    const end = Date.now() + 3 * 1000;
    const colors = ['#ff4d6d', '#ff85a1', '#ffffff'];
    (function frame() {
      confetti({ particleCount: 2, angle: 60, spread: 55, origin: { x: 0 }, colors });
      confetti({ particleCount: 2, angle: 120, spread: 55, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    }());
  };

  const handleYes = () => {
    setIsAccepted(true);
    fireConfetti();
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-rose-200">
      {/* Dynamic Background Hearts */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <Heart key={i} delay={i * 1.5} x={`${Math.random() * 100}%`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          // --- PROPOSAL PHASE ---
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="glass-card p-8 md:p-14 max-w-xl w-full text-center animate-premium-float"
          >
            <motion.div key={phase} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
              <span className="text-6xl mb-6 block drop-shadow-md">{questions[phase].icon}</span>
              <h1 className="text-3xl md:text-5xl font-cursive text-romantic-red mb-12 leading-tight">
                {questions[phase].text}
              </h1>
            </motion.div>

            <div className="flex flex-col items-center justify-center gap-6">
              {phase < questions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPhase(phase + 1)}
                  className="bg-romantic-red text-white px-12 py-4 rounded-full shadow-lg font-bold text-xl"
                >
                  Continue ⮕
                </motion.button>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  <motion.button
                    style={{ scale: yesButtonSize }}
                    onClick={handleYes}
                    className="bg-green-500 text-white px-12 py-4 rounded-2xl font-black shadow-xl animate-yes z-50 transition-transform active:scale-90 text-xl"
                  >
                    YES! 💍
                  </motion.button>

                  <motion.button
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    animate={noButtonPos.x ? { left: noButtonPos.x, top: noButtonPos.y, position: 'fixed' } : { position: 'relative' }}
                    className="bg-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold shadow-inner"
                  >
                    {noTexts[Math.min(noCount, noTexts.length - 1)]}
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        ) : !showLetter ? (
          // --- ENVELOPE PHASE ---
          <motion.div
            key="envelope"
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            className="text-center cursor-pointer"
            onClick={() => setShowLetter(true)}
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-white p-6 rounded-lg shadow-2xl relative border-t-[30px] border-rose-100"
            >
              <div className="text-8xl mb-4">✉️</div>
              <p className="font-cursive text-romantic-red text-xl">Tap to open your secret letter</p>
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={{ repeat: Infinity }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 text-4xl"
              >
                👇
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          // --- SECRET LOVE LETTER PHASE ---
          <motion.div
            key="letter"
            initial={{ y: 500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-50/90 p-4 md:p-10"
          >
            <div className="letter-parchment w-full max-w-2xl h-[80vh] overflow-y-auto no-scrollbar rounded-xl p-8 md:p-16 relative shadow-2xl border-2 border-rose-200">
              <button 
                onClick={() => setShowLetter(false)}
                className="absolute top-4 right-4 text-romantic-red text-2xl"
              >
                ✕
              </button>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                className="text-2xl md:text-4xl text-rose-900 space-y-8 pb-20"
              >
                <p className="font-bold">My Dearest,</p>
                <p>
                  From the moment you entered my life, everything changed. I never knew that 
                  one person could become my entire world in such a short time. 
                </p>
                <p>
                  I promise to hold your hand through every storm, to laugh with you in every 
                  joy, and to love you more with every single heartbeat.
                </p>
                <p>
                  Today is just the beginning of our forever. Thank you for choosing me.
                </p>
                <p className="pt-10">Forever Yours,</p>
                <p className="text-5xl font-cursive">Satyam ❤️</p>
                
                <div className="flex justify-center pt-10">
                  <img 
                    src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4dnR6MmticHhqZ3Z0eHB6eHB6eHB6eHB6eHB6eHB6eHB6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c76IJLufpNUMvULn59/giphy.gif" 
                    className="w-32 opacity-80"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;