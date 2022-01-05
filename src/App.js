import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import VerifiedAccount from "./components/VerifiedAccount";
import PatientHome from "./components/PatientHome";
import DoctorHome from "./components/DoctorHome";
import NewPatient from "./components/NewPatient";
import DoctorHeader from "./components/DoctorHeader";
import DoctorSchedule from "./components/DoctorSchedule";
import Patients from "./components/Patients";
import AddAppointment from "./components/AddAppointment";
import Doctors from "./components/Doctors";
import OnePatient from "./components/OnePatient";
import DossesPage from "./components/DossesPage";
import Step1 from "./components/Signup/Step1";
import Step2 from "./components/Signup/Step2";
import Final from "./components/Signup/Final";
import Dashboared from "./components/Dashboard";
import DashboaredHeader from "./components/DashboaredHeader";
import DashboaredDoctors from "./components/DashBoaredDoctors";
import DashboaredPatients from "./components/DashBoaredPatients";
import DashboaredPendingDoctor from "./components/DashboaredPendingDoctor";
import PendingDoctor from "./components/PendingDoctor";




const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/VerifiedAccount" element={<VerifiedAccount />} />
        <Route exact path="/Patient" element={<PatientHome />} />
        <Route exact path="/Doctor" element={<DoctorHome />} />
        <Route exact path="/AddPatient" element={<NewPatient />} />
        <Route exact path="/DoctorHeader" element={<DoctorHeader />} />
        <Route exact path="/DoctorSchedule" element={<DoctorSchedule />} />
        <Route exact path="/AllPatients" element={<Patients />} />
        <Route exact path="/AddAppointment/:id" element={<AddAppointment />} />
        <Route exact path="/AllDoctors" element={<Doctors />} />
        <Route exact path="/Patients/:id" element={<OnePatient />} />
        <Route exact path="/Dosses/:id" element={<DossesPage />} />
        <Route exact path="/signup1" element={<Step1 />} />
        <Route exact path="/signup2" element={<Step2 />} />
        <Route exact path="/final" element={<Final />} />
        <Route exact path="/AdminPage" element={<Dashboared />} />
        <Route exact path="/DashboaredHeader" element={<DashboaredHeader />} />
        <Route exact path="/DashboaredDoctor" element={<DashboaredDoctors />} />
        <Route exact path="/DashboaredPatients" element={<DashboaredPatients />} />
        <Route exact path="/DashboaredPendings" element={<DashboaredPendingDoctor />} />
        <Route exact path="/PendingDoctor/:id" element={<PendingDoctor />} />

      </Routes>
    </>
  );
};

export default App;
