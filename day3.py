
from aocday import AocDay

class Day3(AocDay):
    def __init__(self, test_file=None):
        super().__init__(3, test_file)

    def part1(self, tog_map, right=3, down=1):
        # correct answer is 244, 200 for sk (right=3, down=1)
        row_len = len(tog_map[0])
        tree_count = 0
        x = 0
        for y in range(down, len(tog_map), down):
            row = tog_map[y]
            x = (x + right) % row_len
            if row[x] is '#':
                tree_count += 1

        print(f'Trees = for right {right}, down {down}: {tree_count}')
        return tree_count

    def part2(self, tog_map):
        # answer: 9406609920, 3737923200 sk
        total = 1
        for t in [self.part1(tog_map,r,d) for r,d in ((1,1),(3,1),(5,1),(7,1),(1,2))]:
            total *= t
        print(f'Total = {total}')
        return total

if __name__ == '__main__':
    Day3().run()
