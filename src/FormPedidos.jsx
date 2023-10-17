import React, { useState } from 'react';

function FormPedidos() {
  const [formDataPedidos, setFormDataPedidos] = useState({ name: '', cantidad: '' });
  const [pedidos, setPedidos] = useState([{name:'papitas',cantidad:'5',id:556},{name:'Asau',cantidad:'27',id:446}]);
  const [editingPedidoId, setEditingPedidoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataPedidos({ ...formDataPedidos, [name]: value });
  };

  const handleSubmit = () => {
    if (formDataPedidos.name && formDataPedidos.cantidad) {
      if (editingPedidoId !== null) {
        const updatedPedidos = pedidos.map((pedido) =>
          pedido.id === editingPedidoId ? { ...pedido, ...formDataPedidos } : pedido
        );
        setPedidos(updatedPedidos);
        setEditingPedidoId(null);
      } else {
        const newPedido = { ...formDataPedidos, id: Date.now() };
        setPedidos([...pedidos, newPedido]);
      }
      setFormDataPedidos({ name: '', cantidad: '' });
    }
  };

  const handleEdit = (pedidoId) => {
    setEditingPedidoId(pedidoId);
    const pedidoToEdit = pedidos.find((pedido) => pedido.id === pedidoId);
    setFormDataPedidos({ name: pedidoToEdit.name, cantidad: pedidoToEdit.cantidad });
  };

  const handleDelete = (pedidoId) => {
    const updatedPedidos = pedidos.filter((pedido) => pedido.id !== pedidoId);
    setPedidos(updatedPedidos);
  };

  return (
    <div>
      <h1>Formulario de Pedidos</h1>
      <div>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formDataPedidos.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cantidad"
          placeholder="cantidad"
          value={formDataPedidos.cantidad}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editingPedidoId !== null ? 'Guardar' : 'Enviar'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.name}</td>
              <td>{pedido.cantidad}</td>
              <td>
                <button onClick={() => handleEdit(pedido.id)}>Editar</button>
                <button onClick={() => handleDelete(pedido.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FormPedidos;
