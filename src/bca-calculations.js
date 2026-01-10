/**
 * Navy BCA Calculation Module
 * Extracted from index.html for testability
 *
 * These calculations implement the Navy Guide-4 BCA standards (Dec 2025)
 */

/**
 * Normalizes height-waist difference to a string key for table lookup
 * @param {number} heightWaistDiff - The difference between height and waist in inches
 * @returns {string} - Normalized key with one decimal place
 */
function normalizeDiffKey(heightWaistDiff) {
    return heightWaistDiff.toFixed(1);
}

/**
 * Parses BCA CSV table data into a nested Map structure
 * @param {string} csvText - Raw CSV text content
 * @returns {Map} - Nested Map: diffKey -> weightKey -> bodyFat
 */
function parseBcaTable(csvText) {
    const table = new Map();
    const lines = csvText.trim().split(/\r?\n/);

    // Skip header row, process data rows
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        const [diffRaw, weightRaw, bfRaw] = line.split(',');
        const diffKey = normalizeDiffKey(parseFloat(diffRaw));
        const weight = parseInt(weightRaw, 10);
        const bodyFat = parseInt(bfRaw, 10);

        if (isNaN(weight) || isNaN(bodyFat)) continue;

        if (!table.has(diffKey)) {
            table.set(diffKey, new Map());
        }
        table.get(diffKey).set(weight, bodyFat);
    }

    return table;
}

/**
 * Gets body fat percentage from BCA table
 * @param {Map} table - BCA lookup table
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number|null} - Body fat percentage or null if not found
 */
function getBcaTableValue(table, heightWaistDiff, weight) {
    const diffKey = normalizeDiffKey(heightWaistDiff);
    const weightKey = Math.round(weight);

    if (!table || !table.has(diffKey)) {
        return null;
    }

    const weightMap = table.get(diffKey);
    return weightMap.has(weightKey) ? weightMap.get(weightKey) : null;
}

/**
 * Calculates male body fat percentage
 * Uses table lookup with fallback formula
 * @param {Map|null} table - BCA lookup table (optional)
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number} - Body fat percentage (integer)
 */
function getMaleBF(table, heightWaistDiff, weight) {
    if (table) {
        const tableValue = getBcaTableValue(table, heightWaistDiff, weight);
        if (tableValue !== null) {
            return tableValue;
        }
    }

    // Fallback linear estimate
    const clampedWeight = Math.min(400, Math.max(100, Math.round(weight)));
    const baseBF = 39.0 - (0.76 * heightWaistDiff) + (0.04 * clampedWeight);
    return Math.max(0, Math.floor(baseBF + 1e-6));
}

/**
 * Calculates female body fat percentage
 * Uses table lookup with fallback formula
 * @param {Map|null} table - BCA lookup table (optional)
 * @param {number} heightWaistDiff - Height minus waist in inches
 * @param {number} weight - Weight in pounds
 * @returns {number} - Body fat percentage (integer)
 */
function getFemaleBF(table, heightWaistDiff, weight) {
    if (table) {
        const tableValue = getBcaTableValue(table, heightWaistDiff, weight);
        if (tableValue !== null) {
            return tableValue;
        }
    }

    // Fallback linear estimate
    const clampedWeight = Math.min(400, Math.max(61, Math.round(weight)));
    const baseBF = 39.0 - (0.62 * heightWaistDiff) + (0.08 * clampedWeight);
    return Math.max(0, Math.floor(baseBF + 1e-6));
}

/**
 * Calculates maximum allowed waist for a given height
 * Based on WHtR threshold of 0.5499
 * @param {number} height - Height in inches
 * @returns {number} - Maximum allowed waist in inches (to nearest 0.5)
 */
function getMaxWaist(height) {
    return Math.floor(height * 0.5499 * 2) / 2;
}

/**
 * Calculates Waist-to-Height Ratio
 * @param {number} waist - Waist measurement in inches
 * @param {number} height - Height in inches
 * @returns {number} - WHtR rounded down to 4 decimal places
 */
function calculateWHtR(waist, height) {
    const whtr = waist / height;
    return Math.floor(whtr * 10000) / 10000;
}

/**
 * Rounds height UP to nearest 0.5 inch (Navy standard)
 * @param {number} height - Raw height in inches
 * @returns {number} - Rounded height
 */
function roundHeightUp(height) {
    return Math.ceil(height * 2) / 2;
}

/**
 * Rounds waist DOWN to nearest 0.5 inch (Navy standard)
 * @param {number} waist - Raw waist in inches
 * @returns {number} - Rounded waist
 */
function roundWaistDown(waist) {
    return Math.floor(waist * 2) / 2;
}

/**
 * Rounds weight to nearest pound (Navy standard)
 * @param {number} weight - Raw weight in pounds
 * @returns {number} - Rounded weight
 */
function roundWeight(weight) {
    return Math.round(weight);
}

/**
 * Calculates height-waist difference
 * @param {number} height - Height in inches
 * @param {number} waist - Waist in inches
 * @returns {number} - Difference rounded to nearest 0.5
 */
function calculateHeightWaistDiff(height, waist) {
    return Math.round((height - waist) * 2) / 2;
}

/**
 * Complete BCA calculation
 * @param {Object} params - Input parameters
 * @param {string} params.gender - 'male' or 'female'
 * @param {number} params.heightFeet - Height feet component
 * @param {number} params.heightInches - Height inches component
 * @param {number} params.weight - Weight in pounds
 * @param {number} params.waist - Waist in inches
 * @param {Map} params.maleTable - Male BCA lookup table (optional)
 * @param {Map} params.femaleTable - Female BCA lookup table (optional)
 * @returns {Object} - Complete BCA results
 */
