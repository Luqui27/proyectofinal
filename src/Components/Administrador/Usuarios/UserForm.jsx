import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const UserForm = ({ formData, handleChange, handleSubmit, handleCancel }) => {
  const { name, email, password } = formData;

  const isFormValid = () => {
    const isNameValid = name.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Validación de email
    const isPasswordValid = password.trim().length >= 6; // Validación de longitud de contraseña

    return isNameValid && isEmailValid && isPasswordValid;
  };

  return (
    <div className='m-5'>
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
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            required
          />
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
            type="text"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            required
          />
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
          onClick={handleSubmit}
          disabled={!isFormValid()} // Deshabilita el botón si el formulario no es válido
        >
          {formData.editingUserId !== null ? 'Guardar' : 'Enviar'}
        </Button>
        <Button className='btn btn-secondary m-1' onClick={handleCancel}>
          Cancelar
        </Button>

        {!isFormValid() && (
          <Alert variant="danger" className="mt-3">
            Por favor, complete todos los campos obligatorios.
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default UserForm;
