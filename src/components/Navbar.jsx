import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function useMagnetic({ disabled = false, strength = 0.35 } = {}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.25 });

  const onPointerMove = (e) => {
    if (disabled) return;
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(clamp(dx * strength, -10, 10));
    y.set(clamp(dy * strength, -10, 10));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { x: sx, y: sy, onPointerMove, onPointerLeave };
}

function HamburgerIcon({ open, reducedMotion }) {
  const t = reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 520, damping: 36, mass: 0.6 };

  return (
    <motion.svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className="block"
    >
      <motion.path
        d="M4 6.5H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { d: 'M5 5L15 15', opacity: 1 } : { d: 'M4 6.5H16', opacity: 1 }}
        transition={t}
      />
      <motion.path
        d="M4 10H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { opacity: 0 } : { opacity: 1 }}
        transition={t}
      />
      <motion.path
        d="M4 13.5H16"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={open ? { d: 'M15 5L5 15', opacity: 1 } : { d: 'M4 13.5H16', opacity: 1 }}
        transition={t}
      />
    </motion.svg>
  );
}

const Navbar = () => {
  const reducedMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === null) return true;
    return savedMode === 'true';
  });

  const [activeSection, setActiveSection] = useState('home');
  const { t, i18n } = useTranslation();

  const navItems = useMemo(
    () => [
      { name: t('navbar.home'), href: '#home', key: 'home' },
      { name: t('navbar.about'), href: '#about', key: 'about' },
      { name: t('navbar.skills'), href: '#skills', key: 'skills' },
      { name: t('navbar.experience'), href: '#experience', key: 'experience' },
      { name: t('navbar.projects'), href: '#projects', key: 'projects' },
      { name: t('navbar.contact'), href: '#contact', key: 'contact' },
    ],
    [t]
  );

  const toggleDarkMode = () => {
    const next = !isDark;
    setIsDark(next);
    localStorage.setItem('darkMode', String(next));
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  useEffect(() => {
    const savedLng = localStorage.getItem('lng');
    if (savedLng) i18n.changeLanguage(savedLng);
  }, [i18n]);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // Scroll lock while mobile menu is open
  useEffect(() => {
    if (!menuOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  // Active section tracking (rAF-throttled)
  const rafRef = useRef(0);
  useEffect(() => {
    const ids = navItems.map((i) => i.key);

    const update = () => {
      rafRef.current = 0;
      const current = ids.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 140 && r.bottom >= 140;
      });
      if (current) setActiveSection(current);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [navItems]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 160], [0, 1]);
  const glassOpacity = useTransform(y, [0, 1], [0.38, 0.62]);
  const borderOpacity = useTransform(y, [0, 1], [0.10, 0.24]);
  const shadowOpacity = useTransform(y, [0, 1], [0.0, 0.55]);
  const blurPx = useTransform(y, [0, 1], [12, 18]);
  const barHeight = useTransform(scrollY, [0, 160], [64, 56]);

  const glassBg = useMotionTemplate`rgba(10, 10, 10, ${glassOpacity})`;
  const borderColor = useMotionTemplate`rgba(255, 255, 255, ${borderOpacity})`;
  const shadow = useMotionTemplate`0 10px 30px rgba(0, 0, 0, ${shadowOpacity})`;
  const blur = useMotionTemplate`blur(${blurPx}px)`;

  const entrance = reducedMotion
    ? { initial: false, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0 } }
    : {
        initial: { opacity: 0, y: -18, filter: 'blur(10px)' },
        animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        transition: { type: 'spring', stiffness: 420, damping: 34, mass: 0.7 },
      };

  const desktopCtaMagnet = useMagnetic({ disabled: reducedMotion, strength: 0.25 });

  return (
    <>
      <motion.header
        {...entrance}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 sm:px-4 pt-[max(env(safe-area-inset-top),0.75rem)] sm:pt-[max(env(safe-area-inset-top),1rem)]"
      >
        <div className="w-full max-w-6xl">
          {/* Hairline gradient frame */}
          <div className="rounded-2xl bg-gradient-to-r from-white/15 via-white/5 to-white/15 p-px">
            {/* Glass body */}
            <motion.div
              className="relative rounded-[15px] border border-white/10"
              style={{
                backgroundColor: glassBg,
                boxShadow: shadow,
                borderColor,
                backdropFilter: blur,
                WebkitBackdropFilter: blur,
              }}
            >
              {/* subtle aura */}
              <div className="pointer-events-none absolute inset-0 rounded-[15px] opacity-70">
                <div className="absolute -top-10 left-8 h-24 w-24 rounded-full bg-secondary/20 blur-2xl" />
                <div className="absolute -top-12 right-10 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
              </div>

              <motion.div
                className="relative flex items-center px-3 sm:px-4"
                style={{ height: barHeight }}
              >
                {/* Left: logo/name */}
                <a
                  href="#home"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                  aria-label="Home"
                >
                  <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-white/5 ring-1 ring-white/10">
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/35 to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative text-[11px] font-semibold tracking-tight text-white/90">MT</span>
                  </span>
                  <span className="hidden sm:block">
                    <span className="block text-sm font-semibold tracking-tight text-white/90">
                      Muhammet Emin
                    </span>
                    <span className="block text-[11px] leading-4 text-white/55">
                      Full Stack Developer
                    </span>
                  </span>
                </a>

                {/* Center: nav */}
                <nav className="hidden md:flex flex-1 items-center justify-center">
                  <div className="relative flex items-center gap-1 rounded-full bg-white/5 p-1 ring-1 ring-white/10">
                    {navItems.map((item) => {
                      const isActive = activeSection === item.key;
                      const isHovered = hoveredKey === item.key;
                      const showHover = isHovered && !isActive && !reducedMotion;

                      return (
                        <a
                          key={item.key}
                          href={item.href}
                          onMouseEnter={() => setHoveredKey(item.key)}
                          onMouseLeave={() => setHoveredKey(null)}
                          className="relative rounded-full px-3 py-2 text-[13px] font-medium tracking-tight text-white/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          {showHover && (
                            <motion.span
                              layoutId="nav-hover"
                              className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                              transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.7 }}
                            />
                          )}
                          {isActive && (
                            <motion.span
                              layoutId="nav-active"
                              className="absolute inset-0 rounded-full bg-white/10 ring-1 ring-white/10"
                              transition={{ type: 'spring', stiffness: 520, damping: 42, mass: 0.8 }}
                            />
                          )}
                          <span
                            className={[
                              'relative z-10',
                              isActive ? 'text-white' : 'hover:text-white/90',
                            ].join(' ')}
                          >
                            {item.name}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </nav>

                {/* Right: controls + CTA */}
                <div className="ml-auto flex items-center gap-2">
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="relative">
                      <select
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={i18n.language}
                        className="h-9 rounded-xl bg-white/5 px-3 pr-8 text-xs font-medium text-white/80 ring-1 ring-white/10 outline-none transition hover:bg-white/8 focus:ring-2 focus:ring-secondary/60"
                        aria-label={t('navbar.language')}
                      >
                        <option value="en">EN</option>
                        <option value="tr">TR</option>
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40">
                        ▾
                      </span>
                    </div>

                    <button
                      onClick={toggleDarkMode}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label="Toggle theme"
                    >
                      {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
                    </button>
                  </div>

                  <motion.a
                    href="#contact"
                    className="hidden md:inline-flex relative h-10 items-center justify-center rounded-xl px-4 text-[13px] font-semibold text-white"
                    style={{ x: desktopCtaMagnet.x, y: desktopCtaMagnet.y }}
                    onPointerMove={desktopCtaMagnet.onPointerMove}
                    onPointerLeave={desktopCtaMagnet.onPointerLeave}
                    whileHover={reducedMotion ? undefined : { scale: 1.03 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  >
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/90 via-sky-400/70 to-secondary/90 opacity-90" />
                    <span className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 hover:opacity-100">
                      <span className="absolute -inset-8 bg-secondary/30 blur-2xl" />
                    </span>
                    {!reducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-xl"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.15 }}
                      >
                        <motion.span
                          className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-white/25 blur-sm"
                          initial={{ x: '-40%' }}
                          whileHover={{ x: '260%' }}
                          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </motion.span>
                    )}
                    <span className="relative z-10">{t('navbar.cta')}</span>
                  </motion.a>

                  {/* Mobile controls */}
                  <div className="md:hidden flex items-center gap-1.5">
                    <button
                      onClick={toggleDarkMode}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label="Toggle theme"
                    >
                      {isDark ? <FiSun className="h-4 w-4" /> : <FiMoon className="h-4 w-4" />}
                    </button>
                    <button
                      onClick={() => setMenuOpen((v) => !v)}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/85 ring-1 ring-white/10 transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                      aria-expanded={menuOpen}
                    >
                      <HamburgerIcon open={menuOpen} reducedMotion={reducedMotion} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.18 }}
          >
            <motion.button
              aria-label="Close menu overlay"
              className="absolute inset-0 bg-black/60"
              onClick={() => setMenuOpen(false)}
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="absolute inset-x-0 top-0 px-3 pt-[max(env(safe-area-inset-top),1rem)] pb-4"
              style={{
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
              }}
              initial={reducedMotion ? { y: 0, scale: 1 } : { y: -8, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={reducedMotion ? { y: 0, scale: 1 } : { y: -10, scale: 0.98 }}
              transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 420, damping: 34 }}
            >
              <div className="mx-auto w-full max-w-sm rounded-[23px] border border-white/10 bg-neutral-950/50 px-5 pb-6 pt-5 max-h-[calc(100vh-2.5rem)] overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold tracking-tight text-white/90">Menu</div>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <select
                        onChange={(e) => handleLanguageChange(e.target.value)}
                        value={i18n.language}
                        className="h-9 rounded-xl bg-white/5 px-3 pr-8 text-xs font-medium text-white/80 ring-1 ring-white/10 outline-none transition hover:bg-white/8 focus:ring-2 focus:ring-secondary/60"
                        aria-label={t('navbar.language')}
                      >
                        <option value="en">EN</option>
                        <option value="tr">TR</option>
                      </select>
                      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/40">
                        ▾
                      </span>
                    </div>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="grid h-9 w-9 place-items-center rounded-xl bg-white/5 text-white/80 ring-1 ring-white/10 transition hover:bg-white/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60"
                      aria-label="Close menu"
                    >
                      <HamburgerIcon open={true} reducedMotion={reducedMotion} />
                    </button>
                  </div>
                </div>

                <motion.div
                  className="mt-5 space-y-2"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: reducedMotion
                        ? { duration: 0 }
                        : { staggerChildren: 0.055, delayChildren: 0.04 },
                    },
                  }}
                >
                  {navItems.map((item) => {
                    const isActive = activeSection === item.key;
                    return (
                      <motion.a
                        key={item.key}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="group relative flex items-center justify-between rounded-2xl bg-white/5 px-4 py-4 ring-1 ring-white/10"
                        variants={{
                          hidden: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10, filter: 'blur(6px)' },
                          show: reducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: 'blur(0px)' },
                        }}
                        transition={
                          reducedMotion
                            ? { duration: 0 }
                            : { type: 'spring', stiffness: 520, damping: 38, mass: 0.7 }
                        }
                      >
                        <span className="text-base font-semibold tracking-tight text-white/90">
                          {item.name}
                        </span>
                        <span
                          className={[
                            'text-xs font-medium',
                            isActive ? 'text-secondary' : 'text-white/40 group-hover:text-white/60',
                          ].join(' ')}
                        >
                          ↵
                        </span>
                        <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <span className="absolute -inset-8 bg-secondary/15 blur-2xl" />
                        </span>
                      </motion.a>
                    );
                  })}
                </motion.div>

                <div className="mt-5">
                  <motion.a
                    href="#contact"
                    onClick={() => setMenuOpen(false)}
                    className="relative flex h-12 w-full items-center justify-center rounded-2xl text-sm font-semibold text-white"
                    whileHover={reducedMotion ? undefined : { scale: 1.01 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.99 }}
                  >
                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-secondary/90 via-sky-400/70 to-secondary/90 opacity-95" />
                    <span className="relative">{t('navbar.cta')}</span>
                  </motion.a>
                  <p className="mt-3 text-center text-[12px] leading-5 text-white/55">
                    {t('contact.mailto.description')}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;