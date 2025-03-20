import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="about">
        <div className="company">
          <h2>Company</h2>
          <ul>
            <li>About us</li>
            <li>Team</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Follow us</li>
          </ul>
        </div>
        <div className="Legal">
          <h2>Legal</h2>
          <ul>
            <li>Terms & Conditions</li>
            <li>Refund & Cancellation</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div className="follow-us">
          <h2>Follow us</h2>
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <p>Recieve exclusive offers in your mailbox</p>
          <form>
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
      <div className="copyrights">
        <p>
          All rights reserved <i className="fa-solid fa-copyright"></i>{" "}
          FoodForia
        </p>
      </div>
    </div>
  );
}
