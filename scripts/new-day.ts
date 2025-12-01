#!/usr/bin/env ts-node
/**
 * Bootstrap script for creating a new Advent of Code day
 * Usage: npm run new-day <day-number>
 *        or: ts-node scripts/new-day.ts <day-number>
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function copyDirectory(src: string, dest: string): void {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function updateDayNumber(filePath: string, dayNumber: number): void {
  let content = fs.readFileSync(filePath, "utf-8");
  content = content.replace(/export const day = 0;/g, `export const day = ${dayNumber};`);
  fs.writeFileSync(filePath, content, "utf-8");
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Error: Please provide a day number");
    console.error("Usage: npm run new-day <day-number>");
    console.error("Example: npm run new-day 2");
    process.exit(1);
  }

  const dayNumber = parseInt(args[0], 10);

  if (isNaN(dayNumber) || dayNumber < 1 || dayNumber > 25) {
    console.error("Error: Day number must be between 1 and 25");
    process.exit(1);
  }

  const dayString = dayNumber.toString().padStart(2, "0");
  const projectRoot = path.resolve(__dirname, "..");
  const templateDir = path.join(projectRoot, "src", "_template");
  const targetDir = path.join(projectRoot, "src", `day${dayString}`);

  // Check if template exists
  if (!fs.existsSync(templateDir)) {
    console.error(`Error: Template directory not found at ${templateDir}`);
    process.exit(1);
  }

  // Check if day already exists
  if (fs.existsSync(targetDir)) {
    console.error(`Error: Day ${dayString} already exists at ${targetDir}`);
    process.exit(1);
  }

  console.log(`Creating day ${dayString}...`);

  // Copy template to new day directory
  copyDirectory(templateDir, targetDir);
  console.log(`Copied template to ${targetDir}`);

  // Update config.ts with the correct day number
  const configPath = path.join(targetDir, "config.ts");
  updateDayNumber(configPath, dayNumber);
  console.log(`Updated config.ts with day number ${dayNumber}`);

  // Git operations
  try {
    const inputPath = path.join(targetDir, "values", "input.ts");
    const relativeInputPath = path.relative(projectRoot, inputPath);

    // Add all files including input.ts
    execSync(`git add "${targetDir}"`, { cwd: projectRoot, stdio: "pipe" });
    console.log(`Added day ${dayString} files to git`);

    // Set skip-worktree on input.ts
    execSync(`git update-index --skip-worktree "${relativeInputPath}"`, {
      cwd: projectRoot,
      stdio: "pipe",
    });
    console.log(`Set skip-worktree on ${relativeInputPath}`);
  } catch (error) {
    console.warn("Warning: Git operations failed. You may need to run them manually:");
    console.warn(`  git add src/day${dayString}`);
    console.warn(`  git update-index --skip-worktree src/day${dayString}/values/input.ts`);
  }

  console.log(`\nDay ${dayString} created successfully!`);
  console.log(`\nNext steps:`);
  console.log(`1. Add your puzzle input to: src/day${dayString}/values/input.ts`);
  console.log(`2. Add example input and expected results to: src/day${dayString}/values/example.ts`);
  console.log(`3. Implement TypeScript solution in: src/day${dayString}/ts_solution/`);
  console.log(`4. Implement Minecraft/Sandstone solution in: src/day${dayString}/src/`);
  console.log(`\nRun TypeScript solutions with: ts-node src/day${dayString}/ts_solution/part1.ts`);
  console.log(`Build Sandstone datapack with: cd src/day${dayString} && npx sandstone`);
}

main();
