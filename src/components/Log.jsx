export default function Log({ userTurn }) {
  return (
    <ol id="log">
      {userTurn.map((turn) => (
        <li key={`${turn.square.row} ${turn.square.col}`}>
          {turn.player} selected {turn.square.row} , {turn.square.col}
        </li>
      ))}
    </ol>
  );
}
