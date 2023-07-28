// utils.js

/// Helper function to get a random boolean value (true or false)
const getRandomBoolean = () => Math.random() < 0.5;

// Function to generate a random letter
const generateRandomLetter = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

// Function to fill the grid with random letters and words
export const initializeGrid = (x, y, words) => {
  let newGrid = [];
  for (let i = 0; i < x; i++) {
    let row = [];
    for (let j = 0; j < y; j++) {
      row.push({
        letter: generateRandomLetter(),
        partOfWord: null,
        positionInWord: -1
      });
    }
    newGrid.push(row);
  }

  // Try placing each word in the grid
  words.forEach((word) => {
    let placed = false;
    let maxTries = 100; // Maximum number of attempts to place the word
    while (!placed && maxTries > 0) {
      const directionHorizontal = getRandomBoolean();
      const directionReversed = getRandomBoolean();
      const startRow = Math.floor(Math.random() * x);
      const startCol = Math.floor(Math.random() * y);

      placed = tryPlacingWord(
        newGrid,
        directionHorizontal,
        directionReversed,
        startRow,
        startCol,
        word
      );

      maxTries--;
    }
  });

  return newGrid;
};

// Function to try placing the word in the grid starting from a given position
const tryPlacingWord = (
  grid,
  directionHorizontal,
  directionReversed,
  startRow,
  startCol,
  word
) => {
  const wordLength = word.length;
  const x = grid.length;
  const y = grid[0].length;

  let rowChange = 0;
  let colChange = 0;
  if (directionHorizontal) {
    rowChange = 0;
    colChange = directionReversed ? -1 : 1;
  } else {
    rowChange = directionReversed ? -1 : 1;
    colChange = 0;
  }

  // Check if the word can be placed at the given position
  let currentRow = startRow;
  let currentCol = startCol;
  for (let i = 0; i < wordLength; i++) {
    if (
      currentRow < 0 ||
      currentRow >= x ||
      currentCol < 0 ||
      currentCol >= y ||
      (grid[currentRow][currentCol].partOfWord &&
        grid[currentRow][currentCol].partOfWord !== word[i])
    ) {
      return false; // Word cannot be placed here
    }

    currentRow += rowChange;
    currentCol += colChange;
  }

  // Place the word in the grid
  currentRow = startRow;
  currentCol = startCol;
  for (let i = 0; i < wordLength; i++) {
    grid[currentRow][currentCol].letter = word[i];
    grid[currentRow][currentCol].partOfWord = word;
    grid[currentRow][currentCol].positionInWord = i;
    currentRow += rowChange;
    currentCol += colChange;
  }

  return true;
};

export const containsAllLetters = (word, userInput) => {
  const wordLetters = word.split("").sort().join("");
  const userInputLetters = userInput.split("").sort().join("");
  return userInputLetters.includes(wordLetters);
};
