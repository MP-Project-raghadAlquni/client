import React from "react";
import "./style.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";


const Home = () => {
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split("/");


  return <div>
      <ul>
      <li className="logo"><img className="logo" src={logo} alt="logo" height={70}/></li>
      <li className={splitLocation[1] === "" ? "active" : ""}>
          <Link to="/signup1">New Doctor</Link>{" "}
      </li>
      </ul>
      </div>
};

export default Home;