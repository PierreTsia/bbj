import { describe, expect, it } from "vitest";
import { Mower } from "../core/mower";

describe("Mower Class", () => {
  it("should be defined", () => {
    expect(Mower).toBeDefined();
  });

  it("should receive an lawn coords and config (optional) to be instantiated", () => {
    const m = new Mower({ x: 5, y: 5 });
    const m2 = new Mower({ x: 5, y: 5 }, { x: 1, y: 1, orientation: "N" });
    expect(m).toBeDefined();
    expect(m2).toBeDefined();
  });

  it("should have a method called 'move' that errors out if passed anything but a Direction", () => {
    const m = new Mower({ x: 5, y: 5 });
    expect(m.move).toBeDefined();
    const wrongCalls = ["", " ", "A", "1", "N", "S", "E", "W"];
    wrongCalls.forEach((wrongCall) => {
      expect(() => m.move(wrongCall)).toThrow();
    });

    const rightCalls = ["R", "L", "F"];
    rightCalls.forEach((rightCall) => {
      expect(() => m.move(rightCall)).not.toThrow();
    });
  });

  it("move called with R or L should rotate the mower", () => {
    const m = new Mower({ x: 5, y: 5 }, { x: 1, y: 1, orientation: "N" });
    m.move("R");
    expect(m.config.orientation).toBe("E");
    m.move("L");
    expect(m.config.orientation).toBe("N");
  });

  it("move called with F should move the mower forward", () => {
    const m = new Mower({ x: 5, y: 5 }, { x: 1, y: 1, orientation: "N" });
    m.move("F");
    expect(m.config.y).toBe(2);
  });

  it("should keep same position if direction goes out of bounds", () => {
    const m = new Mower({ x: 5, y: 5 }, { x: 5, y: 5, orientation: "N" });
    m.move("F");
    expect(m.config).toEqual({ x: 5, y: 5, orientation: "N" });
    const m2 = new Mower({ x: 5, y: 5 }, { x: 0, y: 0, orientation: "W" });
    m2.move("F");
    expect(m2.config).toEqual({ x: 0, y: 0, orientation: "W" });
  });

  it("should have a method called 'executeCommands' that executes a list of commands", () => {
    const m = new Mower({ x: 5, y: 5 }, { x: 1, y: 1, orientation: "N" });
    expect(m.executeCommands).toBeDefined();
    expect(() => m.executeCommands(["R", "L", "F"])).not.toThrow();
  });

  it("should execute commands correctly", () => {
    const m2 = new Mower({ x: 5, y: 5 }, { x: 2, y: 2, orientation: "N" });
    m2.executeCommands(["F", "F", "R", "L", "L", "R", "F", "R", "L", "F"]); // LFRRFFLFRFF
    expect(m2.config).toEqual({ x: 2, y: 5, orientation: "N" });

    const m = new Mower({ x: 5, y: 5 }, { x: 4, y: 4, orientation: "S" });
    m.executeCommands(["L", "F", "R", "R", "F", "F", "L", "F", "R", "F", "F"]); // LFRRFFLFRFF
    expect(m.config).toEqual({ x: 1, y: 3, orientation: "W" });
  });
});
