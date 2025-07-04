// Component loader for header and footer
export class ComponentLoader {
    constructor(options = {}) {
        this.options = {
            componentBasePath: '../../src/components/',
            ...options
        };
        this.components = {};
        this.currentPage = this.getCurrentPage();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop().replace('.html', '') || 'index';
        return filename;
    }

    async loadComponent(componentName, targetSelector) {
        try {
            // Check if component is already cached
            if (!this.components[componentName]) {
                const componentPath = `${this.options.componentBasePath}${componentName}.html`;
                const response = await fetch(componentPath);
                if (!response.ok) {
                    throw new Error(`Failed to load ${componentName}: ${response.status}`);
                }
                this.components[componentName] = await response.text();
            }

            // Insert component into target element
            const targetElement = document.querySelector(targetSelector);
            if (targetElement) {
                targetElement.innerHTML = this.components[componentName];
                
                // Set active navigation states after loading header
                if (componentName === 'header') {
                    this.setActiveNavigation();
                }
                
                // Dispatch custom event
                const event = new CustomEvent('componentLoaded', {
                    detail: { componentName, targetSelector }
                });
                document.dispatchEvent(event);
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
            this.handleLoadError(componentName, targetSelector, error);
        }
    }

    handleLoadError(componentName, targetSelector, error) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = `
                <div class="component-error">
                    <p>Failed to load ${componentName} component</p>
                    <button onclick="location.reload()">Reload Page</button>
                </div>
            `;
        }
    }

    setActiveNavigation() {
        // Remove all active classes
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });

        // Set active class based on current page
        const currentPageLinks = document.querySelectorAll(`[data-page="${this.currentPage}"]`);
        currentPageLinks.forEach(link => {
            link.classList.add('active');
        });

        // Handle special cases
        this.handleSpecialNavCases();
    }

    handleSpecialNavCases() {
        // Special case for index page
        if (this.currentPage === 'index') {
            const homeLink = document.querySelector('a[href="index.html"], a[href="pages/home/index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }

        // Special case for nested pages
        const pageMapping = {
            'patent-search': 'patent-search.html',
            'insider-trading': 'insider-trading.html',
            'government-contracts': 'government-contracts.html',
            'corporate-lobbying': 'corporate-lobbying.html'
        };

        if (pageMapping[this.currentPage]) {
            const pageLink = document.querySelector(`a[href="${pageMapping[this.currentPage]}"]`);
            if (pageLink) {
                pageLink.classList.add('active');
            }
        }
    }

    async loadAll() {
        try {
            // Load header and footer in parallel
            await Promise.all([
                this.loadComponent('header', '#header-placeholder'),
                this.loadComponent('footer', '#footer-placeholder')
            ]);
            
            // Dispatch event when all components are loaded
            const event = new CustomEvent('allComponentsLoaded');
            document.dispatchEvent(event);
            
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }

    // Preload components for better performance
    async preloadComponents(componentNames = ['header', 'footer']) {
        const promises = componentNames.map(name => {
            const componentPath = `${this.options.componentBasePath}${name}.html`;
            return fetch(componentPath).then(response => response.text());
        });

        try {
            const results = await Promise.all(promises);
            componentNames.forEach((name, index) => {
                this.components[name] = results[index];
            });
        } catch (error) {
            console.warn('Failed to preload components:', error);
        }
    }

    // Get loaded component HTML
    getComponent(componentName) {
        return this.components[componentName];
    }

    // Check if component is loaded
    isComponentLoaded(componentName) {
        return !!this.components[componentName];
    }

    // Reload a specific component
    async reloadComponent(componentName, targetSelector) {
        delete this.components[componentName];
        await this.loadComponent(componentName, targetSelector);
    }
}

// Initialize component loader when DOM is loaded
export function initializeComponentLoader(options = {}) {
    return new Promise((resolve) => {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', async () => {
                const loader = new ComponentLoader(options);
                await loader.loadAll();
                resolve(loader);
            });
        } else {
            const loader = new ComponentLoader(options);
            loader.loadAll().then(() => resolve(loader));
        }
    });
}

// Export for global use
window.ComponentLoader = ComponentLoader;