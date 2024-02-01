import { useState, useEffect } from "react";
import { Project } from "./Project";
import "./projects.css";
function fetchProjects() {
  return fetch("./src/documents/projects.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .catch((error) => {
      console.error("There was a problem fetching the JSON:", error);
      // Return an empty array or handle the error as needed
      return [];
    });
}

export function Projects() {
  const [projectsData, setProjectsData] = useState(null);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    // Fetch projects data when the component mounts
    fetchProjects().then((data) => {
      // Update the state with the fetched projects data
      setProjectsData(data);
    });
  }, []); // Empty dependency array to fetch data only once when the component mounts
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <div className={`project-container ${showMore ? "show-all" : ""}`}>
        {projectsData != null &&
          projectsData.map((project, index) => (
            <Project key={index} project={project} />
          ))}
      </div>
      <button id="see-more-btn" onClick={toggleShowMore}>
        {showMore ? "See less" : "See more"}
      </button>
    </div>
  );
}
