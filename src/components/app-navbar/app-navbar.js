import './app-navbar.css';
import * as React from 'react';
import { NavLink } from "react-router-dom";


function AppNavbar() {
  let activeStyle = {
    textDecoration: "underline",
  };

  return (
    <div className="AppNavbar">
        <NavLink 
          to="/shop" 
          style={({ isActive }) =>
              isActive ? activeStyle : undefined
        }>
          Shop
        </NavLink>
        <div className="vl"></div>
        <NavLink 
          to="/shopping-cart" 
          style={({ isActive }) =>
              isActive ? activeStyle : undefined
        }>
          Shopping cart
        </NavLink>
    </div>
  );
}

export default AppNavbar;
