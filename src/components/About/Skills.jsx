/* eslint-disable react/prop-types */
import "./skills.css";
const skills = [
  {
    name: "C",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
  },
  {
    name: "CSS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Flutter",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "HTML",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "Java",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  },
  {
    name: "Javascript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
];

export function Skills() {
  return (
    <div className="toolkit-container">
      <h3>My Toolkit 💻</h3>
      <ul className="toolkit-list">
        {skills.map((skill, index) => (
          <Skill key={index} skill={skill} />
        ))}
      </ul>
    </div>
  );
}

export function Skill({ skill, index }) {
  return (
    <li className="toolkit-item" key={index}>
      <img className="toolkit-img" src={skill.src} alt={skill.name} />
      <p>{skill.name}</p>
    </li>
  );
}
