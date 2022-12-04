
import re
from aocday import AocDay


class Day9(AocDay):

    def __init__(self, test_file=None):
        super().__init__(9, test_file)
        self.preamble = 25

    def read_input(self, test_file):
        if "test" in test_file:
            self.preamble = 5
        with open(test_file) as f:
            return [int(num) for num in f]

    def find_sum(self, target, thing):
        thing_len = len(thing)
        for i in range(thing_len-1):
            for j in range(i+1, thing_len):
                if (thing[i] + thing[j]) == target:
                    return False
        return True

    def part1(self, codes):
        # (codes)
        for x in range(self.preamble, len(codes)):
            target = codes[x]
            thing = codes[x-self.preamble:x]
            if self.find_sum(target, thing):
                print(f"Line {x}: No pairs for {target}")
                self.target = target  # use in part2
                return

        return

    def part2(self, codes):
        print(f'Part2 - hunting for {self.target}')
        # find a contiguous list that sums to self.target
        for i in range(len(codes)-1):
            sum = codes[i]
            smallest = sum
            largest = sum
            for j in range(i+1, len(codes)):
                sum += codes[j]
                if sum > self.target:
                    break
                if codes[j] > largest:
                    largest = codes[j]
                if codes[j] < smallest:
                    smallest = codes[j]
                if sum == self.target:
                    print(f'Found it from {i} => {j}. small = {smallest}. large = {largest}. sum = {smallest + largest}')
                    break
        print('bye')

if __name__ == '__main__':
    Day9().run()