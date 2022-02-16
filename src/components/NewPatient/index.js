import React, { useState } from "react";
import "./style.css";
import DoctorHeader from "../DoctorHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const NewPatient = () => {
  // eslint-disable-next-line
  const [patients, setPatients] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [fisrtName, setFisrtName] = useState("");
  const [lastName, setLastName] = useState("");
  const [diabetesType, setDiabetesType] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const allVerifiedPatients = async () => {
    try {
      const verifiedPatients = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/verfiedPatients`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setPatients(verifiedPatients.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addPatient = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patientRegister`,
        {
          fileNumber: fileNumber,
          fullName: fisrtName + " " + lastName,
          diabetesType: diabetesType,
          age: age,
          gender: gender,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      if (res.status === 201) {
        Swal.fire({
          title: `${fisrtName} has been added as a new patient`,
          width: 600,
          padding: "3em",
          color: "##000000",
          background: "#fff ",
          backdrop: `
                      rgba(121, 186, 190,0.1)
                      left top
                      no-repeat`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    allVerifiedPatients(state.Login.token);
  };

  return (
    <>
      <DoctorHeader />
      {state.Login.token ? (
        <>
          <div className="newPatient">
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                addPatient(e);
              }}
            >
              <aside className="bodyRight1">
                <div className="insideBody">
                  <h2 className="bodyHomeh2"> Add Patient </h2>
                  <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
                </div>
                <div className="patientInfo">
                  <h4 id="basic"> BASIC INFORMATION</h4>
                  <input
                    type="text"
                    id="FirstName1"
                    name="FirstName"
                    placeholder="First Name"
                    onChange={(e) => setFisrtName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="LastName1"
                    name="LastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="age"
                    name="FileNumber"
                    placeholder="File No."
                    onChange={(e) => setFileNumber(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    id="age"
                    name="age"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                    required
                  />

                  <div className="diabetesTypeSelect1">
                    <select
                      id="age"
                      name="diabetesType"
                      onChange={(e) => setDiabetesType(e.target.value)}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        {" "}
                        --Diabetes Type--{" "}
                      </option>
                      <option value="Type 1"> Type 1 </option>
                      <option value="Type 2"> Type 2 </option>
                    </select>
                  </div>
                  <div className="genderSelect1">
                    <select
                      id="age"
                      name="gender"
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="none" selected disabled hidden>
                        {" "}
                        --Gender--{" "}
                      </option>
                      <option value="Male"> Male </option>
                      <option value="Female"> Female </option>
                    </select>
                  </div>
                  <div className="Btns">
                    <input
                      className="btn1 submitBtn"
                      type="submit"
                      value="Submit"
                    />
                    <input type="reset" value="CANCEL" />
                  </div>
                </div>
              </aside>
            </form>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NewPatient;
