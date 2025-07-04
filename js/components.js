// Component loader for header and footer
class ComponentLoader {
    constructor() {
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
                const response = await fetch(`components/${componentName}.html`);
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
            }
        } catch (error) {
            console.error(`Error loading ${componentName}:`, error);
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

        // Special case for index page
        if (this.currentPage === 'index') {
            const homeLink = document.querySelector('a[href="index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        }

        // Special case for patent-search page
        if (this.currentPage === 'patent-search') {
            const patentSearchLink = document.querySelector('a[href="patent-search.html"]');
            if (patentSearchLink) {
                patentSearchLink.classList.add('active');
            }
        }
    }

    async loadAll() {
        // Load header and footer in parallel
        await Promise.all([
            this.loadComponent('header', '#header-placeholder'),
            this.loadComponent('footer', '#footer-placeholder')
        ]);
    }
}

// Initialize component loader when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const loader = new ComponentLoader();
    loader.loadAll();
});

// Export for use in other scripts if needed
window.ComponentLoader = ComponentLoader;