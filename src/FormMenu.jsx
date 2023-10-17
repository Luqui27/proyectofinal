import React, { useState } from 'react';

function FormMenu() {
  const [formDataMenu, setFormDataMenu] = useState({ name: '', price: '' });
  const [menus, setMenus] = useState([{ name: 'Pastel de Papas', price: '1500',id:1234},{name:'12 empanadas', price: '200',id:154}]);
  const [editingMenuId, setEditingMenuId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataMenu({ ...formDataMenu, [name]: value });
  };

  const handleSubmit = () => {
    if (formDataMenu.name && formDataMenu.price) {
      if (editingMenuId !== null) {
        const updatedMenus = menus.map((menu) =>
          menu.id === editingMenuId ? { ...menu, ...formDataMenu } : menu
        );
        setMenus(updatedMenus);
        setEditingMenuId(null);
      } else {
        const newMenu = { ...formDataMenu, id: Date.now() };
        setMenus([...menus, newMenu]);
      }
      setFormDataMenu({ name: '', price: '' });
    }
  };

  const handleEdit = (menuId) => {
    setEditingMenuId(menuId);
    const menuToEdit = menus.find((menu) => menu.id === menuId);
    setFormDataMenu({ name: menuToEdit.name, price: menuToEdit.price });
  };

  const handleDelete = (menuId) => {
    const updatedMenus = menus.filter((menu) => menu.id !== menuId);
    setMenus(updatedMenus);
  };

  return (
    <div>
      <h1>Formulario de Menús</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formDataMenu.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={formDataMenu.price}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingMenuId !== null ? 'Guardar' : 'Enviar'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.name}</td>
              <td>{menu.price}</td>
              <td>
                <button onClick={() => handleEdit(menu.id)}>Editar</button>
                <button onClick={() => handleDelete(menu.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormMenu;
