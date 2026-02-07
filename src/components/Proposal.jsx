import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LOVE_LETTER_CONTENT } from '../constants/content';

export default function Proposal({ onClose }) {
  const [open, setOpen] = useState(false);

  // Memoized petals so they don't re-randomize on every render
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 6,
        drift: Math.random() * 40 - 20,
      })),
    []
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-rose-950/70 backdrop-blur-xl flex items-center justify-center px-4"
    >
      {/* ===== CENTER CONTAINER ===== */}
      <div className="relative w-full max-w-lg perspective-2000">
        <AnimatePresence mode="wait">
          {!open ? (
            /* ================= ENVELOPE ================= */
            <motion.div
              key="envelope"
              initial={{ y: 120, rotateX: 25, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 1 }}
              exit={{ y: -400, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 90, damping: 18 }}
              className="envelope-wrapper mx-auto cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="envelope-top" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  whileTap={{ scale: 0.95 }}
                  className="wax-seal"
                >
                  S
                </motion.div>
              </div>

              <p className="absolute bottom-4 w-full text-center text-rose-900/70 font-cursive animate-pulse">
                Tap the seal to reveal…
              </p>
            </motion.div>
          ) : (
            /* ================= LETTER ================= */
            <motion.div
              key="letter"
              initial={{ y: 260, opacity: 0, scale: 0.92 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 22, stiffness: 100 }}
              className="
                relative
                w-full
                bg-[#fdf5e6]
                rounded-xl
                shadow-[0_30px_70px_rgba(0,0,0,0.45)]
                overflow-hidden
                border-x-[8px] sm:border-x-[14px]
                border-y-[8px]
                border-[#ecd98a]
              "
            >
              {/* ===== HEADER ===== */}
              <div className="h-12 sm:h-14 bg-[#ecd98a] flex items-center justify-between px-4 sm:px-6">
                <span className="text-lg sm:text-xl">🌹</span>
                <button
                  onClick={onClose}
                  className="text-2xl text-rose-900 hover:scale-125 transition-transform"
                  aria-label="Close letter"
                >
                  ✕
                </button>
                <span className="text-lg sm:text-xl">🌹</span>
              </div>

              {/* ===== LETTER BODY ===== */}
              <div
                className="
                  letter-paper
                  p-5 sm:p-8 md:p-12
                  max-h-[72vh] sm:max-h-[78vh]
                  overflow-y-auto
                  no-scrollbar
                  text-[#4a342e]
                "
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {/* TITLE */}
                  <h2
                    className="mb-8 sm:mb-12 text-rose-800 border-b border-rose-200 pb-4"
                    style={{
                      fontFamily: 'Great Vibes',
                      fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
                    }}
                  >
                    {LOVE_LETTER_CONTENT.title}
                  </h2>

                  {/* PARAGRAPHS */}
                  <div
                    className="space-y-7 sm:space-y-10 font-serif italic leading-relaxed"
                    style={{ fontSize: 'clamp(1.15rem, 3.6vw, 1.8rem)' }}
                  >
                    {LOVE_LETTER_CONTENT.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.6 + 0.8 }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>

                  {/* DIVIDER */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 3, duration: 1 }}
                    className="h-px bg-rose-300 my-12 sm:my-16"
                  />

                  {/* SIGNATURE */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.5 }}
                    className="text-right"
                  >
                    <p className="italic text-lg sm:text-xl text-rose-700">
                      {LOVE_LETTER_CONTENT.signature}
                    </p>
                    <p
                      className="mt-3 text-4xl sm:text-5xl text-rose-900"
                      style={{ fontFamily: 'Great Vibes' }}
                    >
                      {LOVE_LETTER_CONTENT.name}
                    </p>
                  </motion.div>

                  {/* HEART */}
                  <div className="flex justify-center mt-14 sm:mt-20 pb-6">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="text-6xl sm:text-7xl"
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

      {/* ================= ROSE PETALS ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {petals.map((p, i) => (
          <motion.div
            key={i}
            initial={{ y: -80, opacity: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              x: [0, p.drift],
              rotate: 360,
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute text-2xl sm:text-3xl"
            style={{ left: `${p.left}%` }}
          >
            🌹
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}