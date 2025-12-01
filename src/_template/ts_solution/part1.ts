import * as example from "../values/example.ts";
import * as input from "../values/input.ts";

function solve(input: string): number {
  // TODO: Implement your solution here
  return 0;
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
