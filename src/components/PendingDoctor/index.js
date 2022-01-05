
import React, {useState, useEffect} from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import "./style.css";
import Avatar from "../images/defaultAvatar.png"
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome , AiFillPhone} from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck , BsCalendarPlus } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import {Helmet} from "react-helmet";
import { BsPeopleFill } from "react-icons/bs";
import { userLogout } from "./../../reducers/loginn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import Moment from "react-moment";
import DashboaredHeader from "../DashboaredHeader";
import Swal from "sweetalert2";

const PendingDoctor = () => {
const id = useParams().id;
const [onePending, setOnePending] = useState("");

const dispatch = useDispatch();
const navigate = useNavigate();


const state = useSelector((state) => {
  return state
});

useEffect(() => {
    onePendings()
  }, [])


const onePendings = async () => {
    try {
    const Pending = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getPendingDoctorById/${id}`, {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      setOnePending(Pending.data);
    console.log(Pending.data, "patient");
    }
    catch (error) {
        console.log(error);
      }
};


const RejectedDoctor = async () => {
    try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/rejectedStatus/${id}`, 
      {},
      {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      console.log(res);
    if (res.status == 200) {
      Swal.fire({
        title: `Account Rejected`,
        // width: 400,
        // padding: '3em',
        // color: '##000000',
        // background: '#fff ',
      })

    } 
  }
  catch (error) {
    console.log(error);
  };
  }


const AcceptDoctor = async () => {
    try {
    const accept = await axios.put(`${process.env.REACT_APP_BASE_URL}/acceptedStatus/${id}`, 
      {},
      {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      console.log(accept);
    if (accept.status == 200) {
      Swal.fire({
        title: `Account Accepted`,
        // width: 400,
        // padding: '3em',
        // color: '##000000',
        // background: '#fff ',
      })

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
<Helmet>
  <style>{'body { background-color: rgb(49, 55, 61); }'}</style>
</Helmet>
       
  
<DashboaredHeader />
      <aside className="bodyRight">
      <h2 className="bodyHomeh2"> Pendings Doctor </h2>
           <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
            <div className="insideBody">
            <h2> Personal Information </h2>
              <h3 className="PattientName"> {onePending.fullName} - <span className="fNN"> {onePending.fileNumber} </span> </h3>
              <h3 className="bodyHomeh5 h5"> {onePending.diabetesType} </h3>
              <h3 className="bodyHomeh5"> {onePending.gender}, {onePending.age} years old </h3>
              <h3 className="bodyHomeh5"> <AiFillPhone className="infoIcon"/> {onePending.phoneNumber} , <MdEmail className="infoIcon"/> {onePending.email} </h3>
              
              <div className="licenseSide">
              <h2> certificates and licenses </h2>
              <h4> certificates </h4>
              <a href={onePending.certificates}> certificates </a>
              <h4> letter </h4>
              <a href={onePending.letter}> letter </a>
              <h4> license </h4>
              <a href={onePending.license}> license </a>

              
              {/* <img className="license" alt="license" src={onePending.license} /> */}

              
              </div>
                 
    <button onClick={AcceptDoctor}> accept Doctor? </button>
    <button onClick={RejectedDoctor}> reject Doctor? </button>
              
              
    </div>
 
    </aside>
     
    </>
    ) : ( 
    <Home />
    )
}
</>
  );

};

export default PendingDoctor;