import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FiMail, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section id="contact" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            {t('contact.title')}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <motion.div variants={itemVariants} className="bg-white dark:bg-primary p-6 rounded-lg shadow-lg space-y-6">
                <a
                  href="mailto:muhammedemintufan@gmail.com"
                  className="flex items-center space-x-4 hover:bg-gray-50 dark:hover:bg-tertiary p-4 rounded-lg transition-colors -m-4"
                >
                  <div className="p-3 bg-secondary bg-opacity-10 rounded-full">
                    <FiMail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('contact.contactInfo.email.title')}</h3>
                    <p className="text-gray-600 dark:text-textSecondary">{t('contact.contactInfo.email.value')}</p>
                  </div>
                </a>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-secondary bg-opacity-10 rounded-full">
                    <FiMapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t('contact.contactInfo.location.title')}</h3>
                    <p className="text-gray-600 dark:text-textSecondary">{t('contact.contactInfo.location.value')}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white dark:bg-primary p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">{t('contact.mailto.title')}</h3>
              <p className="text-gray-600 dark:text-textSecondary mb-6">
                {t('contact.mailto.description')}
              </p>
              <a
                href="mailto:muhammedemintufan@gmail.com"
                className="btn-primary block text-center"
              >
                {t('contact.mailto.button')}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 