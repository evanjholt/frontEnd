# Quiver Quantitative Frontend

A modular, scalable frontend for the Canadian Alternative Data Platform. Built with modern web technologies and following best practices for maintainability and performance.

## 🏗️ Architecture

This project uses a **modular file structure** that separates concerns for better scalability and maintainability:

```
├── assets/                    # Static assets
│   ├── images/               # Images organized by type
│   │   ├── logos/           # Company and brand logos
│   │   ├── icons/           # UI icons and symbols
│   │   └── avatars/         # User avatars and profile images
│   ├── fonts/               # Custom fonts
│   └── media/               # Videos, audio files
│
├── src/                      # Source code
│   ├── styles/              # Modular CSS architecture
│   │   ├── base/            # Foundation styles
│   │   │   ├── reset.css    # CSS reset
│   │   │   ├── variables.css # CSS custom properties
│   │   │   └── typography.css # Typography system
│   │   ├── components/      # Reusable component styles
│   │   │   ├── buttons.css  # Button components
│   │   │   ├── forms.css    # Form elements
│   │   │   ├── navigation.css # Navigation components
│   │   │   └── tables.css   # Table components
│   │   ├── pages/           # Page-specific styles
│   │   └── main.css         # Main CSS entry point
│   │
│   ├── scripts/             # Modular JavaScript
│   │   ├── utils/           # Utility functions
│   │   │   ├── formatters.js # Data formatting utilities
│   │   │   └── helpers.js   # General helper functions
│   │   ├── components/      # Component JavaScript
│   │   │   ├── search.js    # Search functionality
│   │   │   └── navigation.js # Navigation logic
│   │   ├── pages/           # Page-specific scripts
│   │   └── main.js          # Main JavaScript entry point
│   │
│   └── components/          # Reusable HTML components
│       ├── header.html      # Site header
│       └── footer.html      # Site footer
│
├── pages/                   # Website pages
│   ├── home/               # Homepage
│   ├── insider-trading/    # Insider trading pages
│   ├── government-contracts/ # Government contracts
│   ├── corporate-lobbying/ # Corporate lobbying
│   ├── patent-search/      # Patent search pages
│   └── stocks/             # Individual stock pages
│
├── tests/                  # Test files
│   ├── unit/              # Unit tests
│   ├── integration/       # Integration tests
│   └── e2e/              # End-to-end tests
│
├── config/                # Build and configuration
│   └── build.config.js   # Build configuration
│
├── docs/                  # Documentation
└── index.html            # Entry point (redirects to home)
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontEnd
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   The site will automatically open at `http://localhost:3000`

### Development Commands

```bash
# Development
npm run dev          # Start development server
npm run serve        # Serve built files

# Building
npm run build        # Build for production
npm run clean        # Clean build directory

# Code Quality
npm run lint         # Lint JavaScript
npm run lint:css     # Lint CSS
npm run format       # Format code with Prettier
npm run validate     # Run all quality checks

# Testing
npm test            # Run tests
npm run test:watch  # Run tests in watch mode
```

## 📁 File Organization

### CSS Architecture

The CSS follows a **modular architecture** with clear separation of concerns:

- **Base**: Foundation styles, CSS variables, typography
- **Components**: Reusable UI component styles
- **Pages**: Page-specific styles
- **Utilities**: Helper classes and animations

#### CSS Variables

All design tokens are centralized in `src/styles/base/variables.css`:

```css
:root {
    /* Colors */
    --color-primary: #4CAF50;
    --bg-primary: #1a1d29;
    --text-primary: #ffffff;
    
    /* Spacing */
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    
    /* Typography */
    --font-size-base: 0.95rem;
    --font-weight-bold: 700;
}
```

### JavaScript Architecture

JavaScript is organized into **modules** with clear responsibilities:

- **Utils**: Pure utility functions (formatters, helpers)
- **Components**: UI component logic (search, navigation)
- **Pages**: Page-specific functionality
- **Main**: Application initialization and coordination

#### Module Example

```javascript
// src/scripts/utils/formatters.js
export const formatters = {
    currency: (amount) => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount),
    
    percentage: (value) => `${(value * 100).toFixed(2)}%`
};
```

### Component System

HTML components are modular and reusable:

```html
<!-- src/components/header.html -->
<header class="header">
    <nav class="nav-container">
        <!-- Navigation content -->
    </nav>
</header>
```

Components are loaded dynamically:

