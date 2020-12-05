from aocday import AocDay


class Day1(AocDay):
    def __init__(self, test_file=None):
        super().__init__(1, test_file)

    def part1(self, expense_report):
        gotIt = False
        for i in range(len(expense_report)):
            if gotIt:
                break
            n = expense_report[i]
            for j in range(i+1, len(expense_report)):
                n2 = expense_report[j]
                if n+n2 == 2020:
                    gotIt = True
                    break
        if gotIt:
            print(f"{n} + {n2} == 2020. {n} * {n2} == {n*n2}")
        else:
            print('Drag, didn\'t fine it.')

    def part2(self, expense_report):
        gotIt = False
        for i in range(len(expense_report)):
            if gotIt:
                break
            n = expense_report[i]
            for j in range(i+1, len(expense_report)):
                if gotIt:
                    break
                n2 = expense_report[j]
                if n + n2 > 2020:
                    continue
                nn = n + n2
                for h in range(j+1, len(expense_report)):
                    n3 = expense_report[h]
                    if nn+n3 == 2020:
                        gotIt = True
                        break
        if gotIt:
            print(f"{n} + {n2} + {n3} == 2020. {n} * {n2} * {n3} == {n*n2*n3}")
        else:
            print('Drag, didn\'t find it.')

    def process_line(self, line):
        return int(line)

if __name__ == '__main__':
    Day1().run()

