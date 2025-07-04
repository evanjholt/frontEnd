// Main application entry point
import { initializeSearch } from './components/search.js';
import { initializeNavigation } from './components/navigation.js';
import { formatters } from './utils/formatters.js';
import { helpers } from './utils/helpers.js';

class QuiverApp {
    constructor() {
        this.components = {};
        this.config = {
            apiBaseUrl: window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://api.quiverquant.com',
            enableAnalytics: true,
            enableErrorReporting: true,
            debounceDelay: 300
        };
        
        this.init();
    }
    
    async init() {
        try {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }
            
            // Initialize core components
            await this.initializeComponents();
            
            // Setup global functionality
            this.setupGlobalFeatures();
            
            // Setup error handling
            this.setupErrorHandling();
            
            // Setup analytics
            this.setupAnalytics();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            console.log('Quiver App initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize Quiver App:', error);
            this.handleInitializationError(error);
        }
    }
    
    async initializeComponents() {
        // Initialize navigation
        this.components.navigation = initializeNavigation({
            headerSelector: '.header',
            mobileToggleSelector: '.mobile-menu-toggle',
            navMenuSelector: '.nav-menu'
        });
        
        // Initialize search
        this.components.search = initializeSearch({
            globalSearchSelector: '#globalSearch',
            heroSearchSelector: '.hero-search-input',
            debounceDelay: this.config.debounceDelay
        });
        
        // Initialize page-specific components
        await this.initializePageComponents();
        
        // Initialize common UI components
        this.initializePricingToggle();
        this.initializeFAQ();
        this.initializeAnimations();
        this.initializeTooltips();
    }
    
    async initializePageComponents() {
        const currentPage = this.getCurrentPage();
        
        try {
            switch (currentPage) {
                case 'index':
                case 'home':
                    await this.initializeHomePage();
                    break;
                case 'insider-trading':
                    await this.initializeInsiderTradingPage();
                    break;
                case 'government-contracts':
                    await this.initializeGovernmentContractsPage();
                    break;
                case 'corporate-lobbying':
                    await this.initializeCorporateLobbyingPage();
                    break;
                case 'patent-search':
                    await this.initializePatentSearchPage();
                    break;
                default:
                    // Initialize common page functionality
                    this.initializeCommonPageFeatures();
            }
        } catch (error) {
            console.warn(`Failed to initialize page-specific components for ${currentPage}:`, error);
        }
    }
    
    async initializeHomePage() {
        // Load home page specific modules
        try {
            const { initializeHomeComponents } = await import('./pages/home.js');
            this.components.home = initializeHomeComponents();
        } catch (error) {
            console.warn('Home page components not available:', error);
        }
    }
    
    async initializeInsiderTradingPage() {
        try {
            const { initializeInsiderTradingComponents } = await import('./pages/insider-trading.js');
            this.components.insiderTrading = initializeInsiderTradingComponents();
        } catch (error) {
            console.warn('Insider trading page components not available:', error);
        }
    }
    
    async initializeGovernmentContractsPage() {
        try {
            const { initializeGovernmentContractsComponents } = await import('./pages/government-contracts.js');
            this.components.governmentContracts = initializeGovernmentContractsComponents();
        } catch (error) {
            console.warn('Government contracts page components not available:', error);
        }
    }
    
    async initializeCorporateLobbyingPage() {
        try {
            const { initializeCorporateLobbyingComponents } = await import('./pages/corporate-lobbying.js');
            this.components.corporateLobbying = initializeCorporateLobbyingComponents();
        } catch (error) {
            console.warn('Corporate lobbying page components not available:', error);
        }
    }
    
    async initializePatentSearchPage() {
        try {
            const { initializePatentSearchComponents } = await import('./pages/patent-search.js');
            this.components.patentSearch = initializePatentSearchComponents();
        } catch (error) {
            console.warn('Patent search page components not available:', error);
        }
    }
    
    initializeCommonPageFeatures() {
        // Initialize features common to all pages
        this.initializeLazyLoading();
        this.initializeScrollEffects();
        this.initializeBackToTop();
    }
    
    initializePricingToggle() {
        const toggleButtons = document.querySelectorAll('.toggle-btn');
        
        if (toggleButtons.length === 0) return;
        
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                toggleButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Update pricing
                const isYearly = btn.textContent.trim() === 'Yearly';
                this.updatePricing(isYearly);
            });
        });
    }
    
    updatePricing(isYearly) {
        const priceElement = document.querySelector('.pricing-card.featured .price');
        const periodElement = document.querySelector('.pricing-card.featured .period');
        
        if (priceElement && periodElement) {
            if (isYearly) {
                priceElement.textContent = '$250.00';
                periodElement.textContent = '/year';
            } else {
                priceElement.textContent = '$25.00';
                periodElement.textContent = '/month';
            }
        }
    }
    
    initializeFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.style.cursor = 'pointer';
                
                question.addEventListener('click', () => {
                    const isOpen = answer.style.display === 'block';
                    
                    // Close all other answers
                    document.querySelectorAll('.faq-answer').forEach(a => {
                        a.style.display = 'none';
                    });
                    
                    // Toggle current answer
                    answer.style.display = isOpen ? 'none' : 'block';
                });
            }
        });
    }
    
    initializeAnimations() {
        // Intersection Observer for animations
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
        
        if (animatedElements.length === 0) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        
        tooltipElements.forEach(element => {
            let tooltip;
            
            element.addEventListener('mouseenter', () => {
                tooltip = this.createTooltip(element.dataset.tooltip);
                document.body.appendChild(tooltip);
                this.positionTooltip(tooltip, element);
            });
            
            element.addEventListener('mouseleave', () => {
                if (tooltip) {
                    tooltip.remove();
                    tooltip = null;
                }
            });
        });
    }
    
    createTooltip(text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--bg-tertiary);
            color: var(--text-primary);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: var(--border-radius-md);
            font-size: var(--font-size-sm);
            z-index: var(--z-tooltip);
            pointer-events: none;
            opacity: 0;
            transition: opacity var(--transition-fast);
        `;
        
        // Trigger reflow and add opacity
        setTimeout(() => {
            tooltip.style.opacity = '1';
        }, 10);
        
        return tooltip;
    }
    
    positionTooltip(tooltip, element) {
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        
        // Adjust if tooltip goes off screen
        if (left < 8) left = 8;
        if (left + tooltipRect.width > window.innerWidth - 8) {
            left = window.innerWidth - tooltipRect.width - 8;
        }
        
        if (top + tooltipRect.height > window.innerHeight - 8) {
            top = rect.top - tooltipRect.height - 8;
        }
        
        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
    }
    
    initializeLazyLoading() {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if (lazyImages.length === 0) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    initializeScrollEffects() {
        const parallaxElements = document.querySelectorAll('.parallax');
        
        if (parallaxElements.length === 0) return;
        
        window.addEventListener('scroll', helpers.throttle(() => {
            const scrollY = window.scrollY;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.speed || 0.5;
                const yPos = -(scrollY * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        }, 16)); // ~60fps
    }
    
    initializeBackToTop() {
        const backToTopBtn = document.querySelector('.back-to-top, .btn-back-to-top');
        
        if (!backToTopBtn) return;
        
        window.addEventListener('scroll', helpers.throttle(() => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'block';
            } else {
                backToTopBtn.style.display = 'none';
            }
        }, 100));
        
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    setupGlobalFeatures() {
        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K for search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (this.components.search) {
                    this.components.search.focus();
                }
            }
        });
        
        // Global click handlers
        document.addEventListener('click', (e) => {
            // Handle data-action attributes
            const action = e.target.dataset.action;
            if (action) {
                this.handleGlobalAction(action, e.target, e);
            }
        });
        
        // Setup theme switching
        this.setupThemeSupport();
    }
    
    setupThemeSupport() {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Listen for theme changes
        prefersDark.addEventListener('change', (e) => {
            this.updateTheme(e.matches ? 'dark' : 'light');
        });
        
        // Theme toggle button
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = document.documentElement.dataset.theme || 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                this.updateTheme(newTheme);
            });
        }
    }
    
    updateTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle button
        const themeToggle = document.querySelector('[data-theme-toggle]');
        if (themeToggle) {
            themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    handleGlobalAction(action, element, event) {
        switch (action) {
            case 'copy':
                this.copyToClipboard(element.dataset.copyText || element.textContent);
                break;
            case 'share':
                this.shareContent(element.dataset.shareUrl || window.location.href);
                break;
            case 'print':
                window.print();
                break;
            case 'scroll-to':
                const target = element.dataset.target;
                if (target) {
                    helpers.scrollToElement(target);
                }
                break;
            default:
                console.warn(`Unknown global action: ${action}`);
        }
    }
    
    async copyToClipboard(text) {
        try {
            const success = await helpers.copyToClipboard(text);
            if (success) {
                this.showNotification('Copied to clipboard!', 'success');
            } else {
                this.showNotification('Failed to copy to clipboard', 'error');
            }
        } catch (error) {
            console.error('Copy to clipboard failed:', error);
            this.showNotification('Failed to copy to clipboard', 'error');
        }
    }
    
    async shareContent(url) {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: document.title,
                    url: url
                });
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Share failed:', error);
                }
            }
        } else {
            // Fallback to copying URL
            await this.copyToClipboard(url);
        }
    }
    
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: var(--spacing-md);
            background: var(--bg-tertiary);
            color: var(--text-primary);
            border-radius: var(--border-radius-md);
            z-index: var(--z-modal);
            transform: translateX(100%);
            transition: transform var(--transition-normal);
        `;
        
        if (type === 'success') {
            notification.style.borderLeft = '4px solid var(--color-success)';
        } else if (type === 'error') {
            notification.style.borderLeft = '4px solid var(--color-error)';
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Hide notification
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, duration);
    }
    
    setupErrorHandling() {
        if (!this.config.enableErrorReporting) return;
        
        window.addEventListener('error', (e) => {
            this.handleError('JavaScript Error', e.error, {
                filename: e.filename,
                lineno: e.lineno,
                colno: e.colno
            });
        });
        
        window.addEventListener('unhandledrejection', (e) => {
            this.handleError('Unhandled Promise Rejection', e.reason);
        });
    }
    
    handleError(type, error, context = {}) {
        console.error(`${type}:`, error, context);
        
        // Send to error reporting service (implement as needed)
        if (window.Sentry) {
            window.Sentry.captureException(error, { extra: context });
        }
    }
    
    handleInitializationError(error) {
        console.error('Initialization error:', error);
        
        // Show user-friendly error message
        const errorContainer = document.createElement('div');
        errorContainer.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: var(--color-error);
                color: white;
                padding: var(--spacing-md);
                text-align: center;
                z-index: 9999;
            ">
                <strong>Application Error:</strong> 
                Some features may not work properly. Please refresh the page.
                <button onclick="location.reload()" style="
                    margin-left: var(--spacing-md);
                    padding: var(--spacing-xs) var(--spacing-sm);
                    background: white;
                    color: var(--color-error);
                    border: none;
                    border-radius: var(--border-radius-sm);
                    cursor: pointer;
                ">Refresh</button>
            </div>
        `;
        
        document.body.appendChild(errorContainer);
    }
    
    setupAnalytics() {
        if (!this.config.enableAnalytics) return;
        
        // Setup Google Analytics or other analytics
        if (window.gtag) {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
        
        // Track page performance
        this.trackPagePerformance();
    }
    
    trackPagePerformance() {
        if (!window.performance) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (window.gtag) {
                        gtag('event', 'page_load_time', {
                            value: Math.round(loadTime),
                            custom_parameter: window.location.pathname
                        });
                    }
                    
                    console.log(`Page load time: ${loadTime}ms`);
                }
            }, 0);
        });
    }
    
    setupPerformanceMonitoring() {
        // Monitor for long tasks
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.duration > 50) {
                        console.warn('Long task detected:', entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['longtask'] });
        }
    }
    
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        return page.replace('.html', '');
    }
    
    // Public API methods
    getComponent(name) {
        return this.components[name];
    }
    
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }
    
    // Global utility methods
    static get formatters() {
        return formatters;
    }
    
    static get helpers() {
        return helpers;
    }
}

// Initialize the app
const app = new QuiverApp();

// Export for global use
window.QuiverApp = QuiverApp;
window.quiverApp = app;

// Legacy support - expose utility functions globally
window.formatCurrency = formatters.currency;
window.formatDate = formatters.date;
window.formatPercentage = formatters.percentage;
window.debounce = helpers.debounce;

export default QuiverApp;