
import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import "./style.css";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import DashboaredHeader from "../DashboaredHeader";
import Swal from "sweetalert2";
import { IoWomanSharp } from "react-icons/io5";
import { FaMale } from "react-icons/fa";

const DashboreadOnePatient = () => {
    const id = useParams().id;
    const navigate = useNavigate();
const [onePaitent, setOnePaitent] = useState("");


const state = useSelector((state) => {
  return state
});

useEffect(() => {
    onePatient()
    // eslint-disable-next-line
  }, [])


const onePatient = async () => {
    try {
    const patients = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/onePatient/${id}`, {
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


const SpamPatient = async () => {
    try {
    const accept = await axios.put(`${process.env.REACT_APP_BASE_URL}/spamUser/${id}`, 
      {},
      {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      console.log(accept);
      // eslint-disable-next-line
    if (accept.status == 200) {
      Swal.fire({
        title: `Account Deleted`,
      })
      navigate("/DashboaredPatients")

    } 
  }
  catch (error) {
    console.log(error);
  };
  }


  return (
    <>
    {state.Login.token ? (

  <>
<DashboaredHeader />
      <aside className="bodyRight">
      <h2 className="bodyHomeh2"> All Patient </h2>
      <div className="PersInfo">
           <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
            <div className="insideBody1">
            <h2 className="TitleInfo"> Personal Information </h2>
            <aside className="RightInfo0">
              <p className="bodyHomeh1"> Full Name :  <span className="text">{onePaitent.fullName} </span> </p>
              <p className="bodyHomeh1"> File Number : <span className="text"> {onePaitent.fileNumber} </span></p>
             </aside>
              <aside className="RightInfo">
              <p className="bodyHomeh1"> Age:  <span className="text">{onePaitent.age} </span> </p>
              <p className="bodyHomeh1"> <IoWomanSharp /><FaMale className="male" />  <span className="text"> {onePaitent.gender} </span></p>
              </aside>
              </div>
              <div className="ContactInfo">
              <h2 className="TitleInfo"> Contact Information </h2>
              <p className="bodyHomeh1"> <AiFillPhone className="infoIcon"/> <span className="text"> {onePaitent.phoneNumber} </span></p>
              <p className="bodyHomeh1"> <MdEmail className="infoIcon"/>  <span className="text"> {onePaitent.email} </span></p>
              </div>
              </div>

              <button onClick={SpamPatient} className="rejectAcceptBtn Accept DeleteBtn"> Delete Patient </button>

    </aside>


     
    </>
    ) : ( 
    <Home />
    )
}
</>

  )
};

export default DashboreadOnePatient;