import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form, Button } from 'react-bootstrap';

function FormPedidos() {
  const [formDataPedidos, setFormDataPedidos] = useState({
    id: '',
    usuario: '',
    fecha: '',
    menu: '',
    servido: false,
  });
  const [pedidos, setPedidos] = useState([
    { id: 556, usuario: 'Lucas Gonzalo', fecha: '2023-10-23', menu: 'Papitas', servido: true },
    { id: 446, usuario: 'Ernesto', fecha: '2023-10-22', menu: 'Asado', servido: false },
  ]);
  const [editingPedidoId, setEditingPedidoId] = useState(null);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setFormDataPedidos({ ...formDataPedidos, [name]: checked });
  };

  const handleSubmit = () => {
    if (formDataPedidos.usuario && formDataPedidos.fecha && formDataPedidos.menu) {
      if (editingPedidoId !== null) {
        const updatedPedidos = pedidos.map((pedido) =>
          pedido.id === editingPedidoId ? { ...pedido, servido: formDataPedidos.servido } : pedido
        );
        setPedidos(updatedPedidos);
        setEditingPedidoId(null);
      } else {
        const newPedido = { ...formDataPedidos, id: Date.now() };
        setPedidos([...pedidos, newPedido]);
      }
      setFormDataPedidos({ id: '', usuario: '', fecha: '', menu: '', servido: false });
    }
  };

  const handleEdit = (pedidoId) => {
    setEditingPedidoId(pedidoId);
    const pedidoToEdit = pedidos.find((pedido) => pedido.id === pedidoId);
    setFormDataPedidos({
      id: pedidoToEdit.id,
      usuario: pedidoToEdit.usuario,
      fecha: pedidoToEdit.fecha,
      menu: pedidoToEdit.menu,
      servido: pedidoToEdit.servido,
    });
  };

  const handleDelete = (pedidoId) => {
    const updatedPedidos = pedidos.filter((pedido) => pedido.id !== pedidoId);
    setPedidos(updatedPedidos);
  };

  return (
    <div>
      <div>
      <h1>Formulario de Pedidos</h1>
      </div>
      {editingPedidoId !== null && (
        <div className="m-5">
        <Form>
          <Form.Group controlId="formServido">
            <Form.Check
              type="checkbox"
              label="Servido"
              name="servido"
              checked={formDataPedidos.servido}
              onChange={handleChange}
              className="form-check"
            />
          </Form.Group>
      
          <Button variant="success" onClick={handleSubmit} className="m-1">
            Guardar
          </Button>
        </Form>
      </div>
      
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Menu</th>
            <th>Servido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.usuario}</td>
              <td>{pedido.fecha}</td>
              <td>{pedido.menu}</td>
              <td>{pedido.servido ? 'Sí' : 'No'}</td>
              <td>
                <Button variant="warning m-1" onClick={() => handleEdit(pedido.id)}>Editar</Button>
                <Button variant="danger m-1" onClick={() => handleDelete(pedido.id)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default FormPedidos;
