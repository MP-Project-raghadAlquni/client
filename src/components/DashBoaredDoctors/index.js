
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./style.css";
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
import DashboaredHeader from "../DashboaredHeader";
import Home from "../Home";



const DashboaredDoctors = () => {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        getallDoctor();
      }, []);

      
const state = useSelector((state) => {
  return state;
});




const getallDoctor = async () => {
    const allDoctor = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getAllDoctorAcceotedToAdmin`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setAllDoctors(allDoctor.data);
    console.log(allDoctor.data, "all");
  };

  const oneDoctor = (id) => {
    console.log(id);
    navigate(`/Doctor/${id}`);
  };

return (
    <>
      <DashboaredHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> All Doctors </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {allDoctors.length ? (
                <>
                <div id="allPatients">
                  {allDoctors.map((user) => {
                    console.log(user);
                    return (
                      <div key={user._id} className="allPatientsInfo">
                        <div className="patientInfor">
                          <div
                            onClick={() => {
                              oneDoctor(user._id);
                            }}>
                                <div className="imgProfile">
                                <img
                            className="ProfileImg"
                            src={user.avatar}
                            alt="patientImg"
                          />
                          {/* <BiDotsHorizontalRounded className="GotoPatient"/> */}

                        </div>
                        <div className= "content">
                            <h1 className="contentPara FUname"> {user.fullName} </h1>
                            <p className="fN"> {user.fileNumber} </p>
                            {/* <p className="contentPara">{user.diabetesType} </p> */}
                            <p className="contentPara">{user.gender} , {user.age} years old </p>
                            <p className="contentPara"> E: {user.email} </p>
                            <p className="contentPara"> P: {user.phoneNumber} </p>
                            <p className="contentPara">  </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </>
              ) : (
                <>
                <CgDanger className="ifNotIcon" />
                <p className="IfNot"> there`s no Doctors Accepted yet !! </p>
                
                </>
              )
              
              }
            </>
          ) : (
            ""
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboaredDoctors;