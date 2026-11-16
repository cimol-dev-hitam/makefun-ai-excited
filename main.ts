// Hands the finished artwork (entry.png) to the judging harness.
// Node 22, standard library only: no dependencies, no build step.
//
// The harness rejects an entry that is not a single PNG of at most 1 MiB, so the
// file is inspected here first. A bad artifact fails the run loudly instead of
// being copied and scored as a zero.
import { mkdirSync, copyFileSync, openSync, readSync, closeSync, statSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const MIB = 1024 * 1024;
const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

// The repository directory, taken from this file's own location so the script
// behaves the same no matter which working directory it is launched from.
const repoDir = dirname(fileURLToPath(import.meta.url));

// Where the harness expects the artifact. Overridable for local runs.
const outputDir = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");

const source = join(repoDir, "entry.png");
const destination = join(outputDir, "entry.png");

// Refuse anything that would be disqualified: wrong magic bytes, or too heavy.
function verify(path: string): void {
  const { size } = statSync(path);

  if (size > MIB) {
    fail(`${path} is ${size} bytes, over the 1 MiB (${MIB} byte) limit`);
  }
  if (size < PNG_SIGNATURE.length) {
    fail(`${path} is only ${size} bytes, too small to be a PNG`);
  }

  const head = Buffer.alloc(PNG_SIGNATURE.length);
  const fd = openSync(path, "r");
  try {
    readSync(fd, head, 0, head.length, 0);
  } finally {
    closeSync(fd);
  }
  if (!head.equals(PNG_SIGNATURE)) {
    fail(`${path} does not start with the PNG signature ${PNG_SIGNATURE.toString("hex")}`);
  }

  console.log(`checked ${path}: ${size} bytes, valid PNG`);
}

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

verify(source);

mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

console.log(`wrote ${destination}`);
