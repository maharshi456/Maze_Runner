const MazeGenerator = (rows, cols) => {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  const carvePassagesFrom = (cx, cy) => {
    const directions = [
      [0, -1], // up
      [1, 0], // right
      [0, 1], // down
      [-1, 0], // left
    ];
    directions.sort(() => Math.random() - 0.5);

    for (const [dx, dy] of directions) {
      const nx = cx + dx * 2;
      const ny = cy + dy * 2;

      if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && maze[ny][nx] === 1) {
        maze[cy + dy][cx + dx] = 0;
        maze[ny][nx] = 0;
        carvePassagesFrom(nx, ny);
      }
    }
  };

  maze[0][0] = 0;
  carvePassagesFrom(0, 0);
  maze[0][1] = 0; // Entry point
  maze[cols - 1][rows - 2] = 0; // Exit point
  maze[0][0] = 2; // Starting point

  return maze;
};

export default MazeGenerator;
