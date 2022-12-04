
def the_func(n):
    return int(n/2) if n&1 == 0 else n*3 + 1


def evaln(n):
    result = []
    while n > 1:
        result.append(n)
        n = the_func(n)
    result.append(n)  # should be one
    return result



