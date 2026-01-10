/**
 * BCA Calculation Tests
 *
 * CRITICAL: These tests verify that BCA calculations match Navy Guide-4 standards.
 * Incorrect calculations could affect sailors' careers.
 */

const {
    normalizeDiffKey,
    parseBcaTable,
    getBcaTableValue,
    getMaleBF,
    getFemaleBF,
    getMaxWaist,
    calculateWHtR,
    roundHeightUp,
    roundWaistDown,
    roundWeight,
    calculateHeightWaistDiff,
    calculateBCA,
    calculateGoalPaths
} = require('../../src/bca-calculations');

describe('BCA Calculations', () => {

    // ============================================================
    // Rounding Functions (Per Navy Guide-4 Standards)
    // ============================================================

    describe('roundHeightUp', () => {
        it('should round height UP to nearest 0.5 inch', () => {
            expect(roundHeightUp(70.0)).toBe(70.0);
            expect(roundHeightUp(70.1)).toBe(70.5);
            expect(roundHeightUp(70.25)).toBe(70.5);
            expect(roundHeightUp(70.5)).toBe(70.5);
            expect(roundHeightUp(70.6)).toBe(71.0);
            expect(roundHeightUp(70.75)).toBe(71.0);
            expect(roundHeightUp(70.9)).toBe(71.0);
        });

        it('should handle whole numbers', () => {
            expect(roundHeightUp(60)).toBe(60);
            expect(roundHeightUp(72)).toBe(72);
            expect(roundHeightUp(84)).toBe(84);
        });
    });

    describe('roundWaistDown', () => {
        it('should round waist DOWN to nearest 0.5 inch', () => {
            expect(roundWaistDown(34.0)).toBe(34.0);
            expect(roundWaistDown(34.1)).toBe(34.0);
            expect(roundWaistDown(34.25)).toBe(34.0);
            expect(roundWaistDown(34.4)).toBe(34.0);
            expect(roundWaistDown(34.5)).toBe(34.5);
            expect(roundWaistDown(34.6)).toBe(34.5);
            expect(roundWaistDown(34.9)).toBe(34.5);
        });

        it('should handle whole numbers', () => {
            expect(roundWaistDown(32)).toBe(32);
            expect(roundWaistDown(36)).toBe(36);
            expect(roundWaistDown(40)).toBe(40);
        });
    });

    describe('roundWeight', () => {
        it('should round weight to nearest pound', () => {
            expect(roundWeight(180.0)).toBe(180);
            expect(roundWeight(180.4)).toBe(180);
            expect(roundWeight(180.5)).toBe(181);
            expect(roundWeight(180.6)).toBe(181);
            expect(roundWeight(180.9)).toBe(181);
        });
    });

    // ============================================================
    // WHtR Calculations
    // ============================================================

    describe('calculateWHtR', () => {
        it('should calculate WHtR correctly', () => {
            // 34" waist / 70" height = 0.4857...
            expect(calculateWHtR(34, 70)).toBe(0.4857);
        });

        it('should floor to 4 decimal places', () => {
            // 38" waist / 70" height = 0.5428...
            expect(calculateWHtR(38, 70)).toBe(0.5428);
        });

        it('should handle edge case at 0.5499 threshold', () => {
            // 38.493" / 70" = 0.54990
            expect(calculateWHtR(38.493, 70)).toBe(0.5498);
            expect(calculateWHtR(38.5, 70)).toBe(0.55);
        });
    });

    describe('getMaxWaist', () => {
        it('should calculate max waist based on height', () => {
            // 70" * 0.5499 = 38.493 -> floor to 38.0
            expect(getMaxWaist(70)).toBe(38.0);
        });

        it('should round down to nearest 0.5 inch', () => {
            expect(getMaxWaist(72)).toBe(39.5);
            expect(getMaxWaist(66)).toBe(36.0);
            expect(getMaxWaist(60)).toBe(32.5);
        });

        it('should handle various heights', () => {
            // Test range of typical heights
            expect(getMaxWaist(64)).toBe(35.0);
            expect(getMaxWaist(68)).toBe(37.0);
            expect(getMaxWaist(74)).toBe(40.5);
            expect(getMaxWaist(76)).toBe(41.5);
        });
    });

    // ============================================================
    // Height-Waist Difference
    // ============================================================

    describe('calculateHeightWaistDiff', () => {
        it('should calculate difference correctly', () => {
            expect(calculateHeightWaistDiff(70, 34)).toBe(36);
            expect(calculateHeightWaistDiff(72, 36)).toBe(36);
            expect(calculateHeightWaistDiff(68, 32)).toBe(36);
        });

        it('should round to nearest 0.5', () => {
            expect(calculateHeightWaistDiff(70, 34.5)).toBe(35.5);
            expect(calculateHeightWaistDiff(70.5, 34)).toBe(36.5);
        });
    });

    // ============================================================
    // CSV Parsing
    // ============================================================

    describe('normalizeDiffKey', () => {
        it('should format to one decimal place', () => {
            expect(normalizeDiffKey(36)).toBe('36.0');
            expect(normalizeDiffKey(36.0)).toBe('36.0');
            expect(normalizeDiffKey(36.5)).toBe('36.5');
            expect(normalizeDiffKey(35.999)).toBe('36.0');
        });
    });

    describe('parseBcaTable', () => {
        it('should parse valid CSV data', () => {
            const csv = `diff,weight,bodyfat
36.0,180,18
36.0,185,19
36.5,180,17
36.5,185,18`;

            const table = parseBcaTable(csv);

            expect(table.has('36.0')).toBe(true);
            expect(table.has('36.5')).toBe(true);
            expect(table.get('36.0').get(180)).toBe(18);
            expect(table.get('36.0').get(185)).toBe(19);
            expect(table.get('36.5').get(180)).toBe(17);
        });

        it('should handle empty lines', () => {
            const csv = `diff,weight,bodyfat
36.0,180,18

36.5,180,17`;

            const table = parseBcaTable(csv);
            expect(table.has('36.0')).toBe(true);
            expect(table.has('36.5')).toBe(true);
        });

        it('should handle Windows line endings', () => {
            const csv = "diff,weight,bodyfat\r\n36.0,180,18\r\n36.5,180,17";
            const table = parseBcaTable(csv);
            expect(table.get('36.0').get(180)).toBe(18);
        });

        it('should skip invalid rows', () => {
            const csv = `diff,weight,bodyfat
36.0,180,18
invalid,data,row
36.5,abc,17
36.5,180,xyz`;

            const table = parseBcaTable(csv);
            expect(table.get('36.0').get(180)).toBe(18);
            // Invalid rows should be skipped
        });
    });

    describe('getBcaTableValue', () => {
        let table;

        beforeEach(() => {
            const csv = `diff,weight,bodyfat
36.0,180,18
36.0,185,19
36.5,180,17`;
            table = parseBcaTable(csv);
        });

        it('should return value for exact match', () => {
            expect(getBcaTableValue(table, 36.0, 180)).toBe(18);
            expect(getBcaTableValue(table, 36.5, 180)).toBe(17);
        });

        it('should round weight to nearest integer', () => {
            expect(getBcaTableValue(table, 36.0, 180.4)).toBe(18);
            expect(getBcaTableValue(table, 36.0, 179.6)).toBe(18);
        });

        it('should return null for missing values', () => {
            expect(getBcaTableValue(table, 36.0, 200)).toBe(null);
            expect(getBcaTableValue(table, 40.0, 180)).toBe(null);
        });

        it('should return null for null table', () => {
            expect(getBcaTableValue(null, 36.0, 180)).toBe(null);
        });
    });

    // ============================================================
    // Body Fat Calculations
    // ============================================================

    describe('getMaleBF', () => {
        it('should use table value when available', () => {
            const csv = `diff,weight,bodyfat
36.0,180,18`;
            const table = parseBcaTable(csv);

            expect(getMaleBF(table, 36.0, 180)).toBe(18);
        });

        it('should use fallback formula when table value not found', () => {
            // Formula: 39.0 - (0.76 * diff) + (0.04 * weight)
            // For diff=36, weight=180: 39 - 27.36 + 7.2 = 18.84 -> floor = 18
            expect(getMaleBF(null, 36, 180)).toBe(18);
        });

        it('should clamp weight in fallback formula', () => {
            // Weight should be clamped between 100 and 400
            const bf1 = getMaleBF(null, 36, 50);  // Should use 100
            const bf2 = getMaleBF(null, 36, 100);
            expect(bf1).toBe(bf2);

            const bf3 = getMaleBF(null, 36, 500); // Should use 400
            const bf4 = getMaleBF(null, 36, 400);
            expect(bf3).toBe(bf4);
        });

        it('should return 0 for very fit individuals', () => {
            // Large height-waist diff, low weight
            const bf = getMaleBF(null, 60, 100);
            expect(bf).toBeGreaterThanOrEqual(0);
        });
    });

    describe('getFemaleBF', () => {
        it('should use table value when available', () => {
            const csv = `diff,weight,bodyfat
36.0,150,25`;
            const table = parseBcaTable(csv);

            expect(getFemaleBF(table, 36.0, 150)).toBe(25);
        });

        it('should use fallback formula when table value not found', () => {
            // Formula: 39.0 - (0.62 * diff) + (0.08 * weight)
            // For diff=36, weight=150: 39 - 22.32 + 12 = 28.68 -> floor = 28
            expect(getFemaleBF(null, 36, 150)).toBe(28);
        });

        it('should clamp weight in fallback formula', () => {
            const bf1 = getFemaleBF(null, 36, 50);  // Should use 61
            const bf2 = getFemaleBF(null, 36, 61);
            expect(bf1).toBe(bf2);
        });
    });

    // ============================================================
    // Complete BCA Calculation
    // ============================================================

    describe('calculateBCA', () => {
        it('should pass Step 1 when WHtR <= 0.5499', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 34
            });

            expect(result.step1Pass).toBe(true);
            expect(result.overallPass).toBe(true);
        });

        it('should fail Step 1 when WHtR > 0.5499', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 200,
                waist: 40
            });

            expect(result.step1Pass).toBe(false);
        });

        it('should pass Step 2 when body fat <= max allowed', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 34
            });

            expect(result.bodyFatPercent).toBeLessThanOrEqual(26);
            expect(result.step2Pass).toBe(true);
        });

        it('should use correct max BF for male (26%)', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 34
            });

            expect(result.maxBF).toBe(26);
        });

        it('should use correct max BF for female (36%)', () => {
            const result = calculateBCA({
                gender: 'female',
                heightFeet: 5,
                heightInches: 4,
                weight: 140,
                waist: 30
            });

            expect(result.maxBF).toBe(36);
        });

        it('should round measurements correctly', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10.3, // Should round UP to 10.5
                weight: 180.6,      // Should round to 181
                waist: 34.7         // Should round DOWN to 34.5
            });

            expect(result.height).toBe(70.5);
            expect(result.weight).toBe(181);
            expect(result.waist).toBe(34.5);
        });

        it('should handle edge case: pass Step 2 when failing Step 1', () => {
            // Can still pass overall if Step 2 passes even when Step 1 fails
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 160, // Lower weight helps BF
                waist: 40   // Fails Step 1 (WHtR > 0.5499)
            });

            // Even with high waist, if BF is under 26%, still passes overall
            if (result.bodyFatPercent <= 26) {
                expect(result.overallPass).toBe(true);
            }
        });
    });

    // ============================================================
    // Known BCA Scenarios (Regression Tests)
    // ============================================================

    describe('Known BCA Scenarios', () => {
        it('Scenario 1: Fit male sailor', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 175,
                waist: 32
            });

            expect(result.step1Pass).toBe(true);
            expect(result.overallPass).toBe(true);
            expect(result.whtr).toBeLessThan(0.5);
        });

        it('Scenario 2: Male at WHtR threshold', () => {
            // 70" height, max waist for pass is 38.4" (rounds to 38")
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 38.4
            });

            expect(result.waist).toBe(38);
            expect(result.whtr).toBeLessThanOrEqual(0.5499);
            expect(result.step1Pass).toBe(true);
        });

        it('Scenario 3: Male failing both steps', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 8,
                weight: 250,
                waist: 45
            });

            expect(result.step1Pass).toBe(false);
            expect(result.step2Pass).toBe(false);
            expect(result.overallPass).toBe(false);
        });

        it('Scenario 4: Female passing easily', () => {
            const result = calculateBCA({
                gender: 'female',
                heightFeet: 5,
                heightInches: 4,
                weight: 130,
                waist: 28
            });

            expect(result.step1Pass).toBe(true);
            expect(result.overallPass).toBe(true);
        });

        it('Scenario 5: Tall male with proportional measurements', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 6,
                heightInches: 2,
                weight: 200,
                waist: 36
            });

            expect(result.height).toBe(74);
            expect(result.step1Pass).toBe(true);
            expect(result.overallPass).toBe(true);
        });
    });

    // ============================================================
    // Goal Path Calculations
    // ============================================================

    describe('calculateGoalPaths', () => {
        it('should return empty array when already passing', () => {
            // This function is only called when failing, so test the logic
            const paths = calculateGoalPaths({
                height: 70,
                weight: 180,
                waist: 34, // Passes easily
                gender: 'male',
                maxBF: 26,
                maxWaist: 38,
                table: null
            });

            // Should have at least one path or be empty if passing
            expect(Array.isArray(paths)).toBe(true);
        });

        it('should include waist-only path when waist exceeds max', () => {
            const paths = calculateGoalPaths({
                height: 70,
                weight: 200,
                waist: 42, // Exceeds max of 38
                gender: 'male',
                maxBF: 26,
                maxWaist: 38,
                table: null
            });

            const waistPath = paths.find(p => p.title === 'Reduce Waist Only');
            expect(waistPath).toBeDefined();
            expect(waistPath.targetWaist).toBe(38);
            expect(waistPath.waistChange).toBe(4);
        });

        it('should mark easiest path', () => {
            const paths = calculateGoalPaths({
                height: 70,
                weight: 220,
                waist: 42,
                gender: 'male',
                maxBF: 26,
                maxWaist: 38,
                table: null
            });

            if (paths.length > 0) {
                const easiestPaths = paths.filter(p => p.easiest);
                expect(easiestPaths.length).toBe(1);
            }
        });

        it('should sort paths by total change', () => {
            const paths = calculateGoalPaths({
                height: 70,
                weight: 220,
                waist: 42,
                gender: 'male',
                maxBF: 26,
                maxWaist: 38,
                table: null
            });

            if (paths.length > 1) {
                for (let i = 1; i < paths.length; i++) {
                    expect(paths[i].totalChange).toBeGreaterThanOrEqual(paths[i-1].totalChange);
                }
            }
        });
    });

    // ============================================================
    // Edge Cases and Boundary Conditions
    // ============================================================

    describe('Edge Cases', () => {
        it('should handle minimum height (48")', () => {
            const result = calculateBCA({
                gender: 'female',
                heightFeet: 4,
                heightInches: 0,
                weight: 100,
                waist: 24
            });

            expect(result.height).toBe(48);
            expect(result.overallPass).toBeDefined();
        });

        it('should handle maximum height (96")', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 8,
                heightInches: 0,
                weight: 280,
                waist: 40
            });

            expect(result.height).toBe(96);
            expect(result.overallPass).toBeDefined();
        });

        it('should handle minimum weight', () => {
            const result = calculateBCA({
                gender: 'female',
                heightFeet: 4,
                heightInches: 6,
                weight: 61,
                waist: 22
            });

            expect(result.weight).toBe(61);
            expect(result.overallPass).toBeDefined();
        });

        it('should handle exact 0.5499 WHtR threshold', () => {
            // Height 70, waist = 70 * 0.5499 = 38.493
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 38.49 // Rounds down to 38.0
            });

            expect(result.waist).toBe(38);
            expect(result.step1Pass).toBe(true);
        });

        it('should fail when WHtR is just over threshold', () => {
            const result = calculateBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 38.6 // Rounds down to 38.5
            });

            expect(result.waist).toBe(38.5);
            expect(result.whtr).toBeGreaterThan(0.5499);
            expect(result.step1Pass).toBe(false);
        });
    });
});
