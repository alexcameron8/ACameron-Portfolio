/* eslint-disable react/prop-types */
export function Answer({ message, handleClick }) {
  return (
    <button className="btn-answer" onClick={() => handleClick(message)}>
      {message.message}
    </button>
  );
}
