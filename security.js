/**
 * Navy BCA Security Utilities
 * Provides input sanitization and XSS protection across all pages
 */

const NavySecurity = (function() {
    'use strict';

    /**
     * HTML entity mapping for escaping
     */
    const HTML_ENTITIES = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    /**
     * Escapes HTML special characters to prevent XSS
     * @param {string} str - The string to escape
     * @returns {string} - The escaped string
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        if (typeof str !== 'string') str = String(str);
        return str.replace(/[&<>"'`=/]/g, char => HTML_ENTITIES[char]);
    }

    /**
     * Sanitizes a string by removing potentially dangerous content
     * @param {string} str - The string to sanitize
     * @returns {string} - The sanitized string
     */
    function sanitizeString(str) {
        if (str === null || str === undefined) return '';
        if (typeof str !== 'string') str = String(str);

        // Remove script tags and event handlers
        let sanitized = str
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
            .replace(/on\w+\s*=\s*[^\s>]+/gi, '')
            .replace(/javascript:/gi, '')
            .replace(/data:/gi, '')
            .replace(/vbscript:/gi, '');

        return escapeHtml(sanitized);
    }

    /**
     * Validates and sanitizes numeric input
     * @param {*} value - The value to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     * @param {number} defaultValue - Default value if invalid
     * @returns {number} - The validated number
     */
    function sanitizeNumber(value, min, max, defaultValue) {
        const num = parseFloat(value);
        if (isNaN(num)) return defaultValue;
        if (min !== undefined && num < min) return min;
        if (max !== undefined && num > max) return max;
        return num;
    }

    /**
     * Validates and sanitizes integer input
     * @param {*} value - The value to validate
     * @param {number} min - Minimum allowed value
     * @param {number} max - Maximum allowed value
     * @param {number} defaultValue - Default value if invalid
     * @returns {number} - The validated integer
     */
    function sanitizeInteger(value, min, max, defaultValue) {
        const num = parseInt(value, 10);
        if (isNaN(num)) return defaultValue;
        if (min !== undefined && num < min) return min;
        if (max !== undefined && num > max) return max;
        return num;
    }

    /**
     * Validates that a value is in an allowed list
     * @param {*} value - The value to validate
     * @param {Array} allowedValues - Array of allowed values
     * @param {*} defaultValue - Default value if not in list
     * @returns {*} - The validated value or default
     */
    function sanitizeEnum(value, allowedValues, defaultValue) {
        if (!Array.isArray(allowedValues)) return defaultValue;
        return allowedValues.includes(value) ? value : defaultValue;
    }

    /**
     * Sanitizes URL to prevent javascript: and data: URLs
     * @param {string} url - The URL to sanitize
     * @returns {string} - The sanitized URL or empty string
     */
    function sanitizeUrl(url) {
        if (!url || typeof url !== 'string') return '';

        const trimmed = url.trim().toLowerCase();

        // Block dangerous URL schemes
        if (trimmed.startsWith('javascript:') ||
            trimmed.startsWith('data:') ||
            trimmed.startsWith('vbscript:')) {
            return '';
        }

        return url;
    }

    /**
     * Creates safe innerHTML by escaping content
     * Use this instead of directly setting innerHTML with user content
     * @param {string} content - Content to render safely
     * @returns {string} - Safe HTML string
     */
    function createSafeHtml(content) {
        return escapeHtml(content);
    }

    /**
     * Safely parses JSON with error handling
     * @param {string} jsonString - The JSON string to parse
     * @param {*} defaultValue - Default value if parsing fails
     * @returns {*} - Parsed object or default value
     */
    function safeJsonParse(jsonString, defaultValue) {
        if (!jsonString || typeof jsonString !== 'string') return defaultValue;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn('Failed to parse JSON:', e.message);
            return defaultValue;
        }
    }

    /**
     * Validates localStorage data with type checking
     * @param {string} key - The localStorage key
     * @param {Object} schema - Schema object defining expected types
     * @param {*} defaultValue - Default value if validation fails
     * @returns {*} - Validated data or default value
     */
    function getValidatedLocalStorage(key, schema, defaultValue) {
        const data = safeJsonParse(localStorage.getItem(key), null);
        if (!data) return defaultValue;

        // Basic schema validation
        for (const [field, config] of Object.entries(schema)) {
            if (data[field] !== undefined) {
                switch (config.type) {
                    case 'string':
                        if (typeof data[field] !== 'string') {
                            data[field] = config.default;
                        } else if (config.maxLength && data[field].length > config.maxLength) {
                            data[field] = data[field].substring(0, config.maxLength);
                        }
                        break;
                    case 'number':
                        data[field] = sanitizeNumber(data[field], config.min, config.max, config.default);
                        break;
                    case 'enum':
                        data[field] = sanitizeEnum(data[field], config.values, config.default);
                        break;
                    case 'boolean':
                        data[field] = Boolean(data[field]);
                        break;
                }
            }
        }

        return data;
    }

    /**
     * Sanitizes form input value
     * @param {HTMLInputElement|HTMLSelectElement} element - The form element
     * @returns {string} - The sanitized value
     */
    function sanitizeFormInput(element) {
        if (!element || !element.value) return '';
        return sanitizeString(element.value.trim());
    }

    /**
     * Applies input sanitization to all text inputs in a form
     * @param {HTMLFormElement|string} formOrSelector - Form element or CSS selector
     */
    function protectForm(formOrSelector) {
        const form = typeof formOrSelector === 'string'
            ? document.querySelector(formOrSelector)
            : formOrSelector;

        if (!form) return;

        const inputs = form.querySelectorAll('input[type="text"], textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Store cursor position
                const start = this.selectionStart;
                const end = this.selectionEnd;

                // Remove script tags in real-time
                const cleaned = this.value
                    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                    .replace(/on\w+\s*=/gi, '');

                if (cleaned !== this.value) {
                    this.value = cleaned;
                    // Restore cursor position
                    this.setSelectionRange(start, end);
                }
            });
        });
    }

    // Public API
    return {
        escapeHtml,
        sanitizeString,
        sanitizeNumber,
        sanitizeInteger,
        sanitizeEnum,
        sanitizeUrl,
        createSafeHtml,
        safeJsonParse,
        getValidatedLocalStorage,
        sanitizeFormInput,
        protectForm
    };
})();

// Make available globally
if (typeof window !== 'undefined') {
    window.NavySecurity = NavySecurity;
}
