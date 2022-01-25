
import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { CgDanger } from "react-icons/cg";
import DashboaredHeader from "../DashboaredHeader";



const Dashboared = () => {
  const [user, setUser] = useState([]);

    useEffect(() => {
        getallUser();
        // eslint-disable-next-line
      }, []);

      
const state = useSelector((state) => {
  return state;
});




const getallUser = async () => {
    const allUser = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/allUsers`,
      {
        headers: {
          Authorization: `Bearer ${state.Login.token}`,
        },
      }
    );
    // if (allUser.data.result.status.status === "accepted" || allUser.data.result.status.status === "verified") {
    // //     setUser(allUser.data);
    // // console.log(allUser.data, "all");
   
    //   }
    setUser(allUser.data);
    console.log(allUser.data, "all");
  };

return (
    <>
      <DashboaredHeader />
      <aside className="bodyRight">
        <div className="insideBody">
          <h2 className="bodyHomeh2"> All Users </h2>
          <h5 className="bodyHomeh5"> Welcome to Readings App</h5>
          {state.Login.token ? (
            <>
              {user.length ? (
                <>
                <div id="allPatients">
                  {user.map((user) => {
                    console.log(user);
                    return (
                      <div key={user._id} className="allPatientsInfo">
                        <div className="patientInfor">
                          {/* <div
                            onClick={() => {
                              onePaitent(patient._id);
                            }}> */}
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
                            <p className="contentPara">{user.role.role} </p>
                            <p className="contentPara"> P: {user.phoneNumber} </p>
                            <p className="contentPara">  </p>

                            </div>
                          {/* </div> */}
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </>
              ) : (
                <>
                <CgDanger className="ifNotIcon" />
                <p className="IfNot"> there`s no Users yet !! </p>
                
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

export default Dashboared;