import React from "react";
import Styles from "./navbar.module.scss";
import logo from "../../assets/logo.png";
import food from "../../assets/video.png";
import park from "../../assets/library.png";
import contest from "../../assets/trophy.png";
import profile from "../../assets/girl.png";
import blog from "../../assets/blog.png";
import comic from "../../assets/comic.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Navbar() {
  const { username } = useSelector((state) => state.user.currentUser);
  console.log(username);
  return (
    <>
      <nav>
        <Link to="/">
          <img className={Styles.logo} src={logo} alt={logo} />
        </Link>
        <ul>
          <li>
            <Link to="/explore/mall">
              <p> Comics</p>
              <img src={comic} alt="comics" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <p> contest</p>
              <img src={contest} alt="contest" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <p> Videos</p>
              <img src={food} alt="cafeteria" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <p> library</p>
              <img src={park} alt="park" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <p> blogs</p>
              <img src={blog} alt="blogs" />
            </Link>
          </li>
          <li>
            <Link to={`/explore/profile/${username}`}>
              <p> Profile</p>
              <img src={profile} alt="profile" />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
