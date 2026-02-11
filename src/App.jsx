import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import CodeIntro from './components/CodeIntro';

function App() {
  const reducedMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === 'undefined') return false;
    if (reducedMotion) return true;
    if (new URLSearchParams(window.location.search).get('intro') === '1') return false;
    return sessionStorage.getItem('introSeen') === '1';
  });

  const handleIntroComplete = () => {
    setIntroDone(true);
    sessionStorage.setItem('introSeen', '1');
  };

  return (
    <>
      <Helmet>
        <title>Muhammet Emin Tufan - Full Stack Developer</title>
        <meta name="description" content="Full Stack Developer specializing in React, Node.js, and modern web technologies. View my portfolio of projects and get in touch." />
        <meta name="keywords" content="Full Stack Developer, React, Node.js, JavaScript, Web Development, Portfolio" />
        <meta property="og:title" content="Your Name - Full Stack Developer" />
        <meta property="og:description" content="Full Stack Developer specializing in React, Node.js, and modern web technologies." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Your Name - Full Stack Developer" />
        <meta name="twitter:description" content="Full Stack Developer specializing in React, Node.js, and modern web technologies." />
      </Helmet>

      <div className="min-h-screen bg-white dark:bg-primary transition-colors duration-300">
        {!introDone && (
          <CodeIntro onComplete={handleIntroComplete} reducedMotion={reducedMotion} />
        )}

        <motion.div
          className="min-h-screen"
          initial={introDone ? false : { scale: 0.94, opacity: 0.85 }}
          animate={introDone ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0.85 }}
          transition={
            !reducedMotion
              ? { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 }
              : { duration: 0 }
          }
        >
          <Navbar />
          <main>
            <Hero id="home" />
          <About id="about" />
          <Skills id="skills" />
          <Experience id="experience" />
          <Projects id="projects" />
          <Contact id="contact" />
        </main>
        </motion.div>
      </div>
    </>
  );
}

export default App;
