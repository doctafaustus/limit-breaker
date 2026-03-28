// One word per day, keyed by currentDay (1, 2, 3)
const vocabWords = [
  {
    day: 1,
    word: 'Gravitas',
    partOfSpeech: 'noun',
    pronunciation: 'grav·i·tas',
    definition:
      'A quality of seriousness, dignity, and weight in a person\'s manner that naturally commands the respect and attention of others.',
    example:
      'When she paused before answering and held the room\'s gaze, the gravitas she projected made every word land twice as hard.',
    origin: 'Latin — literally "weight" or "heaviness"',
  },
  {
    day: 2,
    word: 'Mnemonics',
    partOfSpeech: 'noun',
    pronunciation: 'neh·mon·ics',
    definition:
      'A system of patterns, rhymes, images, or associations designed to make information easier to encode into memory and retrieve later.',
    example:
      'He built a mnemonic for every new client\'s name by linking it to a vivid mental image — and never forgot a single one after that.',
    origin: 'Greek — from Mnemosyne, the goddess of memory',
  },
  {
    day: 3,
    word: 'Heuristic',
    partOfSpeech: 'noun / adjective',
    pronunciation: 'hyoo·ris·tic',
    definition:
      'A practical mental shortcut or rule of thumb that enables faster decision-making — not guaranteed to be perfect, but reliably good enough to navigate complex situations.',
    example:
      'Her heuristic for evaluating content ideas was simple: "Would I stop scrolling for this?" — and it cut her planning time in half.',
    origin: 'Greek — heuriskein, "to find" or "to discover"',
  },
]

export function getVocabForDay(day) {
  return vocabWords.find(v => v.day === day) || vocabWords[0]
}

export default vocabWords
