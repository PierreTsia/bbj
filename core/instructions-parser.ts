import {
  compass,
  MowerDescription,
  MowerInstruction,
  Orientation,
} from "./types";

const MIN_MOWER_LINE_COUNT = 3;

const stringToNumbers = (str: string): number[] =>
  str.split("")?.map((char) => Number(char));

const getCoords = (line: string): number[] => {
  if (!line || line.split("")?.length !== 2)
    throw new Error("Invalid instructions");
  return stringToNumbers(line);
};

const isValidCoords = (coords: unknown[]): boolean => {
  return coords.every((c) => !isNaN(c as number));
};

const getLinesFromRawText = (instructions: string) => {
  return instructions.split("\n").map((line) => line.trim());
};

const getMowerCoords = (line: string): Array<string | number> => {
  const [xy, orientation] = line.split(" ") as [string, Orientation];
  if (!compass.includes(orientation) || !xy || xy.split("")?.length !== 2) {
    throw new Error("Invalid instructions");
  }
  const coords = stringToNumbers(xy);
  return [...coords, orientation];
};


const getMowerInstructions = (
  rawLines: string[]
): MowerInstruction["mowers"] => {
  if (rawLines.length % 2 !== 0) {
    throw new Error("Invalid instructions");
  }
  const mowers = [] as any;
  for (let i = 0; i < rawLines.length; i += 2) {
    const [x, y, orientation] = getMowerCoords(rawLines[i]);
    mowers.push({
      initialPosition: {
        x,
        y,
        orientation,
      } as MowerDescription["initialPosition"],
      commands: rawLines[i + 1].split("") as MowerDescription["commands"],
    });
  }

  return mowers;
};

export const parseInstructions = (instructions: string): MowerInstruction => {
  const [lawnLine, ...mowerInstructions] = getLinesFromRawText(instructions);
  const [x, y] = getCoords(lawnLine);
  const mowers: MowerInstruction["mowers"] =
    getMowerInstructions(mowerInstructions);

  if (
    mowerInstructions.length < MIN_MOWER_LINE_COUNT ||
    !isValidCoords([x, y])
  ) {
    throw new Error("Invalid instructions");
  }

  return {
    lawn: { x, y },
    mowers,
  };
};
