import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCalendar } from 'react-icons/fi';

const Experience = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      title: t('experience.jobs.seniorDev.title'),
      company: t('experience.jobs.seniorDev.company'),
      period: t('experience.jobs.seniorDev.period'),
      description: t('experience.jobs.seniorDev.description', { returnObjects: true }),
    },
    {
      title: t('experience.jobs.fullStackDev.title'),
      company: t('experience.jobs.fullStackDev.company'),
      period: t('experience.jobs.fullStackDev.period'),
      description: t('experience.jobs.fullStackDev.description', { returnObjects: true }),
    },
    {
      title: t('experience.jobs.juniorDev.title'),
      company: t('experience.jobs.juniorDev.company'),
      period: t('experience.jobs.juniorDev.period'),
      description: t('experience.jobs.juniorDev.description', { returnObjects: true }),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="section-padding bg-gray-50 dark:bg-tertiary">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            {t('experience.title')}
          </motion.h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`relative mb-8 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-8' : 'md:mr-auto md:pr-8 md:text-right'
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full" />

                <div className="bg-white dark:bg-primary p-6 rounded-lg shadow-md">
                  <div className="flex items-center space-x-2 mb-2">
                    <FiBriefcase className="text-secondary" />
                    <h3 className="text-xl font-semibold">{exp.title}</h3>
                  </div>
                  <div className="flex items-center space-x-2 mb-4 text-gray-600 dark:text-textSecondary">
                    <FiCalendar className="text-secondary" />
                    <span>{exp.period}</span>
                  </div>
                  <h4 className="text-lg font-medium mb-4">{exp.company}</h4>
                  <ul className="space-y-2">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="text-gray-600 dark:text-textSecondary">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience; 