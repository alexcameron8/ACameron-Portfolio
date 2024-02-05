import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoDocumentAttachSharp } from "react-icons/io5";

import "./header.css";

export function Header() {
  return (
    <div className="header-container">
      <h2>
        Greetings!<span className="wave">👋🏻</span>
      </h2>
      <h1>Alex Cameron</h1>
      <h3>Software Developer</h3>
      <p>
        Welcome to my portfolio! I am a software engineering recent graduate
        fascinated by technology and ready to create impactful software.
      </p>
      <div className="socials-container">
        <button className="btn-social">
          <a
            className="a-social"
            href="https://www.linkedin.com/in/alexcameron8"
          >
            <FaLinkedin />
            &nbsp;LinkedIn
          </a>
        </button>
        <button className="btn-social">
          <a className="a-social" href="https://github.com/alexcameron8">
            <FaGithub />
            &nbsp;GitHub
          </a>
        </button>
        <button className="btn-social">
          <a
            className="a-social"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=alex8cameron@gmail.com"
          >
            <MdEmail />
            &nbsp;Email
          </a>
        </button>
        <button className="btn-social">
          <a className="a-social" href="/documents/Alex_Cameron_Resume.pdf">
            <IoDocumentAttachSharp />
            &nbsp;Resume
          </a>
        </button>
      </div>
    </div>
  );
}
