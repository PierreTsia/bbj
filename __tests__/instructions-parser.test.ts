import { describe, expect, it } from "vitest";
import { parseInstructions } from "../core/instructions-parser";

const VALID_INSTRUCTIONS = `55
    44 S
    LFRRFFLFRFF
    22 N
    FFRLLRFRLF`;

const INVALID_INSTRUCTIONS = [
  `55`,
  "",
  `NN
    44 S
    LFRRFFLFRFF
    22 N
    FFRLLRFRLF`,
  `NN
    44 S
    LFRRFFLFRFF
    22
    FFRLLRFRLF`,
  `NN
    4S
    LFRRFFLFRFF
    22 N
    FFRLLRFRLF`,
  `55
    44S
    LFRRFFLFRFF
    22 N
    FFRLLRFRLF`,
  `55
    44 S
    22 N
    FFRLLRFRLF`,
  `55
    44 G
    LFRRFFLFRFF
    22 N
    FFRLLRFRLF`
];

describe("Instructions Parser", () => {
  it("should throw error if instruction is incorrectly formatted", () => {
    expect(() => parseInstructions(VALID_INSTRUCTIONS)).not.toThrow();
    INVALID_INSTRUCTIONS.forEach((invalidInstruction) => {
      expect(() => parseInstructions(invalidInstruction)).toThrow();
    });
  });

  it("should return a valid MowerInstruction object", () => {
    const instructions = parseInstructions(VALID_INSTRUCTIONS);
    expect(instructions.lawn).toEqual({ x: 5, y: 5 });
    expect(instructions.mowers).toHaveLength(2);
    expect(instructions.mowers[0].initialPosition).toEqual({
      x: 4,
      y: 4,
      orientation: "S",
    });

    expect(instructions.mowers[0].commands).toEqual([
      "L",
      "F",
      "R",
      "R",
      "F",
      "F",
      "L",
      "F",
      "R",
      "F",
      "F",
    ]);
    expect(instructions.mowers[1].initialPosition).toEqual({
      x: 2,
      y: 2,
      orientation: "N",
    });

    expect(instructions.mowers[1].commands).toEqual([
      "F",
      "F",
      "R",
      "L",
      "L",
      "R",
      "F",
      "R",
      "L",
      "F",
    ]);
  });
});
