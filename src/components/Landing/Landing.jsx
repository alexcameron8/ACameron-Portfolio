import { ChatBox } from "../ChatBox/ChatBox";
import { Header } from "../Header/Header";
import "./landing.css";

export function Landing() {
  return (
    <div id="home" className="landing-container">
      <Header />
      <ChatBox />
    </div>
  );
}
