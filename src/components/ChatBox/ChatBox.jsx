import { useState, useEffect } from "react";
import { Answer } from "./Answer";
import { Message } from "./Message";
import { AvatarProfile } from "./AvatarProfile";
import { GrPowerReset } from "react-icons/gr";
import HangmanGame from "../Games/hangman/hangman";

const conversations_data = [
  {
    message: "Tell me about yourself.💬",
    answer:
      "My name is Alex. I am a graduate from Carleton University with a Bachelors degree in Software Engineering.",
  },

  {
    message: "What are your hobbies? 🏸",
    answer:
      "I love spending time being active, whether it's working out at the gym or playing sports such as Ultimate frisbee!",
  },
  {
    message: "Know any programming languages? 👨‍💻",
    answer:
      "Java, Python & Javascript to name a few, but check out my projects below to see all the different kinds of technologies I've used!",
  },
  {
    message: "Let's play a game. 🎮",
    answer: "What game would you like to play?",
    games: [
      { name: "Hangman", enabled: true },
      { name: "Trivia", enabled: false },
    ],
  },
];
const default_message = [
  {
    id: "id" + Math.random().toString(16).slice(2),
    type: "system",
    text: "Hi there!",
    isComplete: false,
  },
  {
    id: "id" + Math.random().toString(16).slice(2),
    type: "system",
    text: "What would you like me to do?",
    isComplete: false,
  },
];

