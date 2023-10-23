import React, { useState } from 'react';

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
      {editingPedidoId !== null && (
        <div>
          <h1>Formulario de Edición</h1>
          <label>
            Servido:
            <input
              type="checkbox"
              name="servido"
              checked={formDataPedidos.servido}
              onChange={handleChange}
            />
          </label>
          <button onClick={handleSubmit}>Guardar</button>
        </div>
      )}
      <table>
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
