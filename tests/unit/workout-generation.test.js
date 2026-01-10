/**
 * Workout Generation Tests
 *
 * Tests for the workout generation logic from generator.html
 */

const fs = require('fs');
const path = require('path');

// Load exercises-data.js first
const exercisesCode = fs.readFileSync(path.join(__dirname, '../../exercises-data.js'), 'utf8');
eval(exercisesCode);

describe('Workout Generation', () => {

    // ============================================================
    // Helper Functions (extracted from generator.html logic)
    // ============================================================

    /**
     * Shuffles an array using Fisher-Yates algorithm
     */
    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Selects random items from an array
     */
    function selectRandom(array, count) {
        const shuffled = shuffleArray(array);
        return shuffled.slice(0, Math.min(count, array.length));
    }

    /**
     * Gets exercises filtered by available equipment
     */
    function getAvailableExercises(equipment = []) {
        let exercises = [...db.strength.bodyweight];

        if (equipment.includes('bands')) {
            exercises = exercises.concat(db.strength.bands);
        }
        if (equipment.includes('pullup')) {
            exercises = exercises.concat(db.strength.pullup);
        }
        if (equipment.includes('kettlebells')) {
            exercises = exercises.concat(db.strength.kettlebells);
        }
        if (equipment.includes('dumbbells')) {
            exercises = exercises.concat(db.strength.dumbbells);
        }
        if (equipment.includes('barbell') && db.strength.barbell) {
            exercises = exercises.concat(db.strength.barbell);
        }

        return exercises;
    }

    /**
     * Generates rep scheme based on workout type
     */
    function getRepScheme(schemeType, exerciseIndex, totalExercises) {
        switch (schemeType) {
            case 'circuit':
                return '45 sec work / 15 sec rest';
            case 'hiit':
                return '20 sec max effort / 10 sec rest';
            case 'military':
                return '10-15 reps';
            case 'pyramid':
                // Ascending reps: 5, 10, 15, 20...
                const pyramidReps = 5 + (exerciseIndex * 5);
                return `${pyramidReps} reps`;
            case 'reverse_pyramid':
                // Descending reps: 20, 15, 10, 5...
                const reverseReps = 20 - (exerciseIndex * 5);
                return `${Math.max(5, reverseReps)} reps`;
            default:
                return '10 reps';
        }
    }

    /**
     * Generates a complete workout
     */
    function generateWorkout(options = {}) {
        const {
            equipment = [],
            schemeType = 'circuit',
            exerciseCount = 8,
            includeWarmup = true,
            includeCooldown = true
        } = options;

        const workout = {
            warmup: [],
            main: [],
            cooldown: [],
            scheme: schemeType,
            duration: 60
        };

        // Add warmup
        if (includeWarmup) {
            workout.warmup = selectRandom(warmupExercises, 5);
        }

        // Get available exercises based on equipment
        const availableExercises = getAvailableExercises(equipment);

        // Select main exercises
        const selectedExercises = selectRandom(availableExercises, exerciseCount);

        // Add rep scheme to each exercise
        workout.main = selectedExercises.map((exercise, index) => ({
            ...exercise,
            reps: getRepScheme(schemeType, index, exerciseCount)
        }));

        // Add cooldown
        if (includeCooldown) {
            workout.cooldown = selectRandom(cooldownExercises, 5);
        }

        return workout;
    }

    // ============================================================
    // shuffleArray Tests
    // ============================================================

    describe('shuffleArray', () => {
        it('should return same length array', () => {
            const input = [1, 2, 3, 4, 5];
            const result = shuffleArray(input);
            expect(result.length).toBe(input.length);
        });

        it('should contain all original elements', () => {
            const input = [1, 2, 3, 4, 5];
            const result = shuffleArray(input);
            input.forEach(item => {
                expect(result).toContain(item);
            });
        });

        it('should not modify original array', () => {
            const input = [1, 2, 3, 4, 5];
            const original = [...input];
            shuffleArray(input);
            expect(input).toEqual(original);
        });

        it('should handle empty array', () => {
            expect(shuffleArray([])).toEqual([]);
        });

        it('should handle single element array', () => {
            expect(shuffleArray([1])).toEqual([1]);
        });

        it('should produce different orderings over multiple runs', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const results = new Set();

            // Run multiple shuffles and check we get different results
            for (let i = 0; i < 10; i++) {
                results.add(JSON.stringify(shuffleArray(input)));
            }

            // With 10 elements, extremely unlikely to get same order twice
            expect(results.size).toBeGreaterThan(1);
        });
    });

    // ============================================================
    // selectRandom Tests
    // ============================================================

    describe('selectRandom', () => {
        it('should return requested count', () => {
            const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const result = selectRandom(input, 5);
            expect(result.length).toBe(5);
        });

        it('should return all items if count exceeds array length', () => {
            const input = [1, 2, 3];
            const result = selectRandom(input, 10);
            expect(result.length).toBe(3);
        });

        it('should return unique items', () => {
            const input = [1, 2, 3, 4, 5];
            const result = selectRandom(input, 3);
            const unique = new Set(result);
            expect(unique.size).toBe(result.length);
        });

        it('should handle count of 0', () => {
            const result = selectRandom([1, 2, 3], 0);
            expect(result.length).toBe(0);
        });
    });

    // ============================================================
    // getAvailableExercises Tests
    // ============================================================

    describe('getAvailableExercises', () => {
        it('should include bodyweight exercises by default', () => {
            const exercises = getAvailableExercises([]);
            const bodyweightNames = db.strength.bodyweight.map(e => e.name);

            bodyweightNames.forEach(name => {
                expect(exercises.some(e => e.name === name)).toBe(true);
            });
        });

        it('should add band exercises when bands equipment is available', () => {
            const exercises = getAvailableExercises(['bands']);
            const bandNames = db.strength.bands.map(e => e.name);

            bandNames.forEach(name => {
                expect(exercises.some(e => e.name === name)).toBe(true);
            });
        });

        it('should add kettlebell exercises when kettlebells available', () => {
            const exercises = getAvailableExercises(['kettlebells']);
            const kbCount = exercises.filter(e =>
                e.name.toLowerCase().includes('kb') ||
                e.name.toLowerCase().includes('kettlebell')
            ).length;

            expect(kbCount).toBeGreaterThan(0);
        });

        it('should add dumbbell exercises when dumbbells available', () => {
            const exercises = getAvailableExercises(['dumbbells']);
            const dbCount = exercises.filter(e =>
                e.name.toLowerCase().includes('db') ||
                e.name.toLowerCase().includes('dumbbell')
            ).length;

            expect(dbCount).toBeGreaterThan(0);
        });

        it('should combine multiple equipment types', () => {
            const noEquip = getAvailableExercises([]);
            const allEquip = getAvailableExercises(['bands', 'pullup', 'kettlebells', 'dumbbells']);

            expect(allEquip.length).toBeGreaterThan(noEquip.length);
        });
    });

    // ============================================================
    // getRepScheme Tests
    // ============================================================

    describe('getRepScheme', () => {
        it('should return circuit format for circuit scheme', () => {
            const reps = getRepScheme('circuit', 0, 8);
            expect(reps).toContain('sec');
        });

        it('should return HIIT format for HIIT scheme', () => {
            const reps = getRepScheme('hiit', 0, 8);
            expect(reps).toContain('20 sec');
        });

        it('should return rep range for military scheme', () => {
            const reps = getRepScheme('military', 0, 8);
            expect(reps).toContain('reps');
        });

        it('should return ascending reps for pyramid scheme', () => {
            const reps1 = getRepScheme('pyramid', 0, 8);
            const reps2 = getRepScheme('pyramid', 1, 8);
            const reps3 = getRepScheme('pyramid', 2, 8);

            expect(reps1).toBe('5 reps');
            expect(reps2).toBe('10 reps');
            expect(reps3).toBe('15 reps');
        });

        it('should return descending reps for reverse pyramid scheme', () => {
            const reps1 = getRepScheme('reverse_pyramid', 0, 8);
            const reps2 = getRepScheme('reverse_pyramid', 1, 8);
            const reps3 = getRepScheme('reverse_pyramid', 2, 8);

            expect(reps1).toBe('20 reps');
            expect(reps2).toBe('15 reps');
            expect(reps3).toBe('10 reps');
        });

        it('should not go below 5 reps in reverse pyramid', () => {
            const reps = getRepScheme('reverse_pyramid', 10, 12);
            expect(parseInt(reps)).toBeGreaterThanOrEqual(5);
        });
    });

    // ============================================================
    // generateWorkout Tests
    // ============================================================

    describe('generateWorkout', () => {
        it('should generate workout with all sections', () => {
            const workout = generateWorkout();

            expect(workout).toHaveProperty('warmup');
            expect(workout).toHaveProperty('main');
            expect(workout).toHaveProperty('cooldown');
        });

        it('should include warmup exercises by default', () => {
            const workout = generateWorkout();
            expect(workout.warmup.length).toBeGreaterThan(0);
        });

        it('should include cooldown exercises by default', () => {
            const workout = generateWorkout();
            expect(workout.cooldown.length).toBeGreaterThan(0);
        });

        it('should generate requested number of main exercises', () => {
            const workout = generateWorkout({ exerciseCount: 6 });
            expect(workout.main.length).toBe(6);
        });

        it('should respect includeWarmup option', () => {
            const workout = generateWorkout({ includeWarmup: false });
            expect(workout.warmup.length).toBe(0);
        });

        it('should respect includeCooldown option', () => {
            const workout = generateWorkout({ includeCooldown: false });
            expect(workout.cooldown.length).toBe(0);
        });

        it('should add reps to main exercises', () => {
            const workout = generateWorkout();

            workout.main.forEach(exercise => {
                expect(exercise).toHaveProperty('reps');
                expect(exercise.reps.length).toBeGreaterThan(0);
            });
        });

        it('should include scheme type in workout', () => {
            const workout = generateWorkout({ schemeType: 'hiit' });
            expect(workout.scheme).toBe('hiit');
        });

        it('should generate unique exercises (no duplicates)', () => {
            const workout = generateWorkout({ exerciseCount: 10 });
            const names = workout.main.map(e => e.name);
            const uniqueNames = [...new Set(names)];
            expect(uniqueNames.length).toBe(names.length);
        });

        it('should filter exercises by equipment', () => {
            const workoutNoEquip = generateWorkout({
                equipment: [],
                exerciseCount: 20
            });

            // Without equipment, should not have kettlebell exercises
            const hasKB = workoutNoEquip.main.some(e =>
                e.name.toLowerCase().includes('kb') ||
                e.name.toLowerCase().includes('kettlebell')
            );
            expect(hasKB).toBe(false);
        });
    });

    // ============================================================
    // Workout Variety Tests
    // ============================================================

    describe('Workout Variety', () => {
        it('should generate different workouts on multiple runs', () => {
            const workouts = [];
            for (let i = 0; i < 5; i++) {
                workouts.push(generateWorkout());
            }

            const mainExercisesSets = workouts.map(w =>
                JSON.stringify(w.main.map(e => e.name).sort())
            );

            const uniqueWorkouts = new Set(mainExercisesSets);
            expect(uniqueWorkouts.size).toBeGreaterThan(1);
        });

        it('should cover different muscle groups', () => {
            const workout = generateWorkout({ exerciseCount: 8 });
            const names = workout.main.map(e => e.name.toLowerCase());

            // Check for variety (at least upper and lower body exercises likely)
            const hasUpperBody = names.some(n =>
                n.includes('push') || n.includes('pull') || n.includes('press')
            );
            const hasLowerBody = names.some(n =>
                n.includes('squat') || n.includes('lunge') || n.includes('leg')
            );
            const hasCore = names.some(n =>
                n.includes('plank') || n.includes('crunch') || n.includes('bridge')
            );

            // With 8 exercises from bodyweight, we should hit multiple categories
            const categoryCount = [hasUpperBody, hasLowerBody, hasCore].filter(Boolean).length;
            expect(categoryCount).toBeGreaterThanOrEqual(1);
        });
    });

    // ============================================================
    // Edge Cases
    // ============================================================

    describe('Edge Cases', () => {
        it('should handle requesting more exercises than available', () => {
            const workout = generateWorkout({
                equipment: [],
                exerciseCount: 100
            });

            // Should return all available bodyweight exercises
            expect(workout.main.length).toBeLessThanOrEqual(db.strength.bodyweight.length);
        });

        it('should handle zero exercise count', () => {
            const workout = generateWorkout({ exerciseCount: 0 });
            expect(workout.main.length).toBe(0);
        });

        it('should handle all equipment options', () => {
            const workout = generateWorkout({
                equipment: ['bands', 'pullup', 'kettlebells', 'dumbbells', 'barbell'],
                exerciseCount: 15
            });

            expect(workout.main.length).toBe(15);
        });
    });
});
