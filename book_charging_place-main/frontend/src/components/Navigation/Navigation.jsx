import { React } from "react";
import Clock from "../../Features/Clock";
import { weekDayName, dayOfMonth, month } from "../../Features/Now";

import { Nav, Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import "./Navigation.css";

function Navigation() {
  return (
    <Navbar collapseOnSelect expand="md" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Brand href="#home">Booking of Charging Stations </Navbar.Brand>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="pills" defaultActiveKey="/home" className="mr-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          {/* <Nav.Link href="/clock">Option</Nav.Link> */}
        </Nav>
      </Navbar.Collapse>
      <Container className="d-none d-md-block">
        <Container className="Dateclock">
          <Navbar.Text className="dayofmonth">{dayOfMonth}</Navbar.Text>
          <Navbar.Text className="month">{month} </Navbar.Text>
          <Navbar.Text className="weekday">{weekDayName}</Navbar.Text>
          <Clock />
        </Container>
      </Container>
    </Navbar>
  );
}

export default Navigation;
