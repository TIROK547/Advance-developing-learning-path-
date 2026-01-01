/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function (pattern, s) {
  const words = s.trim().split(" ");

  if (words.length != pattern.length) {
    return false;
  }

  let w2p = Object.create(null);
  let p2w = Object.create(null);
  const wplen = words.length;

  for (let i = 0; i < wplen; i++) {
    let currentWord = words[i];
    let currentPattern = pattern[i];

    if (currentWord in w2p && currentPattern !== w2p[currentWord]) return false;
    if (currentPattern in p2w && currentWord !== p2w[currentPattern])
      return false;

    w2p[currentWord] = currentPattern;
    p2w[currentPattern] = currentWord;
  }
  return true;
};
