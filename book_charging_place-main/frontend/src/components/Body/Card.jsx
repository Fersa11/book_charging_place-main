import { useState, useEffect } from "react";
import "./Card.css";
import Reusablebutton from "../../Features/Reusablebutton";
import Switchbutton from "../../Features/Switchbutton";

import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PersonIcon from "@mui/icons-material/Person";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { db } from "../../utils/firebase";
import { ref, set, onValue, update } from "firebase/database";

function Body(props) {
  const id = props.id;
  const [isChecked, setIsChecked] = useState(false);
  const [isMalfunction, setMalfunction] = useState(true);

  const [setTime, setSetTime] = useState(null);
  const [showRemainingTime, setShowRemainingTime] = useState({
    showHours: "",
    showMinutes: ""
  });

  const [inputName, setInputName] = useState("");

  function handleChangeMalfunc() {
    setMalfunction(!isMalfunction);
    setIsChecked(!isChecked);
  }
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      let diffHours = setTime.slice(0, 2) - now.slice(0, 2);
      if (diffHours < 0) {
        diffHours += 24;
      }
      let diffMinutes = setTime.slice(3, 5) - now.slice(3, 5);
      if (diffMinutes < 0) {
        diffMinutes += 60;
      }
      console.log(diffMinutes);
      console.log(diffHours);

      setShowRemainingTime({
        showHours: diffHours,
        showMinutes: diffMinutes
      });

      console.log(inputName);
    }, 5000);
    return () => clearInterval(interval);
  }, [setTime, setInputName]);
  // }

  //------------------

  //---------------------
  return (
    <div>
      <Card className="Card" style={{ opacity: isMalfunction ? "1" : "0.5" }}>
        <Card.Header className="Cardheader">
          <LocalParkingIcon className="Parkingicon" />
          <span className="Parkingslotname">{props.slotName}</span>
          <span>{props.id}</span>
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
            onChange={(e) => setInputName(e.target.value)}
            value={inputName}
          />
          <InputGroup.Text className="Inputgroupicon" id="Icon_duration">
            <AddAlarmIcon className="Cardbodyicon" />
          </InputGroup.Text>

          <Form.Control
            disabled={!isMalfunction}
            type="time"
            // min="07:00"
            // max="21:00"
            placeholder="Duration (h)"
            aria-label="Duration"
            className="Formcontrol"
            id="Inputform_duration"
            onChange={(e) => setSetTime(e.target.value)}
            // value={hhmm}
            required
          />

          <Reusablebutton
            type="submit"
            className="Reusablebutton"
            onClick={() => {
              handleBookNow();
              saveData();
            }}
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
