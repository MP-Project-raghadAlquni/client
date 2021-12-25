import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { userLogin } from "./../../reducers/login";
import "./style.css";
import axios from "axios";
import Home from "../Home"

const Login = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");


  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("your in ", token);
    setToken(token);
  }, []);


//   const state = useSelector((state) => {
//     return state
//   });


  const login = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      console.log(res);
      setToken(res.data.token)
      localStorage.setItem("token", res.data.token);

    if(res.data.result.role.role === "patient") { 
        navigate("/PatientHome")
    } else if (res.data.result.role.role === "doctor"){
        navigate("/DoctorHome")
    } else if (res.data.result.role.role === "admin"){
        navigate("/DoctorHome")
    } 

} catch (error) {
    console.log(error);
    setMessage(error.response.data.message);
}
}

  return (
    <>
      {!token ? (
        <div className="login">
          <form>
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
            <button onClick={login}> Login </button>

            <div className="toVerified">
              <p className="patientVerified">
                {" "}
                As a Patient, You don't verified your account? Click{" "}
                <Link to="/VerifiedAccount">Here</Link>
              </p>
            </div>

            <div>
              <p className="doctorSignup">
                {" "}
                As a Doctor, you don't have a membership? Click{" "}
                <Link to="/Signup">Here</Link> to Register{" "}
              </p>
            </div>
          </form>
        </div>
      ) : <Home  />
      }
    </>
  );
};

export default Login;
