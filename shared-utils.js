/**
 * Navy BCA Shared Utilities
 * Common functions used across multiple pages
 */

const NavyUtils = (function() {
    'use strict';

    /**
     * Shows a notification toast message
     * @param {string} message - The message to display
     * @param {string} type - Type: 'success', 'error', 'warning', 'info'
     * @param {string} title - Optional title for the notification
     */
    function showNotification(message, type = 'info', title = '') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: '&#x2713;',
            error: '&#x2717;',
            warning: '&#x26A0;',
            info: '&#x2139;'
        };

        notification.innerHTML = `
            <div class="notification-icon">${icons[type] || '&#x2139;'}</div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${escapeHtml(title)}</div>` : ''}
                <div class="notification-message">${escapeHtml(message)}</div>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()" aria-label="Close notification">&times;</button>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    /**
     * Shows a loading overlay
     * @param {string} message - Loading message to display
     */
    function showLoading(message = 'Loading...') {
        let overlay = document.getElementById('loadingOverlay');

        // Create overlay if it doesn't exist
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'loadingOverlay';
            overlay.className = 'loading-overlay';
            overlay.innerHTML = `
                <div class="loading-spinner"></div>
                <div class="loading-text">${escapeHtml(message)}</div>
            `;
            document.body.appendChild(overlay);
        } else {
            const text = overlay.querySelector('.loading-text');
            if (text) text.textContent = message;
        }

        overlay.classList.add('active');
    }

    /**
     * Hides the loading overlay
     */
    function hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }

    /**
     * Escapes HTML special characters
     * @param {string} str - String to escape
     * @returns {string} - Escaped string
     */
    function escapeHtml(str) {
        if (str === null || str === undefined) return '';
        if (typeof str !== 'string') str = String(str);
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    /**
     * Debounce function to limit how often a function can fire
     * @param {Function} func - Function to debounce
     * @param {number} wait - Milliseconds to wait
     * @returns {Function} - Debounced function
     */
    function debounce(func, wait = 250) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    /**
     * Safely parses JSON with error handling
     * @param {string} jsonString - JSON string to parse
     * @param {*} defaultValue - Default value if parsing fails
     * @returns {*} - Parsed object or default value
     */
    function safeJsonParse(jsonString, defaultValue = null) {
        if (!jsonString || typeof jsonString !== 'string') return defaultValue;
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            console.warn('Failed to parse JSON:', e.message);
            return defaultValue;
        }
    }

    /**
     * Formats a date for display
     * @param {Date|string} date - Date to format
     * @returns {string} - Formatted date string
     */
    function formatDate(date) {
        const d = date instanceof Date ? date : new Date(date);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    /**
     * Copies text to clipboard
     * @param {string} text - Text to copy
     * @returns {Promise<boolean>} - Success status
     */
    async function copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            showNotification('Copied to clipboard!', 'success');
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            showNotification('Failed to copy to clipboard', 'error');
            return false;
        }
    }

    /**
     * Downloads content as a file
     * @param {string} content - File content
     * @param {string} filename - Name for the downloaded file
     * @param {string} mimeType - MIME type of the file
     */
    function downloadFile(content, filename, mimeType = 'text/plain') {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Public API
    return {
        showNotification,
        showLoading,
        hideLoading,
        escapeHtml,
        debounce,
        safeJsonParse,
        formatDate,
        copyToClipboard,
        downloadFile
    };
})();

// Make available globally
if (typeof window !== 'undefined') {
    window.NavyUtils = NavyUtils;
    // Also expose commonly used functions globally for backward compatibility
    window.showNotification = NavyUtils.showNotification;
    window.showLoading = NavyUtils.showLoading;
    window.hideLoading = NavyUtils.hideLoading;
}
