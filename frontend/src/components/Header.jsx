import React from "react";
import PillNav from "./PillNav";
import "./Header.css";


const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-text-container">
          <h1 className="main-logo-text">
            PHARMA<span className="flow-highlight">FLOW</span>
          </h1>
          <h3 className="tagline-text">
            INTELLIGENT INVENTORY. FLAWLESS FUNCTION.
          </h3>
        </div>
      </div> 

      <div className="header-right">
        <PillNav
         
          items={[
            { label: "Home", href: "/home" },
            { label: "Inventory", href: "/inventory" },
            { label: "Suppliers", href: "/suppliers" },
            { label: "Reports", href: "/reports" },
            { label: "Logout", href: "/" },
          ]}
          activeHref="/"
          className="custom-pill-nav"
          ease="power2.easeOut"
          baseColor="#5ed7d6"
          pillColor="#1c232a"
          hoveredPillTextColor="#1c232a"
          pillTextColor="#ffffff"
        />
      </div>
    </header>
  );
};

export default Header;
