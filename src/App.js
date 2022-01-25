import React from "react";
import { Route, Routes } from "react-router-dom";
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
import DashboreadOnePatient from "./components/DashboreadOnePatient";
import DashBoreadOneDoctor from "./components/DashBoreadOneDoctor";
import SignupHeader from "./components/SignupHeader";
import VerifiedBack from "./components/VerifiedBack";
import DoctorProfile from "./components/Profile/Doctor";
import PatientProfile from "./components/Profile/Patient";
import PatientSchedule from "./components/PatientAppointment";
import Dosses from "./components/MyDosses";


const App = () => {
  return (
    <>
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/VerifiedAccount" element={<VerifiedAccount />} />
        <Route exact path="/Patient/:id" element={<PatientHome />} />
        <Route exact path="/Doctor/:id" element={<DoctorHome />} />
        <Route exact path="/AddPatient" element={<NewPatient />} />
        <Route exact path="/DoctorHeader" element={<DoctorHeader />} />
        <Route exact path="/DoctorSchedule" element={<DoctorSchedule />} />
        <Route exact path="/PatientSchedule" element={<PatientSchedule />} />

        <Route exact path="/AllPatients" element={<Patients />} />
        <Route exact path="/AddAppointment/:id" element={<AddAppointment />} />
        <Route exact path="/AllDoctors" element={<Doctors />} />
        <Route exact path="/Patients/:id" element={<OnePatient />} />
        <Route exact path="/Dosses/:id" element={<DossesPage />} />
        <Route exact path="/" element={<Step1 />} />
        <Route exact path="/signup2" element={<Step2 />} />
        <Route exact path="/final" element={<Final />} />
        <Route exact path="/AdminPage" element={<Dashboared />} />
        <Route exact path="/DashboaredHeader" element={<DashboaredHeader />} />
        <Route exact path="/DashboaredDoctor" element={<DashboaredDoctors />} />
        <Route
          exact
          path="/DashboaredPatients"
          element={<DashboaredPatients />}
        />
        <Route
          exact
          path="/DashboaredPendings"
          element={<DashboaredPendingDoctor />}
        />
        <Route exact path="/PendingDoctor/:id" element={<PendingDoctor />} />
        <Route exact path="/Patient/:id" element={<DashboreadOnePatient />} />
        <Route exact path="/Doctor/:id" element={<DashBoreadOneDoctor />} />
        <Route exact path="/SignUpHeader" element={<SignupHeader />} />
        <Route exact path="/VerifiedBack" element={<VerifiedBack />} />
        <Route exact path="/DoctorProfile/:id" element={<DoctorProfile />} />
        <Route exact path="/PatientProfile/:id" element={<PatientProfile />} />
        <Route exact path="/MyDosses" element={<Dosses />} />
        
      </Routes>
    </>
  );
};

export default App;
