export const lessons = [
  {
    id: 'lesson-1',
    day: 1,
    title: 'The 7-Second Window',
    subtitle: 'How strangers judge you before you say a word — and what to do about it.',
    estimatedMinutes: 5,
    xp: 50,
    blocks: [
      {
        type: 'text',
        content: 'In 1992, psychologist Nalini Ambady filmed students being taught by professors — then cut the footage to silent 10-second clips. Strangers rating those clips predicted end-of-semester student evaluations with remarkable accuracy.\n\nWe like to think we\'re rational. We\'re not. The brain makes social judgments in milliseconds — and those judgments stick. The good news: the signals that drive them are entirely within your control.',
      },
      {
        type: 'text-header',
        content: 'What people actually read in those 7 seconds',
      },
      {
        type: 'text',
        content: 'It\'s not your words. In the first moments of meeting someone, three channels do the work:\n\n① Posture and how you carry yourself\n② The warmth and confidence in your face\n③ The energy you bring into the space\n\nYour words come fourth — long after the impression is already forming.',
      },
      {
        type: 'multiple-choice',
        question: 'According to Nalini Ambady\'s research, silent 10-second clips of professors were enough to predict what?',
        options: [
          { text: 'The professor\'s years of experience', correct: false, explanation: 'Experience wasn\'t what observers could reliably detect from body language alone.' },
          { text: 'End-of-semester student evaluations', correct: true, explanation: 'Correct — strangers watching silent clips predicted how students rated professors months later. First impressions are that durable.' },
          { text: 'Student exam scores', correct: false, explanation: 'The study looked at perception of the professor, not student performance.' },
          { text: 'Whether the class was difficult', correct: false, explanation: 'Difficulty wasn\'t what the clips revealed — likeability and presence were.' },
        ],
      },
      {
        type: 'text-header',
        content: 'The one thing to remember',
      },
      {
        type: 'text',
        content: 'People don\'t remember what you said in a first meeting. They remember how you made them feel.\n\nYour job in the first 7 seconds isn\'t to be impressive — it\'s to be warm and present. Confidence without warmth reads as arrogance. Warmth without confidence reads as anxiety. You want both.',
      },
      {
        type: 'fill-blank',
        prompt: 'People don\'t remember what you said — they remember how you made them ___. Your goal in the first 7 seconds is to be both ___ and ___.',
        blanks: ['feel', 'warm', 'confident'],
      },
      {
        type: 'reflection',
        prompt: 'Think of someone who made a strong first impression on you. What specifically did they do — something about how they carried themselves, their eye contact, their energy? Write down one concrete detail.',
        placeholder: 'E.g. He made direct eye contact and didn\'t rush to fill the silence...',
      },
      {
        type: 'daily-action',
        headline: "Today's micro-challenge",
        instruction: 'The next time you walk into a room today — a meeting, a coffee shop, anywhere — pause for one full second before saying anything. Stand tall, make brief eye contact with whoever is nearest, and let a small smile settle on your face first. Just one second. Notice how it changes the energy.',
        timeEstimate: '30 seconds',
      },
    ],
  },

  {
    id: 'lesson-2',
    day: 2,
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
        type: 'fill-blank',
        prompt: 'The 3-point posture reset covers: ___, shoulders back and ___, and chin ___ to the floor.',
        blanks: ['feet', 'down', 'parallel'],
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
    day: 3,
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
        type: 'fill-blank',
        prompt: 'Most conversations stay surface-level because people ask ___ questions. Asking one level ___ opens conversations that polite questions never would.',
        blanks: ['surface', 'deeper'],
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

export function getLessonByDay(day) {
  return lessons.find(l => l.day === day) || lessons[0]
}

export function getLessonById(id) {
  return lessons.find(l => l.id === id) || null
}
