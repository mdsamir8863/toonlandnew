import React from "react";
import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import Styles from "./login.module.scss";
import Loader from "../../components/loader/Loader";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";
import { publicRequest } from "../../requestMethod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Auth() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const [errMsg, setErrMsg] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [credentialError, setCredentialError] = React.useState("");

  const [signUp, setSignUp] = React.useState(true);

  const registerCall = async (xx) => {
    // if (xx.password !== xx.confirmPassword) {
    //   alert("Password and Confirm Password must be same");
    //   return;
    // }
    try {
      await publicRequest
        .post(`auth/register`, formData)
        .then((res) => {
          console.log("Account succesfully registered..Login Below!");
        })
        .catch((err) => {
          alert("User already exists");
        });
      setTimeout(function () {
        setSignUp(false);
      }, 1000);
      toast("Account Created successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    const { name, value } = e.target;

    switch (name) {
      case "username":
        value.length < 3
          ? setErrMsg({
              ...errMsg,
              username: "Username must be at least 3 characters",
            })
          : setErrMsg({ ...errMsg, username: "" });
        break;
      case "email":
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
          ? setErrMsg({ ...errMsg, email: "" })
          : setErrMsg({
              ...errMsg,
              email: "Email must be valid",
            });
        break;
      case "password":
        value.length < 6
          ? setErrMsg({
              ...errMsg,
              password: "Password must be at least 6 characters",
            })
          : setErrMsg({ ...errMsg, password: "" });
        break;
      case "confirmPassword":
        value !== formData.password
          ? setErrMsg({
              ...errMsg,
              confirmPassword: "Password and Confirm Password must be same",
            })
          : setErrMsg({ ...errMsg, confirmPassword: "" });
        break;
      default:
        break;
    }
    console.log(errMsg, "s");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const readyToSignUp =
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !errMsg.username &&
      !errMsg.email &&
      !errMsg.password &&
      !errMsg.confirmPassword;

    try {
      if (signUp) {
        readyToSignUp
          ? registerCall(formData)
          : alert("Fill the form correctly");
      } else login(dispatch, formData);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className={Styles.form}>
        {credentialError}
        <img src={logo} alt="logo" />
        {signUp && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
        )}
        {errMsg.email && <p className={Styles.errMsg}>{errMsg.email}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
        />
        {errMsg.username && <p className={Styles.errMsg}>{errMsg.username}</p>}
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        {errMsg.password && <p className={Styles.errMsg}>{errMsg.password}</p>}
        {signUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
          />
        )}
        {errMsg.confirmPassword && (
          <p className={Styles.errMsg}>{errMsg.confirmPassword}</p>
        )}
        {signUp ? (
          <button type="submit" value="">
            {isFetching ? <Loader /> : "Sign Up"}
          </button>
        ) : (
          <button type="submit" value="">
            {isFetching ? <Loader /> : "Sign In"}
          </button>
        )}
        <span className={Styles.signUp} onClick={() => setSignUp(!signUp)}>
          {/* {signUp ? "Already have an Account? Sign In" : "No account ? Sign Up"} */}
          {signUp ? "Registered ? Sign In" : "No account ? Sign Up"}
        </span>
      </form>
    </>
  );
}
