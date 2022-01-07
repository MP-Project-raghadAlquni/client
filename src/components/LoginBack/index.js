import React from "react";
import "./style.css";
import diabetes from "../images/backgroundKK.jpeg";
import { Helmet } from "react-helmet";
const LoginBack = () => {
  return <div>
    <Helmet>
  <style>{`body { background-image: url(${diabetes}); background-size: cover; height: {30}; background-repeat: no-repeat;}`}</style>
    </Helmet>

  </div>;
};

export default LoginBack;