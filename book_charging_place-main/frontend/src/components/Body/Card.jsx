import { useState, useEffect } from "react";
import "./Card.css";
import SwitchbuttonMalfunction from "../../Features/SwitchbuttonMalfunction";
import SwitchbuttonBooked from "../../Features/SwitchbuttonBooked";

import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PersonIcon from "@mui/icons-material/Person";
import AddAlarmIcon from "@mui/icons-material/AddAlarm";
import HandymanIcon from "@mui/icons-material/Handyman";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";

import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { db } from "../../utils/firebase";
import { ref, set, onValue, update } from "firebase/database";

function Body(props) {
  const id = props.id;
  const [isMalfunction, setMalfunction] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

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

  //Read data from DB
  useEffect(() => {
    const newDocRef = ref(db, `ladestationen/${id}`);
    onValue(newDocRef, (snapshot) => {
      const data = snapshot.val();
      setInputName(data.user || "");
      setSetTime(data.setTime);
      // setShowRemainingTime(data.remainingTime);
      setMessage(data.message);
      setMalfunction(data.malfunction);
      setIsBooked(data.booked);
    });
    // return () => newDocRef.off();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().toLocaleString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });

      //Calculate difference between now and setTime. Add for hours differnece 24 h, and for minutes difference 60min if diff is negative.
      let setTimeInMinutes = setTime.slice(3, 5) * 1 + setTime.slice(0, 2) * 60;
      let nowInMinutes =
        parseInt(now.split(":")[0]) * 60 + parseInt(now.split(":")[1]);
      let diffTimeInMinutes = setTimeInMinutes - nowInMinutes;
      let diffHours = Math.floor(diffTimeInMinutes / 60);
      let diffMinutes = diffTimeInMinutes % 60;
      //Is settime bigger than now
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

      if (isMalfunction === true) {
        setIsBooked(false);
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          // remainingTime: "",
          message: "Call service",
          booked: isBooked,
          malfunction: isMalfunction
        });
      } else if (diffHours === 0 && diffMinutes === 0) {
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          message: "Available for:",
          booked: !isBooked
        });
      } else if (isBooked === false && isMalfunction === false) {
        // setMessage("Available for:");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          message: "Available for:",
          // remainingTime: "",
          // booked: !isBooked,
          malfunction: isMalfunction
        });
      } else if (setTime < now) {
        setMessage("Available for:");
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          user: "",
          setTime: "",
          remainingTime: "",
          // malfunction: isMalfunction
          booked: !isBooked
        });
      } else {
        const newDocRef = ref(db, `ladestationen/${id}`);
        update(newDocRef, {
          // user: inputName,
          // setTime: setTime,
          // remainingTime: showRemainingTime
          // booked: isBooked,
          // malfunction: isMalfunction
        });
      }
      setShowRemainingTime((prevValue) => ({
        ...prevValue,
        showHours: diffHours,
        showMinutes: diffMinutes
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, [showRemainingTime, isMalfunction, isBooked]);

  //***Save Data in firebase***
  function handleBookNow(event) {
    setIsBooked(event.target.checked);
    // setMessage("Approx. Remaining Time:");
    const newDocRef = ref(db, `ladestationen/${id}`);
    set(newDocRef, {
      user: inputName,
      setTime: setTime,
      // remainingTime: showRemainingTime,
      booked: !isBooked,
      message: "Approx. Remaining Time:",
      malfunction: isMalfunction
    })
      .then(() => {
        if (isBooked === false) {
          alert("Data saved sucessfully");
        }
      })
      .catch((error) => {
        alert("error: ", error.message);
      });
    // }
  }

  return (
    <div>
      <Card className="Card" style={{ opacity: !isMalfunction ? "1" : "0.5" }}>
        <Card.Header className="Cardheader">
          <LocalParkingIcon className="Parkingicon" />
          <span className="Parkingslotname">{props.slotName}</span>
          {/* <span>{props.id}</span> */}
          {/* <span>{setTime}</span> */}
        </Card.Header>
        <Card.Body className="Cardbody">
          <InputGroup.Text className="Inputgroupicon" id="Icon_name">
            <PersonIcon className="Cardbodyicon" />
          </InputGroup.Text>
          <Form.Control
            disabled={isMalfunction || isBooked}
            // autoComplete="true"
            type="text"
            name="name"
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
            disabled={isMalfunction || isBooked}
            type="time"
            name="settime"
            placeholder="Duration (h)"
            aria-label="Duration"
            className="Formcontrol"
            id="Inputform_duration"
            onChange={(e) => setSetTime(e.target.value)}
            // onChange={handleSetTime}
            value={setTime}
            required
          />
          <SwitchbuttonBooked
            // getEvent={}
            // isCheckedMalfunction={}
            name="BookNow"
            getEvent={handleBookNow}
            SwitchId="IdBookNow"
            SwitchClass="Buttonswitch"
            SwitchName="Book Now"
            Icon=<ElectricCarIcon color="red" />
            isCheckedBooked={isBooked}
            key={props.id}
            type="submit"
            // className="Reusablebutton"
          />
          <Card.Text className="Label_remainingtime">{message}</Card.Text>
          <Card.Text className="Remainingtime">
            {showRemainingTime.showHours} h {showRemainingTime.showMinutes} min.
          </Card.Text>
          <SwitchbuttonMalfunction
            SwitchId="IdMalfunction"
            getEvent={handleChangeMalfunc}
            isCheckedMalfunction={isMalfunction}
            SwitchName="Malfunction"
            Icon=<HandymanIcon />
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Body;
