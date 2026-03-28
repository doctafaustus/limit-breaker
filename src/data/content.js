export const lessons = [
  {
    id: 'lesson-1',
    date: '2026-03-28',
    title: 'The Name Effect',
    subtitle: 'Why remembering someone\'s name is the most underrated social superpower.',
    estimatedMinutes: 5,
    xp: 50,
    blocks: [
      {
        type: 'text',
        content: 'Dale Carnegie wrote it in 1936 and neuroscience has confirmed it since: a person\'s own name is the single most important word in any language to them. When you use someone\'s name in conversation, fMRI scans show unique activation in the left hemisphere — the brain literally perks up in a way no other word triggers.\n\nYet most of us forget names within seconds of hearing them. Not because we have bad memories — because we were never actually listening. We were too busy thinking about what to say next.',
      },
      {
        type: 'text-header',
        content: 'Why we forget (it\'s not your memory)',
      },
      {
        type: 'text',
        content: 'The moment someone says their name, your brain is juggling three things at once:\n\n① Evaluating the person in front of you\n② Planning your own introduction\n③ Managing the social anxiety of a new interaction\n\nThe name gets lost because it never made it into memory in the first place. You didn\'t forget it — you never heard it. The fix is embarrassingly simple: you have to actually decide to listen for it.',
      },
      {
        type: 'multiple-choice',
        question: 'What is the primary reason most people forget names immediately after hearing them?',
        options: [
          { text: 'Short-term memory naturally discards names', correct: false, explanation: 'Short-term memory handles names just fine — the problem happens before storage.' },
          { text: 'Names are too abstract to remember easily', correct: false, explanation: 'Names aren\'t inherently harder than other words — we remember song titles and brand names effortlessly.' },
          { text: 'Our attention is split and we never truly register the name', correct: true, explanation: 'Exactly — the name never enters memory because our attention is elsewhere during the introduction. It\'s an attention problem, not a memory problem.' },
          { text: 'We meet too many people to keep track', correct: false, explanation: 'Volume isn\'t the issue — we forget names even when meeting just one new person.' },
        ],
      },
      {
        type: 'text-header',
        content: 'The three-rep technique',
      },
      {
        type: 'text',
        content: 'Once you actually hear the name, lock it in with three repetitions within the first minute:\n\nFirst — say it back immediately: "Nice to meet you, Marco."\nSecond — use it in your next sentence: "So Marco, how do you know the host?"\nThird — use it when you part ways: "Great talking with you, Marco."\n\nThree reps in sixty seconds. That\'s all it takes to move a name from fleeting sound to something you\'ll remember next week. It feels awkward at first. Nobody notices. Everyone appreciates it.',
      },
      {
        type: 'spot-mistake',
        prompt: 'One of these people just met David at a party. Who made the mistake?',
        personA: {
          lines: [
            '"Hey, great to meet you!"',
            '"So how do you know the host?"',
            '"I\'m in marketing — been there five years."',
            '"Anyway, nice chatting — take care!"',
          ],
        },
        personB: {
          lines: [
            '"Nice to meet you, David!"',
            '"So David, how do you know the host?"',
            '"I\'m in marketing — been there five years."',
            '"Great talking with you, David — take care!"',
          ],
        },
        mistakeIs: 'A',
        explanation: 'Person A never used David\'s name once. Person B used the three-rep technique — said it back immediately, once mid-conversation, and again at the close. That\'s what locks a name in.',
      },
      {
        type: 'reflection',
        prompt: 'Think about the last time someone remembered your name unexpectedly — maybe a barista, a colleague you\'d only met once, or someone at a party. How did it make you feel? Now think about a time you forgot someone\'s name and got caught. What was different about your attention in each moment?',
        placeholder: 'E.g. When my dentist\'s receptionist called me by name without checking, I felt like I actually mattered there...',
      },
      {
        type: 'daily-action',
        headline: "Today's micro-challenge",
        instruction: 'The next time someone introduces themselves to you today — in person, on a call, even in a chat — use the three-rep technique. Say their name back immediately, use it once in conversation, and use it again when you say goodbye. Just three reps. Notice how differently the interaction feels when you anchor it with their name.',
        timeEstimate: '1 minute',
      },
    ],
  },
  {
    id: 'lesson-2',
    date: '2026-03-29',
    title: 'Your Body Speaks First',
    subtitle: 'The silent conversation happening beneath every interaction.',
    estimatedMinutes: 6,
    xp: 60,
    blocks: [
      {
        type: 'text',
        content: 'Before you open your mouth, your body has already been talking for several seconds. Posture, gesture, where your eyes go, how much space you take up — all of it lands before your first word.\n\nMost people are leaking low confidence 24/7 without realising it. Not because they\'re weak — because nobody ever pointed it out.',
      },
      {
        type: 'text-header',
        content: 'The collapse signals',
      },
      {
        type: 'text',
        content: 'These are the body language patterns that quietly undermine you:\n\n• Shoulders rolled forward and inward\n• Head tilted down, eyes to the floor or phone\n• Arms crossed or tucked tight to the body\n• Weight shifted entirely onto one leg\n• Feet pointed toward the exit\n\nEvery one of these reads as either submission or disinterest. Neither is what you want.',
      },
      {
        type: 'slider',
        prompt: 'Right now, how open and upright is your posture on a scale of 1 to 10?',
        leftLabel: 'Fully collapsed',
        rightLabel: 'Fully open',
      },
      {
        type: 'text-header',
        content: 'The 3-point reset',
      },
      {
        type: 'text',
        content: 'You don\'t need to think about a dozen things. Reset three anchors:\n\n① Feet — hip-width apart, weight balanced evenly\n② Shoulders — roll them back and down (not up — up creates tension)\n③ Chin — parallel to the floor, not tucked or jutting forward\n\nHold that for 5 seconds. That\'s the reset. Do it before any important moment.',
      },
      {
        type: 'spot-mistake',
        prompt: 'Two people walk into a networking event. Who is sending the wrong signals?',
        personA: {
          lines: [
            'Arms crossed, weight shifted onto one leg.',
            '"Yeah, I work in tech." *glances toward the door*',
            '"Mm, cool." *shifts weight again*',
            '"Sorry — I need to grab a drink." *walks off*',
          ],
        },
        personB: {
          lines: [
            'Feet hip-width apart, shoulders back and down.',
            '"Yeah, I work in tech." *holds eye contact*',
            '"What kind of work are you in?"',
            '"That\'s interesting — tell me more about that."',
          ],
        },
        mistakeIs: 'A',
        explanation: 'Person A is broadcasting every collapse signal — crossed arms, shifting weight, eyes drifting. Person B used the 3-point reset and stayed engaged. The words are almost identical; the body language tells a completely different story.',
      },
      {
        type: 'text-header',
        content: 'Mirroring — the invisible rapport builder',
      },
      {
        type: 'text',
        content: 'When people feel comfortable with each other, their body language naturally synchronises. They lean the same way, cross their legs at the same time, match each other\'s pace.\n\nYou can do this deliberately. Subtly mirror the posture and gestures of the person you\'re talking to — not immediately, with a few seconds\' delay. Done gently, it creates a subconscious sense of being understood. People can\'t name why they like talking to you. They just do.',
      },
      {
        type: 'multiple-choice',
        question: 'When using mirroring deliberately, what\'s the right approach?',
        options: [
          { text: 'Immediately copy every movement the other person makes', correct: false, explanation: 'Immediate copying is obvious and comes across as mockery. Subtlety and a slight delay are key.' },
          { text: 'Subtly match their posture and gestures with a few seconds\' delay', correct: true, explanation: 'Correct — a gentle delay makes mirroring feel natural and subconscious rather than performative.' },
          { text: 'Only mirror people you already know well', correct: false, explanation: 'Mirroring works in any interaction — it\'s especially useful with new people to build rapport quickly.' },
          { text: 'Mirror their words, not their body language', correct: false, explanation: 'The lesson covers physical mirroring of posture and gesture — that\'s what creates the subconscious rapport.' },
        ],
      },
      {
        type: 'daily-action',
        headline: "Today's micro-challenge",
        instruction: 'Set a single phone alarm for a random time today. When it goes off — wherever you are — do the 3-point reset: feet, shoulders, chin. Hold it for 5 seconds. Then in your next conversation, try one moment of deliberate mirroring. Notice if the energy shifts.',
        timeEstimate: '5 seconds + one conversation',
      },
    ],
  },

  {
    id: 'lesson-3',
    date: '2026-03-30',
    title: 'The Art of Actually Listening',
    subtitle: 'The rarest social skill — and why it makes you magnetic.',
    estimatedMinutes: 5,
    xp: 50,
    blocks: [
      {
        type: 'text',
        content: 'Most people aren\'t listening. They\'re waiting to talk.\n\nWhile you\'re speaking, they\'re composing their response, thinking of their related story, planning their next point. You can feel it — and it\'s deflating. Real listening is so rare that when someone does it, it feels like a gift.',
      },
      {
        type: 'text-header',
        content: 'What listening actually looks like',
      },
      {
        type: 'text',
        content: 'Active listening isn\'t nodding aggressively. It\'s:\n\n• Letting people finish without interruption — even when there\'s a pause\n• Asking one follow-up question about what they just said, not pivoting to yourself\n• Reflecting back what you heard before adding your perspective\n• Tolerating silence without rushing to fill it\n\nThe goal isn\'t to respond well. It\'s to make the other person feel genuinely heard.',
      },
      {
        type: 'multiple-choice',
        question: 'What\'s the best follow-up move after someone shares something with you?',
        options: [
          { text: 'Share a similar experience of your own to show you relate', correct: false, explanation: 'This pivots the conversation back to you — even with good intentions, it signals you were waiting to talk about yourself.' },
          { text: 'Ask a follow-up question about what they just said', correct: true, explanation: 'Correct — a question about their specific experience signals you were actually listening, not just waiting to respond.' },
          { text: 'Offer advice on how to handle the situation', correct: false, explanation: 'Advice is often unwanted — most people want to be heard first, helped second. Ask before advising.' },
          { text: 'Change the subject to keep things from getting heavy', correct: false, explanation: 'Changing the subject signals discomfort or disinterest — the opposite of genuine listening.' },
        ],
      },
      {
        type: 'text-header',
        content: 'The question that changes conversations',
      },
      {
        type: 'text',
        content: 'Most conversations stay surface-level because both people ask surface questions. "How\'s work?" gets "good, busy." And that\'s where it dies.\n\nTry this instead: ask one level deeper than you normally would.\n\n"What\'s been the most interesting part of that?"\n"What made you decide to do it that way?"\n"How are you feeling about it, honestly?"\n\nOne good question opens a door that ten polite ones never would.',
      },
      {
        type: 'spot-mistake',
        prompt: 'A friend just said: "I\'ve been really stressed about this big presentation at work." Who responded better?',
        personA: {
          lines: [
            '"Oh man, I had a nightmare presentation last month."',
            '"Mine was in front of the whole company — 200 people."',
            '"I barely slept the night before, it was awful."',
            '"Anyway, what\'s yours about?"',
          ],
        },
        personB: {
          lines: [
            '"What\'s making you most anxious about it?"',
            '"How long have you had to prepare?"',
            '"What would a good outcome look like for you?"',
            '"Is there anything I can do to help?"',
          ],
        },
        mistakeIs: 'A',
        explanation: 'Person A hijacked the moment with their own story — even with good intentions, it signals "I was waiting to talk about myself." Person B stayed entirely curious about the other person. Four questions, zero self-reference. That\'s what makes someone feel genuinely heard.',
      },
      {
        type: 'text-header',
        content: 'Food for thought',
      },
      {
        type: 'text',
        content: 'The people remembered as great conversationalists are almost never the wittiest or most knowledgeable in the room. They\'re the ones who made everyone else feel interesting.\n\nBeing interested is more magnetic than being interesting.',
      },
      {
        type: 'reflection',
        prompt: 'Think about your last few conversations. Were you mostly listening, or mostly waiting to speak? What\'s one question you could have asked that you didn\'t?',
        placeholder: 'E.g. My friend mentioned she was stressed at work and I immediately talked about my own job instead of asking what was going on for her...',
      },
      {
        type: 'daily-action',
        headline: "Today's micro-challenge",
        instruction: 'In your next real conversation, ask one question you normally wouldn\'t. Go one level deeper than the surface. Then stop talking and actually listen to the full answer before responding. That\'s it. Just once.',
        timeEstimate: 'One conversation',
      },
    ],
  },
]

// Returns a YYYY-MM-DD string for today offset by N days (for admin simulation)
export function getDateStr(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toISOString().slice(0, 10)
}

// Returns a human-readable date string like "Saturday, March 28"
export function formatDisplayDate(offsetDays = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}

export function getTodaysLesson(dateStr) {
  return lessons.find(l => l.date === dateStr) || null
}

export function getLessonById(id) {
  return lessons.find(l => l.id === id) || null
}

export function isLessonAvailable(lesson, todayStr) {
  return lesson.date <= todayStr
}
