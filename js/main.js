// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeNavigation();
    initializePricingToggle();
    initializeFAQ();
});

// Global Search Functionality
function initializeSearch() {
    const globalSearch = document.getElementById('globalSearch');
    const heroSearch = document.querySelector('.hero-search-input');
    
    if (globalSearch) {
        globalSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });
        
        globalSearch.addEventListener('input', function(e) {
            if (e.target.value.length > 2) {
                showSearchSuggestions(e.target.value);
            }
        });
    }
    
    if (heroSearch) {
        heroSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this.value);
            }
        });
    }
    
    // Search buttons
    document.querySelectorAll('.search-btn, .hero-search-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling || this.parentElement.querySelector('input');
            if (input && input.value) {
                handleSearch(input.value);
            }
        });
    });
}

function handleSearch(query) {
    const trimmedQuery = query.trim().toLowerCase();
    
    if (!trimmedQuery) return;
    
    // Check if it's a stock ticker (simple pattern matching)
    if (/^[A-Z]{1,5}$/.test(trimmedQuery.toUpperCase())) {
        // Navigate to stock page
        window.location.href = `stocks/${trimmedQuery.toLowerCase()}.html`;
        return;
    }
    
    // Check for keywords that should go to patent search
    const patentKeywords = ['patent', 'innovation', 'technology', 'invention'];
    if (patentKeywords.some(keyword => trimmedQuery.includes(keyword))) {
        window.location.href = `patent-search/keywords.html?q=${encodeURIComponent(trimmedQuery)}`;
        return;
    }
    
    // Check for government/contracts related terms
    const govKeywords = ['government', 'contract', 'federal', 'defense'];
    if (govKeywords.some(keyword => trimmedQuery.includes(keyword))) {
        window.location.href = 'government-contracts.html';
        return;
    }
    
    // Check for lobbying related terms
    const lobbyKeywords = ['lobby', 'lobbying', 'political', 'influence'];
    if (lobbyKeywords.some(keyword => trimmedQuery.includes(keyword))) {
        window.location.href = 'corporate-lobbying.html';
        return;
    }
    
    // Default to insider trading search
    window.location.href = `insider-trading.html?q=${encodeURIComponent(trimmedQuery)}`;
}

function showSearchSuggestions(query) {
    // Mock suggestions based on query
    const suggestions = [];
    
    // Stock suggestions
    const stockTickers = ['NVDA', 'TSLA', 'AAPL', 'GOOGL', 'MSFT', 'META', 'AMZN'];
    stockTickers.forEach(ticker => {
        if (ticker.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push({
                type: 'stock',
                text: ticker,
                url: `stocks/${ticker.toLowerCase()}.html`
            });
        }
    });
    
    // Add other suggestions based on content
    if (query.toLowerCase().includes('insider')) {
        suggestions.push({
            type: 'page',
            text: 'Insider Trading Dashboard',
            url: 'insider-trading.html'
        });
    }
    
    if (query.toLowerCase().includes('patent')) {
        suggestions.push({
            type: 'page',
            text: 'Patent Search',
            url: 'patent-search.html'
        });
    }
    
    // For now, just log suggestions (in a real app, you'd show a dropdown)
    console.log('Search suggestions:', suggestions);
}

// Navigation functionality
function initializeNavigation() {
    // Mobile menu toggle (if needed)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown menus
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            let timeout;
            
            dropdown.addEventListener('mouseenter', function() {
                clearTimeout(timeout);
                menu.style.opacity = '1';
                menu.style.visibility = 'visible';
                menu.style.transform = 'translateY(0)';
            });
            
            dropdown.addEventListener('mouseleave', function() {
                timeout = setTimeout(() => {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }, 150);
            });
        }
    });
    
    // Active page highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
}

// Pricing toggle functionality
function initializePricingToggle() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    
    toggleButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            toggleButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update pricing (you would implement actual price changes here)
            const isYearly = this.textContent.trim() === 'Yearly';
            updatePricing(isYearly);
        });
    });
}

function updatePricing(isYearly) {
    const priceElement = document.querySelector('.pricing-card.featured .price');
    if (priceElement) {
        if (isYearly) {
            priceElement.textContent = '$250.00';
            priceElement.nextElementSibling.textContent = '/year';
        } else {
            priceElement.textContent = '$25.00';
            priceElement.nextElementSibling.textContent = '/month';
        }
    }
}

// FAQ functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.style.cursor = 'pointer';
            
            question.addEventListener('click', function() {
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

// Utility functions
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }).format(new Date(date));
}

function formatPercentage(value) {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// Performance monitoring
window.addEventListener('load', function() {
    if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
    }
});

// Export functions for use in other scripts
window.QuiverApp = {
    handleSearch,
    formatCurrency,
    formatDate,
    formatPercentage,
    debounce
};