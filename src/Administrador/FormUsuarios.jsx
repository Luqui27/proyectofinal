import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';

const FormUsuarios = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isActive: false,
    password: '',
    isAdmin: false,
  });

  const [users, setUsers] = useState([
    {
      id: 991,
      name: 'Lucas Gonzalo',
      email: 'luqita@gmail.com',
      isActive: true,
      password: '*****',
      isAdmin: false,
    },
    {
      id: 884,
      name: 'Ernesto',
      email: 'ernesto@gmail.com',
      isActive: true,
      password: '*****',
      isAdmin: false,
    },
  ]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.password) {
      if (editingUserId !== null) {
        const updatedUsers = users.map((user) =>
          user.id === editingUserId ? { ...user, ...formData } : user
        );
        setUsers(updatedUsers);
        setEditingUserId(null);
      } else {
        const newUser = { ...formData, id: Date.now() };
        setUsers([...users, newUser]);
      }
      setFormData({
        name: '',
        email: '',
        isActive: false,
        password: '',
        isAdmin: false,
      });
      setIsFormVisible(false);
    }
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setFormData({
      name: userToEdit.name,
      email: userToEdit.email,
      isActive: userToEdit.isActive,
      password: userToEdit.password,
      isAdmin: userToEdit.isAdmin,
    });
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setFormData({
      name: '',
      email: '',
      isActive: false,
      password: '',
      isAdmin: false,
    });
    setIsFormVisible(false);
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleAddUser = () => {
    setIsFormVisible(true);
  };

  return (
    <div>
      <h1>Formulario de Usuarios</h1>
      {isFormVisible ? (
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
  />
</Form.Group>
<Form.Group>
  <Form.Label>Email:</Form.Label>
  <Form.Control
    type="text"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    className="form-control"
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
    type="password"
    name="password"
    placeholder="Contraseña"
    value={formData.password}
    onChange={handleChange}
    className="form-control"
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
          <Button className='btn btn-success m-1' onClick={handleSubmit}>
  {editingUserId !== null ? 'Guardar' : 'Enviar'}
</Button>
<Button className='btn btn-secondary m-1' onClick={handleCancel}>
  Cancelar
</Button>
          </Form>
        </div>
      ) : (
        <button className='btn btn-primary m-1' onClick={handleAddUser}>Agregar Usuario</button>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Activo</th>
            <th>Contraseña</th>
            <th>Administrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.isActive ? 'Sí' : 'No'}</td>
              <td>{user.password}</td>
              <td>{user.isAdmin ? 'Sí' : 'No'}</td>
              <td>
                <button className='btn btn-warning m-1' onClick={() => handleEdit(user.id)}>Editar</button>
                <button className='btn btn-danger m-1' onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default FormUsuarios;
