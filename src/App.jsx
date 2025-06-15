import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
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
        <Navbar />
        <main>
          <Hero id="home" />
          <About id="about" />
          <Skills id="skills" />
          <Experience id="experience" />
          <Projects id="projects" />
          <Contact id="contact" />
        </main>
      </div>
    </>
  );
}

export default App;
