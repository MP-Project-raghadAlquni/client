import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home"
import "./App.css"
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifiedAccount from "./components/VerifiedAccount";
import PatientHome from "./components/PatientHome";
import DoctorHome from "./components/DoctorHome";
import NewPatient from "./components/NewPatient";
import DoctorHeader from "./components/DoctorHeader";
import DoctorSchedule from "./components/DoctorSchedule";
import Patients from "./components/Patients";


const App = () => {
  return (
   <>
   <Routes>
     <Route exact path="/" element = {<Home />} />
     <Route exact path="/signup" element = {<Signup />} />
     <Route exact path="/login" element = {<Login />} />
     <Route exact path="/VerifiedAccount" element = {<VerifiedAccount />} />
     <Route exact path="/Patient" element = {<PatientHome />} />
     <Route exact path="/Doctor" element = {<DoctorHome />} />
     <Route exact path="/AddPatient" element = {<NewPatient />} />
     <Route exact path="/DoctorHeader" element = {<DoctorHeader />} />
     <Route exact path="/DoctorSchedule" element = {<DoctorSchedule />} />
     <Route exact path="/AllPatients" element = {<Patients />} />



   </Routes>
   </>
  );
}

export default App;
