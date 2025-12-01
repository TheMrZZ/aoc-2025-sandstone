import type { SandstoneConfig } from "sandstone";

import options from "../../options";

import path = require("path");

import { day } from "./config";

const namespace = `aocd${day}`;

export default {
  name: namespace,
  description: ["Advent of code 2025 - ", { text: `Day ${day}`, color: "gold" }],
  formatVersion: 7,
  namespace: namespace,
  packUid: `aoc2025-d${day}`,
  saveOptions: {
    path: path.join(options.minecraftWorldPath, "datapacks"),
  },
  onConflict: {
    default: "throw",
  },
} as SandstoneConfig;
