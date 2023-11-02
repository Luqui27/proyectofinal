import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';

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
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
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
    setShowForm(true);
  };

  const handleDelete = (menuId) => {
    const updatedMenus = menus.filter((menu) => menu.id !== menuId);
    setMenus(updatedMenus);
  };

  const handleAddMenu = () => {
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingMenuId(null);
    setFormDataMenu({
      name: '',
      isAvailable: false,
      price: '',
      detail: '',
      category: '',
    });
    setShowForm(false); // Ocultar el formulario al cancelar la edición
  };

  const handleCancelAddMenu = () => {
    setShowForm(false);
  };

  return (
    <div>
      <h1>Formulario de Menús</h1>
      <div>
  {!showForm && (
    <Button variant="primary m-1" onClick={handleAddMenu}>Agregar Menú</Button>
  )}
</div>
      {showForm && (
        <div className='m-5'>
        <Form>
          <Form.Group>
            <Form.Label>Nombre:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Nombre"
              value={formDataMenu.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="checkbox"
              name="isAvailable"
              checked={formDataMenu.isAvailable}
              onChange={handleChange}
              label="Disponible"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Precio:</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Precio"
              value={formDataMenu.price}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Detalle:</Form.Label>
            <Form.Control
              type="text"
              name="detail"
              placeholder="Detalle"
              value={formDataMenu.detail}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Categoría:</Form.Label>
            <Form.Control
              as="select"
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
            </Form.Control>
          </Form.Group>
          <Button variant="success" onClick={handleSubmit}>
            {editingMenuId !== null ? 'Guardar' : 'Enviar'}
          </Button>
          {editingMenuId !== null && (
            <Button variant="secondary m-1" onClick={handleCancelEdit}>Cancelar</Button>
          )}
          {editingMenuId === null && (
            <Button variant="secondary m-1" onClick={handleCancelAddMenu}>Cancelar</Button>
          )}
        </Form>
      </div>
      )}
      <Table striped bordered hover>
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
              <Button variant="warning m-1" onClick={() => handleEdit(menu.id)}>Editar</Button>
                <Button variant="danger m-1" onClick={() => handleDelete(menu.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FormMenu;
