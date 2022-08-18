import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";

function Home() {
  
  return (
    <div>
      hello
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Home;
