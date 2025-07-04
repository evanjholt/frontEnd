// GSAP Animations for Quiver Quantitative
export class AnimationController {
    constructor(options = {}) {
        this.options = {
            enableGSAP: true,
            enableScrollTrigger: true,
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            ...options
        };
        
        this.isGSAPLoaded = typeof gsap !== 'undefined';
        this.animations = {};
        
        this.init();
    }

    init() {
        if (!this.isGSAPLoaded && this.options.enableGSAP) {
            console.warn('GSAP not loaded, animations disabled');
            return;
        }

        if (this.options.reducedMotion) {
            console.log('Reduced motion preference detected, limiting animations');
            this.limitAnimations();
            return;
        }

        // Initialize animations based on page
        this.initializePageAnimations();
    }

    limitAnimations() {
        // Set reduced motion styles
        if (this.isGSAPLoaded) {
            gsap.globalTimeline.timeScale(10); // Speed up animations significantly
        }
    }

    initializePageAnimations() {
        // Page load animations
        this.pageLoadAnimations();
        
        // Scroll-triggered animations
        if (this.options.enableScrollTrigger) {
            this.scrollAnimations();
        }
        
        // Interactive animations
        this.interactiveAnimations();
        
        // Floating elements animation
        this.floatingElementsAnimation();
        
        // Page-specific animations
        this.initializePageSpecificAnimations();
    }

    pageLoadAnimations() {
        if (!this.isGSAPLoaded) return;

        // Hero section animation
        const heroTimeline = gsap.timeline();
        
        heroTimeline
            .from('.hero-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power2.out'
            })
            .from('.hero-subtitle', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.6')
            .from('.hero-search', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.trending-section', {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: 'power2.out'
            }, '-=0.4')
            .from('.hero-visual', {
                duration: 1.2,
                x: 100,
                opacity: 0,
                ease: 'power2.out'
            }, '-=1');
        
        // Navigation animation
        gsap.from('.nav-container', {
            duration: 0.8,
            y: -20,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.2
        });
        
