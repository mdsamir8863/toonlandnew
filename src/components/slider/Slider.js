import React from "react";
import Styles from "./styles.module.scss";
import slider1 from "../../assets/slider1.jpg";
import slider2 from "../../assets/slider2.jpg";
import slider3 from "../../assets/slider3.jpg";
import slider4 from "../../assets/slider4.jpg";
import left from "../../assets/chevron-left.png";

const colors = [slider1, slider2, slider3, slider4];

// const colors = ["#0088FE", "#00C49F", "#FFBB28"];
const delay = 2500;

function Slider() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className={Styles.container}>
      <div className={Styles.slideshow}>
        <div
          className={Styles.slideshowSlider}
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {colors.map((backgroundColor, index) => (
            <img
              className={Styles.slide}
              key={index}
              src={backgroundColor}
              alt="p"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Slider;

// <div className={Styles.slideshowDots}>
// {colors.map((_, idx) => (
//   <div
//     key={idx}
//     className={`${Styles.slideshowDot} ${
//       index === idx ? `${Styles.active}` : ""
//     }`}
//     onClick={() => {
//       setIndex(idx);
//     }}
//   ></div>
// ))}
// </div>

// <img
//   className={Styles.leftarrow}
//   style={{ width: "3rem" }}
//   src={left}
//   alt="o"
// />
// <img
//   className={Styles.rightarrow}
//   style={{ width: "3rem", transform: "rotate(180deg)" }}
//   src={left}
//   alt="o"
// />
