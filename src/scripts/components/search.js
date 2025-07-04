// Search component functionality
import { debounce } from '../utils/helpers.js';

export class SearchComponent {
    constructor(options = {}) {
        this.options = {
            globalSearchSelector: '#globalSearch',
            heroSearchSelector: '.hero-search-input',
            searchButtonSelector: '.search-btn, .hero-search-btn',
            suggestionsSelector: '.search-suggestions',
            debounceDelay: 300,
            minQueryLength: 2,
            ...options
        };
        
        this.globalSearch = document.querySelector(this.options.globalSearchSelector);
        this.heroSearch = document.querySelector(this.options.heroSearchSelector);
        this.searchButtons = document.querySelectorAll(this.options.searchButtonSelector);
        this.suggestionsContainer = document.querySelector(this.options.suggestionsSelector);
        
        this.suggestions = [];
        this.activeSuggestionIndex = -1;
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadSearchData();
    }
    
    bindEvents() {
        // Global search events
        if (this.globalSearch) {
            this.globalSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(this.globalSearch.value);
                }
            });
            
            this.globalSearch.addEventListener('input', debounce((e) => {
                this.handleSearchInput(e.target.value);
            }, this.options.debounceDelay));
            
            this.globalSearch.addEventListener('keydown', (e) => {
                this.handleKeyNavigation(e);
            });
            
            this.globalSearch.addEventListener('focus', () => {
                this.showSuggestions();
            });
            
            this.globalSearch.addEventListener('blur', () => {
                // Delay hiding to allow suggestion clicks
                setTimeout(() => this.hideSuggestions(), 150);
            });
        }
        
        // Hero search events
        if (this.heroSearch) {
            this.heroSearch.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(this.heroSearch.value);
                }
            });
            
            this.heroSearch.addEventListener('input', debounce((e) => {
                this.handleSearchInput(e.target.value, 'hero');
            }, this.options.debounceDelay));
        }
        
        // Search button events
        this.searchButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const input = this.getInputForButton(btn);
                if (input && input.value) {
                    this.handleSearch(input.value);
                }
            });
        });
        
        // Click outside to close suggestions
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container')) {
                this.hideSuggestions();
            }
        });
    }
    
    getInputForButton(button) {
        return button.previousElementSibling || button.parentElement.querySelector('input');
    }
    
    handleSearchInput(query, context = 'global') {
        if (query.length >= this.options.minQueryLength) {
            this.showSearchSuggestions(query, context);
        } else {
            this.hideSuggestions();
        }
    }
    
    handleSearch(query) {
        const trimmedQuery = query.trim().toLowerCase();
        
        if (!trimmedQuery) return;
        
        // Track search
        this.trackSearch(trimmedQuery);
        
        // Hide suggestions
        this.hideSuggestions();
        
        // Route to appropriate page based on query
        this.routeSearch(trimmedQuery);
    }
    
    routeSearch(query) {
        // Check if it's a stock ticker
        if (this.isStockTicker(query)) {
            this.navigateToStock(query);
            return;
        }
        
        // Check for specific keywords
        const routes = this.getSearchRoutes();
        
        for (const route of routes) {
            if (route.keywords.some(keyword => query.includes(keyword))) {
                this.navigateToPage(route.url, query);
                return;
            }
        }
        
        // Default to insider trading search
        this.navigateToPage('insider-trading.html', query);
    }
    
    isStockTicker(query) {
        // Simple pattern matching for stock tickers
        return /^[A-Z]{1,5}$/.test(query.toUpperCase());
    }
    
    getSearchRoutes() {
        return [
            {
                keywords: ['patent', 'innovation', 'technology', 'invention'],
                url: 'patent-search/keywords.html'
            },
            {
                keywords: ['government', 'contract', 'federal', 'defense'],
                url: 'government-contracts.html'
            },
            {
                keywords: ['lobby', 'lobbying', 'political', 'influence'],
                url: 'corporate-lobbying.html'
            }
        ];
    }
    
    navigateToStock(ticker) {
        window.location.href = `stocks/${ticker.toLowerCase()}.html`;
    }
    
    navigateToPage(url, query = '') {
        const destination = query ? `${url}?q=${encodeURIComponent(query)}` : url;
        window.location.href = destination;
    }
    
    async showSearchSuggestions(query, context = 'global') {
        try {
            const suggestions = await this.generateSuggestions(query);
            this.suggestions = suggestions;
            this.activeSuggestionIndex = -1;
            this.renderSuggestions(suggestions, context);
        } catch (error) {
            console.error('Error generating suggestions:', error);
        }
    }
    
    async generateSuggestions(query) {
        const suggestions = [];
        
        // Stock ticker suggestions
        const stockSuggestions = this.getStockSuggestions(query);
        suggestions.push(...stockSuggestions);
        
        // Page suggestions
        const pageSuggestions = this.getPageSuggestions(query);
        suggestions.push(...pageSuggestions);
        
        // Recent searches
        const recentSuggestions = this.getRecentSearches(query);
        suggestions.push(...recentSuggestions);
        
        // Limit suggestions
        return suggestions.slice(0, 8);
    }
    
    getStockSuggestions(query) {
        const stockTickers = [
            { ticker: 'NVDA', name: 'NVIDIA Corporation' },
            { ticker: 'TSLA', name: 'Tesla, Inc.' },
            { ticker: 'AAPL', name: 'Apple Inc.' },
            { ticker: 'GOOGL', name: 'Alphabet Inc.' },
            { ticker: 'MSFT', name: 'Microsoft Corporation' },
            { ticker: 'META', name: 'Meta Platforms, Inc.' },
            { ticker: 'AMZN', name: 'Amazon.com, Inc.' }
        ];
        
        return stockTickers
            .filter(stock => 
                stock.ticker.toLowerCase().includes(query.toLowerCase()) ||
                stock.name.toLowerCase().includes(query.toLowerCase())
            )
            .map(stock => ({
                type: 'stock',
                text: `${stock.ticker} - ${stock.name}`,
                value: stock.ticker,
                url: `stocks/${stock.ticker.toLowerCase()}.html`,
                icon: '📈'
            }));
    }
    
    getPageSuggestions(query) {
        const pages = [
            { name: 'Insider Trading Dashboard', url: 'insider-trading.html', keywords: ['insider', 'trading', 'congress'] },
            { name: 'Patent Search', url: 'patent-search.html', keywords: ['patent', 'innovation', 'technology'] },
            { name: 'Government Contracts', url: 'government-contracts.html', keywords: ['government', 'contract', 'federal'] },
            { name: 'Corporate Lobbying', url: 'corporate-lobbying.html', keywords: ['lobby', 'lobbying', 'political'] }
        ];
        
        return pages
            .filter(page => 
                page.name.toLowerCase().includes(query.toLowerCase()) ||
                page.keywords.some(keyword => keyword.includes(query.toLowerCase()))
            )
            .map(page => ({
                type: 'page',
                text: page.name,
                value: page.name,
                url: page.url,
                icon: '🔍'
            }));
    }
    
    getRecentSearches(query) {
        const recent = this.getStoredSearches();
        return recent
            .filter(search => search.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 3)
            .map(search => ({
                type: 'recent',
                text: search,
                value: search,
                url: `insider-trading.html?q=${encodeURIComponent(search)}`,
                icon: '🕒'
            }));
    }
    
    renderSuggestions(suggestions, context = 'global') {
        if (!this.suggestionsContainer) {
            this.createSuggestionsContainer();
        }
        
        if (suggestions.length === 0) {
            this.hideSuggestions();
            return;
        }
        
        const html = suggestions.map((suggestion, index) => `
            <div class="suggestion-item ${index === this.activeSuggestionIndex ? 'active' : ''}" 
                 data-index="${index}" 
                 data-url="${suggestion.url}"
                 data-value="${suggestion.value}">
                <span class="suggestion-icon">${suggestion.icon}</span>
                <span class="suggestion-text">${this.highlightQuery(suggestion.text, this.getCurrentQuery())}</span>
                <span class="suggestion-type">${suggestion.type}</span>
            </div>
        `).join('');
        
        this.suggestionsContainer.innerHTML = html;
        this.bindSuggestionEvents();
        this.showSuggestions();
    }
    
    createSuggestionsContainer() {
        this.suggestionsContainer = document.createElement('div');
        this.suggestionsContainer.className = 'search-suggestions';
        
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.appendChild(this.suggestionsContainer);
        }
    }
    
    bindSuggestionEvents() {
        const suggestionItems = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const url = item.dataset.url;
                if (url) {
                    window.location.href = url;
                }
            });
            
            item.addEventListener('mouseenter', () => {
                this.setActiveSuggestion(parseInt(item.dataset.index));
            });
        });
    }
    
    handleKeyNavigation(e) {
        if (!this.suggestionsContainer || this.suggestions.length === 0) return;
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.navigateSuggestions(1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateSuggestions(-1);
                break;
            case 'Enter':
                if (this.activeSuggestionIndex >= 0) {
                    e.preventDefault();
                    this.selectActiveSuggestion();
                }
                break;
            case 'Escape':
                this.hideSuggestions();
                break;
        }
    }
    
    navigateSuggestions(direction) {
        const maxIndex = this.suggestions.length - 1;
        this.activeSuggestionIndex += direction;
        
        if (this.activeSuggestionIndex < 0) {
            this.activeSuggestionIndex = maxIndex;
        } else if (this.activeSuggestionIndex > maxIndex) {
            this.activeSuggestionIndex = 0;
        }
        
        this.setActiveSuggestion(this.activeSuggestionIndex);
    }
    
    setActiveSuggestion(index) {
        this.activeSuggestionIndex = index;
        
        const items = this.suggestionsContainer.querySelectorAll('.suggestion-item');
        items.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });
    }
    
    selectActiveSuggestion() {
        if (this.activeSuggestionIndex >= 0 && this.suggestions[this.activeSuggestionIndex]) {
            const suggestion = this.suggestions[this.activeSuggestionIndex];
            window.location.href = suggestion.url;
        }
    }
    
    getCurrentQuery() {
        return this.globalSearch ? this.globalSearch.value : '';
    }
    
    highlightQuery(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    showSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.classList.add('visible');
        }
    }
    
    hideSuggestions() {
        if (this.suggestionsContainer) {
            this.suggestionsContainer.classList.remove('visible');
        }
        this.activeSuggestionIndex = -1;
    }
    
    trackSearch(query) {
        // Store search in local storage for recent searches
        const searches = this.getStoredSearches();
        const updatedSearches = [query, ...searches.filter(s => s !== query)].slice(0, 10);
        localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
        
        // Analytics tracking (implement as needed)
        if (window.gtag) {
            window.gtag('event', 'search', {
                search_term: query,
                content_type: 'site_search'
            });
        }
    }
    
    getStoredSearches() {
        try {
            return JSON.parse(localStorage.getItem('recentSearches') || '[]');
        } catch {
            return [];
        }
    }
    
    loadSearchData() {
        // Load any additional search data (trending terms, popular searches, etc.)
        // This could be from an API or static data
    }
    
    // Public methods
    setQuery(query) {
        if (this.globalSearch) {
            this.globalSearch.value = query;
        }
        if (this.heroSearch) {
            this.heroSearch.value = query;
        }
    }
    
    clearQuery() {
        this.setQuery('');
        this.hideSuggestions();
    }
    
    focus() {
        if (this.globalSearch) {
            this.globalSearch.focus();
        } else if (this.heroSearch) {
            this.heroSearch.focus();
        }
    }
}

// Initialize search component when DOM is loaded
export function initializeSearch(options = {}) {
    return new SearchComponent(options);
}

// Export for global use
window.SearchComponent = SearchComponent;