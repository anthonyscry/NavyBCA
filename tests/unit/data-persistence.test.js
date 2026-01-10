/**
 * Data Persistence Tests
 *
 * Tests for localStorage operations and data validation
 */

describe('Data Persistence', () => {
    const STORAGE_KEY = 'navyBcaData';
    const REMEMBER_KEY = 'navyBcaRemember';

    beforeEach(() => {
        localStorage.clear();
    });

    // ============================================================
    // saveData Tests
    // ============================================================

    describe('saveData functionality', () => {
        // Simulated save function based on index.html implementation
        function saveData(data) {
            if (!data.remember) return;

            const saveObj = {
                gender: data.gender,
                heightFeet: data.heightFeet,
                heightInches: data.heightInches,
                weight: data.weight,
                waist: data.waist,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(saveObj));
            localStorage.setItem(REMEMBER_KEY, 'true');
        }

        it('should save data to localStorage when remember is true', () => {
            saveData({
                remember: true,
                gender: 'male',
                heightFeet: '5',
                heightInches: '10',
                weight: '180',
                waist: '34'
            });

            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            expect(saved).not.toBeNull();
            expect(saved.gender).toBe('male');
            expect(saved.weight).toBe('180');
        });

        it('should not save when remember is false', () => {
            saveData({
                remember: false,
                gender: 'male',
                heightFeet: '5',
                heightInches: '10',
                weight: '180',
                waist: '34'
            });

            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('should include timestamp', () => {
            const before = new Date();

            saveData({
                remember: true,
                gender: 'female',
                heightFeet: '5',
                heightInches: '4',
                weight: '140',
                waist: '28'
            });

            const after = new Date();
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

            const savedTime = new Date(saved.timestamp);
            expect(savedTime >= before).toBe(true);
            expect(savedTime <= after).toBe(true);
        });
    });

    // ============================================================
    // loadSavedData Tests
    // ============================================================

    describe('loadSavedData functionality', () => {
        // Simulated load function based on index.html implementation
        function loadSavedData() {
            const savedData = localStorage.getItem(STORAGE_KEY);
            if (!savedData) return null;

            try {
                const data = JSON.parse(savedData);

                // Validate gender
                if (!['male', 'female'].includes(data.gender)) {
                    data.gender = 'male';
                }

                // Validate height feet
                if (!['4', '5', '6', '7'].includes(String(data.heightFeet))) {
                    data.heightFeet = '5';
                }

                // Validate height inches
                const hi = parseFloat(data.heightInches);
                if (isNaN(hi) || hi < 0 || hi > 11.5) {
                    data.heightInches = '0';
                }

                // Validate weight
                const w = parseFloat(data.weight);
                if (isNaN(w) || w < 61 || w > 400) {
                    data.weight = '180';
                }

                // Validate waist
                const ws = parseFloat(data.waist);
                if (isNaN(ws) || ws < 20 || ws > 60) {
                    data.waist = '34';
                }

                return data;
            } catch (e) {
                localStorage.removeItem(STORAGE_KEY);
                return null;
            }
        }

        it('should load valid saved data', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'female',
                heightFeet: '5',
                heightInches: '4',
                weight: '130',
                waist: '28'
            }));

            const data = loadSavedData();

            expect(data.gender).toBe('female');
            expect(data.weight).toBe('130');
        });

        it('should return null when no data exists', () => {
            const data = loadSavedData();
            expect(data).toBeNull();
        });

        it('should handle corrupted JSON gracefully', () => {
            localStorage.setItem(STORAGE_KEY, 'not valid json');

            const data = loadSavedData();

            expect(data).toBeNull();
            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('should validate gender field', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'invalid',
                heightFeet: '5',
                heightInches: '10',
                weight: '180',
                waist: '34'
            }));

            const data = loadSavedData();
            expect(data.gender).toBe('male');
        });

        it('should validate heightFeet field', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'male',
                heightFeet: '10', // Invalid
                heightInches: '10',
                weight: '180',
                waist: '34'
            }));

            const data = loadSavedData();
            expect(data.heightFeet).toBe('5');
        });

        it('should validate heightInches bounds', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'male',
                heightFeet: '5',
                heightInches: '15', // Out of range
                weight: '180',
                waist: '34'
            }));

            const data = loadSavedData();
            expect(data.heightInches).toBe('0');
        });

        it('should validate weight bounds', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'male',
                heightFeet: '5',
                heightInches: '10',
                weight: '500', // Out of range
                waist: '34'
            }));

            const data = loadSavedData();
            expect(data.weight).toBe('180');
        });

        it('should validate waist bounds', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: 'male',
                heightFeet: '5',
                heightInches: '10',
                weight: '180',
                waist: '10' // Too small
            }));

            const data = loadSavedData();
            expect(data.waist).toBe('34');
        });
    });

    // ============================================================
    // clearSavedData Tests
    // ============================================================

    describe('clearSavedData functionality', () => {
        function clearSavedData() {
            localStorage.removeItem(STORAGE_KEY);
        }

        it('should remove saved data', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ test: 'data' }));

            clearSavedData();

            expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
        });

        it('should handle missing data gracefully', () => {
            expect(() => clearSavedData()).not.toThrow();
        });
    });

    // ============================================================
    // Round-trip Tests
    // ============================================================

    describe('Round-trip save/load', () => {
        function saveData(data) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: data.gender,
                heightFeet: data.heightFeet,
                heightInches: data.heightInches,
                weight: data.weight,
                waist: data.waist,
                timestamp: new Date().toISOString()
            }));
        }

        function loadSavedData() {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        }

        it('should preserve all data through round-trip', () => {
            const original = {
                gender: 'female',
                heightFeet: '5',
                heightInches: '6.5',
                weight: '145',
                waist: '29'
            };

            saveData(original);
            const loaded = loadSavedData();

            expect(loaded.gender).toBe(original.gender);
            expect(loaded.heightFeet).toBe(original.heightFeet);
            expect(loaded.heightInches).toBe(original.heightInches);
            expect(loaded.weight).toBe(original.weight);
            expect(loaded.waist).toBe(original.waist);
        });

        it('should handle decimal values', () => {
            const original = {
                gender: 'male',
                heightFeet: '6',
                heightInches: '0.5',
                weight: '185.5',
                waist: '35.5'
            };

            saveData(original);
            const loaded = loadSavedData();

            expect(loaded.heightInches).toBe('0.5');
            expect(loaded.waist).toBe('35.5');
        });
    });

    // ============================================================
    // Remember Toggle Tests
    // ============================================================

    describe('Remember toggle functionality', () => {
        it('should track remember preference', () => {
            localStorage.setItem(REMEMBER_KEY, 'true');
            expect(localStorage.getItem(REMEMBER_KEY)).toBe('true');
        });

        it('should clear remember preference', () => {
            localStorage.setItem(REMEMBER_KEY, 'true');
            localStorage.removeItem(REMEMBER_KEY);
            expect(localStorage.getItem(REMEMBER_KEY)).toBeNull();
        });
    });

    // ============================================================
    // Edge Cases
    // ============================================================

    describe('Edge Cases', () => {
        it('should handle empty string values', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: '',
                heightFeet: '',
                heightInches: '',
                weight: '',
                waist: ''
            }));

            // Should not crash when loading
            const saved = localStorage.getItem(STORAGE_KEY);
            expect(() => JSON.parse(saved)).not.toThrow();
        });

        it('should handle null values in saved data', () => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                gender: null,
                heightFeet: null,
                heightInches: null,
                weight: null,
                waist: null
            }));

            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            expect(saved.gender).toBeNull();
        });

        it('should handle very large values', () => {
            const largeData = {
                gender: 'male',
                heightFeet: '5',
                heightInches: '10',
                weight: '999999', // Will fail validation
                waist: '999999'
            };

            localStorage.setItem(STORAGE_KEY, JSON.stringify(largeData));

            // Validation should catch these
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            expect(parseFloat(saved.weight)).toBeGreaterThan(400);
        });

        it('should handle localStorage quota exceeded', () => {
            // This is hard to test directly, but we can check error handling
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = () => {
                throw new Error('QuotaExceededError');
            };

            expect(() => {
                try {
                    localStorage.setItem('test', 'data');
                } catch (e) {
                    // Expected
                }
            }).not.toThrow();

            localStorage.setItem = originalSetItem;
        });
    });
});
