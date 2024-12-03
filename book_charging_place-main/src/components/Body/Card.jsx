import { useState } from "react";
import "./Card.css";
// import useLocalStorage from "../../hooks/useLocalStorage";

// import { hours, minutes, seconds } from "../../Features/Now";
import Reusablebutton from "../../Features/Reusablebutton";
import Switchbutton from "../../Features/Switchbutton";

import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PersonIcon from "@mui/icons-material/Person";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Body(props) {
  const [isChecked, setIsChecked] = useState(false);
  const [isMalfunction, setMalfunction] = useState(true);

  const [setTime, setSetTime] = useState({
    hours: "",
    minutes: ""
  });
  const [showRemainingTime, setShowRemainingTime] = useState({
    showHours: "",
    showMinutes: ""
  });

  const [inputName, setInputName] = useState("");

  function handleInputName(event) {
    setInputName(event.target.value);
    console.log(inputName);
  }

  function handleChangeMalfunc() {
    setMalfunction(!isMalfunction);
    setIsChecked(!isChecked);
  }

  function handleChangeDuration(event) {
    const chargingUntilString = event.target.value;
    const chargingUntil = chargingUntilString.split(":");
    setSetTime({
      hours: chargingUntil[0],
      minutes: chargingUntil[1]
    });
  }

  function handleBookNow() {
    const now = new Date().toLocaleTimeString();
    const currentHours = now.slice(0, 2);
    const currentMinutes = now.slice(3, 5);
    const timeInMin = currentHours * 60 + parseInt(currentMinutes);
    const chargingUntilMinutes = setTime.hours * 60 + parseInt(setTime.minutes);
    const remainingTimeMinutes = chargingUntilMinutes - timeInMin;
    // console.log(remainingTimeMinutes);

    const setHours = Math.floor(remainingTimeMinutes / 60);
    const setMinutes = remainingTimeMinutes % 60;

    setShowRemainingTime({
      showHours: setHours,
      showMinutes: setMinutes
    });
    setInterval(handleBookNow, 30000);
  }

  return (
    <div>
      <Card className="Card" style={{ opacity: isMalfunction ? "1" : "0.5" }}>
        <Card.Header className="Cardheader">
          <LocalParkingIcon className="Parkingicon" />
          <span className="Parkingslotname">{props.slotName}</span>
        </Card.Header>
        <Card.Body className="Cardbody">
          <InputGroup.Text className="Inputgroupicon" id="Icon_name">
            <PersonIcon className="Cardbodyicon" />
          </InputGroup.Text>
          <Form.Control
            disabled={!isMalfunction}
            type="text"
            placeholder="Name"
            aria-label="Username"
            className="Formcontrol"
            id="Inputform_name"
            onChange={handleInputName}
            value={inputName}
          />
          <InputGroup.Text className="Inputgroupicon" id="Icon_duration">
            <AddAlarmIcon className="Cardbodyicon" />
          </InputGroup.Text>

          <Form.Control
            disabled={!isMalfunction}
            type="time"
            min="07:00"
            max="21:00"
            placeholder="Duration (h)"
            aria-label="Duration"
            className="Formcontrol"
            id="Inputform_duration"
            onChange={handleChangeDuration}
            required
          />

          <Reusablebutton
            type="submit"
            className="Reusablebutton"
            onClick={handleBookNow}
          >
            Book now
          </Reusablebutton>

          <Card.Text className="Label_remainingtime">
            Approx. Remaining Time:
          </Card.Text>
          <Card.Text className="Remainingtime">
            {showRemainingTime.showHours} h {showRemainingTime.showMinutes} min.
          </Card.Text>
          <Switchbutton
            getEventFromReusableButton={handleChangeMalfunc}
            isChecked={isChecked}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Body;
