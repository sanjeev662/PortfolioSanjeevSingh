import React from "react";
import Form from "./Form";

function Contacts() {
  return (
    <section className="d-flex flex-column container" style={{paddingBottom:"35px",paddingTop:"0px"}}>
       <div className="section-title padd-15">
        <h2>Contact Me</h2>
      </div>
      <Form />
    </section>
  );
}

export default Contacts;
