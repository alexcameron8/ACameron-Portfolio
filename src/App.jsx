import { Navbar } from "./components/Navbar/Navbar";
import { Landing } from "./components/Landing/Landing";
import { Projects } from "./components/Projects/Projects";
import { Footer } from "./components/Footer/Footer";
import { About } from "./components/About/About";
import { useState } from "react";
/* eslint-disable react/prop-types */

function App() {
  const [isLight, setIsLight] = useState(false);
  function handleToggleLightDarkMode() {
    setIsLight(!isLight);
  }
  return (
    <div className="app">
      <Navbar
        isLight={isLight}
        handleToggleLightDarkMode={handleToggleLightDarkMode}
      />
      <Landing />
      <Projects />
      <About isLight={isLight} />
      <Footer />
    </div>
  );
}

export default App;
