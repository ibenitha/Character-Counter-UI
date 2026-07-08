const test = require('node:test');
const assert = require('node:assert/strict');

const { analyzeText } = require('../assets/js/character-counter.js');

test('counts characters, words, and lines', () => {
  const result = analyzeText('Hello world\nThis is a test');

  assert.equal(result.totalCharacters, 26);
  assert.equal(result.wordCount, 6);
  assert.equal(result.lineCount, 2);
});

test('can exclude spaces from the character count', () => {
  const result = analyzeText('Hello world', { excludeSpaces: true });

  assert.equal(result.totalCharacters, 10);
});

test('reports reading time and top letter density', () => {
  const result = analyzeText('The quick brown fox jumps over the lazy dog');

  assert.equal(result.readingTime, '1 minute');
  assert.deepEqual(result.density.slice(0, 3).map((item) => item.letter), ['O', 'E', 'H']);
});
