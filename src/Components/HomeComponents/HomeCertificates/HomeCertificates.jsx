import React from "react";
import { Link } from "react-router-dom";
import CertificateCard from "./HomeCertificateCard";
import "./HomeCertificates.css";

import risec from "../../Assets/Certificates/rise.png";
import icpcc from "../../Assets/Certificates/icpc.jpg";
import multigradc from "../../Assets/Certificates/multigrad.png";


function Certificates() {
  const certificatelist = [
    {
      title : "Rise Higher Education Inc",
      imgUrl : risec,
      siteUrl : "https://www.risehighereducation.com/",
      tagline : "Full Stack Development intern"
    },
    {
      title : "ACM-ICPC",
      imgUrl : icpcc,
      siteUrl : "https://icpc.global/",
      tagline : "ICPC 2022 Regionalist"
    },
    {
      title : "Fightage Pvt Ltd (Multigrad)",
      imgUrl : multigradc,
      siteUrl : "https://multigrad.in/",
      tagline : "Full Stack Development Intern"
    },
  ];

  return (
    <section
      className="certificate"
      data-aos="fade-left"
      style={{ paddingTop: "25px", minHeight:"80vh" }}
    >
      <div className="container">
        <div className="section-title" style={{height:"5px",paddingLeft:"1rem"}}>
          <h2>Certificate</h2>
        </div>

        <div className="row">
          {certificatelist.map((element) => {
            return (
              <div className="column">
                <CertificateCard
                  title={element.title}
                  tagline={element.tagline}
                  imgUrl={element.imgUrl}
                  siteUrl={element.siteUrl}
                />
              </div>
            );
          })}
        </div>
        <div className="row" style={{ justifyContent:"center" , padding:"50px" }}>
          <Link to="/certificates" className="btn" style={{ maxWidth:"98%" }}>
            View More Certification..
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Certificates;
