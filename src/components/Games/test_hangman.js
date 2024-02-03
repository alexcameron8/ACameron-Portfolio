import HangmanGame from "./hangman.js";

// Create a new instance of HangmanGame
const hangmanGame = new HangmanGame();

// Function to handle user input (in your actual UI, this might come from an input field or button click event)
function handleUserInput(guess) {
  // Check if the game is over
  if (hangmanGame.isGameOver) {
    console.log("Game over. Please reset the game to play again.");
    return;
  }

  // Guess the letter
  const result = hangmanGame.guessLetter(guess);

  if (result.found) {
    console.log(`Correct! The letter "${guess}" is in the word.`);
  } else {
    console.log(`Incorrect! The letter "${guess}" is not in the word.`);
  }

  // Check if the game is over after each guess
  if (hangmanGame.checkGameOver()) {
    console.log(
      "Congratulations! You guessed the word: " + hangmanGame.hangmanWord
    );
  }

  // Log current status of the game
  console.log("Current status:", hangmanGame.getStatus());
}

// Example usage: Call handleUserInput function with a guessed letter
handleUserInput("a");
handleUserInput("e");
handleUserInput("i");
handleUserInput("o");
handleUserInput("u");
handleUserInput("r");
handleUserInput("t");
handleUserInput("s");
handleUserInput("n");
