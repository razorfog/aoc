import numpy as np 
import itertools
from datetime import datetime


def read_input(file):
    return np.loadtxt(file, dtype=np.int64)

def find_number(numbers, offset):
    result1 = None
    result2 = None

    # Part 1
    t1 = datetime.now()
    for idx, number in enumerate(numbers[offset:], offset): 
        combinations = itertools.combinations(numbers[idx-offset:idx], r=2)
        if any(sum(combi) == number for combi in combinations): 
            continue
        else: 
            result1 = number
            break
    t2 = datetime.now()

    print(f"Found {result1} in {(t2-t1).total_seconds()}s.")

    # Part 2
    t1 = datetime.now()
    for start in range(len(numbers)):
        for end in range(start+2, len(numbers)):
            sub_range = numbers[start:end]
            if sum(sub_range) == result1: 
                result2 = min(sub_range) + max(sub_range)
                t2 = datetime.now()
                print(f"Found {result2} in {(t2-t1).total_seconds()}s.")
                return result1, result2

    return result1, result2

if __name__ == "__main__":
    file = 'day9input.txt'
    data = read_input(file)
    result1, result2 = find_number(data, 25)
    print(f"Result for part 1: {result1}\nResult for part 2: {result2}")
