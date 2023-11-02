// ButtonPanel.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormUsuarios from './FormUsuarios';
import FormMenu from './FormMenu';
import FormPedidos from './FormPedidos';

const ButtonPanel = () => {
  const [showFormUsuarios, setShowFormUsuarios] = useState(true);
  const [showFormMenu, setShowFormMenu] = useState(false);
  const [showFormPedidos, setShowFormPedidos] = useState(false);

  const handleUsuariosClick = () => {
    setShowFormUsuarios(true);
    setShowFormMenu(false);
    setShowFormPedidos(false);
  };

  const handleMenuClick = () => {
    setShowFormMenu(true);
    setShowFormUsuarios(false);
    setShowFormPedidos(false);
  };

  const handlePedidosClick = () => {
    setShowFormPedidos(true);
    setShowFormUsuarios(false);
    setShowFormMenu(false);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-center">
        <button onClick={handleUsuariosClick} type="button" className="btn btn-primary mx-2">
          Usuarios
        </button>
        <button onClick={handleMenuClick} type="button" className="btn btn-secondary mx-2">
          Menús
        </button>
        <button onClick={handlePedidosClick} type="button" className="btn btn-success mx-2">
          Pedidos
        </button>
      </div>

      <div className="row mt-4">
        <div className="col">
          {showFormUsuarios && <FormUsuarios />}
          {showFormMenu && <FormMenu />}
          {showFormPedidos && <FormPedidos />}
        </div>
      </div>
    </div>
  );
};

export default ButtonPanel;
