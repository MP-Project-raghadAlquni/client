import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { CgDanger } from "react-icons/cg";
import { BiBarChartSquare } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";


const DoctorHome = () => {
const [newReadings, setNewReadings] = useState([]);
const [numberReadings, setNumberReadings] = useState([]);


const state = useSelector((state) => {
  return state
});

useEffect(() => {
  getNewReadings()
})

const getNewReadings = async () => {
  const users = await axios.get(`${process.env.REACT_APP_BASE_URL}/newReadings`, 
  {
    headers: {
      Authorization: `Bearer ${state.Login.token}`,
    }
  })
  setNewReadings(users.data)
  setNumberReadings(users.data.length)
  
}

return (
  <>
  {newReadings.length && (
    <>
    {newReadings.map((readings) => {
      return (
        <>
       
  <div className="banner">
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
    <aside className="bodyLeft">
      <div className="navTitle">
        <p className="mainNav"> MAIN NAVIGATION </p>
      </div>
      <ul className="ulNav"> 
      <li className="nav"> <AiFillHome className="iconNav" /> Home </li>
      <li className="nav"> <IoPersonAddSharp className="iconNav"/> Patients </li>
      <li className="nav"> <BsCalendarCheck className="iconNav"/> Appointments </li>
      <li className="nav"> <IoIosPaper className="iconNav"/> New Readings </li>
      </ul>
    </aside>
    <aside className="bodyRight">
      <div className="insideBody">
      <h2 className="bodyHomeh2"> Home </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
      
      <div className="services">
          <aside id="patients">
           <h3 id="patient"> All Patient </h3>
           <BsFillPersonFill id="iconPatient"/>
           <h2 id="patientNum"> 27 </h2>
            </aside>

           <aside id="appointments">
           <h3 id="appointment"> All Appointment </h3>
           <BsCalendarCheck id="iconApointment"/>
           <h2 id="appointmentNum"> 27 </h2>
           </aside>

           <aside id="Charts">
           <h3 id="chart"> Charts </h3>
           <BiBarChartSquare id="iconChart"/> 
           <h2 id="chartNum"> 27 </h2>
           </aside>
      </div>

      <div className="ReadingsTables">
        <h3 id="tableTiltle"> New Readings </h3>
        <table className="table">
          <tr>
            <th className="danger"> <CgDanger /> </th>
            <th className="title"> Patient Name </th>
            <th className="title"> File Number </th>
            <th className="title"> Readings Number </th>
            <th className="title" id="title"> See More </th>
          </tr>

          <tr>
            <td> </td>
            <td className="sup"> {readings.byUser.fullName} </td>
            <td className="sup"> {readings.byUser.fileNumber} </td>
            <td className="sup"> {numberReadings} </td>
            <td className="sup" id="sup"> See More </td>
          </tr>
        </table>
      </div>
      </div>
      </aside>

      <div className="AddBtn"> 
      <button className="Add"> + </button>
      </div>
  </div>
  </div>
  </>
      )
    })
    }
  </>
  )}
  </>
  )
};


export default DoctorHome;