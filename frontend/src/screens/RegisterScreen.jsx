import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterScreen = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    fullName: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <>
      <FormContainer>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group
            className="my-2"
            controlId="fullName">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Full Name"
              value={data.fullName}
              onChange={(e) => setData({ ...data, fullName: e.target.value })}></Form.Control>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              placeholder="Enter Username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}></Form.Control>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}></Form.Control>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={data.password}
              autoComplete="off"
              onChange={(e) => setData({ ...data, password: e.target.value })}></Form.Control>
          </Form.Group>

          <Form.Group
            className="my-2"
            controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Conform Password"
              value={data.confirmPassword}
              autoComplete="off"
              onChange={(e) =>
                setData({ ...data, confirmPassword: e.target.value })
              }></Form.Control>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mt-3">
            Sign Up
          </Button>
          <Row className="py-3">
            <Col>
              Already have an account? <Link to="/login">Login</Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </>
  );
};
export default RegisterScreen;
