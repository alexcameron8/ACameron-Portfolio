import { Navbar } from "./components/Navbar/Navbar";
import { Landing } from "./components/Landing/Landing";
import { Projects } from "./components/Projects/Projects";
import { Footer } from "./components/Footer/Footer";
import { About } from "./components/About/About";
/* eslint-disable react/prop-types */

function App() {
  return (
    <div className="app">
      <Navbar />
      <Landing />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}

export default App;
