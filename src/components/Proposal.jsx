import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { LOVE_LETTER_CONTENT } from '../constants/content';

export default function Proposal({ onClose }) {
  const [open, setOpen] = useState(false);

  const petals = useMemo(
    () =>
      Array.from({ length: 12 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 6 + 7,
        drift: Math.random() * 24 - 12,
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
      <div className="relative w-full max-w-lg perspective-2000">
        <AnimatePresence mode="wait">
          {!open ? (
            /* ================= ENVELOPE ================= */
            <motion.div
              key="envelope"
              initial={{ y: 140, rotateX: 28, opacity: 0 }}
              animate={{ y: 0, rotateX: 0, opacity: 1 }}
              exit={{ y: -260, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 80, damping: 18 }}
              className="envelope-wrapper mx-auto cursor-pointer"
              onClick={() => setOpen(true)}
            >
              <div className="envelope-top" />

              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className="wax-seal"
                >
                  S
                </motion.div>
              </div>

              <p className="absolute bottom-4 w-full text-center text-rose-900/70 font-cursive animate-pulse">
                Tap the seal… I wrote this for you
              </p>
            </motion.div>
          ) : (
            /* ================= LETTER ================= */
            <motion.div
              key="letter"
              initial={{ y: 280, opacity: 0, scale: 0.96, rotate: -0.6 }}
              animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 24, stiffness: 95 }}
              className="
                relative
                w-full
                bg-[#fdf5e6]
                rounded-[8px]
                shadow-[0_40px_90px_rgba(0,0,0,0.35)]
                overflow-hidden
                border-x-[12px] sm:border-x-[18px]
                border-y-[12px]
                border-[#e3cf9f]
              "
            >
              {/* HEADER */}
              <div className="h-12 sm:h-14 bg-[#ecd98a] flex items-center justify-between px-4 sm:px-6">
                <span>🌹</span>
                <button
                  onClick={onClose}
                  className="text-2xl text-rose-900 hover:scale-125 transition-transform"
                >
                  ✕
                </button>
                <span>🌹</span>
              </div>

              {/* PAPER */}
              <div
                className="letter-paper relative p-7 sm:p-12 md:p-16 max-h-[74vh] overflow-y-auto no-scrollbar"
              >
                {/* paper vignette */}
                <div className="absolute inset-0 pointer-events-none paper-vignette" />

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="relative handwritten"
                >
                  {/* TITLE */}
                  <h2 className="letter-title">
                    {LOVE_LETTER_CONTENT.title}
                  </h2>

                  {/* BODY */}
                  <div className="letter-body">
                    {LOVE_LETTER_CONTENT.paragraphs.map((p, i) => (
                      <motion.p
                        key={i}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.7 + 0.9 }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>

                  <div className="letter-divider" />

                  {/* SIGNATURE */}
                  <div className="letter-signature">
                    <p>{LOVE_LETTER_CONTENT.signature}</p>
                    <span>{LOVE_LETTER_CONTENT.name}</span>
                  </div>

                  <div className="flex justify-center mt-20">
                    <motion.div
                      animate={{ scale: [1, 1.12, 1] }}
                      transition={{ repeat: Infinity, duration: 3.2 }}
                      className="text-6xl"
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

      {/* ROSE PETALS */}
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
            className="absolute text-2xl opacity-70"
            style={{ left: `${p.left}%` }}
          >
            🌹
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}