import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import Proposal from './components/Proposal';
import Heart from './components/Heart';
import { VALENTINE_WEEK } from './constants/content';

export default function App() {
  const [phase, setPhase] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [day, setDay] = useState({ name: 'Special Day', emoji: '✨' });

  useEffect(() => {
    const d = new Date().getDate();
    if (VALENTINE_WEEK[d]) setDay(VALENTINE_WEEK[d]);
  }, []);

  const yes = () => {
    setAccepted(true);
    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: .6 },
      colors: ['#ff4d6d', '#ff85a1']
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      
      {/* floating hearts */}
      {[...Array(14)].map((_, i) => (
        <Heart key={i} delay={i * 1.3} />
      ))}

      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: .95 }}
            className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl p-6 sm:p-10 w-full max-w-md text-center z-10"
          >
            <span className="text-5xl">{day.emoji}</span>
            <p className="uppercase tracking-widest text-sm text-rose-700 mt-2">
              {day.name}
            </p>

            <h1
              className="mt-6 mb-10 text-rose-800"
              style={{
                fontFamily: 'Great Vibes',
                fontSize: 'clamp(2.2rem, 6vw, 3.5rem)'
              }}
            >
              {phase === 0
                ? `Happy ${day.name}, My Love`
                : 'Will you be mine forever?'}
            </h1>

            {phase === 0 ? (
              <button
                onClick={() => setPhase(1)}
                className="w-full py-4 rounded-full bg-rose-700 text-white text-lg font-semibold hover:bg-rose-600 transition"
              >
                I have a question 💌
              </button>
            ) : (
              <div className="flex flex-col gap-6 items-center">
                <motion.button
                  whileTap={{ scale: .95 }}
                  onClick={yes}
                  className="px-14 py-4 bg-green-500 rounded-2xl text-white text-xl font-bold shadow-xl"
                >
                  YES 💍
                </motion.button>

                <motion.button
                  whileHover={{ x: Math.random()*40 - 20 }}
                  className="px-10 py-3 bg-gray-400 text-white rounded-xl"
                >
                  No 🙈
                </motion.button>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: .7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center z-10"
          >
            <h2
              className="text-rose-700 mb-8"
              style={{
                fontFamily: 'Great Vibes',
                fontSize: 'clamp(3rem, 8vw, 4.5rem)'
              }}
            >
              Yayyy ❤️
            </h2>

            <button
              onClick={() => setShowLetter(true)}
              className="bg-white rounded-2xl p-6 shadow-xl hover:scale-105 transition"
            >
              <div className="text-6xl">✉️</div>
              <p className="mt-2 font-semibold">Open your love letter</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLetter && <Proposal onClose={() => setShowLetter(false)} />}
      </AnimatePresence>
    </div>
  );
}