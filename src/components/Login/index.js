import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./../../reducers/loginn";
import "./style.css";
import axios from "axios";
import LoginBack from "../LoginBack";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line
  const [message, setMessage] = useState("");

  const state = useSelector((state) => {
    return state;
  });
  // console.log(state.result.role);
  const login = async () => {
    try {
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
      email,
      password,
    });

    if (res.status !== 200) {
      setMessage(res.data);
    } else {
      const data = {
        role: res.data.role,
        token: res.data.token,
        user: res.data.result,
      };


      console.log(res.data.result._id, "ress");
      dispatch(userLogin(data));

      if (res.data.result.role.role === "patient") {
        navigate(`/Patient/${res.data.result._id}`);
      } else if (res.data.result.role.role === "doctor") {
        navigate(`/Doctor/${res.data.result._id}`);
      } else if (res.data.result.role.role === "admin") {
        navigate("/AdminPage");
      }
    }
    } catch (error) {
      setMessage(`The email or password is incorrect`);
    }
  };




  return (
    <>
      <LoginBack />
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
              <aside className="LoginForm">
                <h1> Login </h1>
                {/* <label for="email"> Email: </label> */}
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  className="BlockInput"
                  placeholder="Email .."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* <label for="password"> Password : </label> */}
                <input
                  type="password"
                  id="password"
                  className="BlockInput"
                  name="password"
                  placeholder="Password .."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <input id="loginButton" type="submit" value="Login" />
                <br/>
                <br/>
                {message ? <div className="message">{message}</div> : ""}
              </aside>
              <div class="vl2"></div>
              <div className="toVerified">
                <p className="patientVerified">
                  {" "}
                  As a Patient, You don't verified your account? Verified{" "}
                  <Link to="/VerifiedAccount" className="a">
                    here
                  </Link>
                </p>

                <div className="hrr"> </div>
                <p className="doctorSignup">
                  {" "}
                  As a Doctor, you don't have a membership? Register{" "}
                  <Link to="/" className="a">
                    here
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        ) : (
          <>
          <login />
          </>
        )}
      </div>
    </>
  );
};

export default Login;
