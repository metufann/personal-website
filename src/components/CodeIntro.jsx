import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

const LINES = [
  'const portfolio = async () => {',
  '  const dev = await import("./skills");',
  '  const projects = await dev.build();',
  '  return projects;',
  '};',
  '',
  '> npm run portfolio',
];

const TYPING_DELAY = 28;
const LINE_DELAY = 180;
const AUTO_RUN_DELAY = 700;

export default function CodeIntro({ onComplete, reducedMotion }) {
  const [phase, setPhase] = useState('typing');
  const [visibleText, setVisibleText] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const allLines = LINES.join('\n');

  // Typing effect
  useEffect(() => {
    if (reducedMotion) {
      setVisibleText(allLines);
      const t = setTimeout(() => setPhase('ready'), 400);
      return () => clearTimeout(t);
    }
    if (phase !== 'typing') return;

    if (lineIndex >= LINES.length) {
      setPhase('ready');
      return;
    }

    const line = LINES[lineIndex];
    const timer = setTimeout(() => {
      if (charIndex < line.length) {
        setVisibleText((prev) => prev + line[charIndex]);
        setCharIndex((c) => c + 1);
      } else {
        setVisibleText((prev) => prev + '\n');
        setLineIndex((l) => l + 1);
        setCharIndex(0);
      }
    }, charIndex === 0 && lineIndex > 0 ? LINE_DELAY : TYPING_DELAY);

    return () => clearTimeout(timer);
  }, [phase, lineIndex, charIndex, reducedMotion]);

  const handleRun = useCallback(() => {
    if (phase !== 'ready') return;
    setPhase('compiling');
    setTimeout(() => setPhase('running'), 500);
  }, [phase]);

  const handleSkip = useCallback(() => {
    setPhase('running');
  }, []);

  // Auto-run when ready
  useEffect(() => {
    if (phase !== 'ready' || reducedMotion) return;
    const t = setTimeout(handleRun, AUTO_RUN_DELAY);
    return () => clearTimeout(t);
  }, [phase, reducedMotion, handleRun]);

  // Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Enter' && phase === 'ready') handleRun();
      if (e.key === 'Escape') handleSkip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, handleRun, handleSkip]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={phase === 'running' ? 'exit' : 'idle'}
      variants={{
        idle: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        exit: {
          opacity: 0,
          scale: 1.5,
          filter: 'blur(16px)',
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      onAnimationComplete={(v) => v === 'exit' && onComplete()}
    >
      {/* Background - dev theme (VS Code / GitHub dark) */}
      <div className="absolute inset-0 bg-[#0d1117]" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(ellipse 50% 30% at 80% 70%, rgba(34,197,94,0.08), transparent 50%)',
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      {/* Subtle orbs - blue/green dev accents */}
      {!reducedMotion &&
        [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: 100 + i * 80,
              height: 100 + i * 80,
              left: `${20 + i * 25}%`,
              top: `${10 + (i % 2) * 50}%`,
              background: i % 2 === 0 ? 'radial-gradient(circle, rgba(59,130,246,0.4), transparent 70%)' : 'radial-gradient(circle, rgba(34,197,94,0.25), transparent 70%)',
            }}
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}

      {/* Main content */}
      <div className="relative w-full max-w-2xl mx-4 flex flex-col items-center">
        {/* Welcome badge */}
        <motion.div
          className="mb-4 flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-4 py-1.5 backdrop-blur-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-medium text-white/90">Developer Mode</span>
        </motion.div>

        {/* IDE frame */}
        <motion.div
          className="relative w-full rounded-xl overflow-hidden border border-white/[0.08] bg-[#161b22]/95 shadow-2xl shadow-black/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 28 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.08] bg-[#21262d]">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27ca40]" />
            </div>
            <span className="flex-1 text-center text-xs text-white/60 font-medium">
              portfolio.js
            </span>
            <div className="flex gap-1.5">
              <span className="px-2 py-0.5 rounded bg-green-500/15 text-[10px] font-mono text-green-400">
                js
              </span>
            </div>
          </div>

          {/* Code area */}
          <div className="relative p-4 sm:p-6 font-mono text-sm sm:text-base bg-[#0d1117]/50">
            <pre className="relative text-white/95 whitespace-pre-wrap break-all">
              {visibleText}
              {phase === 'compiling' && (
                <>
                  {'\n\n'}
                  <motion.span
                    className="text-green-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {'> Building portfolio...'}
                  </motion.span>
                  <motion.span
                    className="inline-block ml-1 text-green-500"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    |
                  </motion.span>
                </>
              )}
              {phase === 'compiling' && (
                <motion.div
                  className="mt-3 inline-flex items-center gap-2 text-green-500 text-sm"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <span className="text-lg">✓</span>
                  <span>Launching...</span>
                </motion.div>
              )}
              {phase === 'typing' || phase === 'ready' ? (
                <span className="inline-block w-2 h-4 ml-0.5 bg-blue-400 rounded-sm animate-pulse" />
              ) : null}
            </pre>
          </div>

          {/* Run bar */}
          <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-white/[0.08] bg-[#21262d]/80">
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <span className="opacity-60">▶</span>
              <span>
                {phase === 'ready' ? 'Running in 0.7s...' : phase === 'typing' ? 'Typing...' : ''}
              </span>
            </div>
            <motion.button
              onClick={handleRun}
              disabled={phase !== 'ready'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]"
              whileHover={phase === 'ready' ? { scale: 1.02 } : {}}
              whileTap={phase === 'ready' ? { scale: 0.98 } : {}}
            >
              <span className="text-white/90">▶</span>
              Run
            </motion.button>
          </div>
        </motion.div>

        {/* Skip link */}
        <motion.button
          onClick={handleSkip}
          className="mt-5 text-center text-xs text-white/35 hover:text-white/70 transition-colors focus:outline-none focus-visible:underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Skip intro
        </motion.button>
      </div>
    </motion.div>
  );
}
