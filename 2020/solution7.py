import re

moose = 0
xset = set()
class Bag:
    def __init__(self, name, contains_bag=False):
        self.contains_bag = contains_bag
        self.parents = dict()
        self.children = dict()
        self.name = name

    def update_parents(self):
        global moose, xset
        if not self.name in xset:
            moose += 1
            xset.add(self.name)
        else:
            return
        self.contains_bag = True
        for parent in self.parents.values():
            parent.update_parents()

    def count_children(self, level=1):
        total = 1
        for (children, number) in self.children.values():
            total += number * children.count_children(level + 1)

        if level == 1:
            print(f'level 1 for {self.name}')
            total -= 1
        return total

def _xyz(xbag: Bag):
    # print(f'Bag {xbag.name}. contains? {xbag.contains_bag}')
    if not xbag.contains_bag:
        return 0
    return 1


def day7():
    bags = dict()
    shiny_gold_bag = 'shiny gold bag'
    bags[shiny_gold_bag] = Bag(shiny_gold_bag, True)

    with open('day7input.txt', 'r') as f:
        for line in f.read().splitlines():
            [parent, children] = re.match(r'(.+?)s? contain (.+)', line).groups()
            if parent not in bags.keys():
                bags[parent] = Bag(parent)

            for (number, child) in re.findall(r'(\d) ([ a-z]+bag)?', children):
                if child not in bags.keys():
                    bags[child] = Bag(child)

                bags[child].parents[parent] = bags[parent]
                bags[parent].children[child] = (bags[child], int(number))

    bags[shiny_gold_bag].update_parents()
    # print(f'Part1: {sum(bag.contains_bagd for bag in bags.values()) - 1}')

    print(f'Part1: {sum(_xyz(bag) for bag in bags.values()) - 1}')
    print(f'Part2: {bags[shiny_gold_bag].count_children()}')


day7()
