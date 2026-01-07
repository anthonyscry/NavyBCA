/**
 * Navy PT Exercise Database
 * Single source of truth for all exercises across generator.html, exercises.html, and offline.html
 * Last Updated: January 2026
 */

// Warmup exercises for strength sessions
const warmupExercises = [
    { name: "90/90 Stretch", rep: "5 reps/side" },
    { name: "Pillar Bridge", rep: "20 sec hold" },
    { name: "Glute Bridge", rep: "10 reps" },
    { name: "Bent Over T's", rep: "10 reps" },
    { name: "Knee Hug", rep: "5 reps/side" },
    { name: "Reverse Lunge w/ Rotation", rep: "5 reps/side" },
    { name: "Heel-to-Glute w/ Reach", rep: "5 reps/side" },
    { name: "Squats", rep: "10 reps" },
    { name: "Drop Squat to 2-inch Run", rep: "2 reps (3s run)" },
    { name: "Drop Squat to High Knees", rep: "2 reps (3s high knees)" },
    { name: "Arm Circles", rep: "10 forward, 10 backward" },
    { name: "Neck Rolls", rep: "5 each direction" },
    { name: "Hip Circles", rep: "10 each direction" },
    { name: "Leg Swings (Front/Back)", rep: "10 reps/side" },
    { name: "Leg Swings (Side/Side)", rep: "10 reps/side" },
    { name: "World's Greatest Stretch", rep: "5 reps/side" },
    { name: "Cat-Cow", rep: "10 reps" },
    { name: "Thoracic Rotation", rep: "8 reps/side" },
    { name: "Ankle Circles", rep: "10 each direction" },
    { name: "Toy Soldiers", rep: "10 reps/side" }
];

// Pre-cardio warmup exercises
const preCardioWarmup = [
    { name: "Inverted Hamstring", rep: "5 reps/side" },
    { name: "Leg Cradle", rep: "5 reps/side" },
    { name: "Linear March", rep: "10 yards" },
    { name: "Squat Jump Countermovement", rep: "5 reps" }
];

// Cooldown/stretching exercises
const cooldownExercises = [
    { name: "Chest Stretch", desc: "10 echo count", tip: "Clasp hands behind neck, pull elbows back" },
    { name: "Posterior Shoulder Stretch", desc: "10 echo count/side", tip: "Pull arm across body" },
    { name: "Triceps Stretch", desc: "10 echo count/side", tip: "Reach behind back, push elbow" },
    { name: "Hip Flexor Stretch", desc: "10 echo count/side", tip: "Lunge position, push hip forward" },
    { name: "Groin/Butterfly Stretch", desc: "10 echo count", tip: "Seated, soles together" },
    { name: "Modified Hurdler Stretch", desc: "10 echo count/side", tip: "Seated V-position, reach for toes" },
    { name: "Outer Hip/Low Back Stretch", desc: "10 echo count/side", tip: "Seated twist" },
    { name: "Piriformis Stretch", desc: "10 echo count/side", tip: "Lying, cross leg over thigh" },
    { name: "Low Back Stretch", desc: "10 echo count", tip: "Knees to chest" },
    { name: "Quadriceps Stretch", desc: "10 echo count/side", tip: "Standing/lying, pull heel to glute" },
    { name: "Calf Stretch", desc: "10 echo count/side", tip: "Push-up position, press heel down" }
];

