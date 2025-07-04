// Navigation component functionality
import { debounce } from '../utils/helpers.js';

export class NavigationComponent {
    constructor(options = {}) {
        this.options = {
            headerSelector: '.header',
            navContainerSelector: '.nav-container',
            mobileToggleSelector: '.mobile-menu-toggle',
            navMenuSelector: '.nav-menu',
            dropdownSelector: '.nav-dropdown',
            navLinkSelector: '.nav-link',
            sidenavSelector: '.sidenav',
            overlaySelector: '.nav-overlay',
            ...options
        };
        
        this.header = document.querySelector(this.options.headerSelector);
        this.navContainer = document.querySelector(this.options.navContainerSelector);
        this.mobileToggle = document.querySelector(this.options.mobileToggleSelector);
        this.navMenu = document.querySelector(this.options.navMenuSelector);
        this.dropdowns = document.querySelectorAll(this.options.dropdownSelector);
        this.navLinks = document.querySelectorAll(this.options.navLinkSelector);
        this.sidenav = document.querySelector(this.options.sidenavSelector);
        this.overlay = document.querySelector(this.options.overlaySelector);
        
        this.isMenuOpen = false;
        this.isSidenavOpen = false;
        this.activeDropdown = null;
        this.lastScrollY = window.scrollY;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setActiveNavItem();
        this.setupStickyHeader();
        this.setupAccessibility();
    }
    
