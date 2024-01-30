import { useState, useEffect } from "react";
import { Answer } from "./Answer";
import { Message } from "./Message";

export const conversations_data = [
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

export function ChatBox() {
  const default_message = [{ id: 1, type: "system", text: "Hi there!" }];
  const [messages, setMessages] = useState(default_message);
  const [conversations, setConversations] = useState(conversations_data);
  const [resetFlag, setResetFlag] = useState(false);

  useEffect(() => {
    if (resetFlag) {
      setMessages(default_message);
      setResetFlag(false); // Reset the flag after resetting messages
    } else {
      const timer = setTimeout(() => {
        const newMessage = {
          id: messages.length + 1,
          type: "system",
          text: "What would you like to do?",
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }, 650); // Adjust the delay

      return () => clearTimeout(timer); // Clear the timer on component unmount
    }
  }, [resetFlag]); // Empty dependency array means it runs only once on mount

  function handleResponse(message) {
    setConversations((conv) =>
      conv.filter((convItem) => convItem.message !== message.message)
    );
    // console.log(conversations[0]["message"]);
    // console.log(conversations[0]["message"]);
    // console.log(message.message);
    // console.log(conversations[0]["message"] !== message.message);
    // console.log(
    //   conversations.filter(conversations["message"] !== message.message)
    // );
    const askedMessage = {
      id: messages.length + 1,
      type: "user",
      text: message.message,
    };
    setMessages((prevMessages) => [...prevMessages, askedMessage]);

    // Delay the addition of the new message
    setTimeout(() => {
      const newMessage = {
        id: messages.length + 2,
        type: "system",
        text: message.answer,
      };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }, 1000); // Adjust the delay time as needed (in milliseconds)
  }

  function resetMessages() {
    setResetFlag(true); // Set the resetFlag to trigger message reset
  }

  return (
    <div className="chat-container">
      <div className="message-container">
        {messages.map((message) => (
          <Message key={message.id} type={message.type}>
            {message.text}
          </Message>
        ))}
      </div>
      <div className="answers-container">
        {conversations?.map((m, i) => (
          <Answer key={i} message={m} handleClick={handleResponse}></Answer>
        ))}
        <button className="btn-reset" onClick={resetMessages}>
          Reset Chat
        </button>
      </div>
    </div>
  );
}
