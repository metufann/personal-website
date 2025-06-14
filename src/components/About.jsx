import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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
    <section id="about" className="section-padding bg-gray-50 dark:bg-tertiary">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            {t('about.title')}
          </motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-6 text-gray-600 dark:text-textSecondary">
            <p>{t('about.paragraph1')}</p>
            <p>{t('about.paragraph2')}</p>
            <p>{t('about.paragraph3')}</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12"
          >
            {[
              { label: t('about.stats.yearsExperience'), value: "5+" },
              { label: t('about.stats.projectsCompleted'), value: "50+" },
              { label: t('about.stats.companiesWorked'), value: "10+" },
              { label: t('about.stats.happyClients'), value: "30+" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-4 bg-white dark:bg-primary rounded-lg shadow-md"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-3xl font-bold text-secondary mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-textSecondary">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About; 