export function ChatBox() {
  const [messages, setMessages] = useState(default_message);
  const [conversations, setConversations] = useState(conversations_data);
  const [resetFlag, setResetFlag] = useState(false);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [resetCounter, setResetCounter] = useState(0); // Increment this counter to trigger Message reset
  const [lastCompleteIndex, setLastCompleteIndex] = useState(-1); // Track the index of the last completed message
  const [isMessagesComplete, setIsMessagesComplete] = useState(false); // State to track if any message is typing
  //Game Features
  const [isGameMode, setIsGameMode] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [hangmanGame, setHangmanGame] = useState(null);
  // Effect to set isTyping based on messages
  useEffect(() => {
    setIsMessagesComplete(messages.some((message) => !message.isComplete));
  }, [messages]);

  useEffect(() => {
    if (resetFlag) {
      //reset all data to default
      setIsGameMode(false);
      setHangmanGame(null);
      setActiveGame(null);
      setMessages(default_message);
      setConversations(conversations_data);
      setResetFlag(false);
      setIsInitialized(false);
      setLastCompleteIndex(-1);
      setResetCounter((prevCounter) => prevCounter + 1); // Increment the reset counter
    }
  }, [resetFlag]);

  function handleResponse(message) {
    if (isGameMode) {
      if (activeGame === null) {
        if (message.message === "Hangman") {
          setHangman();
        } else {
          setActiveGame("trivia");
        }
      } else if (activeGame === "Hangman") {
        if (hangmanGame.isGameOver) {
          if (message.answer == "Play Again") {
            setHangman();
            hangmanGame.isGameOver = false;
            return;
          }
        }
        // Letter is clicked
        const clicked_letter = message.message;

        const user_letter_guess = {
          id: "id" + Math.random().toString(16).slice(2),
          type: "user",
          text: clicked_letter,
          isComplete: false,
        };

        // The guess letter function is called
        const result = hangmanGame.guessLetter(clicked_letter);
        // The system replied with an update
        const system_guess_result = {
          id: "id" + Math.random().toString(16).slice(2),
          type: "system",
          text: `${hangmanGame.getIncorrectGuesses()}/11 ❌ Guesses  ${clicked_letter} was ${
            result.found ? "Found" : "Not Found"
          }: `,
          isComplete: false,
        };

        const system_hangman_update = {
          id: "id" + Math.random().toString(16).slice(2),
          type: "system",
          // text: ` ${hangmanGame.getStatus().guessedWord.split("").join(" ")} (${
          //   hangmanGame.getStatus().hangmanWord
          // })`,
          text: ` ${hangmanGame.getStatus().guessedWord.split("").join(" ")}`,
          isComplete: false,
        };

        setLastCompleteIndex((prev) => prev - 3);
        setMessages((prevMessages) => [
          ...prevMessages.slice(-2),
          user_letter_guess,
          system_guess_result,
          system_hangman_update,
        ]);

        const hangman_replies = hangmanGame
          .getRemainingLetters()
          .slice()
          .map((letter) => ({
            message: letter,
            answer: `guessLetter(${letter})`,
          }));
        setConversations(hangman_replies);
        if (hangmanGame.isGameOver) {
          if (message.answer == "Play Again") {
            setHangman();
          }
          if (message.answer == "Reset") {
            resetMessages();
          }
          let system_hangman_verdict;
          if (hangmanGame.getIncorrectGuesses == 11) {
            system_hangman_verdict = {
              id: "id" + Math.random().toString(16).slice(2),
              type: "system",
              text: ` You Lose!`,
              isComplete: false,
            };
          } else {
            system_hangman_verdict = {
              id: "id" + Math.random().toString(16).slice(2),
              type: "system",
              text: ` You Win!`,
              isComplete: false,
            };
          }
          const system_play_again = {
            id: "id" + Math.random().toString(16).slice(2),
            type: "system",
            text: `Would you like to play again?`,
            isComplete: false,
          };
          setLastCompleteIndex((prev) => prev - 2);
          setMessages((prevMessages) => [
            ...prevMessages.slice(-2),
            system_hangman_verdict,
            system_play_again,
          ]);
          const play_again = [
            { message: "Yes", answer: "Play Again" },
            { message: "No", answer: "Reset" },
          ];
          setConversations(play_again);
        }
      }
    } else {
      if (!isInitialized) setIsInitialized(true);
      handleToggleShrink(true);
      setConversations((conv) =>
        conv.filter((convItem) => convItem.message !== message.message)
      );
      const askedMessage = {
        id: "id" + Math.random().toString(16).slice(2),
        type: "user",
        text: message.message,
        isComplete: false,
      };
      if (messages?.length > 2) {
        setLastCompleteIndex((prev) => prev - 2);
        setMessages((prevMessages) => [
          ...prevMessages.slice(-2),
          askedMessage,
        ]);
        // setMessages((prevMessages) => [...prevMessages, askedMessage]);
      } else {
        setMessages((prevMessages) => [...prevMessages, askedMessage]);
      }

      if (message.games) {
        setIsGameMode(true);
        const game_messages = message.games
          .slice()
          .map((game) => ({ message: game.name, answer: "" }));

        setConversations(game_messages);
      }

      // Delay the addition of the new message
      setTimeout(() => {
        const newMessage = {
          id: "id" + Math.random().toString(16).slice(2),
          type: "system",
          text: message.answer,
          isComplete: false,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }, 10); // Adjust the delay time as needed (in milliseconds)
    }
  }

  function resetMessages() {
    setResetFlag(true); // Set the resetFlag to trigger message reset
    handleToggleShrink(false);
  }

  function setHangman() {
    setActiveGame("Hangman");
    const newHangmanGame = new HangmanGame();
    setHangmanGame(newHangmanGame);

    const user_hangman = {
      id: "id" + Math.random().toString(16).slice(2),
      type: "user",
      text: `Hangman`,
      isComplete: false,
    };

    const hangman_message = {
      id: "id" + Math.random().toString(16).slice(2),
      type: "system",
      isComplete: false,
      text: `You have up to 11 incorrect guesses! Word to guess:`,
    };
    const hangman_message_2 = {
      id: "id" + Math.random().toString(16).slice(2),
      type: "system",
      // text: ` ${newHangmanGame.getStatus().guessedWord.split("").join(" ")} (${
      //   newHangmanGame.getStatus().hangmanWord
      // })`, //development
      text: ` ${newHangmanGame.getStatus().guessedWord.split("").join(" ")}`,
      isComplete: false,
    };
    setLastCompleteIndex((prev) => prev - 2);
    setMessages((prevMessages) => [
      ...prevMessages.slice(-2),
      user_hangman,
      hangman_message,
      hangman_message_2,
    ]);

    const hangman_replies = newHangmanGame
      .getRemainingLetters()
      .slice()
      .map((letter) => ({
        message: letter,
        answer: `guessLetter(${letter})`,
      }));
    setConversations(hangman_replies);
  }

  // function resetHangman() {
  //   setActiveGame;
  // }

  function handleToggleShrink(isTiny) {
    setIsShrunk(isTiny);
  }

  // Update the isComplete state of a message by its ID
  function setIsComplete(id, isComplete) {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, isComplete } : message
      )
    );
    if (isComplete) {
      // Update the index of the last complete message
      setLastCompleteIndex((prevIndex) => {
        const currentIndex = messages.findIndex((message) => message.id === id);
        return currentIndex > prevIndex ? currentIndex : prevIndex;
      });
    }
  }

  return (
    <div className="profile-container">
      <AvatarProfile isShrunk={isShrunk} setIsShrunk={handleToggleShrink} />
      <div className="chat-container">
        <div className="message-container">
          {messages.map((message, index) => {
            // Render only if the message is complete or if it's the first message
            if (
              message.isComplete ||
              index === 0 ||
              index === lastCompleteIndex + 1
            ) {
              return (
                <Message
                  key={message.id}
                  id={message.id}
                  type={message.type}
                  setIsComplete={setIsComplete}
                  reset={resetCounter}
                >
                  {message.text}
                </Message>
              );
            } else {
              return null;
            }
          })}
        </div>
        {!isMessagesComplete && (
          <div className="answers-container">
            {conversations?.map((m, i) => (
              <Answer key={i} message={m} handleClick={handleResponse}></Answer>
            ))}
          </div>
        )}
        {!isMessagesComplete && isInitialized && (
          <div className="reset-container">
            <button className="btn-reset" onClick={resetMessages}>
              Reset Chat&nbsp;
              <div className="reset-icon">
                <GrPowerReset />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
