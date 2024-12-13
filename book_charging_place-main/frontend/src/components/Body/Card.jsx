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

//---------------------------
function body() {
  const [isChecked, setIsChecked] = useState(false);
  const [isMalfunction, setMalfunction] = useState(true);
  const [inputName, setInputName] = useState("");
  const id = props.id;

  const [setTime, setSetTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  //Dieser Effect wird ausgeführt, wenn die Komponente gemountet und die Zeit sich ändert.
  useEffect(() => {
    const interval = setInterval(() => {
      //Aktualisiere die Zeit
      setCurrentTime(new Date());
    }, 5000);
    //Periodische Berechnung
    if (setTime) {
      const timeDiff = setTime.getTime() - currentTime.getTime();
      const { hours, minutes } = calculateRemaingTime(timeDiff);
      //Update Firebase Start

      //Update Firebase Ende
    }
    // }, 5000);
    //Bereinigung von Intervall, wenn die Komponente unmoutet wird
    return () => clearInterval(interval);
  }, [setTime]);
  //Funktion zur Berechnung der verbleibenden Zeit
  const calculateRemaingTime = (difference) => {
    let hours = Math.floor(difference / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  };

  function handleChangeMalfunc() {
    setMalfunction(!isMalfunction);
    setIsChecked(!isChecked);
  }

  //Save data in DB
  function saveData() {
    // const db = getDatabase(app);
    const newDocRef = ref(db, `ladestationen/${id}`);

    set(newDocRef, {
      user: inputName,
      setTime: setTime,
      remainingTime: showRemainingTime
      // statusStation: isMalfunction
    })
      .then(() => {
        alert("Data saved sucessfully");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
  }

  //Read data from DB
  const hhmm = setTime.hours + ":" + setTime.minutes;

  useEffect(() => {
    // const db = getDatabase(app);
    const newDocRef = ref(db, `ladestationen/${id}`);
    onValue(newDocRef, (snapshot) => {
      const data = snapshot.val();
      setInputName(data.user || "");
      const {
        setTime: { hours, minutes }
      } = data;
      const {
        remainingTime: { showHours, showMinutes }
      } = data;
      setSetTime({
        hours: hours,
        minutes: minutes
      });
      setShowRemainingTime({
        showHours: showHours,
        showMinutes: showMinutes
      });
    });
  }, [id, setShowRemainingTime, setSetTime]);

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
          {/* Input SetTime */}
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
            value={hhmm}
            required
          />
          <Reusablebutton
            type="submit"
            className="Reusablebutton"
            onClick={() => {
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

export default body;
