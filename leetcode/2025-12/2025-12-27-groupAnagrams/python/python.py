from typing import List


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        table = {}
        res = []
        for word in strs:
            sorted_word = "".join(sorted(word))
            if table.get(sorted_word):
                table[sorted_word].append(word)
            else:
                table[sorted_word] = [word]

        for list in table.values():
            res.append(list)

        return res


print(Solution().groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]))
