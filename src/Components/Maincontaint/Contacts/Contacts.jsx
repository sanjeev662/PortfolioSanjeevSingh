import React from "react";
import Form from "./Form";
import "./Contacts.css";

function Contacts() {
  return (
    <section className="d-flex flex-column container">
      <div className="section-title padd-15" style={{marginBottom:"15px",marginTop:"10px"}}>
        <h2>Contact Me</h2>
      </div>
      <Form />
      <div className="section-body contact mt-auto">
        <a
          className="contact-info"
          href="tel:950-600-9121"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-phone fa-2x"></i>
        </a>
        <a
          className="contact-info"
          href="mailto:sanjeevsinghkaushik662@gmail.com"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fas fa-envelope-open-text fa-2x"></i>
        </a>
        <a
          className="contact-info"
          href="https://www.linkedin.com/in/sanjeev662/"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-linkedin-in fa-2x"></i>
        </a>
        <a
          className="contact-info"
          href="https://github.com/sanjeev662"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-github fa-2x"></i>
        </a>
        <a
          className="contact-info"
          href="https://stackoverflow.com/users/22363267/sanjeev-kumar-singh"
          target="_blank"
          rel="noreferrer"
        >
          <i className="fab fa-stack-overflow fa-2x"></i>
        </a>
      </div>
    </section>
  );
}

export default Contacts;
