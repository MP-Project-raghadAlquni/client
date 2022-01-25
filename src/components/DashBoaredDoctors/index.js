
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgDanger } from "react-icons/cg";
import DashboaredHeader from "../DashboaredHeader";



const DashboaredDoctors = () => {
  const navigate = useNavigate();
  const [allDoctors, setAllDoctors] = useState([]);

    useEffect(() => {
        getallDoctor();
      // eslint-disable-next-line
      }, []);

      
const state = useSelector((state) => {
  return state;
});




const getallDoctor = async () => {
    const allDoctor = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/getAllDoctorAcceotedToAdmin`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    setAllDoctors(allDoctor.data);
    console.log(allDoctor.data, "all");
  };

  const oneDoctor = (id) => {
    console.log(id);
    navigate(`/Doctor/${id}`);
  };

return (
    <>
      <DashboaredHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> All Doctors </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {allDoctors.length ? (
                <>
                <div id="allPatients">
                  {allDoctors.map((user) => {
                    console.log(user);
                    return (
                      <div key={user._id} className="allPatientsInfo">
                        <div className="patientInfor">
                          <div
                            onClick={() => {
                              oneDoctor(user._id);
                            }}>
                                <div className="imgProfile">
                                <img
                            className="ProfileImg"
                            src={user.avatar}
                            alt="patientImg"
                          />
                          {/* <BiDotsHorizontalRounded className="GotoPatient"/> */}

                        </div>
                        <div className= "content">
                            <h1 className="contentPara FUname"> {user.fullName} </h1>
                            <p className="fN"> {user.fileNumber} </p>
                            {/* <p className="contentPara">{user.diabetesType} </p> */}
                            <p className="contentPara">{user.gender} , {user.age} years old </p>
                            <p className="contentPara"> E: {user.email} </p>
                            <p className="contentPara"> P: {user.phoneNumber} </p>
                            <p className="contentPara">  </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </>
              ) : (
                <>
                <CgDanger className="ifNotIcon" />
                <p className="IfNot"> there`s no Doctors Accepted yet !! </p>
                
                </>
              )
              
              }
            </>
          ) : (
            ""
          )}
        </div>
      </aside>
    </>
  );
};

export default DashboaredDoctors;