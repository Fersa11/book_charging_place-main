import React, { children } from "react";
import "../Features/Reusablebutton.css";

import Button from "react-bootstrap/Button";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";

function Reusablebutton(props) {
  return (
    <span className="Custombutton">
      <ElectricCarIcon id="Icon_starttimer" className="Cardbodyicon" />
      <Button
        className="Button_reusable"
        aria-label="Start timer"
        onClick={props.onClick}
      >
        <span className="Button_name">{props.children}</span>
      </Button>
    </span>
  );
}

export default Reusablebutton;
