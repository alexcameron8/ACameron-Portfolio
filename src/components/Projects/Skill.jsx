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
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { BiLogoSpringBoot } from "react-icons/bi";
import { TbApi } from "react-icons/tb";

// List of skills to lookup for each project. Will modify as needed
const skills_list = [
  {
    name: "Javascript",
    color: "rgba(255, 255, 0, 0.4)",
    logo: <SiJavascript />,
  },
  { name: "Python", color: "rgba(0, 0, 255, 0.4)", logo: <SiPython /> },
  { name: "React.js", color: "rgba(0, 255, 255, 0.4)", logo: <SiReact /> },
  { name: "React Native", color: "rgba(0, 255, 255, 0.4)", logo: <SiReact /> },
  { name: "HTML", color: "rgba(255, 165, 0, 0.4)", logo: <SiHtml5 /> },
  { name: "CSS", color: "rgba(255, 192, 203, 0.4)", logo: <SiCss3 /> },
  { name: "Flutter", color: "rgba(0, 128, 128, 0.4)", logo: <SiFlutter /> },
  { name: "Dart", color: "rgba(0, 191, 255, 0.4)", logo: <SiDart /> },
  { name: "Appwrite", color: "rgba(128, 0, 128, 0.4)", logo: <SiAppwrite /> },
  { name: "Java", color: "rgba(255, 0, 0, 0.4)", logo: <FaJava /> },
  {
    name: "Spring",
    color: "rgba(144, 238, 144, 0.4)",
    logo: <BiLogoSpringBoot />,
  },
  { name: "RESTful API", color: "rgba(75, 0, 130, 0.4)", logo: <TbApi /> },
  { name: "Maven", color: "rgba(255, 140, 0, 0.4)", logo: <SiApachemaven /> },
  {
    name: "Typescript",
    color: "rgba(70, 130, 180, 0.6)",
    logo: <SiTypescript />,
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
        <div
          className="skill-item"
          //   style={{ border: `0.5px solid ${skill_data[0].color}` }}
          style={{ backgroundColor: `${skill_data[0].color}` }}
        >
          {skill_data[0].logo} &nbsp;{skill}
        </div>
      )}
    </>
  );
}
