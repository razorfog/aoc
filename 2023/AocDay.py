from typing import List, Optional
from pathlib import Path

class AocDay:
    def __init__(self, day=None, sampleA=None, sampleB=None):
        self.day_file = Path(day) if day else None
        self.A_file = Path(sampleA) if sampleA else None
        self.B_file = Path(sampleB) if sampleB else None
        self.day_data = self.get_data(self.day_file) if day else None
        self.A_data = self.get_data(self.A_file) if sampleA else None
        self.B_data = self.get_data(self.B_file) if sampleB else None


    def split_data(self, datax: str) -> List[str]:
        return datax.splitlines()

    def get_data(self, filex: Path) -> Optional[str]:
        if filex.exists():
            return open(filex, mode='r', encoding='utf-8').read()
        else:
            return None

    def part1(self, data: str):
        return 'part1 not implemented'

    def part2(self, data: str):
        return 'part2 not implemented'

    def run(self, samples_only=False):
        if self.A_data:
            print(f'part1 on {self.A_file}: {self.part1(self.A_data)}')
        if self.day_data and not samples_only:
            print(f'part1 on {self.day_file}: {self.part1(self.day_data)}')
        if self.B_data:
            print(f'part2 on {self.B_file}: {self.part2(self.B_data)}')
            if not samples_only and self.day_data:
                print(f'part2 on {self.day_file}: {self.part2(self.day_data)}')
