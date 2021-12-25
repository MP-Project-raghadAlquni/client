import React from "react";
import "./style.css";
import Logo2 from "../images/logo.png"
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";

const DoctorHome = () => {

  return <>
  <div className="header">
  <div className="leftSide">
  {/* <img src = {Logo2} alt="LOGO" height={100}/> */}
  <div className="publicProfile"></div>
  <img id="avatar" src={Avatar}  alt="avatar" height={80}/>
  <div className="welcomeName">
  <h4 id="welcome"> Welcome <br /> <span id="name"> Dr. Anoud </span> </h4>
  <div className="icons">
    <ul className="iconsul">
      <li id="profile"><BsPersonCircle /></li>
      <li id="chat"><BsChatFill /></li>
      <li id="logout"><IoIosLogOut /></li>

    </ul>
    
  </div>
  
  </div>
    </div>
  </div>
  </>;
};

export default DoctorHome;