import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/apiCalls";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };
  return (
    <div>
      <title>SIGN IN</title>
      <form>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} disabled={isFetching}>
          LOGIN
        </button>
        {error && <span>Something went wrong...</span>}
        <span>DO NOT YOU REMEMBER THE PASSWORD?</span>
        <span>CREATE A NEW ACCOUNT</span>
      </form>
    </div>
  );
};

export default Login;
