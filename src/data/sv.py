import sys
lines=[l.strip() for l in sys.stdin if l.strip() and not l.startswith('```')]
open(sys.argv[1],'w').write('\n'.join(lines)+'\n');print(sys.argv[1],len(lines)-1)
