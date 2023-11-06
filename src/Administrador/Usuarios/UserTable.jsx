import React from 'react';
import Table from 'react-bootstrap/Table';
import UserTableRow from './UserTableRow';

const UserTable = ({ users, handleEdit, handleDelete }) => {
  return (
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
          <UserTableRow
            key={user.id}
            user={user}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
