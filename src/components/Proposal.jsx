import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOVE_LETTER_CONTENT } from '../constants/content';

const Proposal = ({ onClose }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-rose-950/70 backdrop-blur-lg p-4"
    >
      <div className="relative w-full max-w-lg perspective-2000">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* --- REAL 3D ENVELOPE --- */
            <motion.div
              key="sealed-env"
              initial={{ y: 100, rotateX: 20 }}
              animate={{ y: 0, rotateX: 0 }}
              exit={{ y: -500, opacity: 0 }}
              className="envelope-wrapper"
              onClick={() => setIsOpened(true)}
            >
              <div className="envelope-top"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="wax-seal"
                >
                  S
                </motion.div>
              </div>
              <div className="absolute bottom-4 w-full text-center px-4">
                <p className="font-cursive text-rose-900 opacity-60 animate-pulse text-lg">
                  Tap the seal to reveal...
                </p>
              </div>
            </motion.div>
          ) : (
            /* --- THE ROYAL LETTER REVEAL --- */
            <motion.div
              key="parchment-letter"
              initial={{ y: 400, opacity: 0, scale: 0.8 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative w-full bg-[#fdf5e6] rounded-sm shadow-[0_30px_60px_rgba(0,0,0,0.4)] overflow-hidden border-x-[10px] md:border-x-[15px] border-y-[10px] border-[#ecd98a]"
            >
              {/* Decorative Header */}
              <div className="h-12 bg-[#ecd98a] flex items-center justify-between px-6">
                <span className="text-xl">🌹</span>
                <button 
                  onClick={onClose} 
                  className="text-rose-900 font-bold hover:scale-125 transition-transform text-2xl"
                >
                  ✕
                </button>
                <span className="text-xl">🌹</span>
              </div>

              <div className="p-6 md:p-12 h-[75vh] md:h-[80vh] overflow-y-auto no-scrollbar letter-paper text-[#4a342e]">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <h2 className="text-4xl md:text-5xl font-cursive mb-8 md:mb-12 text-rose-800 border-b border-rose-200 pb-4">
                    {LOVE_LETTER_CONTENT.title}
                  </h2>

                  <div className="space-y-8 md:space-y-10 text-xl md:text-3xl font-serif italic leading-relaxed">
                    {LOVE_LETTER_CONTENT.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 1.2 + 0.8 }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 4, duration: 1 }}
                    className="h-[1px] bg-rose-300 my-12 md:my-16"
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.5 }}
                    className="text-right pr-4"
                  >
                    <p className="text-xl md:text-2xl font-serif text-rose-700 italic">
                      {LOVE_LETTER_CONTENT.signature}
                    </p>
                    <motion.p 
                      className="text-4xl md:text-6xl font-cursive text-rose-900 mt-4 md:mt-6 drop-shadow-sm"
                    >
                      {LOVE_LETTER_CONTENT.name}
                    </motion.p>
                  </motion.div>

                  <div className="flex justify-center mt-16 md:mt-20 pb-10">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-6xl md:text-7xl"
                    >
                      💝
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ultra-Real Rose Petal Rain */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
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
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className="absolute text-2xl md:text-3xl"
            style={{ left: `${Math.random() * 100}%` }}
          >
            🌹
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Proposal;