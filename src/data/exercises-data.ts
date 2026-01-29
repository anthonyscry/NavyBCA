// Auto-generated from exercises-data.js
// DO NOT EDIT MANUALLY — regenerate with: node scripts/exercises-to-ts.mjs

export interface Exercise {
  name: string
  tip?: string
  rep?: string
  desc?: string
  reps?: string
  duration?: string
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  muscleGroups?: string[]
  isCore?: boolean
  isFinisher?: boolean
  isLowImpact?: boolean
  howToPlay?: string
  teamSize?: string
  space?: string
  safety?: string
  noEquipment?: boolean
  preferredFacility?: string
}

export const warmupExercises: Exercise[] = [
  {name:"90/90 Stretch",tip:"Sit with both legs bent at 90°. Rotate torso toward front leg, then switch sides. Opens hips and improves internal/external rotation.",rep:"5 reps/side",muscleGroups:["hips","glutes"]},
  {name:"Pillar Bridge",tip:"Forearm plank position. Create straight line from ears to ankles. Squeeze glutes and brace core. Foundation for all movement.",rep:"20 sec hold",muscleGroups:["core","shoulders"]},
  {name:"Glute Bridge",tip:"Lie on back, knees bent, feet flat. Drive hips up by squeezing glutes. Hold 2 sec at top. Activates posterior chain.",rep:"10 reps",muscleGroups:["glutes","hamstrings"]},
  {name:"Bent Over T's",tip:"Hinge at hips, arms hanging. Raise arms out to sides forming a T. Squeeze shoulder blades together. Activates upper back.",rep:"10 reps",muscleGroups:["back","shoulders"]},
  {name:"Knee Hug",tip:"Standing, pull one knee to chest while rising onto toes of standing leg. Hold 2 sec. Stretches glutes and hip flexors.",rep:"5 reps/side",muscleGroups:["glutes","hip flexors"]},
  {name:"Reverse Lunge w/ Rotation",tip:"Step back into lunge, rotate torso over front leg. Opens hips while activating core. Great for thoracic mobility.",rep:"5 reps/side",muscleGroups:["quads","glutes","core"]},
  {name:"Heel-to-Glute w/ Reach",tip:"Standing, pull heel to glute while reaching opposite arm overhead. Stretches quads and hip flexors with balance challenge.",rep:"5 reps/side",muscleGroups:["quads","hip flexors"]},
  {name:"Squats",tip:"Feet shoulder-width, toes slightly out. Sit back and down, keeping chest tall. Thighs to parallel. Weight in heels.",rep:"10 reps",muscleGroups:["quads","glutes","hamstrings"]},
  {name:"Drop Squat to 2-inch Run",tip:"Quick drop into squat, then rapid small steps in place for 3 seconds. Elevates heart rate and primes nervous system.",rep:"2 reps (3s run)",muscleGroups:["quads","calves","core"]},
  {name:"Drop Squat to High Knees",tip:"Quick drop into squat, then high knees for 3 seconds. Transitions body from static to dynamic movement.",rep:"2 reps (3s high knees)",muscleGroups:["quads","hip flexors","core"]},
  {name:"Arm Circles",tip:"Arms extended, make circles starting small and gradually getting larger. Lubricates shoulder joints and increases blood flow.",rep:"10 forward, 10 backward",muscleGroups:["shoulders"]},
  {name:"Neck Rolls",tip:"Slowly roll head in circles, keeping shoulders relaxed. Don't force range of motion. Releases neck tension.",rep:"5 each direction",muscleGroups:["neck"]},
  {name:"Hip Circles",tip:"Hands on hips, make large circles with hips. Loosens hip joints and activates hip stabilizers. Keep upper body still.",rep:"10 each direction",muscleGroups:["hips","core"]},
  {name:"Leg Swings (Front/Back)",tip:"Hold wall for balance. Swing leg forward and back in controlled arc. Increases hip flexor and hamstring range of motion.",rep:"10 reps/side",muscleGroups:["hip flexors","hamstrings"]},
  {name:"Leg Swings (Side/Side)",tip:"Face wall, swing leg across body and out to side. Opens hip adductors and abductors. Keep upper body stable.",rep:"10 reps/side",muscleGroups:["hip adductors","hip abductors"]},
  {name:"World's Greatest Stretch",tip:"Lunge position, place same-side hand on ground, rotate and reach opposite arm to sky. The ultimate mobility exercise.",rep:"5 reps/side",muscleGroups:["hips","thoracic spine","shoulders"]},
  {name:"Cat-Cow",tip:"On all fours, alternate between arching back (cat) and dropping belly (cow). Mobilizes entire spine. Sync with breath.",rep:"10 reps",muscleGroups:["spine","core"]},
  {name:"Thoracic Rotation",tip:"On all fours, place one hand behind head. Rotate elbow toward opposite arm, then up to sky. Opens upper back.",rep:"8 reps/side",muscleGroups:["thoracic spine","core"]},
  {name:"Ankle Circles",tip:"Lift foot off ground, rotate ankle in circles. Prepares ankles for impact and improves mobility. Do both directions.",rep:"10 each direction",muscleGroups:["ankles","calves"]},
  {name:"Toy Soldiers",tip:"March forward, kicking straight leg up while reaching opposite hand to toes. Dynamic hamstring stretch with coordination.",rep:"10 reps/side",muscleGroups:["hamstrings","hip flexors"]},
  {name:"Jumping Jacks",tip:"Arms and legs out simultaneously, return to start. Classic warmup that elevates heart rate and coordinates full body.",rep:"20 reps",muscleGroups:["shoulders","calves","full body"]},
  {name:"Butt Kickers",tip:"Jog in place, kicking heels to glutes. Warms up hamstrings and gets blood flowing. Keep core engaged.",rep:"20 reps",muscleGroups:["hamstrings","quads"]},
  {name:"High Knees",tip:"Jog in place, driving knees high toward chest. Pump arms. Activates hip flexors and elevates heart rate.",rep:"20 reps",muscleGroups:["hip flexors","core","calves"]},
  {name:"Inchworms",tip:"Bend forward, walk hands out to plank, walk feet to hands, stand. Full body mobility and hamstring stretch.",rep:"5 reps",muscleGroups:["hamstrings","shoulders","core"]}
]

export const preCardioWarmup: Exercise[] = [
  {name:"Inverted Hamstring",tip:"Balance on one leg, hinge forward while raising other leg behind. Arms out for balance. Primes hamstrings for running.",rep:"5 reps/side",muscleGroups:["hamstrings","glutes","core"]},
  {name:"Leg Cradle",tip:"Standing, pull knee up and across body, cradling shin. Opens hip external rotators. Hold for 2 seconds each rep.",rep:"5 reps/side",muscleGroups:["glutes","hips"]},
  {name:"Linear March",tip:"Exaggerated walking motion, driving knee high and extending ankle. Focus on posture. Activates running mechanics.",rep:"10 yards",muscleGroups:["hip flexors","calves","core"]},
  {name:"Squat Jump Countermovement",tip:"Quick dip into quarter squat, explode up. Land soft, reset. Primes nervous system for explosive cardio.",rep:"5 reps",muscleGroups:["quads","glutes","calves"]},
  {name:"A-Skips",tip:"Skip with high knee drive and active foot strike. Exaggerate arm swing. Develops running coordination.",rep:"20 yards",muscleGroups:["hip flexors","calves"]},
  {name:"B-Skips",tip:"Skip with knee drive followed by leg extension and pawback. Primes hamstring for running stride.",rep:"20 yards",muscleGroups:["hamstrings","hip flexors"]},
  {name:"Carioca",tip:"Lateral movement crossing feet in front and behind. Rotate hips. Improves lateral mobility and coordination.",rep:"20 yards each way",muscleGroups:["hips","core","adductors"]},
  {name:"Lateral Shuffle",tip:"Athletic stance, shuffle sideways without crossing feet. Stay low. Activates hip abductors and glute medius.",rep:"20 yards each way",muscleGroups:["glutes","quads","adductors"]}
]

export const cooldownExercises: Exercise[] = [
  {name:"Chest Stretch",tip:"Clasp hands behind neck, pull elbows back. Opens chest and front shoulders. Breathe deeply into the stretch.",desc:"10 echo count",muscleGroups:["chest","shoulders"]},
  {name:"Posterior Shoulder Stretch",tip:"Pull arm across body with opposite hand. Feel stretch in back of shoulder. Keep shoulder down, don't shrug.",desc:"10 echo count/side",muscleGroups:["shoulders","back"]},
  {name:"Triceps Stretch",tip:"Reach behind back with elbow up, push elbow with opposite hand. Feel stretch in back of arm. Stand tall.",desc:"10 echo count/side",muscleGroups:["triceps"]},
  {name:"Hip Flexor Stretch",tip:"Lunge position, back knee down, push hips forward. Squeeze glute of back leg. Counteracts sitting.",desc:"10 echo count/side",muscleGroups:["hip flexors","quads"]},
  {name:"Groin/Butterfly Stretch",tip:"Seated with soles of feet together. Gently press knees toward ground. Sit tall, don't round back.",desc:"10 echo count",muscleGroups:["adductors","hips"]},
  {name:"Modified Hurdler Stretch",tip:"Seated V-position, one leg bent. Reach toward extended foot. Keep back straight, hinge from hips.",desc:"10 echo count/side",muscleGroups:["hamstrings","back"]},
  {name:"Outer Hip/Low Back Stretch",tip:"Seated twist with one leg crossed over. Rotate toward bent knee. Opens hips and relieves low back.",desc:"10 echo count/side",muscleGroups:["glutes","back","obliques"]},
  {name:"Piriformis Stretch",tip:"Lying down, cross ankle over opposite thigh, pull thigh toward chest. Targets deep hip rotators.",desc:"10 echo count/side",muscleGroups:["glutes","piriformis","hips"]},
  {name:"Low Back Stretch",tip:"Lying down, pull both knees to chest. Gently rock side to side. Releases low back tension.",desc:"10 echo count",muscleGroups:["back","glutes"]},
  {name:"Quadriceps Stretch",tip:"Standing or lying, pull heel to glute. Keep knees together. Squeeze glute for deeper stretch.",desc:"10 echo count/side",muscleGroups:["quads","hip flexors"]},
  {name:"Calf Stretch",tip:"Wall or push-up position, press heel toward ground. Keep leg straight for gastrocnemius, bent for soleus.",desc:"10 echo count/side",muscleGroups:["calves"]},
  {name:"Hamstring Stretch",tip:"Standing, place heel on elevated surface. Keep back straight, hinge forward at hips. Feel stretch behind thigh.",desc:"10 echo count/side",muscleGroups:["hamstrings"]},
  {name:"Lat Stretch",tip:"Grab overhead object, step back and push hips away. Feel stretch down side of back. Breathe into it.",desc:"10 echo count/side",muscleGroups:["lats","back"]},
  {name:"Neck Stretch",tip:"Tilt ear toward shoulder, gently press with hand. Keep opposite shoulder down. Release neck tension.",desc:"10 echo count/side",muscleGroups:["neck","traps"]},
  {name:"Child's Pose",tip:"Knees wide, sit back on heels, reach arms forward. Forehead to ground. Full body relaxation stretch.",desc:"30 seconds",muscleGroups:["back","shoulders","hips"]}
]

