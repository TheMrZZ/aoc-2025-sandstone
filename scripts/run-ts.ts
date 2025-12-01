#!/usr/bin/env ts-node
/**
 * Script to run TypeScript solutions for a specific day and part
 * Usage: npm run part1 <day-number>
 *        npm run part2 <day-number>
 */

import * as fs from "fs";
import * as path from "path";
import { spawnSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error("Error: Please provide a part and day number");
    console.error("Usage: ts-node scripts/run-ts.ts <1|2> <day-number>");
    console.error("Example: ts-node scripts/run-ts.ts 1 2");
    process.exit(1);
  }

  const part = parseInt(args[0], 10);
  const dayNumber = parseInt(args[1], 10);

  if (![1, 2].includes(part)) {
    console.error("Error: Part must be 1 or 2");
    process.exit(1);
  }

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
    console.error("Error: Day number must be between 1 and 25");
    process.exit(1);
  }

  const dayString = dayNumber.toString().padStart(2, "0");
  const projectRoot = path.resolve(__dirname, "..");
  const solutionFile = path.join(projectRoot, "src", `day${dayString}`, "ts_solution", `part${part}.ts`);

  // Check if solution file exists
  if (!fs.existsSync(solutionFile)) {
    console.error(`Error: Solution file not found: ${solutionFile}`);
    console.error(`Run 'npm run new-day ${dayNumber}' to create day ${dayString} first`);
    process.exit(1);
  }

  console.log(`Running TypeScript solution for Day ${dayString}, Part ${part}\n`);

  // Run the TypeScript solution
  const result = spawnSync("ts-node", [solutionFile], {
    cwd: projectRoot,
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error(`\nError running solution: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status || 0);
}

main();
