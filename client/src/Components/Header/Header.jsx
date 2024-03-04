import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../../App";
import evangadiLogo from "../../Images/evangadi-logo-header.png";
import { AiOutlineMenu } from "react-icons/ai";
import classes from './header.module.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 760);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      logout();
    } else {
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("token", "");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setUser({});
      setIsLoggedIn(true);
    } else {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, [setUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 760);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={classes.header_container}>

{/* <div> 
        <img src={evangadiLogo} alt="evangadi-logo" />
      </div>
      {isMobile ? (
        <div className={classes.menu_container}>
          <div className={classes.menu_icon} onClick={toggleMenu}>
            <AiOutlineMenu size={24} />
          </div>
          {isMenuOpen && (
            <div className={classes.menu_items}>
              <a href="/home" onClick={() => setIsMenuOpen(false)}>Home</a>
              <a href="" onClick={() => setIsMenuOpen(false)}>How It Works</a>
              {isLoggedIn ? (
                <button onClick={handleButtonClick}>Logout</button>
              ) : (
                <button onClick={handleButtonClick}>Sign In</button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className={classes.large}>
          <Link to="/home">Home</Link>
          <Link to="">How It Works</Link>
          {isLoggedIn ? (
            <button onClick={handleButtonClick}>Logout</button>
          ) : (
            <button onClick={handleButtonClick}>Sign In</button>
          )}
        </div>
      )} */}

<nav class="navbar p-3 navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <a class="navbar-brand" href="#"><img src={evangadiLogo} alt="evangadi-logo" /></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end fw-semibold " id="navbarNav">
      <ul class="navbar-nav"> 
        <li class="nav-item align-items-center d-flex">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li> 
        <li class="nav-item align-items-center d-flex"> 
          <a class="nav-link" href="#">How It Works </a>
        </li>
        <li class="nav-item align-items-center d-flex">
          <a class="nav-link" href="#">
          {isLoggedIn ? (
                <button className="btn btn-primary fw-bold px-5 action-btn" onClick={handleButtonClick}>Logout</button>
              ) : (
                <button className="btn btn-primary fw-bold px-5 action-btn" onClick={handleButtonClick}>Sign In</button>
              )}
          </a>
        </li>
        
      </ul>
    </div>
  </div>
</nav>

    </section>
  );
}

export default Header;
