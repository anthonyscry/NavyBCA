/**
 * Navy BCA Calculation Functions
 * Core calculation logic for Body Composition Assessment
 */

/**
 * Normalize height-waist difference for table lookup
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @returns {string} Normalized key (e.g., "36.0")
 */
function normalizeDiffKey(heightWaistDiff) {
    return heightWaistDiff.toFixed(1);
}

/**
 * Calculate maximum allowed waist measurement based on height
 * @param {number} height - Height in inches
 * @returns {number} Maximum waist in inches (rounded down to nearest 0.5")
 */
function getMaxWaist(height) {
    return Math.floor(height * 0.5499 * 2) / 2;
}

/**
 * Calculate Waist-to-Height Ratio (WHtR)
 * @param {number} waist - Waist measurement in inches
 * @param {number} height - Height in inches
 * @returns {number} WHtR value (rounded to 4 decimal places)
 */
function calculateWHtR(waist, height) {
    const whtr = waist / height;
    return Math.floor(whtr * 10000) / 10000;
}

/**
 * Check if WHtR passes Step 1 (WHtR <= 0.5499)
 * @param {number} whtr - Waist-to-Height Ratio
 * @returns {boolean} True if passes, false if fails
 */
function passesWHtR(whtr) {
    return whtr <= 0.5499;
}

/**
 * Calculate male body fat percentage (fallback formula)
 * Used when table lookup fails or for out-of-range values
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number} Body fat percentage (integer)
 */
function getMaleBF(heightWaistDiff, weight) {
    // Clamp weight to reasonable range
    weight = Math.min(400, Math.max(100, Math.round(weight)));

    // Linear estimation formula
    const baseBF = 39.0 - (0.76 * heightWaistDiff) + (0.04 * weight);

    return Math.max(0, Math.floor(baseBF + 1e-6));
}

/**
 * Calculate female body fat percentage (fallback formula)
 * Used when table lookup fails or for out-of-range values
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number} Body fat percentage (integer)
 */
function getFemaleBF(heightWaistDiff, weight) {
    // Clamp weight to reasonable range
    weight = Math.min(400, Math.max(61, Math.round(weight)));

    // Linear estimation formula
    const baseBF = 39.0 - (0.62 * heightWaistDiff) + (0.08 * weight);

    return Math.max(0, Math.floor(baseBF + 1e-6));
}

/**
 * Get body fat percentage for given gender, height-waist diff, and weight
 * @param {string} gender - 'male' or 'female'
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number} Body fat percentage (integer)
 */
function getBodyFatPercentage(gender, heightWaistDiff, weight) {
    if (gender === 'male') {
        return getMaleBF(heightWaistDiff, weight);
    } else {
        return getFemaleBF(heightWaistDiff, weight);
    }
}

/**
 * Get maximum allowed body fat percentage by gender
 * @param {string} gender - 'male' or 'female'
 * @returns {number} Maximum BF% (26 for males, 36 for females)
 */
function getMaxBodyFat(gender) {
    return gender === 'male' ? 26 : 36;
}

/**
 * Check if body fat percentage passes standards
 * @param {number} bodyFat - Body fat percentage
 * @param {string} gender - 'male' or 'female'
 * @returns {boolean} True if passes, false if fails
 */
function passesBodyFat(bodyFat, gender) {
    return bodyFat <= getMaxBodyFat(gender);
}

/**
 * Perform complete BCA assessment
 * @param {Object} params - Assessment parameters
 * @param {string} params.gender - 'male' or 'female'
 * @param {number} params.heightFeet - Height in feet
 * @param {number} params.heightInches - Additional inches
 * @param {number} params.weight - Weight in pounds
 * @param {number} params.waist - Waist measurement in inches
 * @returns {Object} BCA results
 */
function performBCA(params) {
    const { gender, heightFeet, heightInches, weight, waist } = params;

    // Calculate rounded values according to Navy standards
    const rawHeight = (heightFeet * 12) + heightInches;
    const roundedHeight = Math.ceil(rawHeight * 2) / 2;  // Round UP to nearest 0.5"
    const roundedWeight = Math.round(weight);            // Round to nearest pound
    const roundedWaist = Math.floor(waist * 2) / 2;      // Round DOWN to nearest 0.5"

    // Step 1: WHtR
    const whtr = calculateWHtR(roundedWaist, roundedHeight);
    const step1Pass = passesWHtR(whtr);
    const maxWaist = getMaxWaist(roundedHeight);

    // Step 2: Body Fat
    const heightWaistDiff = Math.round((roundedHeight - roundedWaist) * 2) / 2;
    const bodyFatPercent = getBodyFatPercentage(gender, heightWaistDiff, roundedWeight);
    const maxBF = getMaxBodyFat(gender);
    const step2Pass = passesBodyFat(bodyFatPercent, gender);

    // Overall pass: pass either Step 1 OR Step 2
    const overallPass = step1Pass || step2Pass;

    return {
        roundedHeight,
        roundedWeight,
        roundedWaist,
        heightWaistDiff,
        whtr,
        step1Pass,
        maxWaist,
        bodyFatPercent,
        maxBF,
        step2Pass,
        overallPass
    };
}

// Export functions for testing (Node.js) or browser use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
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
    };
}
