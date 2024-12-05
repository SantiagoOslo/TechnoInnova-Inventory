import React, { useState } from 'react';
import axios from 'axios';
import '../styles/RegistroInventario.css';

const RegistroInventario = ({ onRegister }) => {
  const [producto, setProducto] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [proveedor, setProveedor] = useState('');
  const [fechaIngreso, setFechaIngreso] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (producto && categoria && cantidad && proveedor && fechaIngreso) {
      const nuevoProducto = {
        producto,
        categoria,
        cantidad: parseInt(cantidad, 10), // Convertimos cantidad a número
        proveedor,
        fechaIngreso,
      };

      try {
        if (onRegister) {
          // Si se proporciona la función onRegister, se llama a ella
          onRegister(nuevoProducto);
        }

        // Registrar el producto en la base de datos usando axios
        const response = await axios.post('http://localhost:5000/api/productos', nuevoProducto);
        alert(`Producto registrado: ${response.data.producto}`);

        
        setProducto('');
        setCategoria('');
        setCantidad('');
        setProveedor('');
        setFechaIngreso('');
      } catch (error) {
        console.error('Error al registrar el producto:', error);
        alert('Hubo un error al registrar el producto.');
      }
    } else {
      alert('Por favor, complete todos los campos.');
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
          <button type="submit" className="submit-button">
            Registrar Producto
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroInventario;
