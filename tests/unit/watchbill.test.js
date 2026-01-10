/**
 * Watchbill Logic Tests
 *
 * Tests for the watchbill/schedule management logic from watchbill.html
 */

describe('Watchbill Logic', () => {

    // ============================================================
    // Federal Holiday Detection
    // ============================================================

    describe('Federal Holiday Detection', () => {
        /**
         * Checks if a date is a federal holiday
         * Based on U.S. federal holiday schedule
         */
        function isFederalHoliday(date) {
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            const dayOfWeek = date.getDay();

            // Fixed holidays
            const fixedHolidays = [
                { month: 0, day: 1 },   // New Year's Day
                { month: 6, day: 4 },   // Independence Day
                { month: 10, day: 11 }, // Veterans Day
                { month: 11, day: 25 }  // Christmas
            ];

            for (const holiday of fixedHolidays) {
                if (month === holiday.month && day === holiday.day) {
                    return true;
                }
            }

            // MLK Day: 3rd Monday in January
            if (month === 0 && dayOfWeek === 1) {
                const firstMonday = new Date(year, 0, 1);
                while (firstMonday.getDay() !== 1) {
                    firstMonday.setDate(firstMonday.getDate() + 1);
                }
                const thirdMonday = new Date(firstMonday);
                thirdMonday.setDate(thirdMonday.getDate() + 14);
                if (date.getDate() === thirdMonday.getDate()) {
                    return true;
                }
            }

            // Presidents Day: 3rd Monday in February
            if (month === 1 && dayOfWeek === 1) {
                const firstMonday = new Date(year, 1, 1);
                while (firstMonday.getDay() !== 1) {
                    firstMonday.setDate(firstMonday.getDate() + 1);
                }
                const thirdMonday = new Date(firstMonday);
                thirdMonday.setDate(thirdMonday.getDate() + 14);
                if (date.getDate() === thirdMonday.getDate()) {
                    return true;
                }
            }

            // Memorial Day: Last Monday in May
            if (month === 4 && dayOfWeek === 1) {
                const lastDay = new Date(year, 5, 0);
                while (lastDay.getDay() !== 1) {
                    lastDay.setDate(lastDay.getDate() - 1);
                }
                if (date.getDate() === lastDay.getDate()) {
                    return true;
                }
            }

            // Labor Day: 1st Monday in September
            if (month === 8 && dayOfWeek === 1) {
                const firstMonday = new Date(year, 8, 1);
                while (firstMonday.getDay() !== 1) {
                    firstMonday.setDate(firstMonday.getDate() + 1);
                }
                if (date.getDate() === firstMonday.getDate()) {
                    return true;
                }
            }

            // Columbus Day: 2nd Monday in October
            if (month === 9 && dayOfWeek === 1) {
                const firstMonday = new Date(year, 9, 1);
                while (firstMonday.getDay() !== 1) {
                    firstMonday.setDate(firstMonday.getDate() + 1);
                }
                const secondMonday = new Date(firstMonday);
                secondMonday.setDate(secondMonday.getDate() + 7);
                if (date.getDate() === secondMonday.getDate()) {
                    return true;
                }
            }

            // Thanksgiving: 4th Thursday in November
            if (month === 10 && dayOfWeek === 4) {
                const firstThursday = new Date(year, 10, 1);
                while (firstThursday.getDay() !== 4) {
                    firstThursday.setDate(firstThursday.getDate() + 1);
                }
                const fourthThursday = new Date(firstThursday);
                fourthThursday.setDate(fourthThursday.getDate() + 21);
                if (date.getDate() === fourthThursday.getDate()) {
                    return true;
                }
            }

            return false;
        }

        it('should identify New Years Day', () => {
            expect(isFederalHoliday(new Date('2024-01-01'))).toBe(true);
            expect(isFederalHoliday(new Date('2025-01-01'))).toBe(true);
        });

        it('should identify Independence Day', () => {
            expect(isFederalHoliday(new Date('2024-07-04'))).toBe(true);
        });

        it('should identify Veterans Day', () => {
            expect(isFederalHoliday(new Date('2024-11-11'))).toBe(true);
        });

        it('should identify Christmas', () => {
            expect(isFederalHoliday(new Date('2024-12-25'))).toBe(true);
        });

        it('should identify MLK Day (3rd Monday in January)', () => {
            // 2024: Jan 15 is the 3rd Monday
            expect(isFederalHoliday(new Date('2024-01-15'))).toBe(true);
        });

        it('should identify Memorial Day (last Monday in May)', () => {
            // 2024: May 27 is the last Monday
            expect(isFederalHoliday(new Date('2024-05-27'))).toBe(true);
        });

        it('should identify Labor Day (1st Monday in September)', () => {
            // 2024: Sep 2 is the 1st Monday
            expect(isFederalHoliday(new Date('2024-09-02'))).toBe(true);
        });

        it('should identify Thanksgiving (4th Thursday in November)', () => {
            // 2024: Nov 28 is the 4th Thursday
            expect(isFederalHoliday(new Date('2024-11-28'))).toBe(true);
        });

        it('should return false for regular days', () => {
            expect(isFederalHoliday(new Date('2024-03-15'))).toBe(false);
            expect(isFederalHoliday(new Date('2024-06-15'))).toBe(false);
        });
    });

    // ============================================================
    // CFL Rotation Logic
    // ============================================================

    describe('CFL Rotation Logic', () => {
        /**
         * Generates CFL rotation for PT days
         */
        function generateCflRotation(cfls, ptDays) {
            if (!cfls.length || !ptDays.length) return [];

            const rotation = [];
            let cflIndex = 0;

            for (const day of ptDays) {
                rotation.push({
                    date: day,
                    cfl: cfls[cflIndex]
                });
                cflIndex = (cflIndex + 1) % cfls.length;
            }

            return rotation;
        }

        it('should assign CFLs in round-robin order', () => {
            const cfls = ['CFL1', 'CFL2', 'CFL3'];
            const ptDays = [1, 2, 3, 4, 5, 6];

            const rotation = generateCflRotation(cfls, ptDays);

            expect(rotation[0].cfl).toBe('CFL1');
            expect(rotation[1].cfl).toBe('CFL2');
            expect(rotation[2].cfl).toBe('CFL3');
            expect(rotation[3].cfl).toBe('CFL1');
            expect(rotation[4].cfl).toBe('CFL2');
            expect(rotation[5].cfl).toBe('CFL3');
        });

        it('should handle single CFL', () => {
            const cfls = ['OnlyCFL'];
            const ptDays = [1, 2, 3];

            const rotation = generateCflRotation(cfls, ptDays);

            rotation.forEach(r => {
                expect(r.cfl).toBe('OnlyCFL');
            });
        });

        it('should handle empty CFL list', () => {
            const rotation = generateCflRotation([], [1, 2, 3]);
            expect(rotation).toEqual([]);
        });

        it('should handle empty PT days', () => {
            const rotation = generateCflRotation(['CFL1'], []);
            expect(rotation).toEqual([]);
        });

        it('should ensure fair distribution', () => {
            const cfls = ['A', 'B', 'C'];
            const ptDays = Array.from({ length: 12 }, (_, i) => i + 1);

            const rotation = generateCflRotation(cfls, ptDays);

            const counts = { A: 0, B: 0, C: 0 };
            rotation.forEach(r => counts[r.cfl]++);

            expect(counts.A).toBe(4);
            expect(counts.B).toBe(4);
            expect(counts.C).toBe(4);
        });
    });

    // ============================================================
    // PT Day Filtering
    // ============================================================

    describe('PT Day Filtering', () => {
        /**
         * Filters out weekends and holidays from a month
         */
        function getPtDays(year, month, blockedDays = []) {
            const days = [];
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                const dayOfWeek = date.getDay();

                // Skip weekends
                if (dayOfWeek === 0 || dayOfWeek === 6) continue;

                // Skip blocked days
                if (blockedDays.includes(day)) continue;

                days.push(day);
            }

            return days;
        }

        it('should exclude weekends', () => {
            // January 2024: 1st is Monday
            const ptDays = getPtDays(2024, 0);

            // Check no weekends included
            ptDays.forEach(day => {
                const date = new Date(2024, 0, day);
                const dayOfWeek = date.getDay();
                expect(dayOfWeek).not.toBe(0); // Not Sunday
                expect(dayOfWeek).not.toBe(6); // Not Saturday
            });
        });

        it('should exclude blocked days', () => {
            const blockedDays = [15, 16, 17];
            const ptDays = getPtDays(2024, 0, blockedDays);

            blockedDays.forEach(blocked => {
                expect(ptDays).not.toContain(blocked);
            });
        });

        it('should return correct count for a typical month', () => {
            // January 2024 has 31 days, 23 weekdays
            const ptDays = getPtDays(2024, 0);
            expect(ptDays.length).toBe(23);
        });

        it('should handle February in leap year', () => {
            // February 2024 is a leap year (29 days)
            const ptDays = getPtDays(2024, 1);
            expect(ptDays.length).toBeGreaterThanOrEqual(20);
        });
    });

    // ============================================================
    // Location Management
    // ============================================================

    describe('Location Management', () => {
        /**
         * Validates a PT location
         */
        function validateLocation(location) {
            const errors = [];

            if (!location.name || location.name.trim().length === 0) {
                errors.push('Name is required');
            }

            if (location.name && location.name.length > 50) {
                errors.push('Name must be 50 characters or less');
            }

            if (location.name && /<script/i.test(location.name)) {
                errors.push('Invalid characters in name');
            }

            return {
                isValid: errors.length === 0,
                errors
            };
        }

        it('should validate required name', () => {
            const result = validateLocation({ name: '' });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Name is required');
        });

        it('should validate name length', () => {
            const result = validateLocation({ name: 'A'.repeat(51) });
            expect(result.isValid).toBe(false);
            expect(result.errors).toContain('Name must be 50 characters or less');
        });

        it('should reject script tags', () => {
            const result = validateLocation({ name: '<script>alert(1)</script>' });
            expect(result.isValid).toBe(false);
        });

        it('should accept valid locations', () => {
            const result = validateLocation({ name: 'Gym Building A' });
            expect(result.isValid).toBe(true);
            expect(result.errors.length).toBe(0);
        });
    });

    // ============================================================
    // Watchbill Data Persistence
    // ============================================================

    describe('Watchbill Data Persistence', () => {
        const WATCHBILL_KEY = 'navyWatchbillData';

        beforeEach(() => {
            localStorage.clear();
        });

        /**
         * Saves watchbill data
         */
        function saveWatchbillData(data) {
            localStorage.setItem(WATCHBILL_KEY, JSON.stringify({
                ...data,
                timestamp: new Date().toISOString()
            }));
        }

        /**
         * Loads watchbill data
         */
        function loadWatchbillData() {
            const saved = localStorage.getItem(WATCHBILL_KEY);
            if (!saved) return null;

            try {
                return JSON.parse(saved);
            } catch {
                localStorage.removeItem(WATCHBILL_KEY);
                return null;
            }
        }

        it('should save and load watchbill data', () => {
            const data = {
                month: 0,
                year: 2024,
                cfls: ['CFL1', 'CFL2'],
                blockedDays: [1, 15],
                locations: ['Gym A']
            };

            saveWatchbillData(data);
            const loaded = loadWatchbillData();

            expect(loaded.month).toBe(0);
            expect(loaded.year).toBe(2024);
            expect(loaded.cfls).toEqual(['CFL1', 'CFL2']);
        });

        it('should include timestamp', () => {
            saveWatchbillData({ test: true });
            const loaded = loadWatchbillData();
            expect(loaded.timestamp).toBeDefined();
        });

        it('should handle corrupted data', () => {
            localStorage.setItem(WATCHBILL_KEY, 'not-json');
            const loaded = loadWatchbillData();
            expect(loaded).toBeNull();
        });

        it('should return null when no data exists', () => {
            const loaded = loadWatchbillData();
            expect(loaded).toBeNull();
        });
    });

    // ============================================================
    // Month Navigation
    // ============================================================

    describe('Month Navigation', () => {
        /**
         * Gets previous month and year
         */
        function getPreviousMonth(month, year) {
            if (month === 0) {
                return { month: 11, year: year - 1 };
            }
            return { month: month - 1, year };
        }

        /**
         * Gets next month and year
         */
        function getNextMonth(month, year) {
            if (month === 11) {
                return { month: 0, year: year + 1 };
            }
            return { month: month + 1, year };
        }

        it('should navigate to previous month', () => {
            expect(getPreviousMonth(5, 2024)).toEqual({ month: 4, year: 2024 });
        });

        it('should handle year rollback', () => {
            expect(getPreviousMonth(0, 2024)).toEqual({ month: 11, year: 2023 });
        });

        it('should navigate to next month', () => {
            expect(getNextMonth(5, 2024)).toEqual({ month: 6, year: 2024 });
        });

        it('should handle year rollover', () => {
            expect(getNextMonth(11, 2024)).toEqual({ month: 0, year: 2025 });
        });
    });

    // ============================================================
    // Edge Cases
    // ============================================================

    describe('Edge Cases', () => {
        it('should handle months with 28 days', () => {
            // February 2023 (non-leap year)
            const daysInFeb = new Date(2023, 2, 0).getDate();
            expect(daysInFeb).toBe(28);
        });

        it('should handle months with 31 days', () => {
            const daysInJan = new Date(2024, 1, 0).getDate();
            expect(daysInJan).toBe(31);
        });

        it('should handle leap year February', () => {
            // February 2024 (leap year)
            const daysInFeb = new Date(2024, 2, 0).getDate();
            expect(daysInFeb).toBe(29);
        });
    });
});
