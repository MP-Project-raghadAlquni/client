import React, {useEffect,useState} from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import "./style.css";
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BsCalendarCheck } from "react-icons/bs";
import {Helmet} from "react-helmet";
import { BsPeopleFill } from "react-icons/bs";
import { userLogout } from "./../../reducers/loginn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";

const DoctorHeader = () => {
  // eslint-disable-next-line
  const id = useParams().id;
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

const state = useSelector((state) => {
  return state
});

const handleChange = () => {
  setShow(!show);
};


const logout = () => {
  
  dispatch(userLogout({ token: "" }));
  navigate("/");
};


useEffect(() => {
  oneUserName()
  // eslint-disable-next-line
}, [])


const oneUserName = async () => {
  const docId = JSON.parse(localStorage.getItem("user"))._id

  try {
  const userNamme = await axios.get(
    `${process.env.REACT_APP_BASE_URL}/users/${docId}`, {
      headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
    });
    setUser(userNamme.data);
  console.log(userNamme.data , "user");
  }
  catch (error) {
      console.log(error);
    }
};



  return (
  <>
<Helmet>
  <style>{'body { background-color: rgb(49, 55, 61); }'}</style>
</Helmet>
       
       <div className="banner">
       <div className="header">
       <div className="leftSide">
       <div className="publicProfile"></div>
       <img id="avatar" src={user.avatar}  alt="avatar" height={80}/>
       <div className="welcomeName">
       <h4 id="welcome"> Welcome <br /> <span id="name"> D. {user.fullName}  </span> </h4>
       <div className="icons">
         <ul className="iconsul">
           <li className="iconsli"><span className="profile" onClick={()=>navigate(`/DoctorProfile/${JSON.parse(localStorage.getItem("user"))._id}`)}><BsPersonCircle /> </span></li>
           <li className="iconsli"><BsChatFill /></li>
           <li className="iconsli"><IoIosLogOut onClick={logout} /></li>
         </ul>
       </div>
       </div>
         </div>
       </div>
     
       <div className="body">
         <aside className="bodyLeft">
           <div className="navTitle">
             <p className="mainNav"> MAIN NAVIGATION </p>
           </div>
           <ul className="ulNav"> 
           <li className="nav"> <AiFillHome className="iconNav" /> <span className="navLink"  onClick={()=>navigate(`/Doctor/${JSON.parse(localStorage.getItem("user"))._id}`)}>Home</span> </li>
           <li className="nav"> <BsFillPersonFill className="iconNav" /> <Link className="navLink" to="/AllPatients">Patients</Link> </li>
           <li className="nav"> <BsCalendarCheck className="iconNav"/> <Link className="navLink" to="/DoctorSchedule">Appointments</Link> </li>
           </ul>
         </aside>

         <div className="AddBtn"> 
      <button className="clicker"  onClick={handleChange} > + </button>
      {show ? (
      <button className="hiddenAddPatient"> <Link className="navLink" to="/AddPatient"> <BsPeopleFill  id="iconBtnPatient" /></Link></button>
      ) : (
<>

</>
      )
}

      </div>
         
           </div>
           </div>
  </>
  );
};

export default DoctorHeader;