import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import { Link, useNavigate } from "react-router-dom";

import axios from "axios";

// creating functional component ans getting props from app.js and destucturing them
const Step2 = ({ nextStep, handleFormData, values }) => {
    const navigate = useNavigate();
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


//   const signUp = async () => {
//     try {
//         const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, 
//         { 
//             fileNumber: handleFormData.fileNumber,
//             password: handleFormData.password,
//             email: handleFormData.email, 
//             internationalId: handleFormData.internationalId, 
//             age: handleFormData.age, 
//             gender: handleFormData.gender,
//             certificates: handleFormData.certificates,
//             letter: handleFormData.letter,
//             license: handleFormData.license,
//             fullName: handleFormData.fullName,


//         });
//         if (res.status === 201) {
//             navigate("/");
//             }
// } catch (error) {
//     console.log(error);
//   }
// }

  return (
    <div>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form onSubmit={submitFormData}>
          <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="fullName"
                defaultValue={values.fullName}
                type="text"
                placeholder="Your Full Name ..."
                onChange={handleFormData("fullName")}
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
              <Form.Label>File Number</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="fileNumber"
                defaultValue={values.fileNumber}
                type="text"
                placeholder="Your File Number ..."
                onChange={handleFormData("fileNumber")}
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="email"
                defaultValue={values.email}
                type="text"
                placeholder="email"
                onChange={handleFormData("email")}
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
              <Form.Label>Password</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                name="password"
                defaultValue={values.password}
                type="password"
                placeholder="password"
                onChange={handleFormData("password")}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Step2;