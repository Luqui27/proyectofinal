import React, { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserTable from './UserTable';

const FormUsuariosContainer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isActive: false,
    password: '',
    isAdmin: false,
    editingUserId: null,
  });

  const [users, setUsers] = useState([]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/usuarios');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async () => {
    try {
      const method = formData.editingUserId ? 'PUT' : 'POST';
      const url = formData.editingUserId
        ? `http://localhost:3000/api/usuarios/${formData.editingUserId}`
        : 'http://localhost:3000/api/usuarios';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchData();
        setFormData({
          name: '',
          email: '',
          isActive: false,
          password: '',
          isAdmin: false,
          editingUserId: null,
        });
        setIsFormVisible(false);
      } else {
        console.error('Error al enviar formulario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
    }
  };

  const handleEdit = (userId) => {
    const userToEdit = users.find((user) => user._id === userId);
    if (userToEdit) {
      setFormData({
        ...formData,
        editingUserId: userId,
        name: userToEdit.name,
        email: userToEdit.email,
        isActive: userToEdit.isActive,
        password: userToEdit.password,
        isAdmin: userToEdit.isAdmin,
      });
      setIsFormVisible(true);
    } else {
      console.error('Usuario no encontrado para editar');
    }
  };
  

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      isActive: false,
      password: '',
      isAdmin: false,
      editingUserId: null,
    });
    setIsFormVisible(false);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/usuarios/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        console.error('Error al eliminar usuario:', response.statusText);
      }
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  };

  const handleAddUser = () => {
    setIsFormVisible(true);
  };

  return (
    <div>
      <h1>Formulario de Usuarios</h1>
      {isFormVisible ? (
        <UserForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      ) : (
        <button className='btn btn-primary m-1' onClick={handleAddUser}>
          Agregar Usuario
        </button>
      )}
      <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
    </div>
  );
};

export default FormUsuariosContainer;
