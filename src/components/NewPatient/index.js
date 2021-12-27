import React, { useState } from "react";
import "./style.css";
import DoctorHeader from "../DoctorHeader";
import axios from "axios";
import { useDispatch , useSelector} from "react-redux";
import Swal from "sweetalert2";

const NewPatient = () => {
    const [patients, setPatients] = useState("")
    const [fileNumber, setFileNumber] = useState("")
    const [fisrtName, setFisrtName] = useState("")
    const [lastName, setLastName] = useState("")
    const [diabetesType, setDiabetesType] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")


    const state = useSelector((state) => {
        return state
      });

    const allVerifiedPatients = async () => {
        try {
          const verifiedPatients = await axios.get(`${process.env.REACT_APP_BASE_URL}/verfiedPatients`, {
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
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/patientRegister`,
            { 
                fileNumber: fileNumber,
                fullName: fisrtName + lastName, 
                diabetesType: diabetesType, 
                age: age, 
                gender: gender,
            },
            {
                headers: {
                    Authorization: `Bearer ${state.Login.token}`,
                  },
            });
            if (res.status === 201) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'This email or username already have an account! log in!',
                  })
                }
    } catch (error) {
        console.log(error);
      }
      allVerifiedPatients(state.Login.token);
  }



  return <>
      <DoctorHeader />
      <div className="newPatient">
      <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                addPatient(e);
              }}>
          <aside className="bodyRight">
           <div className="insideBody">
           <h2 className="bodyHomeh2"> Add Patient </h2>
           <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
           </div>
           <div className="patientInfo">
               <h4 id="basic"> BASIC INFORMATION</h4>
           <input type="text" id="FirstName" name="FirstName" placeholder="First Name" onChange={(e) => setFisrtName(e.target.value)}
              required/>
           <input type="text" id="LastName" name="LastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}
              required/>
           <input type="text" id="FileNumber" name="FileNumber" placeholder="File No." onChange={(e) => setFileNumber(e.target.value)}
              required/>
           <input type="number" id="age" name="age" placeholder="Age" onChange={(e) => setAge(e.target.value)}
              required/>

           <div className="diabetesTypeSelect1">
      <select id="diabetesType" name="diabetesType" onChange={(e) => setDiabetesType(e.target.value)}
              required>
      <option value="0"> --Diabetes Type-- </option>
      <option value="1"> TYPE 1 </option>
      <option value="2"> TYPE 2 </option>
      </select>
      </div>
      <div className="genderSelect1">
      <select id="gender" name="gender" onChange={(e) => setGender(e.target.value)}
              required>
      <option value="0"> --Gender-- </option>
      <option value="1"> Male </option>
      <option value="2"> Female </option>
      </select>
      </div>

      <input type = "submit" value = "Submit"/>
      <input type = "reset" value = "Cancel"/>

           </div>

           </aside>
          </form>

      </div>
  </>;
};

export default NewPatient;