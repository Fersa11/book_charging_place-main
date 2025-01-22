import React from "react";
import { useEffect } from "react";

function readData() {
  useEffect(() => {
    const newDocRef = ref(db, `ladestationen/${id}`);
    onValue(newDocRef, (snapshot) => {
      const data = snapshot.val();
      setInputName(data.user || "");
      setSetTime(data.setTime);
      // setShowRemainingTime(data.remainingTime);
      setMalfunction(data.malfunction);
      setIsBooked(data.booked);
    });
    // return () => newDocRef.off();
  }, [id]);
}

export default readData;
