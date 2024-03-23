// import React from "react";
// import Logo from "../../assets/img/footerlogo.png";
import { AiFillFacebook } from "react-icons/ai";
import { TiSocialInstagram } from "react-icons/ti";
import { AiFillYoutube } from "react-icons/ai";
import evangadiFooterLogo from '../../Images/evangadi-logo.png'

import  './footer.css'
function Footer() {
  return (
    <div className="footer-top mt-1">
      <div className="container">
        <div className="footer-bottom-content clearfix">
          <div className="row">
            <div className="col-lg-4 col-md-4">
              <div className="logo-footer">
                <a className="navbar-brand" href="/">
                  <img
                    src={evangadiFooterLogo}
                    alt="evangadi footer logo"
                  />
                </a>
                
              </div>

              <ul className="footer-social-list list-social list-inline">
                <li>
                  <a href="https://www.facebook.com/EthiopiansNetwork">
                    <AiFillFacebook />
                    <i className="social_facebook "></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/evangaditech/">
                    <TiSocialInstagram />
                    <i className="social_instagram "></i>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/c/weareethiopians">
                    <AiFillYoutube />
                    <i className="social_youtube "></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4 ">
              
              <ul className="list-menu">
              <h5>Useful Link</h5>
                <li>
                  <a className="text-decoration-none" href="/explained">How it works </a>
                </li>
                <li>
                  <a className="text-decoration-none" href="/legal/terms/">Terms of Service</a>
                </li>
                <li>
                  <a className="text-decoration-none" href="/legal/privacy/">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-4 col-md-4">
             
              <ul className="list-menu contact-list">
              <h5 className="">Contact Info</h5>
                <li>Evangadi Networks</li>
                <li>support@evangadi.com</li>
                <li>+1-202-386-2702</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
