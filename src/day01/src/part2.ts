/**
 * Part 2: Count every time the dial crosses 0 during any rotation
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

// This will make sure all the functions are stored in the part2 directory
const part2 = BasePath({
  directory: "part2",
});

// We are encoding the dials in a list of {Direction: LEFT | RIGHT, Steps: number}
const STORAGE = Data("storage", `aoc2025:day${day}`).select("input");

const encode_input = part2.MCFunction("encode_input", () => {
  const nbtArray: { Direction: number; Steps: number }[] = [];

  for (const line of INPUT.split("\n")) {
    const direction = line[0].trim();
    const steps = parseInt(line.slice(1), 10);

    nbtArray.push({ Direction: DIRECTION[direction], Steps: steps });
  }

  STORAGE.set(nbtArray);
});

const compute_result = part2.MCFunction("compute_result", () => {
  const pos = Variable(50);
  const result = Variable(0);

  if (DEBUG) {
    tellraw("@a", [{ text: "Starting value is: ", color: "green" }, pos]);
  }

  _.while(STORAGE.select([]), () => {
    // Get the direction and steps from the first element of the list.
    const direction = Variable().set(STORAGE.select([0]).select("Direction"));
    const steps = Variable().set(STORAGE.select([0]).select("Steps"));

    _.if(direction.equalTo(DIRECTION.L), () => {
      // LEFT: count full rotations
      result.add(steps.dividedBy(100));

      // Check if remainder would cause a wrap (pos != 0 && steps % 100 >= pos)
      const remainder = steps.moduloBy(100);

      _.if(_.and(pos.greaterThan(0), remainder.greaterOrEqualThan(pos)), () => {
        result.add(1);
      });

      // Update position
      pos.remove(steps).modulo(100);
    }).else(() => {
      // RIGHT: add steps first, then count crossings
      pos.add(steps);
      result.add(pos.dividedBy(100));

      // Update position
      pos.modulo(100);
    });

    if (DEBUG) {
      tellraw("@a", [{ text: "Position is: ", color: "green" }, pos]);
    }

    // Pop the first element of the list.
    STORAGE.select([0]).remove();
  });

  tellraw("@a", [{ text: "Result is: ", color: "gold" }, result]);
});

// The entrypoint for the part2 - run `/function aocdX:part2` in Minecraft to run the solver!
MCFunction(`part2`, () => {
  encode_input();
  compute_result();
});
