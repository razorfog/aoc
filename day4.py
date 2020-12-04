import sys
import re

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
    byr=lambda a: dig4.match(a) and int(a) >=  1920 and int(a) <= 2002,  #  (Birth Year)
    iyr=lambda a: dig4.match(a) and int(a) >= 2010 and int(a) <= 2020,  # (Issue Year)
    eyr=lambda a: dig4.match(a) and int(a) >= 2020 and int(a) <= 2030,  # (Expiration Year)
    hgt=validate_height,  # (Height)
    hcl=lambda a: bool(hair.match(a)),  # (Hair Color)
    ecl=lambda a: a in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'],  # (Eye Color)
    pid=lambda a: bool(dig9.match(a)),  # (Passport ID)
    cid=lambda a: True  # (Country ID)
)

ok_missing = ['cid']

def pairs_to_dict(fields):
    return dict([tuple(re.split(r'\s*:\s*', pair)) for pair in fields if ':' in pair])

def read_passports(passfile):
    with open(passfile) as f:
        entries = re.split(r'[\n]{2,}', f.read())
        return [pairs_to_dict(re.split(r'\s+', entry)) for entry in entries]

def part1(passports):
    invalids = 0
    for pport in passports:
        for required in required_fields.keys():
            if required not in pport and required not in ok_missing:
                invalids += 1
                break
    return len(passports) - invalids

def part2(passports):
    invalids = 0
    for pport in passports:
        for required, validator in required_fields.items():
            if required not in pport and required not in ok_missing:
                invalids += 1
                break
            if not validator(pport.get(required, '')):
                invalids += 1
                break
    return len(passports) - invalids


if __name__ == '__main__':
    files = sys.argv[1::] if len(sys.argv) > 1 else ['./day4input.txt']
    for f in files:
        print(f'=== {f} ===')
        pps = read_passports(f)
        print(f'Valid passports: {part1(pps)}')  # 222
        print(f'Valid passports via validation checks: {part2(pps)}')  # 140
