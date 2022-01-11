import React, {useState} from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoginBack from '../LoginBack'

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
   <LoginBack />
    <div className="VERIFIED">
    <aside className="verfidForm">
  <form
    className="input"
    onSubmit={(e) => {
      e.preventDefault();
      completePatientReagistser(e);
    }}
  >
      <h1 className="verTitle"> Verified Account </h1>

{/* <label for="FileNumber"> File Number : </label> */}
    <input
      type="text"
      className="inputVerified"
      id="FileNumberVerified"
      name="FileNumber"
      placeholder="File Number .."
      onChange={(e) => setFileNumber(e.target.value)}
      required
    />

    {/* <label for="email"> Email: </label> */}
    <input
      type="text"
      id="EmailVerified"
      name="Email"
      className="inputVerified"
      placeholder="Your email .."
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    {/* <label for="password"> Password : </label> */}
    <input
      type="password"
      id="passwordVerified"
      name="password"
      className="inputVerified"
      placeholder="Your password .."
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <input id="verifiedButton" type="submit" value="Verified" />
    </form>
    </aside>
    <div class="vl3"></div>

    
    <p className="ver"> Account verified? Login 
    <Link className="a" to="/login"> Here</Link> </p>

    </div>
    
    </>
    )
};

export default VerifiedAccount;