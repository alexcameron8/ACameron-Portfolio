import { useState, useEffect, useRef } from "react";
import { Project } from "./Project";
import { FeaturedProject } from "./FeaturedProject";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";

import "./projects.css";
function fetchProjects() {
  return fetch("/documents/projects.json")
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
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getCurrentBreakpoint()
  );
  const [featuredInView, setFeaturedInView] = useState(false);
  const [isH1InView, setIsH1InView] = useState(false);

  const intersectionObserver = useRef(null);
  const featuredRef = useRef(null);
  const h1Ref = useRef(null);
  useEffect(() => {
    // Fetch projects data when the component mounts
    fetchProjects().then((data) => {
      // Update the state with the fetched projects data
      setProjectsData(data);
    });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  //Rerendering for different breakpoints for # of projects visible depending on grid layou
  useEffect(() => {
    const mediaQueryLists = {
      small: window.matchMedia("(max-width: 600px)"),
      medium: window.matchMedia("(min-width: 601px) and (max-width: 1099px)"),
      large: window.matchMedia("(min-width: 1100px)"),
    };

    const handleBreakpointChange = () => {
      setCurrentBreakpoint(getCurrentBreakpoint());
    };

    // Add event listeners to media query lists
    Object.values(mediaQueryLists).forEach((mediaQueryList) => {
      mediaQueryList.addListener(handleBreakpointChange);
    });

    // Initial check for current breakpoint
    setCurrentBreakpoint(getCurrentBreakpoint());

    // Cleanup function to remove event listeners
    return () => {
      Object.values(mediaQueryLists).forEach((mediaQueryList) => {
        mediaQueryList.removeListener(handleBreakpointChange);
      });
    };
  }, []);

  useEffect(() => {
    // Intersection observer callback function
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if(!featuredInView && entry.isIntersecting){
        setFeaturedInView(true);
        }
      });
    };
    // Intersection observer callback function for h1 element
    const handleH1Intersection = (entries) => {
      entries.forEach((entry) => {
        if(!isH1InView && entry.isIntersecting){
          setIsH1InView(true);
        }
      });
    };
    // Intersection observer instance for h1 element
    const h1Observer = new IntersectionObserver(handleH1Intersection, {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Triggers when 50% of the element is visible
    });
    // Observing the h1 element
    if (h1Ref.current) {
      h1Observer.observe(h1Ref.current);
    }

    // Creating the intersection observer instance
    intersectionObserver.current = new IntersectionObserver(
      handleIntersection,
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2, // Triggers when 50% of the element is visible
      }
    );

    // Observing the featured section element
    if (featuredRef.current) {
      intersectionObserver.current.observe(featuredRef.current);
    }

    // Cleanup function
    return () => {
      // Disconnect the observer when the component unmounts
      if (intersectionObserver.current) {
        intersectionObserver.current.disconnect();
      }
      // Disconnect the observer when the component unmounts
      if (h1Observer) {
        h1Observer.disconnect();
      }
    };
  }, []);

  // Helper function to determine the current breakpoint
  function getCurrentBreakpoint() {
    if (window.matchMedia("(max-width: 640px)").matches) {
      return "small";
    } else if (
      window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
    ) {
      return "medium";
    } else {
      return "large";
    }
  }
  // Number of rows to display based on viewport width
  const numRows =
    window.innerWidth > 1200 ? 2 : window.innerWidth > 600 ? 3 : 4; // Default to 3 rows for smaller widths

  const numRowItems =
    window.innerWidth > 1200 ? 3 : window.innerWidth > 600 ? 2 : 1; // Default to 3 rows for smaller widths

  // Slice the projects data based on the number of rows to display
  const slicedProjects = showAllProjects
    ? projectsData
    : projectsData?.slice(0, numRows * numRowItems);

  const extraProjects = projectsData?.length - slicedProjects?.length;
  const handleSeeMoreClick = () => {
    setShowAllProjects((prev) => !prev);
  };

  return (
    <div className="projects-container" id="projects">
      <h1 ref={h1Ref} className={`${isH1InView ? "visible" : "hidden"}`}>
        Projects
      </h1>
      <h2 className={`${featuredInView ? "visible" : "hidden"}`}>
        Featured Capstone Project
      </h2>
      <div
        className={`featured-section ${featuredInView ? "visible" : "hidden"}`}
        ref={featuredRef}
      >
        {slicedProjects
          ?.filter((project) => project.featured)
          .map((project, index) => (
            <FeaturedProject key={index} project={project} />
          ))}
      </div>
      <h2>All Projects</h2>
      <div className="project-container">
        {slicedProjects?.map((project, index) => {
          return <Project key={index} project={project} />;
        })}
      </div>
      {(extraProjects > 0 || showAllProjects) && (
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
      )}
    </div>
  );
}
