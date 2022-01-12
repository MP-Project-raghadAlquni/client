import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./style.css";
import { AiFillPhone } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import axios from "axios";
import Home from "../Home";
import Moment from "react-moment";
import DoctorHeader from "../DoctorHeader";
import Swal from "sweetalert2";

const OnePatient = () => {
  const id = useParams().id;
  const [onePaitent, setOnePaitent] = useState("");
  const [patientsReadings, setPatientsReadings] = useState([]);

  const navigate = useNavigate();

  const state = useSelector((state) => {
    return state;
  });

  useEffect(() => {
    onePatient();
  }, []);

  useEffect(() => {
    newReadingsPatient();
  }, []);

  const onePatient = async () => {
    try {
      const patients = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/patient/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setOnePaitent(patients.data);
      console.log(patients.data, "patient");
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeStatus = async () => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/editReadingsStatus/${id}`,
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
          title: `Readings have been read`,
        });
      }
    } catch (error) {
      console.log(error);
    }
    //newReadingsPatient()
    setPatientsReadings([]);
  };

  const newReadingsPatient = async () => {
    try {
      const onePatientReadings = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/falseReadings/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setPatientsReadings(onePatientReadings.data);
      console.log(onePatientReadings, "jj");
    } catch (error) {
      console.log(error);
    }
  };

  const Paitent = (id) => {
    console.log(id);
    navigate(`/AddAppointment/${id}`);
  };

  const dosses = (id) => {
    console.log(id);
    navigate(`/Dosses/${id}`);
  };

  return (
    <>
      {state.Login.token ? (
        <>
          <Helmet>
            <style>{"body { background-color: rgb(49, 55, 61); }"}</style>
          </Helmet>

          <DoctorHeader />

          <aside className="bodyRight">
            <div className="insideBody">
              <h2 className="PattientName">
                {" "}
                {onePaitent.fullName} -{" "}
                <span className="fNN"> {onePaitent.fileNumber} </span>{" "}
              </h2>
              <h5 className="bodyHomeh5 h5"> {onePaitent.diabetesType} </h5>
              <h5 className="bodyHomeh5">
                {" "}
                {onePaitent.gender}, {onePaitent.age} years old{" "}
              </h5>
              <h5 className="bodyHomeh5">
                {" "}
                <AiFillPhone className="infoIcon1" /> {onePaitent.phoneNumber} ,{" "}
                <MdEmail className="infoIcon1" /> {onePaitent.email}{" "}
              </h5>
              <button
                className="btn1 submitBtn bttnOne"
                onClick={() => {
                  Paitent(onePaitent._id);
                }}
              >
                {" "}
                new Appointment{" "}
              </button>
              <button
                className="btn1 submitBtn bttnOne1"
                onClick={() => {
                  dosses(onePaitent._id);
                }}
              >
                {" "}
                Dosses{" "}
              </button>
              <div className="patientReadings">
                <div className="ReadingsTables">
                  <table className="table">
                    <tr>
                      <th className="danger"> Date </th>
                      <th className="title"> Before Breakfast </th>
                      <th className="title"> After Breakfast </th>
                      <th className="title"> Before Lunch </th>
                      <th className="title"> After Lunch </th>
                      <th className="title"> Before Dinner </th>
                      <th className="title"> After Dinner </th>
                      <th className="title"> Before Sleep </th>
                    </tr>

                    {patientsReadings.length ? (
                      <>
                        {patientsReadings.map((patientReadings) => {
                          console.log(patientReadings, "readings");
                          console.log(patientReadings.date, "date");
                          return (
                            <>
                              <tr>
                                <td className="sup">
                                  {" "}
                                  <Moment format="DD - MM">
                                    {patientReadings.date}
                                  </Moment>{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.beforeBreakfast}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.afterBreakfast}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.beforeLunch}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.afterLunch}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.beforeDinner}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.afterDinner}
                                  />{" "}
                                </td>
                                <td className="sup">
                                  {" "}
                                  <input
                                    className="tableInput"
                                    value={patientReadings.beforeSleep}
                                  />{" "}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <button
                          className="changeBtn btn1 submitBtn"
                          onClick={() => {
                            ChangeStatus();
                          }}
                        >
                          DONE
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="ifNot1">
                          <p> There's no new readings for this patient </p>
                        </div>
                      </>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </aside>
          {/* </div> */}

          {/* </div> */}
          {/* </div> */}
        </>
      ) : (
        <Home />
      )}
    </>
  );
};

export default OnePatient;
