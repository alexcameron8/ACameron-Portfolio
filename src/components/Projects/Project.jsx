import { useState, useEffect, useRef } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { Skill } from "./Skill";
import "./projects.css";

/* eslint-disable react/prop-types */
export function Project({ project }) {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  let isDeployed = false;

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const [projectInView, setProjectInView] = useState(false);
  const intersectionObserver = useRef(null);
  const projectRef = useRef(null);
  
  useEffect(() => {
    // Intersection observer callback function
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        // Never set back to false
        setProjectInView(entry.isIntersecting);
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
    if (projectRef.current) {
      intersectionObserver.current.observe(projectRef.current);
    }

    // Cleanup function
    return () => {
      // Disconnect the observer when the component unmounts
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
    };
  }, []);

  const limit = 150; // Limit for number of chars to display when not expanded
  if (project.deployment) isDeployed = true;
  return (
    <>
      <div ref={projectRef} className={`project-item ${projectInView ? "visible" : "hidden"}`}>
        <div
          className="project-image-container"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="project-demo-container">
            {hover ? (
              // <div className="project-vid">
              <video
                className="project-demo"
                src={project.video}
                type="video/mp4"
                loop
                autoPlay
                controls
                muted
              />
            ) : (
              // </div>
              <img
                className="project-image"
                src={project.image}
                alt={project.title}
              />
            )}
          </div>
        </div>
        <div className="project-description-container">
          <h2>{project.title}</h2>
          <div
            data-tooltip-id={`${project.title}year-tool-tip`}
            className="proj-year"
          >
            {project.year}
          </div>
          {/* <p className="project-desc-text">{project.description}</p> */}
          <p className="project-desc-text">
            {" "}
            {expanded
              ? project.description
              : `${project.description.slice(0, limit)}${
                  project.description.length > limit ? "..." : ""
                }`}
          </p>
          <div className="resize-container">
            {project.description.length > limit && (
              <button className="btn-resize" onClick={toggleExpanded}>
                {expanded ? "Read Less" : "Read More..."}
              </button>
            )}
          </div>
        </div>
        <div className="skills-container">
          <ul className="skills-list">
            {project.tags.slice().map((skill) => (
              <li className="skill-list-item" key={skill}>
                <Skill skill={skill} />
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <button
            className={`btn-deployment${isDeployed ? "" : "-disabled"}`}
            disabled={isDeployed ? false : true}
          >
            <a className="a-deployment" href={project.deployment}>
              <CgWebsite style={{ color: "var(--text-color)" }} /> &nbsp;
              {isDeployed ? "Live Deployment" : "Not Deployed"}
            </a>
          </button>
          <button className="btn-gh">
            <a className="a-deployment" href={project.repositoryLink}>
              <FaGithub style={{ color: "var(--text-color)" }} />
              &nbsp;Source Code
            </a>
          </button>
        </div>
      </div>
      <ReactTooltip
        id={`${project.title}year-tool-tip`}
        place="bottom"
        content={project.date}
      />
    </>
  );
}
