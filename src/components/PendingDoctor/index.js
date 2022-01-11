import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./style.css";
import Avatar from "../images/defaultAvatar.png";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { TiArrowRightOutline } from "react-icons/ti";
import { AiFillHome, AiFillPhone, AiTwotoneFileText } from "react-icons/ai";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendarCheck, BsCalendarPlus } from "react-icons/bs";
import { IoIosPaper } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet";
import { BsPeopleFill } from "react-icons/bs";
import { userLogout } from "./../../reducers/loginn";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import Moment from "react-moment";
import DashboaredHeader from "../DashboaredHeader";
import Swal from "sweetalert2";

import { IoWomanSharp } from "react-icons/io5";
import { FaMale } from "react-icons/fa";

const PendingDoctor = () => {
  const id = useParams().id;
  const [onePending, setOnePending] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    onePendings();
  }, []);

  const onePendings = async () => {
    try {
      const Pending = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getPendingDoctorById/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setOnePending(Pending.data);
      console.log(Pending.data, "patient");
    } catch (error) {
      console.log(error);
    }
  };

  const RejectedDoctor = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/rejectedStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      console.log(res);
      if (res.status == 200) {
        Swal.fire({
          title: `Account Rejected`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AcceptDoctor = async () => {
    try {
      const accept = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/acceptedStatus/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      console.log(accept);
      if (accept.status == 200) {
        Swal.fire({
          title: `Account Accepted`,
        });
        navigate("/DashboaredPendings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {state.Login.token ? (
        <>
          <Helmet>
            <style>{"body { background-color: rgb(49, 55, 61); }"}</style>
          </Helmet>

          <DashboaredHeader />
          <aside className="bodyRight">
            <h2 className="bodyHomeh2"> Pending Doctor </h2>
            <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
            <div className="insideBody1">
              <h2 className="TitleInfo"> Personal Information </h2>
              <aside className="RightInfo0">
                <p className="bodyHomeh1">
                  {" "}
                  Full Name :{" "}
                  <span className="text">{onePending.fullName} </span>{" "}
                </p>
                <p className="bodyHomeh1">
                  {" "}
                  File Number :{" "}
                  <span className="text"> {onePending.fileNumber} </span>
                </p>
              </aside>
              <aside className="RightInfo">
                <p className="bodyHomeh1">
                  {" "}
                  Age: <span className="text">{onePending.age}</span>{" "}
                </p>
                <p className="bodyHomeh1">
                  {" "}
                  <IoWomanSharp />
                  <FaMale className="male" />{" "}
                  <span className="text"> {onePending.gender} </span>
                </p>
              </aside>
              <aside className="RightInfo2">
                <p className="bodyHomeh1">
                  {" "}
                  <AiFillPhone className="infoIcon" />{" "}
                  <span className="text"> {onePending.phoneNumber} </span>
                </p>
                <p className="bodyHomeh1">
                  {" "}
                  <MdEmail className="infoIcon" />{" "}
                  <span className="text"> {onePending.email} </span>
                </p>
              </aside>
            </div>
            <aside className="licenseSide">
              <h2 className="TitleInfo"> Certificates and Licenses </h2>
              <p>
                {" "}
                Health Certificates{" "}
                <TiArrowRightOutline className="ArrowIcon" />{" "}
                <a href={onePending.certificates}> Certificates </a>{" "}
              </p>
              <p>
                {" "}
                A Certified Letter from the Employer{" "}
                <TiArrowRightOutline className="ArrowIcon" />
                <a href={onePending.letter}> Letter </a>{" "}
              </p>
              <p>
                {" "}
                A Health License from the Health Institution for Health
                Specialties <TiArrowRightOutline className="ArrowIcon" />{" "}
                <a href={onePending.license}> License </a>
              </p>
            </aside>
            <button className="rejectAcceptBtn Accept" onClick={AcceptDoctor}>
              {" "}
              accept Doctor?{" "}
            </button>
            <button className="rejectAcceptBtn reject" onClick={RejectedDoctor}>
              {" "}
              reject Doctor?{" "}
            </button>
          </aside>
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default PendingDoctor;
