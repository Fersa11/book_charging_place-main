import React from "react";
import "./Switchbutton.css";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import HandymanIcon from "@mui/icons-material/Handyman";

function Switchbutton(props) {
  return (
    <div className="Buttonswitch">
      <InputGroup.Text className="Inputgroupicon" id="Icon_malfunction">
        <HandymanIcon className="Cardbodyicon" />
      </InputGroup.Text>
      <Form.Check
        reverse
        type="switch"
        id="switch"
        className="Formswitch"
        onChange={props.getEventFromReusableButton}
        checked={props.isChecked}
      />
      <span className="Label_toggler">Malfunction</span>
    </div>
  );
}

export default Switchbutton;
