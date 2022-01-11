import React from "react";
import "./style.css";
import Doctor2 from "../images/dooo.jpeg"
import { Helmet } from "react-helmet";
const SignupHeader = () => {
  return <div>
    <Helmet>
    
  <style>{`body { background-image: url(${Doctor2}); background-size: cover; height: 912px; background-repeat: no-repeat;}`}</style>

    </Helmet>

  </div>;
};

export default SignupHeader;