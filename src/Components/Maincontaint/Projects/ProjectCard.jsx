import React from "react";

import { FaPlay, FaCode } from "react-icons/fa";
import { Fade } from "react-reveal";

function ProjectCard(props) {
  return (
        <Fade bottom>
          <div
            key={1}
            className="singleProject"
            style={{ backgroundColor: "#6d99b0", border: "1px solid" }}
          >
            <div className="projectContent">
              <h2 id={"first"} style={{ color: "#302e4d" }}>
                {props.title}
              </h2>
              <img src={props.imgUrl} alt="missing" />
              <div className="project--showcaseBtn">
                <a
                  href={props.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={"iconBtn"}
                  aria-labelledby={`hello`}
                >
                  <FaPlay id={`demo`} className={"icon"} aria-label="Demo" />
                </a>
                <a
                  href={props.codeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={"iconBtn"}
                  aria-labelledby={`code`}
                >
                  <FaCode id={`code`} className={"icon"} aria-label="Code" />
                </a>
              </div>
            </div>
            <p
              className="project--desc"
              style={{
                background: "#fbd9ad",
                color: "rgb(147 71 192)",
                fontWeight: 600,
              }}
            >
              {props.description}
            </p>
            <div
              className="project--lang"
              style={{
                background: "#fbd9ad",
                color: "#b061df",
                fontWeight: 600,
              }}
            >
              {props.skills}
            </div>
          </div>
        </Fade>
  );
}

export default ProjectCard;
