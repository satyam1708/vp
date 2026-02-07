import { motion } from 'framer-motion';

const Heart = ({ delay, x }) => (
  <motion.svg
    className="absolute opacity-20 text-romantic-pink"
    style={{ left: x }}
    width="24" height="24" viewBox="0 0 24 24"
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ y: "-10vh", opacity: [0, 0.4, 0] }}
    transition={{ duration: 12, delay, repeat: Infinity, ease: "linear" }}
    fill="currentColor"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </motion.svg>
);

export default Heart;