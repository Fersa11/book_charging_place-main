import React from "react";
import "./HomePage.css";
import Card from "../components/Body/Card.jsx";

function HomePage() {
  return (
    <div className="Appbody">
      <Card slotName="5A" id="1A" name="5A" />
      <Card slotName="5B" id="2" name="5B" />
      <Card slotName="6A" id="3" name="6A" />
      <Card slotName="6B" id="4" name="6B" />
      <Card slotName="7A" id="5" name="7A" />
      <Card slotName="7B" id="6" name="7B" />
    </div>
  );
}

export default HomePage;
