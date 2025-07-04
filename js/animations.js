// GSAP Animations for Quiver Quantitative
document.addEventListener('DOMContentLoaded', function() {
    // Register GSAP plugins (if available)
    if (typeof gsap !== 'undefined') {
        initializeAnimations();
    } else {
        console.warn('GSAP not loaded, animations disabled');
    }
});

function initializeAnimations() {
    // Page load animations
    pageLoadAnimations();
    
    // Scroll-triggered animations
    scrollAnimations();
    
    // Interactive animations
    interactiveAnimations();
    
    // Floating elements animation
    floatingElementsAnimation();
}

function pageLoadAnimations() {
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

function scrollAnimations() {
    // Create scroll triggers for various sections
    
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

function interactiveAnimations() {
    // Button hover animations
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.05,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // Stock item hover animations
    document.querySelectorAll('.stock-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -2,
                boxShadow: '0 4px 20px rgba(76, 175, 80, 0.3)',
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 0 0 rgba(76, 175, 80, 0)',
                ease: 'power2.out'
            });
        });
    });
    
    // Trending person hover animations
    document.querySelectorAll('.trending-person').forEach(person => {
        person.addEventListener('mouseenter', function() {
            gsap.to(this.querySelector('.avatar'), {
                duration: 0.3,
                scale: 1.1,
                ease: 'power2.out'
            });
        });
        
        person.addEventListener('mouseleave', function() {
            gsap.to(this.querySelector('.avatar'), {
                duration: 0.3,
                scale: 1,
                ease: 'power2.out'
            });
        });
    });
    
    // Pricing card hover animations
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                y: -5,
                boxShadow: '0 10px 30px rgba(76, 175, 80, 0.2)',
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                y: 0,
                boxShadow: '0 0 0 rgba(76, 175, 80, 0)',
                ease: 'power2.out'
            });
        });
    });
    
    // Logo hover animations
    document.querySelectorAll('.logo-grid img').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1.1,
                filter: 'grayscale(0%) opacity(1)',
                ease: 'power2.out'
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            gsap.to(this, {
                duration: 0.3,
                scale: 1,
                filter: 'grayscale(100%) opacity(0.7)',
                ease: 'power2.out'
            });
        });
    });
}

function floatingElementsAnimation() {
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
function initializeTrendingTicker() {
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
function pageTransitionOut(callback) {
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

function pageTransitionIn() {
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
function animateDataTable(tableSelector) {
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
function animateChart(chartContainer) {
    if (!chartContainer) return;
    
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

// Stock card animations
function animateStockCards() {
    const stockCards = document.querySelectorAll('.stock-card');
    
    gsap.from(stockCards, {
        scrollTrigger: {
            trigger: stockCards[0],
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.1
    });
}

// Search results animation
function animateSearchResults() {
    const searchResults = document.querySelectorAll('.search-result');
    
    gsap.from(searchResults, {
        duration: 0.6,
        y: 30,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.05
    });
}

// Loading animations
function showLoadingAnimation(element) {
    gsap.to(element, {
        duration: 0.3,
        opacity: 0.6,
        ease: 'power2.out'
    });
    
    // Add skeleton loading animation
    element.classList.add('skeleton');
}

function hideLoadingAnimation(element) {
    gsap.to(element, {
        duration: 0.3,
        opacity: 1,
        ease: 'power2.out'
    });
    
    // Remove skeleton loading animation
    element.classList.remove('skeleton');
}

// Error animation
function showErrorAnimation(element, message) {
    // Shake animation
    gsap.to(element, {
        duration: 0.1,
        x: 5,
        ease: 'power2.inOut',
        repeat: 5,
        yoyo: true,
        onComplete: () => {
            gsap.set(element, { x: 0 });
        }
    });
    
    // Show error message if provided
    if (message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            position: absolute;
            background: #f44336;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
        `;
        
        document.body.appendChild(errorElement);
        
        // Position near the element
        const rect = element.getBoundingClientRect();
        errorElement.style.top = (rect.bottom + 10) + 'px';
        errorElement.style.left = rect.left + 'px';
        
        // Animate in and out
        gsap.to(errorElement, {
            duration: 0.3,
            opacity: 1,
            ease: 'power2.out'
        });
        
        gsap.to(errorElement, {
            duration: 0.3,
            opacity: 0,
            ease: 'power2.in',
            delay: 3,
            onComplete: () => {
                document.body.removeChild(errorElement);
            }
        });
    }
}

// Success animation
function showSuccessAnimation(element, message) {
    // Pulse animation
    gsap.to(element, {
        duration: 0.2,
        scale: 1.05,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1
    });
    
    // Show success message if provided
    if (message) {
        const successElement = document.createElement('div');
        successElement.className = 'success-message';
        successElement.textContent = message;
        successElement.style.cssText = `
            position: absolute;
            background: #4CAF50;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            font-size: 0.9rem;
            z-index: 1000;
            opacity: 0;
        `;
        
        document.body.appendChild(successElement);
        
        // Position near the element
        const rect = element.getBoundingClientRect();
        successElement.style.top = (rect.bottom + 10) + 'px';
        successElement.style.left = rect.left + 'px';
        
        // Animate in and out
        gsap.to(successElement, {
            duration: 0.3,
            opacity: 1,
            ease: 'power2.out'
        });
        
        gsap.to(successElement, {
            duration: 0.3,
            opacity: 0,
            ease: 'power2.in',
            delay: 2,
            onComplete: () => {
                document.body.removeChild(successElement);
            }
        });
    }
}

// Utility functions for animations
function createStaggeredAnimation(elements, animationProps, staggerAmount = 0.1) {
    return gsap.from(elements, {
        ...animationProps,
        stagger: staggerAmount
    });
}

function createScrollTriggeredAnimation(trigger, elements, animationProps) {
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
function initializePageSpecificAnimations() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch (currentPage) {
        case 'index.html':
        case '':
            initializeTrendingTicker();
            break;
        case 'insider-trading.html':
            animateDataTable('.insider-trading-table');
            animateChart(document.querySelector('.insider-chart'));
            break;
        case 'government-contracts.html':
            animateChart(document.querySelector('.contracts-chart'));
            animateDataTable('.contracts-table');
            break;
        case 'corporate-lobbying.html':
            animateDataTable('.lobbying-table');
            animateChart(document.querySelector('.lobbying-chart'));
            break;
        case 'patent-search.html':
            animateChart(document.querySelector('.patent-chart'));
            break;
        default:
            if (currentPage.includes('stocks/')) {
                animateStockCards();
                animateChart(document.querySelector('.stock-chart'));
            }
            break;
    }
}

// Export animation functions for use in other scripts
window.QuiverAnimations = {
    pageTransitionOut,
    pageTransitionIn,
    animateDataTable,
    animateChart,
    animateStockCards,
    animateSearchResults,
    showLoadingAnimation,
    hideLoadingAnimation,
    showErrorAnimation,
    showSuccessAnimation,
    createStaggeredAnimation,
    createScrollTriggeredAnimation
};

// Initialize page-specific animations when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all elements are rendered
    setTimeout(initializePageSpecificAnimations, 100);
});