import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../Images/evangadi-logo.png";
import "./Footer.css";
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

function Footer() {
  return (
    <div className="footer ">
      <div className="container some row">
        <div className="footer_logo footer_content col-sm-12 col-md-4">
          <img src={logo} alt="Evangadi Logo" />
          <div className="row icons">
            <Link className="col" to="https://www.facebook.com/evangaditech" target="_blank">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link className="col" to="">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link className="col" to="https://www.instagram.com/evangaditech/" target="_blank">
              <i className="fab fa-instagram"></i>
            </Link>
          </div>
        </div>
        <div className="col-sm-12 col-md-4 footer_content">
          <h5 className="title">Useful Links</h5>
          <ul className="st">
            <li>
              <Link to="/how-it-works">How it Works</Link>
            </li>
            <li>
              <Link to="https://www.evangadi.com/legal/terms/" target="_blank">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="https://www.evangadi.com/legal/privacy/" target="_blank">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-sm-12 col-md-4 footer_content ">
          <h5 className="title">Contact Info</h5>
          <ul className="net">
            <li>Evangadi Networks</li>
            <li>support@evangadi.com</li>
            <li>+1-202-386-2702</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
