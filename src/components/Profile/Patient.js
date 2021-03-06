import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import PatientHeader from "../PatientHeader";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { GrFormClose } from "react-icons/gr";


const PatientProfile = () => {
  const id = useParams().id;
  // const [avatar, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // eslint-disable-next-line
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [oneUserProfile, setOneUserProfile] = useState("");
  const [show, setShow] = useState(false);


  useEffect(() => {
    oneUserProfileFun();
      // eslint-disable-next-line
  }, []);

  const state = useSelector((state) => {
    return state;
  });


  const handleChange = () => {
    setShow(!show);
  };


  const editProfile = async (id) => {
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/doctorProfile/${id}`,
        {
          _id: id,
          // avatar: avatar || oneUserProfile.avatar,
          fullName: fullName || oneUserProfile.fullName,
          email: email || oneUserProfile.email,
          phoneNumber: phoneNumber || oneUserProfile.phoneNumber,
          age: age || oneUserProfile.age,
        },
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      console.log("here", res);
      if (res.status === 200) {
        Swal.fire({
          title: `Profile has been updated `,
          width: 400,
          padding: "3em",
          color: "##000000",
          background: "#fff ",
          backdrop: `
                rgba(121, 186, 190,0.1)
                left top
                no-repeat`,
        });
        oneUserProfileFun(state.Login.token);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const oneUserProfileFun = async () => {
    try {
      const user = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${state.Login.token}`,
          },
        }
      );
      setOneUserProfile(user.data);
    } catch (error) {
      console.log(error);
    }
  };


  const Close = () => {
    setShow(false)
  }
  return (
    <>
     <PatientHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> Patient Profile </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          <div className="ReadingsTables">
            <div className="DivDoctorProfileImg">
              <img
                className="DoctorProfileImg"
                src={oneUserProfile.avatar}
                alt="patientImg"
              />
            </div>
            <aside className="RightSideProfile1">
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> Name: </h3>{" "}
                {oneUserProfile.fullName}
              </p>
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> File Number: </h3>
                {oneUserProfile.fileNumber}
              </p>
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> Email: </h3>{" "}
                {oneUserProfile.email}
              </p>
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> International ID: </h3>
                {oneUserProfile.internationalId}
              </p>
            </aside>
            <aside className="RightSideProfile22">
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> Gender: </h3>{" "}
                {oneUserProfile.gender}
              </p>
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> Age: </h3>
                {oneUserProfile.age}
              </p>
              <p className="paraProfile">
                {" "}
                <h3 className="titleProfile"> P: </h3>{" "}
                {oneUserProfile.phoneNumber}
              </p>
            </aside>
            {!show ? (
              <div>
                <button
                  className="AddReadingsBTN btnNewReadings editProf"
                  onClick={handleChange}
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <>
                <div className="pup">
                  <h1 id="tableTiltle3"> Edit Profile </h1>
                  <img
                    className="DoctorProfileImg"
                    src={oneUserProfile.avatar}
                    alt="patientImg"
                  />
                  <div className="pup2">
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> Name: </h3>{" "}
                      <input
                        className="ProInp"
                        type="text"
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </p>
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> File Number: </h3>
                      {oneUserProfile.fileNumber}
                    </p>
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> Email: </h3>{" "}
                      {oneUserProfile.email}
                    </p>
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> International ID: </h3>
                      {oneUserProfile.internationalId}
                    </p>
                  </div>
                  <div className="pup3">
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> Gender: </h3>{" "}
                      {oneUserProfile.gender}
                    </p>
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> Age: </h3>
                      <input
                        className="ProInp"
                        type="text"
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </p>
                    <p className="paraProfile">
                      {" "}
                      <h3 className="titleProfile"> P: </h3>{" "}
                      <input
                        className="ProInp"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        type="text"
                      />
                    </p>
                  </div>
<div className="Btns">
                  <button
                    className="EditBtn"
                    onClick={() => {
                      editProfile(oneUserProfile._id);
                    }}
                  >
                    Edit
                  </button>

                  </div>
                  {/* </form> */}
                  <button className="Close" onClick={Close}> <GrFormClose /> </button>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default PatientProfile;
