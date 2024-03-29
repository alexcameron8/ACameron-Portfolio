/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Skills } from "./Skills";
import "./about.css";

export function About({ isLight }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [aboutInView, setAboutInView] = useState(false);
  const intersectionObserver = useRef(null);
  const aboutRef = useRef(null);

  useEffect(() => {
    // Intersection observer callback function
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if(!aboutInView && entry.isIntersecting){
          setAboutInView(true);
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
    if (aboutRef.current) {
      intersectionObserver.current.observe(aboutRef.current);
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
    <div id="about" className="about-container">
      <h1>Want to learn more about me? Read below! </h1>
      <div className="about-bio">
        <div ref={aboutRef} className={`tabs ${aboutInView ? "visible" : "hidden-right"}`}>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => setTabIndex(index)}
          >
            <TabList className="about-tabs">
              <Tab
                className={tabIndex === 0 ? "about-tab active" : "about-tab"}
              >
                About Me
              </Tab>
              <Tab
                className={tabIndex === 1 ? "about-tab active" : "about-tab"}
              >
                My Journey
              </Tab>
              <Tab
                className={tabIndex === 2 ? "about-tab active" : "about-tab"}
              >
                My Experience
              </Tab>
            </TabList>

            <TabPanel className="tab-desc">
              <p className="about-p">
                Thanks for scrolling this far! I'm Alex Cameron, an energetic
                and dedicated recent graduate with a degree in{" "}
                <a href="https://admissions.carleton.ca/programs/software-engineering-beng/">
                  Software Engineering
                </a>{" "}
                from <a href="https://carleton.ca/">Carleton University</a>.
              </p>
              <p className="about-p">
                Ottawa, my hometown, has been the backdrop to my upbringing,
                along with my family who has played pivotal roles in shaping my
                values.
              </p>
              <p className="about-p">
                In addition to showcasing my academic and professional
                background, my portfolio aims to provide insights into my skill
                set, projects, and the diverse experiences that have shaped my
                journey.
              </p>
            </TabPanel>
            <TabPanel className="tab-desc">
              <p className="about-p">
                Growing up I have always embraced the ideology of immersing
                myself around technology.
              </p>
              <p className="about-p">
                My path to becoming a software engineer wasn't a linear path.
                Coming out of high school I innocently chose to pursue a degree
                in computer systems engineering, primarily drawn by my interests
                in computers growing up.
              </p>

              <p className="about-p">
                It wasn't until I was approaching my 2nd year of studies until I
                was aware of all the potential software development offered. I
                made an official switch to the Software Engineering program and
                never looked back! I couldn't be more thrilled to be a part of
                this community.
              </p>
            </TabPanel>
            <TabPanel className="tab-desc">
              <p className="about-p">
                My professional journey has been enriched by a substantial
                16-month Co-op tenure with Gastops Ltd, where I actively
                contributed to the Software Engineering team.
              </p>
              <p className="about-p">
                As I advance on my career, I am driven by a commitment to
                excellence and a continuous pursuit of knowledge in the
                ever-evolving field of software engineering.
              </p>
            </TabPanel>
          </Tabs>
        </div>
        <div className={`about-img ${aboutInView ? "visible" : "hidden-left"}`}>
          <img
            src={
              isLight
                ? "./assets/ac-headshot-light.gif"
                : "./assets/ac-headshot-dark.gif"
            }
            alt="ac-headshot"
          />
        </div>
      </div>
      <Skills />
    </div>
  );
}
