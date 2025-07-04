// Utility functions for formatting data
export const formatters = {
    /**
     * Format currency values
     * @param {number} amount - The amount to format
     * @param {string} currency - The currency code (default: 'USD')
     * @param {object} options - Additional formatting options
     * @returns {string} Formatted currency string
     */
    currency: (amount, currency = 'USD', options = {}) => {
        const defaultOptions = {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            ...options
        };
        
        return new Intl.NumberFormat('en-US', defaultOptions).format(amount);
    },

    /**
     * Format large numbers with appropriate suffixes (K, M, B, T)
     * @param {number} value - The number to format
     * @param {number} decimals - Number of decimal places (default: 1)
     * @returns {string} Formatted number string
     */
    largeNumber: (value, decimals = 1) => {
        if (value === 0) return '0';
        
        const k = 1000;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['', 'K', 'M', 'B', 'T'];
        
        const i = Math.floor(Math.log(Math.abs(value)) / Math.log(k));
        
        if (i === 0) {
            return value.toString();
        }
        
        return parseFloat((value / Math.pow(k, i)).toFixed(dm)) + sizes[i];
    },

    /**
     * Format percentage values
     * @param {number} value - The decimal value to format as percentage
     * @param {number} decimals - Number of decimal places (default: 2)
     * @param {boolean} showSign - Whether to show + for positive values
     * @returns {string} Formatted percentage string
     */
    percentage: (value, decimals = 2, showSign = true) => {
        const formatted = (value * 100).toFixed(decimals);
        const prefix = showSign && value > 0 ? '+' : '';
        return `${prefix}${formatted}%`;
    },

    /**
     * Format date values
     * @param {Date|string|number} date - The date to format
     * @param {object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date string
     */
    date: (date, options = {}) => {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            ...options
        };
        
        return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
    },

    /**
     * Format date and time
     * @param {Date|string|number} date - The date to format
     * @param {object} options - Intl.DateTimeFormat options
     * @returns {string} Formatted date and time string
     */
    dateTime: (date, options = {}) => {
        const defaultOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            ...options
        };
        
        return new Intl.DateTimeFormat('en-US', defaultOptions).format(new Date(date));
    },

    /**
     * Format relative time (e.g., "2 days ago")
     * @param {Date|string|number} date - The date to format
     * @returns {string} Relative time string
     */
    relativeTime: (date) => {
        const now = new Date();
        const targetDate = new Date(date);
        const diffInSeconds = Math.floor((now - targetDate) / 1000);
        
        if (diffInSeconds < 60) {
            return 'just now';
        }
        
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
        }
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
        }
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 30) {
            return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
        }
        
        const diffInMonths = Math.floor(diffInDays / 30);
        if (diffInMonths < 12) {
            return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
        }
        
        const diffInYears = Math.floor(diffInMonths / 12);
        return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
    },

    /**
     * Format stock ticker symbols
     * @param {string} ticker - The ticker symbol
     * @returns {string} Formatted ticker symbol
     */
    ticker: (ticker) => {
        return ticker ? ticker.toUpperCase() : '';
    },

    /**
     * Format phone numbers
     * @param {string} phone - The phone number to format
     * @returns {string} Formatted phone number
     */
    phone: (phone) => {
        const cleaned = phone.replace(/\D/g, '');
        
        if (cleaned.length === 10) {
            return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        }
        
        if (cleaned.length === 11 && cleaned[0] === '1') {
            return cleaned.replace(/(\d)(\d{3})(\d{3})(\d{4})/, '$1 ($2) $3-$4');
        }
        
        return phone;
    },

    /**
     * Format file sizes
     * @param {number} bytes - The file size in bytes
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted file size string
     */
    fileSize: (bytes, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },

    /**
     * Format strings for URL slugs
     * @param {string} text - The text to format
     * @returns {string} URL-friendly slug
     */
    slug: (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    },

    /**
     * Truncate text to a specified length
     * @param {string} text - The text to truncate
     * @param {number} length - Maximum length
     * @param {string} suffix - Suffix to add when truncated (default: '...')
     * @returns {string} Truncated text
     */
    truncate: (text, length, suffix = '...') => {
        if (text.length <= length) return text;
        return text.substring(0, length - suffix.length) + suffix;
    },

    /**
     * Capitalize first letter of each word
     * @param {string} text - The text to capitalize
     * @returns {string} Title case text
     */
    titleCase: (text) => {
        return text.replace(/\w\S*/g, (txt) => {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    },

    /**
     * Format decimal numbers with specified precision
     * @param {number} value - The number to format
     * @param {number} decimals - Number of decimal places (default: 2)
     * @returns {string} Formatted number string
     */
    decimal: (value, decimals = 2) => {
        return Number(value).toFixed(decimals);
    },

    /**
     * Format numbers with thousands separators
     * @param {number} value - The number to format
     * @returns {string} Formatted number string with commas
     */
    thousands: (value) => {
        return Number(value).toLocaleString('en-US');
    }
};

// Export individual formatters for convenience
export const {
    currency,
    largeNumber,
    percentage,
    date,
    dateTime,
    relativeTime,
    ticker,
    phone,
    fileSize,
    slug,
    truncate,
    titleCase,
    decimal,
    thousands
} = formatters;