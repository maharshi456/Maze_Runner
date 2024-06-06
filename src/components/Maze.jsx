import React, { useEffect, useState } from "react";
import "./Maze.css";

const Maze = ({ maze, setMaze, blocks }) => {
  const [runnerPos, setRunnerPos] = useState([0, 0]);

  const moveRunner = () => {
    setMaze((prevMaze) => {
      const newMaze = prevMaze.map((row) => row.slice()); // Deep copy
      const [runnerX, runnerY] = runnerPos;
      let moved = false;
      let direction = "";

      if (runnerY == blocks - 1) {
        alert("won");
      } else if (
        runnerX + 1 < blocks &&
        newMaze[runnerY][runnerX + 1] === 0 &&
        direction != "left"
      ) {
        newMaze[runnerY][runnerX + 1] = 2; // Move right
        setRunnerPos([runnerX + 1, runnerY]);
        direction = "right";
        moved = true;
      } else if (
        newMaze[runnerY + 1][runnerX] === 0 &&
        direction != "up" &&
        runnerY < blocks - 1
      ) {
        newMaze[runnerY + 1][runnerX] = 2; // Move down
        setRunnerPos([runnerX, runnerY + 1]);
        direction = "down";
        moved = true;
      } else if (
        runnerX - 1 < blocks &&
        newMaze[runnerY][runnerX - 1] === 0 &&
        direction != "right"
      ) {
        newMaze[runnerY][runnerX - 1] = 2; // Move left
        setRunnerPos([runnerX - 1, runnerY]);
        direction = "left";
        moved = true;
      } else if (
        runnerY - 1 < blocks &&
        newMaze[runnerY - 1][runnerX] === 0 &&
        direction != "down"
      ) {
        newMaze[runnerY - 1][runnerX] = 2; // Move up
        setRunnerPos([runnerX, runnerY - 1]);
        direction = "up";
        moved = true;
      }

      return newMaze;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(moveRunner, 100); // Move runner every second
    return () => clearInterval(intervalId);
  }, [runnerPos]);

  return (
    <div className="maze">
      <button onClick={moveRunner}>Move Runner</button>
      {maze.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${
                cell === 2 ? "runner" : cell === 0 ? "path" : "wall"
              }`}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Maze;
