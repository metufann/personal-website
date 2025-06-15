import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCalendar, FiCode, FiHeart } from 'react-icons/fi';

const Experience = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experienceCategories = [
    {
      title: t('experience.categories.professional'),
      icon: <FiBriefcase className="text-2xl" />,
      experiences: [
        {
          title: t('experience.jobs.nextarpInternship.title'),
          company: t('experience.jobs.nextarpInternship.company'),
          period: t('experience.jobs.nextarpInternship.period'),
          description: t('experience.jobs.nextarpInternship.description', { returnObjects: true }),
        }
      ]
    },
    {
      title: t('experience.categories.handsOn'),
      icon: <FiCode className="text-2xl" />,
      experiences: [
        {
          title: t('experience.jobs.goktasAgvTeknofest.title'),
          company: t('experience.jobs.goktasAgvTeknofest.company'),
          period: t('experience.jobs.goktasAgvTeknofest.period'),
          description: t('experience.jobs.goktasAgvTeknofest.description', { returnObjects: true }),
        }
      ]
    },
    {
      title: t('experience.categories.volunteer'),
      icon: <FiHeart className="text-2xl" />,
      experiences: [
        {
          title: t('experience.jobs.t3VakfiTeaching.title'),
          company: t('experience.jobs.t3VakfiTeaching.company'),
          period: t('experience.jobs.t3VakfiTeaching.period'),
          description: t('experience.jobs.t3VakfiTeaching.description', { returnObjects: true }),
        }
      ]
    }
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center mb-12">
            {t('experience.title')}
          </motion.h2>

          <div className="space-y-12">
            {experienceCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-white dark:bg-primary rounded-xl shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  {category.icon}
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.experiences.map((exp, expIndex) => (
                    <div
                      key={expIndex}
                      className="border-l-4 border-secondary pl-4"
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-xl font-semibold text-gray-800 dark:text-white">
                          {exp.title}
                        </h4>
                      </div>
                      <div className="flex items-center space-x-2 mb-4 text-gray-600 dark:text-textSecondary">
                        <FiCalendar className="text-secondary" />
                        <span>{exp.period}</span>
                      </div>
                      <h5 className="text-lg font-medium mb-4 text-gray-700 dark:text-gray-300">
                        {exp.company}
                      </h5>
                      <ul className="space-y-2">
                        {Array.isArray(exp.description) && exp.description.map((item, idx) => (
                          <li key={idx} className="text-gray-600 dark:text-textSecondary">
                            • {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
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