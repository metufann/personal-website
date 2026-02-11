import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const SPRING = { type: 'spring', stiffness: 520, damping: 36, mass: 0.8 };
const STAGGER = 0.04;

function AnimatedName({ hiText, name, reducedMotion }) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef(null);

  const words = hiText.split(' ');
  const nameChars = name.split('');

  if (reducedMotion) {
    return (
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 break-words">
        <span className="text-white/90">{hiText} </span>
        <span className="bg-gradient-to-r from-secondary via-sky-400 to-secondary bg-clip-text text-transparent break-words">
          {name}
        </span>
      </h1>
    );
  }

  return (
    <h1
      ref={containerRef}
      className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 flex flex-wrap items-baseline gap-x-1 gap-y-1 [perspective:600px] break-words overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {words.map((word, wi) => (
        <span key={wi} className="inline-flex">
          {word.split('').map((char, ci) => (
            <motion.span
              key={`${wi}-${ci}`}
              className="inline-block text-white/90"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...SPRING,
                delay: (wi * 4 + ci) * STAGGER,
              }}
            >
              {char}
            </motion.span>
          ))}
          {wi < words.length - 1 && '\u00A0'}
        </span>
      ))}
      {'\u00A0'}
      <span className="relative inline-flex overflow-hidden">
        {/* Gradient sweep (sheen) */}
        <motion.span
          className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: 'easeInOut',
          }}
        />
        {nameChars.map((char, i) => (
          <motion.span
            key={i}
            className="relative inline-block origin-center bg-gradient-to-r from-secondary via-sky-400 to-secondary bg-clip-text text-transparent [transform-style:preserve-3d]"
            style={{ WebkitBackgroundClip: 'text' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: hovered ? 360 : 0,
            }}
            transition={{
              opacity: { ...SPRING, delay: (words.length * 4 + i) * STAGGER },
              y: { ...SPRING, delay: (words.length * 4 + i) * STAGGER },
              rotateX: { type: 'spring', stiffness: 400, damping: 20 },
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </h1>
  );
}

export default AnimatedName;
