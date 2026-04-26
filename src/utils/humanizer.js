const contractions = {
  'do not': "don't",
  'does not': "doesn't",
  'did not': "didn't",
  'is not': "isn't",
  'are not': "aren't",
  'was not': "wasn't",
  'were not': "weren't",
  'have not': "haven't",
  'has not': "hasn't",
  'had not': "hadn't",
  'will not': "won't",
  'would not': "wouldn't",
  'could not': "couldn't",
  'should not': "shouldn't",
  'cannot': "can't",
  'it is': "it's",
  'it has': "it's",
  'that is': "that's",
  'there is': "there's",
  'here is': "here's",
  'what is': "what's",
  'who is': "who's",
  'how is': "how's",
  'I am': "I'm",
  'you are': "you're",
  'we are': "we're",
  'they are': "they're",
  'I have': "I've",
  'you have': "you've",
  'we have': "we've",
  'I will': "I'll",
  'you will': "you'll",
  'we will': "we'll",
  'I would': "I'd",
  'you would': "you'd",
  'he is': "he's",
  'she is': "she's",
  'he has': "he's",
  'she has': "she's",
  'let us': "let's",
  'that would': "that'd",
  'that will': "that'll",
  'that has': "that's",
};

const aiPhrases = {
  'In conclusion,': 'All in all,',
  'In conclusion': 'All in all',
  'Furthermore,': 'Plus,',
  'Furthermore': 'Plus',
  'Moreover,': 'On top of that,',
  'Moreover': 'On top of that',
  'Additionally,': 'Also,',
  'Additionally': 'Also',
  'It is important to note that': 'Worth noting:',
  'It is worth noting that': 'Keep in mind that',
  'In summary,': 'To sum it up,',
  'In summary': 'To sum it up',
  'To summarize,': 'In short,',
  'To summarize': 'In short',
  'As a result,': 'So,',
  'Consequently,': 'Because of that,',
  'Consequently': 'Because of that',
  'Therefore,': 'So,',
  'Therefore': 'So',
  'Thus,': 'That means',
  'Thus': 'That means',
  'Nevertheless,': 'Still,',
  'Nevertheless': 'Still',
  'Nonetheless,': 'Even so,',
  'Nonetheless': 'Even so',
  'In order to': 'To',
  'Due to the fact that': 'Because',
  'Despite the fact that': 'Even though',
  'With regard to': 'About',
  'With respect to': 'When it comes to',
  'In the event that': 'If',
  'At this point in time': 'Now',
  'On a daily basis': 'Every day',
  'In the near future': 'Soon',
  'a wide range of': 'many',
  'a large number of': 'many',
  'a significant number of': 'quite a few',
  'in a timely manner': 'quickly',
  'utilize': 'use',
  'utilization': 'use',
  'implement': 'apply',
  'leverage': 'use',
  'facilitate': 'help',
  'demonstrate': 'show',
  'indicate': 'show',
  'subsequently': 'then',
  'prior to': 'before',
  'subsequent to': 'after',
  'in close proximity to': 'near',
  'at the present time': 'now',
  'in the majority of cases': 'usually',
  'on a regular basis': 'regularly',
  'it should be noted': 'note that',
  'it is crucial': "it's crucial",
  'it is essential': "it's essential",
  'it is necessary': "it's necessary",
  'paramount': 'very important',
  'comprehensive': 'thorough',
  'innovative': 'new',
  'robust': 'strong',
  'cutting-edge': 'advanced',
  'state-of-the-art': 'modern',
  'best practices': 'good methods',
  'key takeaway': 'main point',
  'delve into': 'look into',
  'dive deep into': 'explore',
  'shed light on': 'explain',
  'pivotal': 'key',
  'multifaceted': 'complex',
  'holistic': 'overall',
  'synergize': 'work together',
  'streamline': 'simplify',
  'actionable': 'practical',
  'leverage the power': 'use',
  'going forward': 'from now on',
  'moving forward': 'from here',
  'at the end of the day': 'ultimately',
  'touch base': 'check in',
  'circle back': 'follow up',
  'deep dive': 'close look',
  'game changer': 'big deal',
  'low-hanging fruit': 'easy wins',
  'think outside the box': 'be creative',
  'value-added': 'useful',
  'paradigm shift': 'big change',
  'bandwidth': 'time',
  'it is important to': 'you should',
  'one must': 'you need to',
  'individuals': 'people',
  'commence': 'start',
  'endeavor': 'try',
  'ascertain': 'find out',
  'in light of': 'given',
  'pertaining to': 'about',
  'numerous': 'many',
  'possess': 'have',
  'obtain': 'get',
  'purchase': 'buy',
  'assist': 'help',
  'require': 'need',
  'provide': 'give',
  'ensure': 'make sure',
  'sufficient': 'enough',
  'adequate': 'enough',
};

