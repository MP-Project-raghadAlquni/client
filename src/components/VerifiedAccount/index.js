import React, {useState} from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const VerifiedAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [message, setMessage] = useState("");

  const completePatientReagistser = async () => {
    try {
    const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/compeleteRegister`, 
      {
      fileNumber: fileNumber ,
      email: email,
      password: password,
      });
      console.log(res);
    if (res.status == 200) {
      Swal.fire({
        title: `Account Verified`,
        text: `Go to the login page to login to your account`,
        // width: 400,
        // padding: '3em',
        // color: '##000000',
        // background: '#fff ',
      })

    } 
  }
  catch (error) {
    console.log(error);
  };
  }

  return (
  <>
    <div className="login">
  <form
    className="input"
    onSubmit={(e) => {
      e.preventDefault();
      completePatientReagistser(e);
    }}
  >

<label for="FileNumber"> File Number : </label>
    <input
      type="text"
      id="FileNumber"
      name="FileNumber"
      placeholder="Your File Number .."
      onChange={(e) => setFileNumber(e.target.value)}
      required
    />

    <label for="email"> Email: </label>
    <input
      type="text"
      id="Email"
      name="Email"
      placeholder="Your email .."
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <label for="password"> Password : </label>
    <input
      type="password"
      id="password"
      name="password"
      placeholder="Your password .."
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <input id="loginButton" type="submit" value="Submit" />
    </form>
    Account verified? Go to Login
    <Link to="/login">Here</Link> 
    </div>
    
    </>
    )
};

export default VerifiedAccount;