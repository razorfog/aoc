# day1.py


def part1(report):
    with open(report) as f:
        expense_report = [int(num) for num in f.readlines()]

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

def part2(report):
    with open(report) as f:
        expense_report = [int(num) for num in f.readlines()]

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


if __name__ == '__main__':
    print("SK data")
    part1('./day1input_sk.txt')
    part2('./day1input_sk.txt')
    print("zap data")
    part1('./day1input.txt')
    part2('./day1input.txt')
