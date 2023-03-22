import type { NextPage } from "next";
import { useState } from "react";
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
  const [results, setResults] = useState<MowerPosition[]>([]);
  const [showResults, setShowResults] = useState(false);
  const executeCommands = () => {
    const newResults: MowerPosition[] = [];

    mowerInstructions.mowers.forEach((mowerDescription) => {
      const mower = new Mower(
        mowerInstructions.lawn,
        mowerDescription.initialPosition
      );
      const { data } = mower.executeCommands(mowerDescription.commands);
      newResults.push(data);
    });

    setResults(newResults);
    setShowResults(true);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mower App</h1>
      <h2 className={styles.subtitle}>Instructions:</h2>
      <pre className={styles.instructions}>{instructions}</pre>
      <h2 className={styles.subtitle}>Original Positions:</h2>
      <ul className={styles.list + " " + styles.originalPositions}>
        {mowerInstructions.mowers.map((mower, index) => (
          <li key={index} className={styles.listItem}>
            Position: [{mower.initialPosition.x}, {mower.initialPosition.y}],
            Orientation: {mower.initialPosition.orientation}
          </li>
        ))}
      </ul>
      <button className={styles.executeButton} onClick={executeCommands}>
        Execute Commands
      </button>
      {showResults && (
        <>
          <h2 className={styles.subtitle}>Results:</h2>
          <ul className={styles.list}>
            {results.map((result, index) => (
              <li key={index} className={styles.listItem}>
                Position: [{result.x}, {result.y}], Orientation:{" "}
                {result.orientation}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Home;
