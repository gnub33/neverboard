interface ResultsProps {
  onStart: () => void;
}

export default function Results({ onStart }: ResultsProps) {
  return (
    <div>
      <h1>Your Recommendations</h1>

      <button onClick={onStart}>
        Start Over
      </button>
    </div>
  );
}