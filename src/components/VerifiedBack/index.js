import React from "react";
// import "./style.css";
import Doctor00 from "../images/DIA.jpeg"
import { Helmet } from "react-helmet";
const VerifiedBack = () => {
  return <div>
    <Helmet>
    
  <style>{`body { background-image: url(${Doctor00}); background-size: cover; height: 1113px; background-repeat: no-repeat;}`}</style>

    </Helmet>

  </div>;
};

export default VerifiedBack;