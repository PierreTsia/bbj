export interface WithPosition {
  x: number;
  y: number;
}
export interface MowerPosition extends WithPosition {
  orientation: Orientation;
}

export const COMPASS = ["N", "E", "W", "S"] as const;
export type Orientation = (typeof COMPASS)[number];

export const MOWER_MOVES = ["R", "L", "F"] as const;
export type MowerMove = (typeof MOWER_MOVES)[number];
export type RightOrLeft = Exclude<MowerMove, "F">;

export interface MowerInstruction {
  lawn: WithPosition;
  mowers: MowerDescription[];
}

export type MowerDescription = { initialPosition: MowerPosition } & {
  commands: MowerMove[];
};

export const isRighOrLeft = (move: MowerMove): move is RightOrLeft =>
  move === "R" || move === "L";
