import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { parseInstructions } from "../core/instructions-parser";
import { MowerPosition } from "../core/types";
import { Mower } from "../core/mower";

const Home: NextPage = () => {
  const instructions = `55
                          44 S
                          LFRRFFLFRFF
                          22 N
                          FFRLLRFRLF`;

  const mowerInstructions = parseInstructions(instructions);
  const results: MowerPosition[] = [];

  mowerInstructions.mowers.forEach((mowerDescription) => {
    const mower = new Mower(
      mowerInstructions.lawn,
      mowerDescription.initialPosition
    );
    const { data } = mower.executeCommands(mowerDescription.commands);
    results.push(data);
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mower App</h1>
      <h2 className={styles.subtitle}>Results:</h2>
      <ul className={styles.list}>
        {results.map((result, index) => (
          <li key={index} className={styles.listItem}>
            Position: [{result.x}, {result.y}], Orientation:{" "}
            {result.orientation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
