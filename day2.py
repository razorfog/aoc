# day2
import re
import sys

def parse_report(report):
    line_re = re.compile(r'(\d+)-(\d+) (.):\s+(\w+)')
    with open(report) as f:
        report = [line_re.match(line).groups() for line in f.readlines()]
        return report

def part1(report):
    prpt = parse_report(report)
    valids = len([ 1 for min, max, char, pwd in prpt if int(min) <= pwd.count(char) <= int(max)])
    print(f'part1: Valid passwords = {valids}')

def part2(report):
    valids = 0
    for min, max, char, pwd in parse_report(report):
        pos1 = int(min) - 1
        pos2 = int(max) - 1
        if len(pwd) > pos1 and pwd[pos1] is char:
            if len(pwd) <= pos2 or pwd[pos2] is not char:
                valids += 1
        elif len(pwd) > pos2 and pwd[pos2] is char:
            valids += 1
    print(f'part 2: valid passwords = {valids}')

if __name__ == '__main__':
    reports = sys.argv[1::] if len(sys.argv) > 1 else ['./day2input.txt']
    for rep in reports:
        print(f'=== {rep} ===')
        part1(rep)
        part2(rep)

