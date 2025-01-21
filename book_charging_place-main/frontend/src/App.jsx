import "./App.css";
import React from "react";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import Body_Header from "./components/Body/Body_Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import Clock from "./Features/Clock";

// import AnalogClock from "./components/Navigation/Analog";

function App() {
  return (
    <div className="Appall">
      <Navigation />
      <Body_Header />
      <Routes>
        <Route path="/home" element={<HomePage />} />
        {/* <Route path="/clock" element={<Clock />} /> */}
      </Routes>

      <div className="Appbody"></div>

      {/* <div className="Appfooter"> */}
      <Footer />
      {/* </div> */}
    </div>
  );
}

export default App;
