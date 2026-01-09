/**
 * Theme Switcher for NavyBCA
 * Handles dark/light mode toggle and persistence
 */

(function() {
    'use strict';

    const THEME_STORAGE_KEY = 'navyBcaTheme';
    const THEME_ATTRIBUTE = 'data-theme';

    /**
     * Get the current theme from localStorage or system preference
     * @returns {string} 'light' or 'dark'
     */
    function getPreferredTheme() {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (storedTheme) {
            return storedTheme;
        }

        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            return 'light';
        }

        return 'dark'; // Default to dark theme
    }

    /**
     * Apply theme to the document
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute(THEME_ATTRIBUTE, 'light');
        } else {
            document.documentElement.removeAttribute(THEME_ATTRIBUTE);
        }

        // Update toggle button if it exists
        updateToggleButton(theme);
    }

    /**
     * Update the theme toggle button icon
     * @param {string} theme - Current theme
     */
    function updateToggleButton(theme) {
        const toggleBtn = document.getElementById('themeToggle');
        if (!toggleBtn) return;

        const icon = toggleBtn.querySelector('.theme-icon');
        if (!icon) return;

        // Update icon: sun for light mode, moon for dark mode
        icon.textContent = theme === 'light' ? '☀️' : '🌙';
        toggleBtn.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    }

    /**
     * Toggle between light and dark themes
     */
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'light' ? 'light' : 'dark';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        // Add rotation animation
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.classList.add('rotating');
            setTimeout(() => toggleBtn.classList.remove('rotating'), 500);
        }

        // Apply and save new theme
        applyTheme(newTheme);
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);

        // Dispatch custom event for other scripts that might need to know
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: newTheme } }));
    }

    /**
     * Initialize theme on page load
     */
    function initTheme() {
        // Apply theme immediately (before DOMContentLoaded to prevent flash)
        const preferredTheme = getPreferredTheme();
        applyTheme(preferredTheme);

        // Set up toggle button when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupToggleButton);
        } else {
            setupToggleButton();
        }
    }

    /**
     * Set up the theme toggle button event listener
     */
    function setupToggleButton() {
        const toggleBtn = document.getElementById('themeToggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleTheme);

            // Update icon based on current theme
            const currentTheme = document.documentElement.getAttribute(THEME_ATTRIBUTE) === 'light' ? 'light' : 'dark';
            updateToggleButton(currentTheme);
        }
    }

    /**
     * Listen for system theme changes
     */
    function watchSystemTheme() {
        if (!window.matchMedia) return;

        window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
            // Only apply if user hasn't manually set a preference
            if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                applyTheme(e.matches ? 'light' : 'dark');
            }
        });
    }

    // Initialize theme immediately
    initTheme();
    watchSystemTheme();

    // Export functions for external use
    window.NavyBCATheme = {
        toggle: toggleTheme,
        get: getPreferredTheme,
        apply: applyTheme
    };
})();
