import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import PatientHeader from "../PatientHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { BsJournalPlus } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { MdDone } from "react-icons/md";

import Swal from "sweetalert2";

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + month + "-" + day;

const date = new Date();
const time = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

const PatientHome = () => {
  const now = new Date();
  const day = ("0" + now.getDate()).slice(-2);
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const today = now.getFullYear() + "-" + month + "-" + day;

  const id = useParams().id;

  const [newReadings, setNewReadings] = useState([]);
  const [beforeBreakfast, setBeforeBreakfast] = useState("");
  const [afterBreakfast, setAfterBreakfast] = useState("");
  const [beforeLunch, setBeforeLunch] = useState("");
  const [afterLunch, setAfterLunch] = useState("");
  const [beforeDinner, setBeforeDinner] = useState("");
  const [afterDinner, setAfterDinner] = useState("");
  const [beforeSleep, setBeforeSleep] = useState("");
  const [readingsDate, setReadingsDate] = useState({ time }, new Date());

  const [updateBeforeBreakfast, setUpdateBeforeBreakfast] = useState("");
  const [updateAfterBreakfast, setUpdateAfterBreakfast] = useState("");
  const [updateBeforeLunch, setUpdateBeforeLunch] = useState("");
  const [updateAfterLunch, setUpdateAfterLunch] = useState("");
  const [updateBeforeDinner, setUpdateBeforeDinner] = useState("");
  const [updateAfterDinner, setUpdateAfterDinner] = useState("");
  const [updateBeforeSleep, setUpdateBeforeSleep] = useState("");

  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  const state = useSelector((state) => {
    return state;
  });

  const handleChange = () => {
    setShow(!show);
  };

  useEffect(() => {
    getNewReadingsForUser();
  }, []);

  const addReadings = async () => {
    try {
      const readings = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/addNewReadings`,
        {
          beforeBreakfast: beforeBreakfast,
          afterBreakfast: afterBreakfast,
          beforeLunch: beforeLunch,
          afterLunch: afterLunch,
          beforeDinner: beforeDinner,
          afterDinner: afterDinner,
          beforeSleep: beforeSleep,
          date: readingsDate,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      getNewReadingsForUser(state.Login.token);

      if (readings.status === 201) {
        setMessage("Reading has been added");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNewReadingsForUser = async () => {
    const readings = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/falseReadings`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setNewReadings(readings.data);
  };

  // edit Readings
  const editReadings = async (id) => {
    console.log(id, "id");
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/editReadings/${id}`,
        {
          beforeBreakfast: updateBeforeBreakfast || newReadings.beforeBreakfast,
          afterBreakfast: updateAfterBreakfast || newReadings.afterBreakfast,
          beforeLunch: updateBeforeLunch || newReadings.beforeLunch,
          afterLunch: updateAfterLunch || newReadings.afterLunch,
          beforeDinner: updateBeforeDinner || newReadings.beforeDinner,
          afterDinner: updateAfterDinner || newReadings.afterDinner,
          beforeSleep: updateBeforeSleep || newReadings.beforeSleep,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      if (res.status === 200) {
        Swal.fire({
          title: `has been added as a new patient`,
          width: 600,
          padding: "3em",
          color: "##000000",
          background: "#fff ",
          backdrop: `
              rgba(121, 186, 190,0.1)
              left top
              no-repeat`,
        });
      }
    } catch (error) {
      Swal.fire({
        title: `nooo`,
        width: 600,
        padding: "3em",
        color: "##000000",
        background: "#fff ",
        backdrop: `
              rgba(121, 186, 190,0.1)
              left top
              no-repeat`,
      });
      console.log(error);
    }
    getNewReadingsForUser(state.Login.token);
  };

  return (
    <>
      {state.Login.token ? (
        <>
          <PatientHeader />
          <aside className="bodyRight">
            <div className="insideBody">
              <h2 className="bodyHomeh2"> Home </h2>
              <h5 className="bodyHomeh5"> Welcome to Readings App</h5>

              <div className="ReadingsTables">
                <h3 id="tableTiltle"> New Readings </h3>
                {message ? <div className="message">{message}</div> : ""}
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
                    <th className="title"> Edit </th>
                  </tr>

                  {newReadings.length && (
                    <>
                      {newReadings.map((readings) => {
                        console.log(readings, "here");

                        return (
                          <>
                            <tr>
                              <td className="sup">
                                {" "}
                                <Moment format="DD - MM">
                                  {readings.date}
                                </Moment>{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.beforeBreakfast}
                                  onChange={(e) =>
                                    setUpdateBeforeBreakfast(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.afterBreakfast}
                                  onChange={(e) =>
                                    setUpdateAfterBreakfast(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.beforeLunch}
                                  onChange={(e) =>
                                    setUpdateBeforeLunch(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.afterLunch}
                                  onChange={(e) =>
                                    setUpdateAfterLunch(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.beforeDinner}
                                  onChange={(e) =>
                                    setUpdateBeforeDinner(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.afterDinner}
                                  onChange={(e) =>
                                    setUpdateAfterDinner(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td className="sup">
                                {" "}
                                <input
                                  className="tableInput"
                                  defaultValue={readings.beforeSleep}
                                  onChange={(e) =>
                                    setUpdateBeforeSleep(e.target.value)
                                  }
                                />{" "}
                              </td>
                              <td>
                                {" "}
                                <button
                                  className="EditBtn"
                                  onClick={() => {
                                    editReadings(readings._id);
                                  }}
                                >
                                  <IoCheckmarkDoneSharp className="editIcon" />
                                </button>{" "}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </>
                  )}
                </table>
              </div>
              {!show ? (
                <div>
                  <button
                    className="AddReadingsBTN btnNewReadings"
                    onClick={handleChange}
                  >
                    {" "}
                    Add New Readings{" "}
                    <BsJournalPlus className="AddReadingsBtnIcon" />
                  </button>
                </div>
              ) : (
                <div className="ReadingsTables">
                  <h3 id="tableTiltle"> Add New Readings </h3>

                  <form
                    className="input"
                    onSubmit={(e) => {
                      e.preventDefault();
                      addReadings(e);
                    }}
                  >
                    {message ? <div className="message">{message}</div> : ""}
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

                      <tr>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInputDate"
                            type="date"
                            name="date"
                            required
                            defaultValue={today}
                            onChange={(e) => setReadingsDate(e.target.value)}
                          />{" "}
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setBeforeBreakfast(e.target.value)}
                          />
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setAfterBreakfast(e.target.value)}
                          />
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setBeforeLunch(e.target.value)}
                          />
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setAfterLunch(e.target.value)}
                          />{" "}
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setBeforeDinner(e.target.value)}
                          />{" "}
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setAfterDinner(e.target.value)}
                          />{" "}
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            onChange={(e) => setBeforeSleep(e.target.value)}
                          />{" "}
                        </td>
                        <td className="sup">
                          {" "}
                          <input
                            className="tableInput"
                            type="submit"
                            value="ADD"
                          />{" "}
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
              )}
            </div>
          </aside>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default AllReadings;
