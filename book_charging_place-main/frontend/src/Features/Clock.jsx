import { useEffect, useState } from "react";
import React from "react";

import "./Clock.css";

// function Clockfunction {
//   state = {
//     secondRatio: 0;
//     minuteRatio: 0;
//     hourRatio:0;
//   }
// }

// setClock = () =>
//   const currentDate = new Date();

// let minuteRatio = (secondRatio + minutes) / 60;
// let hourRatio = (minuteRatio + hours) / 12;
function clock() {
  const [ratio, setRatio] = useState({
    second: "",
    minute: "",
    hour: ""
  });
  useEffect(() => {
    // function moveClock({ hourRatio, minuteRatio, secondRatio }) {
    const interval = setInterval(() => {
      const now = new Date();
      let secondRatio = now.getSeconds() / 60;
      let minuteRatio = (secondRatio + now.getMinutes()) / 60;
      let hourRatio = (minuteRatio + now.getHours()) / 12;
      // console.log(secondRatio);

      setRatio((prevValue) => ({
        ...prevValue,
        second: secondRatio,
        minute: minuteRatio,
        hour: hourRatio
      }));
      // console.log(ratio.second);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="clock">
      <div
        className="hand hour"
        style={{ transform: `translate(-50%) rotate(${ratio.hour * 360}deg)` }}
      ></div>
      <div
        className="hand minute"
        style={{
          transform: `translate(-50%) rotate(${ratio.minute * 360}deg)`
        }}
      ></div>
      <div
        className="hand second"
        style={{
          transform: `translate(-50%) rotate(${ratio.second * 360}deg)`
        }}
      ></div>
      <div className="number number1">
        <div>1</div>
      </div>
      <div className="number number2">
        <div>2</div>
      </div>
      <div className="number number3">
        <div>3</div>
      </div>
      <div className="number number4">
        <div>4</div>
      </div>
      <div className="number number5">
        <div>5</div>
      </div>
      <div className="number number6">
        <div>6</div>
      </div>
      <div className="number number7">
        <div>7</div>
      </div>
      <div className="number number8">
        <div>8</div>
      </div>
      <div className="number number9">
        <div>9</div>
      </div>
      <div className="number number10">
        <div>10</div>
      </div>
      <div className="number number11">
        <div>11</div>
      </div>
      <div className="number number12">
        <div>12</div>
      </div>
    </div>
  );
}

export default clock;
