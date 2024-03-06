/* eslint-disable react/prop-types */
import "./skills.css";
import { useState, useEffect, useRef } from "react";

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
  const [skillsInView, setSkillsInView] = useState(false);
  const intersectionObserver = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    // Intersection observer callback function
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if(!skillsInView && entry.isIntersecting){
          setSkillsInView(true);
        }
      });
    };


    // Creating the intersection observer instance
    intersectionObserver.current = new IntersectionObserver(
      handleIntersection,
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5, // Triggers when 50% of the element is visible
      }
    );

    // Observing the featured section element
    if (skillsRef.current) {
      intersectionObserver.current.observe(skillsRef.current);
    }

    // Cleanup function
    return () => {
      // Disconnect the observer when the component unmounts
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, []);

  return (
    <div ref={skillsRef} className={`toolkit-container`}>
      <h2>My Toolkit 💻</h2>
      <ul className={`toolkit-list`}>
        {skills.map((skill, index) => (
          <Skill key={index} skill={skill} cName={skillsInView ? "visible" : "hidden"} />
        ))}
      </ul>
    </div>
  );
}

export function Skill({ skill, index, cName }) {
  return (
    <li className={`toolkit-item ${cName}`} key={index}>
      <img className="toolkit-img" src={skill.src} alt={skill.name} />
      <p>{skill.name}</p>
    </li>
  );
}
