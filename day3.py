import sys

def read_map(map_file):
    with open(map_file) as f:
        return [row.strip() for row in f.readlines()]

def part1(tog_map, right, down):
    # correct answer is 244, 200 for sk (right=3, down=1)
    row_len = len(tog_map[0])
    tree_count = 0
    x = 0
    for y in range(down, len(tog_map), down):
        row = tog_map[y]
        x = (x + right) % row_len
        if row[x] is '#':
            tree_count += 1

    print(f'Trees = for right {right}, down {down}: {tree_count}')
    return tree_count

def part2(tog_map):
    # answer: 9406609920, 3737923200 sk
    total = 1
    for t in [part1(tog_map,r,d) for r,d in ((1,1),(3,1),(5,1),(7,1),(1,2))]:
        total *= t
    print(f'Total = {total}')
    return total

if __name__ == '__main__':
    files = sys.argv[1::] if len(sys.argv) > 1 else ['./day3input.txt']
    for f in files:
        print(f'=== {f} ===')
        tog_map = read_map(f)
        print(f'Row len = {len(tog_map[0])}')
        print(f'Length = {len(tog_map)}')
        part1(tog_map, right=3, down=1)
        print('=== Part 2 ===')
        part2(tog_map)
