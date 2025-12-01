# <img src="https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/12/Grass_Block_JE2.png" width="32" height="32" alt="Minecraft Grass Block"> Advent of Code 2025 - Minecraft Edition

<div align="center">
  Go to day <a href="src/day01">[1]</a>
  <br />
  <br />
</div>

I love Minecraft, I love Advent of Code. So I woke up this december and thought - why not do both at the same time? 🙃

This project is my attempt to solve every challenge of AOC 2025 in Minecraft's weird `mcfunction` language. This language is Turing-complete, meaning we can definitely solve any AOC challenge in it... Though it's not very practical.

To ease my pain, I will use [Sandstone](https://sandstone.dev/), my TypeScript-to-Minecraft compiler. It will definitely make the challenge easier compared to writing raw `mcfunction`.


👉 **Take a look at my solutions in `src/dayXX/src/part1|2`**!

## The rules

Everyday, I will:
- Ship a pure Typescript solution, which will be my reference implementation
- Then ship a working Minecraft solution implemented in Sandstone


## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/aoc2025.git
cd aoc2025

# Install dependencies
npm install

# Configure your Minecraft world path
# Edit options.ts with your Minecraft world path
```

## Project Structure

```
aoc2025/
├── src/
│   ├── _template/          # Template for new days
│   ├── day01/              # Solutions for each day
│   │   ├── config.ts       # Day number configuration
│   │   ├── sandstone.config.ts
│   │   ├── src/            # Sandstone/Minecraft implementation
│   │   │   ├── gamerules.ts
│   │   │   ├── part1.ts
│   │   │   └── part2.ts
│   │   ├── ts_solution/    # TypeScript reference solutions
│   │   │   ├── part1.ts
│   │   │   └── part2.ts
│   │   └── values/
│   │       ├── example.ts  # Example input & expected results
│   │       └── input.ts    # Your puzzle input
│   └── ...
├── scripts/                # Automation scripts
├── options.ts              # Local configuration (world path)
└── package.json
```

## Usage

### Creating a New Day

Scaffold a new day's structure from the template:

```bash
npm run new-day <day-number>
```

Example:
```bash
npm run new-day 3
```

Then update `src/dayXX/values/input.ts` (and `example.ts`) with the day's values.

This will:
- Create `src/day03/` with all necessary files
- Update the day number in configuration
- Add files to git with `input.ts` set to skip-worktree (so your puzzle input stays private)

### Running TypeScript Solutions

Test your solutions in TypeScript before implementing in Minecraft:

```bash
# Run part 1 for a specific day
npm run part1 <day-number>

# Run part 2 for a specific day
npm run part2 <day-number>
```

Examples:
```bash
npm run part1 1   # Runs day 1, part 1
npm run part2 1   # Runs day 1, part 2
```

### Building Minecraft Datapacks

Compile Sandstone code to Minecraft datapacks:

```bash
# Build once
npm run build <day-number>

# Watch for changes and rebuild automatically
npm run watch <day-number>
```

Examples:
```bash
npm run build 1   # Builds day 1's datapack
npm run watch 2   # Watches day 2's files for changes
```

The generated datapack will be automatically saved to your configured Minecraft world's `datapacks` folder (configured in `options.ts`).

### Running in Minecraft

1. Build the datapack for your day: `npm run build <day>`
2. Start or reload your Minecraft world
3. Run `/reload` in-game to load the datapack
4. Execute the function:
   - Part 1: `/function aocd<day>:part1`
   - Part 2: `/function aocd<day>:part2`

Example for day 1:
```
/function aocd1:part1
/function aocd1:part2
```

## Development Workflow

1. **Create a new day**: `npm run new-day <day>`
2. **Add puzzle input**:
   - Paste your input in `src/day0X/values/input.ts`
   - Add example input and expected results in `src/day0X/values/example.ts`
3. **Prototype in TypeScript**:
   - Implement the solution in `src/day0X/ts_solution/part1.ts`
   - Test with `npm run part1 <day>`
4. **Translate to Sandstone**:
   - Implement the Minecraft version in `src/day0X/src/part1.ts`
   - Build with `npm run build <day>` or `npm run watch <day>`
5. **Test in Minecraft**: Run the function in-game and verify results
6. **Repeat for part 2**

## Configuration

### Minecraft World Path

Edit `options.ts` to point to your Minecraft world:

```typescript
export default {
    minecraftWorldPath: '/path/to/your/minecraft/world'
}
```

### Switching Between Example and Input

In each Sandstone solution file (`src/dayXX/src/part1.ts`):

```typescript
// Use example input
const INPUT: string = _example.INPUT;

// Use real puzzle input
const INPUT: string = _input.INPUT;
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run new-day <day>` | Create a new day from template |
| `npm run part1 <day>` | Run TypeScript solution for part 1 |
| `npm run part2 <day>` | Run TypeScript solution for part 2 |
| `npm run build <day>` | Build Sandstone datapack |
| `npm run watch <day>` | Watch and rebuild datapack on changes |

## Tips for Sandstone Development

- **Variables**: Use `Variable()` for scoreboard values
- **Storage**: Use `Data("storage", "namespace")` for NBT data
- **Loops**: Use `_.while()`
- **Conditionals**: Use `_.if().elseIf().else()`
- **Commands**: All Minecraft commands have Sandstone equivalents (e.g., `tellraw()`, `gamerule()`)
