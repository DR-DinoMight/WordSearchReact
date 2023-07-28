import React, { useEffect, useState } from "react";
import { initializeGrid, containsAllLetters } from "../utils";

const WordSearchGrid = ({ x, y, words }) => {
  const [grid, setGrid] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [debugStatus, setDebugStatus] = useState(false);

  useEffect(() => {
    setGrid(initializeGrid(x, y, words));
  }, [x, y, words]);

  // Function to handle the user's input when clicking on cells
  const handleCellClick = (cell) => {
    if (cell.positionInWord !== -1) {
      setUserInput((prevInput) => prevInput + cell.letter);
      setSelectedCells((prevCells) => [...prevCells, cell]);
    } else {
      setUserInput("");
      setSelectedCells([]);
    }
  };

  // Function to check if the user's input forms a valid word
  useEffect(() => {
    const foundWord = words.find((word) =>
      containsAllLetters(word.toUpperCase(), userInput.toUpperCase())
    );
    if (foundWord) {
      setUserInput(""); // Clear the user's input once a word is found
      setSelectedCells([]);
      setFoundWords((prevFoundWords) => [...prevFoundWords, foundWord]);
    }
  }, [userInput, words]);

  return (
    <div>
      <div>
        <p>
          Words to find :{" "}
          {words.flatMap(
            (e) => `${e} ${foundWords.find((e2) => e2 === e) ? "✅" : ""}, `
          )}
        </p>
      </div>
      <div>
        <p>Found Words: {foundWords.flatMap((e) => `${e}, `)}</p>
      </div>
      <div>
        {/* Optionally display the user's current input */}
        <p>User Input: {userInput}</p>
        <button onClick={() => setDebugStatus(!debugStatus)}>
          Debug {debugStatus ? "on" : "off"}
        </button>
        <button onClick={() => setUserInput("")}>Reset</button>
      </div>
      <div className="word-search-grid" style={{ "--x": x, "--y": y }}>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell${
                  foundWords.includes(cell.partOfWord) ? " found" : ""
                }${
                  selectedCells.find((e) => e === cell) &&
                  row.positionInWord !== -1
                    ? " selected"
                    : ""
                } ${cell.partOfWord && debugStatus ? "debug" : ""}`}
                onClick={() => handleCellClick(cell)}
              >
                {cell.letter}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordSearchGrid;
