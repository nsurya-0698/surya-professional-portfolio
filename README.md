# 🚀 Surya Teja Nammi - Modern Portfolio

A cutting-edge React portfolio showcasing modern web development skills, performance optimization, and industry best practices.

## ✨ Features

### 🎯 Modern React Architecture
- **Custom Hooks**: Reusable logic with `useScrollPosition`, `useLocalStorage`, `useIntersectionObserver`
- **Context API**: Theme management and global state
- **Error Boundaries**: Production-ready error handling
- **React.memo**: Performance optimization for components
- **Code Splitting**: Lazy loading with React Suspense

### 🎨 Advanced Styling & UX
- **CSS Custom Properties**: Complete design system
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: User preference system with persistence
- **Glassmorphism Effects**: Modern UI design patterns

### ⚡ Performance & Optimization
- **Bundle Analysis**: Understanding build optimization
- **Image Optimization**: Lazy loading and responsive images
- **Intersection Observer**: Scroll-based animations
- **Service Workers**: PWA capabilities (ready for implementation)

### 🧪 Development Best Practices
- **ESLint + Prettier**: Code quality and formatting
- **Component Testing**: Unit tests with React Testing Library
- **Git Hooks**: Pre-commit quality checks
- **TypeScript Ready**: Type safety (optional implementation)

## 🛠️ Tech Stack

### Frontend Framework
- **React 18**: Latest features (Concurrent Features, Suspense)
- **Vite**: Modern build tool (faster than Create React App)

### Styling & Animation
- **CSS Custom Properties**: Design system
- **CSS Grid/Flexbox**: Modern layouts

### Performance
- **React.memo**: Component memoization
- **useMemo/useCallback**: Hook optimization
- **Code Splitting**: Dynamic imports
- **Intersection Observer**: Scroll detection

### Development Tools
- **ESLint**: Code quality
- **React Testing Library**: Component testing
- **Git Hooks**: Pre-commit checks

### Modern APIs
- **Intersection Observer**: Scroll detection
- **Local Storage**: Data persistence
- **Fetch API**: Modern HTTP requests

## 📁 Project Structure

```
src/
├── assets/
│   ├── images/          # All images, logos, icons
│   ├── documents/       # PDFs, resumes
│   └── music/          # Audio files
├── components/
│   ├── common/         # Reusable UI components
│   ├── sections/       # Main page sections
│   ├── layout/         # Layout components
│   └── interactive/    # Dynamic features
├── hooks/              # Custom React hooks
├── context/            # React Context providers
├── constants/          # Data and configuration
├── styles/             # Global styles and variables
├── utils/              # Utility functions
└── tests/              # Test files
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/suryatejanammi/surya-professional-portfolio.git
   cd surya-professional-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 📜 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors
```

### Deployment
```bash
npm run deploy       # Deploy to GitHub Pages
```

## 🎯 Key Features Explained

### Custom Hooks
```javascript
// hooks/useScrollPosition.js
export const useScrollPosition = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
};
```

### Theme Management
```javascript
// context/ThemeContext.jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### Performance Optimized Components
```javascript
// components/common/Card.jsx
const Card = memo(({ children, animate = true }) => {
  const [isVisible, cardRef] = useIntersectionObserver({
    threshold: 0.1
  });
  
  return (
    <div
      ref={cardRef}
      className={`card ${animate && isVisible ? 'card--animate' : ''}`}
    >
      {children}
    </div>
  );
});
```

## 🎨 Design System

The portfolio uses a comprehensive design system built with CSS Custom Properties:

```css
:root {
  /* Color Palette */
  --primary-color: #2563eb;
  --secondary-color: #64748b;
  --accent-color: #f59e0b;
  
  /* Typography */
  --font-family-primary: 'Inter', sans-serif;
  --text-base: 1rem;
  --font-medium: 500;
  
  /* Spacing */
  --space-4: 1rem;
  --space-6: 1.5rem;
  
  /* Shadows */
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
```

## 📱 Responsive Design

The portfolio is built with a mobile-first approach and includes:
- Responsive typography
- Flexible grid layouts
- Touch-friendly interactions
- Optimized images for different screen sizes

## 🔧 Performance Optimizations

### Code Splitting
```javascript
const Experience = lazy(() => import('./components/sections/Experience'));
const Projects = lazy(() => import('./components/sections/Projects'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Experience />
      <Projects />
    </Suspense>
  );
}
```

### Component Memoization
```javascript
const OptimizedComponent = React.memo(({ data }) => {
  const memoizedValue = useMemo(() => expensiveCalculation(data), [data]);
  return <div>{memoizedValue}</div>;
});
```

## 🧪 Testing Strategy

The project includes comprehensive testing setup:
- Unit tests for components
- Integration tests for user flows
- Accessibility testing
- Performance testing

## 🚀 Deployment

The portfolio is deployed using GitHub Pages with automatic deployment on push to main branch.

## 📈 Performance Metrics

- **Lighthouse Score**: 95+ across all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Surya Teja Nammi**
- GitHub: [@suryatejanammi](https://github.com/suryatejanammi)
- LinkedIn: [Surya Teja Nammi](https://linkedin.com/in/tejanammi)
- Email: suryatejanammi@gmail.com

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - The web framework used
- [Vite](https://vitejs.dev/) - Build tool
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library

## Command to push and deploy

- git add . && git commit -m "Enhance Projects section: auto-scroll, new AI/LLM projects, improved navigation and button visibility. UI/UX polish." && git push && npm run deploy

---

⭐ **Star this repository if you found it helpful!**
