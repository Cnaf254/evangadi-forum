import React, { useContext, useEffect } from "react";
import logo from "../../Images/evangadi-logo-header.png";
import { Navbar, Container, Nav, NavbarToggle } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { userProvider } from "../../Context/UserProvider";


function Header({logOut}) {
  const [user,setUser]=useContext(userProvider)
  
  function handleButtonClick(){
    if (user){
      logOut()
    }
  }

  return (
    <Navbar expand="lg" className="navbar" fixed="top" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="Logo" className="navbar-logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="navbar-toggler-icon"
        >
          <span>
            <i
              className="fas fa-bars"
              style={{ color: "black", fontSize: "2em" }}
            ></i>
          </span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/home" className="black link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/how-it-works" className="black link">
              How it Works
            </Nav.Link>
          </Nav>
          <Nav className="m-0 m-md-3">
            <button className=" btn btn-success " onClick={handleButtonClick}>
              {user.userName ? "Log Out" : "SIGN IN"}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
