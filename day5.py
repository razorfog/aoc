
import sys

converter = str.maketrans(dict(F='0', L='0', B='1', R='1'))

def read_seat_ids(passfile: str):
    with open(passfile) as f:
        return set(map(lambda bp: int(bp.translate(converter), 2), f))

def part1(seat_ids):
    return max(seat_ids)

def part2(seat_ids):
    # make a set that's from the range of the min seat to the max seat.
    # the difference will be our seat_id
    all_seats = set(range(min(seat_ids), max(seat_ids)))
    my_seat_ids = all_seats.difference(seat_ids)
    #  print(my_seat_ids)
    return my_seat_ids.pop()

if __name__ == '__main__':
    files = sys.argv[1::] if len(sys.argv) > 1 else ['./day5_input.txt']
    for f in files:
        print(f'=== {f} ===')
        ids = read_seat_ids(f)
        print(f'Highest seat ID: {part1(ids)}')
        print(f'Your seat id is: {part2(ids)}')


