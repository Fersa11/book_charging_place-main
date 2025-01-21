import React from "react";
import "./Switchbutton.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

function Switchbuttonbooked(props) {
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
        // className="Formswitch"
        onChange={props.getEvent}
        // checked={props.isBooked}
        checked={props.isCheckedBooked}
        // onClick={props.ClickBookNow}
      />
      <span className="Label_toggler">{props.SwitchName}</span>
    </div>
  );
}

export default Switchbuttonbooked;
