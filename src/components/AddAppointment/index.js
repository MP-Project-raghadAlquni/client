import DoctorHeader from "../DoctorHeader";
import React, { useEffect, useState } from "react";
import { Link, useNavigate , useParams} from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";
import { BsFillPersonFill} from "react-icons/bs";
import Home from "../Home";
import Moment from "react-moment";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import { useRef } from "react";


const AddAppointment = () => {
  const ref = useRef();
  const id = useParams().id;
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [appointment, setAppointment] = useState("");
  const [onePaitent, setOnePaitent] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [clinic, setClinic] = useState("");
  const [message, setMessage] = useState("");


  


  console.log(date, " day");
  const state = useSelector((state) => {
    return state
  });


useEffect(() => {
  onePatientINFO()
  allAppointments()
}, [])


  const allAppointments = async () => {
    try {
      const result = await axios.getallverifiedPatients(`${process.env.REACT_APP_BASE_URL}/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      setAppointment(result.data);
      console.log(result.data, "appointment");
    } catch (error) {
      console.log(error);
    }
  };

  const addAppointment = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/appointment/${id}`, 
        {
          day: day, 
          date: date, 
          hours: time,
          clinic: clinic
        },
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      });
      if (res.status === 201) {
        Swal.fire({
            title: `An appointment was confirmed <br /> <h6> on <br /> ${day} ${date} (${time}) </h6>`,
            width: 500,
            padding: '3em',
            color: '##000000',
            background: '#fff ',
          })
        }
      console.log(res.data, "appo");
    } catch (error) {
      Swal.fire({
        title: `An appointment was confirmed <br /> <h6> on <br /> ${day} ${date} (${time}) </h6>`,
        width: 500,
        padding: '3em',
        color: '##000000',
        background: '#fff ',
      })
      console.log(error);
    }
    
  };


  const onePatientINFO = async () => {
    try {
    const patients = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/${id}`, {
        headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
      });
      setOnePaitent(patients.data);
    console.log(patients.data, "patient");
    }
    catch (error) {
        console.log(error);
      }
};




  return (

    
    <>
   
        {state.Login.token ? (
<>
      <DoctorHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> Add new Appointment </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
        
          <form className="input"
              onSubmit={(e) => {
                e.preventDefault();
                addAppointment(e) }
              }>
         
              <div className="patientInfo">
               
           <input type="text" id="FirstName" name="FirstName" className="InputInfo" value={onePaitent.fullName}/>
           <input type="text" id="FirstName" name="FirstName" value={onePaitent.fileNumber}/>
           {/* <input type="text" id="FileNumber" name="FileNumber" placeholder="File No." onChange={(e) => setFileNumber(e.target.value)}
              required/> */}
           {/* <input type="number" id="age" name="age" placeholder="Age" onChange={(e) => setAge(e.target.value)}
              required/> */}
              <div className="input-container">

              <input type="text" id="diabetesType" name="FirstName" placeholder="Your Clinic or Hospital" className="InputInfo" onChange={(e) => setClinic(e.target.value)}/>

              <div className="box">
          <input
                ref={ref}
                type="text"
                id = "date"
                value={date}
                placeholder="   Choose date"
                onChange={(e) => setDate(e.target.value)}
                onFocus={() => (ref.current.type = "date")}
                style={{ border: "none" , borderBottom: "solid 1px rgba(128, 128, 128, 0.571)" , width: "99%" , marginTop: "1rem" , padding: "0.6rem" , borderRadius: "0"}}
                onBlur={() => (ref.current.type = "text")}
                required
                />
                </div>
              
                </div>
                <div className="diabetesTypeSelect1">
                  <select id="diabetesType" name="diabetesType" onChange={(e) => setDay(e.target.value)}
                  required>
                <option value="none" selected disabled hidden> --Choose Day-- </option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                </select>
                </div>
                <div>
                <select id="diabetesType" name="diabetesType" onChange={(e) => setTime(e.target.value)}
                required>
                
                <option value="none" selected disabled hidden> --Choose Time-- </option>
                <option value="9:00AM">9:00AM</option>
                <option value="9:30AM">9:30AM</option>
                <option value="10:00AM">10:00AM</option>
                <option value="10:30AM">10:30AM</option>
                <option value="11:00AM">11:00AM</option>
                <option value="11:30AM">11:30AM</option>
                <option value="12:00PM">12:00PM</option>
                <option value="12:30PM">12:30PM</option>
                <option value="1:00PM">1:00PM</option>
                <option value="1:30PM">1:30PM</option>
                <option value="2:00PM">2:00PM</option>
                <option value="2:30PM">2:30PM</option>
                <option value="2:30PM"></option>
              </select>
                </div>

                <input className="btn1 submitBtn" type = "submit" value = "Submit" />
            <input type = "reset" value = "CANCEL"/>
              </div>
            
           
             
{/*             
            <p> <Moment format="D/M/Y">
            {date} 
            </Moment> {day} {time} </p>
            */}
          </form>
          
          
         
        </div>
      </aside>

      </>
    ) : ( 
    <Home />
    )
}
    </>
  );
};

export default AddAppointment;
