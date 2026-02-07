import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LOVE_LETTER_CONTENT } from '../constants/content';

export default function Proposal({ onClose }) {
  const [open, setOpen] = useState(false);

  // Optimized Rose Petal Physics
  const petals = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 7,
        rotate: Math.random() * 360,
        size: Math.random() * (30 - 15) + 15,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-rose-950/80 backdrop-blur-2xl flex items-center justify-center px-4"
    >
      <div className="relative w-full max-w-lg perspective-2000 flex flex-col items-center justify-center h-full">
        
        <AnimatePresence mode="wait">
          {!open ? (
            /* ================= 3D INTERACTIVE ENVELOPE ================= */
            <motion.div
              key="envelope-sealed"
              initial={{ scale: 0.8, rotateX: 30, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ y: 200, opacity: 0, transition: { duration: 0.4 } }}
              className="envelope-wrapper relative shadow-[0_50px_100px_rgba(0,0,0,0.5)]"
              onClick={() => setOpen(true)}
            >
              <div className="envelope-top" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="wax-seal cursor-pointer z-30"
                >
                  S
                </motion.div>
              </div>

              <motion.p 
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-6 w-full text-center text-rose-900/80 font-elegant italic tracking-wider text-xl"
              >
                Tap the seal to open your heart...
              </motion.p>
            </motion.div>
          ) : (
            /* ================= THE PHYSICAL REVEAL (SCROLL FIXED) ================= */
            <motion.div
              key="letter-revealed"
              initial={{ y: 600, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', damping: 20, stiffness: 80 }}
              className="
                relative
                w-full
                bg-[#fdf5e6]
                rounded-xl
                shadow-[0_40px_100px_rgba(0,0,0,0.6)]
                border-x-[10px] md:border-x-[15px]
                border-y-[12px]
                border-[#ecd98a]
                flex flex-col
                max-h-[85vh]
              "
            >
              {/* VINTAGE HEADER */}
              <div className="h-14 bg-[#ecd98a] flex items-center justify-between px-6 shrink-0 border-b border-rose-200/30">
                <span className="text-2xl">🌹</span>
                <button
                  onClick={onClose}
                  className="text-rose-900 font-bold text-2xl hover:scale-125 transition-transform"
                >
                  ✕
                </button>
                <span className="text-2xl">🌹</span>
              </div>

              {/* PARCHMENT CONTENT - This is where the scroll lives */}
              <div className="letter-paper p-6 md:p-12 overflow-y-auto overflow-x-hidden no-scrollbar relative touch-pan-y">
                <div className="absolute inset-0 pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/papyros.png')]" />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <h2 className="text-4xl md:text-6xl font-elegant text-rose-800 mb-8 border-b border-rose-100 pb-4">
                    {LOVE_LETTER_CONTENT.title}
                  </h2>

                  <div className="space-y-8 text-xl md:text-3xl font-elegant leading-relaxed text-rose-950">
                    {LOVE_LETTER_CONTENT.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.8 + 1 }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>

                  {/* SIGNATURE AREA */}
                  <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4 }}
                    className="mt-16 pt-10 border-t border-rose-200 text-right"
                  >
                    <p className="text-xl italic text-rose-700 mb-2">{LOVE_LETTER_CONTENT.signature}</p>
                    <span className="text-5xl md:text-7xl font-elegant text-rose-900 drop-shadow-sm block">
                      {LOVE_LETTER_CONTENT.name}
                    </span>
                  </motion.div>

                  <div className="flex justify-center mt-12 pb-10">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-7xl"
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

      {/* LUXURY ROSE PETAL RAIN */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              x: [0, Math.sin(i) * 50],
              rotate: p.rotate + 360,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute"
            style={{ 
                left: `${p.left}%`,
                fontSize: `${p.size}px`
            }}
          >
            🌹
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}