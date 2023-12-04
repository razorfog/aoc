from AocDay import AocDay
import re
from collections import Counter

linere = re.compile(r'^Card\s+(\d+):\s+([^|]+)\|\s+(.+)$')


class Day4(AocDay):
    def __init__(self):
        super().__init__(day='day4.txt', sampleA='sample4a.txt', sampleB='sample4a.txt')

    def part1(self, data:str):
        total = 0
        for line in self.split_data(data):
            cardx = linere.match(line)
            if not cardx:
                print(f'error on line: {line}')
                continue
            t = 0
            wins = set(map(int, cardx[2].split()))
            plays = set(map(int, cardx[3].split()))
            matches = wins & plays
            # t = 0
            # for w in wins:
            #    if w in plays:
            #        t = 1 if t == 0 else t *2
            #total += t
            total += int(2 ** (len(matches) - 1))
        return total

    def part2(self, data:str):
        cards = self.split_data(data)
        # instances = [1 for x in range(len(cards))]
        instances = Counter()
        for c, line in enumerate(cards):
            cardx = linere.match(line)
            wins = set(map(int, cardx[2].split()))
            plays = set(map(int, cardx[3].split()))
            matches = wins & plays
            instances[c] += 1
            for i in range(1, len(matches)+1):
                instances[c + i] += instances[c]
        return sum(instances.values())


if __name__ == '__main__':
    Day4().run(samples_only=False)

