/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let table = {};
  for (let i = 0; i < strs.length; i++) {
    let = sorted_word = strs[i].split("").sort().join("");
    if (table[sorted_word]) {
      table[sorted_word].push(strs[i]);
    } else table[sorted_word] = [strs[i]];
  }
  return Object.values(table);
};
