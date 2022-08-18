import React from "react";
import Navbar from "../../components/navbar/Navbar";
import "./aboutUs.css";
// import  from "./aboutUs.css";
import AboutUs_img from "./AboutUs_img.png";

function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="About_heading">
        <h2>
          Toonland is presented by Mentoons A fun entartaining and learning
          Platform designed especially for kids between 6-12 years. we create
          free and low-cost experiences whereby kids can learn through Toonland
          website. kids have fun while reading and watching ours illustrated
          audio and video stories.
        </h2>
      </div>{" "}
      <img className="about_img" src={AboutUs_img} alt="" />
      <h4>team Mentoons</h4>
      {/* <div className="persons">
        <div className="person_1">samir</div>
        <div className="person_2">shabeer</div>
        <div className="person_3">aadra</div>
        <div className="person_4">lincy</div>
        <div className="person_5">rudra</div>
        <div className="person_6">sayujiya</div>
        <div className="person_7">ishika</div>
        <div className="person_7">shahil</div>
        <div className="person_7">angri</div>
      </div> */}
    </div>
  );
}

export default AboutUs;
