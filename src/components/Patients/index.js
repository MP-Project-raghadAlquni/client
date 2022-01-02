import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BiDotsHorizontalRounded } from "react-icons/bi";

import "./style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import DoctorHeader from "../DoctorHeader";

const Patients = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState("");

  useEffect(() => {
    getallverifiedPatients();
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  const getallverifiedPatients = async () => {
    const allpatients = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/verfiedPatients`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setPatients(allpatients.data);
    console.log(allpatients.data, "all");
  };

  const onePaitent = (id) => {
    console.log(id);
    navigate(`/Patients/${id}`);
  };

  return (
    <>
      <DoctorHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> All Patients </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {patients.length && (
                <>
                <div id="allPatients">
                  {patients.map((patient) => {
                    console.log(patient);
                    return (
                      <div key={patient._id} className="allPatientsInfo">
                        <div className="patientInfor">
                          <div
                            onClick={() => {
                              onePaitent(patient._id);
                            }}>
                                <div className="imgProfile">
                                <img
                            className="ProfileImg"
                            src={patient.avatar}
                            alt="patientImg"
                          />
                          <BiDotsHorizontalRounded className="GotoPatient"/>

                        </div>
                        <div className= "content">
                            <h1 className="contentPara FUname"> {patient.fullName} </h1>
                            <p className="fN"> {patient.fileNumber} </p>
                            <p className="contentPara">{patient.diabetesType} </p>
                            <p className="contentPara">{patient.gender} , {patient.age} years old </p>
                            <p className="contentPara"> P: {patient.phoneNumber} </p>
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
