import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projects = [
    {
      title: t('projects.items.trainingRoster.title'),
      description: t('projects.items.trainingRoster.description'),
      technologies: t('projects.items.trainingRoster.technologies', { returnObjects: true }),
      github: null,
      live: null,
    },
    {
      title: t('projects.items.goktasAgv.title'),
      description: t('projects.items.goktasAgv.description'),
      technologies: t('projects.items.goktasAgv.technologies', { returnObjects: true }),
      github: 'https://github.com/metufann/GoktasAGV.git',
      live: null,
    },
    {
      title: t('projects.items.hrManagementSystem.title'),
      description: t('projects.items.hrManagementSystem.description'),
      technologies: t('projects.items.hrManagementSystem.technologies', { returnObjects: true }),
      github: 'https://github.com/ouzzkp/tech1-frontend.git',
      live: null,
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto container-padding">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={itemVariants} className="section-title text-center">
            {t('projects.title')}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-primary rounded-lg overflow-hidden shadow-lg p-6"
                whileHover={{ y: -10 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <div className="flex space-x-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-textSecondary hover:text-secondary transition-colors"
                      >
                        <FiGithub className="w-5 h-5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-textSecondary hover:text-secondary transition-colors"
                      >
                        <FiExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-textSecondary mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.technologies) && project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 dark:bg-tertiary rounded-full text-sm text-gray-600 dark:text-textSecondary"
                    >
                      {tech}
                    </span>
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

export default Projects; 