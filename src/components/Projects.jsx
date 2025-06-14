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
      title: t('projects.items.ecommerce.title'),
      description: t('projects.items.ecommerce.description'),
      image: '/src/assets/project1.jpg',
      technologies: t('projects.items.ecommerce.technologies', { returnObjects: true }),
      github: 'https://github.com/yourusername/ecommerce',
      live: 'https://ecommerce-demo.com',
    },
    {
      title: t('projects.items.taskManager.title'),
      description: t('projects.items.taskManager.description'),
      image: '/src/assets/project2.jpg',
      technologies: t('projects.items.taskManager.technologies', { returnObjects: true }),
      github: 'https://github.com/yourusername/task-manager',
      live: 'https://task-manager-demo.com',
    },
    {
      title: t('projects.items.portfolio.title'),
      description: t('projects.items.portfolio.description'),
      image: '/src/assets/project3.jpg',
      technologies: t('projects.items.portfolio.technologies', { returnObjects: true }),
      github: 'https://github.com/yourusername/portfolio',
      live: 'https://portfolio-demo.com',
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
                className="bg-white dark:bg-primary rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -10 }}
              >
                <div className="relative h-48">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-secondary transition-colors"
                    >
                      <FiGithub className="w-6 h-6" />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-secondary transition-colors"
                    >
                      <FiExternalLink className="w-6 h-6" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-textSecondary mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 dark:bg-tertiary rounded-full text-sm text-gray-600 dark:text-textSecondary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
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