import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import {Helmet} from "react-helmet";
import { BsPerson } from "react-icons/bs";


const PatientHeader = () => {
  return (
  <>
<Helmet>
  <style>{'body { background-color: rgb(49, 55, 61); }'}</style>
</Helmet>
       
       <div className="banner">
       <div className="header">
       <div className="leftSide">
       <div className="publicProfile"></div>
       <img id="avatar" src={Avatar}  alt="avatar" height={80}/>
       <div className="welcomeName">
       <h4 id="welcome"> Welcome <br /> <span id="name"> Anoud </span> </h4>
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
         <aside className="bodyLeft">
           <div className="navTitle">
             <p className="mainNav"> MAIN NAVIGATION </p>
           </div>
           <ul className="ulNav"> 
           <li className="nav"> <AiFillHome className="iconNav" /> <Link className="navLink" to="/Doctor">Home</Link> </li>
           <li className="nav"> <IoPersonAddSharp className="iconNav" /> <Link className="navLink" to="/AllPatients">Patients</Link> </li>
           <li className="nav"> <BsCalendarCheck className="iconNav"/> <Link className="navLink" to="/DoctorSchedule">Appointments</Link> </li>
           <li className="nav"> <IoIosPaper className="iconNav"/> New Readings </li>
           </ul>
         </aside>

         <div className="AddBtn"> 
      <button className="clicker" tabindex="1" > + </button>
      <button className="hiddendiv"> <Link className="navLink" to="/AddPatient"> <BsPerson  id="iconBtnPatient" /></Link></button>

      </div>
         
           </div>
           </div>
  </>
  );
};

export default PatientHeader;