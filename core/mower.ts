import { MOWER_MOVES, MowerMove, MowerPosition, Orientation } from "./types";
const DEFAULT_CONFIG: MowerPosition = {
  x: 0,
  y: 0,
  orientation: "N",
};

const MOVES_MAP = {
  N: [0, 1],
  E: [1, 0],
  S: [0, -1],
  W: [-1, 0],
};

const ORIENTATION_MAP: Record<Orientation, any> = {
  N: {
    R: "E",
    L: "W",
  },
  E: {
    R: "S",
    L: "N",
  },

  W: {
    R: "N",
    L: "S",
  },
  S: {
    R: "W",
    L: "E",
  },
};

export class Mower {
  lawn: { x: number; y: number };
  config: MowerPosition;
  constructor(
    lawn: { x: number; y: number },
    config: MowerPosition = DEFAULT_CONFIG
  ) {
    this.lawn = lawn;
    this.config = config;
  }

  isValidDirection = (direction: string): direction is MowerMove => {
    return MOWER_MOVES.includes(direction as MowerMove);
  };

  rotate = (direction: MowerMove) => {
    const { orientation } = this.config;
    this.config.orientation = ORIENTATION_MAP[orientation][direction];
  };
  move(direction: string) {
    if (!this.isValidDirection(direction)) {
      throw new Error("Invalid direction");
    }

    if (["R", "L"].includes(direction)) {
      this.rotate(direction);
    }
    if (direction === "F") {
      this.moveMowerForward();
    }
  }

  executeCommands(commands: MowerMove[]) {
    commands.forEach((command) => this.move(command));
    return {
      status: 200,
      message: "Mower moved successfully",
      data: this.config,
    };
  }

  private moveMowerForward() {
    const { x, y, orientation } = this.config;
    const [xMove, yMove] = MOVES_MAP[orientation];
    if (this.isOutOfBounds(x, xMove, y, yMove)) {
      return;
    }
    this.config = { ...this.config, x: x + xMove, y: y + yMove };
  }

  private isOutOfBounds(x: number, xMove: number, y: number, yMove: number) {
    return (
      x + xMove > this.lawn.x ||
      x + xMove < 0 ||
      y + yMove > this.lawn.y ||
      y + yMove < 0
    );
  }
}
