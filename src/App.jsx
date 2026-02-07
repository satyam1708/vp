import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const App = () => {
  const [phase, setPhase] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);

  const noTexts = [
    "No", "Are you sure?", "Really sure??", "Think again!", 
    "Last chance!", "Surely not?", "You might regret this!", 
    "Give it another thought!", "Are you absolutely sure?", 
    "This could be a mistake!", "Have a heart!", "Don't be so cold!", 
    "Change of heart?", "Wouldn't you reconsider?", "Is that your final answer?"
  ];

  const questions = [
    { text: "Hey Beautiful... I have something to ask you ❤️", icon: "✨" },
    { text: "Every moment with you feels like a dream...", icon: "💭" },
    { text: "You make my world a lot brighter just by being in it.", icon: "🌟" },
    { text: "Will you be my Valentine and my forever? 💍", icon: "💍" }
  ];

  const handleNoHover = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 100);
    setNoButtonPos({ x, y });
    setNoCount(noCount + 1);
    setYesButtonSize(prev => prev + 0.3);
  };

  const handleYes = () => {
    setIsAccepted(true);
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-6 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-romantic-pink opacity-20"
            initial={{ y: '110vh', x: `${Math.random() * 100}vw` }}
            animate={{ y: '-10vh' }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "linear" }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div
            key={phase}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="glass-card p-8 md:p-12 max-w-lg w-full text-center animate-float"
          >
            <span className="text-5xl mb-6 block">{questions[phase].icon}</span>
            <h1 className="text-2xl md:text-4xl font-cursive text-romantic-red mb-10 leading-relaxed">
              {questions[phase].text}
            </h1>

            <div className="flex flex-col items-center gap-4">
              {phase < questions.length - 1 ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPhase(phase + 1)}
                  className="bg-romantic-red text-white px-12 py-4 rounded-full shadow-lg font-bold text-xl transition-colors hover:bg-romantic-pink"
                >
                  Yes, Continue ⮕
                </motion.button>
              ) : (
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full">
                  <motion.button
                    style={{ scale: yesButtonSize }}
                    onClick={handleYes}
                    className="bg-green-500 text-white px-12 py-4 rounded-full font-bold shadow-xl z-50 whitespace-nowrap"
                    whileHover={{ scale: yesButtonSize + 0.1 }}
                  >
                    YES! 💖
                  </motion.button>

                  <motion.button
                    onMouseEnter={handleNoHover}
                    onTouchStart={handleNoHover}
                    animate={{ 
                      left: noButtonPos.x || 'auto', 
                      top: noButtonPos.y || 'auto',
                      position: noButtonPos.x ? 'fixed' : 'relative' 
                    }}
                    className="bg-gray-400 text-white px-8 py-3 rounded-full font-medium shadow-md pointer-events-auto transition-none"
                  >
                    {noTexts[Math.min(noCount, noTexts.length - 1)]}
                  </motion.button>
                </div>
              )}
            </div>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-8">
              {questions.map((_, i) => (
                <div key={i} className={`h-2 w-2 rounded-full ${i <= phase ? 'bg-romantic-red' : 'bg-pink-200'}`} />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass-card p-12"
          >
            <h1 className="text-6xl md:text-8xl font-cursive text-romantic-red mb-6">
              I Love You! ❤️
            </h1>
            <p className="text-2xl text-pink-600 mb-8 font-light italic">
              "You’ve made me the happiest person alive."
            </p>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <img 
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4dnR6MmticHhqZ3Z0eHB6eHB6eHB6eHB6eHB6eHB6eHB6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c76IJLufpNUMvULn59/giphy.gif" 
                alt="Love" 
                className="w-48 mx-auto md:w-64"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;