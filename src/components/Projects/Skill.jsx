/* eslint-disable react/prop-types */
import {
  SiApachemaven,
  SiJavascript,
  SiPython,
  SiReact,
  SiHtml5,
  SiCss3,
  SiFlutter,
  SiDart,
  SiAppwrite,
  SiTypescript,
  SiMongodb,
  SiNextui,
  SiExpress,
  SiTailwindcss,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { TbApi } from "react-icons/tb";

// List of skills to lookup for each project. Will modify as needed
const skills_list = [
  {
    name: "Javascript",
    color: "rgba(255, 255, 0, 0.3)",
    logo: <SiJavascript />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  },
  {
    name: "Python",
    color: "rgba(0, 0, 255, 0.3)",
    logo: <SiPython />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "React.js",
    color: "rgba(0, 255, 255, 0.3)",
    logo: <SiReact />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "React Native",
    color: "rgba(0, 255, 255, 0.3)",
    logo: <SiReact />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "HTML",
    color: "rgba(255, 165, 0, 0.3)",
    logo: <SiHtml5 />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
  },
  {
    name: "CSS",
    color: "rgba(255, 192, 203, 0.3)",
    logo: <SiCss3 />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
  },
  {
    name: "Flutter",
    color: "rgba(0, 128, 128, 0.3)",
    logo: <SiFlutter />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  },
  {
    name: "Dart",
    color: "rgba(0, 191, 255, 0.3)",
    logo: <SiDart />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg",
  },
  {
    name: "Appwrite",
    color: "rgba(128, 0, 128, 0.3)",
    logo: <SiAppwrite />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/appwrite/appwrite-original.svg",
  },
  {
    name: "Java",
    color: "rgba(255, 0, 0, 0.3)",
    logo: <FaJava />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  },
  {
    name: "Spring",
    color: "rgba(144, 238, 144, 0.3)",
    logo: <BiLogoSpringBoot />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  },
  {
    name: "RESTful API",
    color: "rgba(75, 0, 130, 0.3)",
    logo: <TbApi />,
    src: "./assets/rest-api-icon.png",
  },
  {
    name: "Maven",
    color: "rgba(255, 140, 0, 0.4)",
    logo: <SiApachemaven />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "Typescript",
    color: "rgba(70, 130, 180, 0.3)",
    logo: <SiTypescript />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "MongoDB",
    color: "rgba(144, 238, 144, 0.3)",
    logo: <SiMongodb />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "Express.js",
    color: "rgba(70, 130, 180, 0.3)",
    logo: <SiExpress />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    name: "TailwindCSS",
    color: "rgba(70, 130, 180, 0.3)",
    logo: <SiTailwindcss />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "NextUI",
    color: "rgba(0, 128, 128, 0.3)",
    logo: <SiNextui />,
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-plain.svg",
  },
  { name: "C", color: "rgba(0, 139, 139, 0.4)", logo: "" },
];

export function Skill({ skill }) {
  let loaded = false;
  const skill_data = skills_list
    .slice()
    .filter((curSkill) => curSkill.name == skill);
  if (skill_data.length !== 0) {
    loaded = true;
  }
  return (
    <>
      {loaded && (
        <>
          {/* <div
            className="skill-item"
            style={{ border: `1px solid ${skill_data[0].color}` }}
            // style={{ backgroundColor: `${skill_data[0].color}` }}
          >
            {skill_data[0].logo} &nbsp;{skill}
          </div> */}
          <div
            className="skill-item"
            style={{ border: `2px solid ${skill_data[0].color}` }}
            // style={{ border: `0.5px solid white` }}
            // style={{ backgroundColor: `${skill_data[0].color}` }}
          >
            <img className="skill-icon" src={skill_data[0].src} alt={skill} />{" "}
            &nbsp;{skill}
          </div>
        </>
      )}
    </>
  );
}
