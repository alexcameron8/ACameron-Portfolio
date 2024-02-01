import { useState, useEffect } from "react";
import { Project } from "./Project";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

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
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    // Fetch projects data when the component mounts
    fetchProjects().then((data) => {
      // Update the state with the fetched projects data
      setProjectsData(data);
    });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Number of rows to display based on viewport width
  const numRows =
    window.innerWidth > 1200 ? 2 : window.innerWidth > 600 ? 3 : 4; // Default to 3 rows for smaller widths

  const numRowItems =
    window.innerWidth > 1200 ? 3 : window.innerWidth > 600 ? 2 : 1; // Default to 3 rows for smaller widths

  // Slice the projects data based on the number of rows to display
  const slicedProjects = showAllProjects
    ? projectsData
    : projectsData?.slice(0, numRows * numRowItems);

  const handleSeeMoreClick = () => {
    setShowAllProjects((prev) => !prev);
  };
  console.log(slicedProjects);
  return (
    <div className="projects-container">
      <h1>Projects</h1>
      <div className="project-container">
        {slicedProjects?.map((project, index) => (
          <Project key={index} project={project} />
        ))}
      </div>
      <div className="btn-expand-container">
        <button className="see-more-btn" onClick={handleSeeMoreClick}>
          {showAllProjects ? (
            <>
              See Less&nbsp;
              <FaArrowUp />
            </>
          ) : (
            <>
              See More&nbsp;
              <FaArrowDown />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
