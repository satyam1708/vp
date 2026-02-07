import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const App = () => {
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [isAccepted, setIsAccepted] = useState(false);
  const [phase, setPhase] = useState(0);

  const questions = [
    "Hey Beautiful... I have something to ask you ❤️",
    "We've shared so many memories already...",
    "But I want to make it official.",
    "Will you be my Valentine and more, forever?"
  ];

  const handleNoHover = () => {
    // Moves the 'No' button to a random spot within the viewport
    const randomX = Math.random() * (window.innerWidth - 100);
    const randomY = Math.random() * (window.innerHeight - 50);
    setNoButtonPos({ x: randomX, y: randomY });
    setYesButtonSize(prev => prev + 0.2); // Make "Yes" bigger every time she tries to hit "No"
  };

  const handleYes = () => {
    setIsAccepted(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff85a1', '#ffb3c1']
    });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden">
      <AnimatePresence mode="wait">
        {!isAccepted ? (
          <motion.div 
            key={phase}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-cursive text-romantic-red mb-8 px-4">
              {questions[phase]}
            </h1>

            {phase < questions.length - 1 ? (
              <button 
                onClick={() => setPhase(phase + 1)}
                className="bg-romantic-pink text-white px-8 py-3 rounded-full shadow-lg hover:bg-romantic-red transition-all"
              >
                Next ⮕
              </button>
            ) : (
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
                <motion.button
                  style={{ scale: yesButtonSize }}
                  onClick={handleYes}
                  className="bg-green-500 text-white px-10 py-4 rounded-full font-bold shadow-xl z-50"
                  whileHover={{ scale: yesButtonSize + 0.1 }}
                >
                  YES! 💍
                </motion.button>

                <motion.button
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  style={{ 
                    position: noButtonPos.x ? 'fixed' : 'relative',
                    left: noButtonPos.x,
                    top: noButtonPos.y
                  }}
                  className="bg-gray-400 text-white px-8 py-3 rounded-full font-medium"
                >
                  No
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-cursive text-romantic-red mb-4">
              YAYYY! ❤️
            </h1>
            <p className="text-xl text-pink-600">I knew you'd say yes! I love you!</p>
            {/* Add a cute GIF here */}
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHp4dnR6MmticHhqZ3Z0eHB6eHB6eHB6eHB6eHB6eHB6eHB6ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/c76IJLufpNUMvULn59/giphy.gif" 
              alt="Cute hearts" 
              className="mx-auto mt-8 w-64"
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Background Floating Hearts */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
         {[...Array(15)].map((_, i) => (
           <motion.div
             key={i}
             className="absolute text-romantic-pink opacity-20"
             initial={{ y: '100vh', x: Math.random() * 100 + 'vw' }}
             animate={{ y: '-10vh' }}
             transition={{ duration: Math.random() * 10 + 5, repeat: Infinity, ease: "linear" }}
           >
             ❤️
           </motion.div>
         ))}
      </div>
    </div>
  );
};

export default App;