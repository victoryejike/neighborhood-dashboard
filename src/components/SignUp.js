import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { authentication, createUserProfileDocument } from "../firebase";
import { Link, useHistory } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});
  let history = useHistory();

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    authentication
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        let user = userCredential.user;
        createUserProfileDocument(user);
        console.log(user);
        sessionStorage.setItem("user", JSON.stringify(user));
        setNewUser(user);
        history.push("/");
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      <Form
        style={{
          width: "90%",
          margin: "0 auto",
          border: "1px solid grey",
          padding: "15px"
        }}
      >
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(event) => onChangeHandler(event)}
            name="userEmail"
            // value={email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="userPassword"
            value={password}
            onChange={(event) => onChangeHandler(event)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Sign Up
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
