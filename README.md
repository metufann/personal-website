# Modern Portfolio Website

A modern, responsive portfolio website built with React and Tailwind CSS. Features a clean design, dark mode support, smooth animations, and a fully responsive layout.

## Features

- 🎨 Modern and clean design
- 🌓 Dark mode support
- 📱 Fully responsive layout
- ⚡ Smooth animations with Framer Motion
- 🎯 SEO optimized with React Helmet
- 📝 Contact form with validation
- 🎨 Customizable color scheme
- 🔍 Intersection Observer for scroll animations

## Tech Stack

- React
- Tailwind CSS
- Framer Motion
- React Icons
- React Helmet
- React Intersection Observer

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Customization

### Personal Information

Update your personal information in the following components:
- `Hero.jsx`: Update name, title, and introduction
- `About.jsx`: Update about section content
- `Experience.jsx`: Update work experience
- `Projects.jsx`: Update project details
- `Contact.jsx`: Update contact information

### Styling

The color scheme can be customized in `tailwind.config.js`. The current theme uses:
- Primary: Dark blue (#0a192f)
- Secondary: Teal (#64ffda)
- Text colors: Light gray (#ccd6f6) and darker gray (#8892b0)

### Images

Replace the placeholder images in the `src/assets` directory with your own:
- `profile.jpg`: Your profile picture
- `project1.jpg`, `project2.jpg`, `project3.jpg`: Project screenshots

## Deployment

The project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Build for Production

```bash
npm run build
```

The build files will be in the `dist` directory.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by various modern portfolio websites
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
