import re
from aocday import AocDay

dig4 = re.compile(r'^\d{4}$')
height = re.compile(r'^(\d+)(cm|in)$')
hair = re.compile(r'^#[0-9a-f]{6}$')
dig9 = re.compile(r'^\d{9}$')

def validate_height(a):
    m = height.match(a)
    if not m:
        return False
    h = int(m.group(1))
    scale = m.group(2)
    if scale == 'cm':
        return h >= 150 and h <= 193
    # scale == 'in':
    return h >= 59 and h <= 76

required_fields = dict(
    byr=lambda a: dig4.match(a) and int(a) >= 1920 and int(a) <= 2002,  # (Birth Year)
    iyr=lambda a: dig4.match(a) and int(a) >= 2010 and int(a) <= 2020,  # (Issue Year)
    eyr=lambda a: dig4.match(a) and int(a) >= 2020 and int(a) <= 2030,  # (Expiration Year)
    hgt=validate_height,  # (Height)
    hcl=lambda a: bool(hair.match(a)),  # (Hair Color)
    ecl=lambda a: a in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],  # (Eye Color)
    pid=lambda a: bool(dig9.match(a)),  # (Passport ID)
    cid=lambda a: True  # (Country ID)
)
ok_missing = ['cid']


class Day4(AocDay):

    def __init__(self, test_file=None):
        super().__init__(4, test_file)

    def pairs_to_dict(self, fields):
        return dict([tuple(re.split(r'\s*:\s*', pair)) for pair in fields if ':' in pair])

    def read_input(self, input_file):
        with open(input_file) as f:
            entries = re.split(r'[\n]{2,}', f.read())
            return [self.pairs_to_dict(re.split(r'\s+', entry)) for entry in entries]

    def part1(self, passports):
        invalids = 0
        for pport in passports:
            for required in required_fields.keys():
                if required not in pport and required not in ok_missing:
                    invalids += 1
                    break
        print(f'Valid passports: {len(passports) - invalids}')  # 222

    def part2(self, passports):
        invalids = 0
        for pport in passports:
            for required, validator in required_fields.items():
                if required not in pport and required not in ok_missing:
                    invalids += 1
                    break
                if not validator(pport.get(required, '')):
                    invalids += 1
                    break
        print(f'Valid passports with validation checks: {len(passports) - invalids}')  # 140

if __name__ == '__main__':
    Day4().run()