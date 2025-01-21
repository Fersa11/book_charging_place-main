import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router";
import CookieConsent from "react-cookie-consent";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CookieConsent
        enableDeclineButton
        location="bottom"
        buttonText="Accept"
        // cookieName="myAwesomeCookieName2"
        style={{ background: "#2B373B" }}
        buttonStyle={{
          color: "white",
          fontSize: "13px",
          backgroundColor: "#1162b1"
        }}
        expires={150}
      >
        This website uses cookies to enhance the user experience.{" "}
        {/* <span style={{ fontSize: "10px" }}>This bit of text is smaller :O</span> */}
      </CookieConsent>
      <App />
    </BrowserRouter>
  </StrictMode>
);
