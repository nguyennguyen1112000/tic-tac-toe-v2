export default function calculateWinner(squares) {
  const size = squares.length;
  for (let i = 0; i < size; i++) {
    const maxRowLen = Math.sqrt(squares.length);
    const lines = [
      [i, i + 1, i + 2, i + 3, i + 4],
      [
        i,
        i + maxRowLen,
        i + 2 * maxRowLen,
        i + 3 * maxRowLen,
        i + 4 * maxRowLen,
      ],
      [
        i,
        i + maxRowLen + 1,
        i + 2 * maxRowLen + 2,
        i + 3 * maxRowLen + 3,
        i + 4 * maxRowLen + 4,
      ],
      [
        i,
        i - maxRowLen + 1,
        i - 2 * maxRowLen + 2,
        i - 3 * maxRowLen + 3,
        i - 4 * maxRowLen + 4,
      ],
    ];
    for (let j = 0; j < lines.length; j++) {
      const [a, b, c, d, e] = lines[j];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c] &&
        squares[a] === squares[d] &&
        squares[a] === squares[e]
      ) {
        const set = [
          ...new Set(lines[j].map((x) => Math.floor(x / maxRowLen))),
        ];
        if (set.length === 5 || set.length === 1)
          return { square: squares[a], line: lines[j] };
      }
    }
  }
  return null;
}
