import { motion, useReducedMotion } from 'framer-motion';

// Positions for desktop: orbit around the orb (angle in deg, distance as %)
const DESKTOP_POSITIONS = [
  { angle: 0, dist: 1.35, delay: 0 },
  { angle: 72, dist: 1.3, delay: 0.2 },
  { angle: 144, dist: 1.32, delay: 0.4 },
  { angle: 216, dist: 1.28, delay: 0.1 },
  { angle: 288, dist: 1.33, delay: 0.3 },
];

// Mobile: grid below the orb, no overlap
const MOBILE_POSITIONS = [
  { row: 0, col: 0 },
  { row: 0, col: 1 },
  { row: 0, col: 2 },
  { row: 1, col: 0 },
  { row: 1, col: 1 },
];

const BADGES = ['React', 'Node', 'Java', 'Spring', 'AI'];

function FloatingBadge({ label, index, reducedMotion, isMobile }) {
  const floatDuration = 3 + (index % 3) * 0.5;
  const floatDelay = (index % 5) * 0.15;

  if (reducedMotion) {
    return (
      <div
        className="absolute flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md shadow-lg"
        style={
          isMobile
            ? (() => {
                const { row, col } = MOBILE_POSITIONS[index];
                return {
                  left: `${15 + col * 35}%`,
                  top: `${55 + row * 22}%`,
                };
              })()
            : (() => {
                const { angle, dist } = DESKTOP_POSITIONS[index];
                const rad = (angle * Math.PI) / 180;
                const x = 50 + dist * 25 * Math.cos(rad);
                const y = 50 + dist * 25 * Math.sin(rad);
                return { left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' };
              })()
        }
      >
        {label}
      </div>
    );
  }

  if (isMobile) {
    const { row, col } = MOBILE_POSITIONS[index];
    return (
      <motion.div
        className="absolute flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md shadow-lg"
        style={{
          left: `${15 + col * 35}%`,
          top: `${55 + row * 22}%`,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 + index * 0.08, type: 'spring', stiffness: 300, damping: 24 }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        {label}
      </motion.div>
    );
  }

  const { angle, dist, delay } = DESKTOP_POSITIONS[index];
  const rad = (angle * Math.PI) / 180;
  const baseX = 50 + dist * 25 * Math.cos(rad);
  const baseY = 50 + dist * 25 * Math.sin(rad);

  return (
    <motion.div
      className="absolute flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md shadow-lg will-change-transform"
      style={{
        left: `${baseX}%`,
        top: `${baseY}%`,
        x: '-50%',
        y: '-50%',
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: ['-50%', '-55%', '-50%'],
        rotate: [0, 2, -2, 0],
      }}
      transition={{
        opacity: { delay: 0.5 + delay, duration: 0.4 },
        scale: { delay: 0.5 + delay, type: 'spring', stiffness: 400, damping: 25 },
        y: { duration: floatDuration, repeat: Infinity, ease: 'easeInOut', delay: floatDelay + 0.5 },
        rotate: { duration: floatDuration + 0.5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay + 0.7 },
      }}
      whileHover={{ scale: 1.08 }}
    >
      {label}
    </motion.div>
  );
}

export default FloatingBadge;
