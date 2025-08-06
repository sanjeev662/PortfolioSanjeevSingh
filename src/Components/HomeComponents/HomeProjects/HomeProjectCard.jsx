import React from "react";

import { Container, Row, Col } from "react-bootstrap";
import { FaPlay, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";

function ProjectCard(props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      key={1}
      className="hsingleProject"
      style={{ backgroundColor: "#6d99b0", border: "1px solid" }}
    >
      <div className="hprojectContent">
        <h2 id={"first"} style={{ color: "#302e4d" }}>
          {props.title}
        </h2>
        {/* <img src={props.imgUrl} alt="missing" /> */}
        <iframe
          width="560"
          height="315"
          src={props.uTubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
        <div className="hproject--showcaseBtn">
          <a
            href={props.demoUrl}
            target="_blank"
            rel="noreferrer"
            className={"iconBtn"}
            aria-labelledby={`hello`}
            title={props.description}
          >
            <FaPlay id={`demo`} className={"icon"} aria-label="Demo" />
          </a>
          <a
            href={props.codeUrl}
            target="_blank"
            rel="noreferrer"
            className={"iconBtn"}
            aria-labelledby={`code`}
            title={props.skills}
          >
            <FaCode id={`code`} className={"icon"} aria-label="Code" />
          </a>
        </div>
      </div>
      {/* <p
              className="hproject--desc"
              style={{
                background: "#fbd9ad",
                color: "rgb(147 71 192)",
                fontWeight: 600,
              }}
            >
              {props.description}
            </p>
            <div
              className="hproject--lang"
              style={{
                background: "#fbd9ad",
                color: "#b061df",
                fontWeight: 600,
              }}
            >
              {props.skills}
            </div> */}
    </motion.div>
  );
}

export default ProjectCard;
