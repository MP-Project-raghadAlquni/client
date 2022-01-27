import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DoctorHeader from "../DoctorHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";
import Swal from "sweetalert2";

const DossesPage = () => {
  const id = useParams().id;
  const [onePaitent, setOnePaitent] = useState("");
  const [dosses, setDosses] = useState("");
  const [insulineType1, setInsulineType1] = useState("");
  const [insulineType2, setInsulineType2] = useState("");
  const [insulineType1Dosses, setInsulineType1Dosses] = useState("");
  const [insulineType2Dosses, setInsulineType2Dosses] = useState("");
  const [note, setNote] = useState("");
  const [show, setShow] = useState("");
  // eslint-disable-next-line
  const [message, setMessage] = useState("");


  const [newInsulineType1, setNewInsulineType1] = useState("");
  const [newInsulineType2, setNewInsulineType2] = useState("");
  const [newInsulineType1Dosses, setNewInsulineType1Dosses] = useState("");
  const [newInsulineType2Dosses, setNewInsulineType2Dosses] = useState("");

  useEffect(() => {
    onePatientINFO();
    OnePatientDosses();
    // eslint-disable-next-line
  }, []);

  const state = useSelector((state) => {
    return state;
  });

  const handleChange = () => {
    setShow(!show);
  };

  const onePatientINFO = async () => {
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

  const OnePatientDosses = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/patientDossesDoctor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setDosses(res.data);
      console.log(res.data, "dosse");
    } catch (error) {
      console.log(error);
    }
  };

  const editDosses = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/editDosses/${id}`,
        {
          insulineType1: insulineType1 || dosses.insulineType1,
          insulineType2: insulineType2 || dosses.insulineType2,
          insulineType1Dosses: insulineType1Dosses || dosses.insulineType1Dosses,
          insulineType2Dosses: insulineType2Dosses || dosses.insulineType2Dosses,
          note: note,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      if (res.status === 200) {
        setMessage(
          `Doses have been updated for the patient with File Number ${onePaitent.fileNumber}`
        );
        OnePatientDosses();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const newDosses = async () => {
    try {
        const resu = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addDosses/${id}`,
          {
            insulineType1: newInsulineType1,
            insulineType2: newInsulineType2,
            insulineType1Dosses: newInsulineType1Dosses,
            insulineType2Dosses: newInsulineType2Dosses,
          },
          {
            headers: {
                Authorization: `Bearer ${state.Login.token}`,
              },
          }
        );        
        if (resu.status === 201) {
            Swal.fire({
                title: `Doses added`,
                width: 400,
                padding: '3em',
                color: '##000000',
                background: '#fff ',
                backdrop: `
                  rgba(121, 186, 190,0.1)
                  left top
                  no-repeat`
              })
          } 
        } catch (error) {
          console.log(error);
        } 

      };



  return (
    <>
      <DoctorHeader />
      <aside className="bodyRight1">
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
            <AiFillPhone className="infoIcon" /> {onePaitent.phoneNumber} ,{" "}
            <MdEmail className="infoIcon" /> {onePaitent.email}{" "}
          </h5>
          <div className="patientInfo">
            {dosses.length ? (
              <>
                <div className="ReadingsTables">
                  <h3 id="tableTiltle"> Patient Dosses </h3>
                  <table className="table">
                    <tr>
                      <th className="danger"> </th>
                      <th className="title"> type </th>
                      <th className="title"> Dosses Number </th>
                    </tr>

                    {dosses.map((doss) => {
                      console.log(doss, "doss");
                      return (
                        <>
                          <tr>
                            <td> 1 </td>
                            <td className="sup"> {doss.insulineType1} </td>
                            <td className="sup">
                              {" "}
                              {doss.insulineType1Dosses}{" "}
                            </td>
                          </tr>

                          <tr>
                            <td> 2 </td>
                            <td className="sup"> {doss.insulineType2} </td>
                            <td className="sup">
                              {" "}
                              {doss.insulineType2Dosses}{" "}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                  {!show ? (
                    <div>
                      <button
                        className="AddReadingsBTN btnNewReadings"
                        onClick={handleChange}
                      >
                        {" "}
                        Change Dosses{" "}
                      </button>
                    </div>
                  ) : (
                    <div className="ReadingsTables">
                      <h3 id="tableTiltle"> Change Dosses </h3>

                      <form className="input"
                    onSubmit={(e) => {
                      e.preventDefault();
                      editDosses(e)} }>
                          
                        <table className="table">
                          <tr>
                            <th className="danger"> </th>
                            <th className="title"> type </th>
                            <th className="title"> Dosses Number </th>
                            <th className="title"> Note </th>

                          </tr>
                          <tr>
                            <td> 1 </td>
                            <td className="sup">
                              {" "}
                              <input
                                className="tableInput"
                                onChange={(e) =>
                                  setInsulineType1(e.target.value)
                                }
                              />{" "}
                            </td>
                            <td className="sup">
                              {" "}
                              <input
                                className="tableInput"
                                onChange={(e) =>
                                   setInsulineType1Dosses(e.target.value)
                                }
                              />{" "}
                            </td>
                            <td rowspan="2" className="sup">
                              {" "}
                              <input
                                className="tableInput"
                                onChange={(e) =>
                                    setNote(e.target.value)
                                }
                              />{" "}
                            </td>
                          </tr>

                          <tr>
                            <td> 2 </td>
                            <td className="sup">
                              {" "}
                              <input
                                className="tableInput"
                                onChange={(e) =>
                                    setInsulineType2(e.target.value)
                                }
                              />{" "}
                            </td>
                            <td className="sup">
                              {" "}
                              <input
                                className="tableInput"
                                onChange={(e) =>
                                  setInsulineType2Dosses(e.target.value)
                                }
                              />{" "}
                            </td>
                          </tr>
                        </table>
                        
                        <input
                            type="submit"
                            value="UPDATE"
                            className = "AddReadingsBTN btnNewReadings "
                          />
                        {/* <button onClick={(e) => editDosses(e)}> Edit </button> */}
                      </form>
                    </div>
                  )}
                </div>
              </>
            ) : (
                
                <div className="newPatient">

                <form
                        className="input"
                        onSubmit={(e) => {
                          e.preventDefault();
                          newDosses(e);
                        }}>
                     <h2 className="bodyHomeh2"> Add Dosses </h2>
                     <div className="patientDosses">
                     {/* <input type="text" id="FirstName" name="FirstName" placeholder="First Name" onChange={(e) => setFisrtName(e.target.value)}
                        required/>
                     <input type="text" id="LastName" name="LastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)}
                        required/>
                     <input type="text" id="FileNumber" name="FileNumber" placeholder="File No." onChange={(e) => setFileNumber(e.target.value)}
                        required/>
                     <input type="number" id="age" name="age" placeholder="Age" onChange={(e) => setAge(e.target.value)}
                        required/>
           */}
                     
                <select id="Insuline1" name="setNewInsulineType1" onChange={(e) => setNewInsulineType1(e.target.value)}
                        required>
                <option value="none" selected disabled hidden> --Insuline 1-- </option>
                <option value="LANTUS"> LANTUS </option>
                <option value="Toujeo"> Toujeo </option>
                <option value="Levemir"> Levemir </option>
                <option value="NovoRapid"> NovoRapid </option>
                <option value="Apidra"> Apidra </option>
                </select>
                

                <input type="text" id="d1Dosses" name="1Dosses" placeholder="Insuline 1 Dosses" onChange={(e) => setNewInsulineType1Dosses(e.target.value)}
                        required/>

                
                <select id="Insuline2" name="setNewInsulineType2" onChange={(e) => setNewInsulineType2(e.target.value)}>
                <option value="none" selected disabled hidden> --Insuline 1-- </option>
                <option value="LANTUS"> LANTUS </option>
                <option value="Toujeo"> Toujeo </option>
                <option value="Levemir"> Levemir </option>
                <option value="NovoRapid"> NovoRapid </option>
                <option value="Apidra"> Apidra </option>
                </select>
                

                <input type="text" id="d2Dosses" name="2Dosses" placeholder="Insuline 2 Dosses" onChange={(e) => setNewInsulineType2Dosses(e.target.value)}
                        required/>
                
                <div className="Btns">
                <input className="btn1 submitBtn" type = "submit" value = "Submit"/>
                <input type = "reset" value = "CANCEL"/>
                </div>
                     </div>
          
                    </form>
                </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default DossesPage;
