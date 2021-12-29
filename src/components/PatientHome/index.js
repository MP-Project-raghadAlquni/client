import React, { useEffect, useState} from "react";
import "./style.css";
import PatientHeader from "../PatientHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import Moment from 'react-moment';
import Swal from "sweetalert2";

var now = new Date();
var day = ("0" + now.getDate()).slice(-2);
var month = ("0" + (now.getMonth() + 1)).slice(-2);
var today = now.getFullYear() + "-" + month + "-" + day;

const PatientHome = () => {
  
  const now = new Date();
const day = ("0" + now.getDate()).slice(-2);
const month = ("0" + (now.getMonth() + 1)).slice(-2);
const today = now.getFullYear() + "-" + month + "-" + day;

  const [newReadings, setNewReadings] = useState([]);
  const [beforeBreakfast, setBeforeBreakfast] = useState("");
  const [afterBreakfast, setAfterBreakfast] = useState("");
  const [beforeLunch, setBeforeLunch] = useState("");
  const [afterLunch, setAfterLunch] = useState("");
  const [beforeDinner, setBeforeDinner] = useState("");
  const [afterDinner, setAfterDinner] = useState("");
  const [beforeSleep, setBeforeSleep] = useState("");
  const [readingsDate, setReadingsDate] = useState("");
  const [message, setMessage] = useState("");
  const[show,setShow]=useState(false);

  const state = useSelector((state) => {
    return state;
  });

  const handleChange=()=>{
    setShow(!show);
}

  useEffect(() => {
    getNewReadingsForUser()
  }, [])


  const addReadings = async () => {
    try {
      const readings = await axios.post(`${process.env.REACT_APP_BASE_URL}/addNewReadings`,
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
  })
  if (readings.status === 201) {
    setMessage("Reading has been added");

    }
} catch (error) {
console.log(error);
}
getNewReadingsForUser(state.Login.token)
}

  const getNewReadingsForUser = async () => {
    const readings = await axios.get(`${process.env.REACT_APP_BASE_URL}/falseReadings`, 
    {
      headers: {
        Authorization: `Bearer ${state.Login.token}`,
      }
    })
    setNewReadings(readings.data)
}

  return ( 
    <>
    {state.Login.token ? (
  <>
  <PatientHeader />
  <aside className="bodyRight">
      <div className="insideBody">
      <h2 className="bodyHomeh2"> Home </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
  
  
      <div className="ReadingsTables">
        <h3 id="tableTiltle"> New Readings </h3>

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

        {newReadings.length && (
        <>
        {newReadings.map((readings) => {
        return (
          <>
          <tr>
            <td className="sup"> <Moment format="DD - MM">
              {readings.date}
              </Moment> </td>
            <td className="sup"> {readings.beforeBreakfast}</td>
            <td className="sup">{readings.afterBreakfast} </td>
            <td className="sup"> {readings.beforeLunch} </td>
            <td className="sup" > {readings.afterLunch} </td>
            <td className="sup"> {readings.beforeDinner} </td>
            <td className="sup"> {readings.afterDinner} </td>
            <td className="sup"> {readings.beforeSleep} </td>
          </tr>
          </>
        )
      })}
      </>
        )}
        </table>
      </div>
{!show ? (
      <button onClick={handleChange}> + </button>
) : (
 
        
      <div className="ReadingsTables">
        <h3 id="tableTiltle"> Add New Readings </h3>
        
        <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                addReadings(e);
              }} >
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
                
            <td className="sup"> <input className="tableInputDate" type="date" name="date" required defaultValue={today} onChange={(e) => setReadingsDate(e.target.value)}/> </td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setBeforeBreakfast(e.target.value)} /></td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setAfterBreakfast(e.target.value)} /></td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setBeforeLunch(e.target.value)}/></td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setAfterLunch(e.target.value)}/> </td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setBeforeDinner(e.target.value)}/> </td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setAfterDinner(e.target.value)}/> </td>
            <td className="sup"> <input className="tableInput" onChange={(e) => setBeforeSleep(e.target.value)}/> </td>
            <td className="sup"> <input className="tableInput" type="submit" value="Submit"/> </td>
            
          </tr>
          
        </table>
        </form>

       
</div>
)
}

  </div>
  </aside>
  </>
    ) : ""
  }
  </>
  )
};

export default PatientHome;