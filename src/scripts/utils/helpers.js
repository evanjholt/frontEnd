// Utility helper functions
export const helpers = {
    /**
     * Debounce function execution
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @param {boolean} immediate - Execute immediately on first call
     * @returns {Function} Debounced function
     */
    debounce: (func, wait, immediate = false) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    },

    /**
     * Throttle function execution
     * @param {Function} func - Function to throttle
     * @param {number} limit - Time limit in milliseconds
     * @returns {Function} Throttled function
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    /**
     * Generate a random ID
     * @param {number} length - Length of the ID (default: 8)
     * @returns {string} Random ID string
     */
    generateId: (length = 8) => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    },

    /**
     * Deep clone an object
     * @param {*} obj - Object to clone
     * @returns {*} Cloned object
     */
    deepClone: (obj) => {
        if (obj === null || typeof obj !== 'object') return obj;
        if (obj instanceof Date) return new Date(obj.getTime());
        if (obj instanceof Array) return obj.map(item => helpers.deepClone(item));
        if (typeof obj === 'object') {
            const clonedObj = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    clonedObj[key] = helpers.deepClone(obj[key]);
                }
            }
            return clonedObj;
        }
    },

    /**
     * Check if an object is empty
     * @param {*} obj - Object to check
     * @returns {boolean} True if object is empty
     */
    isEmpty: (obj) => {
        if (obj == null) return true;
        if (Array.isArray(obj) || typeof obj === 'string') return obj.length === 0;
        if (obj instanceof Map || obj instanceof Set) return obj.size === 0;
        return Object.keys(obj).length === 0;
    },

    /**
     * Get a nested property from an object safely
     * @param {object} obj - Object to get property from
     * @param {string} path - Dot notation path (e.g., 'user.profile.name')
     * @param {*} defaultValue - Default value if property doesn't exist
     * @returns {*} Property value or default value
     */
    getNestedProperty: (obj, path, defaultValue = undefined) => {
        const keys = path.split('.');
        let current = obj;
        
        for (const key of keys) {
            if (current == null || typeof current !== 'object') {
                return defaultValue;
            }
            current = current[key];
        }
        
        return current !== undefined ? current : defaultValue;
    },

    /**
     * Set a nested property in an object safely
     * @param {object} obj - Object to set property in
     * @param {string} path - Dot notation path
     * @param {*} value - Value to set
     * @returns {object} Modified object
     */
    setNestedProperty: (obj, path, value) => {
        const keys = path.split('.');
        let current = obj;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            if (!(key in current) || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return obj;
    },

    /**
     * Wait for a specified amount of time
     * @param {number} ms - Milliseconds to wait
     * @returns {Promise} Promise that resolves after the specified time
     */
    sleep: (ms) => new Promise(resolve => setTimeout(resolve, ms)),

    /**
     * Check if a value is a valid email
     * @param {string} email - Email to validate
     * @returns {boolean} True if valid email
     */
    isValidEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Check if a value is a valid URL
     * @param {string} url - URL to validate
     * @returns {boolean} True if valid URL
     */
    isValidUrl: (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Escape HTML characters
     * @param {string} html - HTML string to escape
     * @returns {string} Escaped HTML string
     */
    escapeHtml: (html) => {
        const div = document.createElement('div');
        div.textContent = html;
        return div.innerHTML;
    },

    /**
     * Remove HTML tags from a string
     * @param {string} html - HTML string to strip
     * @returns {string} Plain text string
     */
    stripHtml: (html) => {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    },

    /**
     * Convert a string to camelCase
     * @param {string} str - String to convert
     * @returns {string} camelCase string
     */
    toCamelCase: (str) => {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
            return index === 0 ? word.toLowerCase() : word.toUpperCase();
        }).replace(/\s+/g, '');
    },

    /**
     * Convert a string to kebab-case
     * @param {string} str - String to convert
     * @returns {string} kebab-case string
     */
    toKebabCase: (str) => {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    },

    /**
     * Get query parameters from URL
     * @param {string} url - URL to parse (optional, defaults to current URL)
     * @returns {object} Object with query parameters
     */
    getQueryParams: (url = window.location.href) => {
        const params = {};
        const urlObj = new URL(url);
        
        for (const [key, value] of urlObj.searchParams) {
            params[key] = value;
        }
        
        return params;
    },

    /**
     * Set query parameters in URL
     * @param {object} params - Parameters to set
     * @param {boolean} replace - Whether to replace current history state
     */
    setQueryParams: (params, replace = false) => {
        const url = new URL(window.location);
        
        Object.entries(params).forEach(([key, value]) => {
            if (value === null || value === undefined) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, value);
            }
        });
        
        if (replace) {
            window.history.replaceState({}, '', url);
        } else {
            window.history.pushState({}, '', url);
        }
    },

    /**
     * Check if device is mobile
     * @returns {boolean} True if mobile device
     */
    isMobile: () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * Check if device is iOS
     * @returns {boolean} True if iOS device
     */
    isIOS: () => {
        return /iPad|iPhone|iPod/.test(navigator.userAgent);
    },

    /**
     * Copy text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} Promise that resolves to success status
     */
    copyToClipboard: async (text) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const success = document.execCommand('copy');
                document.body.removeChild(textArea);
                return success;
            }
        } catch {
            return false;
        }
    },

    /**
     * Detect preferred color scheme
     * @returns {string} 'dark' or 'light'
     */
    getPreferredColorScheme: () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    },

    /**
     * Smoothly scroll to an element
     * @param {string|Element} target - Element or selector to scroll to
     * @param {object} options - Scroll options
     */
    scrollToElement: (target, options = {}) => {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                ...options
            });
        }
    },

    /**
     * Load a script dynamically
     * @param {string} src - Script source URL
     * @returns {Promise} Promise that resolves when script is loaded
     */
    loadScript: (src) => {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },

    /**
     * Parse CSV data
     * @param {string} csv - CSV string to parse
     * @param {string} delimiter - Column delimiter (default: ',')
     * @returns {Array<object>} Array of objects representing CSV rows
     */
    parseCSV: (csv, delimiter = ',') => {
        const lines = csv.split('\n');
        const headers = lines[0].split(delimiter);
        const result = [];
        
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim() === '') continue;
            
            const values = line.split(delimiter);
            const obj = {};
            
            headers.forEach((header, index) => {
                obj[header.trim()] = values[index] ? values[index].trim() : '';
            });
            
            result.push(obj);
        }
        
        return result;
    },

    /**
     * Group array of objects by a property
     * @param {Array} array - Array to group
     * @param {string} key - Property to group by
     * @returns {object} Grouped object
     */
    groupBy: (array, key) => {
        return array.reduce((groups, item) => {
            const group = item[key];
            if (!groups[group]) {
                groups[group] = [];
            }
            groups[group].push(item);
            return groups;
        }, {});
    }
};

// Export individual helpers for convenience
export const {
    debounce,
    throttle,
    generateId,
    deepClone,
    isEmpty,
    getNestedProperty,
    setNestedProperty,
    sleep,
    isValidEmail,
    isValidUrl,
    escapeHtml,
    stripHtml,
    toCamelCase,
    toKebabCase,
    getQueryParams,
    setQueryParams,
    isMobile,
    isIOS,
    copyToClipboard,
    getPreferredColorScheme,
    scrollToElement,
    loadScript,
    parseCSV,
    groupBy
} = helpers;