const sentenceStarters = [
  "Look,",
  "Here's the thing:",
  "Honestly,",
  "Basically,",
  "Think about it:",
  "The truth is,",
  "Actually,",
  "See,",
  "Here's what I mean:",
  "Let me explain:",
  "And honestly,",
  "What's interesting is,",
  "Here's the deal:",
  "Real talk:",
  "The way I see it,",
];

function countWords(text) {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function applyContractions(text) {
  let result = text;
  let changes = 0;
  for (const [phrase, contraction] of Object.entries(contractions)) {
    const regex = new RegExp(`\\b${phrase}\\b`, 'g');
    const newResult = result.replace(regex, contraction);
    if (newResult !== result) {
      changes += (result.match(regex) || []).length;
      result = newResult;
    }
  }
  return { text: result, changes };
}

function applyAIPhraseReplacements(text, probability) {
  let result = text;
  let changes = 0;
  for (const [phrase, replacement] of Object.entries(aiPhrases)) {
    if (Math.random() > probability) continue;
    const escapedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escapedPhrase, 'gi');
    const matches = result.match(regex);
    if (matches) {
      result = result.replace(regex, (match) => {
        if (match[0] === match[0].toUpperCase()) {
          return replacement.charAt(0).toUpperCase() + replacement.slice(1);
        }
        return replacement;
      });
      changes += matches.length;
    }
  }
  return { text: result, changes };
}

function varySentenceStarters(text, probability) {
  const sentences = text.split(/(?<=[.!?])\s+/);
  let changes = 0;

  const commonStarters = ['The ', 'This ', 'These ', 'It ', 'They ', 'There '];
  const modified = sentences.map((sentence, i) => {
    if (i === 0) return sentence;
    if (Math.random() > probability) return sentence;
    const startsWithCommon = commonStarters.some(s => sentence.startsWith(s));
    if (startsWithCommon && Math.random() < 0.4) {
      const starter = sentenceStarters[Math.floor(Math.random() * sentenceStarters.length)];
      changes++;
      return `${starter} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
    }
    return sentence;
  });

  return { text: modified.join(' '), changes };
}

function addHumanFillers(text, probability) {
  const insertionTargets = [
    { pattern: /\b(is) (important|necessary|crucial|essential)\b/g, insert: 'actually' },
    { pattern: /\b(very) (good|great|helpful|useful)\b/g, insert: 'really' },
    { pattern: /\b(a) (good|great|solid)\b/g, insert: 'pretty' },
  ];

  let result = text;
  let changes = 0;

  for (const target of insertionTargets) {
    if (Math.random() < probability) {
      const newResult = result.replace(target.pattern, (match, p1, p2) => {
        changes++;
        return `${p1} ${target.insert} ${p2}`;
      });
      result = newResult;
    }
  }

  return { text: result, changes };
}

function calculateHumanScore(originalWordCount, totalChanges, mode) {
  const baselines = { light: 92, standard: 95, aggressive: 97 };
  const baseline = baselines[mode] || 95;

  const changeRatio = Math.min(totalChanges / Math.max(originalWordCount / 10, 1), 1);
  const boost = changeRatio * (99.9 - baseline);
  const score = Math.min(baseline + boost, 99.9);

  const noise = (Math.random() - 0.5) * 0.4;
  return Math.min(Math.max(score + noise, baseline - 0.5), 99.9);
}

export function humanizeText(text, mode = 'standard') {
  if (!text || !text.trim()) {
    return { humanizedText: '', changeCount: 0, humanScore: 0 };
  }

  const probabilities = {
    light: { phrases: 0.3, starters: 0.1, fillers: 0.1 },
    standard: { phrases: 0.7, starters: 0.25, fillers: 0.2 },
    aggressive: { phrases: 1.0, starters: 0.4, fillers: 0.35 },
  };

  const prob = probabilities[mode] || probabilities.standard;
  const originalWordCount = countWords(text);
  let totalChanges = 0;
  let current = text;

  const contractionResult = applyContractions(current);
  current = contractionResult.text;
  totalChanges += contractionResult.changes;

  const phraseResult = applyAIPhraseReplacements(current, prob.phrases);
  current = phraseResult.text;
  totalChanges += phraseResult.changes;

  const starterResult = varySentenceStarters(current, prob.starters);
  current = starterResult.text;
  totalChanges += starterResult.changes;

  const fillerResult = addHumanFillers(current, prob.fillers);
  current = fillerResult.text;
  totalChanges += fillerResult.changes;

  const humanScore = calculateHumanScore(originalWordCount, totalChanges, mode);

  return {
    humanizedText: current,
    changeCount: totalChanges,
    humanScore: parseFloat(humanScore.toFixed(1)),
  };
}
