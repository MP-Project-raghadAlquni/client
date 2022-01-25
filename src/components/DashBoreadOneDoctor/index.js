
import React, {useState, useEffect} from "react";
import { useNavigate , useParams} from "react-router-dom";
// import "./style.css";
import { TiArrowRightOutline } from "react-icons/ti";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import DashboaredHeader from "../DashboaredHeader";
import Swal from "sweetalert2";
import { IoWomanSharp } from "react-icons/io5";
import { FaMale } from "react-icons/fa";

const DashboaredOneDoctor = () => {
    const id = useParams().id;
    const navigate = useNavigate();
    const [oneDoctor, setOneDoctor] = useState("");


const state = useSelector((state) => {
  return state
});

useEffect(() => {
    oneDoctorAdmin()
    // eslint-disable-next-line
  }, [])


const oneDoctorAdmin = async () => {
    try {
    const patients = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/oneDoctor/${id}`, {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      setOneDoctor(patients.data);
    console.log(patients.data, "patient");
    }
    catch (error) {
        console.log(error);
      }
};


const SpamDoctor = async () => {
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
      navigate("/DashboaredDoctor")

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
              <p className="bodyHomeh1"> Full Name :  <span className="text">{oneDoctor.fullName} </span> </p>
              <p className="bodyHomeh1"> File Number : <span className="text"> {oneDoctor.fileNumber} </span></p>
             </aside>
              <aside className="RightInfo">
              <p className="bodyHomeh1"> Age:  <span className="text">{oneDoctor.age} </span> </p>
              <p className="bodyHomeh1"> <IoWomanSharp /><FaMale className="male" />  <span className="text"> {oneDoctor.gender} </span></p>
              </aside>
              </div>
              <div className="ContactInfo">
              <h2 className="TitleInfo"> Contact Information </h2>
              <p className="bodyHomeh1"> <AiFillPhone className="infoIcon"/> <span className="text"> {oneDoctor.phoneNumber} </span></p>
              <p className="bodyHomeh1"> <MdEmail className="infoIcon"/>  <span className="text"> {oneDoctor.email} </span></p>
              </div>
              </div>


              <aside className="licenseSide">
              <h2 className="TitleInfo"> Certificates and Licenses </h2>
              <p> Health Certificates  <TiArrowRightOutline className="ArrowIcon"/> <a href={oneDoctor.certificates}> Certificates </a> </p>
              <p> A Certified Letter from the Employer <TiArrowRightOutline className="ArrowIcon"/><a href={oneDoctor.letter}> Letter </a> </p>
              <p> A Health License from the Health Institution for Health Specialties <TiArrowRightOutline className="ArrowIcon"/> <a href={oneDoctor.license}> License </a></p>
              </aside>
              <button onClick={SpamDoctor} className="rejectAcceptBtn Accept DeleteBtn"> Delete Patient </button>

    </aside>


     
    </>
    ) : ( 
    <Home />
    )
}
</>

  )
};


export default DashboaredOneDoctor;