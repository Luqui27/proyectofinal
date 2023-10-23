import React, { useState } from 'react';

function FormUsuarios() {
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
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Formulario de Usuarios</h1>
      <div>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isActive">Activo:</label>
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="isAdmin">Administrador:</label>
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
        </div>
        <button onClick={handleSubmit}>
          {editingUserId !== null ? 'Guardar' : 'Enviar'}
        </button>
        {editingUserId !== null && (
          <button onClick={handleCancel}>Cancelar</button>
        )}
      </div>
      <table>
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
                <button onClick={() => handleEdit(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormUsuarios;
