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
  { name: "Javascript", color: "yellow", logo: <SiJavascript /> },
  { name: "Python", color: "blue", logo: <SiPython /> },
  { name: "React.js", color: "cyan", logo: <SiReact /> },
  { name: "React Native", color: "cyan", logo: <SiReact /> },
  { name: "HTML", color: "orange", logo: <SiHtml5 /> },
  { name: "CSS", color: "pink", logo: <SiCss3 /> },
  { name: "Flutter", color: "teal", logo: <SiFlutter /> },
  { name: "Dart", color: "deepskyblue", logo: <SiDart /> },
  { name: "Appwrite", color: "purple", logo: <SiAppwrite /> },
  { name: "Java", color: "red", logo: <FaJava /> },
  { name: "Spring", color: "lightgreen", logo: <BiLogoSpringBoot /> },
  { name: "RESTful API", color: "indigo", logo: <TbApi /> },
  { name: "Maven", color: "darkorange", logo: <SiApachemaven /> },
  { name: "Typescript", color: "steelblue", logo: <SiTypescript /> },
  { name: "C", color: "darkcyan", logo: "" },
];

export function Skill({ skill }) {
  let loaded = false;
  const skill_data = skills_list
    .slice()
    .filter((curSkill) => curSkill.name == skill);
  console.log(skill_data);
  if (skill_data.length !== 0) {
    loaded = true;
  }
  //   console.log(skill_data[0].logo);
  return (
    <>
      {loaded && (
        <div
          className="skill-item"
          style={{ border: `1px solid ${skill_data[0].color}` }}
        >
          {skill_data[0].logo} {skill}
        </div>
      )}
    </>
  );
}
