import React, { useEffect, useRef, useState } from "react";
import Styles from "./home.module.scss";
import { Link } from "react-router-dom";
// import { AuthContext } from "../../context/AuthContext"
import bg1 from "../../assets/bg1.jpg";
import contact from "../../assets/contact.png";
import toto from "../../assets/toto.png";
import bg2 from "../../assets/bg2.jpg";
import meerkat from "../../assets/Meerkats.png";
import tubby_kuma from "../../assets/TubbyKuma.png";
import nala from "../../assets/Nala.png";
import bg3 from "../../assets/bg3.jpg";
import bg4 from "../../assets/bg4.jpg";
import Sub from "../../assets/Sub.png";
import contest from "../../assets/Contests.png";
import character from "../../assets/characters.png";
import talent_hunt from "../../assets/Talent_hunt.png";
// import subscribe_btn from "../../assets/Subscribe_button.png";
import bg5 from "../../assets/bg5.png";
import bg6 from "../../assets/bg6.png";
import mute from "../../assets/mute.png";
import volume from "../../assets/volume.png";
import music from "../../assets/toonlandmusic.mpeg";
import illustratedStories from "../../assets/illustrated-stories.png";
import audioStories from "../../assets/audio-stories.png";
import memeoftheday from "../../assets/meme-of-the-day.png";
import logo from "../../assets/logo.png";
import Sign_in from "../../assets/Sign_in.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/apiCalls";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();
    logout(dispatch);
  };

  const [playing, setPlaying] = useState(true);
  const [displayDialog, setDisplayDialog] = useState(true);

  const audioRef = useRef(null);
  const imageRef = useRef(null);
  const dialogRef = useRef();

  useEffect(() => {
    console.log(dialogRef.current.style);
    if (displayDialog === false) dialogRef.current.style.visibility = "hidden";
    else {
      dialogRef.current.style.visibility = "visible";
    }

  }, [displayDialog]);

  const handleClick = (event) => {
    const myAudio = audioRef.current;
    const myImage = imageRef.current;
    console.log(myAudio);
    console.log(myImage);

    setPlaying(!playing);

    if (playing) {
      myAudio.play();
      myImage.src = volume;
    } else {
      myAudio.pause();
      myImage.src = mute;
    }
  };
  console.log(playing);


const playMusic = ()=>{
  dialogRef.current.style.visibility = "hidden";

  const myAudio = audioRef.current;
  const myImage = imageRef.current;
  console.log(myAudio);
  console.log(myImage);

  setPlaying(!playing);

  if (playing) {
    myAudio.play();
    myImage.src = volume;
  } 
}

