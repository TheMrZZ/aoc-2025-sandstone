import { gamerule, MCFunction } from "sandstone";

MCFunction(
  "set_gamerules",
  () => {
    // Max out the number of commands Minecraft allows running.
    gamerule("maxCommandChainLength", 2 ** 32 - 1);
  },
  {
    runOnLoad: true,
  },
);
