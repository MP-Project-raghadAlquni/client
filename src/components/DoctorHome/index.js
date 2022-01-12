import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import {Helmet} from "react-helmet";
import DoctorHeader from "../DoctorHeader";
import Login from "../Login";



const DoctorHome = () => {
const navigate = useNavigate();
const [newReadings, setNewReadings] = useState([]);
const [patients, setPatients] = useState([]);
const [numberReadings, setNumberReadings] = useState([]);
const [apppointment, setApppointment] = useState([]);


const state = useSelector((state) => {
  return state;
});

useEffect(() => {
  getNewReadings()
}, [])

useEffect(() => {
  getDoctorAppointments()
}, [])

useEffect(() => {
  getallverifiedPatient()
}, [])

const getNewReadings = async () => {
  const users = await axios.get(`${process.env.REACT_APP_BASE_URL}/newReadings`, 
  {
    headers: {
      Authorization: `Bearer ${state.Login.token}`,
    }
  })
  setNewReadings(users.data)
  console.log(users);
  setNumberReadings(users.data.length)
}

const onePaitent = (id) => {
  console.log(id);
  navigate(`/Patients/${id}`);
};

const getDoctorAppointments = async () => {
  const appointment = await axios.get(`${process.env.REACT_APP_BASE_URL}/doctorAppointments`, 
  {
    headers: {
      Authorization: `Bearer ${state.Login.token}`,
    }
  })
  setApppointment(appointment.data.length)
}

const getallverifiedPatient = async () => {
  const patients = await axios.get(`${process.env.REACT_APP_BASE_URL}/verfiedPatients`, 
  {
    headers: {
      Authorization: `Bearer ${state.Login.token}`,
    }
  })
  setPatients(patients.data.length)
}

return (
  <>
  <DoctorHeader />
    {state.Login.token ? (
  <>
  <aside className="bodyRight">
      <div className="insideBody">
      <h2 className="bodyHomeh2"> Home </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
      <div className="services">
          <aside id="patients">
           <h3 id="patient"> All Patient </h3>
           <BsFillPersonFill id="iconPatient"/>
           <h2 id="patientNum"> {patients} </h2>
            </aside>

           <aside id="appointments">
           <h3 id="appointment"> All Appointment </h3>
           <BsCalendarCheck id="iconApointment"/>
           <h2 id="appointmentNum"> {apppointment} </h2>
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
  {newReadings.length ? (
    <>
    {newReadings.map((readings) => {
       console.log(readings, "here");
      return (
        <>
          <tr>
            <td> </td>
            <td className="sup"> {readings.byUser.fullName} </td>
            <td className="sup"> {readings.byUser.fileNumber} </td>
            <td className="sup"> {numberReadings} </td>
            <td className="sup" id="sup" onClick={() => {
                                onePaitent(readings.byUser._id) }} > See More </td>
          </tr>
  </>
      )
    })
    }
  </>

  ) : (
    <>
    
    <CgDanger className="ifNotIcon" />
    <p className="IfNot"> There`s no Patient with Readings yet!! </p>
    </>
  )
}
</table>
      </div>
</div>
</aside>
  </>

    ) : ( 
      <Login />
    )
    
  }
  </>
  )
};


export default DoctorHome;