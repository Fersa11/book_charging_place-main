import React from "react";
import "./Switchbutton.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function SwitchbuttonMalfunction(props) {
  return (
    <div className="Buttonswitch" id={props.SwitchId}>
      {/* // <div className={props.SwitchClass}> */}
      <InputGroup.Text className="Inputgroupicon" id="Icon_malfunction">
        <span> {props.Icon}</span>
      </InputGroup.Text>
      <Form.Check
        reverse
        type="switch"
        // id="switch"
        id={props.malfunctionSwitch}
        // className="Formswitch"
        onChange={props.getEvent}
        // checked={props.isBooked}
        checked={props.isCheckedMalfunction}
        // onClick={props.ClickBookNow}
      />
      <span className="Label_toggler">{props.SwitchName}</span>
    </div>
  );
}

export default SwitchbuttonMalfunction;
