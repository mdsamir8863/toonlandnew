import React from "react";
// import Navbar from "../../components/navbar/Navbar";
import "./workshop.css";
import workshop1 from "../../assets/worshop1.png";
import workshop2 from "../../assets/workshop2.png";
import workshop3 from "../../assets/workshop3.png";
import logo from "../../assets/logo.png";
// import nala from "../../assets/Nala.png";

const Workshop = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <div>
        <img className="logo" src={logo} alt="" />
        <img className="workshop3" src={workshop3} alt="" />
        {/* <img className='nala' src={nala} alt="" /> */}
        {/* <img src={workshop1} alt="" />
       <img src={workshop1} alt="" /> */}
      </div>
      <div className="p-div">
        <p>
          A fun, interactive environment is a place for you and your kids! Let’s
          find out how we help kids to learn about different aspects of life
          under one roof in a creative and fun way.
        </p>
        <div className="join_us_div">
          <h1>Join us with a click!</h1>
          <button>click</button>
        </div>
        <p>
          Workshops on cell phone de-addiction, social media de-addiction, the
          revival of ancient values, relationship building, time management, and
          the topics are endless!{" "}
        </p>
      </div>

      <div className="social-div">
        <p>
          Workshops on cell phone de-addiction, social media de-addiction, the
          revival of ancient values, relationship building, time management, and
          the topics are endless!
        </p>
        <div>
          <img className="social_img" src={workshop2} alt="" />
        </div>
        <p>
          Workshops on cell phone de-addiction, social media de-addiction, the
          revival of ancient values, relationship building, time management, and
          the topics are endless!
        </p>
      </div>
      
      <div className="social-div">
        <p>
          Workshops on cell phone de-addiction, social media de-addiction, the
          revival of ancient values, relationship building, time management, and
          the topics are endless!
        </p>
        <div>
          <img className="social_img" src={workshop1} alt="" />
        </div>
        <p>
          Workshops on cell phone de-addiction, social media de-addiction, the
          revival of ancient values, relationship building, time management, and
          the topics are endless!
        </p>
      </div>
    </div>
  );
};

export default Workshop;
