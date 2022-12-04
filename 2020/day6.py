import re
from aocday import AocDay


class Day6(AocDay):

    def __init__(self, test_file=None):
        super().__init__(6, test_file)

    def read_input(self, input_file):
        with open(input_file) as f:
            return [group for group in re.split(r'[\n]{2,}', f.read())]

    def part1(self, groups):
        total = sum([len(set([c for c in group if 'a' <= c <= 'z'])) for group in groups])
        print(f'Total yeses = {total}')

    def part2(self, groups):
        total = 0
        for group in groups:
            lines = [l.strip() for l in re.split(r'\n', group) if len(l.strip()) > 0]
            yeses = set([c for c in lines[0]])
            for i,line in enumerate(lines,1):
                yeses = yeses.intersection(set([c for c in line]))
            z = re.sub(r'\n+', ':', group)
            print(f'Group ({i}): {z} => {len(yeses)}')
            total += len(yeses)
        print(f'Total ALL yeses = {total}')

if __name__ == '__main__':
    Day6().run()