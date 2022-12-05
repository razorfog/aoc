#!/usr/bin/env bash
input="${1:-day2.input}"
echo $input
awk '
   /forward/ { horiz += $2;
               depth2 += $2 * aim; }
   /down/    { depth1 += $2; aim += $2; }
   /up/      { depth1 -= $2; aim -= $2; }
   END       { 
       printf("day2 pt 1: %d\n", depth1*horiz);
       printf("     pt 2: %d\n", depth2*horiz);
   }' "$input"









