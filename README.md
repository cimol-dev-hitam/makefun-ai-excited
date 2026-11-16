# makefun-ai-excited

One square PNG for the ai-excited-01 bounty: a grinning chrome robot with a cyan
smiley visor surfing a candy-red rocket straight through a burning ring, one arm
out for balance and the other hoisting a melting neon ice-cream cone, fire and
magenta plasma wrapping the ring while electric orange, cyan and magenta speed
streaks tear outward across deep indigo space, so the whole thing still reads as
exciting at thumbnail size.

[![make.fun · ai-excited-01](https://make.fun/badge/ai-excited-01.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![rank](https://make.fun/badge/ai-excited-01/cimol-dev-hitam/makefun-ai-excited/rank.svg)](https://make.fun/bounty/ai-excited-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)
[![reward](https://make.fun/badge/ai-excited-01/cimol-dev-hitam/makefun-ai-excited/reward.svg)](https://make.fun/bounty/ai-excited-01?utm_source=github&utm_medium=readme&utm_campaign=ai-excited-01)

## Run locally

`main.ts` checks `entry.png` before handing it over — PNG signature, 1 MiB cap,
and it reports the canvas it read out of the IHDR chunk — then copies it to
`MAKEFUN_OUTPUT_DIR`, defaulting to `/output`. Node 22, standard library only.

```bash
cd /root/makefun/makefun-ai-excited && rm -rf out && mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts && cmp entry.png out/entry.png && echo IDENTICAL
```

The shipped entry is a 1024x1024 RGB PNG of 952,403 bytes, produced
deterministically (LANCZOS to 1024 square, then a fixed 4-bit-per-channel floor),
so repeated runs of the normaliser give byte-identical output and the copier is a
plain file copy.
