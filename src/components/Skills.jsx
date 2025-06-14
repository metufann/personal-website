import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
} from 'react-icons/si';

const Skills = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = [
    { name: t('skills.skills.javascript'), icon: <SiJavascript />, level: 90 },
    { name: t('skills.skills.react'), icon: <SiReact />, level: 85 },
    { name: t('skills.skills.nodejs'), icon: <SiNodedotjs />, level: 80 },
    { name: t('skills.skills.python'), icon: <SiPython />, level: 75 },
    { name: t('skills.skills.typescript'), icon: <SiTypescript />, level: 85 },
    { name: t('skills.skills.tailwind'), icon: <SiTailwindcss />, level: 90 },
    { name: t('skills.skills.mongodb'), icon: <SiMongodb />, level: 80 },
    { name: t('skills.skills.postgresql'), icon: <SiPostgresql />, level: 75 },
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
    <section id="skills" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            {t('skills.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-primary p-4 rounded-lg shadow-md"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl text-secondary">{skill.icon}</span>
                    <span className="font-semibold">{skill.name}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-textSecondary">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-tertiary rounded-full h-2">
                  <motion.div
                    className="bg-secondary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <h3 className="text-xl font-semibold mb-4">{t('skills.additionalSkills')}</h3>
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              {[
                t('skills.skills.git'),
                t('skills.skills.docker'),
                t('skills.skills.aws'),
                t('skills.skills.restApis'),
                t('skills.skills.graphql'),
                t('skills.skills.agile'),
                t('skills.skills.cicd'),
                t('skills.skills.testing'),
                t('skills.skills.uiux'),
                t('skills.skills.responsiveDesign')
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-tertiary rounded-full text-sm text-gray-600 dark:text-textSecondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 