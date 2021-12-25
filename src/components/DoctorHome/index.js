import React from "react";
import "./style.css";
import Logo2 from "../images/logo.png"
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";

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

  <div className="body">
    <div className="bodyLeft">
      <div className="navTitle">
        <p className="mainNav"> MAIN NAVIGATION </p>
      </div>
      <ul className="ulNav"> 
      <li className="nav"> <AiFillHome className="iconNav" /> Home </li>
      <li className="nav"> <IoPersonAddSharp className="iconNav"/> Patients </li>
      <li className="nav"> <BsCalendarCheck className="iconNav"/> Appointments </li>
      <li className="nav"> <IoIosPaper className="iconNav"/> New Readings </li>
      </ul>
    </div>
    <div className="bodyRight">
      <h2 className="bodyHomeh2"> Home </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
      </div>


    
  </div>

  </>;
};

export default DoctorHome;