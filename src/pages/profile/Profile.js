import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { userRequest } from "../../requestMethod";
import Styles from "./profile.module.scss";
import defProfile from "../../assets/defProfile.jpeg";
import cvrPic from "../../assets/Background.png";
import axios from "axios";
function Profile() {
  const [user, setUser] = React.useState(true);
  const { currentUser } = useSelector((state) => state.user);
  const [profile, setProfile] = React.useState({});
  const [followed, setFollowed] = React.useState(
    profile.flwrs?.includes(currentUser._id)
  );
  console.log(followed, "pppp");
  // const [flwngs, setFlwngs] = React.useState();
  const { username } = useParams();
  console.log(currentUser, "pp");

  useEffect(() => {
    const result = async () =>
      userRequest
        .get(`/users/find?username=${username}`)
        .then((res) => setProfile(res.data));
    result();
  }, [username, followed]);

  console.log(profile.flwrs);

  useEffect(() => {
    profile.flwrs?.includes(currentUser._id)
      ? setFollowed(true)
      : setFollowed(false);
  }, [currentUser, profile]);

  const handleFollow = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://localhost:8800/api/users/${profile._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        setFollowed(false);
      } else {
        await axios.put(
          `http://localhost:8800/api/users/${profile._id}/follow`,
          {
            userId: currentUser._id,
          }
        );
        setFollowed(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const dobb = profile.dob?.split("T", 1);
  return (
    <>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div className={Styles.profile}>
          <img
            className={Styles.coverimage}
            src={profile.cvrPic ? profile.cvrPic : cvrPic}
            alt="pp"
          />
          <img
            className={Styles.profileimage}
            src={profile.prfPic ? profile.prfPic : defProfile}
            alt="ok"
          />

          {currentUser.username === username ? (
            <button
              style={{
                margin: "0.9rem auto 0 auto",
                padding: "0.1rem 0.3rem",
              }}
            >
              <Link to="/explore/profile/edit">Edit Profile ✎</Link>
            </button>
          ) : (
            <button
              style={{
                margin: "0.9rem auto 0 auto",
                padding: "0.1rem 0.3rem",
              }}
              onClick={handleFollow}
            >
              {followed ? `unfollow -` : "Follow +"}
            </button>
          )}

          <div className={Styles.info}>
            <p>{profile.username}</p>
            <p>{dobb}</p>
          </div>
          <div className={Styles.follow}>
            <p>Followers: {profile.flwrs ? profile.flwrs.length : 0} </p>
            <p>Followings: {profile.flwngs ? profile.flwngs.length : 0}</p>
          </div>
        </div>
        <div style={{ margin: "auto" }}>
          <i>You've not purchased any products 😕</i>
          <br />
          <Link to="/explore/mall">Buy now</Link>
        </div>
      </div>
    </>
  );
}

export default Profile;
