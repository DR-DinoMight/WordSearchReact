import WordSearchGrid from "./components/WordSearch";
import "./styles.css";

export default function App() {
  const words = ["REACT", "BOUNCE", "BREAK", "SEARCH", "WORD", "FREINDLY"];

  return (
    <div className="App">
      <h1>HMA CodeSandbox</h1>
      <WordSearchGrid x={9} y={9} words={words} />
    </div>
  );
}
