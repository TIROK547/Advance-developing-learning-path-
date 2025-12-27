def fun(l1):
    n = len(l1)
    res = [1] * n

    for i in range(1, n):
        print(l1[i - 1], "*", res[i - 1], "=", l1[i - 1] * res[i - 1])
        res[i] = l1[i - 1] * res[i - 1]

    suf = 1
    for i in range(n - 1, -1, -1):
        print(res, "|", suf)
        res[i] *= suf
        suf *= l1[i]

    print(res, "|", suf)
    return res


print(fun([1, 2, 3, 4]))
