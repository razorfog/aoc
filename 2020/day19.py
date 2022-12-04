import re
from aocday import AocDay

class Day19(AocDay):

    def __init__(self, test_file=None):
        super().__init__(19, test_file)

    def read_input(self, test_file):
        with open(test_file) as f:
            grammar, sentences = re.split(r'\n\n',f.read())
            grammar = re.split(r'\n', grammar)
            sentences = re.split(r'\n', sentences)
            gramdict = dict()
            for rule in grammar:
                rule_name, rhs = re.split(':', rule)
                rhs = [m.strip(' "') if '"' in m else tuple(lhs for lhs in re.split(r' ', m) if lhs.isdigit()) for m in re.split(r'\|', rhs)]
                gramdict[rule_name] = rhs
            self.grammar = gramdict
            return sentences


    def parse_option(self, item, sentence):
        if type(item) == str:
            return len(item) if sentence.startswith(item) else 0
        rule = item[0]
        next_rhs = self.grammar[rule]
        xlen = self.parse_option(next_rhs[0], sentence)
        if xlen > 0:



        rhs = self.grammar[rule]
        for x in rhs:
            plen = self.parse_option(x, sentence)
            if plen > 0:
            if top_level and len(sentence) == plen:
                return 1
            # don't need to keep going.
        return 0

    def part1(self, sentences):
        print(f'gramdict: {self.grammar}')
        print(f'sentences: {sentences}')
        self.matches = 0
        for s in sentences:
            if self.parse('0', s, top_level=True) > 0:
                print(f'matches: {s}')
        print(f'total matches = {self.matches}')
        print('Part 1 is done.')


    def part2(self, stuff):
        print('part2 is tbd')

if __name__ == '__main__':
    Day19().run()