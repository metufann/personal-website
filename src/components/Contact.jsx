import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.form.name.error');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.email.error.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.email.error.invalid');
    }
    if (!formData.subject.trim()) newErrors.subject = t('contact.form.subject.error');
    if (!formData.message.trim()) newErrors.message = t('contact.form.message.error');
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      // Simulate form submission
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
    <section id="contact" className="section-padding bg-gray-50 dark:bg-tertiary">
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
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary bg-opacity-10 rounded-full">
                  <FiMail className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('contact.contactInfo.email.title')}</h3>
                  <p className="text-gray-600 dark:text-textSecondary">{t('contact.contactInfo.email.value')}</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="p-3 bg-secondary bg-opacity-10 rounded-full">
                  <FiPhone className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('contact.contactInfo.phone.title')}</h3>
                  <p className="text-gray-600 dark:text-textSecondary">{t('contact.contactInfo.phone.value')}</p>
                </div>
              </div>

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

            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('contact.form.name.placeholder')}
                    className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-primary border ${
                      errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:border-secondary`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('contact.form.email.placeholder')}
                    className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-primary border ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:border-secondary`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t('contact.form.subject.placeholder')}
                    className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-primary border ${
                      errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:border-secondary`}
                  />
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.message.placeholder')}
                    rows="4"
                    className={`w-full px-4 py-2 rounded-lg bg-white dark:bg-primary border ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                    } focus:outline-none focus:border-secondary`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50"
                >
                  {isSubmitting ? t('contact.form.submit.sending') : t('contact.form.submit.default')}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-500 text-center">{t('contact.form.status.success')}</p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">{t('contact.form.status.error')}</p>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact; 