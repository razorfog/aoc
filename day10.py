
from aocday import AocDay

class Day10(AocDay):

    def __init__(self, test_file=None):
        super().__init__(10, test_file)

    def read_input(self, test_file):
       with open(test_file) as f:
            return [int(num) for num in f]

    def xable(self, j, usable):
        for u in usable:
            if j + self.higher == u:
                return True
        return False

    def part1(self, jolts):
        joltage = 0
        self.higher  = 3
        highest = max(jolts) + self.higher
        usable = [j for j in jolts if j <= (joltage + highest)]
        print(f'usagle: {usable}')
        others = [j for j in jolts if self.xable(j, usable)]
        print(f'others: {others}')

        jolts.append(0)
        jolts_sorted = sorted(jolts)
        jolts_sorted.append(jolts_sorted[-1] + 3)

        diffs = {1: 0, 2: 0, 3: 0}

        for index, jolt in enumerate(jolts_sorted[:-1]):
            diff = jolts_sorted[index + 1] - jolt
            diffs[diff] += 1

        print(diffs[1] * diffs[3])

        print('part1 was here')

        graph = {}
        for jolt in jolts_sorted:
            diffs = [(jolt + x) for x in (1, 2, 3)]
            diffs = [y for y in jolts_sorted if y in diffs]
            graph[jolt] = diffs

        solution = {0: 1}
        for key, value in graph.items():
            if value == []:
                break
            for val in value:
                if val in solution.keys():
                    solution[val] += solution[key]
                else:
                    solution[val] = solution[key]

        print(f'Part-2: {solution[jolts_sorted[-1]]}')

    def part2(self, jolts):
        print('See part1')

if __name__ == '__main__':
    Day10().run()