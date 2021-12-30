import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import PatientHeader from "../PatientHeader";

const Patients = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState("");

  useEffect(() => {
    getallAcceptedDoctors();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  const getallAcceptedDoctors= async () => {
    const allDoctors = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/acceptedDoctors`);
      setDoctors(allDoctors.data);
    console.log(allDoctors.data, "all");
  };

  const onePaitent = (id) => {
    console.log(id);
    navigate(`/OneDoctors/${id}`);
  };

  return (
    <>
      <PatientHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> Home </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {doctors.length && (
                <>
                <div id="allPatients">
                  {doctors.map((doctor) => {
                    console.log(doctor);
                    return (
                      <div key={doctor._id} className="allPatientsInfo">
                        <div className="patientInfor">
                          <div
                            onClick={() => {
                              onePaitent(doctor._id);
                            }}>
                                <div className="imgProfile">
                                <img
                            className="ProfileImg"
                            src={doctor.avatar}
                            alt="patientImg"
                          />
                          <BiDotsHorizontalRounded className="GotoPatient"/>

                        </div>
                        <div className= "content">
                            <h1 className="contentPara FUname"> {doctor.fullName} </h1>
                            <p className="fN"> {doctor.fileNumber} </p>
                            <p className="contentPara">{doctor.fileNumber} </p>
                            <p className="contentPara">{doctor.gender} , {doctor.age} years old </p>
                            <p className="contentPara"> P: {doctor.phoneNumber} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </aside>
    </>
  );
};

export default Patients;
