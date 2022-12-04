import re
from aocday import AocDay
import math

class Day13(AocDay):

    def __init__(self, test_file=None):
        super().__init__(13, test_file)

    def read_input(self, test_file):
        actions = re.compile(r'(\d+)\s+([\d,x]+)')
        with open(test_file) as f:
            return [(int(xtime), re.split(',', buses)) for (xtime, buses) in re.findall(actions, f.read())]

    def part1(self, stuff):
        xtime = stuff[0][0]
        buses = stuff[0][1]
        buses = [int(bnum) for bnum in buses if bnum != 'x']
        print(f'xtime = {xtime}')
        print(f'buses: {buses}')
        minx = xtime * 10
        min_id = 0

        for bt in buses:
            diffx = math.ceil(xtime / bt) * bt -xtime
            if diffx < minx:
                minx = diffx
                min_id = bt
        print(f'min_id bus {min_id}. minx = {minx}. Result = {minx * min_id}')

    def part2(self, stuff):
        buses = stuff[0][1]
        buses = [(int(bus_id), m) for m, bus_id in enumerate(buses) if bus_id != 'x']
        max_id = max(buses, key=lambda o: o[0])
        print(f'buses are: {buses}\nmax: {max_id}')
        max_busx = [(bus_id, offset - max_id[1]) for bus_id, offset in buses]
        print(f'buses organized by max_id:\n{max_busx}')
        min_id = max(max_busx, key=lambda o: o[0])

        magic = max_id[0]
        n = 1
        rr = 10000000
        while True:
            xt = n * magic
            if (xt + min_id[1]) % min_id[0] == 0:
                g = True
                for (bus_id, offset) in max_busx:
                    if (xt + offset) % bus_id != 0:
                        g = False
                        break
                if g:
                    print(f'Found it at {xt}')
                    for (busx, offset) in buses:
                        print(f'{busx}: {xt} + {offset} = {xt + offset}, % {busx} == {(xt + offset) % busx}')
                    break
            n += 1
            if n == rr:
                print(n)
                rr += 10000000
        print('bye from part2')

if __name__ == '__main__':
    Day13().run()