import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export function Message({ id, type, children, setIsComplete, reset }) {
  const charInterval = 40;
  const [isTyping, setIsTyping] = useState(true);
  const [textToShow, setTextToShow] = useState("");

  useEffect(() => {
    if (isTyping === false) {
      let currentIndex = 0;
      const text = children;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setTextToShow(text.substring(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(id, true);
          clearInterval(interval);
        }
      }, charInterval); // Adjust the interval for the typing speed
    }
    const timer = setTimeout(
      () => {
        setIsTyping(false); // Set isTyping to false after 1 second
      },
      type === "system" ? 1500 : 0
    );

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, [isTyping, setIsTyping, type, children, reset]);

  const Typing = ({ type }) => (
    <div className={`typing ${type}`}>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
      <div className="typing__dot"></div>
    </div>
  );

  return (
    <div className={`message ${type}`}>
      {isTyping && type === "system" ? (
        <Typing type={type} />
      ) : (
        <p className="text-message">
          {type === "system" ? textToShow : children}
        </p>
      )}
    </div>
  );
}
