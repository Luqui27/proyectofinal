import React, { useState } from 'react';

function FormUsuarios() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [users, setUsers] = useState([{name:'Lucas Gonzalo',email:'luqita@gmail.com',id:991},{name:'Ernesto', email:'ernesto@gmail.com',id:884}]);
  const [editingUserId, setEditingUserId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (formData.name && formData.email) {
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
      setFormData({ name: '', email: '' });
    }
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const userToEdit = users.find((user) => user.id === userId);
    setFormData({ name: userToEdit.name, email: userToEdit.email });
  };

  const handleDelete = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h1>Formulario de Usuarios</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingUserId !== null ? 'Guardar' : 'Enviar'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
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
