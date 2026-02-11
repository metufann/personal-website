import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  SiJavascript,
  SiSpringboot,
  SiHtml5,
  SiCss3,
  SiPython,
  SiMysql,
  SiReact,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';

const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: 'JavaScript', icon: <SiJavascript /> },
    { name: 'Java', icon: <FaJava /> },
    { name: 'Spring Boot', icon: <SiSpringboot /> },
    { name: 'React', icon: <SiReact /> },
    { name: 'HTML', icon: <SiHtml5 /> },
    { name: 'CSS', icon: <SiCss3 /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'MySQL', icon: <SiMysql /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="py-16 scroll-mt-24">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants} 
            className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-800 dark:text-white"
          >
            {t('skills.title')}
          </motion.h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-gray-800 p-4 xs:p-6 rounded-xl shadow-lg flex flex-col items-center justify-center text-center hover:shadow-xl transition-shadow duration-300"
              >
                <span className="text-3xl xs:text-4xl text-blue-600 dark:text-blue-400 mb-2 xs:mb-3">{skill.icon}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 