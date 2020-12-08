
import re
from aocday import AocDay


class Day8(AocDay):

    def __init__(self, test_file=None):
        super().__init__(8, test_file)
        self.op_re = re.compile(r'(nop|acc|jmp)\s+([-+]\d+)')

    def read_input(self, code_file):
        with open(code_file, 'r') as f:
            return [[op, int(arg)] for (op, arg) in re.findall(self.op_re, f.read())]

    def part1(self, rules):
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
        print(f'accumulator: {accval}')
        return (loop_detected, pos, accval)


    def part2(self, rules):
        """
        The program is supposed to terminate by attempting to execute an instruction immediately
        after the last instruction in the file.
        by changine one jmp or nop a loop will not accur
        """
        # try brute force:
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
            tx = rules[pos]
            (loop_detected, last_pos, accval) = self.part1(rules)
            instr[0] = ins_save
            if not loop_detected and last_pos == len(rules):
                print(f'Found it: acc is {accval}')
                break
            pos += 1



        return 0


if __name__ == '__main__':
    Day8().run()