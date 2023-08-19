import React from "react";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import {TbCertificate} from "react-icons/tb";

function CertificateCard(props) {
  return (
    <div>
      <img src={props.imgUrl} alt="missing" />
      <div className="overlay">
        <div className="left">
          <h3>{props.title}</h3>
          <p>{props.tagline}</p>
        </div>
        <div className="right">

          <a href={props.imgUrl} target="_blank">
            <TbCertificate
              className="icon"
              style={{ marginRight: "0.4em" }}
              title="see certificate"
            />
          </a>

          <a href={props.siteUrl} target="_blank" rel="noopener noreferrer">
            <FaExternalLinkSquareAlt 
            className="icon" 
            style={{ marginRight: "0.4em",
            fontSize:"2.0rem" }}
            title="see site" 
            />
          </a>

        </div>
      </div>
    </div>
  );
}

export default CertificateCard;
