import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import FloatingBadge from './FloatingBadge';

const BADGES = ['React', 'Node', 'Java', 'Spring', 'AI'];

function useTilt(disabled) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 180, damping: 22, mass: 0.5 });

  const onMouseMove = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(dy * -6);
    y.set(dx * 6);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX: sx, rotateY: sy, onMouseMove, onMouseLeave };
}

export default function ProfileOrb({ reducedMotion, isMobile }) {
  const containerRef = useRef(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const tilt = useTilt(reducedMotion || isMobile);

  return (
    <motion.div
      ref={containerRef}
      className="relative w-[min(180px,45vw)] aspect-square sm:w-56 md:w-64 lg:w-72"
      style={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={
        reducedMotion
          ? {}
          : {
              y: [0, -8, 0],
            }
      }
      transition={
        reducedMotion ? {} : { y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }
      }
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
    >
      {/* Bloom / glow behind orb */}
      <div
        className="absolute inset-0 rounded-full bg-secondary/30 blur-3xl scale-150 opacity-60"
        style={{ transform: 'translateZ(-40px) scale(1.5)' }}
      />

      {/* Outer rotating gradient ring */}
      <motion.div
        className="absolute inset-[-8%] rounded-full border-2 border-transparent"
        style={{
          background: 'conic-gradient(from 0deg, #3b82f6, #0ea5e9, #3b82f6, #6366f1, #3b82f6)',
          WebkitMask: 'radial-gradient(farthest-side, transparent 60%, black 62%)',
          mask: 'radial-gradient(farthest-side, transparent 60%, black 62%)',
        }}
        animate={reducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Inner glass ring / stroke */}
      <div
        className="absolute inset-0 rounded-full ring-2 ring-white/20 ring-inset"
        style={{ transform: 'translateZ(1px)' }}
      />

      {/* Orb body + image */}
      <div
        className="absolute inset-[6%] rounded-full overflow-hidden border border-white/10 bg-neutral-900/80 backdrop-blur-sm"
        style={{
          transform: 'translateZ(2px)',
          boxShadow: 'inset 0 0 40px rgba(59, 130, 246, 0.15)',
        }}
      >
        <img
          src="/images/profile.jpg"
          alt="Muhammet Emin Tufan"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* Floating badges */}
      {mounted &&
        BADGES.map((label, i) => (
          <FloatingBadge
            key={label}
            label={label}
            index={i}
            reducedMotion={reducedMotion}
            isMobile={isMobile}
          />
        ))}
    </motion.div>
  );
}
