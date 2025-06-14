import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const socialLinks = [
    { icon: <FiGithub />, href: 'https://github.com/yourusername' },
    { icon: <FiLinkedin />, href: 'https://linkedin.com/in/yourusername' },
    { icon: <FiTwitter />, href: 'https://twitter.com/yourusername' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center section-padding">
      <div className="container mx-auto container-padding">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
              {t('hero.hi')} <span className="text-secondary">Your Name</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-textSecondary mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-gray-600 dark:text-textSecondary mb-8 max-w-lg">
              {t('hero.intro')}
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl sm:text-2xl text-gray-600 dark:text-textSecondary hover:text-secondary dark:hover:text-secondary transition-colors"
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#contact"
              className="btn-primary inline-block mt-6 sm:mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.getInTouch')}
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-8 md:mt-0"
          >
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-secondary rounded-full opacity-20 animate-pulse"></div>
              <img
                src="/src/assets/profile.jpg"
                alt="Profile"
                className="relative w-full h-full object-cover rounded-full border-4 border-secondary"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 