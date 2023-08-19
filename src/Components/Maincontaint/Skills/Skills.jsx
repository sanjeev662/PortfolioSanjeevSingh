import React from "react";

function Skills() {
  return (
    <section className="about section">
      <div className="container">
        <div className="row">
          <div className="section-title padd-15">
            <h2>Skills</h2>
          </div>
        </div>

        <div className="row">
          <div className="about-con padd-15">
            <div
              className="skills padd-15"
              style={{ display: "-webkit-inline-box", maxWidth: "45%" }}
            >
              <div className="row">
                <div className="section-title padd-15">
                  <h3>Frontend</h3>
                </div>

                <div className="skill-items padd-15">
                  <h5>Front End(Bootstrap, React, and Javascript)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "70%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Back End(NodeJs, Express, SQL, MongoDB, ...)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "80%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Data Structure and Algorithm</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Competitive Programming</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
              {/* </div> */}

              {/* <div className="skills padd-15"> */}
              <div className="row" style={{ marginLeft: "1rem" }}>
                <div className="section-title padd-15">
                  <h3>Backend</h3>
                </div>
                <div className="skill-items padd-15">
                  <h5>Front End(Bootstrap, React, and Javascript)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "70%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Back End(NodeJs, Express, SQL, MongoDB, ...)</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "80%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Data Structure and Algorithm</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>

                <div className="skill-items padd-15">
                  <h5>Competitive Programming</h5>
                  <div className="progress">
                    <div className="progress-in" style={{ width: "85%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
