class Solution:
    def isIsomorphic(self, s: str, t: str) -> bool:
        c2p = {}
        p2c = {}
        if len(s) != len(t):
            return False
        length = len(s)
        for i in range(length):
            if s[i] not in c2p and t[i] not in p2c:
                c2p[s[i]] = t[i]
                p2c[t[i]] = s[i]
            elif c2p[s[i]] != t[i] or p2c[t[i]] != s[i]:
                return False
            else:
                c2p[s[i]] = t[i]
                p2c[t[i]] = s[i]
        return True
