import React, { useRef } from "react";

function Test() {
  const buttonRef = useRef();
  const focus = () => {
    console.log(buttonRef.current);
  };
  return (
    <div>
      <h1 ref={buttonRef}>Shabeer</h1>
      <button onClick={focus}>ok</button>
    </div>
  );
}

export default Test;
