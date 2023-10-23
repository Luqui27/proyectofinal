import React, { useState } from 'react';

const categoriesOptions = [
  'Entradas',
  'Plato Principal',
  'Guarniciones',
  'Sopas y Cremas',
  'Pizzas',
  'Postres',
  'Bebidas',
  'Especiales de la Casa',
];

function FormMenu() {
  const [formDataMenu, setFormDataMenu] = useState({
    name: '',
    isAvailable: false,
    price: '',
    detail: '',
    category: '',
  });
  const [menus, setMenus] = useState([
    { id: 1234, name: 'Pastel de Papas', isAvailable: true, price: '1500', detail: 'Delicioso pastel con papas', category: 'Plato Principal' },
    { id: 154, name: '12 empanadas', isAvailable: true, price: '200', detail: 'Docena de empanadas variadas', category: 'Entradas' },
  ]);
  const [editingMenuId, setEditingMenuId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormDataMenu({ ...formDataMenu, [name]: newValue });
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
      setFormDataMenu({
        name: '',
        isAvailable: false,
        price: '',
        detail: '',
        category: '',
      });
    }
  };

  const handleEdit = (menuId) => {
    setEditingMenuId(menuId);
    const menuToEdit = menus.find((menu) => menu.id === menuId);
    setFormDataMenu({
      name: menuToEdit.name,
      isAvailable: menuToEdit.isAvailable,
      price: menuToEdit.price,
      detail: menuToEdit.detail,
      category: menuToEdit.category,
    });
  };

  const handleDelete = (menuId) => {
    const updatedMenus = menus.filter((menu) => menu.id !== menuId);
    setMenus(updatedMenus);
  };

  return (
    <div>
      <h1>Formulario de Menús</h1>
      <div>
        <div>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={formDataMenu.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Disponible:
            <input
              type="checkbox"
              name="isAvailable"
              checked={formDataMenu.isAvailable}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Precio:
            <input
              type="number"
              name="price"
              placeholder="Precio"
              value={formDataMenu.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Detalle:
            <input
              type="text"
              name="detail"
              placeholder="Detalle"
              value={formDataMenu.detail}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Categoría:
            <select
              name="category"
              value={formDataMenu.category}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              {categoriesOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <button onClick={handleSubmit}>
            {editingMenuId !== null ? 'Guardar' : 'Enviar'}
          </button>
          {editingMenuId !== null && (
            <button onClick={() => setEditingMenuId(null)}>Cancelar</button>
          )}
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Disponible</th>
            <th>Precio</th>
            <th>Detalle</th>
            <th>Categoría</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {menus.map((menu) => (
            <tr key={menu.id}>
              <td>{menu.id}</td>
              <td>{menu.name}</td>
              <td>{menu.isAvailable ? 'Sí' : 'No'}</td>
              <td>{menu.price}</td>
              <td>{menu.detail}</td>
              <td>{menu.category}</td>
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
