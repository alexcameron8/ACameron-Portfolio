import { Tooltip as ReactTooltip } from "react-tooltip";
import { FaGithub } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { Skill } from "./Skill";
import "./projects.css";

/* eslint-disable react/prop-types */
export function Project({ project }) {
  return (
    <>
      <div className="project-item">
        <div className="project-image-container">
          <img
            className="project-image"
            src={project.image}
            alt={project.title}
          />
        </div>
        <div className="project-description-container">
          <h2>{project.title}</h2>
          <div
            data-tooltip-id={`${project.title}year-tool-tip`}
            className="proj-year"
          >
            {project.year}
          </div>
          <p>{project.description}</p>
        </div>
        <div className="skills-container">
          <ul className="skills-list">
            {project.tags.slice().map((skill) => (
              <li key={skill}>
                <Skill skill={skill} />
              </li>
            ))}
          </ul>
        </div>
        <div className="button-container">
          <button className="btn-deployment">
            <a className="a-deployment" href={project.repositoryLink}>
              <CgWebsite /> &nbsp;Live Deployment
            </a>
          </button>
          <button className="btn-gh">
            <a className="a-deployment" href={project.repositoryLink}>
              <FaGithub color="black" />
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