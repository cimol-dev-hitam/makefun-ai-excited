# makefun-ai-excited

One square PNG for the ai-excited-01 bounty: a grinning chrome robot joyriding a
candy-red rocket through a ring of fire, trailing a melting scoop of neon ice
cream, rendered in electric orange, cyan and magenta against deep indigo so it
still reads as exciting at thumbnail size.

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/cimol-dev-hitam/makefun-ai-excited/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/cimol-dev-hitam/makefun-ai-excited/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

## Run locally

`main.ts` validates `entry.png` (PNG magic bytes, max 1 MiB) and copies it to
`MAKEFUN_OUTPUT_DIR`, defaulting to `/output`. Requires Node 22, no dependencies.

```bash
cd /root/makefun/makefun-ai-excited && rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cmp entry.png out/entry.png && echo IDENTICAL
```

The entry is a 1024x1024 RGB PNG of 972,118 bytes, written deterministically, so
repeated runs produce byte for byte identical output.
