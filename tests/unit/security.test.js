/**
 * Security Function Tests
 *
 * Tests for input sanitization, XSS prevention, and validation functions
 * in security.js
 */

// Import the security module
const fs = require('fs');
const path = require('path');

// Load security.js content and evaluate it
const securityCode = fs.readFileSync(path.join(__dirname, '../../security.js'), 'utf8');
eval(securityCode);

// Now NavySecurity should be available
const {
    escapeHtml,
    sanitizeString,
    sanitizeNumber,
    sanitizeInteger,
    sanitizeEnum,
    sanitizeUrl,
    createSafeHtml,
    safeJsonParse,
    getValidatedLocalStorage
} = NavySecurity;

describe('NavySecurity', () => {

    // ============================================================
    // escapeHtml Tests
    // ============================================================

    describe('escapeHtml', () => {
        it('should escape & character', () => {
            expect(escapeHtml('Tom & Jerry')).toBe('Tom &amp; Jerry');
        });

        it('should escape < and > characters', () => {
            expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
            expect(escapeHtml('<div>test</div>')).toBe('&lt;div&gt;test&lt;/div&gt;');
        });

        it('should escape quotes', () => {
            expect(escapeHtml('"double"')).toBe('&quot;double&quot;');
            expect(escapeHtml("'single'")).toBe('&#x27;single&#x27;');
        });

        it('should escape forward slash', () => {
            expect(escapeHtml('path/to/file')).toBe('path&#x2F;to&#x2F;file');
        });

        it('should escape backticks', () => {
            expect(escapeHtml('`template`')).toBe('&#x60;template&#x60;');
        });

        it('should escape equals sign', () => {
            expect(escapeHtml('a=b')).toBe('a&#x3D;b');
        });

        it('should handle null and undefined', () => {
            expect(escapeHtml(null)).toBe('');
            expect(escapeHtml(undefined)).toBe('');
        });

        it('should convert non-strings to strings', () => {
            expect(escapeHtml(123)).toBe('123');
            expect(escapeHtml(true)).toBe('true');
        });

        it('should escape multiple special characters together', () => {
            expect(escapeHtml('<script>alert("XSS")</script>')).toBe(
                '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;'
            );
        });

        it('should handle empty string', () => {
            expect(escapeHtml('')).toBe('');
        });
    });

    // ============================================================
    // sanitizeString Tests
    // ============================================================

    describe('sanitizeString', () => {
        it('should remove script tags', () => {
            expect(sanitizeString('<script>alert("XSS")</script>')).not.toContain('script');
            expect(sanitizeString('<script src="evil.js"></script>')).not.toContain('script');
        });

        it('should remove event handlers', () => {
            expect(sanitizeString('<img onerror="alert(1)">')).not.toContain('onerror');
            expect(sanitizeString('<div onclick="evil()">')).not.toContain('onclick');
            expect(sanitizeString('<body onload="hack()">')).not.toContain('onload');
        });

        it('should remove javascript: URLs', () => {
            expect(sanitizeString('javascript:alert(1)')).not.toContain('javascript:');
            expect(sanitizeString('JAVASCRIPT:alert(1)')).not.toContain('javascript');
        });

        it('should remove data: URLs', () => {
            expect(sanitizeString('data:text/html,<script>evil</script>')).not.toContain('data:');
        });

        it('should remove vbscript: URLs', () => {
            expect(sanitizeString('vbscript:msgbox("XSS")')).not.toContain('vbscript:');
        });

        it('should escape remaining HTML', () => {
            const result = sanitizeString('<div>Hello</div>');
            expect(result).toContain('&lt;');
            expect(result).toContain('&gt;');
        });

        it('should handle null and undefined', () => {
            expect(sanitizeString(null)).toBe('');
            expect(sanitizeString(undefined)).toBe('');
        });

        it('should handle complex XSS payloads', () => {
            const payload = '<img src=x onerror="javascript:alert(document.cookie)">';
            const result = sanitizeString(payload);
            expect(result).not.toContain('onerror');
            expect(result).not.toContain('javascript:');
        });

        it('should handle nested script tags', () => {
            const payload = '<script><script>alert(1)</script></script>';
            expect(sanitizeString(payload)).not.toContain('script');
        });
    });

    // ============================================================
    // sanitizeNumber Tests
    // ============================================================

    describe('sanitizeNumber', () => {
        it('should return valid numbers', () => {
            expect(sanitizeNumber(10, 0, 100, 50)).toBe(10);
            expect(sanitizeNumber('25.5', 0, 100, 50)).toBe(25.5);
        });

        it('should clamp to minimum', () => {
            expect(sanitizeNumber(-5, 0, 100, 50)).toBe(0);
            expect(sanitizeNumber(5, 10, 100, 50)).toBe(10);
        });

        it('should clamp to maximum', () => {
            expect(sanitizeNumber(150, 0, 100, 50)).toBe(100);
            expect(sanitizeNumber(1000, 0, 100, 50)).toBe(100);
        });

        it('should return default for NaN', () => {
            expect(sanitizeNumber('abc', 0, 100, 50)).toBe(50);
            expect(sanitizeNumber(NaN, 0, 100, 50)).toBe(50);
            expect(sanitizeNumber(undefined, 0, 100, 50)).toBe(50);
        });

        it('should handle edge cases', () => {
            expect(sanitizeNumber(0, 0, 100, 50)).toBe(0);
            expect(sanitizeNumber(100, 0, 100, 50)).toBe(100);
        });

        it('should work without min/max constraints', () => {
            expect(sanitizeNumber(500, undefined, undefined, 0)).toBe(500);
            expect(sanitizeNumber(-500, undefined, undefined, 0)).toBe(-500);
        });
    });

    // ============================================================
    // sanitizeInteger Tests
    // ============================================================

    describe('sanitizeInteger', () => {
        it('should return valid integers', () => {
            expect(sanitizeInteger(10, 0, 100, 50)).toBe(10);
        });

        it('should truncate decimals', () => {
            expect(sanitizeInteger(10.9, 0, 100, 50)).toBe(10);
            expect(sanitizeInteger('25.7', 0, 100, 50)).toBe(25);
        });

        it('should clamp to bounds', () => {
            expect(sanitizeInteger(-5, 0, 100, 50)).toBe(0);
            expect(sanitizeInteger(150, 0, 100, 50)).toBe(100);
        });

        it('should return default for invalid input', () => {
            expect(sanitizeInteger('abc', 0, 100, 50)).toBe(50);
        });
    });

    // ============================================================
    // sanitizeEnum Tests
    // ============================================================

    describe('sanitizeEnum', () => {
        it('should return value if in allowed list', () => {
            expect(sanitizeEnum('male', ['male', 'female'], 'male')).toBe('male');
            expect(sanitizeEnum('female', ['male', 'female'], 'male')).toBe('female');
        });

        it('should return default if not in list', () => {
            expect(sanitizeEnum('other', ['male', 'female'], 'male')).toBe('male');
            expect(sanitizeEnum('', ['male', 'female'], 'male')).toBe('male');
        });

        it('should return default for invalid allowed list', () => {
            expect(sanitizeEnum('test', null, 'default')).toBe('default');
            expect(sanitizeEnum('test', 'not-array', 'default')).toBe('default');
        });

        it('should handle numeric enums', () => {
            expect(sanitizeEnum(1, [1, 2, 3], 0)).toBe(1);
            expect(sanitizeEnum(5, [1, 2, 3], 0)).toBe(0);
        });
    });

    // ============================================================
    // sanitizeUrl Tests
    // ============================================================

    describe('sanitizeUrl', () => {
        it('should allow safe URLs', () => {
            expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
            expect(sanitizeUrl('http://localhost:3000')).toBe('http://localhost:3000');
            expect(sanitizeUrl('/relative/path')).toBe('/relative/path');
        });

        it('should block javascript: URLs', () => {
            expect(sanitizeUrl('javascript:alert(1)')).toBe('');
            expect(sanitizeUrl('JAVASCRIPT:alert(1)')).toBe('');
            expect(sanitizeUrl('  javascript:alert(1)')).toBe('');
        });

        it('should block data: URLs', () => {
            expect(sanitizeUrl('data:text/html,<script>evil</script>')).toBe('');
            expect(sanitizeUrl('DATA:text/html,test')).toBe('');
        });

        it('should block vbscript: URLs', () => {
            expect(sanitizeUrl('vbscript:msgbox(1)')).toBe('');
            expect(sanitizeUrl('VBSCRIPT:evil')).toBe('');
        });

        it('should handle null and undefined', () => {
            expect(sanitizeUrl(null)).toBe('');
            expect(sanitizeUrl(undefined)).toBe('');
        });

        it('should handle non-string input', () => {
            expect(sanitizeUrl(123)).toBe('');
            expect(sanitizeUrl({})).toBe('');
        });

        it('should handle URLs with spaces', () => {
            expect(sanitizeUrl('  https://example.com  ')).toBe('  https://example.com  ');
            expect(sanitizeUrl('   javascript:alert(1)')).toBe('');
        });
    });

    // ============================================================
    // safeJsonParse Tests
    // ============================================================

    describe('safeJsonParse', () => {
        it('should parse valid JSON', () => {
            expect(safeJsonParse('{"key": "value"}')).toEqual({ key: 'value' });
            expect(safeJsonParse('[1, 2, 3]')).toEqual([1, 2, 3]);
            expect(safeJsonParse('"string"')).toBe('string');
            expect(safeJsonParse('123')).toBe(123);
            expect(safeJsonParse('true')).toBe(true);
            expect(safeJsonParse('null')).toBe(null);
        });

        it('should return default for invalid JSON', () => {
            expect(safeJsonParse('not json', 'default')).toBe('default');
            expect(safeJsonParse('{invalid}', null)).toBe(null);
            expect(safeJsonParse('undefined', {})).toEqual({});
        });

        it('should return default for null/undefined input', () => {
            expect(safeJsonParse(null, 'default')).toBe('default');
            expect(safeJsonParse(undefined, 'default')).toBe('default');
        });

        it('should return default for non-string input', () => {
            expect(safeJsonParse(123, 'default')).toBe('default');
            expect(safeJsonParse({}, 'default')).toBe('default');
        });

        it('should handle empty string', () => {
            expect(safeJsonParse('', 'default')).toBe('default');
        });
    });

    // ============================================================
    // getValidatedLocalStorage Tests
    // ============================================================

    describe('getValidatedLocalStorage', () => {
        beforeEach(() => {
            localStorage.clear();
        });

        it('should return default when key not found', () => {
            const result = getValidatedLocalStorage('nonexistent', {}, 'default');
            expect(result).toBe('default');
        });

        it('should validate string fields', () => {
            localStorage.setItem('test', JSON.stringify({ name: 'John' }));

            const schema = {
                name: { type: 'string', default: 'Unknown' }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.name).toBe('John');
        });

        it('should truncate strings exceeding maxLength', () => {
            localStorage.setItem('test', JSON.stringify({ name: 'VeryLongName' }));

            const schema = {
                name: { type: 'string', maxLength: 5, default: '' }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.name).toBe('VeryL');
        });

        it('should validate number fields', () => {
            localStorage.setItem('test', JSON.stringify({ age: 25 }));

            const schema = {
                age: { type: 'number', min: 0, max: 120, default: 0 }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.age).toBe(25);
        });

        it('should clamp numbers to bounds', () => {
            localStorage.setItem('test', JSON.stringify({ age: 150 }));

            const schema = {
                age: { type: 'number', min: 0, max: 120, default: 0 }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.age).toBe(120);
        });

        it('should validate enum fields', () => {
            localStorage.setItem('test', JSON.stringify({ gender: 'male' }));

            const schema = {
                gender: { type: 'enum', values: ['male', 'female'], default: 'male' }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.gender).toBe('male');
        });

        it('should use default for invalid enum values', () => {
            localStorage.setItem('test', JSON.stringify({ gender: 'invalid' }));

            const schema = {
                gender: { type: 'enum', values: ['male', 'female'], default: 'male' }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.gender).toBe('male');
        });

        it('should validate boolean fields', () => {
            localStorage.setItem('test', JSON.stringify({ active: 1 }));

            const schema = {
                active: { type: 'boolean' }
            };

            const result = getValidatedLocalStorage('test', schema, null);
            expect(result.active).toBe(true);
        });

        it('should handle corrupted JSON', () => {
            localStorage.setItem('test', 'not-valid-json');

            const schema = { name: { type: 'string' } };
            const result = getValidatedLocalStorage('test', schema, 'default');

            expect(result).toBe('default');
        });
    });

    // ============================================================
    // createSafeHtml Tests
    // ============================================================

    describe('createSafeHtml', () => {
        it('should escape HTML in content', () => {
            expect(createSafeHtml('<script>evil</script>')).toBe(
                '&lt;script&gt;evil&lt;&#x2F;script&gt;'
            );
        });

        it('should be equivalent to escapeHtml', () => {
            const input = '<div onclick="hack()">Test & "quotes"</div>';
            expect(createSafeHtml(input)).toBe(escapeHtml(input));
        });
    });

    // ============================================================
    // XSS Attack Vector Tests
    // ============================================================

    describe('XSS Prevention', () => {
        const xssPayloads = [
            '<script>alert("XSS")</script>',
            '<img src=x onerror=alert("XSS")>',
            '<svg onload=alert("XSS")>',
            '<body onload=alert("XSS")>',
            '<input onfocus=alert("XSS") autofocus>',
            '<marquee onstart=alert("XSS")>',
            '<video><source onerror=alert("XSS")>',
            '<audio src=x onerror=alert("XSS")>',
            '<iframe src="javascript:alert(\'XSS\')">',
            '<a href="javascript:alert(\'XSS\')">click</a>',
            '<div style="background:url(javascript:alert(\'XSS\'))">',
            '"><script>alert("XSS")</script>',
            "'-alert('XSS')-'",
            '<ScRiPt>alert("XSS")</sCrIpT>',
            '<script/src=data:,alert("XSS")>',
        ];

        xssPayloads.forEach((payload, index) => {
            it(`should sanitize XSS payload ${index + 1}`, () => {
                const sanitized = sanitizeString(payload);
                expect(sanitized).not.toContain('<script');
                expect(sanitized).not.toContain('javascript:');
                expect(sanitized.toLowerCase()).not.toMatch(/on\w+=/i);
            });
        });
    });
});
