import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t, i18n } = useTranslation();

  const navItems = [
    { name: t('navbar.home'), href: '#home', key: 'home' },
    { name: t('navbar.about'), href: '#about', key: 'about' },
    { name: t('navbar.skills'), href: '#skills', key: 'skills' },
    { name: t('navbar.experience'), href: '#experience', key: 'experience' },
    { name: t('navbar.projects'), href: '#projects', key: 'projects' },
    { name: t('navbar.contact'), href: '#contact', key: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const handleLanguageChange = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('lng', lng);
  };

  useEffect(() => {
    const savedLng = localStorage.getItem('lng');
    if (savedLng) {
      i18n.changeLanguage(savedLng);
    }
  }, [i18n]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full h-16 bg-white dark:bg-primary shadow-md z-50"
    >
      <div className="container-padding mx-auto">
        <div className="flex justify-between items-center py-2">
          <a href="#home" className="text-sm xs:text-base sm:text-lg font-bold text-secondary">
            Portfolio
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`nav-link ${
                  activeSection === item.href.substring(1) ? 'text-secondary' : ''
                }`}
              >
                {item.name}
              </a>
            ))}
            <select
              onChange={e => handleLanguageChange(e.target.value)}
              value={i18n.language}
              className="ml-4 px-2 py-1 rounded bg-gray-100 dark:bg-tertiary text-sm"
              aria-label={t('navbar.language')}
            >
              <option value="en">EN</option>
              <option value="tr">TR</option>
            </select>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-tertiary"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center gap-x-3">
            <select
              onChange={e => handleLanguageChange(e.target.value)}
              value={i18n.language}
              className="px-2 py-1 rounded bg-gray-100 dark:bg-tertiary text-sm"
              aria-label={t('navbar.language')}
            >
              <option value="en">EN</option>
              <option value="tr">TR</option>
            </select>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-tertiary"
            >
              {isDark ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-tertiary"
            >
              {isOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-primary shadow-lg py-2"
          >
            <div className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block px-2 py-1 rounded-md nav-link ${
                    activeSection === item.href.substring(1) ? 'text-secondary' : ''
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar; 