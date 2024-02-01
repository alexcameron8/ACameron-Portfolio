import { useState, useEffect } from "react";
import { Answer } from "./Answer";
import { Message } from "./Message";
import { AvatarProfile } from "./AvatarProfile";
import { GrPowerReset } from "react-icons/gr";

const conversations_data = [
  {
    message: "Tell me about yourself.👨",
    answer:
      "My name is Alex. I am a graduate from Carleton University with a Bachelors degree in Software Engineering.",
  },

  {
    message: "What are your hobbies? 🏸",
    answer:
      "I love spending time being active, whether it's lifting weights at the gym or playing sports such as Ultimate frisbee!",
  },
  {
    message: "What programming languages do you know? 👨‍💻",
    answer:
      "Java, Python, Javascript, HTML, CSS, but check out my projects section to see all the different kinds of technologies I've used!",
  },

  {
    message: "Let's play a game. ⚠",
    answer: "To-Do: Game?",
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

  // Effect to set isTyping based on messages
  useEffect(() => {
    setIsMessagesComplete(messages.some((message) => !message.isComplete));
  }, [messages]);

  useEffect(() => {
    if (resetFlag) {
      //reset all data to default
      setMessages(default_message);
      setConversations(conversations_data);
      setResetFlag(false);
      setIsInitialized(false);
      setLastCompleteIndex(-1);
      setResetCounter((prevCounter) => prevCounter + 1); // Increment the reset counter
    }
  }, [resetFlag]);

  function handleResponse(message) {
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
      setMessages((prevMessages) => [...prevMessages.slice(-2), askedMessage]);
      // setMessages((prevMessages) => [...prevMessages, askedMessage]);
    } else {
      setMessages((prevMessages) => [...prevMessages, askedMessage]);
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

  function resetMessages() {
    setResetFlag(true); // Set the resetFlag to trigger message reset
    handleToggleShrink(false);
  }

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
