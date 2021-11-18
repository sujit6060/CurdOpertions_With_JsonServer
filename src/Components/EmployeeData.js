import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, Button, Icon, Table, Image, Header } from "semantic-ui-react";
import "../Components/StyleEmp.css";

function EmployeeData() {
  const [apidata, setapidata] = useState([]);

  const [state, setState] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3006/users").then((data) => {
      setapidata(data.data);
    });
  });

  const handler = (event) => {
    const newData = { ...state };
    newData[event.target.id] = event.target.value;
    setState(newData);
  };

  const getData = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3006/users", {
        name: state.name,
        email: state.email,
        age: state.age,
      })
      .then((res) => {
        console.log(res.data);
      });
    setState("");
  };

  return (
    <div>
      <br></br>
      <Form className="container">
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="First name"
            id="name"
            value={state.name}
            placeholder="First name"
            onChange={handler}
          />
          <Form.Input
            fluid
            label="email"
            id="email"
            value={state.email}
            placeholder="email"
            onChange={handler}
          />
          <Form.Input
            fluid
            label="Age"
            id="age"
            value={state.age}
            placeholder="age"
            onChange={handler}
          />
          <Button onClick={getData}>AddData</Button>
        </Form.Group>
      </Form>
      <div className="container" style={{ paddingLeft: "450px" }}>
        <Table
          basic="very"
          celled
          collapsing
          style={{
            backgroundColor: "black",
            color: "white",
            border: "2px solid black",
            width: "400px",
            padding: "30px",
          }}
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell style={{ color: "white" }}>
                {" "}
                Name{" "}
              </Table.HeaderCell>
              <Table.HeaderCell style={{ color: "white" }}>
                Age
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {apidata.map((ele) => (
            <Table.Body style={{ color: "white" }}>
              <Table.Row>
                <Table.Cell>
                  <Header as="h4" image>
                    <Header.Content style={{ color: "white" }}>
                      {ele.name}
                      <Header.Subheader style={{ color: "white" }}>
                        {ele.email}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell style={{ color: "white" }}>{ele.age}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </div>
    </div>
  );
}

export default EmployeeData;
