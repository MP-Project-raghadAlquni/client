import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { Link } from "react-router-dom";
import SignupHeader from "../SignupHeader"

// creating functional component ans getting props from app.js and destucturing them
const Step2 = ({ nextStep, handleFormData, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.fileNumber) ||
      validator.isEmpty(values.password) ||
      validator.isEmpty(values.email) ||
      validator.isEmpty(values.fullName) 
    ) {
      setError(true);
    } else {
      nextStep();
    }
  };


  return (
    <div className="DivForm">
     <SignupHeader />
     <h1 className="FormTitle"> Doctor's Register </h1>
      <Card style={{ margin: "-10px 30rem" , width: "30%"}}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3">
              <Form.Control 
                style={{ borderBottom: error ? "2px solid red" : "" }}
                name="fullName"
                className="FormInfo"
                defaultValue={values.fullName}
                type="text"
                placeholder="Full Name ..."
                onChange={handleFormData("fullName")}
              />
              {error ? (
                <Form.Text style={{ color: "red", marginLeft:"5rem"}}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                style={{ borderBottom: error ? "2px solid red" : "" }}
                name="fileNumber"
                className="FormInfo"
                defaultValue={values.fileNumber}
                type="text"
                placeholder= "File Number ..."
                onChange={handleFormData("fileNumber")}
              />
              {error ? (
                <Form.Text style={{ color: "red", marginLeft:"5rem" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                style={{ borderBottom: error ? "2px solid red" : "" }}
                name="email"
                className="FormInfo"
                defaultValue={values.email}
                type="email"
                placeholder="Email ..."
                onChange={handleFormData("email")}
              />
              {error ? (
                <Form.Text style={{ color: "red" , marginLeft:"5rem" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                style={{borderBottom: error ? "2px solid red" : "" }}
                name="password"
                defaultValue={values.password}
                type="password"
                className="FormInfo"
                placeholder="Password ..."
                onChange={handleFormData("password")}
              />
              {error ? (
                <Form.Text style={{ color: "red", marginLeft:"5rem"}}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Button variant="primary" type="submit" className="SignBtn">
              Continue
            </Button>
          </Form>
          <div class="vl"></div>
          <aside className="ToLogin">
            <p className="ParaLogin">
            Already have an account?  <span className="Parasize"> Login <Link className="Link" to = "/login"> here </Link> </span> </p>
          </aside>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Step2;