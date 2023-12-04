import re
from collections import Counter

linere = re.compile(r'^Card\s+(\d+):\s+([^|]+)\|\s+(.+)$')

def day4_part1_2():
    cards = [l for l in open('day4.txt').read().strip().split('\n')]
    instances = Counter()
    p1_total = 0
    for c, line in enumerate(cards):
        cardx = linere.match(line)
        wins = [int(x) for x in cardx[2].split()]
        plays = [int(x) for x in cardx[3].split()]
        p2_matches = 0
        p1_sum = 0
        instances[c] += 1
        for w in wins:
            if w in plays:
                p1_sum = 1 if p1_sum == 0 else p1_sum * 2
                p2_matches += 1
                instances[c + p2_matches] += instances[c]
        p1_total += p1_sum
    print(f'Part 1: {p1_total}')
    print(f'Part 2: {sum(instances.values())}')

day4_part1_2()

