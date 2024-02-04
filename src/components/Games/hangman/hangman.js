import { generate } from "random-words";

class HangmanGame {
  constructor() {
    this.numIncorrectGuesses = 0;
    this.isGameOver = false;
    this.hangmanWord = this.generateWord();
    this.guessedWord = "_".repeat(this.hangmanWord.length);
    this.remainingLetters = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
  }
  // Function to generate a random word
  generateWord() {
    return generate({ minLength: 4, maxLength: 7 });
  }
  getIncorrectGuesses() {
    return this.numIncorrectGuesses;
  }
  getRemainingLetters() {
    return this.remainingLetters;
  }
  setNumRemainingLetters(char) {
    this.remainingLetters = this.remainingLetters.filter(
      (letter) => letter !== char
    );
  }
  // Function to check if the guessed letter is in the word
  guessLetter(char) {
    this.setNumRemainingLetters(char);
    const indices = [];
    for (let i = 0; i < this.hangmanWord.length; i++) {
      if (this.hangmanWord[i] === char.toLowerCase()) {
        indices.push(i);
      }
    }
    if (indices.length > 0) {
      indices.forEach((index) => {
        this.guessedWord =
          this.guessedWord.substr(0, index) +
          char.toLowerCase() +
          this.guessedWord.substr(index + 1);
      });
      this.checkGameOver();
      return { found: true };
    } else {
      this.numIncorrectGuesses += 1;
      return { found: false };
    }
  }

  // Function to check if the game is over
  checkGameOver() {
    if (!this.guessedWord.includes("_")) {
      this.isGameOver = true;
      return true;
    }
    return false;
  }

  // Function to get the current status of the game
  getStatus() {
    return {
      isGameOver: this.isGameOver,
      hangmanWord: this.hangmanWord,
      guessedWord: this.guessedWord,
    };
  }

  // Function to reset the game
  resetGame() {
    this.isGameOver = false;
    this.hangmanWord = this.generateWord();
    this.guessedWord = "_".repeat(this.hangmanWord.length);
  }
}

export default HangmanGame;
