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
  const [isMalfunction, setMalfunction] = useState(false);

  const [setTime, setSetTime] = useState("");
  const [showRemainingTime, setShowRemainingTime] = useState({
    showHours: "",
    showMinutes: ""
  });

  const [inputName, setInputName] = useState("");
  const [message, setMessage] = useState("");
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
      let setTimeInMinutes = setTime.slice(3, 5) * 1 + setTime.slice(0, 2) * 60;
      let nowInMinutes = now.slice(3, 5) * 1 + now.slice(0, 2) * 60;
      let diffTimeInMinutes = setTimeInMinutes - nowInMinutes;
      let diffHours = Math.floor(diffTimeInMinutes / 60);
      let diffMinutes = diffTimeInMinutes % 60;

      // const initialsetTimeHours = Math.floor((nowInMinutes + 240) / 60);
      // const initialsetTimeMinutes = (nowInMinutes + 240) % 60;
      // console.log(initialsetTimeHours + ":" + initialsetTimeMinutes);
      // console.log(typeof initialsetTimeHours);
      // const initialsetTime =
      //   initialsetTimeHours.toString() + ":" + initialsetTimeMinutes.toString();
      // setSetTime(initialsetTime);

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

      if ((diffHours === 0 && diffMinutes === 0) || setTime < now) {
        setMessage("Available for:");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          remainingTime: "",
          malfunction: isMalfunction
        });
      } else if (isMalfunction) {
        // setMessage("Call service");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          remainingTime: "",
          malfunction: isMalfunction
        });
      } else if (setTime < now) {
        setMessage("Available for:");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          remainingTime: "",
          malfunction: isMalfunction
        });
        // .then(() => {
        //   alert("Set time must be greater than the current time");
        // })
        // .catch((error) => {
        //   alert("error: ", error.message);
        // });
        console.log("set time should greater than current time");
      } else {
        // setMessage("xy");
        // setMessage("Available for:");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          // user: inputName,
          // setTime: setTime,
          // remainingTime: showRemainingTime,
          malfunction: isMalfunction
        });
      }
      setShowRemainingTime({
        showHours: diffHours,
        showMinutes: diffMinutes
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [showRemainingTime, isMalfunction]);

  //Save Data in firebase
  function saveData() {
    setMessage("Approx. Remaining Time:");
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
      setSetTime(data.setTime);
      setShowRemainingTime(data.remainingTime);
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
            name="settime"
            // min="07:00"
            // max="10:00"
            placeholder="Duration (h)"
            aria-label="Duration"
            className="Formcontrol"
            id="Inputform_duration"
            onChange={(e) => setSetTime(e.target.value)}
            // onChange={handleSetTime}
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
            {/* Approx. Remaining Time: */}
            {message}
          </Card.Text>
          <Card.Text className="Remainingtime">
            {showRemainingTime.showHours} h {showRemainingTime.showMinutes} min.
          </Card.Text>
          <Switchbutton
            getEventFromReusableButton={handleChangeMalfunc}
            isChecked={isMalfunction}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Body;
