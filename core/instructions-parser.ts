import {
  COMPASS,
  MowerDescription,
  MowerInstruction,
  Orientation,
} from "./types";

const MAGIC_NUMBERS = Object.freeze({
  COORDS_COUNT: 2, // x and y
  INSTRUCTIONS_LINES_PER_MAULER: 2,
});

const isNotNumberString = (str: string): boolean => isNaN(Number(str));

const isCorrectOrientation = (str: string): boolean =>
  COMPASS.includes(str as Orientation);

const stringToNumbers = (str: string): number[] =>
  str.split("")?.map((char) => Number(char));

const getCoords = (line: string): number[] => {
  const coordsStr = line.split("");
  if (
    coordsStr?.length !== MAGIC_NUMBERS.COORDS_COUNT ||
    coordsStr.some(isNotNumberString)
  ) {
    throw new Error("Invalid instructions");
  }
  return stringToNumbers(line);
};

const getLinesFromRawText = (instructions: string) => {
  return instructions.split("\n").map((line) => line.trim());
};

const getMowerCoords = (line: string): Array<string | number> => {
  const [xy, orientation] = line.split(" ") as [string, Orientation];
  if (!isCorrectOrientation(orientation)) {
    throw new Error("Invalid instructions");
  }
  const coords = getCoords(xy);
  return [...coords, orientation];
};

const getMowerInstructions = (
  rawLines: string[]
): MowerInstruction["mowers"] => {
  if (
    rawLines.length < MAGIC_NUMBERS.INSTRUCTIONS_LINES_PER_MAULER ||
    rawLines.length % MAGIC_NUMBERS.INSTRUCTIONS_LINES_PER_MAULER !== 0
  ) {
    throw new Error("Invalid instructions");
  }
  const mowers: MowerDescription[] = [];
  for (
    let i = 0;
    i < rawLines.length;
    i += MAGIC_NUMBERS.INSTRUCTIONS_LINES_PER_MAULER
  ) {
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

  return {
    lawn: { x, y },
    mowers,
  };
};
