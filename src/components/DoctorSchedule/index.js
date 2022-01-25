import React, {useState, useEffect} from "react";
import "./style.css";
import { useSelector } from "react-redux";
import DoctorHeader from "../DoctorHeader";
import axios from "axios";
import Moment from "react-moment";

const DoctorSchedule = () => {
  const [appointment, setAppointment] = useState([]);

  const state = useSelector((state) => {
    return state;
  });


  useEffect(() => {
    AllAppintment();
    // eslint-disable-next-line
  }, []);

  const AllAppintment = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctorAppointments`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setAppointment(res.data);
      console.log(res.data, "appointment");
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
  <DoctorHeader />
  <aside className="bodyRight1">
  <div className="insideBody">
  <h2 className="bodyHomeh2"> Doctor Schedule </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
    <div className="ReadingsTables">
        <h3 id="tableTiltle"> All Appointments </h3>
        <table className="table">
          <tr>
            <th className="danger">  </th>
            <th className="title"> Patient Name </th>
            <th className="title"> File Number </th>
            <th className="title"> Date </th>
            <th className="title"> Day </th>
            <th className="title"> Hour </th>
            {/* <th className="title"> See More </th> */}
          </tr>


          {appointment.map((appoin) => {
                      console.log(appoin, "doss");
                      return (
                        <>
                        <tr>
                        <td> </td>
            <td className="sup"> {appoin.forUser.fullName} </td>
            <td className="sup"> {appoin.forUser.fileNumber} </td>
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

export default DoctorSchedule;