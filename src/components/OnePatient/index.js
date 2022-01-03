import React, {useState, useEffect} from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import "./style.css";
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome , AiFillPhone} from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck , BsCalendarPlus } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {Helmet} from "react-helmet";
import { BsPeopleFill } from "react-icons/bs";
import { userLogout } from "./../../reducers/loginn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import Moment from "react-moment";
import DoctorHeader from "../DoctorHeader";


const OnePatient = () => {
const id = useParams().id;
const [onePaitent, setOnePaitent] = useState("");
const [patientsReadings, setPatientsReadings] = useState([]);

const dispatch = useDispatch();
const navigate = useNavigate();


const state = useSelector((state) => {
  return state
});

useEffect(() => {
    onePatient()
  }, [])

useEffect(() => {
    newReadingsPatient()
  }, [])


const onePatient = async () => {
    try {
    const patients = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/${id}`, {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      setOnePaitent(patients.data);
    console.log(patients.data, "patient");
    }
    catch (error) {
        console.log(error);
      }
};

const newReadingsPatient = async () => {
    try {
    const onePatientReadings = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/falseReadings/${id}`, {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      setPatientsReadings(onePatientReadings.data);
      console.log(onePatientReadings, "jj");
    }
    catch (error) {
        console.log(error);
      }
};



const Paitent = (id) => {
    console.log(id);
    navigate(`/AddAppointment/${id}`);
  };

  const dosses = (id) => {
    console.log(id);
    navigate(`/Dosses/${id}`);
  };


const logout = () => {
  dispatch(userLogout({ token: "" }));
  navigate("/");
}

  return (
      <>
    {state.Login.token ? (

  <>
<Helmet>
  <style>{'body { background-color: rgb(49, 55, 61); }'}</style>
</Helmet>
       
  
<DoctorHeader />
      <aside className="bodyRight">
            <div className="insideBody">
              <h2 className="PattientName"> {onePaitent.fullName} - <span className="fNN"> {onePaitent.fileNumber} </span> </h2>
              <h5 className="bodyHomeh5 h5"> {onePaitent.diabetesType} </h5>
              <h5 className="bodyHomeh5"> {onePaitent.gender}, {onePaitent.age} years old </h5>
              <h5 className="bodyHomeh5"> <AiFillPhone className="infoIcon"/> {onePaitent.phoneNumber} , <MdEmail className="infoIcon"/> {onePaitent.email} </h5>
              <div className="patientReadings">

              <div className="ReadingsTables">
              <table className="table">
                  <tr>
                    <th className="danger"> Date </th>
                    <th className="title"> Before Breakfast </th>
                    <th className="title"> After Breakfast </th>
                    <th className="title"> Before Lunch </th>
                    <th className="title"> After Lunch </th>
                    <th className="title"> Before Dinner </th>
                    <th className="title"> After Dinner </th>
                    <th className="title"> Before Sleep </th>
                  </tr>
                
                  {patientsReadings.length && (
                    <>
                      {patientsReadings.map((patientReadings) => {

                              console.log(patientReadings, "readings");
                              console.log(patientReadings.date, "date");
                              return (
                          <>
                         <tr>
                              <td className="sup">
                                {" "}
                                <Moment format="DD - MM">
                                  {patientReadings.date}
                                </Moment>{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.beforeBreakfast}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.afterBreakfast}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.beforeLunch}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.afterLunch}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.beforeDinner}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.afterDinner}
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  value={patientReadings.beforeSleep}
                                />{" "}
                              </td>
                              
                            </tr>
                </>
                              )
                      })}
                      </>
                  )}

                
              
</table>
                </div>
                 
              
    </div>
    <button  onClick={() => {
                              Paitent(onePaitent._id)} }> new Appointment </button>
    <button  onClick={() => {
                              dosses(onePaitent._id)} }> Dosses </button>
    </div>

    
    </aside>
      {/* </div> */}
         
           {/* </div> */}
           {/* </div> */}
 
    </>
    ) : ( 
    <Home />
    )
}
</>
  );

};

export default OnePatient;