import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";

const EditData = () => {
  const [state, setstate] = useState({
    name: localStorage.getItem("NAME"),
    email: localStorage.getItem("EMAIL"),
    designation: localStorage.getItem("DESIGNATION"),
    number: localStorage.getItem("NUMBER"),
  });

  const [ID, setID] = useState(null);

  const getData = () => {
    axios.put(`http://localhost:3006/users/${ID}`, {
      name: state.name,
      email: state.email,
      designation: state.designation,
      number: state.number,
    });
  };
  useEffect(() => {
    setID(localStorage.getItem("ID"));
  });
  const handler = (event) => {
    const newData = { ...state };
    newData[event.target.id] = event.target.value;
    setstate(newData);
  };

  return (
    <div>
      <div>
        <Form
          className="container"
          style={{
            width: "600px",
            height: "100%",
            margin: "0 , auto",
            paddingTop: "50px",
            border: "2px solid grey",
            padding: "50px",
          }}
        >
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="First Name"
              type="text"
              id="name"
              value={state.name}
              onChange={handler}
            />
          </Form.Field>
          <Form.Field>
            <label>Designation</label>
            <input
              placeholder="Designation"
              type="text"
              id="designation"
              value={state.designation}
              onChange={handler}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              type="email"
              id="email"
              value={state.email}
              onChange={handler}
            />
          </Form.Field>
          <Form.Field>
            <label>Mobile Number</label>
            <input
              placeholder="Number"
              type="text"
              id="number"
              value={state.number}
              onChange={handler}
            />
          </Form.Field>
          <Form.Field>
            <Checkbox label="I agree to the Terms and Conditions" />
          </Form.Field>
          <Link to="/">
            <Button onClick={getData}>Update</Button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default EditData;
