import { BiCalendarPlus } from "react-icons/bi";
import DoctorHeader from "../DoctorHeader";
import React, { useEffect, useState } from "react";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";


const AddAppointment = () => {
  
      const [date, setdata] = useState(new Date());
      const [room, setroom] = useState("");
      const [name, setname] = useState("");
      const [time, settime] = useState("");
      const [description, setdescription] = useState("");
      const [dateTime, setDatetime] = useState("");
     
      const handleClick = () => {
        console.log("123");
        if (
          room === "" ||
          name === "" ||
          description === "" ||
          time === "" ||
          date === ""
        ) {
          alert("Enter all the  fields");
        }
              };
         
      useEffect(() => {
        if (date.value) {
          setDatetime(date.value.toISOString());
        }
      }, [date]);
    
  return (
      <>
      <DoctorHeader />
      <aside className="bodyRight">
      <div className="insideBody">
      <h2 className="bodyHomeh2"> Add new Appointment </h2>
      <h5 className="bodyHomeh5">  Welcome to Readings App</h5>
      
      
      <form className="form1">
        <h2>Meeting Room Booking</h2>
        <fieldset className="field">
          <legend>Meeting Room</legend>
          <select
            className="select"
            value={room}
            onChange={(e) => setroom(e.target.value)}
            required
          >
            <option value="0">--select--</option>
            <option value="1">Training Room</option>
            <option value="2">Conference Room </option>
          </select>
        </fieldset>
        <br />
        <br />
        <fieldset className="field">
          <legend>Name</legend>
          <input
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
            required
            placeholder="Enter Your Name"
          />
        </fieldset>
        <br />
        <br />
        <fieldset className="field">
          <legend>Meeting Description</legend>
          <input
            type="text"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            required
            placeholder="Enter Meeting Description"
          />
        </fieldset>
        <br />
        <br />
      </form>
      <div className="calendar">
        <CalendarComponent onChange={setdata} value={date} />
        {/* <Calendar/> */}
      </div>
      <p>{date.value && date.value.toDateString()}</p>
      <h2>Please Select your preferred slot</h2>
      <div className="btns">
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>10:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>10:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>11:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>11:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>12:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>12:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>01:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>01:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>02:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>02:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>03:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>03:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>04:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>04:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>05:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>05:30</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>06:00</button>
        </div>
        <div className="grid-item">
          <button onClick={(e) => settime(e.target.textContent)}>06:30</button>
        </div>
      </div>
      <div className="grid-item18">
        <button onClick={(e) => settime(e.target.textContent)}>07:00</button>
      </div>
      <br />
      <br />
      <footer>
        <button id="cal" onClick={handleClick}>
          Book Appointment
        </button>
      </footer>
   
    </div>
    </aside>
    </>
  )
}

export default AddAppointment