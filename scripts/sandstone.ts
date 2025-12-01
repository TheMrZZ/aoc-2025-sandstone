#!/usr/bin/env ts-node
/**
 * Script to build or watch Sandstone datapacks for a specific day
 * Usage: npm run build <day-number>
 *        npm run watch <day-number>
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
    console.error("Error: Please provide a mode and day number");
    console.error("Usage: ts-node scripts/sandstone.ts <build|watch> <day-number>");
    console.error("Example: ts-node scripts/sandstone.ts build 2");
    process.exit(1);
  }

  const mode = args[0];
  const dayNumber = parseInt(args[1], 10);

  if (!["build", "watch"].includes(mode)) {
    console.error("Error: Mode must be 'build' or 'watch'");
    process.exit(1);
  }

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
    console.error("Error: Day number must be between 1 and 25");
    process.exit(1);
  }

  const dayString = dayNumber.toString().padStart(2, "0");
  const projectRoot = path.resolve(__dirname, "..");
  const dayDir = path.join(projectRoot, "src", `day${dayString}`);

  // Check if day exists
  if (!fs.existsSync(dayDir)) {
    console.error(`Error: Day ${dayString} does not exist at ${dayDir}`);
    console.error(`Run 'npm run new-day ${dayNumber}' to create it first`);
    process.exit(1);
  }

  console.log(`Running Sandstone ${mode} for day ${dayString}...`);
  console.log(`Working directory: ${dayDir}\n`);

  // Run sandstone in the day's directory
  const command = mode === "watch" ? "watch" : "build";
  const result = spawnSync("npx", ["sand", command], {
    cwd: dayDir,
    stdio: "inherit",
    shell: true,
  });

  if (result.error) {
    console.error(`\nError running sandstone: ${result.error.message}`);
    process.exit(1);
  }

  process.exit(result.status || 0);
}

main();
