import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function useMagnetic(disabled = false, strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.25 });

  const onPointerMove = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    x.set(clamp(dx, -12, 12));
    y.set(clamp(dy, -12, 12));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: sx, y: sy, onPointerMove, onPointerLeave };
}

export function MagneticButton({
  href,
  children,
  variant = 'primary',
  className = '',
  reducedMotion,
  onClick,
}) {
  const disabled = reducedMotion;
  const magnet = useMagnetic(disabled, 0.25);
  const isPrimary = variant === 'primary';

  const base = 'relative inline-flex items-center justify-center min-h-[44px] sm:min-h-[48px] px-6 sm:px-8 py-3 rounded-xl text-sm sm:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary';
  const primaryClasses = 'bg-gradient-to-r from-secondary via-sky-500 to-secondary text-white shadow-lg shadow-secondary/25';
  const secondaryClasses = 'bg-white/5 text-white/90 border border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-secondary/50';

  const Comp = href ? motion.a : motion.button;

  return (
    <Comp
      href={href}
      onClick={onClick}
      className={`${base} ${isPrimary ? primaryClasses : secondaryClasses} ${className}`}
      style={disabled ? {} : { x: magnet.x, y: magnet.y }}
      onPointerMove={magnet.onPointerMove}
      onPointerLeave={magnet.onPointerLeave}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {isPrimary && !disabled && (
        <>
          {/* Glow on hover */}
          <span className="absolute -inset-1 rounded-xl bg-secondary/30 blur-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 -z-10" />
          {/* Shine sweep on hover */}
          <span className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
            <span className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-hero-shine-sweep" />
          </span>
        </>
      )}
      <span className="relative z-10">{children}</span>
    </Comp>
  );
}

export default MagneticButton;
