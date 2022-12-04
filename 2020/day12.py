import re
from aocday import AocDay

class Day12(AocDay):

    def __init__(self, test_file=None):
        super().__init__(12, test_file)

    def read_input(self, test_file):
        actions = re.compile(r'([NSEWLRF])(\d+)')
        with open(test_file) as f:
            return [(op, int(dist)) for (op, dist) in re.findall(actions, f.read())]

    def part1(self, stuff):
        compass = ['N', 'E', 'S', 'W']
        direction = 'E'
        east = 0
        north = 0
        for op, dist in stuff:
            if op == 'F':
                if direction == 'E':
                    east += dist
                elif direction == 'W':
                    east -= dist
                elif direction == 'N':
                    north += dist
                else:
                    north -= dist
            elif op == 'R' or op == 'L':
                turns = (dist / 90) % 4
                if op == 'L':
                    turns = -turns
                spot = int((compass.index(direction) + turns) % 4)
                direction = compass[spot]
            elif op == 'N' or op == 'S':
                if op == 'S':
                    dist = -dist
                north += dist
            else:  # op is 'E' or 'W':
                if op == 'W':
                    dist = -dist
                east += dist
        print(f'Final: east = {east}. north = {north}. Man Dist: {abs(north) + abs(east)}')
        print('Part 1 is done.')


    def part2(self, stuff):
        waypoint = dict(E=10, N=1)
        east = 0
        north = 0
        for op, dist in stuff:
            if op == 'F':
                east += waypoint['E'] * dist
                north += waypoint['N'] * dist
            elif op == 'R' or op == 'L':
                # print(f'Rotate {waypoint} {dist} to {op}')
                rotations = int((dist / 90) % 4)
                if op == 'L':
                    rotations = 4 - rotations
                for r in range(rotations):
                    ns = waypoint['N']
                    waypoint['N'] = -waypoint['E']
                    waypoint['E'] = ns
                # print(f'new {waypoint}')
                #  Rotate {'E': 10, 'N': 4} 90 to R
                #    => 'E': 4: N: -10
            elif op == 'N' or op == 'S':
                if op == 'S':
                    dist = -dist
                waypoint['N'] += dist
            else:  # op is 'E' or 'W':
                if op == 'W':
                    dist = -dist
                waypoint['E'] += dist
        print(f'Final: east = {east}. north = {north}. Man Dist: {abs(north) + abs(east)}')
        print('part2 is tbd')

if __name__ == '__main__':
    Day12().run()