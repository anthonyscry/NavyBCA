import { describe, it, expect } from 'vitest';
import {
    normalizeDiffKey,
    getMaxWaist,
    calculateWHtR,
    passesWHtR,
    getMaleBF,
    getFemaleBF,
    getBodyFatPercentage,
    getMaxBodyFat,
    passesBodyFat,
    performBCA
} from './bca-calculations.js';

describe('BCA Calculation Functions', () => {
    describe('normalizeDiffKey', () => {
        it('should format to one decimal place', () => {
            expect(normalizeDiffKey(36)).toBe('36.0');
            expect(normalizeDiffKey(36.5)).toBe('36.5');
            expect(normalizeDiffKey(36.123)).toBe('36.1');
        });

        it('should handle negative values', () => {
            expect(normalizeDiffKey(-5.2)).toBe('-5.2');
        });
    });

    describe('getMaxWaist', () => {
        it('should calculate max waist for standard heights', () => {
            expect(getMaxWaist(70)).toBe(38); // 70 * 0.5499 = 38.493 * 2 = 76.986, floor = 76, /2 = 38
            expect(getMaxWaist(68)).toBe(37.0); // 68 * 0.5499 = 37.3932, floor to 37.0
            expect(getMaxWaist(72)).toBe(39.5); // 72 * 0.5499 = 39.5928, floor to 39.5
        });

        it('should round down to nearest 0.5 inch', () => {
            expect(getMaxWaist(65)).toBe(35.5); // 65 * 0.5499 = 35.7435
            expect(getMaxWaist(75)).toBe(41.0); // 75 * 0.5499 = 41.2425
        });
    });

    describe('calculateWHtR', () => {
        it('should calculate WHtR correctly', () => {
            expect(calculateWHtR(34, 70)).toBe(0.4857);
            expect(calculateWHtR(38, 70)).toBe(0.5428);
            expect(calculateWHtR(40, 70)).toBe(0.5714);
        });

        it('should round to 4 decimal places', () => {
            expect(calculateWHtR(35.5, 71)).toBe(0.5);
            expect(calculateWHtR(33, 65)).toBe(0.5076);
        });
    });

    describe('passesWHtR', () => {
        it('should pass when WHtR <= 0.5499', () => {
            expect(passesWHtR(0.5499)).toBe(true);
            expect(passesWHtR(0.5000)).toBe(true);
            expect(passesWHtR(0.4500)).toBe(true);
        });

        it('should fail when WHtR > 0.5499', () => {
            expect(passesWHtR(0.5500)).toBe(false);
            expect(passesWHtR(0.6000)).toBe(false);
            expect(passesWHtR(0.7000)).toBe(false);
        });

        it('should handle edge case exactly at threshold', () => {
            expect(passesWHtR(0.5499)).toBe(true);
            expect(passesWHtR(0.5500)).toBe(false);
        });
    });

    describe('getMaleBF', () => {
        it('should calculate body fat for typical male values', () => {
            // Formula: 39.0 - (0.76 * diff) + (0.04 * weight)
            const diff = 36; // 70" height - 34" waist
            const weight = 180;

            // Expected: 39 - (0.76 * 36) + (0.04 * 180)
            //         = 39 - 27.36 + 7.2 = 18.84 => floor = 18
            expect(getMaleBF(diff, weight)).toBe(18);
        });

        it('should clamp weight to minimum 100 lbs', () => {
            const diff = 36;
            const lowWeight = 50; // Below minimum
            // Should use 100 instead
            // 39 - (0.76 * 36) + (0.04 * 100) = 39 - 27.36 + 4 = 15.64 => 15
            expect(getMaleBF(diff, lowWeight)).toBe(15);
        });

        it('should clamp weight to maximum 400 lbs', () => {
            const diff = 36;
            const highWeight = 500; // Above maximum
            // Should use 400 instead
            // 39 - (0.76 * 36) + (0.04 * 400) = 39 - 27.36 + 16 = 27.64 => 27
            expect(getMaleBF(diff, highWeight)).toBe(27);
        });

        it('should return 0 for negative results', () => {
            const diff = 50; // Very large diff
            const weight = 100;
            // 39 - (0.76 * 50) + (0.04 * 100) = 39 - 38 + 4 = 5
            // But with even larger diff, could go negative
            const largeDiff = 60;
            // 39 - (0.76 * 60) + (0.04 * 100) = 39 - 45.6 + 4 = -2.6 => 0
            expect(getMaleBF(largeDiff, weight)).toBe(0);
        });

        it('should handle different height-waist differences', () => {
            const weight = 180;
            expect(getMaleBF(30, weight)).toBe(23); // 39 - 22.8 + 7.2 = 23.4 => 23
            expect(getMaleBF(40, weight)).toBe(15); // 39 - 30.4 + 7.2 = 15.8 => 15
        });
    });

    describe('getFemaleBF', () => {
        it('should calculate body fat for typical female values', () => {
            // Formula: 39.0 - (0.62 * diff) + (0.08 * weight)
            const diff = 30; // 65" height - 35" waist
            const weight = 140;

            // Expected: 39 - (0.62 * 30) + (0.08 * 140)
            //         = 39 - 18.6 + 11.2 = 31.6 => 31
            expect(getFemaleBF(diff, weight)).toBe(31);
        });

        it('should clamp weight to minimum 61 lbs', () => {
            const diff = 30;
            const lowWeight = 50; // Below minimum
            // Should use 61 instead
            // 39 - (0.62 * 30) + (0.08 * 61) = 39 - 18.6 + 4.88 = 25.28 => 25
            expect(getFemaleBF(diff, lowWeight)).toBe(25);
        });

        it('should clamp weight to maximum 400 lbs', () => {
            const diff = 30;
            const highWeight = 500; // Above maximum
            // Should use 400 instead
            // 39 - (0.62 * 30) + (0.08 * 400) = 39 - 18.6 + 32 = 52.4 => 52
            expect(getFemaleBF(diff, highWeight)).toBe(52);
        });

        it('should return 0 for negative results', () => {
            const largeDiff = 70;
            const weight = 61;
            // 39 - (0.62 * 70) + (0.08 * 61) = 39 - 43.4 + 4.88 = 0.48 => 0
            expect(getFemaleBF(largeDiff, weight)).toBe(0);
        });
    });

    describe('getBodyFatPercentage', () => {
        it('should route to getMaleBF for males', () => {
            const result = getBodyFatPercentage('male', 36, 180);
            expect(result).toBe(getMaleBF(36, 180));
        });

        it('should route to getFemaleBF for females', () => {
            const result = getBodyFatPercentage('female', 30, 140);
            expect(result).toBe(getFemaleBF(30, 140));
        });
    });

    describe('getMaxBodyFat', () => {
        it('should return 26% for males', () => {
            expect(getMaxBodyFat('male')).toBe(26);
        });

        it('should return 36% for females', () => {
            expect(getMaxBodyFat('female')).toBe(36);
        });
    });

    describe('passesBodyFat', () => {
        it('should pass when male BF <= 26%', () => {
            expect(passesBodyFat(26, 'male')).toBe(true);
            expect(passesBodyFat(20, 'male')).toBe(true);
            expect(passesBodyFat(15, 'male')).toBe(true);
        });

        it('should fail when male BF > 26%', () => {
            expect(passesBodyFat(27, 'male')).toBe(false);
            expect(passesBodyFat(30, 'male')).toBe(false);
        });

        it('should pass when female BF <= 36%', () => {
            expect(passesBodyFat(36, 'female')).toBe(true);
            expect(passesBodyFat(30, 'female')).toBe(true);
            expect(passesBodyFat(25, 'female')).toBe(true);
        });

        it('should fail when female BF > 36%', () => {
            expect(passesBodyFat(37, 'female')).toBe(false);
            expect(passesBodyFat(40, 'female')).toBe(false);
        });
    });

    describe('performBCA - Full Integration Tests', () => {
        it('should perform complete BCA for passing male (Step 1)', () => {
            const result = performBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 180,
                waist: 34
            });

            expect(result.roundedHeight).toBe(70);
            expect(result.roundedWeight).toBe(180);
            expect(result.roundedWaist).toBe(34);
            expect(result.heightWaistDiff).toBe(36);
            expect(result.whtr).toBe(0.4857);
            expect(result.step1Pass).toBe(true);
            expect(result.maxWaist).toBe(38);
            expect(result.bodyFatPercent).toBe(18);
            expect(result.maxBF).toBe(26);
            expect(result.step2Pass).toBe(true);
            expect(result.overallPass).toBe(true);
        });

        it('should perform complete BCA for failing male (both steps)', () => {
            const result = performBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 250,
                waist: 45
            });

            expect(result.roundedHeight).toBe(70);
            expect(result.roundedWeight).toBe(250);
            expect(result.roundedWaist).toBe(45);
            expect(result.heightWaistDiff).toBe(25);
            expect(result.whtr).toBe(0.6428);
            expect(result.step1Pass).toBe(false);
            expect(result.bodyFatPercent).toBe(30); // 39 - (0.76 * 25) + (0.04 * 250) = 39 - 19 + 10 = 30
            expect(result.step2Pass).toBe(false);
            expect(result.overallPass).toBe(false);
        });

        it('should perform complete BCA for passing female (Step 1)', () => {
            const result = performBCA({
                gender: 'female',
                heightFeet: 5,
                heightInches: 4,
                weight: 130,
                waist: 32
            });

            expect(result.roundedHeight).toBe(64);
            expect(result.roundedWeight).toBe(130);
            expect(result.roundedWaist).toBe(32);
            expect(result.whtr).toBe(0.5);
            expect(result.step1Pass).toBe(true);
            expect(result.maxBF).toBe(36);
            expect(result.overallPass).toBe(true);
        });

        it('should handle rounding correctly (height up, waist down)', () => {
            const result = performBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 9.4, // Should round up to 69.5
                weight: 180.6, // Should round to 181
                waist: 34.9 // Should round down to 34.5
            });

            expect(result.roundedHeight).toBe(69.5);
            expect(result.roundedWeight).toBe(181);
            expect(result.roundedWaist).toBe(34.5);
            expect(result.heightWaistDiff).toBe(35);
        });

        it('should pass overall if either step passes', () => {
            // Scenario: Fails Step 1 but passes Step 2
            const result = performBCA({
                gender: 'male',
                heightFeet: 5,
                heightInches: 10,
                weight: 190,
                waist: 39 // Fails Step 1 (39/70 = 0.5571 > 0.5499)
            });

            expect(result.step1Pass).toBe(false);
            expect(result.step2Pass).toBe(true);
            expect(result.overallPass).toBe(true); // Still passes overall
        });

        it('should handle edge case at WHtR threshold', () => {
            // Waist exactly at 0.5499 threshold
            const result = performBCA({
                gender: 'male',
                heightFeet: 6,
                heightInches: 0,
                weight: 200,
                waist: 39.5 // 39.5 / 72 = 0.5486 (passes)
            });

            expect(result.whtr).toBe(0.5486);
            expect(result.step1Pass).toBe(true);
        });
    });
});
