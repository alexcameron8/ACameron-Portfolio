import { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link, Events, scroller } from "react-scroll";
import "./navbar.css";

export function Navbar() {
  const [isLight, setIsLight] = useState(false);

  // Note: Not best practice to directly manipulate DOM in react. Logic rework required.
  useEffect(() => {
    const root = document.documentElement;
    if (isLight) {
      root.style.setProperty("--text-color", "rgba(0, 0, 0, 0.87)");
      root.style.setProperty("--bg-color", "rgb(255, 255, 255)");
      root.style.setProperty("--text-med-color", "rgba(0, 0, 0, 0.5)");
      root.style.setProperty("--text-low-color", "rgba(0, 0, 0, 0.38)");
      root.style.setProperty("--bg-med-color", "rgb(255, 255, 255,0.8)");
      root.style.setProperty("--bg-tag-color", "rgba(0, 0, 0, 0.2)");
      root.style.setProperty("--bg-disabled-color", "rgba(0, 0, 0, 0.1)");
      
    } else {
      root.style.setProperty("--bg-color", "rgb(17, 17, 17)");
      root.style.setProperty("--text-color", "rgb(255, 255, 255)");
      root.style.setProperty("--text-med-color", "rgb(255, 255, 255,0.7)");
      root.style.setProperty("--text-low-color", "rgb(255, 255, 255,0.38)");
      root.style.setProperty("--bg-med-color", "rgb(17, 17, 17,0.6)");
      root.style.setProperty("--bg-tag-color", "rgba(255, 255, 255, 0.2)");
      root.style.setProperty("--bg-disabled-color", "rgba(255, 255, 255, 0.3);");
      
    }
  }, [isLight]);

  useEffect(() => {
    // Initialize scrollspy logic
    Events.scrollEvent.register("scroll", "active", function (to) {
      const activeTab = document.querySelector(".navbar .tab.active");
      if (activeTab) {
        activeTab.classList.remove("active");
      }
      const newActiveTab = document.getElementById(to);
      if (newActiveTab) {
        newActiveTab.classList.add("active");
      }
    });

    return () => {
      Events.scrollEvent.remove("scroll", "active");
    };
  }, []);

  function handleToggleLightDarkMode() {
    setIsLight(!isLight);
  }
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <a className="tab" href="home">
          <img className="nav-img" src="./assets/AC_Logo-red-rm-bg.png" alt="nav-ac-logo"/>
        </a>

        <Link
          className="tab"
          activeClass="active"
          to="home"
          spy={true}
          smooth={true}
          duration={500}
        >
          Home
        </Link>
        <Link
          className="tab"
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          duration={500}
        >
          About
        </Link>
        <Link
          className="tab"
          activeClass="active"
          to="projects"
          spy={true}
          smooth={true}
          duration={500}
        >
          Projects
        </Link>
        <a className="tab" href="documents/Alex_Cameron_Resume.pdf">
          Resume
        </a>
      </nav>
      <button className="btn-light-dark" onClick={handleToggleLightDarkMode}>
        {isLight ? <FiSun /> : <FiMoon color="white" />}
      </button>
    </div>
  );
}
