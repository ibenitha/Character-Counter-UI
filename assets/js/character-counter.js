function analyzeText(text, options = {}) {
  const excludeSpaces = Boolean(options.excludeSpaces);
  const normalizedText = excludeSpaces ? text.replace(/\s/g, '') : text;
  const characters = normalizedText.length;
  const words = normalizedText.trim() ? normalizedText.trim().split(/\s+/).length : 0;
  const lines = normalizedText === '' ? 0 : normalizedText.split(/\r?\n/).length;

  const letterCounts = [];
  const counts = new Map();

  for (const character of normalizedText.toLowerCase()) {
    if (/^[a-z]$/.test(character)) {
      counts.set(character, (counts.get(character) || 0) + 1);
    }
  }

  for (const [letter, count] of counts.entries()) {
    letterCounts.push({ letter: letter.toUpperCase(), count });
  }

  letterCounts.sort((a, b) => b.count - a.count || a.letter.localeCompare(b.letter));

  const totalLetters = letterCounts.reduce((sum, item) => sum + item.count, 0);
  const density = letterCounts.slice(0, 5).map((item) => ({
    ...item,
    percentage: ((item.count / Math.max(totalLetters, 1)) * 100).toFixed(2),
  }));

  const readingTime = Math.max(1, Math.ceil(words / 200));
  const readingTimeLabel = readingTime === 1 ? '1 minute' : `${readingTime} minutes`;

  return {
    totalCharacters: characters,
    wordCount: words,
    lineCount: lines,
    density,
    readingTime: readingTimeLabel,
  };
}

if (typeof module !== 'undefined') {
  module.exports = { analyzeText };
}
