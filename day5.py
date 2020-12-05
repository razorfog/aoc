
import sys

seat_map = [[False] * 8 for r in range(128)]

def read_passes(passfile):
    with open(passfile) as f:
        return [bp.strip() for bp in f.readlines()]

def adjust_range(r, top=True):
    first, end = r
    range_len = (end-first) + 1
    if range_len <= 0:
        print(f"Ack: bad range {r}")
        return r

    if top:
        return (first, first + (range_len>>1)-1)
    else:
        return (first + (range_len>>1), end)

def part1(boarding_passes):
    global seat_map
    seat_id = 0
    for bp in boarding_passes:
        rows = bp[0:7]
        cols = bp[-3:]
        rr = (0, 127)
        for r in rows:
            rr = adjust_range(rr, r == 'F')

        cc = (0, 7)
        for c in cols:
            cc = adjust_range(cc, c == 'L')
        bp_seat_id = rr[0] * 8 + cc[0]
        seat_map[rr[0]][cc[0]] = True
        if bp_seat_id > seat_id:
            seat_id = bp_seat_id
    return seat_id

def do_adjacents_exist(row, col):
    if (col > 0 and not seat_map[row][col-1]) or (col == 0 and (row == 0 or not seat_map[row-1][7])):
        return False # seat ID -1 is not on the list.
    if (col < 7 and not seat_map[row][col+1]) or (col == 7 and (row == 127 or not seat_map[row+1][0])):
        return False  # seat ID +1 is not on the list.
    return True

def part2():
    my_seat_id = 0
    for row, cols in enumerate(seat_map):
        for c, val in enumerate(cols):
            if not val and do_adjacents_exist(row, c):
                my_seat_id = row * 8 + c
                print(f'seat at row {row}, col {c} is free. id is {my_seat_id}')
    return my_seat_id

if __name__ == '__main__':
    files = sys.argv[1::] if len(sys.argv) > 1 else ['./day5_input.txt']
    for f in files:
        print(f'=== {f} ===')
        bps = read_passes(f)
        print(f'Highest seat ID: {part1(bps)}')
        print(f'Your seat id is: {part2()}')



