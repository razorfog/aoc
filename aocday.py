
import sys

class AocDay:
    def __init__(self, day: int, test_file = None):
        """
        :param day: aoc day for this instance
        :param test_file: string or list. If None will use sys.argv for filename, or use
               file pattern "day{day}input.txt"
        """
        self.day = day
        if test_file:
            self.test_files = [test_file] if type(test_file) == str else test_file
        elif len(sys.argv) > 1:
            self.test_files = sys.argv[1::]
        else:
            self.test_files = [f'day{self.day}input.txt']
        self.active_file = None

    def part1(self, data):
        """
        This is your part1, override
        :param data:
        should print its result
        """
        print(f"part1 for {self.day} not implemented")
        return None

    def part2(self, data):
        """
        This is your part2, override
        :param data:
        should print its result
        """
        print(f"part2 for {self.day} not implemented")
        return None

    def run(self):
        for f in self.test_files:
            print(f'=== {f} ===')
            self.init()
            data = self.read_input(f)
            self.part1(data)
            self.part2(data)

    def init(self):
        """
        If there's anything to initialize or clear override this.
        """
        pass

    def process_line(self, line: str):
        """
        :param line: from read_input
        :return: the processes line (trimmed)
        override for custom handling
        """
        return line.strip()

    def read_input(self, input_file):
        """
        :param input_file: the test data.
        :return: input file as list of (trimmed) lines
        """
        with open(input_file) as f:
            return [self.process_line(l) for l in f]


