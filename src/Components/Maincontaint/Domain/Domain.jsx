import React from "react";
import "./Domain.css";
import icpcc from "../../Assets/Certificates/icpc.jpg";

function Domain() {

  return (
        <section className="services section">
          <div className="container">
            <div className="row">
              <div className="section-title padd-15">
                <h2>Domains</h2>
              </div>
            </div>
            <div className="row">

              <div className="services-item padd-15">
                <div className="service-item-inner">
                  <div className="icon"><i className="fa fa-desktop" aria-hidden="true" /></div>
                  <h4>Full stack Development</h4>
                  <p><strong>Front End Development</strong></p>
                  <p>HTML, CSS, Javascript, Bootstrap, React</p>
                  <p><strong>Backend End Development</strong></p>
                  <p>NodeJS, ExpressJS, SQL, MongoDB, APIs </p>
                  <a href="https://github.com/sanjeev662" target="_blank"><span className="outer-links">View Projects</span></a>
                </div>
              </div>

              <div className="services-item padd-15">
                <div className="service-item-inner">
                  <div className="icon"><i className="fa fa-object-group" aria-hidden="true" /></div>
                  <h4>Data Structure and Algorithms</h4>
                  <p>College-DSA Repo : <a href="https://github.com/sanjeev662/DS-JAVA" target="_blank"><span className="outer-links">My Codes</span></a></p>
                  <p>College-OPPS Repo : <a href="https://github.com/sanjeev662/OOPS-JAVA" target="_blank"><span className="outer-links">My Codes</span></a></p>
                  <p>Geeks-For-Geeks DSA : <a href="https://auth.geeksforgeeks.org/user/sanjeev662" target="_blank"><span className="outer-links">My Profile</span></a></p>
                </div>
              </div>
              <div className="services-item padd-15">
                <div className="service-item-inner">
                  <div className="icon"><i className="fa fa-code" aria-hidden="true" /></div>
                  <h4>Competitive Programming</h4>
                  <p> CodeChef : <a href="https://www.codechef.com/users/sanjeev662" target="_blank"><span className="outer-links">sanjeev662</span></a></p>
                  <p> CodeForces : <a href="https://codeforces.com/profile/sanjeev662" target="_blank"><span className="outer-links">sanjeev662</span></a></p>
                  <p> HackerRank : <a href="https://www.hackerrank.com/sanjeev662" target="_blank"><span className="outer-links">sanjeev662</span></a></p>
                  <a href={icpcc} target="_blank"><span className="outer-links">ICPC Regionalist'2022</span></a>
                </div>
              </div>
              
            </div>
          </div> 
        </section>

);
}

export default Domain;