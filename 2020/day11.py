
import copy
from aocday import AocDay

base_dirs = ((-1, -1), (-1, 0), (-1, 1),
            (0, -1), (0, 1),
            (1, -1), (1, 0), (1, 1))

class Day11(AocDay):

    def __init__(self, test_file=None):
        super().__init__(11, test_file)

    def read_input(self, test_file):
        with open(test_file) as f:
            return [[c for c in line if not c.isspace()] for line in f]

    def four_occupied3(self, row, col, seating, distance, max_occ):
        occupied = 0
        for y,x in base_dirs:
            for d in range(1, distance+1):
                next_row = row + (y*d)
                if next_row < 0 or next_row >= len(seating):
                    break
                next_col = col + (x*d)
                if next_col < 0 or next_col >= len(seating[0]):
                    break
                if seating[next_row][next_col] == '#':
                    occupied += 1
                    if occupied >= max_occ:
                        return True
                    break
                if seating[next_row][next_col] != '.':
                    break
        return False

    def tout_empty3(self, row, col, seating, distance):
        for y,x in base_dirs:
            for d in range(1, distance+1):
                next_row = row + (y*d)
                if next_row < 0 or next_row >= len(seating):
                    break
                next_col = col + (x*d)
                if next_col < 0 or next_col >= len(seating[0]):
                    break
                if seating[next_row][next_col] == '#':
                    return False
                if seating[next_row][next_col] != '.':
                    break
        return True


    def do_seating(self, seating, distance, max_occ):
        s2 = copy.deepcopy(seating)
        for row in range(len(seating)):
            for col in range(len(seating[0])):
                if seating[row][col] == 'L' and self.tout_empty3(row, col, seating, distance):
                    s2[row][col] = '#'
                elif seating[row][col] == '#' and self.four_occupied3(row, col, seating, distance, max_occ):
                    s2[row][col] = 'L'
        return s2

    def count_occupied(self, seating):
        return sum([len([s for s in row if s == '#']) for row in seating])

    def isequal(self, s1, s2):
        for row in range(len(s1)):
            for col in range(len(s1[0])):
                if s1[row][col] != s2[row][col]:
                    return False
        return True

    def part1(self, seating, distance=1, max_occ=4):
        print(f'rows {len(seating)}. row len = {len(seating[0])}. Distance = {distance}. Max = {max_occ}')
        prev_seating = self.count_occupied(seating)
        round = 0
        while True:
            round += 1
            s2 = self.do_seating(seating, distance, max_occ)
            c = self.count_occupied(s2)
            if distance > 1:
                print(f'seats taken round {round}: ({c})')
            if c == prev_seating and self.isequal(seating, s2):
                print(f'seats taken round {round}: ({c})')
                print(f'STOP! - repeat at round {round}')
                break
            prev_seating = c
            seating = s2
        print('Part 1 is done.')


    def part2(self, seating):
        print('start part 2')
        self.part1(seating, max(len(seating)+1, len(seating[0])+1), max_occ=5)
        print('part2 is tbd')

if __name__ == '__main__':
    Day11().run()