function calculateBCA({ gender, heightFeet, heightInches, weight, waist, maleTable = null, femaleTable = null }) {
    // Calculate rounded values per Navy standards
    const rawHeight = (heightFeet * 12) + heightInches;
    const roundedHeight = roundHeightUp(rawHeight);
    const roundedWeight = roundWeight(weight);
    const roundedWaist = roundWaistDown(waist);

    // Step 1: WHtR calculation
    const whtr = calculateWHtR(roundedWaist, roundedHeight);
    const step1Pass = whtr <= 0.5499;
    const maxWaist = getMaxWaist(roundedHeight);

    // Step 2: Body fat calculation
    const heightWaistDiff = calculateHeightWaistDiff(roundedHeight, roundedWaist);
    const table = gender === 'male' ? maleTable : femaleTable;
    const bodyFatPercent = gender === 'male'
        ? getMaleBF(table, heightWaistDiff, roundedWeight)
        : getFemaleBF(table, heightWaistDiff, roundedWeight);

    const maxBF = gender === 'male' ? 26 : 36;
    const step2Pass = bodyFatPercent <= maxBF;

    // Overall result
    const overallPass = step1Pass || step2Pass;

    return {
        // Input values (rounded)
        height: roundedHeight,
        weight: roundedWeight,
        waist: roundedWaist,
        gender,

        // Step 1 results
        whtr,
        step1Pass,
        maxWaist,

        // Step 2 results
        heightWaistDiff,
        bodyFatPercent,
        maxBF,
        step2Pass,

        // Overall result
        overallPass
    };
}

/**
 * Calculates goal paths for failing BCA
 * @param {Object} params - Current measurements
 * @param {number} params.height - Current height in inches
 * @param {number} params.weight - Current weight in pounds
 * @param {number} params.waist - Current waist in inches
 * @param {string} params.gender - 'male' or 'female'
 * @param {number} params.maxBF - Maximum allowed body fat
 * @param {number} params.maxWaist - Maximum allowed waist
 * @param {Map} params.table - BCA lookup table
 * @returns {Array} - Array of goal path objects
 */
function calculateGoalPaths({ height, weight, waist, gender, maxBF, maxWaist, table }) {
    const paths = [];
    const getBF = gender === 'male' ? getMaleBF : getFemaleBF;

    // Path 1: Reduce waist only
    if (waist > maxWaist) {
        const targetWaist = maxWaist;
        const waistChange = waist - targetWaist;
        const timelineWeeks = Math.ceil(waistChange / 0.5);

        paths.push({
            title: 'Reduce Waist Only',
            targetWaist,
            targetWeight: weight,
            waistChange,
            weightChange: 0,
            totalChange: waistChange,
            timeline: timelineWeeks,
            note: 'Focus on core work and nutrition. Typical waist reduction: 0.5"/week with consistent effort.'
        });
    }

    // Path 2: Reduce weight only
    let targetWeight = weight;
    let foundWeightPath = false;

    for (let testWeight = weight - 1; testWeight >= Math.max(100, weight - 100); testWeight--) {
        const heightWaistDiff = calculateHeightWaistDiff(height, waist);
        const testBF = getBF(table, heightWaistDiff, testWeight);

        if (testBF <= maxBF) {
            targetWeight = testWeight;
            foundWeightPath = true;
            break;
        }
    }

    if (foundWeightPath && targetWeight < weight) {
        const weightChange = weight - targetWeight;
        const timelineWeeks = Math.ceil(weightChange / 2);

        paths.push({
            title: 'Reduce Weight Only',
            targetWaist: waist,
            targetWeight,
            waistChange: 0,
            weightChange,
            totalChange: weightChange / 2,
            timeline: timelineWeeks,
            note: `Healthy weight loss: 1-2 lbs/week through calorie deficit and exercise.`
        });
    }

    // Path 3: Balanced approach
    const waistToTarget = waist > maxWaist ? (waist - maxWaist) / 2 : 0;
    const balancedWaist = waist - waistToTarget;

    let balancedWeight = weight;
    for (let testWeight = weight - 1; testWeight >= Math.max(100, weight - 50); testWeight--) {
        const heightWaistDiff = calculateHeightWaistDiff(height, balancedWaist);
        const testBF = getBF(table, heightWaistDiff, testWeight);
        const testWhtr = calculateWHtR(balancedWaist, height);

        if (testBF <= maxBF && testWhtr <= 0.5499) {
            balancedWeight = testWeight;
            break;
        }
    }

    if (balancedWeight < weight || waistToTarget > 0) {
        const weightChange = weight - balancedWeight;
        const waistChange = waist - balancedWaist;
        const timelineWeeks = Math.max(
            Math.ceil(weightChange / 2),
            Math.ceil(waistChange / 0.5)
        );

        paths.push({
            title: 'Balanced Approach',
            targetWaist: balancedWaist,
            targetWeight: balancedWeight,
            waistChange,
            weightChange,
            totalChange: waistChange + (weightChange / 2),
            timeline: timelineWeeks,
            note: 'Combined cardio, strength training, and nutrition. Most sustainable long-term approach.'
        });
    }

    // Sort by total change and mark easiest
    if (paths.length > 0) {
        paths.sort((a, b) => a.totalChange - b.totalChange);
        paths[0].easiest = true;
    }

    return paths;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
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
    };
}

// Also expose globally for browser
if (typeof window !== 'undefined') {
    window.BCACalculations = {
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
    };
}
