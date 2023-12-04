from AocDay import AocDay
from typing import List, Optional
import re

issym = lambda x: x != '.' and not x.isnumeric()

symre = re.compile(r'([^.\d])')
numre = re.compile(r'(\d+)')


def scanlineforsym(line: str, start: int, end: int):
    start = max(0, start-1)
    end = min(end+1, len(line))
    s = symre.search(line, start, end)
    return True if s else False


def checksym(grid: list[str], lineno: int, start: int, end: int) -> bool:
    if start > 0 and issym(grid[lineno][start-1]) or end < len(grid[lineno]) and issym(grid[lineno][end]):
        return True
    if lineno > 0 and scanlineforsym(grid[lineno-1], start, end):
        return True
    if lineno < len(grid) -1 and scanlineforsym(grid[lineno+1], start, end):
        return True
    return False

def get_ratios(grid, lineno, start, end) -> Optional[List[int]]:
    touchers = []
    for m in numre.finditer(grid[lineno]):
        if m.start() == end or m.end() == start:
            touchers.append(int(m[1]))
    if lineno > 0:
        for m in numre.finditer(grid[lineno-1]):
            if (m.start() >= (start-1) and m.start() <= end) or (m.end() >= start and m.start() < end):
                touchers.append(int(m[1]))
    if lineno < len(grid)-1:
        for m in numre.finditer(grid[lineno+1]):
            if (m.start() >= (start - 1) and m.start() <= end) or (m.end() >= start and m.start() < end):
                touchers.append(int(m[1]))
    # print(f'* line {lineno}: ({start}, {end}) => {touchers}')
    return touchers if len(touchers) == 2 else None

class Day3(AocDay):
    def __init__(self):
        super().__init__(day='day3.txt', sampleA='sample3a.txt', sampleB='sample3a.txt')

    def part1(self, data:str):
        grid = self.split_data(data)
        total = 0
        for i,l in enumerate(grid):
            for m in numre.finditer(l):
                s, e = m.span()  # start , end
                if checksym(grid, i, s, e):
                    total += int(m[1])
        return total

    def part2(self, data:str):
        star_re = re.compile(r'\*')
        grid = self.split_data(data)
        total = 0
        for i, l in enumerate(grid):
            for star in star_re.finditer(l):
                s, e = star.span()
                ratio = get_ratios(grid, i, s, e)
                if ratio:
                    total += ratio[0] * ratio[1]
        return total


if __name__ == '__main__':
    Day3().run(samples_only=False)

