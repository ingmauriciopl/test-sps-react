import React from "react";
import router from '../routes';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Home extends React.Component {
  handleClick() {
    router.navigate("/");
    localStorage.clear();
  }

  render(){
    return (
        <Row className="justify-content-md-center">
          <Col sm={6}>
            <h1>SPS REACT TEST</h1>
            <p><Button variant="primary" href="/users">Usuarios</Button></p>
            <p><Button variant="danger" onClick={this.handleClick}>Salir</Button></p>
          </Col>
        </Row>
    );
  }
};

export default Home;
