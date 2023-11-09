import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const UserForm = ({ formData, handleChange, handleSubmit, handleCancel }) => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const errors = {
      name: (formData.name.length >= 6 && formData.name.length <= 50) ? '' : 'El nombre debe tener entre 6 y 50 caracteres',
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) ? '' : 'Ingrese un email válido',
      password: (formData.password.length >= 6 && formData.password.length <= 20) ? '' : 'La contraseña debe tener entre 6 y 20 caracteres',
    };

    setFormErrors(errors);

    return Object.values(errors).every((error) => error === '');
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={10} sm={10} md={6} lg={6}>
          <Form>
            <Form.Group>
              <Form.Label>Nombre:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <small className="text-danger">{formErrors.name}</small>
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <small className="text-danger">{formErrors.email}</small>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                label="Activo"
                className="form-check"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Contraseña:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <small className="text-danger">{formErrors.password}</small>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                name="isAdmin"
                checked={formData.isAdmin}
                onChange={handleChange}
                label="Administrador"
                className="form-check"
              />
            </Form.Group>

            <Button
              className='btn btn-success m-1'
              onClick={handleFormSubmit}
            >
              {formData.editingUserId !== null ? 'Guardar' : 'Enviar'}
            </Button>
            <Button className='btn btn-secondary m-1' onClick={handleCancel}>
              Cancelar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UserForm;