const muteMusic = ()=>{
  dialogRef.current.style.visibility = "hidden";
  
}

  return (
    <>
      <div>
        <div style={{}}>
          <div ref={dialogRef} className={Styles.dialog}>
            <p>do you want to play background music?</p>
            <div className={Styles.dialog_btn}>
           
              <button onClick={muteMusic} className={Styles.no}>Later</button>
              <button onClick={playMusic}  className={Styles.yes}>Yes</button>
            </div>
          </div>
        </div>
        <button onClick={handleLogout} className={Styles.login_button}>
          <Link to="/login">{currentUser ? "Signout" : "SignIn"}</Link>
        </button>
      </div>
      <div>
        <audio ref={audioRef} loop>
          <source src={music} type="audio/mpeg" />
        </audio>
        <img
          style={{
            position: "fixed",
            cursor: "pointer",
            zIndex: "99",
            maxWidth: "3rem",
            borderRadius: "50%",
            background: "white",
            padding: "0.4rem",
            bottom: 10,
            right: 10,
          }}
          ref={imageRef}
          onClick={handleClick}
          src={mute}
          alt=""
        />
      </div>
      <div className={Styles.homepage}>
        <div className={Styles.pg1}>
          <div>
            <img className={Styles.contact} src={contact} alt="" />
            <img className={Styles.toto} src={toto} alt="" />
            <span className={Styles.contact_info}>
              contact -: 9036033300 , <br />
              for live interaction session <br /> mon-fri <br />
              (12pm - 2pm)
            </span>
          </div>
          <img className={Styles.pg1_bg} src={bg1} alt="" />
          <img className={Styles.logo} src={logo} alt="" />
        </div>

        <div className={Styles.pg2}>
          <div className={Styles.proverb_box}>
            <img className={Styles.day_img} src={memeoftheday} alt="" />
            <h3>Actions Speak Louder Than Words</h3>
            <p>
              Meaning -: It is easy to make lofty promises but very difficult to
              act accordingly or follow them through. So actions are a
              reflection of a man’s character.
            </p>
          </div>
          <img className={Styles.pg2_bg} src={bg2} alt="" />
          <img className={Styles.nala_img} src={nala} alt="" />
          <div className={Styles.illustrated_stories}>
            <img src={illustratedStories} alt="" />
            <p>
              Engaging stories and fun characters that your kids will love! We
              make reading & learning FUN!
            </p>
            <p>
              Downloads Gain Access to exclusive content and freebies to help
              you as you teach, reach, and love those around you. PDF Books,
              Requires printing, cutting & Binding For best results.
            </p>
            {/* <img src={character} alt="" /> */}
            <button className={Styles.btn}>explore more</button>
          </div>
          <div className={Styles.audio_stories}>
            <img src={audioStories} alt="" />
            <p>
              listen at home packs the perfeel combination of listening,
              Learning and fun
            </p>
            <p>
              Suitable for 6-12 years kids, the listen at home pack consist of
              audio stories and other materials to keep your child entartained
              at home.
            </p>
            <button className={Styles.btn}>explore more</button>
          </div>
        </div>

        <div className={Styles.pg3}>
          <img className={Styles.pg3_bg} src={bg3} alt="" />
          {/* <a href="#">click here</a> */}
          <div className={Styles.character}>
            <img src={character} alt="" />
            <p>meet our characters</p>
            <button className={Styles.btn}>click here</button>
          </div>

          <div className={Styles.contest}>
            <img src={contest} alt="" />
            <p>participate our contest</p>
            <button className={Styles.btn}>click here</button>
          </div>
          <div className={Styles.talent_hunt_shadow}>
            {/* <h1 className={Styles.talent_hunt_heading}>Talent hunt</h1> */}

            {/* <button>submit</button> */}
            <img className={Styles.talent_hunt_img} src={talent_hunt} alt="" />
            <div className={Styles.talent_hunt_heading}>
              <h1
                style={{
                  left: "3rem",
                }}
              >
                win exciting prizes
              </h1>

              <label htmlFor="email">
                <b>Email</b>
              </label>
              <input
                type="text"
                placeholder="Enter Email"
                name="email"
                id="email"
                required
              />

              <label htmlFor="psw">
                <b>Password</b>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                id="psw"
                required
              />

              <label htmlFor="psw-repeat">
                <b>upoad your talent</b>
              </label>
              <input
                type="file"
                placeholder="upload your file"
                name="file"
                id="psw-repeat"
                required
              />
              <hr />
              <button type="submit" className={Styles.registerbtn}>
                upload
              </button>
            </div>

            <div className={Styles.registretion}></div>
          </div>

          {/* <img className={Styles.subscribe_btn} src={subscribe_btn} alt="" /> */}
        </div>

        {/* <img className={Styles.happy_childhood} src={happyChildhood} alt="" /> */}
      </div>

      <div className={Styles.pg4}>
        <img className={Styles.pg4_bg} src={bg4} alt="" />
        <img className={Styles.meerkat} src={meerkat} alt="" />
      </div>
      <div className={Styles.pg4}>
        <img className={Styles.tubby_kuma} src={tubby_kuma} alt="" />
        <div className={Styles.about}>
          <h1>About Us</h1>
          <p>
            Toonland is a fictitious place created for our kids to help is them
            learn about different aspects of life. The characters! of toonland
            are specially designed and are bascal on the '9 human intelligence
            Theory, which will help oun Reels learn about friendships a love,
            emotions, peace, and harmony. also downlood stickers and posters for
            free from the website
          </p>
        </div>
        <img className={Styles.pg4_bg} src={bg5} alt="" />
        <img className={Styles.Sub} src={Sub} alt="" />
        <img className={Styles.Sign_in} src={Sign_in} alt="" />
        <div className={Styles.Sign_in_form}>
          <div className={Styles.container_for_log_in}>
            <label>Username : </label>
            <input
              type="text"
              placeholder="Enter Username"
              name="username"
              required
            />
            <label>Password : </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
            />
            <input
              type="password"
              placeholder="conform your Password"
              name="password"
              required
            />
            <button type="submit">Login</button>
            <input type="checkbox" checked="checked" /> Remember me
            <button type="button" className={Styles.cancelbtn}>
              {" "}
              Cancel
            </button>
            <a href="/">Forgot password? </a>
          </div>
        </div>
        <Link to="/explore/mall">
          <div className={Styles.library}>
            <p>
              {" "}
              Develop your knowledge with our Recommended readings, DIY courses,
              Journals and knowledge cards.
            </p>

            <button className={Styles.btn}>explore more</button>
          </div>
          <img className={Styles.pg4_bg} src={bg6} alt="" />
          <div className={Styles.mall}>
            <h2 className={Styles.mall_heading}>Explore My Mall</h2>
            <button className={Styles.mall_btn}>Explore Now</button>
          </div>
        </Link>
        <div className={Styles.videos}>
          <p>These are some videos from toonland</p>
          <iframe
            src="https://www.youtube.com/embed/f_QwwjgycSc"
            title="YouTube   video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <iframe
            src="https://www.youtube.com/embed/pASwj4DW_qI"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <iframe
            src="https://www.youtube.com/embed/o_t7lC_cjVc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <iframe
            src="https://www.youtube.com/embed/LHL_BFbCN80"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <iframe
            src="https://www.youtube.com/embed/lU9wpxTPLIc"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <iframe
            src="https://www.youtube.com/embed/ZPcZHXrKA7U"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>

          <h3>For more interesting videos click the bellow button</h3>
          <button className={Styles.btn}>explore more</button>
        </div>
      </div>
    </>
  );
}
