interface WithPosition {
  x: number;
  y: number;
}
export interface MowerPosition extends WithPosition {
  orientation: Orientation;
}

export const compass = ["N", "E", "W", "S"] as const;
export type Orientation = (typeof compass)[number];

type MowerMove = "R" | "L" | "F";

export interface MowerInstruction {
  lawn: WithPosition;
  mowers: MowerDescription[];
}

export type MowerDescription = { initialPosition: MowerPosition } & {
  commands: MowerMove[];
};
