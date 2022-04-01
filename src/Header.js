import React from "react";
import "./css/Header.css";
import logo from "./images/blockchain.png";
import DateTime from "./DateTime";

function Header(props) {
  return (
    <nav className="header">
      {/* logo */}

      <img src={logo} alt="Blockchain" className="header__logo" />

      {/* User  */}
      <div className="header__nav">
        {/* signin */}

        <div className="header_mainheading">
          <h1>SUPPLYCHAIN LOGISTICS MANAGEMENT BASED ON ETHEREUM</h1>
        </div>

        {/* Date Time  */}

        <div className="header__option">
          <span className="header__optionline2">
            <p>{props.accountAddress}</p>
            <DateTime></DateTime>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Header;
