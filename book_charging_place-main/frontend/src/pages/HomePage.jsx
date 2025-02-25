import React from "react";
import "./HomePage.css";
import Card from "../components/Body/Card.jsx";

function HomePage() {
  return (
    <div className="appbody">
      <Card slotName="5A" id="5A" name="5A" />
      <Card slotName="5B" id="5B" name="5B" />
      <Card slotName="6A" id="6A" name="6A" />
      <Card slotName="6B" id="6B" name="6B" />
      <Card slotName="7A" id="7A" name="7A" />
      <Card slotName="7B" id="7B" name="7B" />
    </div>
  );
}

export default HomePage;
