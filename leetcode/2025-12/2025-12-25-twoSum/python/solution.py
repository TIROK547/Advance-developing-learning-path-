from typing import List

list = [2, 7, 11, 15]


def two_sum(list: List[int], target: int) -> List[int]:
    list_len = len(list)
    for i in range(list_len):
        for j in range(list_len):
            if list[i] + list[j] == target and i != j:
                return [i, j]
    return []
