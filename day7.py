
import re
from aocday import AocDay


class Day7(AocDay):

    def __init__(self, test_file=None):
        super().__init__(7, test_file)
        self.part1_bag = 'shiny gold bag'
        self.bag_re = re.compile(r'\s*(\d+)\s+([a-z]+\s+[a-z]+)\s+bags?')
        self.no_bag = re.compile(r'\s*no other bag')

    def make_bag_rule(self, bag_line):
        [parent, children] = re.match(r'(.+?)s? contain (.+)', bag_line).groups()
        children = [(int(number), child) for number, child in re.findall(r'(\d) ([ a-z]+bag)?', children)]
        return parent, children

    def init(self):
        self.bag_rules = dict()
        self.reverse_rules = dict()
        self.has_gold = set()

    def read_input(self, input_file):
        with open(input_file) as f:
            return [self.make_bag_rule(line) for line in f]

    def get_contained_by(self, xrule):
        if xrule in self.has_gold:
            return
        self.has_gold.add(xrule)
        contained = self.reverse_rules.get(xrule,[])
        for xr2 in contained:
            self.get_contained_by(xr2)


    def part1(self, rules):
        for parent, children in rules:
            self.bag_rules[parent] = children
            for count, bag in children:
                if not bag in self.reverse_rules:
                    self.reverse_rules[bag] = [parent]
                else:
                    reverse = self.reverse_rules[bag]
                    reverse.append(parent)
        xrule = self.part1_bag
        print(f'bag_rules = {len(self.bag_rules)}. reverse = {len(self.reverse_rules)}')
        self.get_contained_by(xrule)
        print(f'has {xrule} = {len(self.has_gold) - 1}') # -1 cuz gold bag is in there too.

    def _countdepth(self, b):
        count = 1
        for (number, child) in self.bag_rules.get(b,[]):
            count += number * self._countdepth(child)
        return count

    def part2(self, groups):
        total = self._countdepth(self.part1_bag) -1  # -1 cuz don't count shiny gold bag
        print(f'Bags for {self.part1_bag} is {total}')

if __name__ == '__main__':
    Day7().run()