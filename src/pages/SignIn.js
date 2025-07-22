import React from 'react';

import userService from "../services/UserService";
import router from '../routes';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class SignIn extends React.Component {
  formRef = React.createRef();
  emailRef = React.createRef();
  passwordRef = React.createRef();
  handleSubmit = this.handleSubmit.bind(this);

  async handleSubmit(event) {
    event.preventDefault();

    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    await userService.auth(email, password)
      .then((res) => {
        console.log("res.data", res)
        router.navigate('/users');
      })
      .catch((error) => {
        console.error("error", error.response.data.message)
        alert(error.response.data.message);
      });
  };

  render() {
    return (
      <Row className="justify-content-md-center">
        <Col sm={3}>
          <h1>Inicio de sesión</h1>
          <Form ref={this.formRef} onSubmit={this.handleSubmit}>

            <Form.Group className="mb-3" controlId="formBasiEmail" >
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={this.emailRef} defaultValue="admin@spsgroup.com.br" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword" >
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={this.passwordRef} defaultValue="1234" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>

        </Col>
      </Row>
    );
  }
}

export default SignIn;
