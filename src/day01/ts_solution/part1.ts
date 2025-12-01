import * as example from "../values/example.ts";
import * as input from "../values/input.ts";

function solve(input: string): number {
  let current = 50;
  let result = 0;

  for (const line of input.split("\n")) {
    const direction = line[0].trim();
    const steps = parseInt(line.slice(1), 10);

    if (direction === "L") {
      current -= steps;
    } else {
      current += steps;
    }

    if (current % 100 === 0) {
      result += 1;
    }
  }

  return result;
}

function main() {
  if (!input.INPUT) {
    console.warn("No input found - only running example");
  }

  const exampleResult = solve(example.INPUT);
  if (exampleResult !== example.PART1_EXPECTED_RESULT) {
    throw new Error(`Example result is wrong. Expected ${example.PART1_EXPECTED_RESULT} but got ${exampleResult}`);
  } else {
    console.log("Example result is correct.\n");
  }

  const inputResult = solve(input.INPUT);
  console.log(`Input result: ${inputResult}`);
}

main();
