import React from "react";
import "./style.css";
import Doctor2 from "../images/dd.jpeg"
import { Helmet } from "react-helmet";
const SignupHeader = () => {
  return <div>
    <Helmet>
    
  <style>{`body { background-image: url(${Doctor2}); background-size: cover; height: 912px; background-repeat: no-repeat; border: none;}`}</style>

    </Helmet>

  </div>;
};

export default SignupHeader;