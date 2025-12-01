import * as example from "../values/example.ts";
import * as input from "../values/input.ts";

function solve(input: string): number {
  let pos = 50;
  let total = 0;

  console.log("Starting at", pos);

  for (const line of input.split("\n")) {
    const direction = line[0];
    const steps = parseInt(line.slice(1), 10);

    if (direction === "L") {
      total += Math.floor(steps / 100);
      if (pos !== 0 && steps % 100 >= pos) {
        total += 1;
      }
      pos = (((pos - steps) % 100) + 100) % 100;
    } else {
      // R
      pos += steps;
      total += Math.floor(pos / 100);
      pos = pos % 100;
    }

    console.log(`Rotated ${direction}${steps} to point at ${pos}`);
  }

  return total;
}

function main() {
  if (!input.INPUT) {
    console.warn("No input found - only running example");
  }

  const exampleResult = solve(example.INPUT);
  if (exampleResult !== example.PART2_EXPECTED_RESULT) {
    throw new Error(`Example result is wrong. Expected ${example.PART2_EXPECTED_RESULT} but got ${exampleResult}`);
  } else {
    console.log("Example result is correct.\n");
  }

  const inputResult = solve(input.INPUT);
  console.log(`Input result: ${inputResult}`);
}

main();
