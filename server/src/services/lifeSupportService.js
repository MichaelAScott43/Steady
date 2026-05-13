// All content voiced in TJ and Arlane's southern, plain-spoken style

const TJ_PROMPTS = [
  { text: "What's one thing that's eating at you right now? Say it plain.", voice: 'TJ' },
  { text: "What's one thing you handled today that you didn't think you could?", voice: 'TJ' },
  { text: "Name one thing you'd do different if you wasn't worried about what folks thought.", voice: 'TJ' },
  { text: "What does 'steady' look like for you today?", voice: 'TJ' },
  { text: "Who in your life would you call if things got real bad? Have you told 'em you trust 'em?", voice: 'TJ' },
  { text: "What's one small thing you can do today that future-you would be grateful for?", voice: 'TJ' },
  { text: "When's the last time you did something just for yourself? No guilt.", voice: 'TJ' },
  { text: "What's your body trying to tell you right now?", voice: 'TJ' },
  { text: "What would your granddaddy say about the situation you're in?", voice: 'TJ' },
  { text: "If you could change one thing about your week, what would it be?", voice: 'TJ' }
];

const ARLANE_PROMPTS = [
  { text: "Baby, what's really weighing on your heart today?", voice: 'Arlane' },
  { text: "Write about a moment this week when you felt a little lighter.", voice: 'Arlane' },
  { text: "What does peace look like to you? Not perfect — just peace.", voice: 'Arlane' },
  { text: "You've been carrying something. What would it feel like to set it down, even for a minute?", voice: 'Arlane' },
  { text: "Who has shown up for you lately, even in a small way?", voice: 'Arlane' },
  { text: "What's something you've been telling yourself that might not be true?", voice: 'Arlane' },
  { text: "Write about one thing your body needs right now — sleep, quiet, a walk, a cry.", voice: 'Arlane' },
  { text: "What are you afraid to want? And why?", voice: 'Arlane' },
  { text: "If you could say anything to yourself at your hardest moment, what would it be?", voice: 'Arlane' },
  { text: "Name three things, no matter how small, that you're grateful for today.", voice: 'Arlane' }
];

const GROUNDING_TECHNIQUES = [
  {
    id: 'five-senses',
    name: "TJ's 5-4-3-2-1",
    voice: 'TJ',
    duration: '3 minutes',
    steps: [
      "Name 5 things you can SEE right now. Don't overthink it.",
      "Name 4 things you can TOUCH. Feel their texture.",
      "Name 3 things you can HEAR right now.",
      "Name 2 things you can SMELL.",
      "Name 1 thing you can TASTE."
    ],
    quote: "TJ says: You're still here. That's the first fact. Now let's work from there."
  },
  {
    id: 'breathing',
    name: "Arlane's Breathing Room",
    voice: 'Arlane',
    duration: '2 minutes',
    steps: [
      "Put one hand on your chest and one on your belly.",
      "Breathe in slow through your nose for 4 counts.",
      "Hold it gentle for 4 counts.",
      "Let it out slow through your mouth for 6 counts.",
      "Do that 3 times. I'll be right here."
    ],
    quote: "Arlane says: You don't have to fix everything right now. Just breathe. That's enough for this moment."
  },
  {
    id: 'cold-water',
    name: "TJ's Cold Water Reset",
    voice: 'TJ',
    duration: '1 minute',
    steps: [
      "Go to the sink.",
      "Run cold water over your wrists for 30 seconds.",
      "Splash a little on your face.",
      "Pat dry and take one slow breath."
    ],
    quote: "TJ says: Your nervous system just needed a hard reset. Like a circuit breaker. Nothing wrong with that."
  },
  {
    id: 'safe-place',
    name: "Arlane's Safe Place",
    voice: 'Arlane',
    duration: '3 minutes',
    steps: [
      "Close your eyes if that's comfortable.",
      "Picture a place where you feel completely safe. Could be real, could be imagined.",
      "Notice what it looks like, smells like, feels like.",
      "Stay there in your mind for 60 seconds.",
      "When you're ready, come back slow."
    ],
    quote: "Arlane says: That place is always in you, baby. Nobody can take it away."
  }
];

