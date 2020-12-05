
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

def seat_id_exist(seat_id):
    return 0 <= seat_id < 1024 and seat_map[seat_id >> 3][seat_id & 7]

def part2():
    my_seat_id = 0
    for row, cols in enumerate(seat_map):
        for c, val in enumerate(cols):
            if val:
                continue
            x_id = row*8 + c
            if seat_id_exist(x_id - 1) and seat_id_exist(x_id + 1):
                my_seat_id = x_id
                print(f'seat at row {row}, col {c} is free. id is {my_seat_id}')
    return my_seat_id

if __name__ == '__main__':
    files = sys.argv[1::] if len(sys.argv) > 1 else ['./day5_input.txt']
    for f in files:
        print(f'=== {f} ===')
        print(f'Highest seat ID: {part1(read_passes(f))}')
        print(f'Your seat id is: {part2()}')



