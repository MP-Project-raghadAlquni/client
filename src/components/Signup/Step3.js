import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { Link } from "react-router-dom";
import SignupHeader from "../SignupHeader"


// creating functional component ans getting props from app.js and destucturing them
const Step3 = ({ nextStep, handleFormData, prevStep, values }) => {
   //creating error state for validation
  const [error, setError] = useState(false);


    // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

     // checking if value of first name and last name is empty show error else take to next step
    if (
        validator.isEmpty(values.internationalId) || 
        validator.isEmpty(values.age) || 
        validator.isEmpty(values.gender)) {
      setError(true);
    } else {
      nextStep();
    }
  };

  return (
    <>
     <div className="DivForm">
     <SignupHeader />
     <h1 className="FormTitle"> Doctor's Register 2 </h1>
      <Card style={{ margin: "-10px 30rem" , width: "30%" }}>
        <Card.Body>
        <Form onSubmit={submitFormData}>
            <Form.Group className="mb-3">
              {/* <Form.Label>international Id</Form.Label> */}
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                defaultValue={values.internationalId}
                className="FormInfo"
                placeholder="international ID"
                onChange={handleFormData("internationalId")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              {/* <Form.Label>age</Form.Label> */}
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="text"
                className="FormInfo"
                defaultValue={values.age}
                placeholder="age"
                onChange={handleFormData("age")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            {/* <Form.Group className="mb-3"> */}
              {/* <Form.Label>gender</Form.Label> */}
              <select
                style={{ border: error ? "2px solid red" : "" }}
                // type="text"
                defaultValue={values.gender}
                className="FormInfo"
                placeholder="gender"
                onChange={handleFormData("gender")}
              >
                <option value="none" selected disabled hidden> --Gender-- </option>
      <option value="Male"> Male </option>
      <option value="Female"> Female </option>
      </select>
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            {/* </Form.Group> */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              
              <Button variant="primary" onClick={prevStep}  className="SignBtn2">
                {"<"} Previous
              </Button>

              <Button variant="primary" type="submit" className="SignBtn2">
              Continue {">"}
            </Button>
            </div>
          </Form>
          <div class="vl"></div>
          <aside className="ToLogin4">
            <p className="ParaLogin">
            Already have an account?  <span className="Parasize"> Login <Link className="Link" to = "/login"> here </Link> </span> </p>
          </aside>
        </Card.Body>
      </Card>
      </div>
    </>
  );
};

export default Step3;