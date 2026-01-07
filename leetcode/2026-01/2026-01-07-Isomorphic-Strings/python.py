class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        c2p = {}
        p2c = {}
        for i in range(len(s)):
            if s[i] not in c2p and t[i] not in p2c:
                c2p[s[i]] = t[i]
                p2c[t[i]] = s[i]
            elif c2p.get(s[i]) != t[i] or p2c.get(t[i]) != s[i]:
                return False
        return True