```javascript
// Load header component
fetch('../../src/components/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;
    });
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--color-primary: #4CAF50      /* Green */
--color-secondary: #2196F3    /* Blue */
--color-accent: #f44336       /* Red */

/* Background Colors */
--bg-primary: #1a1d29         /* Dark blue */
--bg-secondary: #252940       /* Medium blue */
--bg-tertiary: #2a2d3a        /* Light blue */

/* Text Colors */
--text-primary: #ffffff       /* White */
--text-secondary: #8a8d9a     /* Gray */
```

### Typography Scale

```css
--font-size-xs: 0.75rem       /* 12px */
--font-size-sm: 0.85rem       /* 14px */
--font-size-base: 0.95rem     /* 15px */
--font-size-lg: 1.1rem        /* 18px */
--font-size-xl: 1.3rem        /* 21px */
```

### Spacing System

```css
--spacing-xs: 0.25rem         /* 4px */
--spacing-sm: 0.5rem          /* 8px */
--spacing-md: 1rem            /* 16px */
--spacing-lg: 1.5rem          /* 24px */
--spacing-xl: 2rem            /* 32px */
```

## 🧩 Components

### Button Component

```html
<button class="btn btn-primary btn-lg">Primary Button</button>
<button class="btn btn-outline">Outline Button</button>
<button class="btn btn-ghost">Ghost Button</button>
```

### Form Components

```html
<div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="form-input" placeholder="Enter email">
</div>
```

### Table Components

```html
<table class="table table-striped">
    <thead>
        <tr>
            <th>Column 1</th>
            <th>Column 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
</table>
```

## 📱 Responsive Design

The design system includes responsive breakpoints:

```css
/* Mobile First Approach */
@media (max-width: 480px) { /* Mobile */ }
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 1024px) { /* Desktop */ }
@media (max-width: 1200px) { /* Large Desktop */ }
```

## ⚡ Performance

### Optimization Features

- **Modular CSS**: Only load required styles
- **Component-based JS**: Code splitting by functionality
- **Lazy Loading**: Images and components load on demand
- **Minification**: CSS and JS compression for production
- **Caching**: Optimized asset caching strategies

### Performance Monitoring

```javascript
// Built-in performance tracking
window.addEventListener('load', () => {
    const loadTime = performance.timing.loadEventEnd - 
                    performance.timing.navigationStart;
    console.log(`Page load time: ${loadTime}ms`);
});
```

## 🧪 Testing

### Test Structure

```
tests/
├── unit/                    # Unit tests for individual functions
├── integration/             # Integration tests for components
└── e2e/                    # End-to-end tests for user flows
```

### Running Tests

```bash
npm test                    # Run all tests
npm run test:watch         # Run tests in watch mode
```

## 🔧 Build Process

### Development Build

```bash
npm run dev
```

- Serves files directly from source
- Hot reloading enabled
- Source maps included
- No minification

### Production Build

```bash
npm run build
```

- CSS and JS minification
- Asset optimization
- Source map generation (optional)
- File copying and organization

## 📊 Data Flow

### Search Component Flow

```
User Input → Debounce → API Call → Results → UI Update
```

### Navigation Flow

```
Route Change → Component Load → Data Fetch → Render
```

## 🔒 Security

### Best Practices

- **XSS Prevention**: HTML escaping for user input
- **CSRF Protection**: Token-based request validation
- **Content Security Policy**: Restricted resource loading
- **Input Validation**: Client and server-side validation

## 📈 Analytics

### Tracking Implementation

```javascript
// Google Analytics integration
if (window.gtag) {
    gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href
    });
}
```

## 🤝 Contributing

### Code Style

- Use **Prettier** for code formatting
- Follow **ESLint** rules for JavaScript
- Use **Stylelint** for CSS consistency
- Write **meaningful commit messages**

### Component Guidelines

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components should be reusable across pages
3. **Documentation**: Include JSDoc comments for functions
4. **Testing**: Write tests for complex logic

## 📚 Browser Support

- **Chrome**: Latest 2 versions
- **Firefox**: Latest 2 versions
- **Safari**: Latest 2 versions
- **Edge**: Latest 2 versions

## 🔮 Future Enhancements

- [ ] Progressive Web App (PWA) features
- [ ] Advanced data visualization components
- [ ] Real-time data updates with WebSockets
- [ ] Advanced search with filters
- [ ] User preference customization
- [ ] Offline functionality

## 📞 Support

For questions or issues:

1. Check the documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team

---

**Built with ❤️ by the Quiver Quantitative Team**