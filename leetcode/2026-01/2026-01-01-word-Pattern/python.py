def wordPattern(pattern: str, s: str):
    table = {}
    str_list = s.split(" ")
    pattern_list = list(pattern)
    if len(str_list) == len(pattern_list):
        alength = len(pattern_list)
        for i in range(alength):
            if (
                pattern_list[i] not in table.keys()
                and str_list[i] not in table.values()
            ):
                table[pattern_list[i]] = str_list[i]
            elif table.get(pattern_list[i]) != str_list[i]:
                return False
        return True
    return False


print(wordPattern("abca", "dog cat cat dog"))
