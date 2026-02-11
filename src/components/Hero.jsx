import { useState, useEffect } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { FiGithub, FiLinkedin, FiChevronDown } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import AnimatedName from './AnimatedName';
import MagneticButton from './MagneticButton';
import ProfileOrb from './ProfileOrb';

// Tiny inline SVG noise pattern (no external asset)
const NOISE_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

const SPRING = { type: 'spring', stiffness: 400, damping: 32, mass: 0.8 };

export default function Hero() {
  const { t } = useTranslation();
  const reducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const { scrollY } = useScroll();
  const scrollCueOpacity = useTransform(scrollY, [0, 120], [1, 0]);
  const scrollCueY = useTransform(scrollY, [0, 120], [0, -20]);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const fn = () => setIsMobile(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/metufann', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/metufann/', label: 'LinkedIn' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen scroll-mt-24 flex flex-col items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-24"
    >
      {/* ========== CINEMATIC BACKGROUND LAYERS ========== */}

      {/* 1. Base gradient + aurora */}
      <div
        className="hero-aurora absolute inset-0 opacity-100"
        aria-hidden="true"
        style={
          reducedMotion
            ? {}
            : {
                animation: 'hero-aurora-shift 18s ease-in-out infinite alternate',
              }
        }
      />

      {/* 2. Grid overlay */}
      <div
        className="hero-grid absolute inset-0 opacity-80"
        aria-hidden="true"
        style={
          reducedMotion
            ? {}
            : {
                transform: 'perspective(500px) rotateX(60deg) scale(1.2)',
                transformOrigin: '50% 0%',
                animation: 'hero-grid-drift 25s linear infinite',
              }
        }
      />

      {/* 3. Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("${NOISE_SVG}")`,
          backgroundSize: '256px 256px',
          animation: reducedMotion ? 'none' : 'hero-noise-move 0.2s steps(1) infinite',
        }}
      />

      {/* 4. Bokeh blobs */}
      {!reducedMotion &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-secondary/15 blur-3xl pointer-events-none"
            aria-hidden="true"
            style={{
              width: 120 + i * 40,
              height: 120 + i * 40,
              left: `${15 + i * 18}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              x: [0, 20, -10, 0],
              y: [0, -15, 10, 0],
              scale: [1, 1.1, 0.95, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.4,
            }}
          />
        ))}

      {/* 5. Spotlight behind headline */}
      <div
        className="absolute left-0 top-1/4 w-[80%] max-w-xl h-80 rounded-full bg-secondary/20 blur-[80px] pointer-events-none -translate-y-1/2"
        aria-hidden="true"
      />
      {/* Spotlight behind orb */}
      <div
        className="absolute right-0 top-1/2 w-72 h-72 rounded-full bg-secondary/25 blur-[70px] pointer-events-none -translate-y-1/2 md:block hidden"
        aria-hidden="true"
      />

      {/* ========== KEYFRAMES (reduced-motion safe) ========== */}
      {!reducedMotion && (
        <style>{`
          @keyframes hero-aurora-shift {
            0% { transform: scale(1) rotate(0deg); opacity: 1; }
            100% { transform: scale(1.05) rotate(2deg); opacity: 0.9; }
          }
          @keyframes hero-grid-drift {
            0% { transform: perspective(500px) rotateX(60deg) scale(1.2) translateY(0); }
            100% { transform: perspective(500px) rotateX(60deg) scale(1.2) translateY(60px); }
          }
          @keyframes hero-noise-move {
            0%, 100% { background-position: 0 0; }
            25% { background-position: 64px 64px; }
            50% { background-position: 128px 0; }
            75% { background-position: 0 128px; }
          }
        `}</style>
      )}

      {/* ========== CONTENT ========== */}
      <div className="container-padding relative z-10 w-full max-w-6xl mx-auto flex-1 flex flex-col justify-center">
        <div className="grid gap-6 lg:gap-10 xl:gap-12 items-center min-h-0 md:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT: Headline, role, bio, socials, CTAs - more space for long names */}
          <div className="order-1 text-center md:text-left min-w-0">
            <AnimatedName
              hiText={t('hero.hi')}
              name="Muhammet Emin Tufan"
              reducedMotion={reducedMotion}
            />

            {/* Role with kinetic underline */}
            <motion.div
              className="relative inline-block mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...SPRING, delay: 0.35 }}
            >
              <h2 className="text-base sm:text-lg md:text-xl text-white/75 font-medium">
                {t('hero.title')}
              </h2>
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-secondary to-sky-400"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>

            {/* Bio */}
            <motion.p
              className="text-white/60 text-sm sm:text-base max-w-lg mx-auto md:mx-0 mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, filter: 'blur(8px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {t('hero.intro')}
            </motion.p>

            {/* Social icons */}
            <motion.div
              className="flex justify-center md:justify-start gap-3 sm:gap-4 mb-6 sm:mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {socialLinks.map(({ icon: Icon, href, label }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-xl bg-white/5 text-white/70 border border-white/10 hover:text-secondary hover:border-secondary/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                  whileHover={reducedMotion ? undefined : { scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 + i * 0.05 }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <MagneticButton
                href="#contact"
                variant="primary"
                reducedMotion={reducedMotion}
                className="group"
              >
                {t('hero.getInTouch')}
              </MagneticButton>
              <MagneticButton
                href="#projects"
                variant="secondary"
                reducedMotion={reducedMotion}
              >
                {t('hero.viewProjects')}
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT: Profile orb (desktop) */}
          <motion.div
            className="order-2 flex justify-center md:justify-end"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...SPRING, delay: 0.25 }}
          >
            <ProfileOrb reducedMotion={reducedMotion} isMobile={isMobile} />
          </motion.div>
        </div>

      </div>

      {/* Scroll cue - hide on short viewports or when scrolled */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{
          opacity: scrollCueOpacity,
          y: scrollCueY,
        }}
      >
        <span className="text-xs font-medium text-white/50 uppercase tracking-widest">Scroll</span>
        {!reducedMotion && (
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FiChevronDown className="w-5 h-5 text-white/40" aria-hidden />
          </motion.div>
        )}
        {reducedMotion && <FiChevronDown className="w-5 h-5 text-white/40" aria-hidden />}
      </motion.div>
    </section>
  );
}
