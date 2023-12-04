from AocDay import AocDay
import re
from functools import reduce

class Day2(AocDay):
    def __init__(self):
        super().__init__(day='day2.txt', sampleA='sample2a.txt', sampleB='sample2b.txt')

    def part1(self, data:str):
        line_re = re.compile(r'Game (\d+): (.+)')
        game_re = re.compile(r'\s*(\d+) (\w+)[\s,]?')
        maxes = dict(red=12, green=13, blue=14)
        lines = self.split_data(data)
        games = {}
        total = 0
        for l in lines:
            if not l or l.isspace():
                continue
            m = line_re.search(l)
            gnum = int(m[1])
            games[gnum] = dict(under_max=True, cubes=[])
            for game in m[2].split(';'):
                cubes = game_re.findall(game)
                game_i = {}
                for count, color in cubes:
                    game_i[color] = int(count)
                    if int(count) > maxes[color]:
                        games[gnum]['under_max'] = False
                games[gnum]['cubes'].append(game_i)
            if games[gnum]['under_max']:
                total += gnum
        self.games = games # to be used in part2.
        return total

    def part2(self, data:str):
        power = 0
        for gnum in self.games.keys():
            mins = dict(blue=0, red=0, green=0)
            for cd in self.games[gnum]['cubes']:
                for color, count in [(key, cd[key]) for key in cd.keys()]:
                    if count > mins[color]:
                        mins[color] = count
            pow = reduce(lambda a, b: a*b, [val for val in mins.values() if val > 0])
            # print(f'Game {gnum} power = {pow}')
            power += pow
        return power

    def run(self, samples_only=False):
        if self.A_data:
            print(f'part1 on {self.A_file}: {self.part1(self.A_data)}')
            print(f'part2 on {self.A_file}: {self.part2(self.A_data)}')
        if self.day_data and not samples_only:
            print(f'part1 on {self.day_file}: {self.part1(self.day_data)}')
            print(f'part2 on {self.day_file}: {self.part2(self.day_data)}')

if __name__ == '__main__':
    Day2().run()