// Main exercise database
const db = {
    strength: {
        bodyweight: [
                { name: "Standard Pushups", tip: "Keep core tight, elbows at 45°. Feel it in chest and triceps." },
                { name: "Wide-Arm Pushups", tip: "Hands wider than shoulders. Focus on chest stretch at bottom." },
                { name: "Diamond Pushups", tip: "Hands form diamond under chest. Triceps focus. Modify on knees if needed." },
                { name: "Hand-Release Pushups", tip: "Chest touches deck, lift hands, then push. Full range of motion." },
                { name: "Decline Pushups", tip: "Feet elevated. Increases shoulder and upper chest activation." },
                { name: "Pike Pushups", tip: "Hips high, body in inverted V. Press head toward deck. Shoulder focus." },
                { name: "Archer Pushups", tip: "One arm extended to side, other arm does the work. Advanced unilateral strength." },
                { name: "Hindu Pushups", tip: "Flow from downward dog to cobra. Great for flexibility and strength." },
                { name: "Clapping Pushups", tip: "Explosive push, clap at top, soft landing. Power builder. Advanced only." },
                { name: "Spiderman Pushups", tip: "Bring knee to elbow as you descend. Core and hip mobility." },
                { name: "Standard Plank", tip: "Straight line ear to ankle. Don't sag hips. Engage core." },
                { name: "Side Plank (L/R)", tip: "Stack feet or stagger. Keep hips high. Feel obliques working." },
                { name: "Plank Shoulder Taps", tip: "In plank, tap opposite shoulder. Keep hips stable. Anti-rotation." },
                { name: "Plank Up-Downs", tip: "Plank to pushup position and back. Control the movement." },
                { name: "Bird Dog", tip: "Opposite arm/leg extend. Keep back flat. Core stability." },
                { name: "Dead Bug", tip: "Press low back into deck. Move slow and controlled." },
                { name: "Hollow Body Hold", tip: "Lower back pressed to deck, arms and legs extended. Core killer." },
                { name: "V-Ups", tip: "Simultaneously lift legs and torso to form V. Control descent." },
                { name: "Bicycle Crunches", tip: "Opposite elbow to knee, rotate through core. Slow and controlled." },
                { name: "Flutter Kicks", tip: "Lower back pressed down, alternate kicking legs. Core and hip flexors." },
                { name: "Air Squats", tip: "Weight in heels, knees track toes. Thighs parallel. Core tight." },
                { name: "Walking Lunges", tip: "Chest up, front knee behind toes. Feel glutes and quads." },
                { name: "Reverse Lunges", tip: "Step backward into lunge. More knee-friendly than forward lunges." },
                { name: "Lateral Lunges", tip: "Step to side, sit back into hip. Inner thigh and glutes." },
                { name: "Split Squats", tip: "Feet staggered, lower straight down. Keep front knee behind toes." },
                { name: "Jump Squats", tip: "Explosive jump from squat position. Land soft, reset, repeat." },
                { name: "Box Jumps (Step-up Alternative)", tip: "Jump onto elevated surface. Step down to protect knees." },
                { name: "Single-Leg RDL", tip: "Balance on one leg, hinge forward. Hamstring and balance." },
                { name: "Calf Raises", tip: "Full extension at top, slow lower. Feel the burn in calves." },
                { name: "Wall Sit", tip: "Thighs parallel, back flat on wall. Quads should burn." },
                { name: "Glute Bridges", tip: "Squeeze glutes at top. Don't hyperextend back." },
                { name: "Single-Leg Glute Bridge", tip: "One leg extended, drive through planted heel. Unilateral strength." },
                { name: "Superman Hold", tip: "Lie face down, lift arms and legs. Lower back and glutes." },
                { name: "Prone Cobra", tip: "Face down, arms at sides, lift chest. Squeeze shoulder blades." },
                { name: "Squat Hold", tip: "Hold bottom of squat position. Build endurance and mobility." },
                { name: "Inchworms", tip: "Walk hands out to plank, walk feet to hands. Full body mobility." }
            ],
            bands: [
                { name: "Band Pull-Aparts", tip: "Arms straight, squeeze shoulder blades together. Upper back." },
                { name: "Band Bicep Curls", tip: "Elbows pinned to sides. Control the negative." },
                { name: "Band Overhead Press", tip: "Press straight up, don't flare elbows. Core engaged." },
                { name: "Band Squats", tip: "Band above knees pushes them out. Focus on glute engagement." },
                { name: "Band Rows", tip: "Pull to ribcage, squeeze shoulder blades. Feel upper back." },
                { name: "Band Tricep Extensions", tip: "Keep elbows high and stable. Squeeze at extension." },
                { name: "Band Lateral Walks", tip: "Stay low in squat. Feel glute medius on outer hip." },
                { name: "Band Face Pulls", tip: "Pull to face, elbows high. Rear delts and rotator cuff." },
                { name: "Band Chest Press", tip: "Anchor behind, press forward. Chest and triceps." },
                { name: "Band Pallof Press", tip: "Resist rotation, press away from body. Core anti-rotation." },
                { name: "Band Good Mornings", tip: "Band on shoulders, hinge at hips. Hamstrings and glutes." },
                { name: "Band Deadlifts", tip: "Stand on band, hinge and drive up. Hip hinge pattern." },
                { name: "Band Monster Walks", tip: "Band above knees, walk forward with wide steps. Glute activation." },
                { name: "Band Clamshells", tip: "Lying on side, open knees against band. Hip external rotators." },
                { name: "Band Woodchops", tip: "Rotate through core, low to high or high to low. Obliques." }
            ],
            pullup: [
                { name: "Pull-ups", tip: "Overhand grip. Pull chest to bar, control down. Lats and back." },
                { name: "Chin-ups", tip: "Underhand grip. More bicep involvement. Chin over bar." },
                { name: "Negative Pull-ups", tip: "Jump to top, lower slow (3-5 sec). Build pulling strength." },
                { name: "Wide-Grip Pull-ups", tip: "Hands wider than shoulders. Emphasizes outer lats." },
                { name: "Close-Grip Pull-ups", tip: "Hands close together. More mid-back and bicep focus." },
                { name: "Commando Pull-ups", tip: "Hands staggered inline, alternate sides. Unilateral strength." },
                { name: "L-Sit Pull-ups", tip: "Hold legs at 90° while pulling. Core and grip intensive." },
                { name: "Hanging Leg Raises", tip: "Legs together, no swinging. Core and hip flexors." },
                { name: "Hanging Knee Raises", tip: "Knees to chest while hanging. Easier than leg raises." },
                { name: "Toes to Bar", tip: "Swing legs to touch bar. CrossFit standard. Requires kip." },
                { name: "Windshield Wipers", tip: "Legs up, rotate side to side. Advanced oblique work." },
                { name: "Dead Hangs", tip: "Relax shoulders, decompress spine. Grip strength builder." },
                { name: "Scapular Pull-ups", tip: "Hang and retract scapula only. Builds foundation for pull-ups." },
                { name: "Muscle-up Progressions", tip: "Pull high, transition over bar. Advanced movement." }
            ],
            kettlebells: [
                { name: "Kettlebell Swings", tip: "Hinge at hips, not squat. Power from glutes. Arms are just hooks." },
                { name: "Single-Arm KB Swing", tip: "One arm at a time. Trains anti-rotation. Alternate sides." },
                { name: "Goblet Squats", tip: "Hold KB at chest. Elbows inside knees. Deep squat." },
                { name: "KB Deadlifts", tip: "Hinge at hips, flat back. Drive through heels." },
                { name: "KB Rows", tip: "One arm at a time. Pull to hip, squeeze lat." },
                { name: "KB Lunges", tip: "Hold KB at chest or sides. Control the descent." },
                { name: "KB Clean", tip: "Swing to rack position. Keep bell close to body. Wrist neutral." },
                { name: "KB Press", tip: "From rack, press overhead. Keep core tight." },
                { name: "KB Clean and Press", tip: "Combine clean and press in one fluid motion. Full body power." },
                { name: "KB Turkish Get-Up", tip: "Lie to stand with KB overhead. Mobility and stability. Go slow!" },
                { name: "KB Snatch", tip: "Swing to overhead in one motion. Power and coordination." },
                { name: "KB Windmill", tip: "KB overhead, hinge to side. Hip and shoulder mobility." },
                { name: "KB Halo", tip: "Circle KB around head. Shoulder mobility and stability." },
                { name: "KB Figure 8", tip: "Pass KB around and between legs. Coordination and grip." },
                { name: "KB Farmer Carry", tip: "Walk with KBs at sides. Grip, core, and posture." },
                { name: "KB Rack Carry", tip: "KB in rack position, walk. Core anti-rotation." },
                { name: "KB Sumo Deadlift", tip: "Wide stance, KB between feet. Inner thighs and glutes." },
                { name: "KB Thruster", tip: "Squat to overhead press in one motion. Leg and shoulder power." }
            ],
            dumbbells: [
                { name: "Dumbbell Rows", tip: "One hand on bench. Pull to hip, squeeze back." },
                { name: "Renegade Rows", tip: "Plank position, alternate rows. Core and back." },
                { name: "DB Overhead Press", tip: "Start at shoulders, press straight up. Don't arch back." },
                { name: "Arnold Press", tip: "Rotate palms as you press. Full shoulder development." },
                { name: "DB Lateral Raises", tip: "Slight bend in elbows, raise to shoulder height. Side delts." },
                { name: "DB Front Raises", tip: "Alternating or together, raise to eye level. Front delts." },
                { name: "DB Rear Delt Flyes", tip: "Bent over, raise arms to sides. Rear delts and upper back." },
                { name: "DB Lunges", tip: "DBs at sides. Step forward, control down and up." },
                { name: "DB Romanian Deadlift", tip: "DBs in front, hinge at hips. Hamstrings and glutes." },
                { name: "DB Curls", tip: "No swinging. Elbows pinned. Full range of motion." },
                { name: "Hammer Curls", tip: "Palms facing in. Targets brachialis and forearms." },
                { name: "Concentration Curls", tip: "Seated, elbow on thigh. Isolate the bicep." },
                { name: "DB Tricep Extensions", tip: "One or both hands overhead. Lower behind head, extend." },
                { name: "DB Skull Crushers", tip: "Lying down, lower to forehead. Tricep isolation." },
                { name: "DB Kickbacks", tip: "Bent over, extend arm back. Squeeze tricep at top." },
                { name: "DB Thrusters", tip: "Squat to press in one motion. Full body power." },
                { name: "DB Farmer Carry", tip: "Walk with DBs at sides. Grip and core stability." },
                { name: "DB Goblet Squat", tip: "Hold one DB at chest, squat deep. Leg and core." },
                { name: "DB Step-Ups", tip: "DBs at sides, step onto box. Unilateral leg strength." },
                { name: "DB Pullover", tip: "Lying on bench, lower DB behind head. Lats and chest." },
                { name: "DB Shrugs", tip: "Heavy DBs, shrug shoulders to ears. Upper traps." }
            ],
            barbell: [
                { name: "Barbell Deadlift", tip: "Hinge at hips, flat back. Bar close to body. Drive through heels." },
                { name: "Barbell Back Squat", tip: "Bar on upper back, not neck. Depth to parallel or below." },
                { name: "Barbell Front Squat", tip: "Elbows high, bar on shoulders. Keep torso upright." },
                { name: "Barbell Overhead Press", tip: "Start at shoulders, press straight up. Squeeze glutes for stability." },
                { name: "Barbell Bent Over Row", tip: "Hinge forward 45°, pull to belly button. Squeeze back." },
                { name: "Barbell RDL", tip: "Slight knee bend, hinge at hips. Feel hamstrings stretch." },
                { name: "Barbell Lunges", tip: "Bar on back, step forward. Keep torso upright." },
                { name: "Barbell Floor Press", tip: "Lying on floor, press up. Great for triceps and lockout strength." },
                { name: "Barbell Hip Thrust", tip: "Upper back on bench, bar on hips. Squeeze glutes at top." },
                { name: "Barbell Good Mornings", tip: "Bar on back, hinge forward. Feel hamstrings and low back." }
            ],
            flatBench: [
                { name: "Dumbbell Bench Press", tip: "DBs at chest level, press up and together. Control the negative." },
                { name: "Dumbbell Flyes", tip: "Slight elbow bend, lower wide. Feel chest stretch." },
                { name: "Bench Step-Ups", tip: "Drive through front heel. Alternate legs." },
                { name: "Bench Hip Thrusts", tip: "Upper back on bench, drive hips up. Squeeze glutes." },
                { name: "Incline Push-ups", tip: "Hands on bench, easier angle. Good for beginners." },
                { name: "Bench Tricep Dips", tip: "Hands on edge, lower body. Elbows back, not out." },
                { name: "Single-Leg Bench Squats", tip: "One foot on bench behind, squat on front leg. Bulgarian split squat." }
            ],
            adjBench: [
                { name: "Incline Dumbbell Press", tip: "Bench at 30-45°. Press up from upper chest." },
                { name: "Incline Dumbbell Flyes", tip: "Bench at 30°, arms wide. Upper chest focus." },
                { name: "Seated Shoulder Press", tip: "Bench upright, press dumbbells overhead." },
                { name: "Incline Dumbbell Rows", tip: "Chest on incline bench, pull DBs up. Upper back focus." },
                { name: "Decline Push-ups", tip: "Feet on bench. Increases difficulty and shoulder engagement." },
                { name: "Seated Incline Curls", tip: "Bench at 45°, curl with stretch at bottom." },
                { name: "Prone Y-T-W Raises", tip: "Lie face down on incline, raise arms in Y, T, W patterns. Shoulder health." }
            ],
            sled: [
                { name: "Sled Push (High Handles)", tip: "Arms extended, drive with legs. Stay low and powerful." },
                { name: "Sled Push (Low Handles)", tip: "Hands low, chest down. More quad and glute drive." },
                { name: "Sled Pull (Backward)", tip: "Face sled, pull toward you walking backward. Quads burn." },
                { name: "Sled Drag (Forward)", tip: "Strap around waist, walk forward. Great for conditioning." },
                { name: "Sled Row", tip: "Face sled, row handle to chest. Upper back and biceps." },
                { name: "Sled Sprint", tip: "Explosive push for 20-40 yards. Max effort." }
            ]
        },
    lowImpact: {
        strength: {
                bodyweight: [
                    { name: "Standard Pushups", tip: "Keep core tight, elbows at 45°. Modify on knees if needed." },
                    { name: "Incline Push-ups", tip: "Hands on bench or wall. Easier angle for shoulder comfort." },
                    { name: "Standard Plank", tip: "Straight line ear to ankle. Breathe steady." },
                    { name: "Side Plank (L/R)", tip: "Stack feet or stagger. Keep hips high." },
                    { name: "Bird Dog", tip: "Opposite arm/leg extend. Keep back flat." },
                    { name: "Dead Bug", tip: "Press low back into deck. Slow, controlled reps." },
                    { name: "Air Squats", tip: "Controlled depth. Sit back into heels." },
                    { name: "Chair Squats", tip: "Tap chair lightly, stand back up. Keep chest tall." },
                    { name: "Wall Sit", tip: "Thighs parallel, back flat on wall. Hold steady." },
                    { name: "Glute Bridges", tip: "Squeeze glutes at top. No hyperextension." },
                    { name: "Glute Bridge March", tip: "Hold bridge, alternate lifting feet. Keep hips level." },
                    { name: "Calf Raises", tip: "Slow up/down. Use support if needed." }
                ],
                bands: [
                    { name: "Band Pull-Aparts", tip: "Arms straight, squeeze shoulder blades together." },
                    { name: "Band Bicep Curls", tip: "Elbows pinned to sides. Control the negative." },
                    { name: "Band Overhead Press", tip: "Press straight up, ribs down." },
                    { name: "Band Rows", tip: "Pull to ribcage, squeeze upper back." },
                    { name: "Band Tricep Extensions", tip: "Keep elbows high and steady." },
                    { name: "Band Lateral Walks", tip: "Stay low, short steps. Feel glute medius." },
                    { name: "Band Chest Press", tip: "Anchor behind you, press forward with control." },
                    { name: "Band Pallof Press", tip: "Resist rotation as you press away from chest." }
                ],
                kettlebells: [
                    { name: "Goblet Squats", tip: "Hold KB at chest. Stay controlled." },
                    { name: "KB Deadlifts", tip: "Hinge at hips, flat back." },
                    { name: "KB Rows", tip: "One arm at a time. Pull to hip." },
                    { name: "KB Suitcase Carry", tip: "Walk tall with KB at side. Brace core." }
                ],
                dumbbells: [
                    { name: "Dumbbell Rows", tip: "Support on bench. Pull to hip, squeeze back." },
                    { name: "DB Overhead Press", tip: "Press straight up. Keep core engaged." },
                    { name: "DB Curls", tip: "No swinging. Full range of motion." },
                    { name: "DB Tricep Extensions", tip: "Control the lowering phase." },
                    { name: "DB Floor Press", tip: "Press from floor, keep elbows at 45°." }
                ],
                flatBench: [
                    { name: "Dumbbell Bench Press", tip: "Control the negative. Keep shoulders packed." },
                    { name: "Bench Hip Thrusts", tip: "Drive through heels, squeeze glutes." },
                    { name: "Incline Push-ups", tip: "Hands on bench, steady pace." },
                    { name: "Bench Step-Ups", tip: "Controlled step up/down. Use light support if needed." }
                ],
                adjBench: [
                    { name: "Incline Dumbbell Press", tip: "Bench at 30-45°. Smooth tempo." },
                    { name: "Incline Dumbbell Rows", tip: "Chest on bench, pull DBs up." },
                    { name: "Seated Shoulder Press", tip: "Upright bench, steady reps." },
                    { name: "Seated Incline Curls", tip: "Slow reps, full extension." },
                    { name: "Prone Y-T-W Raises", tip: "Light weight. Focus on control." }
                ],
                sled: [
                    { name: "Sled Push (High Handles)", tip: "Smooth drive, steady pace." },
                    { name: "Sled Pull (Backward)", tip: "Short steps, stay tall." },
                    { name: "Sled Drag (Forward)", tip: "Walk forward, keep pace even." }
                ]
            },
            cardio: {
                indoor: [
                    { name: "March in Place", tip: "Tall posture, drive arms. Light impact.", reps: "60-90 seconds" },
                    { name: "Step Touches", tip: "Side steps, keep rhythm. Add arm swings.", reps: "60 seconds" },
                    { name: "Low-Impact Jacks", tip: "Step out instead of jump. Keep heart rate up.", reps: "30-45 seconds" },
                    { name: "Step Jacks", tip: "Step wide as arms go overhead. No jumping.", reps: "30-45 seconds" },
                    { name: "Shadow Boxing", tip: "Light footwork, punch combos. Keep knees soft.", reps: "45-60 seconds" },
                    { name: "Standing Knee Tucks", tip: "Alternate knee lifts with a crunch. Stay tall.", reps: "30-45 seconds" },
                    { name: "Lateral Shuffles", tip: "Stay low, quick side-to-side movement.", reps: "30-45 seconds" },
                    { name: "Jog (Gym Laps)", tip: "Easy pace. Stay light on feet.", reps: "2-4 laps", isFinisher: true }
                ],
                outdoor: [
                    { name: "Brisk Walk Intervals", tip: "Power walk, pump arms. 1 min brisk, 1 min easy.", reps: "6-8 rounds" },
                    { name: "Light Jog/Walk", tip: "Conversational pace, avoid pounding.", reps: "8-12 min", isFinisher: true },
                    { name: "Walk/Jog Intervals", tip: "2 min walk, 1 min jog. Keep impact low.", reps: "8-12 rounds" }
                ],
                assaultBike: [
                    { name: "Assault Bike Steady State", tip: "Moderate pace, keep RPM consistent.", reps: "3-5 min", isFinisher: true },
                    { name: "Assault Bike Intervals", tip: "15-30s on, 45-60s easy. Stay smooth.", reps: "6-8 rounds" }
                ],
                rower: [
                    { name: "Rowing Steady State (2000m)", tip: "Moderate pace 18-22 strokes/min.", reps: "2000m", isFinisher: true },
                    { name: "Rowing Intervals (500m)", tip: "Moderate effort, focus on form.", reps: "500m x 4-5 intervals" }
                ],
                cycle: [
                    { name: "Team Bike Ride", tip: "Easy-moderate pace to stay with the group.", reps: "10-15 min", isFinisher: true },
                    { name: "Cycling Steady State", tip: "Moderate resistance, consistent pace.", reps: "5-10 min", isFinisher: true },
                    { name: "Cycling Intervals", tip: "1 min moderate, 1 min easy. Keep cadence smooth.", reps: "6-8 rounds" }
                ],
                bicycle: [
                    { name: "Team Bike Ride", tip: "Easy-moderate pace to stay with the group.", reps: "10-15 min", isFinisher: true },
                    { name: "Bike Ride Intervals", tip: "2 min steady, 1 min easy spin. Stay smooth.", reps: "6-8 rounds" }
                ],
                treadmill: [
                    { name: "Incline Walk", tip: "10-15% incline, moderate pace.", reps: "5-10 min", isFinisher: true },
                    { name: "Treadmill Intervals", tip: "1 min jog, 1 min walk. Adjust speed to comfort.", reps: "6-8 rounds" }
                ],
                swimming: [
                    { name: "Easy Freestyle Laps", tip: "Relaxed pace, focus on form. Low impact on joints.", reps: "300-500m", isFinisher: true },
                    { name: "Breaststroke Laps", tip: "Gentle stroke, easy on shoulders. Good recovery swim.", reps: "200-400m", isFinisher: true },
                    { name: "Backstroke Laps", tip: "Shoulder-friendly, relaxed pace. Great for recovery.", reps: "200-300m" },
                    { name: "Pool Walking/Jogging", tip: "Walk or jog in shallow end. Zero impact cardio.", reps: "10-15 min", isFinisher: true },
                    { name: "Gentle Kick Laps", tip: "Easy flutter kick with board. Light leg work.", reps: "200-300m" },
                    { name: "Treading Water (Relaxed)", tip: "Easy pace treading. Use eggbeater or scissor kick.", reps: "3-5 min" }
                ]
            }
        },
    cardio: {
        indoor: [
                { name: "High Knees (March/Run)", tip: "Drive knees up, pump arms. Keep core engaged.", reps: "30-45 seconds" },
                { name: "Fast Feet Drill", tip: "Quick, light steps. Stay on balls of feet.", reps: "30 seconds" },
                { name: "Seal Jacks", tip: "Arms out front instead of overhead. Low impact option.", reps: "20-30 reps" },
                { name: "Mountain Climbers (Controlled)", tip: "Hips level with shoulders. Alternate knees to chest.", reps: "20-30 reps" },
                { name: "Skater Jumps", tip: "Lateral jump, land soft. Touch opposite hand to foot.", reps: "10-15 per side" },
                { name: "Burpees (No Push-up)", tip: "Squat, jump back to plank, hop forward, stand. Modify as needed.", reps: "10-15 reps" },
                { name: "Lateral Shuffles", tip: "Stay low, quick side-to-side movement. 10 yards each direction.", reps: "30-45 seconds" },
                { name: "Jog (Gym Laps)", tip: "1 lap around gym/basketball court. Light on feet, steady pace.", reps: "2-4 laps", isFinisher: true }
            ],
            outdoor: [
                { name: "Sprint Intervals (100m)", tip: "Max effort sprint, walk 100m recovery. Repeat.", reps: "4-6 sprints" },
                { name: "Shuttle Runs (25yd)", tip: "Touch line at each end. Explode out of turns.", reps: "4-6 shuttles" },
                { name: "Hill Repeats", tip: "Sprint up, walk down. Drive knees on incline.", reps: "4-6 repeats" },
                { name: "Linear Skips", tip: "Exaggerated skip, drive knee high. 25-50 yards.", reps: "2-4 lengths" },
                { name: "Track Run (Steady State)", tip: "1 lap around the track at consistent pace. Breathe rhythmically.", reps: "1-2 laps", isFinisher: true },
                { name: "400m Run", tip: "1 lap around the track at moderate pace. Control breathing.", reps: "1 lap", isFinisher: true },
                { name: "Warrior Run (Last Runner Up)", tip: "Jog in formation, last person sprints to front. Repeat.", reps: "5-10 min", isFinisher: true }
            ],
            jumprope: [
                { name: "Jump Rope (2 min)", tip: "Light bounces, wrists turn rope. Stay relaxed.", reps: "2 min" },
                { name: "Jump Rope High Knees", tip: "Alternate high knees while jumping. Cardio + core.", reps: "1 min" },
                { name: "Double Unders", tip: "Higher jump, faster wrist spin. Advanced skill.", reps: "20-30 reps" },
                { name: "Jump Rope Intervals", tip: "30s fast, 30s easy. Build endurance.", reps: "3-4 rounds" }
            ],
            assaultBike: [
                { name: "Assault Bike Intervals", tip: "15-30s max effort with full recovery. Push and pull with arms.", reps: "15-30s on / 45-60s rest x 6-8" },
                { name: "Assault Bike Sprints", tip: "All-out effort, take full rest between. It's a killer!", reps: "20-30s sprint / 60s rest x 5-6" },
                { name: "Assault Bike Steady State", tip: "Moderate pace, keep RPM consistent.", reps: "3-5 min", isFinisher: true },
                { name: "Assault Bike Tabata", tip: "Maximum intensity. Take extra rest between sets if needed.", reps: "20s on / 10s off x 8 (rest 2 min, repeat)" },
                { name: "Assault Bike Calorie Sprints", tip: "Sprint to hit target calories, rest fully between rounds.", reps: "10 cal sprint / 60s rest x 5-6 rounds" }
            ],
            rower: [
                { name: "Rowing Intervals (500m)", tip: "500m hard, 1 min rest. Drive with legs first.", reps: "500m x 4-6 intervals" },
                { name: "Rowing Sprints (250m)", tip: "All-out effort for 250m, rest 1 min between.", reps: "250m x 5-6 sprints" },
                { name: "Rowing Steady State (2000m)", tip: "Moderate pace 18-22 strokes/min. Focus on form.", reps: "2000m", isFinisher: true },
                { name: "Rowing Pyramid", tip: "250m-500m-750m-500m-250m. Control pace on longer pieces.", reps: "2250m total" },
                { name: "Rowing 1000m", tip: "Build pace throughout. Sprint last 200m.", reps: "1000m" }
            ],
            cycle: [
                { name: "Cycling Intervals", tip: "1 min high resistance, 1 min low. Maintain cadence.", reps: "6-8 rounds" },
                { name: "Cycling Sprints", tip: "30s max speed, 30s easy. Seated or standing.", reps: "6-8 sprints" },
                { name: "Cycling Steady State", tip: "Moderate resistance, consistent pace. Good recovery.", reps: "5-10 min", isFinisher: true },
                { name: "Cycling Hills", tip: "Increase resistance, stand and climb. 1 min on, 1 min off.", reps: "5-6 hills" },
                { name: "Cycling Tabata", tip: "20s sprint, 10s rest x 8. High cadence.", reps: "4 min" }
            ],
            bicycle: [
                { name: "Team Bike Ride", tip: "Easy-moderate pace to stay with the group.", reps: "10-15 min", isFinisher: true },
                { name: "Bike Ride Intervals", tip: "2 min steady, 1 min easy spin. Stay smooth.", reps: "6-8 rounds" },
                { name: "Bike Hill Climbs", tip: "Find a short hill, climb strong, easy coast down.", reps: "4-6 climbs" }
            ],
            treadmill: [
                { name: "Treadmill Intervals", tip: "1 min sprint, 1 min walk. Adjust speed for ability.", reps: "6-8 rounds" },
                { name: "Treadmill Sprints", tip: "30s at 80-90% effort, 30s rest. Hold rails to hop on/off.", reps: "6-8 sprints" },
                { name: "Incline Walk", tip: "10-15% incline, moderate pace. Great for glutes and calves.", reps: "5-10 min", isFinisher: true },
                { name: "Treadmill Run", tip: "Steady pace jog. Focus on breathing rhythm.", reps: "5-10 min", isFinisher: true },
                { name: "Incline Sprints", tip: "5-8% incline, sprint 20s, rest 40s. Power builder.", reps: "5-6 sprints" }
            ],
            swimming: [
                { name: "Freestyle Laps", tip: "Steady pace freestyle. Focus on smooth stroke and bilateral breathing.", reps: "500m steady", isFinisher: true },
                { name: "Freestyle Intervals", tip: "50m sprint, 20s rest. Maintain form at speed.", reps: "8-10 x 50m" },
                { name: "Freestyle Sprints", tip: "25m all-out effort, full recovery between.", reps: "6-8 x 25m" },
                { name: "Breaststroke Laps", tip: "Steady breaststroke. Good for active recovery or variety.", reps: "200-400m" },
                { name: "Backstroke Laps", tip: "Focus on hip rotation and steady kick. Shoulder-friendly option.", reps: "200-400m" },
                { name: "Mixed Stroke Pyramid", tip: "100m free, 75m breast, 50m back, 25m fly (or free). Build up and down.", reps: "500m total" },
                { name: "Kick Board Laps", tip: "Flutter kick with board. Builds leg endurance and kick power.", reps: "200-400m" },
                { name: "Pull Buoy Laps", tip: "Upper body focus. Keep legs still, power from arms.", reps: "200-400m" },
                { name: "Underwater Swim", tip: "Breath hold and streamline glide. Build lung capacity. Safety first!", reps: "4-6 x 15m" },
                { name: "Treading Water", tip: "Vertical in deep end. Hands out of water for challenge.", reps: "2-5 min continuous" },
                { name: "Combat Sidestroke (CSS)", tip: "Navy swim standard. Head low, efficient stroke. Practice breathing.", reps: "500m steady", isFinisher: true },
                { name: "CSS Intervals", tip: "100m CSS at goal pace, 30s rest. Build speed and efficiency.", reps: "5-8 x 100m" },
                { name: "Pool Running", tip: "Deep water running with flotation belt. Zero impact cardio.", reps: "10-15 min" },
                { name: "Buddy Tow Drill", tip: "Tow partner across pool. Rescue swim practice. Switch roles.", reps: "4-6 lengths" }
            ]
        },
    yoga: [
            { name: "Cat-Cow Stretch", duration: "30-45 seconds", tip: "Flow between arching and rounding back. Sync with breath." },
            { name: "Child's Pose", duration: "30-60 seconds", tip: "Knees wide, arms extended. Rest forehead on mat." },
            { name: "Downward Dog", duration: "30-45 seconds", tip: "Hips high, heels reaching down. Press hands into mat." },
            { name: "Forward Fold", duration: "30-45 seconds", tip: "Let head hang heavy. Bend knees if hamstrings tight." },
            { name: "Low Lunge", duration: "30 seconds/side", tip: "Back knee down, hips sink forward. Hip flexor stretch." },
            { name: "Pigeon Pose", duration: "45-60 seconds/side", tip: "Front shin across mat. Deep hip opener." },
            { name: "Seated Twist", duration: "30 seconds/side", tip: "Tall spine, twist from core. Look over back shoulder." },
            { name: "Thread the Needle", duration: "30-45 seconds/side", tip: "On all fours, reach arm under body. Shoulder stretch." },
            { name: "Supine Twist", duration: "30-45 seconds/side", tip: "Lying on back, knees to one side. Arms out in T." },
            { name: "Cobra Pose", duration: "20-30 seconds", tip: "Gentle backbend, shoulders down. Don't strain neck." },
            { name: "Butterfly Stretch", duration: "30-60 seconds", tip: "Soles of feet together, knees drop. Inner thigh stretch." },
            { name: "Happy Baby", duration: "30-45 seconds", tip: "Grab outside of feet, rock gently. Low back release." },
            { name: "Figure Four Stretch", duration: "30-45 seconds/side", tip: "Ankle on opposite knee, pull thigh in. Piriformis stretch." },
            { name: "Supine Hamstring Stretch", duration: "30-45 seconds/side", tip: "Leg straight up, use strap or hands. Keep other leg flat." },
            { name: "Neck Rolls", duration: "30 seconds each direction", tip: "Slow circles, release tension. Don't force range." },
            { name: "Shoulder Rolls", duration: "30 seconds", tip: "Roll forward then backward. Release upper body tension." },
            { name: "Wrist Circles", duration: "20-30 seconds each direction", tip: "Circle wrists both ways. Good for desk workers." },
            { name: "Standing Side Stretch", duration: "20-30 seconds/side", tip: "Reach arm overhead, lean to opposite side. Stretch obliques." },
            { name: "Warrior I", duration: "30 seconds/side", tip: "Front knee bent, back leg straight. Arms reach up." },
            { name: "Warrior II", duration: "30 seconds/side", tip: "Arms parallel to ground, gaze over front hand. Strong legs." },
            { name: "Triangle Pose", duration: "30 seconds/side", tip: "Front leg straight, reach down and up. Open chest." },
            { name: "Tree Pose", duration: "30 seconds/side", tip: "Foot on inner thigh or calf. Balance practice." },
            { name: "Corpse Pose (Savasana)", duration: "2-3 minutes", tip: "Final relaxation. Lie completely still, focus on breath." }
    ],
    funday: {
        outdoor: [
                // Equipment-based games (with fitness penalties)
                { name: "Kickball with PT", tip: "Standard baseball rules. FITNESS: Outs do 5 4-count pushups. Scored-on team does 10 4-count exercise chosen by scoring team.", requires: "kickball" },
                { name: "Ultimate Frisbee", tip: "Score by catching in end zone. FITNESS: Scored-on team does 10 4-count burpees. Turnover = 5 4-count mountain climbers.", requires: "frisbee", link: "https://www.youtube.com/watch?v=LPd-XdI5tuk" },
                { name: "Flag Football", tip: "Flag pull or two-hand touch only (no tackling). FITNESS: Scored-on team does 10 4-count exercise picked by scoring team. Turnover = 5 4-count pushups.", requires: "football" },
                { name: "Soccer", tip: "Full field or small-sided. FITNESS: Scored-on team does 10 4-count squats. Penalty for offsides = 5 4-count situps.", requires: "soccer" },
                { name: "Softball with Fitness", tip: "Slow pitch. FITNESS: Outs do 5 4-count pushups before returning to dugout. Scored-on team does 10 4-count exercise.", requires: "baseball" },
                { name: "Capture the Flag", tip: "Two teams, two territories. FITNESS: Captured players do 10 4-count burpees in 'jail', freed by teammates. Great cardio!", requires: "flagSet" },
                { name: "Tug of War", tip: "Equal teams by weight. FITNESS: Losing team does 15 4-count exercise chosen by winners. Best 2 of 3 rounds.", requires: "tugRope" },
                { name: "Obstacle Course Time Trial", tip: "Set up PT stations with cones. FITNESS: Team with slowest time does 10 extra 4-count burpees. All exercises are 4-count.", requires: "cones" },
                { name: "Speedball", tip: "Hybrid sport - kick or throw to score. FITNESS: Scored-on team does 10 4-count exercise chosen by scoring team. Fast-paced!", requires: "soccer", link: "https://www.youtube.com/watch?v=yP3VvqYYlGI" },
                { name: "Spikeball (Roundnet)", tip: "2v2 teams, 3 touches to return. FITNESS: Losing team each game does 10 4-count pushups. Play best of 5 to 21 points.", requires: "spikeball", link: "https://www.youtube.com/watch?v=FRmjRZpHQH8" },
                { name: "Kan Jam", tip: "Frisbee to can, partner deflects. FITNESS: Losing team does 10 4-count exercise. First to 21 wins!", requires: "frisbee" },
                { name: "Cone Shuttle Gauntlet", tip: "Set 4 cones 10yd apart. Teams sprint down/back. FITNESS: Losing team does 15 4-count burpees.", requires: "cones" },
                { name: "Frisbee Conditioning Relay", tip: "Relay to cone, toss frisbee to teammate, sprint back. FITNESS: Drops = 5 4-count pushups.", requires: "frisbee" },
                // No-equipment games (with facility preferences and fitness penalties)
                { name: "British Bulldog", tip: "Players run across field. Bulldogs tag with two-hand touch (no tackling). FITNESS: Tagged players do 10 4-count pushups before becoming bulldogs.", noEquipment: true, preferredFacility: "openField", link: "https://www.youtube.com/watch?v=7vtfR6EqPLE" },
                { name: "Manhunt", tip: "Hide and seek meets tag. FITNESS: Tagged players do 10 4-count burpees before becoming hunters. Keeps fitness high!", noEquipment: true, preferredFacility: "openField" },
                { name: "Tag Variations (Freeze Tag, Tunnel Tag)", tip: "Classic tag games. FITNESS: Tagged players do 10 4-count mountain climbers to unfreeze OR wait for teammate crawl-through.", noEquipment: true },
                { name: "Red Light Green Light", tip: "Leader calls movements. FITNESS: Caught moving = 5 4-count pushups at start line, then rejoin.", noEquipment: true },
                { name: "Blob Tag", tip: "Tagged players join 'blob'. FITNESS: When blob catches 3+ people, everyone does 10 4-count jumping jacks, then restart.", noEquipment: true, preferredFacility: "openField" },
                { name: "Bear Crawl Relay", tip: "Teams bear crawl to cone and back. FITNESS: Slowest team does 10 4-count burpees.", noEquipment: true, preferredFacility: "openField" },
                { name: "Relay Races with PT", tip: "Sprint relays with PT stops. FITNESS: Each leg = sprint 50m → 10 4-count exercise → sprint back. Rotate: pushups, situps, squats, burpees.", noEquipment: true, preferredFacility: "track" },
                { name: "Track Sprints Competition", tip: "400m relay, 800m time trials. FITNESS: Losing team does 10 4-count exercise chosen by winners after each round.", noEquipment: true, preferredFacility: "track" },
                { name: "Mile Challenge", tip: "Team mile runs with PT penalties. FITNESS: Last team to finish does 15 4-count exercise chosen by winners.", noEquipment: true, preferredFacility: "track" },
                { name: "Fartlek Training Game", tip: "Swedish speed play with PT stations. FITNESS: After each sprint interval, group does 10 4-count exercise (rotating: burpees, mountain climbers, squat thrusts).", noEquipment: true, preferredFacility: "track" },
                { name: "Sprint Ladder Challenge", tip: "Leader calls 50-100-150-200m sprints. FITNESS: Last finishers do 10 4-count squats.", noEquipment: true, preferredFacility: "track" },
                { name: "Sharks and Minnows", tip: "Minnows sprint across while sharks tag. FITNESS: Tagged minnows do 10 4-count pushups before becoming sharks. Constant movement!", noEquipment: true, preferredFacility: "openField" },
                { name: "Capture the Territory", tip: "Mark zones, tag to score. FITNESS: Scored-on team does 10 4-count exercise chosen by scoring team. Play to 5 points.", noEquipment: true, preferredFacility: "openField" },
                { name: "Ultimate (No Disc)", tip: "Pass invisible 'disc' with hand touches. FITNESS: Scoring team picks exercise, defending team does 10 4-count reps. Play to 7.", noEquipment: true, preferredFacility: "openField" },
                { name: "Baseball Diamond Sprints with PT", tip: "Race around bases with PT stations. FITNESS: Each base = 5 4-count exercise (1st: pushups, 2nd: situps, 3rd: squats, home: burpees).", noEquipment: true, preferredFacility: "baseballField" },
                { name: "Pickle (No Ball)", tip: "Rundown drill between bases. FITNESS: Tagged runners do 10 4-count mountain climbers. Rotate taggers every 5 tags.", noEquipment: true, preferredFacility: "baseballField" },
                { name: "Simon Says PT", tip: "Leader calls exercises with 'Simon Says'. FITNESS: Caught without 'Simon Says' = 5 4-count penalty. All exercises 4-count!", noEquipment: true },
                { name: "Partner Wheelbarrow Races", tip: "One holds ankles, partner walks on hands. FITNESS: Losing teams do 10 4-count pushups. Switch partners, race again!", noEquipment: true },
                { name: "Steal the Bacon with PT", tip: "Race to grab object. FITNESS: Tagged players do 10 4-count exercise. Winning team picks next exercise. First to 10 points.", noEquipment: true },
                { name: "Team Elimination Sprint", tip: "Sprint to center line. FITNESS: Last team across loses one player AND does 10 4-count burpees. Eliminated players cheer!", noEquipment: true },
                { name: "Fitness Bingo", tip: "Complete exercises in bingo pattern. FITNESS: All exercises are 4-count. First team to complete row wins. Losers do 20 4-count burpees!", noEquipment: true },
                { name: "PT Station Circuit Race", tip: "8-10 stations, all 4-count exercises (10 reps each). Teams race through circuit. FITNESS: Losing team repeats final 2 stations!", noEquipment: true }
        ],
        indoor: [
                // Equipment-based games
                { name: "Basketball", tip: "Full court or half court games. Rotate teams every 10-15 min.", requires: "basketball" },
                { name: "Basketball Knockout", tip: "Players shoot from free throw. Miss and you're eliminated by player behind you. Last standing wins.", requires: "basketball" },
                { name: "Around the World", tip: "Basketball shooting game. Make shot from each spot around arc to advance. Miss twice = restart.", requires: "basketball" },
                { name: "Volleyball", tip: "Rally scoring to 25. Rotate servers. Modify net height as needed.", requires: "volleyball" },
                { name: "Dodgeball Variations", tip: "Doctor Dodgeball: One 'doctor' per team can revive teammates. Or Jailbreak: Catch ball to free teammates.", requires: "dodgeball" },
                { name: "Dodgeball", tip: "Soft balls only. Clear boundaries. Eliminated players do exercises on sideline.", requires: "dodgeball" },
                { name: "Bombardment", tip: "Dodgeball meets bowling. Hit cones behind opponent's line to win. 3 balls per side.", requires: "dodgeball", link: "https://www.youtube.com/watch?v=JQbqfK5Z8_A" },
                { name: "Floor Hockey", tip: "Plastic sticks and puck. No high sticking. Rotate goalies.", requires: "hockey" },
                { name: "Free-Throw Fitness", tip: "Missed free throw = 5 4-count pushups. Make 3 in a row to clear.", requires: "basketball" },
                // No-equipment games (with facility preferences)
                { name: "Octopus Tag", tip: "Tagger in middle can only pivot on one foot. Others run past. Tagged join as octopi.", noEquipment: true },
                { name: "Fitness Tag", tip: "Tagged players do 10 pushups to get back in. Constant movement and exercise.", noEquipment: true },
                { name: "Musical Fitness", tip: "Music stops, everyone does called exercise. Fun and unpredictable.", noEquipment: true },
                { name: "Partner Exercises Circuit", tip: "Partner-based exercises: wheelbarrow, partner sit-ups, plank high-fives.", noEquipment: true },
                { name: "Mirror Drill", tip: "Partners face each other. One leads movements, other mirrors. Switch every 2 min.", noEquipment: true },
                { name: "Burpee Relay", tip: "Teams sprint to line, do 5 4-count burpees, tag next runner.", noEquipment: true },
                { name: "Line Drills", tip: "Use court lines for sprints, shuffles, carioca, high knees between lines.", noEquipment: true, preferredFacility: "basketballCourt" },
                { name: "Basketball Court Suicides", tip: "Sprint to each line and back. Baseline to free throw, half court, far free throw, baseline.", noEquipment: true, preferredFacility: "basketballCourt" },
                { name: "Plank High-Five Challenge", tip: "Pairs hold plank and alternate high-fives. Losers do 10 4-count mountain climbers.", noEquipment: true },
                { name: "Full Court Tag", tip: "Use basketball court boundaries. Can't cross out of bounds. Constant direction changes!", noEquipment: true, preferredFacility: "basketballCourt" },
                { name: "Volleyball Court Relay", tip: "Teams line up on each side. Sprint under net, tag teammate. Fast rotation relay.", noEquipment: true, preferredFacility: "volleyballCourt" },
                { name: "Ship Captain Crew", tip: "Leader calls commands (Port/Starboard/Captain's Coming). Last to respond is out.", noEquipment: true },
                { name: "Chain Tag", tip: "Tagged players join hands with tagger. Chain grows. Only end players can tag.", noEquipment: true },
                { name: "Fitness Dice", tip: "Giant foam dice with exercises on each side. Roll dice, whole team does that exercise.", noEquipment: true },
                { name: "Follow the Leader PT", tip: "Leader calls movements (burpees, jumping jacks, etc). Everyone follows. Rotate leaders every 3 min.", noEquipment: true }
        ]
    }
};

// Export for use in HTML files
// Note: For browsers without module support, these are also available as global variables
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { warmupExercises, preCardioWarmup, cooldownExercises, db };
}
