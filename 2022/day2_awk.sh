#!/usr/bin/env bash

input="${1-day2.txt}"
echo input: $input

awk '
/A/ {if ($2 == "X") a += 4; else if ($2 == "Y") a += 8; else a += 3; }
/B/ {if ($2 == "X") a += 1; else if ($2 == "Y") a += 5; else a += 9; }
/C/ {if ($2 == "X") a += 7; else if ($2 == "Y") a += 2; else a += 6; }
END {print "result day-2 part 1:", a}
' "$input"
