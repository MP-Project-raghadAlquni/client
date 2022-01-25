import React, {useEffect,useState} from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import { userLogout } from "./../../reducers/loginn";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { BsPersonCircle } from "react-icons/bs";
import { BsChatFill } from "react-icons/bs";
import { IoIosLogOut } from "react-icons/io";
import { AiFillHome } from "react-icons/ai";
import { BsCalendarCheck, BsPeopleFill } from "react-icons/bs";
import { FaSyringe } from "react-icons/fa";
import { Helmet } from "react-helmet";
import axios from "axios";

const PatientHeader = () => {
    // eslint-disable-next-line
  const id = useParams().id;
  const [user, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

const state = useSelector((state) => {
  return state
});



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
        <style>{"body { background-color: rgb(49, 55, 61); }"}</style>
      </Helmet>

      <div className="banner">
        <div className="header">
          <div className="leftSide">
            <div className="publicProfile"></div>
            <img id="avatar" src={user.avatar} alt="avatar" height={80} />
            <div className="welcomeName">
              <h4 id="welcome">
                {" "}
                Welcome <br /> <span id="name"> {user.fullName} </span>{" "}
              </h4>
              <div className="icons">
                <ul className="iconsul">
                  <li className="iconsli">
                  <span className="profile" onClick={()=>navigate(`/PatientProfile/${JSON.parse(localStorage.getItem("user"))._id}`)}> <BsPersonCircle /> </span>
                  </li>
                  <li className="iconsli">
                    <BsChatFill />
                  </li>
                  <li className="iconsli">
                    <IoIosLogOut onClick={logout} />
                  </li>
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
                           <li className="nav"> <AiFillHome className="iconNav" /> <span className="navLink"  onClick={()=>navigate(`/Patient/${JSON.parse(localStorage.getItem("user"))._id}`)}>Home</span> </li>
                
              <li className="nav">
                {" "}
                <BsPeopleFill className="iconNav" />{" "}
                <Link className="navLink" to="/AllDoctors">
                  Doctors
                </Link>{" "}
              </li>
              <li className="nav">
                {" "}
                <BsCalendarCheck className="iconNav" />{" "}
                <Link className="navLink" to="/PatientSchedule">
                  Appointments
                </Link>{" "}
              </li>
              <li className="nav">
                {" "}
                <FaSyringe className="iconNav"/>  <Link className="navLink" to="/MyDosses">My Dosses </Link>
              </li>
            </ul>
          </aside>

          {/* <div className="AddBtn"> 
      <button className="clicker" tabindex="1" > + </button>
      <button className="hiddendiv"> <Link className="navLink" to="/AddPatient"> <BsPerson  id="iconBtnPatient" /></Link></button>

      </div> */}
        </div>
      </div>
    </>
  );
};

export default PatientHeader;
