import React, { useState, useEffect } from "react";
import PatientHeader from "../PatientHeader";
import { useSelector } from "react-redux";
import axios from "axios";
import "./style.css";


const Dosses = () => {
  const [dosses, setDosses] = useState("");

  useEffect(() => {
    PatientDosses();
    // eslint-disable-next-line
  }, []);

  const state = useSelector((state) => {
    return state;
  });


  const PatientDosses = async () => {
    try {
      const Doss = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/patientDosses`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setDosses(Doss.data);
      console.log(Doss.data, "Doss");
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
      <PatientHeader />
      <aside className="bodyRight">
        <div className="insideBody">
        <h2 className="bodyHomeh2"> Patient Dosses </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
           
            
                <div className="ReadingsTables">
                  <h3 id="tableTiltle"> Dosses </h3>
                  <table className="table">
                    <tr>
                      <th className="danger"> </th>
                      <th className="title"> type </th>
                      <th className="title"> Dosses Number </th>
                    </tr>

                
                    
                          <tr>
                            <td> 1 </td>
                            <td className="sup"> {dosses.insulineType1} </td>
                            <td className="sup">
                              {" "}
                              {dosses.insulineType1Dosses}{" "}
                            </td>
                          </tr>

                          <tr>
                            <td> 2 </td>
                            <td className="sup"> {dosses.insulineType2} </td>
                            <td className="sup">
                              {" "}
                              {dosses.insulineType2Dosses}{" "}
                            </td>
                          </tr>
                
                  </table>

                  <p> Doctor Notes: {dosses.note} </p>
                </div>
             
        </div>
      </aside>
    </>
  );
};

export default Dosses;
