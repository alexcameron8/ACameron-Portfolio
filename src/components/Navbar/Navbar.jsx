import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./navbar.css";

export function Navbar() {
  const [isLight, setIsLight] = useState(false);

  // Note: Not best practice to directly manipulate DOM in react. Logic rework required.
  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.style.setProperty("--text-color", "rgba(0, 0, 0, 0.87)");
      root.style.setProperty("--bg-color", "rgb(255, 255, 255)");
    } else {
      root.style.setProperty("--bg-color", "rgb(17, 17, 17)");
      root.style.setProperty("--text-color", "rgb(255, 255, 255)");
    }
  }, [isLight]);

  function handleToggleLightDarkMode() {
    setIsLight(!isLight);
  }
  return (
    <div className="navbar-container">
      <div className="navbar">Navbar Placeholder</div>
      <button className="btn-light-dark" onClick={handleToggleLightDarkMode}>
        {isLight ? <FiSun /> : <FiMoon color="white" />}
      </button>
    </div>
  );
}
