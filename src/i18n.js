import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navbar: {
        home: 'Home',
        about: 'About',
        skills: 'Skills',
        experience: 'Experience',
        projects: 'Projects',
        contact: 'Contact',
        language: 'Language',
      },
      hero: {
        hi: "Hi, I'm",
        title: 'Full Stack Developer',
        intro: 'I build exceptional digital experiences that make an impact. Specializing in creating beautiful, functional, and user-centered digital solutions.',
        getInTouch: 'Get in Touch',
      },
      about: {
        title: 'About Me',
        paragraph1: "I'm a passionate Full Stack Developer with a strong foundation in web technologies and a keen eye for creating elegant solutions to complex problems. With several years of experience in the industry, I've developed a deep understanding of both frontend and backend development.",
        paragraph2: "My journey in software development began with a curiosity about how things work on the web. This curiosity evolved into a professional career where I've had the opportunity to work on diverse projects, from small business websites to large-scale enterprise applications.",
        paragraph3: "I believe in writing clean, maintainable code and following best practices. I'm constantly learning and adapting to new technologies and methodologies to stay at the forefront of web development.",
        stats: {
          yearsExperience: "Years Experience",
          projectsCompleted: "Projects Completed",
          companiesWorked: "Companies Worked",
          happyClients: "Happy Clients"
        }
      },
      skills: {
        title: 'Skills & Expertise',
        additionalSkills: 'Additional Skills',
        skills: {
          javascript: 'JavaScript',
          react: 'React',
          nodejs: 'Node.js',
          python: 'Python',
          typescript: 'TypeScript',
          tailwind: 'Tailwind CSS',
          mongodb: 'MongoDB',
          postgresql: 'PostgreSQL',
          git: 'Git',
          docker: 'Docker',
          aws: 'AWS',
          restApis: 'REST APIs',
          graphql: 'GraphQL',
          agile: 'Agile',
          cicd: 'CI/CD',
          testing: 'Testing',
          uiux: 'UI/UX',
          responsiveDesign: 'Responsive Design'
        }
      },
      experience: {
        title: 'Work Experience',
        jobs: {
          seniorDev: {
            title: 'Senior Full Stack Developer',
            company: 'Tech Company Inc.',
            period: '2021 - Present',
            description: [
              'Led development of enterprise-level applications using React and Node.js',
              'Implemented CI/CD pipelines reducing deployment time by 40%',
              'Mentored junior developers and conducted code reviews',
              'Optimized database queries improving application performance by 30%',
            ]
          },
          fullStackDev: {
            title: 'Full Stack Developer',
            company: 'Digital Solutions Ltd.',
            period: '2019 - 2021',
            description: [
              'Developed and maintained multiple client projects using React and Python',
              'Collaborated with UX designers to implement responsive designs',
              'Integrated third-party APIs and payment gateways',
              'Implemented automated testing reducing bug reports by 25%',
            ]
          },
          juniorDev: {
            title: 'Junior Developer',
            company: 'StartUp Innovations',
            period: '2018 - 2019',
            description: [
              'Built and maintained company website using modern web technologies',
              'Assisted in developing RESTful APIs and database schemas',
              'Participated in agile development processes',
              'Contributed to open-source projects',
            ]
          }
        }
      },
      projects: {
        title: 'Featured Projects',
        items: {
          ecommerce: {
            title: 'E-Commerce Platform',
            description: 'A full-featured e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
          },
          taskManager: {
            title: 'Task Management App',
            description: 'A collaborative task management application with real-time updates, team features, and progress tracking. Built with React, Firebase, and Material-UI.',
            technologies: ['React', 'Firebase', 'Material-UI', 'Redux']
          },
          portfolio: {
            title: 'Portfolio Website',
            description: 'A modern portfolio website showcasing projects and skills. Features smooth animations, dark mode, and responsive design.',
            technologies: ['React', 'Tailwind CSS', 'Framer Motion']
          }
        }
      },
      contact: {
        title: 'Get in Touch',
        contactInfo: {
          email: {
            title: 'Email',
            value: 'your.email@example.com'
          },
          phone: {
            title: 'Phone',
            value: '+1 234 567 890'
          },
          location: {
            title: 'Location',
            value: 'San Francisco, CA'
          }
        },
        form: {
          name: {
            placeholder: 'Your Name',
            error: 'Name is required'
          },
          email: {
            placeholder: 'Your Email',
            error: {
              required: 'Email is required',
              invalid: 'Email is invalid'
            }
          },
          subject: {
            placeholder: 'Subject',
            error: 'Subject is required'
          },
          message: {
            placeholder: 'Your Message',
            error: 'Message is required'
          },
          submit: {
            sending: 'Sending...',
            default: 'Send Message'
          },
          status: {
            success: 'Message sent successfully!',
            error: 'Failed to send message. Please try again.'
          }
        }
      }
    },
  },
  tr: {
    translation: {
      navbar: {
        home: 'Anasayfa',
        about: 'Hakkımda',
        skills: 'Yetenekler',
        experience: 'Deneyim',
        projects: 'Projeler',
        contact: 'İletişim',
        language: 'Dil',
      },
      hero: {
        hi: "Merhaba, ben",
        title: 'Full Stack Geliştirici',
        intro: 'Etkileyici dijital deneyimler inşa ediyorum. Güzel, fonksiyonel ve kullanıcı odaklı dijital çözümler üretme konusunda uzmanım.',
        getInTouch: 'İletişime Geç',
      },
      about: {
        title: 'Hakkımda',
        paragraph1: "Web teknolojilerinde güçlü bir temele sahip, karmaşık problemlere zarif çözümler üretmeye odaklanan tutkulu bir Full Stack Geliştiriciyim. Sektörde birkaç yıllık deneyimimle, hem frontend hem de backend geliştirme konusunda derin bir anlayış geliştirdim.",
        paragraph2: "Yazılım geliştirme yolculuğum, web'de işlerin nasıl çalıştığını merak etmemle başladı. Bu merak, küçük işletme web sitelerinden büyük ölçekli kurumsal uygulamalara kadar çeşitli projelerde çalışma fırsatı bulduğum profesyonel bir kariyere dönüştü.",
        paragraph3: "Temiz, bakımı kolay kod yazmaya ve en iyi uygulamaları takip etmeye inanıyorum. Web geliştirmenin ön saflarında kalmak için sürekli olarak yeni teknolojileri ve metodolojileri öğreniyor ve uyarlıyorum.",
        stats: {
          yearsExperience: "Yıl Deneyim",
          projectsCompleted: "Tamamlanan Proje",
          companiesWorked: "Çalışılan Şirket",
          happyClients: "Mutlu Müşteri"
        }
      },
      skills: {
        title: 'Yetenekler & Uzmanlık',
        additionalSkills: 'Ek Yetenekler',
        skills: {
          javascript: 'JavaScript',
          react: 'React',
          nodejs: 'Node.js',
          python: 'Python',
          typescript: 'TypeScript',
          tailwind: 'Tailwind CSS',
          mongodb: 'MongoDB',
          postgresql: 'PostgreSQL',
          git: 'Git',
          docker: 'Docker',
          aws: 'AWS',
          restApis: 'REST API\'ler',
          graphql: 'GraphQL',
          agile: 'Agile',
          cicd: 'CI/CD',
          testing: 'Test',
          uiux: 'UI/UX',
          responsiveDesign: 'Duyarlı Tasarım'
        }
      },
      experience: {
        title: 'İş Deneyimi',
        jobs: {
          seniorDev: {
            title: 'Kıdemli Full Stack Geliştirici',
            company: 'Tech Company Inc.',
            period: '2021 - Günümüz',
            description: [
              'React ve Node.js kullanarak kurumsal düzeyde uygulamaların geliştirilmesine öncülük ettim',
              'CI/CD pipeline\'ları uygulayarak dağıtım süresini %40 azalttım',
              'Junior geliştiricilere mentorluk yaptım ve kod incelemeleri gerçekleştirdim',
              'Veritabanı sorgularını optimize ederek uygulama performansını %30 artırdım',
            ]
          },
          fullStackDev: {
            title: 'Full Stack Geliştirici',
            company: 'Digital Solutions Ltd.',
            period: '2019 - 2021',
            description: [
              'React ve Python kullanarak çoklu müşteri projelerini geliştirdim ve sürdürdüm',
              'Duyarlı tasarımları uygulamak için UX tasarımcılarıyla işbirliği yaptım',
              'Üçüncü taraf API\'leri ve ödeme geçitlerini entegre ettim',
              'Otomatik testler uygulayarak hata raporlarını %25 azalttım',
            ]
          },
          juniorDev: {
            title: 'Junior Geliştirici',
            company: 'StartUp Innovations',
            period: '2018 - 2019',
            description: [
              'Modern web teknolojileri kullanarak şirket web sitesini oluşturdum ve sürdürdüm',
              'RESTful API\'lerin ve veritabanı şemalarının geliştirilmesine yardımcı oldum',
              'Agile geliştirme süreçlerine katıldım',
              'Açık kaynak projelere katkıda bulundum',
            ]
          }
        }
      },
      projects: {
        title: 'Öne Çıkan Projeler',
        items: {
          ecommerce: {
            title: 'E-Ticaret Platformu',
            description: 'React, Node.js ve MongoDB ile geliştirilmiş tam özellikli bir e-ticaret platformu. Kullanıcı kimlik doğrulama, ürün yönetimi, alışveriş sepeti ve ödeme entegrasyonu özelliklerini içerir.',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe']
          },
          taskManager: {
            title: 'Görev Yönetim Uygulaması',
            description: 'Gerçek zamanlı güncellemeler, takım özellikleri ve ilerleme takibi içeren işbirlikçi bir görev yönetim uygulaması. React, Firebase ve Material-UI ile geliştirilmiştir.',
            technologies: ['React', 'Firebase', 'Material-UI', 'Redux']
          },
          portfolio: {
            title: 'Portfolyo Web Sitesi',
            description: 'Projeleri ve yetenekleri sergileyen modern bir portfolyo web sitesi. Akıcı animasyonlar, karanlık mod ve duyarlı tasarım özelliklerini içerir.',
            technologies: ['React', 'Tailwind CSS', 'Framer Motion']
          }
        }
      },
      contact: {
        title: 'İletişime Geç',
        contactInfo: {
          email: {
            title: 'E-posta',
            value: 'your.email@example.com'
          },
          phone: {
            title: 'Telefon',
            value: '+1 234 567 890'
          },
          location: {
            title: 'Konum',
            value: 'San Francisco, CA'
          }
        },
        form: {
          name: {
            placeholder: 'Adınız',
            error: 'İsim gereklidir'
          },
          email: {
            placeholder: 'E-posta Adresiniz',
            error: {
              required: 'E-posta gereklidir',
              invalid: 'Geçersiz e-posta adresi'
            }
          },
          subject: {
            placeholder: 'Konu',
            error: 'Konu gereklidir'
          },
          message: {
            placeholder: 'Mesajınız',
            error: 'Mesaj gereklidir'
          },
          submit: {
            sending: 'Gönderiliyor...',
            default: 'Mesaj Gönder'
          },
          status: {
            success: 'Mesaj başarıyla gönderildi!',
            error: 'Mesaj gönderilemedi. Lütfen tekrar deneyin.'
          }
        }
      }
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 