        // Trending bar animation
        gsap.from('.trending-bar', {
            duration: 0.8,
            y: 20,
            opacity: 0,
            ease: 'power2.out',
            delay: 1.5
        });
    }

    scrollAnimations() {
        if (!this.isGSAPLoaded || !window.ScrollTrigger) return;

        // Alternative data section
        gsap.from('.alternative-data .section-title', {
            scrollTrigger: {
                trigger: '.alternative-data',
                start: 'top 80%',
                end: 'bottom 20%'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        });
        
        gsap.from('.alternative-data .section-subtitle', {
            scrollTrigger: {
                trigger: '.alternative-data',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.2
        });
        
        gsap.from('.alternative-data .btn', {
            scrollTrigger: {
                trigger: '.alternative-data',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            delay: 0.4
        });
        
        // Pricing cards animation
        gsap.from('.pricing-card', {
            scrollTrigger: {
                trigger: '.pricing',
                start: 'top 80%'
            },
            duration: 0.8,
            y: 50,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.2
        });
        
        // Trusted by logos
        gsap.from('.logo-grid img', {
            scrollTrigger: {
                trigger: '.trusted-by',
                start: 'top 80%'
            },
            duration: 0.6,
            y: 30,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.1
        });
        
        // FAQ items
        gsap.from('.faq-item', {
            scrollTrigger: {
                trigger: '.faq',
                start: 'top 80%'
            },
            duration: 0.6,
            x: -30,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.1
        });
    }

    interactiveAnimations() {
        if (!this.isGSAPLoaded) return;

        // Button hover animations
        this.setupHoverAnimation('.btn', {
            duration: 0.3,
            scale: 1.05,
            ease: 'power2.out'
        });
        
        // Stock item hover animations
        this.setupHoverAnimation('.stock-item', {
            duration: 0.3,
            y: -2,
            boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
            ease: 'power2.out'
        });
        
        // Trending person hover animations
        document.querySelectorAll('.trending-person').forEach(person => {
            person.addEventListener('mouseenter', () => {
                gsap.to(person.querySelector('.avatar'), {
                    duration: 0.3,
                    scale: 1.1,
                    ease: 'power2.out'
                });
            });
            
            person.addEventListener('mouseleave', () => {
                gsap.to(person.querySelector('.avatar'), {
                    duration: 0.3,
                    scale: 1,
                    ease: 'power2.out'
                });
            });
        });
        
        // Pricing card hover animations
        this.setupHoverAnimation('.pricing-card', {
            duration: 0.3,
            y: -5,
            boxShadow: '0 10px 30px rgba(76, 175, 80, 0.2)',
            ease: 'power2.out'
        });
        
        // Logo hover animations
        document.querySelectorAll('.logo-grid img').forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                gsap.to(logo, {
                    duration: 0.3,
                    scale: 1.1,
                    filter: 'grayscale(0%) opacity(1)',
                    ease: 'power2.out'
                });
            });
            
            logo.addEventListener('mouseleave', () => {
                gsap.to(logo, {
                    duration: 0.3,
                    scale: 1,
                    filter: 'grayscale(100%) opacity(0.7)',
                    ease: 'power2.out'
                });
            });
        });
    }

    setupHoverAnimation(selector, hoverProps) {
        if (!this.isGSAPLoaded) return;

        document.querySelectorAll(selector).forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, hoverProps);
            });
            
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    duration: hoverProps.duration || 0.3,
                    scale: 1,
                    y: 0,
                    x: 0,
                    boxShadow: '0 0 0 rgba(76, 175, 80, 0)',
                    ease: hoverProps.ease || 'power2.out'
                });
            });
        });
    }

    floatingElementsAnimation() {
        if (!this.isGSAPLoaded) return;

        // Animate floating icons in hero section
        const floatingIcons = document.querySelectorAll('.floating-icon');
        
        floatingIcons.forEach((icon, index) => {
            // Set initial animation
            gsap.set(icon, {
                y: Math.random() * 20,
                rotation: Math.random() * 360
            });
            
            // Create floating animation
            gsap.to(icon, {
                duration: 3 + Math.random() * 2,
                y: '+=20',
                rotation: '+=180',
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.5
            });
            
            // Add subtle scale animation
            gsap.to(icon, {
                duration: 2 + Math.random(),
                scale: 1.1,
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true,
                delay: index * 0.3
            });
        });
        
        // Isometric device animation
        const device = document.querySelector('.isometric-device');
        if (device) {
            gsap.to(device, {
                duration: 4,
                rotationY: '+=5',
                rotationX: '+=2',
                ease: 'power1.inOut',
                repeat: -1,
                yoyo: true
            });
        }
        
        // Chart placeholder animation
        const chartPlaceholder = document.querySelector('.chart-placeholder');
        if (chartPlaceholder) {
            gsap.to(chartPlaceholder, {
                duration: 2,
                backgroundPosition: '200% 0',
                ease: 'power1.inOut',
                repeat: -1
            });
        }
    }

    // Trending ticker animation
    initializeTrendingTicker() {
        if (!this.isGSAPLoaded) return;

        const ticker = document.querySelector('.trending-ticker');
        if (ticker) {
            const tickerContent = ticker.innerHTML;
            ticker.innerHTML = tickerContent + tickerContent; // Duplicate content for seamless loop
            
            gsap.to(ticker, {
                duration: 30,
                x: '-50%',
                ease: 'none',
                repeat: -1
            });
        }
    }

    // Page transition animations
    pageTransitionOut(callback) {
        if (!this.isGSAPLoaded) {
            if (callback) callback();
            return Promise.resolve();
        }

        const timeline = gsap.timeline({
            onComplete: callback
        });
        
        timeline
            .to('main', {
                duration: 0.3,
                opacity: 0,
                y: -20,
                ease: 'power2.in'
            })
            .to('.header', {
                duration: 0.2,
                y: -50,
                ease: 'power2.in'
            }, '-=0.2');
        
        return timeline;
    }

    pageTransitionIn() {
        if (!this.isGSAPLoaded) return Promise.resolve();

        const timeline = gsap.timeline();
        
        timeline
            .from('.header', {
                duration: 0.4,
                y: -50,
                opacity: 0,
                ease: 'power2.out'
            })
            .from('main', {
                duration: 0.5,
                opacity: 0,
                y: 20,
                ease: 'power2.out'
            }, '-=0.2');
        
        return timeline;
    }

    // Data table animations
    animateDataTable(tableSelector) {
        if (!this.isGSAPLoaded) return;

        const rows = document.querySelectorAll(`${tableSelector} tbody tr`);
        
        gsap.from(rows, {
            duration: 0.6,
            y: 20,
            opacity: 0,
            ease: 'power2.out',
            stagger: 0.05
        });
    }

    // Chart animations
    animateChart(chartContainer) {
        if (!this.isGSAPLoaded || !chartContainer) return;
        
        gsap.from(chartContainer, {
            duration: 1,
            scale: 0.8,
            opacity: 0,
            ease: 'back.out(1.7)'
        });
        
        // Animate chart elements if they exist
        const chartBars = chartContainer.querySelectorAll('.chart-bar');
        if (chartBars.length > 0) {
            gsap.from(chartBars, {
                duration: 0.8,
                scaleY: 0,
                transformOrigin: 'bottom',
                ease: 'power2.out',
                stagger: 0.1,
                delay: 0.5
            });
        }
        
        const chartLines = chartContainer.querySelectorAll('.chart-line');
        if (chartLines.length > 0) {
            chartLines.forEach(line => {
                const pathLength = line.getTotalLength();
                gsap.set(line, {
                    strokeDasharray: pathLength,
                    strokeDashoffset: pathLength
                });
                
                gsap.to(line, {
                    duration: 1.5,
                    strokeDashoffset: 0,
                    ease: 'power2.out',
                    delay: 0.5
                });
            });
        }
    }

    // Loading animations
    showLoadingAnimation(element) {
        if (!this.isGSAPLoaded || !element) return;

        gsap.to(element, {
            duration: 0.3,
            opacity: 0.6,
            ease: 'power2.out'
        });
        
        element.classList.add('skeleton');
    }

    hideLoadingAnimation(element) {
        if (!this.isGSAPLoaded || !element) return;

        gsap.to(element, {
            duration: 0.3,
            opacity: 1,
            ease: 'power2.out'
        });
        
        element.classList.remove('skeleton');
    }

    // Utility functions
    createStaggeredAnimation(elements, animationProps, staggerAmount = 0.1) {
        if (!this.isGSAPLoaded) return;

        return gsap.from(elements, {
            ...animationProps,
            stagger: staggerAmount
        });
    }

    createScrollTriggeredAnimation(trigger, elements, animationProps) {
        if (!this.isGSAPLoaded || !window.ScrollTrigger) return;

        return gsap.from(elements, {
            scrollTrigger: {
                trigger: trigger,
                start: 'top 80%',
                end: 'bottom 20%'
            },
            ...animationProps
        });
    }

    // Initialize specific page animations
    initializePageSpecificAnimations() {
        const currentPage = this.getCurrentPage();
        
        switch (currentPage) {
            case 'index':
            case 'home':
                this.initializeTrendingTicker();
                break;
            case 'insider-trading':
                this.animateDataTable('.insider-trading-table');
                this.animateChart(document.querySelector('.insider-chart'));
                break;
            case 'government-contracts':
                this.animateChart(document.querySelector('.contracts-chart'));
                this.animateDataTable('.contracts-table');
                break;
            case 'corporate-lobbying':
                this.animateDataTable('.lobbying-table');
                this.animateChart(document.querySelector('.lobbying-chart'));
                break;
            case 'patent-search':
                this.animateChart(document.querySelector('.patent-chart'));
                break;
            default:
                if (currentPage.includes('stocks')) {
                    this.animateChart(document.querySelector('.stock-chart'));
                }
                break;
        }
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const segments = path.split('/');
        const filename = segments.pop() || segments.pop(); // Handle trailing slash
        return filename.replace('.html', '') || 'index';
    }

    // Public API methods
    destroy() {
        if (this.isGSAPLoaded) {
            gsap.killTweensOf('*');
        }
        this.animations = {};
    }

    pause() {
        if (this.isGSAPLoaded) {
            gsap.globalTimeline.pause();
        }
    }

    resume() {
        if (this.isGSAPLoaded) {
            gsap.globalTimeline.resume();
        }
    }
}

// Initialize animations
export function initializeAnimations(options = {}) {
    return new AnimationController(options);
}

// Export for global use
window.AnimationController = AnimationController;