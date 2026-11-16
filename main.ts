// Submission copier for ai-excited-01.
//
// The judge only ever looks at $MAKEFUN_OUTPUT_DIR/entry.png, so this program has
// exactly one job: put the picture from this repository there. Node 22 built-ins
// only, no dependencies, no build step.
import { copyFileSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const BYTE_BUDGET = 1024 * 1024; // the harness refuses anything larger
const PNG_HEADER = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]); // "\x89PNG\r\n\x1a\n"

// Anchoring on this file's own path keeps `node main.ts`, `node .`, and a run from
// another directory all behaving the same.
const repositoryDirectory = dirname(fileURLToPath(import.meta.url));

// The harness reads here. Locally we point it somewhere writable instead.
const outputDirectory = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

const artwork = join(repositoryDirectory, "entry.png");
const handedIn = join(outputDirectory, "entry.png");

// A judge that cannot open the file scores a zero, so the artifact is checked
// before it is handed over: real PNG signature and sane byte weight.
// Any problem ends the run with a non-zero status and a readable reason.
function inspect(path: string): string {
  let size: number;
  try {
    size = statSync(path).size;
  } catch {
    return reject(`${path} is missing — nothing to submit`);
  }

  if (size > BYTE_BUDGET) {
    return reject(`${path} weighs ${size} bytes; the cap is ${BYTE_BUDGET} (1 MiB)`);
  }
  if (size <= PNG_HEADER.length) {
    return reject(`${path} is ${size} bytes, too short to hold a PNG body`);
  }

  const bytes = readFileSync(path);
  if (!bytes.subarray(0, PNG_HEADER.length).equals(PNG_HEADER)) {
    return reject(`${path} is not a PNG: first bytes are ${bytes.subarray(0, 8).toString("hex")}, expected ${PNG_HEADER.toString("hex")}`);
  }

  // IHDR starts at byte 16 with the big-endian width and height.
  const width = bytes.readUInt32BE(16);
  const height = bytes.readUInt32BE(20);
  return `${width}x${height}, ${size} bytes`;
}

function reject(problem: string): never {
  console.error(`refusing to submit: ${problem}`);
  process.exit(1);
}

const summary = inspect(artwork);

mkdirSync(outputDirectory, { recursive: true });
copyFileSync(artwork, handedIn);

console.log(`entry.png ok (${summary})`);
console.log(`copied ${artwork} -> ${handedIn}`);
