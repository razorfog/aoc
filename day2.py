# day2
import re
from aocday import AocDay

#=== day2input_sk.txt ===
# part1: Valid passwords = 506
# part 2: valid passwords = 443
# === day2input.txt ===
# part1: Valid passwords = 560
# part 2: valid passwords = 303

class Day2(AocDay):
    def __init__(self, test_file=None):
        super().__init__(2, test_file)
        self.line_re = re.compile(r'(\d+)-(\d+) (.):\s+(\w+)')

    def process_line(self, line):
        return self.line_re.match(line).groups()

    def part1(self, prpt):
        valids = len([ 1 for min, max, char, pwd in prpt if int(min) <= pwd.count(char) <= int(max)])
        print(f'part1: Valid passwords = {valids}')

    def part2(self, prpt):
        valids = 0
        for min, max, char, pwd in prpt:
            pos1 = int(min) - 1
            pos2 = int(max) - 1
            if len(pwd) > pos1 and pwd[pos1] is char:
                if len(pwd) <= pos2 or pwd[pos2] is not char:
                    valids += 1
            elif len(pwd) > pos2 and pwd[pos2] is char:
                valids += 1
        print(f'part 2: valid passwords = {valids}')

if __name__ == '__main__':
    Day2().run()