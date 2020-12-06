from aocday import AocDay

class Day5(AocDay):
    def __init__(self, test_file=None):
        super().__init__(5, test_file)
        self.converter = str.maketrans(dict(F='0', L='0', B='1', R='1'))

    def read_input(self, passfile):
        with open(passfile) as f:
            return set(map(lambda bp: int(bp.translate(self.converter), 2), f))

    def part1(self, seat_ids):
        print(f'Highest seat ID: {max(seat_ids)}')

    def part2(self, seat_ids):
        # make a set that's from the range of the min seat to the max seat.
        # the difference will be our seat_id
        all_seats = set(range(min(seat_ids), max(seat_ids)))
        my_seat_ids = all_seats.difference(seat_ids)
        #  print(my_seat_ids)
        print(f'Your seat id is: {my_seat_ids.pop()}')

if __name__ == '__main__':
    Day5().run()



