import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "./../Fairbase";

// creating functional component ans getting props from app.js and destucturing them
const Final = ({ nextStep, handleFormData, prevStep, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [letter, setLetter] = useState("");
  const [license, setLicense] = useState("");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const [url, setUrl] = useState([]);
  // after form submit validating the form data using validator

  // checking if value of first name and last name is empty show error else take to next step
  if (
    validator.isEmpty(values.internationalId) ||
    validator.isEmpty(values.age) ||
    validator.isEmpty(values.gender)
  ) {
    setError(true);
  }

  const handleCertificates = (e) => {
      console.log(e.target.files[0]);
    handleUpload(e.target.files[0]);
  };

  const handleLetter = (e) => {
    console.log(e.target.files[0]);
  handleUploadLetter(e.target.files[0]);
};

const handleLicense = (e) => {
    console.log(e.target.files[0]);
  handleUploadLicense (e.target.files[0]);
};

  const handleUpload = (value) => {
    const uploadTask = storage
      .ref(`files/${value.name}`)
      .put(value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("files")
          .child(value.name)
          .getDownloadURL()
          .then((newUrl) => {
            setUrl([...url, newUrl]);
            setCertificates(newUrl);

            console.log();
            // console.log(newUrl);
            handleFormData("certificates",[...url, newUrl])
          });
      }
    );
  };

  const handleUploadLetter = (value) => {
    const uploadTask = storage
      .ref(`files/${value.name}`)
      .put(value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("files")
          .child(value.name)
          .getDownloadURL()
          .then((newUrl) => {
            setUrl([...url, newUrl]);
            setLetter(newUrl);
            // console.log(newUrl);
            handleFormData("letter",[...url, newUrl])
          });
      }
    );
  };


  const handleUploadLicense  = (value) => {
      console.log(value,"value licenses");
    const uploadTask = storage
      .ref(`files/${value.name}`)
      .put(value);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("files")
          .child(value.name)
          .getDownloadURL()
          .then((newUrl) => {
              console.log(newUrl);
            setUrl([...url, newUrl]);
            setLicense(newUrl);
            // console.log(newUrl);
            handleFormData("license",[...url, newUrl])
          });
      }
    );
  };


  const signUp = async (e) => {
      console.log(license,"license");
      console.log(values,"values");
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/signup`, {
        fileNumber: values.fileNumber,
        password: values.password,
        email: values.email,
        internationalId: values.internationalId,
        age: values.age,
        gender: values.gender,
        certificates: certificates,
        letter: letter,
        license: license,
        fullName: values.fullName,
      });
      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Card style={{ marginTop: 100 }}>
        <Card.Body>
          <Form
            className="input"
            onSubmit={(e) => {
              e.preventDefault();
              signUp(e);
            }}
          >
            <Form.Group className="mb-3">
              <Form.Label>license</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="license"
                onChange={handleLicense}
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
              <Form.Label>letter</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="letter"
                onChange={handleLetter}
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
              <Form.Label>certificate 1</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="certificates"
                onChange={handleCertificates}
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
              <Form.Label>certificate 2</Form.Label>
              <Form.Control
                style={{ border: error ? "2px solid red" : "" }}
                type="file"
                placeholder="certificates"
                onChange={handleCertificates}
              />
              {error ? (
                <Form.Text style={{ color: "red" }}>
                  This is a required field
                </Form.Text>
              ) : (
                ""
              )}
            </Form.Group>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button variant="primary" onClick={prevStep}>
                Previous
              </Button>

              <input className="btn1 submitBtn" type="submit" value="Submit" />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default Final;
