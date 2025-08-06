import React from "react";
import { Link } from "react-router-dom";
import CertificateCard from "./HomeCertificateCard";
import "./HomeCertificates.css";

import icpcc from "../../Assets/Certificates/icpc.jpg";
import namekart_Internc from "../../Assets/Certificates/namekart_intern.png";
import rydeu_internc from "../../Assets/Certificates/rydeu_intern.png";


function Certificates() {
  const certificatelist = [
    {
      title : "Namekart Pvt. Ltd",
      imgUrl : namekart_Internc,
      siteUrl : "https://www.namekart.com/",
      tagline : "SDE Intern"
    },
    {
      title : "Rydeu Logistics India Pvt. Ltd",
      imgUrl : rydeu_internc,
      siteUrl : "https://www.rydeu.com/",
      tagline : "Backend Development intern"
    },
    {
      title : "ACM-ICPC",
      imgUrl : icpcc,
      siteUrl : "https://icpc.global/",
      tagline : "ICPC 2022 Regionalist"
    }
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
