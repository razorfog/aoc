def parse(line):
    trans = str.maketrans(dict(B="1", R="1", L="0", F="0"))
    return int(line.translate(trans), 2)
seats = set(map(parse, open("day5_test.txt")))
myseat = set(range(min(seats), max(seats))) - seats
print(max(seats), myseat)
