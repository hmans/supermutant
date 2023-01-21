import { mutate, supermutant, useMutant } from "supermutant-react";

const gameState = {
  count: 0,
};

supermutant(gameState);

export function App() {
  const count = useMutant(gameState, (s) => s.count);

  return (
    <div>
      <button onClick={() => mutate(gameState, (s) => s.count++)}>
        Count: {count}
      </button>
    </div>
  );
}
