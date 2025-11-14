import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Logo from "../../assets/images/Logo.svg";

export default function Navbar({ active, onChangeActive }) {
  const navigate = useNavigate(); // React Router hook to programmatically navigate between pages

  // Menu items for the navbar
  const menuItems = [
    { key: "home", label: "Find Jobs" },
    { key: "company", label: "Company" },
    { key: "resumes", label: "Find Resumes" },
  ];

  return (
    <div className="navbar">
      {/* Logo section */}
      <div className="navbar__logo">
        <img
          src={Logo}
          alt="Logo"
          style={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/"); // Navigate to the home page
            onChangeActive("home"); // Set 'home' as the active menu item
          }}
        />
      </div>

      {/* Main menu */}
      <div className="navbar__menu">
        {menuItems.map((item) => (
          <p
            key={item.key}
            className={`navbar__menu-item ${active === item.key ? "active" : ""}`}
            style={{ cursor: "pointer" }}
            onClick={() => {
              onChangeActive(item.key); // Update the active menu item in parent state
              // Optionally, navigate to a route: navigate(`/${item.key}`);
            }}
          >
            {item.label}
          </p>
        ))}
      </div>

      {/* Profile avatar */}
      <div className="navbar__profile">
        <img
          src="/"
          alt="Profile"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/myprofile")} // Navigate to the profile page
        />
      </div>
    </div>
  );
}