export interface ExerciseDb {
  strength: Record<string, Exercise[]>
  cardio: Record<string, Exercise[]>
  lowImpact: { strength: Record<string, Exercise[]>; cardio: Record<string, Exercise[]> }
  yoga: Exercise[]
  funday: Record<string, Exercise[]>
}

export const db: ExerciseDb = {
  strength: {
    bodyweight: [
      {name:"Standard Pushups",tip:"Keep core tight, elbows at 45°. Feel it in chest and triceps.",difficulty:"beginner",muscleGroups:["chest","triceps","shoulders","core"]},
      {name:"Wide-Arm Pushups",tip:"Hands wider than shoulders. Focus on chest stretch at bottom.",difficulty:"beginner",muscleGroups:["chest","shoulders"]},
      {name:"Diamond Pushups",tip:"Hands form diamond under chest. Triceps focus. Modify on knees if needed.",difficulty:"intermediate",muscleGroups:["triceps","chest","shoulders"]},
      {name:"Hand-Release Pushups",tip:"Chest touches deck, lift hands, then push. Full range of motion.",difficulty:"intermediate",muscleGroups:["chest","triceps","shoulders","back"]},
      {name:"Decline Pushups",tip:"Feet elevated. Increases shoulder and upper chest activation.",difficulty:"intermediate",muscleGroups:["chest","shoulders","triceps"]},
      {name:"Pike Pushups",tip:"Hips high, body in inverted V. Press head toward deck. Shoulder focus.",difficulty:"intermediate",muscleGroups:["shoulders","triceps","core"]},
      {name:"Archer Pushups",tip:"One arm extended to side, other arm does the work. Advanced unilateral strength.",difficulty:"advanced",muscleGroups:["chest","triceps","shoulders","core"]},
      {name:"Hindu Pushups",tip:"Flow from downward dog to cobra. Great for flexibility and strength.",difficulty:"intermediate",muscleGroups:["chest","shoulders","triceps","back","hips"]},
      {name:"Clapping Pushups",tip:"Explosive push, clap at top, soft landing. Power builder. Advanced only.",difficulty:"advanced",muscleGroups:["chest","triceps","shoulders"]},
      {name:"Spiderman Pushups",tip:"Bring knee to elbow as you descend. Core and hip mobility.",difficulty:"intermediate",muscleGroups:["chest","triceps","core","hips"],isCore:true},
      {name:"Standard Plank",tip:"Straight line ear to ankle. Don't sag hips. Engage core.",difficulty:"beginner",muscleGroups:["core","shoulders"],isCore:true},
      {name:"Side Plank (L/R)",tip:"Stack feet or stagger. Keep hips high. Feel obliques working.",difficulty:"beginner",muscleGroups:["obliques","core","shoulders"],isCore:true},
      {name:"Plank Shoulder Taps",tip:"In plank, tap opposite shoulder. Keep hips stable. Anti-rotation.",difficulty:"intermediate",muscleGroups:["core","shoulders","obliques"],isCore:true},
      {name:"Plank Up-Downs",tip:"Plank to pushup position and back. Control the movement.",difficulty:"intermediate",muscleGroups:["core","shoulders","triceps","chest"],isCore:true},
      {name:"Bird Dog",tip:"Opposite arm/leg extend. Keep back flat. Core stability.",difficulty:"beginner",muscleGroups:["core","back","glutes"],isCore:true},
      {name:"Dead Bug",tip:"Press low back into deck. Move slow and controlled.",difficulty:"beginner",muscleGroups:["core","hip flexors"],isCore:true},
      {name:"Hollow Body Hold",tip:"Lower back pressed to deck, arms and legs extended. Core killer.",difficulty:"intermediate",muscleGroups:["core","hip flexors"],isCore:true},
      {name:"V-Ups",tip:"Simultaneously lift legs and torso to form V. Control descent.",difficulty:"intermediate",muscleGroups:["core","hip flexors"],isCore:true},
      {name:"Bicycle Crunches",tip:"Opposite elbow to knee, rotate through core. Slow and controlled.",difficulty:"beginner",muscleGroups:["core","obliques"],isCore:true},
      {name:"Flutter Kicks",tip:"Lower back pressed down, alternate kicking legs. Core and hip flexors.",difficulty:"beginner",muscleGroups:["core","hip flexors"],isCore:true},
      {name:"Air Squats",tip:"Weight in heels, knees track toes. Thighs parallel. Core tight.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Walking Lunges",tip:"Chest up, front knee behind toes. Feel glutes and quads.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Reverse Lunges",tip:"Step backward into lunge. More knee-friendly than forward lunges.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Lateral Lunges",tip:"Step to side, sit back into hip. Inner thigh and glutes.",difficulty:"beginner",muscleGroups:["quads","glutes","adductors"]},
      {name:"Split Squats",tip:"Feet staggered, lower straight down. Keep front knee behind toes.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Jump Squats",tip:"Explosive jump from squat position. Land soft, reset, repeat.",difficulty:"intermediate",muscleGroups:["quads","glutes","calves"]},
      {name:"Box Jumps (Step-up Alternative)",tip:"Jump onto elevated surface. Step down to protect knees.",difficulty:"intermediate",muscleGroups:["quads","glutes","calves"]},
      {name:"Single-Leg RDL",tip:"Balance on one leg, hinge forward. Hamstring and balance.",difficulty:"intermediate",muscleGroups:["hamstrings","glutes","core"]},
      {name:"Calf Raises",tip:"Full extension at top, slow lower. Feel the burn in calves.",difficulty:"beginner",muscleGroups:["calves"]},
      {name:"Wall Sit",tip:"Thighs parallel, back flat on wall. Quads should burn.",difficulty:"beginner",muscleGroups:["quads"]},
      {name:"Glute Bridges",tip:"Squeeze glutes at top. Don't hyperextend back.",difficulty:"beginner",muscleGroups:["glutes","hamstrings"]},
      {name:"Single-Leg Glute Bridge",tip:"One leg extended, drive through planted heel. Unilateral strength.",difficulty:"intermediate",muscleGroups:["glutes","hamstrings","core"]},
      {name:"Superman Hold",tip:"Lie face down, lift arms and legs. Lower back and glutes.",difficulty:"beginner",muscleGroups:["back","glutes"],isCore:true},
      {name:"Prone Cobra",tip:"Face down, arms at sides, lift chest. Squeeze shoulder blades.",difficulty:"beginner",muscleGroups:["back","shoulders"]},
      {name:"Squat Hold",tip:"Hold bottom of squat position. Build endurance and mobility.",difficulty:"beginner",muscleGroups:["quads","glutes"]},
      {name:"Inchworms",tip:"Walk hands out to plank, walk feet to hands. Full body mobility.",difficulty:"beginner",muscleGroups:["hamstrings","shoulders","core"]},
      {name:"Burpees",tip:"Squat, jump back to plank, pushup, jump forward, jump up. Full body power.",difficulty:"intermediate",muscleGroups:["full body","chest","quads","core"]},
      {name:"Mountain Climbers",tip:"Plank position, drive knees to chest alternating. Keep hips level.",difficulty:"beginner",muscleGroups:["core","shoulders","hip flexors"],isCore:true},
      {name:"Bear Crawls",tip:"Crawl forward on hands and feet, knees low. Core and coordination.",difficulty:"intermediate",muscleGroups:["shoulders","core","quads"],isCore:true},
      {name:"Crab Walks",tip:"Face up, walk on hands and feet. Triceps and core engagement.",difficulty:"beginner",muscleGroups:["triceps","shoulders","core","glutes"]},
      {name:"Tricep Dips (Floor)",tip:"Hands behind you, dip down and press up. Keep elbows back.",difficulty:"beginner",muscleGroups:["triceps","shoulders"]},
      {name:"Donkey Kicks",tip:"On all fours, kick leg back and up. Squeeze glute at top.",difficulty:"beginner",muscleGroups:["glutes"]},
      {name:"Fire Hydrants",tip:"On all fours, lift leg to side. Hip abductor activation.",difficulty:"beginner",muscleGroups:["glutes","hip abductors"]},
      {name:"Pistol Squat Progressions",tip:"Single leg squat, other leg extended. Use support as needed.",difficulty:"advanced",muscleGroups:["quads","glutes","core"]},
      {name:"Tuck Jumps",tip:"Jump and bring knees to chest. Land soft, immediate jump.",difficulty:"intermediate",muscleGroups:["quads","calves","core"]},
      {name:"Star Jumps",tip:"Jump spreading arms and legs wide like a star. Explosive power.",difficulty:"beginner",muscleGroups:["quads","shoulders","calves"]}
],
    bands: [
      {name:"Band Pull-Aparts",tip:"Arms straight, squeeze shoulder blades together. Upper back.",difficulty:"beginner",muscleGroups:["back","rear delts","rhomboids"]},
      {name:"Band Bicep Curls",tip:"Elbows pinned to sides. Control the negative.",difficulty:"beginner",muscleGroups:["biceps"]},
      {name:"Band Overhead Press",tip:"Press straight up, don't flare elbows. Core engaged.",difficulty:"beginner",muscleGroups:["shoulders","triceps"]},
      {name:"Band Squats",tip:"Band above knees pushes them out. Focus on glute engagement.",difficulty:"beginner",muscleGroups:["quads","glutes"]},
      {name:"Band Rows",tip:"Pull to ribcage, squeeze shoulder blades. Feel upper back.",difficulty:"beginner",muscleGroups:["back","biceps","rear delts"]},
      {name:"Band Tricep Extensions",tip:"Keep elbows high and stable. Squeeze at extension.",difficulty:"beginner",muscleGroups:["triceps"]},
      {name:"Band Lateral Walks",tip:"Stay low in squat. Feel glute medius on outer hip.",difficulty:"beginner",muscleGroups:["glutes","hip abductors"]},
      {name:"Band Face Pulls",tip:"Pull to face, elbows high. Rear delts and rotator cuff.",difficulty:"beginner",muscleGroups:["rear delts","rotator cuff","back"]},
      {name:"Band Chest Press",tip:"Anchor behind, press forward. Chest and triceps.",difficulty:"beginner",muscleGroups:["chest","triceps","shoulders"]},
      {name:"Band Pallof Press",tip:"Resist rotation, press away from body. Core anti-rotation.",difficulty:"intermediate",muscleGroups:["core","obliques"],isCore:true},
      {name:"Band Good Mornings",tip:"Band on shoulders, hinge at hips. Hamstrings and glutes.",difficulty:"intermediate",muscleGroups:["hamstrings","glutes","back"]},
      {name:"Band Deadlifts",tip:"Stand on band, hinge and drive up. Hip hinge pattern.",difficulty:"beginner",muscleGroups:["hamstrings","glutes","back"]},
      {name:"Band Monster Walks",tip:"Band above knees, walk forward with wide steps. Glute activation.",difficulty:"beginner",muscleGroups:["glutes","hip abductors"]},
      {name:"Band Clamshells",tip:"Lying on side, open knees against band. Hip external rotators.",difficulty:"beginner",muscleGroups:["glutes","hip abductors"]},
      {name:"Band Woodchops",tip:"Rotate through core, low to high or high to low. Obliques.",difficulty:"intermediate",muscleGroups:["obliques","core","shoulders"],isCore:true},
      {name:"Band Reverse Flyes",tip:"Bent over, pull band apart. Rear delts and upper back.",difficulty:"beginner",muscleGroups:["rear delts","back"]},
      {name:"Band Hip Abduction",tip:"Stand on one leg, push other leg out against band.",difficulty:"beginner",muscleGroups:["glutes","hip abductors"]},
      {name:"Band Glute Kickbacks",tip:"Loop band around ankles, kick back against resistance.",difficulty:"beginner",muscleGroups:["glutes","hamstrings"]}
],
    pullup: [
      {name:"Pull-ups",tip:"Overhand grip. Pull chest to bar, control down. Lats and back.",difficulty:"intermediate",muscleGroups:["lats","back","biceps","forearms"]},
      {name:"Chin-ups",tip:"Underhand grip. More bicep involvement. Chin over bar.",difficulty:"intermediate",muscleGroups:["biceps","lats","back"]},
      {name:"Negative Pull-ups",tip:"Jump to top, lower slow (3-5 sec). Build pulling strength.",difficulty:"beginner",muscleGroups:["lats","back","biceps"]},
      {name:"Wide-Grip Pull-ups",tip:"Hands wider than shoulders. Emphasizes outer lats.",difficulty:"intermediate",muscleGroups:["lats","back","rear delts"]},
      {name:"Close-Grip Pull-ups",tip:"Hands close together. More mid-back and bicep focus.",difficulty:"intermediate",muscleGroups:["back","biceps","lats"]},
      {name:"Commando Pull-ups",tip:"Hands staggered inline, alternate sides. Unilateral strength.",difficulty:"advanced",muscleGroups:["lats","biceps","core"]},
      {name:"L-Sit Pull-ups",tip:"Hold legs at 90° while pulling. Core and grip intensive.",difficulty:"advanced",muscleGroups:["lats","core","hip flexors","biceps"],isCore:true},
      {name:"Hanging Leg Raises",tip:"Legs together, no swinging. Core and hip flexors.",difficulty:"intermediate",muscleGroups:["core","hip flexors","forearms"],isCore:true},
      {name:"Hanging Knee Raises",tip:"Knees to chest while hanging. Easier than leg raises.",difficulty:"beginner",muscleGroups:["core","hip flexors"],isCore:true},
      {name:"Toes to Bar",tip:"Swing legs to touch bar. CrossFit standard. Requires kip.",difficulty:"advanced",muscleGroups:["core","hip flexors","lats"],isCore:true},
      {name:"Windshield Wipers",tip:"Legs up, rotate side to side. Advanced oblique work.",difficulty:"advanced",muscleGroups:["obliques","core","hip flexors"],isCore:true},
      {name:"Dead Hangs",tip:"Relax shoulders, decompress spine. Grip strength builder.",difficulty:"beginner",muscleGroups:["forearms","shoulders"]},
      {name:"Scapular Pull-ups",tip:"Hang and retract scapula only. Builds foundation for pull-ups.",difficulty:"beginner",muscleGroups:["back","lats"]},
      {name:"Muscle-up Progressions",tip:"Pull high, transition over bar. Advanced movement.",difficulty:"advanced",muscleGroups:["lats","chest","triceps","core"]},
      {name:"Typewriter Pull-ups",tip:"At top, shift side to side. Advanced lat isolation.",difficulty:"advanced",muscleGroups:["lats","biceps","core"]},
      {name:"Assisted Pull-ups",tip:"Use band or partner for assistance. Build to unassisted.",difficulty:"beginner",muscleGroups:["lats","back","biceps"]}
],
    kettlebells: [
      {name:"Kettlebell Swings",tip:"Hinge at hips, not squat. Power from glutes. Arms are just hooks.",difficulty:"intermediate",muscleGroups:["glutes","hamstrings","back","core"]},
      {name:"Single-Arm KB Swing",tip:"One arm at a time. Trains anti-rotation. Alternate sides.",difficulty:"intermediate",muscleGroups:["glutes","hamstrings","core","shoulders"],isCore:true},
      {name:"Goblet Squats",tip:"Hold KB at chest. Elbows inside knees. Deep squat.",difficulty:"beginner",muscleGroups:["quads","glutes","core"]},
      {name:"KB Deadlifts",tip:"Hinge at hips, flat back. Drive through heels.",difficulty:"beginner",muscleGroups:["hamstrings","glutes","back"]},
      {name:"KB Rows",tip:"One arm at a time. Pull to hip, squeeze lat.",difficulty:"beginner",muscleGroups:["back","lats","biceps"]},
      {name:"KB Lunges",tip:"Hold KB at chest or sides. Control the descent.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"KB Clean",tip:"Swing to rack position. Keep bell close to body. Wrist neutral.",difficulty:"intermediate",muscleGroups:["shoulders","back","core","forearms"]},
      {name:"KB Press",tip:"From rack, press overhead. Keep core tight.",difficulty:"beginner",muscleGroups:["shoulders","triceps","core"]},
      {name:"KB Clean and Press",tip:"Combine clean and press in one fluid motion. Full body power.",difficulty:"intermediate",muscleGroups:["shoulders","back","core","glutes"]},
      {name:"KB Turkish Get-Up",tip:"Lie to stand with KB overhead. Mobility and stability. Go slow!",difficulty:"advanced",muscleGroups:["full body","core","shoulders"],isCore:true},
      {name:"KB Snatch",tip:"Swing to overhead in one motion. Power and coordination.",difficulty:"advanced",muscleGroups:["shoulders","back","glutes","core"]},
      {name:"KB Windmill",tip:"KB overhead, hinge to side. Hip and shoulder mobility.",difficulty:"intermediate",muscleGroups:["obliques","shoulders","hips"],isCore:true},
      {name:"KB Halo",tip:"Circle KB around head. Shoulder mobility and stability.",difficulty:"beginner",muscleGroups:["shoulders","core"]},
      {name:"KB Figure 8",tip:"Pass KB around and between legs. Coordination and grip.",difficulty:"intermediate",muscleGroups:["core","forearms","glutes"],isCore:true},
      {name:"KB Farmer Carry",tip:"Walk with KBs at sides. Grip, core, and posture.",difficulty:"beginner",muscleGroups:["forearms","core","traps"],isCore:true},
      {name:"KB Rack Carry",tip:"KB in rack position, walk. Core anti-rotation.",difficulty:"intermediate",muscleGroups:["core","shoulders","forearms"],isCore:true},
      {name:"KB Sumo Deadlift",tip:"Wide stance, KB between feet. Inner thighs and glutes.",difficulty:"beginner",muscleGroups:["glutes","adductors","hamstrings"]},
      {name:"KB Thruster",tip:"Squat to overhead press in one motion. Leg and shoulder power.",difficulty:"intermediate",muscleGroups:["quads","shoulders","core","glutes"]},
      {name:"KB Renegade Rows",tip:"Plank position with KBs, alternate rows. Core and back.",difficulty:"advanced",muscleGroups:["back","core","biceps"],isCore:true},
      {name:"KB High Pull",tip:"Explosive pull from hang to chest height. Power movement.",difficulty:"intermediate",muscleGroups:["back","shoulders","glutes"]}
],
    dumbbells: [
      {name:"Dumbbell Rows",tip:"One hand on bench. Pull to hip, squeeze back.",difficulty:"beginner",muscleGroups:["back","lats","biceps"]},
      {name:"Renegade Rows",tip:"Plank position, alternate rows. Core and back.",difficulty:"advanced",muscleGroups:["back","core","biceps"],isCore:true},
      {name:"DB Overhead Press",tip:"Start at shoulders, press straight up. Don't arch back.",difficulty:"beginner",muscleGroups:["shoulders","triceps"]},
      {name:"Arnold Press",tip:"Rotate palms as you press. Full shoulder development.",difficulty:"intermediate",muscleGroups:["shoulders","triceps"]},
      {name:"DB Lateral Raises",tip:"Slight bend in elbows, raise to shoulder height. Side delts.",difficulty:"beginner",muscleGroups:["shoulders"]},
      {name:"DB Front Raises",tip:"Alternating or together, raise to eye level. Front delts.",difficulty:"beginner",muscleGroups:["shoulders"]},
      {name:"DB Rear Delt Flyes",tip:"Bent over, raise arms to sides. Rear delts and upper back.",difficulty:"beginner",muscleGroups:["rear delts","back"]},
      {name:"DB Lunges",tip:"DBs at sides. Step forward, control down and up.",difficulty:"beginner",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"DB Romanian Deadlift",tip:"DBs in front, hinge at hips. Hamstrings and glutes.",difficulty:"intermediate",muscleGroups:["hamstrings","glutes","back"]},
      {name:"DB Curls",tip:"No swinging. Elbows pinned. Full range of motion.",difficulty:"beginner",muscleGroups:["biceps"]},
      {name:"Hammer Curls",tip:"Palms facing in. Targets brachialis and forearms.",difficulty:"beginner",muscleGroups:["biceps","forearms"]},
      {name:"Concentration Curls",tip:"Seated, elbow on thigh. Isolate the bicep.",difficulty:"beginner",muscleGroups:["biceps"]},
      {name:"DB Tricep Extensions",tip:"One or both hands overhead. Lower behind head, extend.",difficulty:"beginner",muscleGroups:["triceps"]},
      {name:"DB Skull Crushers",tip:"Lying down, lower to forehead. Tricep isolation.",difficulty:"intermediate",muscleGroups:["triceps"]},
      {name:"DB Kickbacks",tip:"Bent over, extend arm back. Squeeze tricep at top.",difficulty:"beginner",muscleGroups:["triceps"]},
      {name:"DB Thrusters",tip:"Squat to press in one motion. Full body power.",difficulty:"intermediate",muscleGroups:["quads","shoulders","core","glutes"]},
      {name:"DB Farmer Carry",tip:"Walk with DBs at sides. Grip and core stability.",difficulty:"beginner",muscleGroups:["forearms","core","traps"],isCore:true},
      {name:"DB Goblet Squat",tip:"Hold one DB at chest, squat deep. Leg and core.",difficulty:"beginner",muscleGroups:["quads","glutes","core"]},
      {name:"DB Step-Ups",tip:"DBs at sides, step onto box. Unilateral leg strength.",difficulty:"beginner",muscleGroups:["quads","glutes"]},
      {name:"DB Pullover",tip:"Lying on bench, lower DB behind head. Lats and chest.",difficulty:"intermediate",muscleGroups:["lats","chest","triceps"]},
      {name:"DB Shrugs",tip:"Heavy DBs, shrug shoulders to ears. Upper traps.",difficulty:"beginner",muscleGroups:["traps"]},
      {name:"DB Floor Press",tip:"Lying on floor, press up. Great for chest and lockout.",difficulty:"beginner",muscleGroups:["chest","triceps"]},
      {name:"DB Woodchop",tip:"Rotate through core from low to high. Oblique power.",difficulty:"intermediate",muscleGroups:["obliques","core","shoulders"],isCore:true},
      {name:"DB Reverse Lunge to Curl",tip:"Lunge back, curl at bottom. Full body combo.",difficulty:"intermediate",muscleGroups:["quads","glutes","biceps"]}
],
    barbell: [
      {name:"Barbell Deadlift",tip:"Hinge at hips, flat back. Bar close to body. Drive through heels.",difficulty:"intermediate",muscleGroups:["hamstrings","glutes","back","core"]},
      {name:"Barbell Back Squat",tip:"Bar on upper back, not neck. Depth to parallel or below.",difficulty:"intermediate",muscleGroups:["quads","glutes","hamstrings","core"]},
      {name:"Barbell Front Squat",tip:"Elbows high, bar on shoulders. Keep torso upright.",difficulty:"intermediate",muscleGroups:["quads","core","glutes"],isCore:true},
      {name:"Barbell Overhead Press",tip:"Start at shoulders, press straight up. Squeeze glutes for stability.",difficulty:"intermediate",muscleGroups:["shoulders","triceps","core"]},
      {name:"Barbell Bent Over Row",tip:"Hinge forward 45°, pull to belly button. Squeeze back.",difficulty:"intermediate",muscleGroups:["back","lats","biceps"]},
      {name:"Barbell RDL",tip:"Slight knee bend, hinge at hips. Feel hamstrings stretch.",difficulty:"intermediate",muscleGroups:["hamstrings","glutes","back"]},
      {name:"Barbell Lunges",tip:"Bar on back, step forward. Keep torso upright.",difficulty:"intermediate",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Barbell Floor Press",tip:"Lying on floor, press up. Great for triceps and lockout strength.",difficulty:"intermediate",muscleGroups:["chest","triceps","shoulders"]},
      {name:"Barbell Hip Thrust",tip:"Upper back on bench, bar on hips. Squeeze glutes at top.",difficulty:"intermediate",muscleGroups:["glutes","hamstrings"]},
      {name:"Barbell Good Mornings",tip:"Bar on back, hinge forward. Feel hamstrings and low back.",difficulty:"intermediate",muscleGroups:["hamstrings","back","glutes"]},
      {name:"Barbell Curl",tip:"Strict form, elbows pinned. Control the negative.",difficulty:"beginner",muscleGroups:["biceps"]},
      {name:"Barbell Skull Crusher",tip:"Lower to forehead, press back up. Tricep isolation.",difficulty:"intermediate",muscleGroups:["triceps"]},
      {name:"Barbell Push Press",tip:"Dip and drive with legs to press overhead. Power movement.",difficulty:"intermediate",muscleGroups:["shoulders","triceps","quads"]},
      {name:"Barbell Power Clean",tip:"Explosive pull from floor to rack. Olympic lift foundation.",difficulty:"advanced",muscleGroups:["full body","back","shoulders","glutes"]}
],
    flatBench: [
      {name:"Dumbbell Bench Press",tip:"DBs at chest level, press up and together. Control the negative.",difficulty:"beginner",muscleGroups:["chest","triceps","shoulders"]},
      {name:"Dumbbell Flyes",tip:"Slight elbow bend, lower wide. Feel chest stretch.",difficulty:"intermediate",muscleGroups:["chest"]},
      {name:"Bench Step-Ups",tip:"Drive through front heel. Alternate legs.",difficulty:"beginner",muscleGroups:["quads","glutes"]},
      {name:"Bench Hip Thrusts",tip:"Upper back on bench, drive hips up. Squeeze glutes.",difficulty:"beginner",muscleGroups:["glutes","hamstrings"]},
      {name:"Incline Push-ups",tip:"Hands on bench, easier angle. Good for beginners.",difficulty:"beginner",muscleGroups:["chest","triceps","shoulders"]},
      {name:"Bench Tricep Dips",tip:"Hands on edge, lower body. Elbows back, not out.",difficulty:"beginner",muscleGroups:["triceps","shoulders"]},
      {name:"Single-Leg Bench Squats",tip:"One foot on bench behind, squat on front leg. Bulgarian split squat.",difficulty:"intermediate",muscleGroups:["quads","glutes","hamstrings"]},
      {name:"Decline Push-ups (Feet on Bench)",tip:"Feet elevated on bench, hands on floor. Upper chest focus.",difficulty:"intermediate",muscleGroups:["chest","shoulders","triceps"]},
      {name:"Box Jumps (Bench)",tip:"Jump onto bench, step down. Explosive leg power.",difficulty:"intermediate",muscleGroups:["quads","glutes","calves"]}
],
    adjBench: [
      {name:"Incline Dumbbell Press",tip:"Bench at 30-45°. Press up from upper chest.",difficulty:"beginner",muscleGroups:["chest","shoulders","triceps"]},
      {name:"Incline Dumbbell Flyes",tip:"Bench at 30°, arms wide. Upper chest focus.",difficulty:"intermediate",muscleGroups:["chest"]},
      {name:"Seated Shoulder Press",tip:"Bench upright, press dumbbells overhead.",difficulty:"beginner",muscleGroups:["shoulders","triceps"]},
      {name:"Incline Dumbbell Rows",tip:"Chest on incline bench, pull DBs up. Upper back focus.",difficulty:"beginner",muscleGroups:["back","lats","biceps"]},
      {name:"Decline Push-ups",tip:"Feet on bench. Increases difficulty and shoulder engagement.",difficulty:"intermediate",muscleGroups:["chest","shoulders","triceps"]},
      {name:"Seated Incline Curls",tip:"Bench at 45°, curl with stretch at bottom.",difficulty:"beginner",muscleGroups:["biceps"]},
      {name:"Prone Y-T-W Raises",tip:"Lie face down on incline, raise arms in Y, T, W patterns. Shoulder health.",difficulty:"beginner",muscleGroups:["rear delts","rotator cuff","back"]},
      {name:"Decline Dumbbell Press",tip:"Bench declined, press for lower chest focus.",difficulty:"intermediate",muscleGroups:["chest","triceps"]},
      {name:"Incline Tricep Extensions",tip:"Bench at 45°, skull crushers with stretch.",difficulty:"intermediate",muscleGroups:["triceps"]}
],
    sled: [
      {name:"Sled Push (High Handles)",tip:"Arms extended, drive with legs. Stay low and powerful.",difficulty:"intermediate",muscleGroups:["quads","glutes","core"]},
      {name:"Sled Push (Low Handles)",tip:"Hands low, chest down. More quad and glute drive.",difficulty:"intermediate",muscleGroups:["quads","glutes","shoulders"]},
      {name:"Sled Pull (Backward)",tip:"Face sled, pull toward you walking backward. Quads burn.",difficulty:"intermediate",muscleGroups:["quads","calves"]},
      {name:"Sled Drag (Forward)",tip:"Strap around waist, walk forward. Great for conditioning.",difficulty:"beginner",muscleGroups:["glutes","hamstrings","core"]},
      {name:"Sled Row",tip:"Face sled, row handle to chest. Upper back and biceps.",difficulty:"intermediate",muscleGroups:["back","biceps","lats"]},
      {name:"Sled Sprint",tip:"Explosive push for 20-40 yards. Max effort.",difficulty:"advanced",muscleGroups:["quads","glutes","calves","core"]},
      {name:"Sled Lateral Drag",tip:"Side-shuffle while dragging sled. Hip and lateral strength.",difficulty:"intermediate",muscleGroups:["glutes","hip abductors","quads"]},
      {name:"Sled Bear Crawl Push",tip:"Bear crawl position, push sled. Full body challenge.",difficulty:"advanced",muscleGroups:["shoulders","core","quads"],isCore:true}
],
  },
  cardio: {
    indoor: [
      {name:"High Knees (March/Run)",tip:"Drive knees up, pump arms. Keep core engaged.",reps:"30-45 seconds"},
      {name:"Fast Feet Drill",tip:"Quick, light steps. Stay on balls of feet.",reps:"30 seconds"},
      {name:"Seal Jacks",tip:"Arms out front instead of overhead. Low impact option.",reps:"20-30 reps"},
      {name:"Mountain Climbers (Controlled)",tip:"Hips level with shoulders. Alternate knees to chest.",reps:"20-30 reps"},
      {name:"Skater Jumps",tip:"Lateral jump, land soft. Touch opposite hand to foot.",reps:"10-15 per side"},
      {name:"Burpees (No Push-up)",tip:"Squat, jump back to plank, hop forward, stand. Modify as needed.",reps:"10-15 reps"},
      {name:"Lateral Shuffles",tip:"Stay low, quick side-to-side movement. 10 yards each direction.",reps:"30-45 seconds"},
      {name:"Jog (Gym Laps)",tip:"1 lap around gym/basketball court. Light on feet, steady pace.",reps:"2-4 laps",isFinisher:true}
],
    outdoor: [
      {name:"Sprint Intervals (100m)",tip:"Max effort sprint, walk 100m recovery. Repeat.",reps:"4-6 sprints"},
      {name:"Shuttle Runs (25yd)",tip:"Touch line at each end. Explode out of turns.",reps:"4-6 shuttles"},
      {name:"Hill Repeats",tip:"Sprint up, walk down. Drive knees on incline.",reps:"4-6 repeats"},
      {name:"Linear Skips",tip:"Exaggerated skip, drive knee high. 25-50 yards.",reps:"2-4 lengths"},
      {name:"Track Run (Steady State)",tip:"1 lap around the track at consistent pace. Breathe rhythmically.",reps:"1-2 laps",isFinisher:true},
      {name:"400m Run",tip:"1 lap around the track at moderate pace. Control breathing.",reps:"1 lap",isFinisher:true},
      {name:"Warrior Run (Last Runner Up)",tip:"Jog in formation, last person sprints to front. Repeat.",reps:"5-10 min",isFinisher:true}
],
    jumprope: [
      {name:"Jump Rope (2 min)",tip:"Light bounces, wrists turn rope. Stay relaxed.",reps:"2 min"},
      {name:"Jump Rope High Knees",tip:"Alternate high knees while jumping. Cardio + core.",reps:"1 min"},
      {name:"Double Unders",tip:"Higher jump, faster wrist spin. Advanced skill.",reps:"20-30 reps"},
      {name:"Jump Rope Intervals",tip:"30s fast, 30s easy. Build endurance.",reps:"3-4 rounds"}
],
    assaultBike: [
      {name:"Assault Bike Intervals",tip:"15-30s max effort with full recovery. Push and pull with arms.",reps:"15-30s on / 45-60s rest x 6-8"},
      {name:"Assault Bike Sprints",tip:"All-out effort, take full rest between. It's a killer!",reps:"20-30s sprint / 60s rest x 5-6"},
      {name:"Assault Bike Steady State",tip:"Moderate pace, keep RPM consistent.",reps:"3-5 min",isFinisher:true},
      {name:"Assault Bike Tabata",tip:"Maximum intensity. Take extra rest between sets if needed.",reps:"20s on / 10s off x 8 (rest 2 min, repeat)"},
      {name:"Assault Bike Calorie Sprints",tip:"Sprint to hit target calories, rest fully between rounds.",reps:"10 cal sprint / 60s rest x 5-6 rounds"}
],
    rower: [
      {name:"Rowing Intervals (500m)",tip:"500m hard, 1 min rest. Drive with legs first.",reps:"500m x 4-6 intervals"},
      {name:"Rowing Sprints (250m)",tip:"All-out effort for 250m, rest 1 min between.",reps:"250m x 5-6 sprints"},
      {name:"Rowing Steady State (2000m)",tip:"Moderate pace 18-22 strokes/min. Focus on form.",reps:"2000m",isFinisher:true},
      {name:"Rowing Pyramid",tip:"250m-500m-750m-500m-250m. Control pace on longer pieces.",reps:"2250m total"},
      {name:"Rowing 1000m",tip:"Build pace throughout. Sprint last 200m.",reps:"1000m"}
],
    cycle: [
      {name:"Cycling Intervals",tip:"1 min high resistance, 1 min low. Maintain cadence.",reps:"6-8 rounds"},
      {name:"Cycling Sprints",tip:"30s max speed, 30s easy. Seated or standing.",reps:"6-8 sprints"},
      {name:"Cycling Steady State",tip:"Moderate resistance, consistent pace. Good recovery.",reps:"5-10 min",isFinisher:true},
      {name:"Cycling Hills",tip:"Increase resistance, stand and climb. 1 min on, 1 min off.",reps:"5-6 hills"},
      {name:"Cycling Tabata",tip:"20s sprint, 10s rest x 8. High cadence.",reps:"4 min"}
],
    bicycle: [
      {name:"Team Bike Ride",tip:"Easy-moderate pace to stay with the group.",reps:"10-15 min",isFinisher:true},
      {name:"Bike Ride Intervals",tip:"2 min steady, 1 min easy spin. Stay smooth.",reps:"6-8 rounds"},
      {name:"Bike Hill Climbs",tip:"Find a short hill, climb strong, easy coast down.",reps:"4-6 climbs"}
],
    treadmill: [
      {name:"Treadmill Intervals",tip:"1 min sprint, 1 min walk. Adjust speed for ability.",reps:"6-8 rounds"},
      {name:"Treadmill Sprints",tip:"30s at 80-90% effort, 30s rest. Hold rails to hop on/off.",reps:"6-8 sprints"},
      {name:"Incline Walk",tip:"10-15% incline, moderate pace. Great for glutes and calves.",reps:"5-10 min",isFinisher:true},
      {name:"Treadmill Run",tip:"Steady pace jog. Focus on breathing rhythm.",reps:"5-10 min",isFinisher:true},
      {name:"Incline Sprints",tip:"5-8% incline, sprint 20s, rest 40s. Power builder.",reps:"5-6 sprints"}
],
    swimming: [
      {name:"Freestyle Laps",tip:"Steady pace freestyle. Focus on smooth stroke and bilateral breathing.",reps:"500m steady",isFinisher:true},
      {name:"Freestyle Intervals",tip:"50m sprint, 20s rest. Maintain form at speed.",reps:"8-10 x 50m"},
      {name:"Freestyle Sprints",tip:"25m all-out effort, full recovery between.",reps:"6-8 x 25m"},
      {name:"Breaststroke Laps",tip:"Steady breaststroke. Good for active recovery or variety.",reps:"200-400m"},
      {name:"Backstroke Laps",tip:"Focus on hip rotation and steady kick. Shoulder-friendly option.",reps:"200-400m"},
      {name:"Mixed Stroke Pyramid",tip:"100m free, 75m breast, 50m back, 25m fly (or free). Build up and down.",reps:"500m total"},
      {name:"Kick Board Laps",tip:"Flutter kick with board. Builds leg endurance and kick power.",reps:"200-400m"},
      {name:"Pull Buoy Laps",tip:"Upper body focus. Keep legs still, power from arms.",reps:"200-400m"},
      {name:"Underwater Swim",tip:"Breath hold and streamline glide. Build lung capacity. Safety first!",reps:"4-6 x 15m"},
      {name:"Treading Water",tip:"Vertical in deep end. Hands out of water for challenge.",reps:"2-5 min continuous"},
      {name:"Combat Sidestroke (CSS)",tip:"Navy swim standard. Head low, efficient stroke. Practice breathing.",reps:"500m steady",isFinisher:true},
      {name:"CSS Intervals",tip:"100m CSS at goal pace, 30s rest. Build speed and efficiency.",reps:"5-8 x 100m"},
      {name:"Pool Running",tip:"Deep water running with flotation belt. Zero impact cardio.",reps:"10-15 min"},
      {name:"Buddy Tow Drill",tip:"Tow partner across pool. Rescue swim practice. Switch roles.",reps:"4-6 lengths"}
],
  },
  lowImpact: {
    strength: {
      bodyweight: [
        {name:"Standard Pushups",tip:"Keep core tight, elbows at 45°. Modify on knees if needed."},
        {name:"Incline Push-ups",tip:"Hands on bench or wall. Easier angle for shoulder comfort."},
        {name:"Standard Plank",tip:"Straight line ear to ankle. Breathe steady."},
        {name:"Side Plank (L/R)",tip:"Stack feet or stagger. Keep hips high."},
        {name:"Bird Dog",tip:"Opposite arm/leg extend. Keep back flat."},
        {name:"Dead Bug",tip:"Press low back into deck. Slow, controlled reps."},
        {name:"Air Squats",tip:"Controlled depth. Sit back into heels."},
        {name:"Chair Squats",tip:"Tap chair lightly, stand back up. Keep chest tall."},
        {name:"Wall Sit",tip:"Thighs parallel, back flat on wall. Hold steady."},
        {name:"Glute Bridges",tip:"Squeeze glutes at top. No hyperextension."},
        {name:"Glute Bridge March",tip:"Hold bridge, alternate lifting feet. Keep hips level."},
        {name:"Calf Raises",tip:"Slow up/down. Use support if needed."}
],
      bands: [
        {name:"Band Pull-Aparts",tip:"Arms straight, squeeze shoulder blades together."},
        {name:"Band Bicep Curls",tip:"Elbows pinned to sides. Control the negative."},
        {name:"Band Overhead Press",tip:"Press straight up, ribs down."},
        {name:"Band Rows",tip:"Pull to ribcage, squeeze upper back."},
        {name:"Band Tricep Extensions",tip:"Keep elbows high and steady."},
        {name:"Band Lateral Walks",tip:"Stay low, short steps. Feel glute medius."},
        {name:"Band Chest Press",tip:"Anchor behind you, press forward with control."},
        {name:"Band Pallof Press",tip:"Resist rotation as you press away from chest."}
],
      kettlebells: [
        {name:"Goblet Squats",tip:"Hold KB at chest. Stay controlled."},
        {name:"KB Deadlifts",tip:"Hinge at hips, flat back."},
        {name:"KB Rows",tip:"One arm at a time. Pull to hip."},
        {name:"KB Suitcase Carry",tip:"Walk tall with KB at side. Brace core."}
],
      dumbbells: [
        {name:"Dumbbell Rows",tip:"Support on bench. Pull to hip, squeeze back."},
        {name:"DB Overhead Press",tip:"Press straight up. Keep core engaged."},
        {name:"DB Curls",tip:"No swinging. Full range of motion."},
        {name:"DB Tricep Extensions",tip:"Control the lowering phase."},
        {name:"DB Floor Press",tip:"Press from floor, keep elbows at 45°."}
],
      flatBench: [
        {name:"Dumbbell Bench Press",tip:"Control the negative. Keep shoulders packed."},
        {name:"Bench Hip Thrusts",tip:"Drive through heels, squeeze glutes."},
        {name:"Incline Push-ups",tip:"Hands on bench, steady pace."},
        {name:"Bench Step-Ups",tip:"Controlled step up/down. Use light support if needed."}
],
      adjBench: [
        {name:"Incline Dumbbell Press",tip:"Bench at 30-45°. Smooth tempo."},
        {name:"Incline Dumbbell Rows",tip:"Chest on bench, pull DBs up."},
        {name:"Seated Shoulder Press",tip:"Upright bench, steady reps."},
        {name:"Seated Incline Curls",tip:"Slow reps, full extension."},
        {name:"Prone Y-T-W Raises",tip:"Light weight. Focus on control."}
],
      sled: [
        {name:"Sled Push (High Handles)",tip:"Smooth drive, steady pace."},
        {name:"Sled Pull (Backward)",tip:"Short steps, stay tall."},
        {name:"Sled Drag (Forward)",tip:"Walk forward, keep pace even."}
],
    },
    cardio: {
      indoor: [
        {name:"March in Place",tip:"Tall posture, drive arms. Light impact.",reps:"60-90 seconds"},
        {name:"Step Touches",tip:"Side steps, keep rhythm. Add arm swings.",reps:"60 seconds"},
        {name:"Low-Impact Jacks",tip:"Step out instead of jump. Keep heart rate up.",reps:"30-45 seconds"},
        {name:"Step Jacks",tip:"Step wide as arms go overhead. No jumping.",reps:"30-45 seconds"},
        {name:"Shadow Boxing",tip:"Light footwork, punch combos. Keep knees soft.",reps:"45-60 seconds"},
        {name:"Standing Knee Tucks",tip:"Alternate knee lifts with a crunch. Stay tall.",reps:"30-45 seconds"},
        {name:"Lateral Shuffles",tip:"Stay low, quick side-to-side movement.",reps:"30-45 seconds"},
        {name:"Jog (Gym Laps)",tip:"Easy pace. Stay light on feet.",reps:"2-4 laps",isFinisher:true}
],
      outdoor: [
        {name:"Brisk Walk Intervals",tip:"Power walk, pump arms. 1 min brisk, 1 min easy.",reps:"6-8 rounds"},
        {name:"Light Jog/Walk",tip:"Conversational pace, avoid pounding.",reps:"8-12 min",isFinisher:true},
        {name:"Walk/Jog Intervals",tip:"2 min walk, 1 min jog. Keep impact low.",reps:"8-12 rounds"}
],
      assaultBike: [
        {name:"Assault Bike Steady State",tip:"Moderate pace, keep RPM consistent.",reps:"3-5 min",isFinisher:true},
        {name:"Assault Bike Intervals",tip:"15-30s on, 45-60s easy. Stay smooth.",reps:"6-8 rounds"}
],
      rower: [
        {name:"Rowing Steady State (2000m)",tip:"Moderate pace 18-22 strokes/min.",reps:"2000m",isFinisher:true},
        {name:"Rowing Intervals (500m)",tip:"Moderate effort, focus on form.",reps:"500m x 4-5 intervals"}
],
      cycle: [
        {name:"Team Bike Ride",tip:"Easy-moderate pace to stay with the group.",reps:"10-15 min",isFinisher:true},
        {name:"Cycling Steady State",tip:"Moderate resistance, consistent pace.",reps:"5-10 min",isFinisher:true},
        {name:"Cycling Intervals",tip:"1 min moderate, 1 min easy. Keep cadence smooth.",reps:"6-8 rounds"}
],
      bicycle: [
        {name:"Team Bike Ride",tip:"Easy-moderate pace to stay with the group.",reps:"10-15 min",isFinisher:true},
        {name:"Bike Ride Intervals",tip:"2 min steady, 1 min easy spin. Stay smooth.",reps:"6-8 rounds"}
],
      treadmill: [
        {name:"Incline Walk",tip:"10-15% incline, moderate pace.",reps:"5-10 min",isFinisher:true},
        {name:"Treadmill Intervals",tip:"1 min jog, 1 min walk. Adjust speed to comfort.",reps:"6-8 rounds"}
],
      swimming: [
        {name:"Easy Freestyle Laps",tip:"Relaxed pace, focus on form. Low impact on joints.",reps:"300-500m",isFinisher:true},
        {name:"Breaststroke Laps",tip:"Gentle stroke, easy on shoulders. Good recovery swim.",reps:"200-400m",isFinisher:true},
        {name:"Backstroke Laps",tip:"Shoulder-friendly, relaxed pace. Great for recovery.",reps:"200-300m"},
        {name:"Pool Walking/Jogging",tip:"Walk or jog in shallow end. Zero impact cardio.",reps:"10-15 min",isFinisher:true},
        {name:"Gentle Kick Laps",tip:"Easy flutter kick with board. Light leg work.",reps:"200-300m"},
        {name:"Treading Water (Relaxed)",tip:"Easy pace treading. Use eggbeater or scissor kick.",reps:"3-5 min"}
],
    },
  },
  yoga: [
    {name:"Cat-Cow Stretch",tip:"Flow between arching and rounding back. Sync with breath.",duration:"30-45 seconds"},
    {name:"Child's Pose",tip:"Knees wide, arms extended. Rest forehead on mat.",duration:"30-60 seconds"},
    {name:"Downward Dog",tip:"Hips high, heels reaching down. Press hands into mat.",duration:"30-45 seconds"},
    {name:"Forward Fold",tip:"Let head hang heavy. Bend knees if hamstrings tight.",duration:"30-45 seconds"},
    {name:"Low Lunge",tip:"Back knee down, hips sink forward. Hip flexor stretch.",duration:"30 seconds/side"},
    {name:"Pigeon Pose",tip:"Front shin across mat. Deep hip opener.",duration:"45-60 seconds/side"},
    {name:"Seated Twist",tip:"Tall spine, twist from core. Look over back shoulder.",duration:"30 seconds/side"},
    {name:"Thread the Needle",tip:"On all fours, reach arm under body. Shoulder stretch.",duration:"30-45 seconds/side"},
    {name:"Supine Twist",tip:"Lying on back, knees to one side. Arms out in T.",duration:"30-45 seconds/side"},
    {name:"Cobra Pose",tip:"Gentle backbend, shoulders down. Don't strain neck.",duration:"20-30 seconds"},
    {name:"Butterfly Stretch",tip:"Soles of feet together, knees drop. Inner thigh stretch.",duration:"30-60 seconds"},
    {name:"Happy Baby",tip:"Grab outside of feet, rock gently. Low back release.",duration:"30-45 seconds"},
    {name:"Figure Four Stretch",tip:"Ankle on opposite knee, pull thigh in. Piriformis stretch.",duration:"30-45 seconds/side"},
    {name:"Supine Hamstring Stretch",tip:"Leg straight up, use strap or hands. Keep other leg flat.",duration:"30-45 seconds/side"},
    {name:"Neck Rolls",tip:"Slow circles, release tension. Don't force range.",duration:"30 seconds each direction"},
    {name:"Shoulder Rolls",tip:"Roll forward then backward. Release upper body tension.",duration:"30 seconds"},
    {name:"Wrist Circles",tip:"Circle wrists both ways. Good for desk workers.",duration:"20-30 seconds each direction"},
    {name:"Standing Side Stretch",tip:"Reach arm overhead, lean to opposite side. Stretch obliques.",duration:"20-30 seconds/side"},
    {name:"Warrior I",tip:"Front knee bent, back leg straight. Arms reach up.",duration:"30 seconds/side"},
    {name:"Warrior II",tip:"Arms parallel to ground, gaze over front hand. Strong legs.",duration:"30 seconds/side"},
    {name:"Triangle Pose",tip:"Front leg straight, reach down and up. Open chest.",duration:"30 seconds/side"},
    {name:"Tree Pose",tip:"Foot on inner thigh or calf. Balance practice.",duration:"30 seconds/side"},
    {name:"Corpse Pose (Savasana)",tip:"Final relaxation. Lie completely still, focus on breath.",duration:"2-3 minutes"}
],
  funday: {
    outdoor: [
      {name:"Kickball with PT",tip:"Standard baseball rules. FITNESS: Outs do 5 4-count pushups. Scored-on team does 10 4-count exercise chosen by scoring team.",howToPlay:"Set up like baseball with 4 bases in a diamond. Pitcher rolls the ball to kicker who kicks it and runs bases. Fielders catch or throw to bases for outs. 3 outs = switch sides. Score by reaching home plate.",teamSize:"8-15 per team ideal",space:"Baseball diamond or large open field (min 60x60 yards)",safety:"No sliding headfirst. Throw to bases, not at runners. Use soft playground ball."},
      {name:"Ultimate Frisbee",tip:"Score by catching in end zone. FITNESS: Scored-on team does 10 4-count burpees. Turnover = 5 4-count mountain climbers.",howToPlay:"Two teams try to score by catching the frisbee in the opponent's end zone. You CANNOT run while holding the disc - must pass to teammates within 10 seconds. If disc hits ground or goes out of bounds, possession switches to other team.",teamSize:"7v7 ideal, works with 5-15 per team",space:"Football field size or large open area (70x40 yards minimum)",safety:"No physical contact allowed. Call 'stall' if defender counts to 10. Self-officiated - call your own fouls."},
      {name:"Flag Football",tip:"Flag pull or two-hand touch only (no tackling). FITNESS: Scored-on team does 10 4-count exercise picked by scoring team. Turnover = 5 4-count pushups.",howToPlay:"Like football but with flag belts instead of tackling. Offense gets 4 downs to score or get first down. Pull opponent's flag to 'tackle' them. QB has 7 seconds to throw. No blocking or contact.",teamSize:"5-8 per team ideal",space:"Football field or 60x30 yard area with end zones",safety:"NO tackling or blocking. Flag pull only. No diving for flags. Receiver is down where flag is pulled."},
      {name:"Soccer",tip:"Full field or small-sided. FITNESS: Scored-on team does 10 4-count squats. Penalty for offsides = 5 4-count situps.",howToPlay:"Two teams try to kick ball into opponent's goal. No hands except goalkeeper. Throw-ins when ball goes out on sidelines. Corner kicks when defense kicks it past their own goal line.",teamSize:"6-11 per team depending on field size",space:"Full field or half field for small-sided games",safety:"No slide tackling. No high kicks near heads. Call advantage for minor fouls."},
      {name:"Softball with Fitness",tip:"Slow pitch. FITNESS: Outs do 5 4-count pushups before returning to dugout. Scored-on team does 10 4-count exercise.",howToPlay:"Pitcher tosses ball underhand in an arc. Batter hits and runs bases. 3 strikes = out, 4 balls = walk. Catch fly ball = out. Tag base or runner for out. 3 outs = switch sides.",teamSize:"9-12 per team",space:"Softball diamond or large open field",safety:"No metal cleats. Batters wear helmets if available. Clear area behind batter."},
      {name:"Capture the Flag",tip:"Two teams, two territories. FITNESS: Captured players do 10 4-count burpees in 'jail', freed by teammates. Great cardio!",howToPlay:"Each team has a territory with a flag. Goal: grab opponent's flag and bring to your territory without getting tagged. If tagged in enemy territory, go to 'jail'. Teammates can free jailed players by tagging them.",teamSize:"8-20 per team works well",space:"Large open area with clear midfield boundary, ideally with some obstacles/hiding spots",safety:"No tackling - tag only. Establish clear boundaries. Watch for holes/uneven ground."},
      {name:"Tug of War",tip:"Equal teams by weight. FITNESS: Losing team does 15 4-count exercise chosen by winners. Best 2 of 3 rounds.",howToPlay:"Two teams line up on opposite ends of rope with center marker over a line. On whistle, both teams pull. Win by pulling center marker to your side. Best 2 of 3 rounds.",teamSize:"6-10 per side, matched by total weight",space:"30-foot clear area, flat ground (grass preferred)",safety:"No wrapping rope around hands/wrists. Drop rope if falling. Avoid pulling toward obstacles."},
      {name:"Obstacle Course Time Trial",tip:"Set up PT stations with cones. FITNESS: Team with slowest time does 10 extra 4-count burpees. All exercises are 4-count.",howToPlay:"Set up 6-10 stations: cone weave, bear crawl section, pushup station, hurdles, tire run, burpee station, sprint finish. Time each person/team. Fastest time wins.",teamSize:"Any size - individuals or relay teams",space:"50-100 yard course with room for stations",safety:"Inspect course for hazards. No sharp turns at speed. Station volunteers ensure proper form."},
      {name:"Speedball",tip:"Hybrid sport - kick or throw to score. FITNESS: Scored-on team does 10 4-count exercise chosen by scoring team. Fast-paced!",howToPlay:"Hybrid of soccer, football, and basketball. Can kick ball on ground (soccer rules) OR pick up and throw (football rules). Score in goal (1 pt) or by catching in end zone (2 pts). Very fast-paced!",teamSize:"6-10 per team",space:"Soccer field size with goals or end zones",safety:"No tackling. Light contact only. Ball must touch ground before picking up."},
      {name:"Spikeball (Roundnet)",tip:"2v2 teams, 3 touches to return. FITNESS: Losing team each game does 10 4-count pushups. Play best of 5 to 21 points.",howToPlay:"2v2 around a small trampoline net. Serve by bouncing ball off net to opponents. They have up to 3 alternating touches to return it to net. Ball hits ground = point for other team. First to 21, win by 2.",teamSize:"2v2 (set up multiple nets for larger groups)",space:"20x20 foot area per net, flat surface",safety:"Watch your footing around net. Players move 360° around net. Clear playing area of obstacles."},
      {name:"Kan Jam",tip:"Frisbee to can, partner deflects. FITNESS: Losing team does 10 4-count exercise. First to 21 wins!",howToPlay:"2v2 - partners on opposite ends. Throw frisbee at can while partner tries to deflect it in. 1 pt = partner deflects and hits can. 2 pts = unassisted can hit. 3 pts = partner deflects INTO can. Instant win = throw goes directly into slot.",teamSize:"2v2 (multiple setups for larger groups)",space:"50 feet between cans, clear area around each",safety:"Stand clear when partner is throwing. Don't catch directly in front of can."},
      {name:"Cone Shuttle Gauntlet",tip:"Set 4 cones 10yd apart. Teams sprint down/back. FITNESS: Losing team does 15 4-count burpees.",howToPlay:"Set 4 cones 10 yards apart in a line. Sprint to first cone, touch ground, sprint back. Then to second cone and back. Continue through all 4. Fastest team wins.",teamSize:"Teams of 4-6, relay style",space:"40+ yard straight line with run-off room",safety:"Ensure solid footing at turn-around points. No sliding stops."},
      {name:"Frisbee Conditioning Relay",tip:"Relay to cone, toss frisbee to teammate, sprint back. FITNESS: Drops = 5 4-count pushups.",howToPlay:"Teams line up. First runner sprints to cone 30 yards away, throws frisbee back to next teammate, sprints back. Next person catches, runs, throws, returns. Dropped throws = penalty.",teamSize:"4-8 per team",space:"40-50 yard length, clear of obstacles",safety:"Don't throw until teammate is looking. Sprint in designated lanes."},
      {name:"British Bulldog",tip:"Players run across field. Bulldogs tag with two-hand touch (no tackling). FITNESS: Tagged players do 10 4-count pushups before becoming bulldogs.",howToPlay:"One 'bulldog' stands in middle of field. Everyone else lines up on one end. On 'GO', all players run to other side. Bulldog tries to tag runners with two-hand touch. Tagged players become bulldogs. Last survivor wins.",teamSize:"10-30 players",space:"50x30 yard open field with clear boundaries",safety:"TWO-HAND TOUCH ONLY - no tackling or grabbing clothes. Watch for collisions at speed.",noEquipment:true,preferredFacility:"openField"},
      {name:"Manhunt",tip:"Hide and seek meets tag. FITNESS: Tagged players do 10 4-count burpees before becoming hunters. Keeps fitness high!",howToPlay:"One team hides (30-60 second head start) while hunters count. Hunters then search for hiders. When found, hiders must be tagged. Tagged players become hunters. Last person found wins.",teamSize:"10-20 players",space:"Large area with hiding spots - wooded areas, buildings, or obstacle course",safety:"Set clear boundaries. No climbing on unsafe structures. Use buddy system in unfamiliar areas.",noEquipment:true,preferredFacility:"openField"},
      {name:"Tag Variations (Freeze Tag, Tunnel Tag)",tip:"Classic tag games. FITNESS: Tagged players do 10 4-count mountain climbers to unfreeze OR wait for teammate crawl-through.",howToPlay:"FREEZE TAG: Tagged players freeze in place until teammate tags them free. TUNNEL TAG: Frozen players stand with legs apart; teammate must crawl through to unfreeze. 1-3 taggers for groups of 15-25.",teamSize:"10-25 players",space:"Open field or gymnasium with clear boundaries",safety:"Watch for collisions. No pushing frozen players. Taggers wear pinnies if available.",noEquipment:true},
      {name:"Red Light Green Light",tip:"Leader calls movements. FITNESS: Caught moving = 5 4-count pushups at start line, then rejoin.",howToPlay:"Players line up at start. Leader faces away and calls 'GREEN LIGHT' (players run forward) or 'RED LIGHT' (players freeze). Leader turns around on red light. Anyone caught moving goes back to start. First to touch leader wins.",teamSize:"Any size",space:"30-50 yard straight line",safety:"No pushing or bumping frozen players. Clear running lanes.",noEquipment:true},
      {name:"Blob Tag",tip:"Tagged players join 'blob'. FITNESS: When blob catches 3+ people, everyone does 10 4-count jumping jacks, then restart.",howToPlay:"Start with one tagger. When someone is tagged, they hold hands with tagger forming a 'blob'. Blob grows as more are tagged. Only end people of blob can tag. When blob reaches 6+, it can split into two smaller blobs.",teamSize:"15-30 players",space:"Large open field with clear boundaries",safety:"No pulling or jerking the blob. Run together at blob pace. Watch footing.",noEquipment:true,preferredFacility:"openField"},
      {name:"Bear Crawl Relay",tip:"Teams bear crawl to cone and back. FITNESS: Slowest team does 10 4-count burpees.",howToPlay:"Teams line up. First person bear crawls (on hands and feet, butt low) to cone 20 yards away and back. Tags next teammate. Continue until all have gone. Fastest team wins.",teamSize:"4-8 per team",space:"25-30 yards with cone turnarounds",safety:"No standing up during bear crawl. Keep head up to see where you're going.",noEquipment:true,preferredFacility:"openField"},
      {name:"Relay Races with PT",tip:"Sprint relays with PT stops. FITNESS: Each leg = sprint 50m → 10 4-count exercise → sprint back. Rotate: pushups, situps, squats, burpees.",howToPlay:"Set up 50m course. Each team member sprints to end, does 10 assigned exercise (pushups, situps, squats, or burpees - rotating), sprints back, tags teammate. All exercises 4-count.",teamSize:"4-8 per team",space:"50-100 meter course with PT station at turn",safety:"Complete full reps before sprinting back. No cutting corners on form.",noEquipment:true,preferredFacility:"track"},
      {name:"Track Sprints Competition",tip:"400m relay, 800m time trials. FITNESS: Losing team does 10 4-count exercise chosen by winners after each round.",howToPlay:"Teams compete in relay races (4x100m) and individual time trials (400m, 800m). Score points for placement (1st=4pts, 2nd=3pts, etc.). Team with most points wins.",teamSize:"4-10 per team",space:"Standard 400m track or measured course",safety:"Stay in lanes. Pass baton in zone. Cool down after sprints.",noEquipment:true,preferredFacility:"track"},
      {name:"Mile Challenge",tip:"Team mile runs with PT penalties. FITNESS: Last team to finish does 15 4-count exercise chosen by winners.",howToPlay:"Teams run together - slowest runner sets pace. All team members must cross finish together. Teams are timed. Or: relay style where each person runs 400m and tags next runner.",teamSize:"4-6 per team",space:"Standard track or measured 1-mile course",safety:"Know your team's limits. Walk if needed. Hydrate before and after.",noEquipment:true,preferredFacility:"track"},
      {name:"Fartlek Training Game",tip:"Swedish speed play with PT stations. FITNESS: After each sprint interval, group does 10 4-count exercise (rotating: burpees, mountain climbers, squat thrusts).",howToPlay:"Group jogs together. Leader randomly calls 'SPRINT!' (20-60 seconds hard). Then 'JOG!' to recover. Add PT stations - on command, everyone stops for 10 reps of called exercise. Continue 15-25 minutes.",teamSize:"Any size",space:"Track, trails, or open field",safety:"Don't sprint on uneven terrain. Adjust intensity for fitness levels.",noEquipment:true,preferredFacility:"track"},
      {name:"Sprint Ladder Challenge",tip:"Leader calls 50-100-150-200m sprints. FITNESS: Last finishers do 10 4-count squats.",howToPlay:"Leader calls distances in order: 50m sprint, rest, 100m sprint, rest, 150m sprint, rest, 200m sprint. Then work back down: 150m, 100m, 50m. Rest equals time to complete previous sprint.",teamSize:"Any size",space:"Track or 200m+ measured course",safety:"Walk recovery between sprints. Stay hydrated.",noEquipment:true,preferredFacility:"track"},
      {name:"Sharks and Minnows",tip:"Minnows sprint across while sharks tag. FITNESS: Tagged minnows do 10 4-count pushups before becoming sharks. Constant movement!",howToPlay:"1-3 'sharks' in middle of field. All 'minnows' line up on one side. On whistle, minnows sprint to other side. Sharks try to tag them. Tagged minnows become sharks. Last minnow standing wins.",teamSize:"10-30 players",space:"40x30 yard open field",safety:"Tag only - no tackling. Watch for collisions when many sharks.",noEquipment:true,preferredFacility:"openField"},
      {name:"Capture the Territory",tip:"Mark zones, tag to score. FITNESS: Scored-on team does 10 4-count exercise chosen by scoring team. Play to 5 points.",howToPlay:"Divide field into 4-6 zones. Teams try to 'capture' zones by having more players in that zone than opponents when whistle blows. Teams score 1 point per zone controlled. Play to 10 points.",teamSize:"10-20 per team",space:"Large field marked into zones",safety:"No pushing to remove players from zones. Whistle means freeze.",noEquipment:true,preferredFacility:"openField"},
      {name:"Ultimate (No Disc)",tip:"Pass invisible 'disc' with hand touches. FITNESS: Scoring team picks exercise, defending team does 10 4-count reps. Play to 7.",howToPlay:"Play like Ultimate Frisbee but 'pass' by touching teammate's hand (both must be stationary). Can't run with invisible disc. Score by having teammate catch your 'pass' in end zone.",teamSize:"5-10 per team",space:"50x30 yard field with end zones",safety:"No contact. Call your own fouls. Self-officiated.",noEquipment:true,preferredFacility:"openField"},
      {name:"Baseball Diamond Sprints with PT",tip:"Race around bases with PT stations. FITNESS: Each base = 5 4-count exercise (1st: pushups, 2nd: situps, 3rd: squats, home: burpees).",howToPlay:"Use existing baseball diamond. Sprint from home to 1st (do 5 pushups), sprint to 2nd (5 situps), sprint to 3rd (5 squats), sprint home (5 burpees). Time each runner. Fastest wins.",teamSize:"Any size - run individually or relay style",space:"Standard baseball diamond",safety:"Round bases wide, don't cut corners. Complete exercises with proper form.",noEquipment:true,preferredFacility:"baseballField"},
      {name:"Pickle (No Ball)",tip:"Rundown drill between bases. FITNESS: Tagged runners do 10 4-count mountain climbers. Rotate taggers every 5 tags.",howToPlay:"Two taggers at bases (60 feet apart). Runner tries to make it to either base without being tagged. Taggers can only run when runner runs. Tagged runner rotates out. After 5 tags, taggers rotate.",teamSize:"Groups of 3-5 (multiple games for large groups)",space:"60-foot baseline or similar distance",safety:"No diving tags. Runner chooses direction - taggers don't throw.",noEquipment:true,preferredFacility:"baseballField"},
      {name:"Simon Says PT",tip:"Leader calls exercises with 'Simon Says'. FITNESS: Caught without 'Simon Says' = 5 4-count penalty. All exercises 4-count!",howToPlay:"Leader gives commands with or without 'Simon Says'. If command starts with 'Simon Says' everyone does it. If not, only do the exercise if leader DIDN'T say 'Simon Says'. Wrong response = penalty exercises.",teamSize:"Any size",space:"Enough room for everyone to exercise",safety:"Keep exercises appropriate for space and fitness level.",noEquipment:true},
      {name:"Partner Wheelbarrow Races",tip:"One holds ankles, partner walks on hands. FITNESS: Losing teams do 10 4-count pushups. Switch partners, race again!",howToPlay:"Pairs up - one person holds partner's ankles while they walk on hands. Race to cone 20 yards and back, then switch positions. First pair to complete both directions wins.",teamSize:"Pairs (any number of pairs)",space:"25-30 yard course with turnarounds",safety:"Holder keeps ankles at hip height, not too high. Walker keeps core tight.",noEquipment:true},
      {name:"Steal the Bacon with PT",tip:"Race to grab object. FITNESS: Tagged players do 10 4-count exercise. Winning team picks next exercise. First to 10 points.",howToPlay:"Two teams line up 30 yards apart, numbered 1-10. Leader calls a number. Those two players race to center to grab object (the 'bacon'). Return to your side without being tagged to score.",teamSize:"8-15 per team",space:"30x20 yard area with center object",safety:"No tackling - tag only. Watch for collisions when multiple numbers called.",noEquipment:true},
      {name:"Team Elimination Sprint",tip:"Sprint to center line. FITNESS: Last team across loses one player AND does 10 4-count burpees. Eliminated players cheer!",howToPlay:"Two teams start 50 yards apart. On whistle, everyone sprints to center line. Last person to cross the line is eliminated AND their team does penalty exercises. Continue until one team remains.",teamSize:"8-15 per team",space:"50+ yard field with marked center",safety:"Sprint straight - no cutting others off. Stop at center, don't crash.",noEquipment:true},
      {name:"Fitness Bingo",tip:"Complete exercises in bingo pattern. FITNESS: All exercises are 4-count. First team to complete row wins. Losers do 20 4-count burpees!",howToPlay:"Create bingo cards with different exercises in each square (5x5 grid). Leader calls exercises. Teams complete the exercise to mark that square. First team to complete a row (horizontal, vertical, or diagonal) wins.",teamSize:"Teams of 4-6",space:"Room to exercise",safety:"Quality reps over speed. Judge must verify completion.",noEquipment:true},
      {name:"PT Station Circuit Race",tip:"8-10 stations, all 4-count exercises (10 reps each). Teams race through circuit. FITNESS: Losing team repeats final 2 stations!",howToPlay:"Set up 8-10 stations in circle or line. Each station = specific exercise for 10 reps. Teams race through all stations. First team with all members finished wins. Form judges at each station.",teamSize:"4-8 per team",space:"Large area for 8-10 spread out stations",safety:"Proper form required. No skipping reps. Rest between stations if needed.",noEquipment:true}
],
    indoor: [
      {name:"Basketball",tip:"Full court or half court games. Rotate teams every 10-15 min.",howToPlay:"Standard basketball rules. Two teams score by shooting into opponent's hoop (2 pts inside arc, 3 pts outside). Dribble to move with ball. Fouls = free throws. First to 21 or most points when time expires.",teamSize:"5v5 full court, 3v3 for half court",space:"Full or half basketball court",safety:"Call fouls clearly. No hard fouls. Substitute frequently to manage fatigue."},
      {name:"Basketball Knockout",tip:"Players shoot from free throw. Miss and you're eliminated by player behind you. Last standing wins.",howToPlay:"Players line up at free throw line with two balls. First two players shoot. If player behind makes it before you, you're OUT. After shot, rebound and pass to next in line. Last player standing wins.",teamSize:"6-15 players (single game)",space:"One basketball hoop with shooting area clear",safety:"Clear rebound area. No blocking other players' shots."},
      {name:"Around the World",tip:"Basketball shooting game. Make shot from each spot around arc to advance. Miss twice = restart.",howToPlay:"Mark 5-7 spots around the arc. Start at first spot. Make shot = advance to next spot. Miss = stay or 'chance it' (shoot again: make it to advance, miss to go back to start). First to complete all spots wins.",teamSize:"2-6 players per hoop",space:"Basketball hoop with clear shooting lanes",safety:"Take turns shooting. Clear rebounders from shooting lanes."},
      {name:"Volleyball",tip:"Rally scoring to 25. Rotate servers. Modify net height as needed.",howToPlay:"6v6, bump-set-spike to return ball over net. Ball can't hit ground on your side. 3 touches max per side. Rotate positions when you win serve. Rally scoring to 25, win by 2.",teamSize:"6v6 standard, can modify to 4v4",space:"Volleyball court with net",safety:"Call 'mine' to avoid collisions. No reaching over net. Watch for ankle rolls."},
      {name:"Dodgeball Variations",tip:"Doctor Dodgeball: One 'doctor' per team can revive teammates. Or Jailbreak: Catch ball to free teammates.",howToPlay:"DOCTOR DODGEBALL: One secret 'doctor' per team can revive hit players by touching them. Kill the doctor = team loses. JAILBREAK: Catch ball = one jailed teammate returns. Hit by ball = go to jail behind other team.",teamSize:"8-15 per team",space:"Gymnasium with center line",safety:"Soft balls only. No headshots. Hit = out, catch = thrower out."},
      {name:"Dodgeball",tip:"Soft balls only. Clear boundaries. Eliminated players do exercises on sideline.",howToPlay:"Two teams on opposite sides of center line. Throw balls to hit opponents below shoulders. Hit = out. Catch = thrower out + one teammate returns. Last team with players wins. Or play timed rounds.",teamSize:"6-15 per team",space:"Gymnasium with clear center line and boundaries",safety:"SOFT BALLS ONLY. No headshots (head hit doesn't count). No crossing center line."},
      {name:"Bombardment",tip:"Dodgeball meets bowling. Hit cones behind opponent's line to win. 3 balls per side.",howToPlay:"Set up 6 bowling pins (or cones) behind each team's back line. Protect your pins while trying to knock down opponent's pins with thrown balls. Hit by ball = out. Knock down all pins = win.",teamSize:"8-12 per team",space:"Gymnasium with back boundaries for pins",safety:"Same as dodgeball - soft balls, no headshots. Pins on floor, not elevated."},
      {name:"Floor Hockey",tip:"Plastic sticks and puck. No high sticking. Rotate goalies.",howToPlay:"Like hockey but with plastic sticks and soft puck/ball. Score in opponent's goal. No raising stick above waist. Goalies can use any body part. Play 5-minute periods or first to 5 goals.",teamSize:"5-8 per team including goalie",space:"Gymnasium - use cones for goals if no hockey nets",safety:"NO high sticking (stick below waist always). No slap shots. Plastic sticks only."},
      {name:"Free-Throw Fitness",tip:"Missed free throw = 5 4-count pushups. Make 3 in a row to clear.",howToPlay:"Line up at free throw line. Each player shoots. Miss = 5 pushups right there before next attempt. Make 3 in a row to 'clear' and go to back of line. Cleared players vs non-cleared for final showdown.",teamSize:"6-15 players per hoop",space:"Basketball hoop with room for pushups",safety:"Clear area for pushups. Don't rush shots."},
      {name:"Octopus Tag",tip:"Tagger in middle can only pivot on one foot. Others run past. Tagged join as octopi.",howToPlay:"One 'octopus' stands in middle and can ONLY pivot on one foot (can't move that foot). All other players must run past without being tagged. Tagged players become octopi, also rooted in place where tagged.",teamSize:"15-30 players",space:"Gymnasium with clear running lanes",safety:"Octopi can't move feet - pivoting only. Runners watch for stationary players.",noEquipment:true},
      {name:"Fitness Tag",tip:"Tagged players do 10 pushups to get back in. Constant movement and exercise.",howToPlay:"Standard tag but when tagged, drop and do 10 pushups (or assigned exercise) immediately. After completing exercise, you're back in the game. Multiple taggers recommended (3-5 for groups of 20+).",teamSize:"10-30 players",space:"Gymnasium or large indoor area",safety:"Watch for people doing pushups on floor. Don't crowd the 'it' players.",noEquipment:true},
      {name:"Musical Fitness",tip:"Music stops, everyone does called exercise. Fun and unpredictable.",howToPlay:"Play music while everyone jogs/shuffles around gym. When music stops, leader calls an exercise. Everyone does 10 reps. Last person to finish = eliminated (or does 5 extra penalty reps). Continue until winner.",teamSize:"Any size",space:"Gymnasium or large room",safety:"Watch spacing when music stops. No collisions rushing to finish.",noEquipment:true},
      {name:"Partner Exercises Circuit",tip:"Partner-based exercises: wheelbarrow, partner sit-ups, plank high-fives.",howToPlay:"Pair up. Station 1: Wheelbarrow walks. Station 2: Partner sit-ups (feet interlocked, high-five at top). Station 3: Plank high-fives facing each other. Station 4: Partner squats back-to-back. 60 sec per station.",teamSize:"Pairs (any number)",space:"Room for stations - 10x10 ft per pair",safety:"Match partners by size/strength. Communicate during exercises.",noEquipment:true},
      {name:"Mirror Drill",tip:"Partners face each other. One leads movements, other mirrors. Switch every 2 min.",howToPlay:"Partners face each other 3 feet apart. Leader does movements (shuffles, jumps, squats, arm movements). Partner mirrors in real-time. Switch leader every 2 minutes. Make it challenging!",teamSize:"Pairs (any number)",space:"6x6 ft per pair",safety:"Stay in your space. Start slow, build speed.",noEquipment:true},
      {name:"Burpee Relay",tip:"Teams sprint to line, do 5 4-count burpees, tag next runner.",howToPlay:"Teams line up at baseline. First person sprints to half court, does 5 burpees (4-count), sprints back, tags next person. Continue until all have gone. Fastest team wins.",teamSize:"4-8 per team",space:"Basketball court or 40-yard indoor space",safety:"Full burpee form - chest to deck, jump at top. No cheating reps.",noEquipment:true},
      {name:"Line Drills",tip:"Use court lines for sprints, shuffles, carioca, high knees between lines.",howToPlay:"Use basketball court lines for agility. Sprint to free throw line, shuffle to sideline, backpedal to baseline, carioca to corner, high knees across, etc. Leader calls transitions.",teamSize:"Any size",space:"Basketball court with visible lines",safety:"Stay in lanes. Watch for collisions on transitions.",noEquipment:true,preferredFacility:"basketballCourt"},
      {name:"Basketball Court Suicides",tip:"Sprint to each line and back. Baseline to free throw, half court, far free throw, baseline.",howToPlay:"Start at baseline. Sprint to free throw line and back. Sprint to half court and back. Sprint to far free throw line and back. Sprint to far baseline and back. Time each person. Fastest wins.",teamSize:"Any size - run individually or in heats",space:"Full basketball court",safety:"Touch each line. Don't slip on turns - change direction under control.",noEquipment:true,preferredFacility:"basketballCourt"},
      {name:"Plank High-Five Challenge",tip:"Pairs hold plank and alternate high-fives. Losers do 10 4-count mountain climbers.",howToPlay:"Partners in plank position facing each other, 2 feet apart. Alternate high-fives with opposite hands (right-right, left-left). First pair to break plank form loses. Hold 60 seconds minimum.",teamSize:"Pairs competing against each other",space:"6x4 ft per pair",safety:"Keep hips level during high-fives. Don't push partner over.",noEquipment:true},
      {name:"Full Court Tag",tip:"Use basketball court boundaries. Can't cross out of bounds. Constant direction changes!",howToPlay:"Standard tag but confined to basketball court boundaries. Step out of bounds = frozen for 10 seconds. 2-4 taggers depending on group size. Tagged players join as taggers. Last person wins.",teamSize:"15-30 players",space:"Full basketball court with clear boundaries",safety:"Watch sidelines. No pushing out of bounds. Taggers wear pinnies if available.",noEquipment:true,preferredFacility:"basketballCourt"},
      {name:"Volleyball Court Relay",tip:"Teams line up on each side. Sprint under net, tag teammate. Fast rotation relay.",howToPlay:"Half team on each side of net. First person sprints to net, goes UNDER net to other side, tags teammate. That person runs under to first side. Continue relay until all have crossed. Fastest team wins.",teamSize:"6-10 per team (split on both sides)",space:"Volleyball court with net",safety:"Go under net, not over. Watch head clearance. No diving under net.",noEquipment:true,preferredFacility:"volleyballCourt"},
      {name:"Ship Captain Crew",tip:"Leader calls commands (Port/Starboard/Captain's Coming). Last to respond is out.",howToPlay:"Leader calls commands: 'Port!' (run left), 'Starboard!' (run right), 'Bow!' (run forward), 'Stern!' (run back), 'Captain's Coming!' (freeze and salute), 'Scrub the Deck!' (kneel and scrub). Last to respond = out.",teamSize:"10-30 players",space:"Gymnasium with room to run in all directions",safety:"Watch for collisions on direction changes. Clear boundaries.",noEquipment:true},
      {name:"Chain Tag",tip:"Tagged players join hands with tagger. Chain grows. Only end players can tag.",howToPlay:"Start with 2 taggers holding hands. When they tag someone, that person joins the chain. Only people on the ends of the chain can tag. Chain can split into groups of 4+ if it gets too long.",teamSize:"15-30 players",space:"Gymnasium with clear boundaries",safety:"No jerking or pulling the chain. Run together at chain speed.",noEquipment:true},
      {name:"Fitness Dice",tip:"Giant foam dice with exercises on each side. Roll dice, whole team does that exercise.",howToPlay:"Create large dice with exercises written on each side (burpees, pushups, situps, squats, jumping jacks, mountain climbers). Player/team rolls dice. Everyone does 10 reps of that exercise. Rotate roller.",teamSize:"Any size",space:"Room to exercise",safety:"Proper form on all exercises. Judge counts reps.",noEquipment:true},
      {name:"Follow the Leader PT",tip:"Leader calls movements (burpees, jumping jacks, etc). Everyone follows. Rotate leaders every 3 min.",howToPlay:"One leader stands in front. Leader does exercise movements (burpees, high knees, shuffles, etc). Everyone follows in real-time. Leader changes every 3 minutes. Try to challenge the group!",teamSize:"Any size",space:"Gymnasium or large room",safety:"Leader keeps movements appropriate for space. Watch spacing.",noEquipment:true}
],
  },
}
