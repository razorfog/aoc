from AocDay import AocDay
import re

class Day1(AocDay):
    def __init__(self):
        super().__init__(day='day1.txt', sampleA='sample1a.txt', sampleB='sample1b.txt')

    def part1(self, data:str):
        digit_re = re.compile(r'(\d)')
        res = 0
        for line in self.split_data(data):
            matches = digit_re.findall(line)
            if matches and len(matches) >= 1:
                val = int(matches[0]) * 10 + int(matches[-1])
                res += val
        return res

    def part2(self, data:str):
        nums = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
        digit_re = re.compile(r'(\d|one|two|three|four|five|six|seven|eight|nine)')
        res = 0
        for line in self.split_data(data):
            matches = []
            pos = 0
            while True:
                m = digit_re.search(line, pos)
                if m:
                    matches.append(m[1])
                    pos = m.pos + 1
                else:
                    break
            if len(matches) >= 1:
                d1 = int(matches[0]) if matches[0] not in nums else nums.index(matches[0]) + 1
                d2 = int(matches[-1]) if matches[-1] not in nums else nums.index(matches[-1]) + 1
            res += d1*10 + d2
        return res




if __name__ == '__main__':
    Day1().run()

