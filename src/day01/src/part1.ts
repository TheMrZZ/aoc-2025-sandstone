/**
 * This file is just an example.
 * You can delete it!
 */

import { _, BasePath, Data, MCFunction, NBT, tell, tellraw, Variable } from "sandstone";

import { day } from "../config.ts";
import * as _example from "../values/example.ts";
import * as _input from "../values/input.ts";

// Switch between example and input, with or without debugging!
const INPUT: string = _input.INPUT; // _input.INPUT;
const DEBUG: boolean = true;

const DIRECTION = {
  L: 0,
  R: 1,
};

// This will make sure all the functions are stored in the part1 directory
const part1 = BasePath({
  directory: "part1",
});

// We are encoding the dials in a list of {Direction: LEFT | RIGHT, Steps: number}
const STORAGE = Data("storage", `aoc2025:day${day}`).select("input");

const encode_input = part1.MCFunction("encode_input", () => {
  const nbtArray: { Direction: number; Steps: number }[] = [];

  for (const line of INPUT.split("\n")) {
    const direction = line[0].trim();
    const steps = parseInt(line.slice(1), 10);

    nbtArray.push({ Direction: DIRECTION[direction], Steps: steps });
  }

  STORAGE.set(nbtArray);
});

const compute_result = part1.MCFunction("compute_result", () => {
  const current = Variable(50);
  const result = Variable(0);

  if (DEBUG) {
    tellraw("@a", [{ text: "Starting value is: ", color: "green" }, current]);
  }

  // In Minecraft functions, you can check if a list is empty by using the `[]` operator.
  // It will translate to `/execute if data storage aoc2025:day1 input[]`, which resolves only if the list is not empty.
  _.while(STORAGE.select([]), () => {
    // Get the direction and steps from the first element of the list.
    // We translate them to scoreboard variables so we can perform checks / operations on them.
    const direction = Variable().set(STORAGE.select([0]).select("Direction"));
    const steps = Variable().set(STORAGE.select([0]).select("Steps"));

    _.if(direction.equalTo(DIRECTION.L), () => {
      current.remove(steps);
    }).else(() => {
      current.add(steps);
    });

    current.modulo(100);

    if (DEBUG) {
      tellraw("@a", [{ text: "Current is: ", color: "green" }, current]);
    }

    _.if(current.equalTo(0), () => {
      result.add(1);
    });

    // Pop the first element of the list.
    STORAGE.select([0]).remove();
  });

  tellraw("@a", [{ text: "Result is: ", color: "gold" }, result]);
});

// The entrypoint for the part1 - run `/function aocdX:part1` in Minecraft to run the solver!
MCFunction(`part1`, () => {
  encode_input();
  compute_result();
});
