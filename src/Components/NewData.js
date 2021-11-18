import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { Header, Table } from "semantic-ui-react";

const NewData = () => {
  const [state, setstate] = useState({
    name: "",
    designation: "",
    email: "",
    number: "",
  });

  const handler = (event) => {
    const newData = { ...state };
    newData[event.target.id] = event.target.value;
    setstate(newData);
  };

  const getData = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3006/users", {
        name: state.name,
        email: state.email,
        designation: state.designation,
        number: state.number,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("Error");
      });
    setstate(" ");
  };

  const [getdata, setGetdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3006/users")
      .then((data) => {
        setGetdata(data.data);
      })
      .catch((err) => {
        console.log("Error");
      });
    // eslint-disable-next-line
  }, [getData]);

  const [deleted, setdeleted] = useState(false);

  const deleteData = (id) => {
    axios.delete(`http://localhost:3006/users/${id}`).then((res) => {
      setdeleted(!deleted);
    });
  };

  const editData = (id, name, email, designation, number) => {
    localStorage.setItem("ID", id);
    localStorage.setItem("NAME", name);
    localStorage.setItem("EMAIL", email);
    localStorage.setItem("DESIGNATION", designation);
    localStorage.setItem("NUMBER", number);
  };

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center", fontSize: "25px" }}>
          Curd Operations With Json Server
        </h1>
        <Form
          className="container"
          style={{
            width: "600px",
            height: "100%",
            margin: "0 , auto",
            padding: "50px",
            paddingTop: "50px",
            border: "2px solid grey",
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
          <Button onClick={getData}>Submit</Button>
        </Form>
      </div>

      <Table
        basic="very"
        celled
        collapsing
        className="container"
        style={{
          width: "800px",
          height: "100%",
          margin: "0 , auto",
          paddingTop: "50px",
          paddingBottom: "50px",
          border: "2px solid grey",
          padding: "40px",
        }}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Designation</Table.HeaderCell>
            <Table.HeaderCell>Mobile Number</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {getdata.map((ele, index) => (
            <Table.Row key={ele.id}>
              <Table.Cell>
                <Header.Content>{ele.name}</Header.Content>
              </Table.Cell>
              <Table.Cell>{ele.email}</Table.Cell>
              <Table.Cell>{ele.designation}</Table.Cell>
              <Table.Cell>{ele.number}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => {
                    deleteData(ele.id);
                  }}
                >
                  Delete
                </Button>
              </Table.Cell>
              <Table.Cell>
                <Link to="/update">
                  <Button
                    onClick={() =>
                      editData(
                        ele.id,
                        ele.name,
                        ele.email,
                        ele.designation,
                        ele.number
                      )
                    }
                  >
                    Edit
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
};

export default NewData;
