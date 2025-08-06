import React from "react";
import CertificateCard from "./CertificateCard";
import "./Certificates.css";
import { Container, Row, Col } from "react-bootstrap";

import multigradc from "../../Assets/Certificates/multigrad.png"
import namekart_Internc from "../../Assets/Certificates/namekart_intern.png";
import rydeu_internc from "../../Assets/Certificates/rydeu_intern.png";
import iitk_mlc from "../../Assets/Certificates/iitk_ml.png";

import risec from "../../Assets/Certificates/rise.png";
import icpcc from "../../Assets/Certificates/icpc.jpg";
import mernc from "../../Assets/Certificates/udemy.jpg";

import tsfc from "../../Assets/Certificates/spark.jpg";
import unic from "../../Assets/Certificates/unicompiler.jpg";
import tcsc from "../../Assets/Certificates/tcs.jpg"

import nitmizoramc from "../../Assets/Certificates/nit_mijoram.jpg";
import flipc from "../../Assets/Certificates/flipkart.jpg";
import codechefc from "../../Assets/Certificates/codechef.jpg";

import hackc from "../../Assets/Certificates/hackerrank_java.jpg";
import uiet from "../../Assets/Certificates/uiet.jpg";
import isro from "../../Assets/Certificates/isro.jpg";


function Certificates() {

  const certificatelist=[
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
    },
    {
      title : "IIT Kanpur",
      imgUrl : iitk_mlc,
      siteUrl : "https://www.iitk.ac.in/",
      tagline : "Machine Learning Course"
    },
    {
      title : "Udemy",
      imgUrl : mernc,
      siteUrl : "https://www.udemy.com/",
      tagline : "Web Development Bootcamp"
    },
    {
      title : "ISRO",
      imgUrl : isro,
      siteUrl : "https://www.isro.gov.in/",
      tagline : "Machine Learning"
    },
    {
      title : "Rise Higher Education Inc",
      imgUrl : risec,
      siteUrl : "https://www.risehighereducation.com/",
      tagline : "Full Stack Development intern"
    },
    {
      title : "The Sparks Foundation",
      imgUrl : tsfc,
      siteUrl : "https://www.thesparksfoundationsingapore.org/",
      tagline : "Web Development & Designing Intern"
    },
    {
      title : "Fightage Pvt Ltd (Multigrad)",
      imgUrl : multigradc,
      siteUrl : "https://multigrad.in/",
      tagline : "Full Stack Development Intern"
    },
    {
      title : "UNICompiler",
      imgUrl : unic,
      siteUrl : "https://unicompiler.com/",
      tagline : "Web Dev Intern"
    },       
    {
      title : "Tata Consultancy Services",
      imgUrl : tcsc,
      siteUrl : "https://www.tcs.com/",
      tagline : "tcs_softskill_certificate"
    },
      
    {
      title : "NIT Mijoram",
      imgUrl : nitmizoramc,
      siteUrl : "https://www.nitmz.ac.in/",
      tagline : "Web Dev Contest"
    },
    {
      title : "Codechef",
      imgUrl : codechefc,
      siteUrl : "https://www.codechef.com/",
      tagline : "SnackDown Certificate"
    },   
    {
      title : "Hackerrank",
      imgUrl : hackc,
      siteUrl : "https://www.hackerrank.com/",
      tagline : "Java Certification"
    },
    {
      title : "UIET CSJMU",
      imgUrl : uiet,
      siteUrl : "http://csjmu.ac.in/",
      tagline : "Internet of Things(IOT)"
    }
  ]


  return (
    <section
      className="certificate container"
      data-aos="fade-left"
    >
      <div className="section-title" style={{marginBottom:"10px",marginTop:"5px"}}>
        <h2>Certificate</h2>
      </div>
      {/* <Col
              md={12}
              className="project-description d-flex justify-content-start"
              style={{height:"70px"}}
            >
              <div className="row">
                <div className="section-title padd-15">
                  <h2>Certificate</h2>
                </div>
              </div>
            </Col> */}
      
      <div className="row">
      {certificatelist.map((element) => {
                  return (
                    < div className="column">
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
    </section>
  );
}

export default Certificates;