    bindEvents() {
        // Mobile menu toggle
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
        
        // Dropdown menus
        this.setupDropdowns();
        
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleNavLinkClick(e, link);
            });
        });
        
        // Sidenav
        this.setupSidenav();
        
        // Scroll behavior
        window.addEventListener('scroll', debounce(() => {
            this.handleScroll();
        }, 10));
        
        // Resize handler
        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
        
        // Click outside to close menus
        document.addEventListener('click', (e) => {
            this.handleOutsideClick(e);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }
    
    setupDropdowns() {
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle, .nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                let timeout;
                
                // Mouse events
                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(timeout);
                    this.showDropdown(dropdown);
                });
                
                dropdown.addEventListener('mouseleave', () => {
                    timeout = setTimeout(() => {
                        this.hideDropdown(dropdown);
                    }, 150);
                });
                
                // Touch/click events for mobile
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        this.toggleDropdown(dropdown);
                    }
                });
                
                // Keyboard navigation
                toggle.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleDropdown(dropdown);
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        this.showDropdown(dropdown);
                        this.focusFirstMenuItem(dropdown);
                    }
                });
                
                // Menu item navigation
                const menuItems = menu.querySelectorAll('.dropdown-item');
                menuItems.forEach((item, index) => {
                    item.addEventListener('keydown', (e) => {
                        this.handleMenuItemKeydown(e, menuItems, index);
                    });
                });
            }
        });
    }
    
    setupSidenav() {
        if (!this.sidenav) return;
        
        const openButton = document.querySelector('[data-sidenav="open"]');
        const closeButton = this.sidenav.querySelector('[data-sidenav="close"]');
        
        if (openButton) {
            openButton.addEventListener('click', () => {
                this.openSidenav();
            });
        }
        
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.closeSidenav();
            });
        }
        
        if (this.overlay) {
            this.overlay.addEventListener('click', () => {
                this.closeSidenav();
            });
        }
    }
    
    setupStickyHeader() {
        if (!this.header) return;
        
        const observer = new IntersectionObserver(
            ([e]) => {
                this.header.classList.toggle('scrolled', e.intersectionRatio < 1);
            },
            { threshold: [1] }
        );
        
        observer.observe(this.header);
    }
    
    setupAccessibility() {
        // Add ARIA attributes
        this.dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle, .nav-link');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                const id = `dropdown-${Math.random().toString(36).substr(2, 9)}`;
                toggle.setAttribute('aria-haspopup', 'true');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-controls', id);
                menu.setAttribute('id', id);
                menu.setAttribute('role', 'menu');
                
                const items = menu.querySelectorAll('.dropdown-item');
                items.forEach(item => {
                    item.setAttribute('role', 'menuitem');
                    item.setAttribute('tabindex', '-1');
                });
            }
        });
        
        // Mobile menu accessibility
        if (this.mobileToggle && this.navMenu) {
            this.mobileToggle.setAttribute('aria-expanded', 'false');
            this.mobileToggle.setAttribute('aria-controls', 'nav-menu');
            this.navMenu.setAttribute('id', 'nav-menu');
        }
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        
        if (this.navMenu) {
            this.navMenu.classList.toggle('active', this.isMenuOpen);
        }
        
        if (this.mobileToggle) {
            this.mobileToggle.setAttribute('aria-expanded', this.isMenuOpen.toString());
            this.mobileToggle.classList.toggle('active', this.isMenuOpen);
        }
        
        // Prevent body scroll when menu is open
        document.body.classList.toggle('nav-open', this.isMenuOpen);
        
        // Focus management
        if (this.isMenuOpen) {
            const firstLink = this.navMenu.querySelector('.nav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }
    }
    
    closeMobileMenu() {
        if (this.isMenuOpen) {
            this.toggleMobileMenu();
        }
    }
    
    showDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle, .nav-link');
        
        if (menu && toggle) {
            // Close other dropdowns
            this.hideAllDropdowns();
            
            menu.classList.add('visible');
            toggle.setAttribute('aria-expanded', 'true');
            this.activeDropdown = dropdown;
            
            // Add escape key listener
            this.addDropdownEscapeListener();
        }
    }
    
    hideDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        const toggle = dropdown.querySelector('.dropdown-toggle, .nav-link');
        
        if (menu && toggle) {
            menu.classList.remove('visible');
            toggle.setAttribute('aria-expanded', 'false');
            
            if (this.activeDropdown === dropdown) {
                this.activeDropdown = null;
            }
        }
    }
    
    toggleDropdown(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (menu && menu.classList.contains('visible')) {
            this.hideDropdown(dropdown);
        } else {
            this.showDropdown(dropdown);
        }
    }
    
    hideAllDropdowns() {
        this.dropdowns.forEach(dropdown => {
            this.hideDropdown(dropdown);
        });
    }
    
    focusFirstMenuItem(dropdown) {
        const firstItem = dropdown.querySelector('.dropdown-item');
        if (firstItem) {
            firstItem.focus();
        }
    }
    
    handleMenuItemKeydown(e, menuItems, currentIndex) {
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % menuItems.length;
                menuItems[nextIndex].focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
                menuItems[prevIndex].focus();
                break;
            case 'Escape':
                e.preventDefault();
                this.hideAllDropdowns();
                break;
            case 'Tab':
                this.hideAllDropdowns();
                break;
        }
    }
    
    addDropdownEscapeListener() {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                this.hideAllDropdowns();
                document.removeEventListener('keydown', handleEscape);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
    }
    
    openSidenav() {
        if (this.sidenav) {
            this.sidenav.classList.add('open');
            this.isSidenavOpen = true;
            
            if (this.overlay) {
                this.overlay.classList.add('visible');
            }
            
            document.body.classList.add('sidenav-open');
            
            // Focus first link
            const firstLink = this.sidenav.querySelector('.sidenav-link');
            if (firstLink) {
                firstLink.focus();
            }
        }
    }
    
    closeSidenav() {
        if (this.sidenav) {
            this.sidenav.classList.remove('open');
            this.isSidenavOpen = false;
            
            if (this.overlay) {
                this.overlay.classList.remove('visible');
            }
            
            document.body.classList.remove('sidenav-open');
        }
    }
    
    handleNavLinkClick(e, link) {
        // Remove active class from all links
        this.navLinks.forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile menu if open
        if (window.innerWidth <= 768) {
            this.closeMobileMenu();
        }
        
        // Handle special navigation
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            this.scrollToSection(href);
        }
    }
    
    setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            const dataPage = link.getAttribute('data-page');
            
            if (href === currentPage || 
                dataPage === currentPage.replace('.html', '') ||
                (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    scrollToSection(target) {
        const element = document.querySelector(target);
        if (element) {
            const headerHeight = this.header ? this.header.offsetHeight : 0;
            const targetPosition = element.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (this.header) {
            // Hide header on scroll down, show on scroll up
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                this.header.classList.add('hidden');
            } else {
                this.header.classList.remove('hidden');
            }
            
            // Add scrolled class
            this.header.classList.toggle('scrolled', currentScrollY > 50);
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && this.isMenuOpen) {
            this.closeMobileMenu();
        }
        
        // Hide dropdowns on mobile
        if (window.innerWidth <= 768) {
            this.hideAllDropdowns();
        }
    }
    
    handleOutsideClick(e) {
        // Close mobile menu
        if (this.isMenuOpen && 
            !e.target.closest('.nav-menu') && 
            !e.target.closest('.mobile-menu-toggle')) {
            this.closeMobileMenu();
        }
        
        // Close dropdowns
        if (this.activeDropdown && !e.target.closest('.nav-dropdown')) {
            this.hideAllDropdowns();
        }
        
        // Close sidenav
        if (this.isSidenavOpen && !e.target.closest('.sidenav')) {
            this.closeSidenav();
        }
    }
    
    handleKeyboardNavigation(e) {
        // Global keyboard shortcuts
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    // Focus search (if search component is available)
                    const searchInput = document.querySelector('#globalSearch');
                    if (searchInput) {
                        searchInput.focus();
                    }
                    break;
                case 'm':
                    e.preventDefault();
                    this.toggleMobileMenu();
                    break;
            }
        }
        
        // Escape key handling
        if (e.key === 'Escape') {
            this.closeMobileMenu();
            this.hideAllDropdowns();
            this.closeSidenav();
        }
    }
    
    // Public methods
    setActivePage(page) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const dataPage = link.getAttribute('data-page');
            const href = link.getAttribute('href');
            
            if (dataPage === page || href === `${page}.html`) {
                link.classList.add('active');
            }
        });
    }
    
    addNavItem(item) {
        if (this.navMenu) {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${item.href}" class="nav-link" data-page="${item.page}">${item.text}</a>`;
            this.navMenu.appendChild(li);
            
            // Rebind events
            const newLink = li.querySelector('.nav-link');
            newLink.addEventListener('click', (e) => {
                this.handleNavLinkClick(e, newLink);
            });
        }
    }
    
    removeNavItem(page) {
        const link = this.navMenu.querySelector(`[data-page="${page}"]`);
        if (link && link.parentElement) {
            link.parentElement.remove();
        }
    }
}

// Initialize navigation component when DOM is loaded
export function initializeNavigation(options = {}) {
    return new NavigationComponent(options);
}

// Export for global use
window.NavigationComponent = NavigationComponent;