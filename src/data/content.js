export const journeys = [
  {
    id: 'communication',
    title: 'Communication & Charisma',
    subtitle: 'Be the person they remember.',
    description: 'Your path starts with presence. You\'ll master the unspoken rules of connection — body language, voice, storytelling, and the art of being impossible to ignore.',
    emoji: '💬',
    color: '#FF6B6B',
    colorLight: '#FFE5E5',
    colorScheme: 'red',
  },
  {
    id: 'intelligence',
    title: 'Intelligence Training',
    subtitle: 'Think better. Learn faster. Decide smarter.',
    description: 'Your path starts with your mind. You\'ll rewire how you learn, think, and decide — using the same mental tools as top performers, scientists, and strategists.',
    emoji: '🧠',
    color: '#4ECDC4',
    colorLight: '#E0F7F6',
    colorScheme: 'teal',
  },
  {
    id: 'content',
    title: 'Content Creation & Audience Growth',
    subtitle: 'Build an audience that actually cares.',
    description: 'Your path starts with reach. You\'ll decode how platforms work, craft hooks that stop the scroll, and build an audience that actually cares.',
    emoji: '📱',
    color: '#FFD93D',
    colorLight: '#FFF8DC',
    colorScheme: 'yellow',
  },
]

export const lessons = {
  communication: [
    {
      id: 'comm-1-1',
      day: 1,
      title: 'The 7-Second Rule',
      subtitle: 'Why snap judgments stick — and how to use that to your advantage.',
      estimatedMinutes: 5,
      xp: 50,
      moduleTitle: 'First Impressions',
      blocks: [
        {
          type: 'text',
          content: 'In 1992, psychologist Nalini Ambady filmed students being taught by professors — then cut the footage to silent 10-second clips. Strangers rating those clips predicted end-of-semester student evaluations with remarkable accuracy.\n\nWe like to think we\'re rational. We\'re not. The brain makes social judgments in milliseconds, using a handful of powerful signals. The good news: those signals are completely within your control.',
        },
        {
          type: 'text-header',
          content: 'The 3 signals that drive first impressions',
        },
        {
          type: 'text',
          content: 'Research by Albert Mehrabian (often misquoted, but the categories hold) points to three channels:\n\n• Appearance & body language — your posture, grooming, and how you carry yourself\n• Vocal tone — the warmth, confidence, and rhythm of your voice\n• Words — what you actually say (matters less than most people think in the first 7 seconds)\n\nYou can\'t change what you say fast enough to override a slumped posture and a mumbled "hey." Fix the container first.',
        },
        {
          type: 'fill-blank',
          prompt: 'According to Mehrabian\'s categories, the three channels of a first impression are ___, ___, and ___.',
          blanks: ['appearance & body language', 'vocal tone', 'words'],
        },
        {
          type: 'text-header',
          content: 'The one thing to remember',
        },
        {
          type: 'text',
          content: 'People don\'t remember what you said in a first meeting. They remember how you made them feel. Your job in the first 7 seconds isn\'t to be impressive — it\'s to be safe and warm. Confidence without warmth reads as arrogance. Warmth without confidence reads as anxiety. You want both.',
        },
        {
          type: 'reflection',
          prompt: 'Think about someone who made a strong first impression on you. What was it specifically — something they did, said, or how they carried themselves? Write down one concrete detail.',
          placeholder: 'E.g. She made direct eye contact and didn\'t rush to fill the silence...',
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'The next time you walk into a room today — a meeting, a coffee shop, anywhere — pause for one full second before saying anything. Stand tall, make brief eye contact with whoever is nearest, and let a small smile settle on your face first. Just one second. Notice how it changes the energy.',
          timeEstimate: '30 seconds of practice',
        },
      ],
    },
    {
      id: 'comm-1-2',
      day: 2,
      title: 'The Power Stance',
      subtitle: 'Your body shapes your mind before it shapes anyone else\'s opinion.',
      estimatedMinutes: 4,
      xp: 40,
      moduleTitle: 'First Impressions',
      blocks: [
        {
          type: 'text',
          content: 'Amy Cuddy\'s 2010 Harvard research showed that holding "expansive" postures for just 2 minutes altered hormone levels — testosterone up, cortisol down. The research has been partially contested since, but the behavioral insight remains solid: how you hold your body changes how you feel, which changes how you act, which changes how others perceive you.\n\nYou don\'t need a power pose in the bathroom before a presentation. You need to stop defaulting to collapsed posture everywhere else.',
        },
        {
          type: 'text-header',
          content: 'The collapse signals',
        },
        {
          type: 'text',
          content: 'Most people are leaking confidence 24/7 without knowing it:\n\n• Shoulders rolled forward and inward (protective posture)\n• Head tilted down, eyes to the floor or phone\n• Arms crossed or tucked tight to the body\n• Weight shifted entirely onto one leg\n• Feet pointed toward the exit (seriously — people notice this subconsciously)\n\nEvery one of these signals reads as either submission or disinterest. Neither is what you want.',
        },
        {
          type: 'slider',
          prompt: 'Right now, how would you describe your default posture when standing in a public space?',
          leftLabel: 'Fully collapsed / hunched',
          rightLabel: 'Chest open / fully upright',
        },
        {
          type: 'text-header',
          content: 'The 3-point reset',
        },
        {
          type: 'text',
          content: 'You don\'t need to think about a dozen things. Just reset three anchors:\n\n1. Feet — hip-width apart, weight balanced evenly\n2. Shoulders — roll them back and down, not back and up (up = tension)\n3. Chin — parallel to the floor, not tucked or jutting forward\n\nHold that for 5 seconds. That\'s it. That\'s the reset.',
        },
        {
          type: 'multiple-choice',
          question: 'According to the lesson, which of the following is NOT one of the 3-point posture reset anchors?',
          options: [
            { text: 'Feet (hip-width apart)', correct: false, explanation: 'This is one of the three anchors.' },
            { text: 'Shoulders (back and down)', correct: false, explanation: 'This is one of the three anchors.' },
            { text: 'Hands (open and visible)', correct: true, explanation: 'Hands aren\'t in the 3-point reset — though open hands are a good habit, the three anchors are feet, shoulders, and chin.' },
            { text: 'Chin (parallel to floor)', correct: false, explanation: 'This is one of the three anchors.' },
          ],
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Set a single phone alarm for a random time today. When it goes off, wherever you are, do the 3-point reset: feet, shoulders, chin. Hold it for 5 seconds. That\'s the whole challenge.',
          timeEstimate: '5 seconds',
        },
      ],
    },
    {
      id: 'comm-1-3',
      day: 3,
      title: 'Eye Contact Mastery',
      subtitle: 'The most powerful non-verbal signal — and why most people get it completely wrong.',
      estimatedMinutes: 6,
      xp: 60,
      moduleTitle: 'First Impressions',
      blocks: [
        {
          type: 'text',
          content: 'Sustained, comfortable eye contact is the single fastest way to project confidence and connection. It\'s also the thing most people either avoid entirely (darting eyes, looking at the ground) or overdo (unblinking stare that makes people uncomfortable).\n\nThe goal isn\'t maximum eye contact. The goal is confident, warm, occasional eye contact — enough to signal that you\'re present and engaged, not so much that it feels like a power struggle.',
        },
        {
          type: 'text-header',
          content: 'The Triangle Technique',
        },
        {
          type: 'text',
          content: 'Used by professional speakers and actors:\n\nDraw an imaginary triangle on the other person\'s face — left eye → right eye → mouth → left eye → repeat.\n\nSpend roughly 3–5 seconds on each point before rotating. This mimics what humans do naturally when we feel genuine interest in someone. It\'s warm, attentive, and never feels like staring.\n\nIn group settings, rotate the triangle across different people in the room every few sentences. This makes everyone feel included without singling anyone out.',
        },
        {
          type: 'fill-blank',
          prompt: 'The Triangle Technique involves rotating your gaze between the left eye, right eye, and ___ of the other person.',
          blanks: ['mouth'],
        },
        {
          type: 'text-header',
          content: 'The break matters too',
        },
        {
          type: 'text',
          content: 'When you do break eye contact, break it sideways or up — never down. Looking down reads as shame, deception, or submission. Looking to the side or slightly up reads as thinking, reflecting, considering. Small difference, massive perception shift.',
        },
        {
          type: 'multiple-choice',
          question: 'When breaking eye contact, which direction is best to avoid?',
          options: [
            { text: 'Sideways to the left or right', correct: false, explanation: 'Sideways breaks are fine — they read as thoughtful, not submissive.' },
            { text: 'Slightly upward', correct: false, explanation: 'Looking up reads as reflecting or considering — that\'s fine.' },
            { text: 'Downward', correct: true, explanation: 'Looking down reads as shame, deception, or submission. Always break sideways or up.' },
            { text: 'Any direction is equal', correct: false, explanation: 'Direction of the eye break sends a specific signal — downward is the one to avoid.' },
          ],
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'In your next face-to-face conversation — even a quick one at a checkout counter or with a colleague — consciously practice the Triangle Technique. Left eye → right eye → mouth → repeat. You don\'t need to announce it. Just try it and notice whether the other person seems more engaged.',
          timeEstimate: 'One conversation',
        },
      ],
    },
  ],

  intelligence: [
    {
      id: 'intel-1-1',
      day: 1,
      title: 'How Memory Actually Works',
      subtitle: 'The three stages of memory — and where most people lose information.',
      estimatedMinutes: 6,
      xp: 60,
      moduleTitle: 'Memory Foundations',
      blocks: [
        {
          type: 'text',
          content: 'Every piece of information you encounter goes through three stages:\n\nEncoding — you pay attention and convert the experience into a neural pattern\nStorage — the pattern consolidates (sleep is critical here)\nRetrieval — you access the pattern when you need it\n\nMost "bad memory" problems happen at the encoding stage, not storage or retrieval. The information was never properly recorded in the first place because we were distracted, passive, or not paying attention at the moment of input.\n\nYou can\'t retrieve what was never stored.',
        },
        {
          type: 'text-header',
          content: 'The forgetting curve',
        },
        {
          type: 'text',
          content: 'In 1885, German psychologist Hermann Ebbinghaus mapped how quickly we forget newly learned information. Without any reinforcement:\n\n• After 20 minutes: you\'ve forgotten 42% of what you just learned\n• After 1 hour: 56% gone\n• After 1 day: 67% gone\n• After 1 week: 77% gone\n\nThe curve flattens with repetition — but only if the repetition happens at the right intervals. This is the basis of spaced repetition, which you\'ll learn in Lesson 1.3.',
        },
        {
          type: 'fill-blank',
          prompt: 'The three stages of memory are ___, ___, and ___.',
          blanks: ['encoding', 'storage', 'retrieval'],
        },
        {
          type: 'text-header',
          content: 'Active vs. passive learning',
        },
        {
          type: 'text',
          content: 'Reading is passive. Watching a video is passive. Listening to a lecture is passive.\n\nNone of them reliably produce lasting memory unless paired with active processing: taking notes in your own words, explaining it to someone else, testing yourself, or connecting the new idea to something you already know.\n\nThe single highest-leverage change most people can make: stop re-reading, start self-testing.',
        },
        {
          type: 'multiple-choice',
          question: 'According to Ebbinghaus\'s forgetting curve, approximately what percentage of new information is forgotten within one day without reinforcement?',
          options: [
            { text: 'Around 20%', correct: false, explanation: 'That\'s closer to the 20-minute mark on the curve.' },
            { text: 'Around 40%', correct: false, explanation: 'That\'s closer to the 1-hour mark.' },
            { text: 'Around 67%', correct: true, explanation: 'Ebbinghaus found roughly 67% of new information is lost within 24 hours without review.' },
            { text: 'Around 90%', correct: false, explanation: '90% loss doesn\'t happen until several weeks in without any reinforcement.' },
          ],
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Pick one thing you learned today — from a meeting, a conversation, an article, anything. Write it down in your own words in 2–3 sentences as if explaining it to a 12-year-old. Don\'t copy what was said — translate it. This single act of "encoding in your own language" increases retention by over 50% compared to passive review.',
          timeEstimate: '3 minutes',
        },
      ],
    },
    {
      id: 'intel-1-2',
      day: 2,
      title: 'The Memory Palace',
      subtitle: 'The ancient technique that memory champions still use today.',
      estimatedMinutes: 8,
      xp: 80,
      moduleTitle: 'Memory Foundations',
      blocks: [
        {
          type: 'text',
          content: 'The Memory Palace (Method of Loci) is at least 2,500 years old. It was used by Greek orators to memorize hours-long speeches without notes. It\'s used today by competitors in the World Memory Championships to memorize the order of entire decks of cards in under 2 minutes.\n\nThe technique works because the human brain is exceptional at spatial memory and terrible at abstract list memory. Your ancestors needed to remember where the food was and where the predators were. That spatial circuitry is still there — and you can exploit it.',
        },
        {
          type: 'text-header',
          content: 'How to build your first palace',
        },
        {
          type: 'text',
          content: 'Step 1: Choose a familiar location — your home, your commute route, a school you know well. The more detail you can picture, the better.\n\nStep 2: Define a route through it — a consistent path you mentally walk. Example: front door → entryway → living room → kitchen → hallway → bedroom.\n\nStep 3: Create vivid stations — specific spots along the route where you\'ll "place" information. Each spot = one memory item.\n\nStep 4: Place bizarre, vivid images at each station. The stranger, more sensory, and more ridiculous the image, the better your brain encodes it. (The brain ignores normal things. It flags weird things as worth keeping.)\n\nStep 5: Walk the route to retrieve — mentally walk your route in order and the images (and the information they represent) appear.',
        },
        {
          type: 'text-header',
          content: 'Example: remembering a grocery list',
        },
        {
          type: 'text',
          content: 'List: eggs, milk, coffee, bananas, toothpaste\n\n• Front door: Imagine cracking an enormous egg against your door, yolk dripping everywhere\n• Entryway: A flood of milk gushing across the floor\n• Living room: A giant coffee bean sitting on your couch, reading a newspaper\n• Kitchen: Monkeys swinging from your cabinets, throwing bananas\n• Hallway: A massive toothpaste tube squeezed so hard it explodes on the walls\n\nWalk the route tonight and see if you can recall all five without the list.',
        },
        {
          type: 'reflection',
          prompt: 'Think of a location you know extremely well — your childhood home, your current apartment, a school, a workplace. Describe the first 3 "stations" on a route through it. What do you see at each one?',
          placeholder: 'E.g. Station 1: My front door — I can picture the exact color, the handle, the mat outside...',
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Build your first Memory Palace with 5 items. Use your current home. Choose 5 things you need to remember this week — a to-do list, a shopping list, someone\'s name plus 4 facts about them, anything. Place one bizarre image at each of 5 spots in your home. Tonight or tomorrow morning, walk the route mentally and see what you recall. You\'ll be surprised.',
          timeEstimate: '5 minutes',
        },
      ],
    },
    {
      id: 'intel-1-3',
      day: 3,
      title: 'Spaced Repetition',
      subtitle: 'Review at exactly the right moment — and never forget anything important again.',
      estimatedMinutes: 5,
      xp: 50,
      moduleTitle: 'Memory Foundations',
      blocks: [
        {
          type: 'text',
          content: 'The forgetting curve (from Lesson 1.1) has a built-in exploit: every time you successfully retrieve a memory, the curve resets — but flatter than before. Review something just before you forget it and the memory strengthens dramatically.\n\nThis is spaced repetition: reviewing information at increasing intervals timed to match the forgetting curve.\n\nTypical intervals: review after 1 day → 3 days → 1 week → 2 weeks → 1 month → 3 months.',
        },
        {
          type: 'text-header',
          content: 'Why re-reading fails',
        },
        {
          type: 'text',
          content: 'When you re-read notes or a textbook, everything feels familiar. That feeling of recognition gets confused with actual knowledge. But recognition ≠ recall.\n\nThe test of real memory is: can you produce the information from scratch, with the source hidden? That\'s retrieval. That\'s what spaced repetition trains.',
        },
        {
          type: 'multiple-choice',
          question: 'What happens to the forgetting curve each time you successfully retrieve a memory?',
          options: [
            { text: 'It accelerates — information is forgotten faster after recall', correct: false, explanation: 'Retrieval strengthens, not weakens, memory.' },
            { text: 'It stays the same', correct: false, explanation: 'Successful retrieval changes the curve.' },
            { text: 'It resets flatter — the memory decays more slowly next time', correct: true, explanation: 'Each successful retrieval makes the memory more durable, so the forgetting curve resets at a shallower slope.' },
            { text: 'Nothing — retrieval doesn\'t affect storage', correct: false, explanation: 'The act of retrieval itself is one of the most powerful memory consolidation events.' },
          ],
        },
        {
          type: 'text-header',
          content: 'Practical spaced repetition (no app required)',
        },
        {
          type: 'text',
          content: 'Simple system: use index cards or a phone note.\n\n• Write a question on one side, answer on the other\n• New cards: review tomorrow\n• Correct recall: push the next review out (3 days, then 1 week, etc.)\n• Incorrect recall: reset to tomorrow\n\nApps like Anki automate this completely. But the principle works with pen and paper.',
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Make 3 flashcards — physical or digital — from something you want to remember. It can be from this lesson (what is the forgetting curve? what are the spaced repetition intervals?), from work, from a book. Test yourself on them tonight. Then tomorrow. That\'s the system started.',
          timeEstimate: '5 minutes',
        },
      ],
    },
  ],

  content: [
    {
      id: 'content-1-1',
      day: 1,
      title: 'How the Algorithm Decides Your Reach',
      subtitle: "It's not mysterious. It's a machine optimizing for one thing.",
      estimatedMinutes: 5,
      xp: 50,
      moduleTitle: 'Algorithm Fundamentals',
      blocks: [
        {
          type: 'text',
          content: 'Every major platform — Instagram, TikTok, YouTube, LinkedIn — runs on recommendation algorithms that are, at their core, doing one thing: maximizing time spent on the platform.\n\nThat\'s it. The algorithm doesn\'t care about you, your brand, or your content quality in any aesthetic sense. It cares about whether people engage with your content in ways that keep them on the platform longer.\n\nEverything else flows from this.',
        },
        {
          type: 'text-header',
          content: 'What the algorithm measures',
        },
        {
          type: 'text',
          content: 'Different platforms weight signals differently, but these are universal:\n\nWatch/read time — Did people consume the whole thing? Or did they leave in the first 3 seconds?\nCompletion rate — What percentage finished?\nSaves/bookmarks — The strongest signal on most platforms. Saving = "I want to come back to this."\nShares — Brings new users to the platform. Algorithms love this.\nComments — Especially comments that spark replies (conversations = dwell time).\nLikes — Useful but weakest of the engagement signals on most platforms.',
        },
        {
          type: 'fill-blank',
          prompt: 'Algorithms optimize for maximizing ___ spent on the platform. The strongest engagement signal on most platforms is ___, because it signals "I want to come back to this."',
          blanks: ['time', 'saves/bookmarks'],
        },
        {
          type: 'text-header',
          content: 'What this means for your strategy',
        },
        {
          type: 'text',
          content: 'You should be creating content optimized for saves and shares, not likes. Likes are validation. Saves and shares are distribution.\n\nContent that gets saved: cheat sheets, how-to breakdowns, reference material, things people want to show someone else.\nContent that gets shared: things that make the sharer look good, things that are emotionally resonant, things that articulate what someone already feels but couldn\'t express.',
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Look at your last 5 posts (or someone you follow if you\'re not posting yet). Which one had the most saves? Which had the most shares? What was different about that content? Write one observation. This is your first data point.',
          timeEstimate: '5 minutes',
        },
      ],
    },
    {
      id: 'content-1-2',
      day: 2,
      title: 'The Hook Formula',
      subtitle: "You have 3 seconds. Here's what to do with them.",
      estimatedMinutes: 6,
      xp: 60,
      moduleTitle: 'Algorithm Fundamentals',
      blocks: [
        {
          type: 'text',
          content: 'On TikTok, 45% of users who are going to stop watching a video do so in the first 3 seconds. On Instagram Reels, the pattern is similar. On YouTube, the first 30 seconds are critical.\n\nThis isn\'t a platform quirk. It\'s human attention. We are wired to decide immediately whether something is worth our time. The beginning of your content — the hook — determines whether anyone sees the rest of it.\n\nMost creators spend 80% of their effort on the content and 5% on the hook. The algorithm forces the opposite math.',
        },
        {
          type: 'text-header',
          content: 'The 3 hook types that work',
        },
        {
          type: 'text',
          content: 'The Bold Claim: "I grew from 0 to 50K followers in 90 days. Here\'s the only thing that actually moved the needle."\nOpens a loop. Creates curiosity. Makes a specific promise.\n\nThe Contrarian Statement: "Working harder is the reason you\'re not getting ahead."\nChallenges an assumption. Creates mild tension. Forces the viewer to keep watching to understand.\n\nThe Direct Address: "If you\'ve been posting consistently for 6 months and your account still hasn\'t grown — watch this."\nSpeaks directly to a specific person and their specific frustration. Immediately relevant.',
        },
        {
          type: 'multiple-choice',
          question: 'What percentage of TikTok viewers who will stop watching a video do so within the first 3 seconds?',
          options: [
            { text: '15%', correct: false, explanation: 'The actual figure is much higher.' },
            { text: '25%', correct: false, explanation: 'The actual figure is much higher.' },
            { text: '45%', correct: true, explanation: 'Research shows 45% of drop-offs happen in the first 3 seconds — which is why the hook is the highest-leverage part of any short-form video.' },
            { text: '70%', correct: false, explanation: 'The actual figure is 45%, not quite that high.' },
          ],
        },
        {
          type: 'text-header',
          content: 'The Hook Formula',
        },
        {
          type: 'text',
          content: 'Strong hooks have three elements:\n\n1. Specificity — numbers, names, and timeframes beat vague claims every time ("50K followers in 90 days" beats "I grew a lot")\n2. An open loop — imply that something valuable or surprising is coming, without revealing it yet\n3. Immediate relevance — the viewer should know in 2 seconds whether this is for them',
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Write 3 hook variations for a piece of content in your niche — one Bold Claim, one Contrarian Statement, one Direct Address. They don\'t have to be perfect. The goal is to practice the formula. Write them out and ask yourself: which one would make you stop scrolling?',
          timeEstimate: '10 minutes',
        },
      ],
    },
    {
      id: 'content-1-3',
      day: 3,
      title: 'Watch Time vs. Engagement',
      subtitle: 'What the numbers actually mean — and which ones to stop chasing.',
      estimatedMinutes: 5,
      xp: 50,
      moduleTitle: 'Algorithm Fundamentals',
      blocks: [
        {
          type: 'text',
          content: 'Vanity metrics are the statistics that feel good but don\'t predict growth: total followers, likes, profile visits, impressions.\n\nGrowth metrics are the statistics that actually correlate with algorithmic distribution: watch time, completion rate, saves, shares, follower growth rate.\n\nMost creators optimize for vanity metrics — because they\'re visible and immediate. The algorithm optimizes for growth metrics — because those predict platform stickiness.',
        },
        {
          type: 'text-header',
          content: 'Watch time: the master metric',
        },
        {
          type: 'text',
          content: 'Watch time (total minutes viewed) is the single most important metric on video platforms. An algorithm would rather show a 2-minute video with 80% completion to 1,000 people than a 10-minute video with 20% completion to the same 1,000 people — even though the longer video technically has more "watch time" per viewer.\n\nCompletion rate is often more meaningful than raw duration.\n\nImplication: a 30-second video that almost everyone finishes can outperform a 5-minute video that most people abandon at the 1-minute mark.',
        },
        {
          type: 'fill-blank',
          prompt: 'Vanity metrics like likes and impressions feel good but don\'t predict growth. Growth metrics like ___ and ___ actually correlate with algorithmic distribution.',
          blanks: ['watch time / completion rate', 'saves / shares'],
        },
        {
          type: 'multiple-choice',
          question: 'Between two videos shown to 1,000 people — a 2-minute video with 80% completion and a 10-minute video with 20% completion — which does the algorithm typically favor?',
          options: [
            { text: 'The 10-minute video, because longer content = more value', correct: false, explanation: 'Duration alone doesn\'t determine algorithmic preference.' },
            { text: 'The 2-minute video, because completion rate is the stronger signal', correct: true, explanation: 'High completion rate signals that the content held attention all the way through — that\'s what algorithms reward.' },
            { text: 'They perform equally', correct: false, explanation: 'Completion rate makes a significant difference in how algorithms distribute content.' },
            { text: 'Whichever has more likes', correct: false, explanation: 'Likes are a weak signal compared to completion and watch time.' },
          ],
        },
        {
          type: 'daily-action',
          headline: 'Today\'s micro-challenge',
          instruction: 'Go into your analytics on any platform you use (Instagram, TikTok, YouTube, LinkedIn). Find completion rate or average watch time if available. Which piece of content has the highest completion rate? What about it caused people to stay? Write one observation.',
          timeEstimate: '5 minutes',
        },
      ],
    },
  ],
}

export function getLessonById(lessonId) {
  for (const journeyLessons of Object.values(lessons)) {
    const found = journeyLessons.find(l => l.id === lessonId)
    if (found) return found
  }
  return null
}

export function getJourneyById(journeyId) {
  return journeys.find(j => j.id === journeyId) || null
}

export function getTodayLesson(journeyId, currentDay) {
  if (!journeyId || !lessons[journeyId]) return null
  return lessons[journeyId].find(l => l.day === currentDay) || null
}
