import React, { useState } from 'react';
import '../styles/RegistroInventario.css'; // Asegúrate de tener este archivo para los estilos

const RegistroInventario = ({ onRegister }) => {
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (producto && categoria && cantidad && proveedor && fechaIngreso) {
      onRegister({ producto, categoria, cantidad, proveedor, fechaIngreso });
      // Limpiamos los campos después de registrar
      setProducto('');
      setCategoria('');
      setCantidad('');
      setProveedor('');
      setFechaIngreso('');
    } else {
      alert('Por favor, complete todos los campos');
    }
  };

  return (
    <div className="registro-inventario-container">
      <div className="form-wrapper">
        <h1>Registro de Inventario</h1>
        <form onSubmit={handleSubmit} className="inventario-form">
          <div className="form-group">
            <label>Nombre del Producto:</label>
            <input
              type="text"
              value={producto}
              onChange={(e) => setProducto(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Categoría:</label>
            <input
              type="text"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Cantidad:</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Proveedor:</label>
            <input
              type="text"
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de Ingreso:</label>
            <input
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default RegistroInventario;
