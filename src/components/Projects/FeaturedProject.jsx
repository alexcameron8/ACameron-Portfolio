// import "./projects.css";
import { Skill } from "./Skill";
import { FaGithub } from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";

/* eslint-disable react/prop-types */
export function FeaturedProject({ project }) {
  return (
    <>
      <div className="featured-container">
        <div className="featured-header">
          <div>
            <h2>{project.title}</h2>
            <div
              data-tooltip-id={`${project.title}author-tool-tip`}
              className="proj-year"
            >
              {project.date}
            </div>
          </div>
          <a className="badge-wrapper" href={project.award}>
            <img className="project-badge" src={project.badge} />
          </a>
        </div>
        <div className="project-featured">
          <div className="featured-desc">
            <div className="desc-container">
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html: project.featuredDescription,
                  }}
                ></p>
                <div className="skills-container">
                  <ul className="skills-list">
                    {project.tags.slice().map((skill) => (
                      <li className="skill-list-item" key={skill}>
                        <Skill skill={skill} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <img className="featured-image" src={project.featuredImage} /> */}
            </div>
          </div>
          <div className="featured-media">
            <iframe
              className="project-video"
              src={project.youtube}
              allowFullScreen
              title="video"
            />
            <p className="demo-footer">{project.videoFooter}</p>
          </div>
        </div>
      </div>
      <ReactTooltip
        id={`${project.title}author-tool-tip`}
        place="bottom"
        content={project.authors.join(", ")}
      />
    </>
  );
}