const CRISIS_RESOURCES = [
  {
    id: '988',
    name: '988 Suicide & Crisis Lifeline',
    type: 'crisis',
    contact: '988',
    how: 'Call or text 988',
    available: '24/7',
    description: 'Free, confidential crisis counseling. No judgment. Real people.'
  },
  {
    id: 'crisis-text',
    name: 'Crisis Text Line',
    type: 'crisis',
    contact: 'Text HOME to 741741',
    how: 'Text only — good if you can\'t talk',
    available: '24/7',
    description: 'Text with a trained crisis counselor from wherever you are.'
  },
  {
    id: 'veterans-crisis',
    name: 'Veterans Crisis Line',
    type: 'veteran',
    contact: '988 then press 1',
    how: 'Call 988 and press 1, or text 838255',
    available: '24/7',
    description: 'Free, confidential support for veterans and their families.'
  },
  {
    id: 'nami',
    name: 'NAMI Helpline',
    type: 'mental-health',
    contact: '1-800-950-6264',
    how: 'Call or text NAMI to 741741',
    available: 'Mon–Fri 10am–10pm ET',
    description: 'Mental health information, referrals, and support.'
  },
  {
    id: 'samhsa',
    name: 'SAMHSA National Helpline',
    type: 'substance',
    contact: '1-800-662-4357',
    how: 'Call — free and confidential',
    available: '24/7',
    description: 'Treatment referrals for mental health and substance use.'
  },
  {
    id: 'open-path',
    name: 'Open Path Collective',
    type: 'therapy',
    contact: 'openpathcollective.org',
    how: 'Book online',
    available: 'Flexible scheduling',
    description: 'Affordable therapy for $30–$80 per session. Real therapists, real prices.'
  },
  {
    id: 'betterhelp',
    name: 'BetterHelp',
    type: 'therapy',
    contact: 'betterhelp.com',
    how: 'Online — text, call, or video',
    available: 'Flexible scheduling',
    description: 'Online therapy you can access from your phone or computer.'
  }
];

const TJ_SAYS = [
  "Steady ain't fancy. Steady is what keeps you moving when the shine wears off.",
  "You don't have to be a hundred percent. You just have to be honest.",
  "Asking for help ain't weakness. It's the smartest tool in the shed.",
  "A bad day ain't a bad life. Don't let the bad day write the story.",
  "You've survived every hard day so far. That's a perfect record.",
  "Progress don't always look like a trophy. Sometimes it looks like just getting out of bed.",
  "The strongest people I know are the ones who admit when they're struggling.",
  "Some days you fix things. Some days you just hold 'em together. Both count.",
  "Rest is not quitting. Rest is reloading.",
  "You're not behind. You're just on your own timeline.",
  "Worrying about tomorrow won't fix today. Fix today.",
  "Simple is not the same as easy. Don't confuse 'em.",
  "You can't pour from an empty cup. Fill yours up first.",
  "Do what you can with what you got, where you are. That's all any of us are doing.",
  "Ain't no shame in a slow day. Slow beats stopped every single time."
];

const ARLANE_SAYS = [
  "You are not behind. You are rebuilding.",
  "Some days the bravest thing you can do is stay.",
  "Healing is not a straight line and that's okay, baby.",
  "You deserve gentleness, especially from yourself.",
  "It's okay to not be okay. It's not okay to pretend forever.",
  "Your feelings are not too much. They're information.",
  "There is no timeline on grief or healing. Move at the pace your heart can handle.",
  "You don't have to explain your need for rest.",
  "Being soft is not weakness. It takes enormous strength to stay open.",
  "The fact that you're still trying says everything about who you are."
];

function getTodayPrompt() {
  const all = [...TJ_PROMPTS, ...ARLANE_PROMPTS];
  const dayIndex = new Date().getDate() % all.length;
  return all[dayIndex];
}

function getPromptByVoice(voice) {
  const pool = voice === 'Arlane' ? ARLANE_PROMPTS : TJ_PROMPTS;
  return pool[Math.floor(Math.random() * pool.length)];
}

function getTJSays() {
  return TJ_SAYS[Math.floor(Math.random() * TJ_SAYS.length)];
}

function getArlaneSays() {
  return ARLANE_SAYS[Math.floor(Math.random() * ARLANE_SAYS.length)];
}

function getMoodLabel(mood) {
  const labels = { 1: 'Real rough', 2: 'Struggling', 3: 'Hanging in there', 4: 'Doing alright', 5: 'Feeling good' };
  return labels[mood] || 'Unknown';
}

function analyzeMoodPattern(logs) {
  if (!logs.length) return null;
  const avg = logs.reduce((sum, l) => sum + l.mood, 0) / logs.length;
  const trend = logs.length >= 3
    ? logs[0].mood > logs[logs.length - 1].mood ? 'improving' : logs[0].mood < logs[logs.length - 1].mood ? 'declining' : 'steady'
    : 'steady';
  return {
    average: Math.round(avg * 10) / 10,
    trend,
    tjComment: trend === 'improving'
      ? "TJ says: You're trending up. Don't stop now."
      : trend === 'declining'
        ? "TJ says: Rough patch. That's okay — let's talk about what's going on."
        : "TJ says: You're holding steady. That counts for something."
  };
}

module.exports = {
  getTodayPrompt,
  getPromptByVoice,
  getTJSays,
  getArlaneSays,
  getMoodLabel,
  analyzeMoodPattern,
  GROUNDING_TECHNIQUES,
  CRISIS_RESOURCES,
  TJ_SAYS,
  ARLANE_SAYS
};
