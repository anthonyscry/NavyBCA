/**
 * Exercise Data Validation Tests
 *
 * Tests to validate the structure and content of exercises-data.js
 */

const fs = require('fs');
const path = require('path');

// Load exercises-data.js
const exercisesCode = fs.readFileSync(path.join(__dirname, '../../exercises-data.js'), 'utf8');
eval(exercisesCode);

describe('Exercise Database', () => {

    // ============================================================
    // Warmup Exercises Validation
    // ============================================================

    describe('warmupExercises', () => {
        it('should be defined and be an array', () => {
            expect(Array.isArray(warmupExercises)).toBe(true);
        });

        it('should have at least 10 exercises', () => {
            expect(warmupExercises.length).toBeGreaterThanOrEqual(10);
        });

        it('should have valid structure for each exercise', () => {
            warmupExercises.forEach((exercise, index) => {
                expect(exercise).toHaveProperty('name');
                expect(exercise).toHaveProperty('rep');
                expect(typeof exercise.name).toBe('string');
                expect(typeof exercise.rep).toBe('string');
                expect(exercise.name.length).toBeGreaterThan(0);
                expect(exercise.rep.length).toBeGreaterThan(0);
            });
        });

        it('should have unique exercise names', () => {
            const names = warmupExercises.map(e => e.name.toLowerCase());
            const uniqueNames = [...new Set(names)];
            expect(uniqueNames.length).toBe(names.length);
        });
    });

    // ============================================================
    // Pre-Cardio Warmup Validation
    // ============================================================

    describe('preCardioWarmup', () => {
        it('should be defined and be an array', () => {
            expect(Array.isArray(preCardioWarmup)).toBe(true);
        });

        it('should have valid structure', () => {
            preCardioWarmup.forEach(exercise => {
                expect(exercise).toHaveProperty('name');
                expect(exercise).toHaveProperty('rep');
            });
        });
    });

    // ============================================================
    // Cooldown Exercises Validation
    // ============================================================

    describe('cooldownExercises', () => {
        it('should be defined and be an array', () => {
            expect(Array.isArray(cooldownExercises)).toBe(true);
        });

        it('should have at least 5 stretches', () => {
            expect(cooldownExercises.length).toBeGreaterThanOrEqual(5);
        });

        it('should have valid structure with descriptions', () => {
            cooldownExercises.forEach(exercise => {
                expect(exercise).toHaveProperty('name');
                expect(exercise).toHaveProperty('desc');
                expect(typeof exercise.name).toBe('string');
            });
        });

        it('should include stretch in name or description', () => {
            const stretchCount = cooldownExercises.filter(e =>
                e.name.toLowerCase().includes('stretch') ||
                (e.desc && e.desc.toLowerCase().includes('stretch'))
            ).length;

            expect(stretchCount).toBeGreaterThan(0);
        });
    });

    // ============================================================
    // Main Exercise Database Structure
    // ============================================================

    describe('db (main database)', () => {
        it('should be defined as an object', () => {
            expect(typeof db).toBe('object');
            expect(db).not.toBeNull();
        });

        it('should have strength category', () => {
            expect(db).toHaveProperty('strength');
            expect(typeof db.strength).toBe('object');
        });

        it('should have cardio category', () => {
            expect(db).toHaveProperty('cardio');
            expect(typeof db.cardio).toBe('object');
        });
    });

    // ============================================================
    // Strength Exercises Validation
    // ============================================================

    describe('db.strength', () => {
        it('should have bodyweight exercises', () => {
            expect(db.strength).toHaveProperty('bodyweight');
            expect(Array.isArray(db.strength.bodyweight)).toBe(true);
            expect(db.strength.bodyweight.length).toBeGreaterThan(10);
        });

        it('should have band exercises', () => {
            expect(db.strength).toHaveProperty('bands');
            expect(Array.isArray(db.strength.bands)).toBe(true);
        });

        it('should have pullup bar exercises', () => {
            expect(db.strength).toHaveProperty('pullup');
            expect(Array.isArray(db.strength.pullup)).toBe(true);
        });

        it('should have kettlebell exercises', () => {
            expect(db.strength).toHaveProperty('kettlebells');
            expect(Array.isArray(db.strength.kettlebells)).toBe(true);
        });

        it('should have dumbbell exercises', () => {
            expect(db.strength).toHaveProperty('dumbbells');
            expect(Array.isArray(db.strength.dumbbells)).toBe(true);
        });

        it('all exercises should have required properties', () => {
            const allStrengthCategories = Object.values(db.strength);

            allStrengthCategories.forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(exercise => {
                        expect(exercise).toHaveProperty('name');
                        expect(typeof exercise.name).toBe('string');
                        expect(exercise.name.length).toBeGreaterThan(0);
                    });
                }
            });
        });

        it('all exercises should have tips', () => {
            const allStrengthCategories = Object.values(db.strength);

            allStrengthCategories.forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(exercise => {
                        expect(exercise).toHaveProperty('tip');
                        expect(typeof exercise.tip).toBe('string');
                    });
                }
            });
        });
    });

    // ============================================================
    // Bodyweight Exercises Deep Validation
    // ============================================================

    describe('db.strength.bodyweight', () => {
        it('should include essential exercises', () => {
            const names = db.strength.bodyweight.map(e => e.name.toLowerCase());

            expect(names.some(n => n.includes('pushup') || n.includes('push-up'))).toBe(true);
            expect(names.some(n => n.includes('plank'))).toBe(true);
            expect(names.some(n => n.includes('squat'))).toBe(true);
            expect(names.some(n => n.includes('lunge'))).toBe(true);
        });

        it('should have unique exercise names', () => {
            const names = db.strength.bodyweight.map(e => e.name.toLowerCase());
            const uniqueNames = [...new Set(names)];
            expect(uniqueNames.length).toBe(names.length);
        });

        it('tips should be helpful (not empty)', () => {
            db.strength.bodyweight.forEach(exercise => {
                expect(exercise.tip.length).toBeGreaterThan(10);
            });
        });
    });

    // ============================================================
    // Cardio Exercises Validation
    // ============================================================

    describe('db.cardio', () => {
        it('should have running exercises', () => {
            expect(db.cardio).toHaveProperty('running');
            expect(Array.isArray(db.cardio.running)).toBe(true);
        });

        it('should have HIIT exercises', () => {
            expect(db.cardio).toHaveProperty('hiit');
            expect(Array.isArray(db.cardio.hiit)).toBe(true);
        });

        it('should have conditioning exercises', () => {
            expect(db.cardio).toHaveProperty('conditioning');
            expect(Array.isArray(db.cardio.conditioning)).toBe(true);
        });

        it('cardio exercises should have valid structure', () => {
            Object.values(db.cardio).forEach(category => {
                if (Array.isArray(category)) {
                    category.forEach(exercise => {
                        expect(exercise).toHaveProperty('name');
                        expect(typeof exercise.name).toBe('string');
                    });
                }
            });
        });
    });

    // ============================================================
    // Fun Day Activities Validation
    // ============================================================

    describe('db.funDay', () => {
        it('should be defined', () => {
            expect(db).toHaveProperty('funDay');
        });

        it('should have various activity categories', () => {
            if (db.funDay) {
                expect(typeof db.funDay).toBe('object');
            }
        });
    });

    // ============================================================
    // Data Integrity Tests
    // ============================================================

    describe('Data Integrity', () => {
        it('should not have exercises with empty names', () => {
            const allExercises = [
                ...warmupExercises,
                ...preCardioWarmup,
                ...cooldownExercises
            ];

            // Add all strength exercises
            Object.values(db.strength).forEach(category => {
                if (Array.isArray(category)) {
                    allExercises.push(...category);
                }
            });

            // Add all cardio exercises
            Object.values(db.cardio).forEach(category => {
                if (Array.isArray(category)) {
                    allExercises.push(...category);
                }
            });

            allExercises.forEach(exercise => {
                expect(exercise.name.trim()).not.toBe('');
            });
        });

        it('should not have exercises with XSS-vulnerable content', () => {
            const allExercises = [];

            Object.values(db.strength).forEach(category => {
                if (Array.isArray(category)) {
                    allExercises.push(...category);
                }
            });

            allExercises.forEach(exercise => {
                expect(exercise.name).not.toContain('<script');
                expect(exercise.name).not.toContain('javascript:');
                if (exercise.tip) {
                    expect(exercise.tip).not.toContain('<script');
                }
            });
        });

        it('should have reasonable number of exercises per category', () => {
            // Each category should have at least a few exercises
            Object.entries(db.strength).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    expect(value.length).toBeGreaterThanOrEqual(3);
                }
            });
        });
    });

    // ============================================================
    // Exercise Count Summary
    // ============================================================

    describe('Exercise Counts', () => {
        it('should report total exercise count', () => {
            let totalCount = warmupExercises.length +
                             preCardioWarmup.length +
                             cooldownExercises.length;

            Object.values(db.strength).forEach(category => {
                if (Array.isArray(category)) {
                    totalCount += category.length;
                }
            });

            Object.values(db.cardio).forEach(category => {
                if (Array.isArray(category)) {
                    totalCount += category.length;
                }
            });

            // Should have a substantial exercise library
            expect(totalCount).toBeGreaterThan(100);

            console.log(`Total exercises in database: ${totalCount}`);
        });
    });

    // ============================================================
    // Equipment-specific Tests
    // ============================================================

    describe('Equipment-specific exercises', () => {
        it('kettlebell exercises should mention KB or kettlebell', () => {
            db.strength.kettlebells.forEach(exercise => {
                const hasKB = exercise.name.toLowerCase().includes('kb') ||
                             exercise.name.toLowerCase().includes('kettlebell');
                expect(hasKB).toBe(true);
            });
        });

        it('dumbbell exercises should mention DB or dumbbell', () => {
            db.strength.dumbbells.forEach(exercise => {
                const hasDB = exercise.name.toLowerCase().includes('db') ||
                             exercise.name.toLowerCase().includes('dumbbell');
                expect(hasDB).toBe(true);
            });
        });

        it('barbell exercises should mention barbell', () => {
            if (db.strength.barbell) {
                db.strength.barbell.forEach(exercise => {
                    expect(exercise.name.toLowerCase()).toContain('barbell');
                });
            }
        });
    });
});
