import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import PatientHeader from "../PatientHeader";
import axios from "axios";
import Moment from "react-moment";

const PatientSchedule = () => {
  const [patientAppointment, setPatientAppointment] = useState([]);

  const state = useSelector((state) => {
    return state;
  });


  useEffect(() => {
    AllPatientAppintment();
  }, []);

  const AllPatientAppintment = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/appointments`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setPatientAppointment(res.data);
      console.log(res.data, "appointment");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
  <PatientHeader />
  <aside className="bodyRight">
  <div className="insideBody">
  <h2 className="bodyHomeh2"> Patient Appointment </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
    <div className="ReadingsTables">
        <h3 id="tableTiltle"> All Appointments </h3>
        <table className="table">
          <tr>
            <th className="danger">  </th>
            {/* <th className="title"> Patient Name </th> */}
            {/* <th className="title"> File Number </th> */}
            <th className="title"> Date </th>
            <th className="title"> Day </th>
            <th className="title"> Hour </th>
            {/* <th className="title"> See More </th> */}
          </tr>


          {patientAppointment.map((appoin) => {
                      console.log(appoin, "doss");
                      return (
                        <>
                        <tr>
                        <td> </td>
            {/* <td className="sup"> {appoin.forUser.fullName} </td> */}
            {/* <td className="sup"> {appoin.forUser.fileNumber} </td> */}
            <td className="sup">  <Moment format="DD/MM/yyy">
                                  {appoin.date}
                                </Moment>{" "} </td>
            <td className="sup" id="sup"> {appoin.day} </td>
            <td className="sup" id="sup"> {appoin.hours} </td>
            {/* <td className="title"> See More </td> */}
            </tr>
                        </>
                      )
          }
          )
        }
          </table>
        </div>
        </div>
        </aside>
        </>
    
  )
};

export default PatientSchedule;