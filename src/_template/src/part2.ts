import { _, BasePath, Data, MCFunction, tellraw, Variable } from "sandstone";

import { day } from "../config.ts";
import * as _example from "../values/example.ts";
import * as _input from "../values/input.ts";

// Switch between example and input, with or without debugging!
const INPUT: string = _example.INPUT; // _input.INPUT;
const DEBUG: boolean = true;

// This will make sure all the functions are stored in the part2 directory
const part2 = BasePath({
  directory: "part2",
});

// Storage for input data
const STORAGE = Data("storage", `aoc2025:day${day}`).select("input");

const encode_input = part2.MCFunction("encode_input", () => {
  // TODO: Encode your input here
  STORAGE.set([]);
});

const compute_result = part2.MCFunction("compute_result", () => {
  const result = Variable(0);

  if (DEBUG) {
    tellraw("@a", [{ text: "Starting computation...", color: "green" }]);
  }

  // TODO: Implement your solution here

  tellraw("@a", [{ text: "Result is: ", color: "gold" }, result]);
});

// The entrypoint for the part2 - run `/function aocdX:part2` in Minecraft to run the solver!
MCFunction(`part2`, () => {
  encode_input();
  compute_result();
});
