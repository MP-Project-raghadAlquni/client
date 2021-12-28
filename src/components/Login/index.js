import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./../../reducers/loginn";
import "./style.css";
import axios from "axios";
import Home from "../Home";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return state;
  });

  const login = async () => {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email,
      password,
    });

    if (res.status !== 200) {
      setMessage(res.data);
    } else {
      const data = {
        role: res.data.result.role,
        token: res.data.token,
        id: res.data.result.id,
      };
      console.log(res);
      dispatch(userLogin(data));

      if (res.data.result.role.role === "patient") {
        navigate("/Patient");
      } else if (res.data.result.role.role === "doctor") {
        navigate("/Doctor");
      } else if (res.data.result.role.role === "admin") {
        navigate("/DoctorHome");
      }
    }
  };

  return (
    <>
      <div className="body">
        {!state.Login.token ? (
          <div className="login">
            <form
              className="input"
              onSubmit={(e) => {
                e.preventDefault();
                login(e);
              }}
            >
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
        ) : (
          <Home />
        )}
      </div>
    </>
  );
};

export default Login;
