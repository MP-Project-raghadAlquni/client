import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    navigate(`/OneProduct/${id}`);
  };

  return (
    <>
      <DoctorHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> Home </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {patients.length && (
                <>
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
                        </div>
                        <div className= "content">
                            <p className="contentPara"> fullName: {patient.fullName} </p>
                            <p className="contentPara"> fileNumber: {patient.fileNumber} </p>
                            <p className="contentPara"> diabetesType: {patient.diabetesType} </p>
                            <p className="contentPara"> age: {patient.age} </p>
                            {/* <p> doctor: {patient.doctor.fullName} </p> */}
                            <p className="contentPara"> phoneNumber: {patient.phoneNumber} </p>
                            <p className="contentPara"> gender: {patient.gender} </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
