import { useState, useEffect } from "react";
import "./Card.css";
// import Reusablebutton from "../../Features/Reusablebutton";
import Switchbutton from "../../Features/SwitchbuttonMalfunction";

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
  const [isMalfunction, setMalfunction] = useState(false);
  const [setTime, setSetTime] = useState("");
  const [showRemainingTime, setShowRemainingTime] = useState({
    showHours: "0",
    showMinutes: "0"
  });
  const [readDataDb, setReadDataDb] = useState({
    remainingTimeDb: "00:00"
  });
  const [inputName, setInputName] = useState("Name");

  function handleChangeMalfunc() {
    setMalfunction((prevValue) => !prevValue);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      });

      //Calculate difference between now and setTime. Add for hours differnece 24 h, and for minutes difference 60min if diff is negative.
      let setTimeInMinutes =
        setTime.toString().slice(3, 5) * 1 +
        setTime.toString().slice(0, 2) * 60;
      let nowInMinutes = now.slice(3, 5) * 1 + now.slice(0, 2) * 60;
      let diffTimeInMinutes = setTimeInMinutes - nowInMinutes;
      let diffHours = Math.floor(diffTimeInMinutes / 60);
      let diffMinutes = diffTimeInMinutes % 60;

      if (diffHours < 0) {
        diffHours += 24;
      } else {
        diffHours;
      }
      diffMinutes = setTime.toString().slice(3, 5) - now.slice(3, 5);
      if (diffMinutes < 0) {
        diffMinutes += 60;
      } else {
        diffMinutes;
      }
      const isTimerExpired = diffHours + diffMinutes;

      if (isTimerExpired === 0) {
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "00:00",
          remainingTime: ""
          // malfunction: isMalfunction
        });
      } else if (isMalfunction) {
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          remainingTime: "",
          malfunction: isMalfunction
        });
        clearInterval(interval);
      } else if (!isMalfunction) {
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          //user: inputName,
          // setTime: setTime,
          remainingTime: showRemainingTime,
          malfunction: isMalfunction
        });
      }

      // setShowRemainingTime((prevValue) => ({
      //   ...prevValue,
      //   showHours: diffHours,
      //   showMinutes: diffMinutes
      // }));
    }, 5000);
    return () => clearInterval(interval);
  }, [showRemainingTime, isMalfunction]);

  useEffect(() => {
    const now = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
    //Calculate difference between now and setTime. Add for hours differnece 24 h, and for minutes difference 60min if diff is negative.
    let setTimeInMinutes =
      setTime.toString().slice(3, 5) * 1 + setTime.toString().slice(0, 2) * 60;
    let nowInMinutes = now.slice(3, 5) * 1 + now.slice(0, 2) * 60;
    let diffTimeInMinutes = setTimeInMinutes - nowInMinutes;
    let diffHours = Math.floor(diffTimeInMinutes / 60);
    let diffMinutes = diffTimeInMinutes % 60;

    if (diffHours < 0) {
      diffHours += 24;
    } else {
      diffHours;
    }
    diffMinutes = setTime.toString().slice(3, 5) - now.slice(3, 5);
    if (diffMinutes < 0) {
      diffMinutes += 60;
    } else {
      diffMinutes;
    }
    setShowRemainingTime((prevValue) => ({
      ...prevValue,
      showHours: diffHours,
      showMinutes: diffMinutes
    }));
  }, [setTime]);

  //Save Data in firebase
  function saveData() {
    const newDocRef = ref(db, `ladestationen/${id}`);
    set(newDocRef, {
      user: inputName,
      setTime: setTime,
      remainingTime: showRemainingTime,
      malfunction: isMalfunction
    })
      .then(() => {
        alert("Data saved sucessfully");
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
  }

  //---------------------
  //Read data from DB
  useEffect(() => {
    const newDocRef = ref(db, `ladestationen/${id}`);
    onValue(newDocRef, (snapshot) => {
      const data = snapshot.val();
      setInputName(data.user || "");
      // setSetTime(data.setTime);
      setShowRemainingTime(data.remainingTime);
      setReadDataDb(data.remainingTime);
      setMalfunction(data.malfunction);
    });
    // return () => newDocRef.off();
  }, [id]);

  //----------------------
  return (
    <div>
      <Card className="Card" style={{ opacity: !isMalfunction ? "1" : "0.5" }}>
        <Card.Header className="Cardheader">
          <LocalParkingIcon className="Parkingicon" />
          <span className="Parkingslotname">{props.slotName}</span>
          {/* <span>{props.id}</span> */}
          <span>{setTime}</span>
        </Card.Header>
        <Card.Body className="Cardbody">
          <InputGroup.Text className="Inputgroupicon" id="Icon_name">
            <PersonIcon className="Cardbodyicon" />
          </InputGroup.Text>
          <Form.Control
            disabled={isMalfunction}
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
            disabled={isMalfunction}
            type="time"
            // min="07:00"
            // max="21:00"
            placeholder="Duration (h)"
            name="setTimeH"
            aria-label="Duration"
            className="Formcontrol"
            id="Inputform_duration"
            onChange={(e) => setSetTime(e.target.value)}
            value={setTime}
            required
          />

          <Reusablebutton
            type="submit"
            className="Reusablebutton"
            onClick={saveData}
          >
            Book now
          </Reusablebutton>

          <Card.Text className="Label_remainingtime">
            Approx. Remaining Time:
          </Card.Text>
          <Card.Text className="Remainingtime">
            {/* {showRemainingTime.showHours} h {showRemainingTime.showMinutes} min.{" "} */}
            {readDataDb.showHours} h {readDataDb.showMinutes} min.
          </Card.Text>
          <Switchbutton
            getEventFromReusableButton={handleChangeMalfunc}
            isCheckedMalfunction={isMalfunction}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Body;
