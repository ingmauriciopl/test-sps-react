import React from "react";

import userService from "../services/UserService";
import router from '../routes';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

class Users extends React.Component {

  state = {
    usuarios: [],
    status: null,

    formTitle: 'CREAR',

    id: 0,
    email: '',
    name: '',
    type: '',
    password: '',

    showModal: false
  }

  handleSubmitForm = this.handleSubmitForm.bind(this);

  async handleClickDelete(id) {
    await userService.delete(id)
      .then(res => {
        this.getUsers();
      })
      .catch((error) => {
        console.error("error", error.response.data.message)
        alert(error.response.data.message);
      });
  }

  handleClickCreateModal = () => {
    this.setState({
      showModal: true,
      formTitle: 'CREAR',

      id: 0,
      email: '',
      name: '',
      type: '',
      password: ''
    });
  };

  handleClickEditModal = (usuario) => {
    this.setState({
      showModal: true,
      formTitle: 'EDITAR',

      id: usuario.id,
      email: usuario.email,
      name: usuario.name,
      type: usuario.type,
      password: usuario.password
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  async handleSubmitForm(event) {
    event.preventDefault();

    const data = {
      email: this.state.email,
      name: this.state.name,
      type: this.state.type,
      password: this.state.password
    }

    if (this.state.formTitle === 'CREAR') {
      await userService.create(data)
        .then(res => {
          this.getUsers();
          this.handleCloseModal();
        })
        .catch((error) => {
          console.error("error", error.response.data.message)
          alert(error.response.data.message);
        });
    } else {
      console.log("id", this.state.id);

      await userService.update(this.state.id, data)
        .then(res => {
          this.getUsers();
          this.handleCloseModal();
        })
        .catch((error) => {
          console.error("error", error.response.data.message)
          alert(error.response.data.message);
        });
    }
  };

  async getUsers() {
    await userService.list()
      .then(res => {
        this.setState({
          usuarios: res.data.users,
          status: 'success'
        });
      })
      .catch((error) => {
        console.error("error", error.response.data.message)
        alert(error.response.data.message);
      });
  }

  async componentDidMount() {
    await this.getUsers();
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleClickSingOut() {
    router.navigate("/");
    localStorage.clear();
  }


  render() {
    if (this.state.status === 'success' && this.state.usuarios.length >= 1) {
      return (
        <Container>

          <Row className="justify-content-md-center">
            <Col sm={6}>
              <h1>SPS REACT TEST</h1>
              <p>
                <Button size="sm" variant="secondary" onClick={this.handleClickSingOut}>Cerrar sesión</Button>
              </p>
            </Col>
          </Row>

          <Row className="justify-content-md-center">
            <Col sm={6}>
              <h2>Usuarios</h2>

              <p>
                <Button variant="primary" onClick={this.handleClickCreateModal}>Crear</Button>
              </p>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Correo</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Opciones</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.state.usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.email}</td>
                        <td>{usuario.name}</td>
                        <td>{usuario.type}</td>
                        <td>
                          <Button variant="warning" size="sm"
                            onClick={() => this.handleClickEditModal(usuario)}>
                            Editar
                          </Button>

                          <Button variant="danger" size="sm"
                            onClick={() => this.handleClickDelete(usuario.id)}>
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>

            </Col>
          </Row>

          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{this.state.formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    name="type"
                    type="text"
                    value={this.state.type}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="passowrd"
                    value={this.state.password}
                    onChange={this.handleOnChange}
                  />
                </Form.Group>

              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={this.handleSubmitForm}>
                Enviar
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      );
    } else if (this.state.status === 'success' && this.state.usuarios.length === 0) {
      return (<p>No hay usuarios registrados</p>)
    } else {
      return (<p>Cargando</p>)
    }

  }
}

export default Users;
