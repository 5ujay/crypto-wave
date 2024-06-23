import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import icon from "../../assets/arrow_icon.png";
import { useCoin } from "../../context/CoinContext";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useCoin();

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "inr": {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      default: {
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      }
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <img src={logo} alt="Crypto Wave Logo" className="logo" />
        Crypto Wave
      </Link>
      <ul>
        <NavLink to="/">Home</NavLink>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="inr">INR</option>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
        </select>
      </div>
    </div>
  );
};
export default Navbar;
