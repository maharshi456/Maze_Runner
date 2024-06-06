import { useEffect, useState } from "react";
import "./App.css";
import Maze from "./components/Maze";
import MazeGenerator from "./components/MazeGenerator";

function App() {
  const [maze, setMaze] = useState([]);
  const blocks = 20;

  useEffect(() => {
    const newMaze = MazeGenerator(blocks, blocks);
    setMaze(newMaze);
  }, []);

  return (
    <div className="App">
      <h1>Maze Generator</h1>
      <Maze maze={maze} setMaze={setMaze} blocks={blocks} />
    </div>
  );
}

export default App;
