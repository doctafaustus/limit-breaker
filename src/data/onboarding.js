export const onboardingQuestions = [
  {
    id: 'q1',
    question: "What's holding you back right now?",
    options: [
      {
        id: 'a',
        text: 'I freeze up in social situations and feel invisible in rooms',
        emoji: '😬',
        weight: { communication: 3, intelligence: 0, content: 0 },
      },
      {
        id: 'b',
        text: "I can't retain information or think clearly under pressure",
        emoji: '🧠',
        weight: { communication: 0, intelligence: 3, content: 0 },
      },
      {
        id: 'c',
        text: "I post content but nobody sees it and I don't know why",
        emoji: '📱',
        weight: { communication: 0, intelligence: 0, content: 3 },
      },
      {
        id: 'd',
        text: 'I want to be sharper, more confident, and more influential overall',
        emoji: '🎯',
        weight: { communication: 1, intelligence: 1, content: 1 },
      },
    ],
  },
  {
    id: 'q2',
    question: 'Which of these feels most like a win to you?',
    options: [
      {
        id: 'a',
        text: 'Owning a conversation and leaving people impressed',
        emoji: '💬',
        weight: { communication: 2, intelligence: 0, content: 0 },
      },
      {
        id: 'b',
        text: 'Reading a book and actually remembering it a month later',
        emoji: '📖',
        weight: { communication: 0, intelligence: 2, content: 0 },
      },
      {
        id: 'c',
        text: 'Posting something that hits 10K views overnight',
        emoji: '🚀',
        weight: { communication: 0, intelligence: 0, content: 2 },
      },
      {
        id: 'd',
        text: 'All of the above, eventually',
        emoji: '⚡',
        weight: { communication: 1, intelligence: 1, content: 1 },
      },
    ],
  },
  {
    id: 'q3',
    question: 'How much time can you commit daily?',
    options: [
      {
        id: 'a',
        text: "5 minutes max — I'm always rushed",
        emoji: '⏱',
        weight: { communication: 0, intelligence: 0, content: 0 },
      },
      {
        id: 'b',
        text: 'Around 10 minutes',
        emoji: '🕐',
        weight: { communication: 0, intelligence: 0, content: 0 },
      },
      {
        id: 'c',
        text: "Up to 20–30 minutes if the content is good",
        emoji: '🕒',
        weight: { communication: 0, intelligence: 0, content: 0 },
      },
    ],
  },
  {
    id: 'q4',
    question: 'Pick the person you most want to become:',
    options: [
      {
        id: 'a',
        text: 'The one who walks into any room and instantly commands respect',
        emoji: '🎤',
        weight: { communication: 3, intelligence: 0, content: 0 },
      },
      {
        id: 'b',
        text: "The one who sees patterns others miss and makes better decisions",
        emoji: '🔬',
        weight: { communication: 0, intelligence: 3, content: 0 },
      },
      {
        id: 'c',
        text: 'The one who builds an audience and turns ideas into influence',
        emoji: '🌐',
        weight: { communication: 0, intelligence: 0, content: 3 },
      },
    ],
  },
]
