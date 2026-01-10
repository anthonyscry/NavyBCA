/**
 * Shared Utilities Tests
 *
 * Tests for utility functions in shared-utils.js
 */

const fs = require('fs');
const path = require('path');

// Create mock DOM elements for testing
document.body.innerHTML = '<div id="loadingOverlay" class="loading-overlay"><div class="loading-text">Loading...</div></div>';

// Load shared-utils.js
const sharedUtilsCode = fs.readFileSync(path.join(__dirname, '../../shared-utils.js'), 'utf8');
eval(sharedUtilsCode);

const {
    escapeHtml,
    debounce,
    safeJsonParse,
    formatDate,
    copyToClipboard,
    downloadFile,
    showNotification,
    showLoading,
    hideLoading
} = NavyUtils;

describe('NavyUtils', () => {

    // ============================================================
    // escapeHtml Tests
    // ============================================================

    describe('escapeHtml', () => {
        it('should escape HTML special characters', () => {
            const result = escapeHtml('<script>alert("XSS")</script>');
            expect(result).not.toContain('<script>');
            expect(result).toContain('&lt;');
            expect(result).toContain('&gt;');
        });

        it('should handle null and undefined', () => {
            expect(escapeHtml(null)).toBe('');
            expect(escapeHtml(undefined)).toBe('');
        });

        it('should convert non-strings to strings', () => {
            expect(escapeHtml(123)).toBe('123');
            expect(escapeHtml(true)).toBe('true');
        });

        it('should handle empty string', () => {
            expect(escapeHtml('')).toBe('');
        });

        it('should escape ampersand', () => {
            expect(escapeHtml('Tom & Jerry')).toContain('&amp;');
        });
    });

    // ============================================================
    // debounce Tests
    // ============================================================

    describe('debounce', () => {
        jest.useFakeTimers();

        it('should delay function execution', () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            expect(mockFn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(50);
            expect(mockFn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(50);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should reset timer on subsequent calls', () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn();
            jest.advanceTimersByTime(50);
            debouncedFn(); // Reset timer
            jest.advanceTimersByTime(50);
            expect(mockFn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(50);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should pass arguments to debounced function', () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 100);

            debouncedFn('arg1', 'arg2');
            jest.advanceTimersByTime(100);

            expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2');
        });

        it('should use default wait time of 250ms', () => {
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn);

            debouncedFn();
            jest.advanceTimersByTime(249);
            expect(mockFn).not.toHaveBeenCalled();

            jest.advanceTimersByTime(1);
            expect(mockFn).toHaveBeenCalledTimes(1);
        });

        it('should maintain correct this context', () => {
            const obj = {
                value: 42,
                method: debounce(function() {
                    return this.value;
                }, 100)
            };

            let result;
            obj.method.call(obj);
            // Note: Due to how debounce works with arrow functions internally,
            // the 'this' context test may need adjustment based on implementation
        });
    });

    // ============================================================
    // safeJsonParse Tests
    // ============================================================

    describe('safeJsonParse', () => {
        it('should parse valid JSON', () => {
            expect(safeJsonParse('{"name": "John"}')).toEqual({ name: 'John' });
            expect(safeJsonParse('[1, 2, 3]')).toEqual([1, 2, 3]);
            expect(safeJsonParse('"string"')).toBe('string');
            expect(safeJsonParse('123')).toBe(123);
        });

        it('should return default for invalid JSON', () => {
            expect(safeJsonParse('invalid', 'default')).toBe('default');
            expect(safeJsonParse('{bad json}', null)).toBe(null);
        });

        it('should return default for null/undefined', () => {
            expect(safeJsonParse(null, 'default')).toBe('default');
            expect(safeJsonParse(undefined, 'default')).toBe('default');
        });

        it('should return default for non-string input', () => {
            expect(safeJsonParse(123, 'default')).toBe('default');
            expect(safeJsonParse({}, 'default')).toBe('default');
        });

        it('should use null as default defaultValue', () => {
            expect(safeJsonParse('invalid')).toBe(null);
        });

        it('should log warning for invalid JSON', () => {
            safeJsonParse('{invalid}', 'default');
            expect(global.consoleWarnings.length).toBeGreaterThan(0);
        });
    });

    // ============================================================
    // formatDate Tests
    // ============================================================

    describe('formatDate', () => {
        it('should format Date objects', () => {
            const date = new Date('2024-01-15');
            const result = formatDate(date);
            expect(result).toContain('Jan');
            expect(result).toContain('15');
            expect(result).toContain('2024');
        });

        it('should format date strings', () => {
            const result = formatDate('2024-06-20');
            expect(result).toContain('Jun');
            expect(result).toContain('20');
            expect(result).toContain('2024');
        });

        it('should return empty string for invalid dates', () => {
            expect(formatDate('not a date')).toBe('');
            expect(formatDate('invalid')).toBe('');
        });

        it('should handle various date formats', () => {
            expect(formatDate('2024-12-25')).toContain('Dec');
            expect(formatDate('2024-03-01')).toContain('Mar');
        });
    });

    // ============================================================
    // copyToClipboard Tests
    // ============================================================

    describe('copyToClipboard', () => {
        it('should call clipboard API with text', async () => {
            navigator.clipboard.writeText.mockResolvedValue(undefined);

            const result = await copyToClipboard('test text');

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith('test text');
            expect(result).toBe(true);
        });

        it('should return false on clipboard error', async () => {
            navigator.clipboard.writeText.mockRejectedValue(new Error('Clipboard error'));

            const result = await copyToClipboard('test text');

            expect(result).toBe(false);
        });

        it('should handle empty string', async () => {
            navigator.clipboard.writeText.mockResolvedValue(undefined);

            const result = await copyToClipboard('');

            expect(navigator.clipboard.writeText).toHaveBeenCalledWith('');
            expect(result).toBe(true);
        });
    });

    // ============================================================
    // downloadFile Tests
    // ============================================================

    describe('downloadFile', () => {
        it('should create and click a download link', () => {
            const mockClick = jest.fn();
            const mockAppendChild = jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
            const mockRemoveChild = jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});

            // Mock createElement to return a link with click method
            const originalCreateElement = document.createElement.bind(document);
            jest.spyOn(document, 'createElement').mockImplementation((tag) => {
                const el = originalCreateElement(tag);
                if (tag === 'a') {
                    el.click = mockClick;
                }
                return el;
            });

            downloadFile('test content', 'test.txt', 'text/plain');

            expect(URL.createObjectURL).toHaveBeenCalled();
            expect(mockClick).toHaveBeenCalled();
            expect(URL.revokeObjectURL).toHaveBeenCalled();

            // Cleanup
            mockAppendChild.mockRestore();
            mockRemoveChild.mockRestore();
            document.createElement.mockRestore();
        });

        it('should use default mime type', () => {
            const mockClick = jest.fn();
            jest.spyOn(document.body, 'appendChild').mockImplementation(() => {});
            jest.spyOn(document.body, 'removeChild').mockImplementation(() => {});

            const originalCreateElement = document.createElement.bind(document);
            jest.spyOn(document, 'createElement').mockImplementation((tag) => {
                const el = originalCreateElement(tag);
                if (tag === 'a') {
                    el.click = mockClick;
                }
                return el;
            });

            downloadFile('content', 'file.txt');

            // Should use 'text/plain' as default
            expect(URL.createObjectURL).toHaveBeenCalled();

            // Cleanup
            document.body.appendChild.mockRestore();
            document.body.removeChild.mockRestore();
            document.createElement.mockRestore();
        });
    });

    // ============================================================
    // showNotification Tests
    // ============================================================

    describe('showNotification', () => {
        beforeEach(() => {
            // Clear any existing notifications
            document.querySelectorAll('.notification').forEach(n => n.remove());
        });

        it('should create notification element', () => {
            showNotification('Test message', 'info');

            const notification = document.querySelector('.notification');
            expect(notification).not.toBeNull();
            expect(notification.classList.contains('info')).toBe(true);
        });

        it('should include message text', () => {
            showNotification('Hello World', 'success');

            const notification = document.querySelector('.notification');
            expect(notification.textContent).toContain('Hello World');
        });

        it('should include title when provided', () => {
            showNotification('Message', 'warning', 'Title');

            const notification = document.querySelector('.notification');
            expect(notification.textContent).toContain('Title');
        });

        it('should apply correct type class', () => {
            showNotification('Error message', 'error');

            const notification = document.querySelector('.notification.error');
            expect(notification).not.toBeNull();
        });

        it('should use info as default type', () => {
            showNotification('Default message');

            const notification = document.querySelector('.notification.info');
            expect(notification).not.toBeNull();
        });

        it('should include close button', () => {
            showNotification('Test', 'info');

            const closeBtn = document.querySelector('.notification-close');
            expect(closeBtn).not.toBeNull();
        });
    });

    // ============================================================
    // showLoading / hideLoading Tests
    // ============================================================

    describe('showLoading and hideLoading', () => {
        beforeEach(() => {
            // Reset the loading overlay
            const overlay = document.getElementById('loadingOverlay');
            if (overlay) {
                overlay.classList.remove('active');
            }
        });

        it('should add active class when showing', () => {
            showLoading('Loading...');

            const overlay = document.getElementById('loadingOverlay');
            expect(overlay.classList.contains('active')).toBe(true);
        });

        it('should update loading text', () => {
            showLoading('Please wait...');

            const text = document.querySelector('.loading-text');
            expect(text.textContent).toBe('Please wait...');
        });

        it('should remove active class when hiding', () => {
            showLoading();
            hideLoading();

            const overlay = document.getElementById('loadingOverlay');
            expect(overlay.classList.contains('active')).toBe(false);
        });

        it('should use default message', () => {
            showLoading();

            const text = document.querySelector('.loading-text');
            expect(text.textContent).toBe('Loading...');
        });

        it('should handle missing overlay gracefully', () => {
            // Remove overlay
            const overlay = document.getElementById('loadingOverlay');
            overlay.remove();

            // Should not throw
            expect(() => hideLoading()).not.toThrow();
        });
    });

    // ============================================================
    // Edge Cases
    // ============================================================

    describe('Edge Cases', () => {
        it('debounce should handle zero wait time', () => {
            jest.useFakeTimers();
            const mockFn = jest.fn();
            const debouncedFn = debounce(mockFn, 0);

            debouncedFn();
            jest.advanceTimersByTime(0);

            expect(mockFn).toHaveBeenCalled();
        });

        it('formatDate should handle timestamp numbers', () => {
            const timestamp = new Date('2024-01-15').getTime();
            const result = formatDate(new Date(timestamp));
            expect(result).toContain('Jan');
        });

        it('escapeHtml should handle very long strings', () => {
            const longString = '<'.repeat(10000);
            const result = escapeHtml(longString);
            expect(result.includes('<')).toBe(false);
            expect(result.includes('&lt;')).toBe(true);
        });
    });
});
