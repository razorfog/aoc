
import re
from aocday import AocDay


class Day8(AocDay):

    def __init__(self, test_file=None):
        super().__init__(8, test_file)

    def read_input(self, code_file):
        op_re = re.compile(r'(nop|acc|jmp)\s+([-+]\d+)')
        with open(code_file, 'r') as f:
            return [[op, int(arg)] for (op, arg) in re.findall(op_re, f.read())]

    def part1(self, rules, quiet=False):
        accval = 0
        pos = 0
        been_here = set()
        num_rules = len(rules)
        loop_detected = False
        while not loop_detected and pos < num_rules:
            op, arg = rules[pos]
            if pos in been_here:
                # print(f'loop detected at {pos} => {rules[pos]}')
                loop_detected = True
                break
            been_here.add(pos)
            if op == 'nop':
                pos += 1
            elif op == 'acc':
                pos += 1
                accval += arg
            else:
                pos += arg
        if not quiet:
            print(f'part-1: accumulator: {accval}')
        return (loop_detected, pos, accval)


    def part2(self, rules):
        # brute force:
        pos = 0
        while pos < len(rules):
            instr = rules[pos]
            if instr[0] == 'acc':
                pos += 1
                continue
            ins_save = instr[0]
            if instr[0] == "nop":
                instr[0] = "jmp"
            else:
                instr[0] = "nop"
            (loop_detected, last_pos, accval) = self.part1(rules, quiet=True)
            instr[0] = ins_save
            if not loop_detected and last_pos == len(rules):
                print(f'Found it, part 2: acc is {accval}')
                break
            pos += 1

if __name__ == '__main__':
    Day8().run()