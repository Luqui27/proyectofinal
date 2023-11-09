import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const MenuForm = ({
  formDataMenu,
  showForm,
  editingMenuId,
  categoriesOptions,
  handleChange,
  handleSubmit,
  handleCancelEdit,
  handleCancelAddMenu,
}) => {
  const [formErrors, setFormErrors] = useState({
    name: '',
    price: '',
    detail: '',
    category: '',
  });

  const validateForm = () => {
    const errors = {
      name: formDataMenu.name ? '' : 'El nombre es obligatorio',
      price: formDataMenu.price ? '' : 'El precio es obligatorio',
      category: formDataMenu.category ? '' : 'Seleccione una categoría',
      detail: formDataMenu.detail.length<=200 ? '' : 'El maximo son 200 caracteres',
      detail: formDataMenu.detail.length>=10 ? '' : 'El minimo son 10 caracteres',

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
          <small className="text-danger">{formErrors.name}</small>
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
          <small className="text-danger">{formErrors.price}</small>
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
          <small className="text-danger">{formErrors.detail}</small>
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
          <small className="text-danger">{formErrors.category}</small>
        </Form.Group>
        <Button variant="success" onClick={handleFormSubmit}>
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
  );
};

export default MenuForm;
