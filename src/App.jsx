import { ChatBox } from "./components/ChatBox/ChatBox";
import { Navbar } from "./components/Navbar/Navbar";
import { Landing } from "./components/Landing/Landing";
import { Projects } from "./components/Projects/Projects";
/* eslint-disable react/prop-types */

function App() {
  return (
    <div className="app">
      <Navbar />
      <Landing />
      <Projects />
    </div>
  );
}

export default App;
