import React from 'react';
import backgroundImage from '../public/computer21.jpeg'; 
import '../styles/SeguimientoInventario.css'; 

const SeguimientoInventario = ({ inventario }) => {
  return (
    <div className="seguimiento-inventario-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="inventario-wrapper">
        <h1>Seguimiento de Inventario</h1>
        {inventario.length > 0 ? (
          <table className="inventario-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Categoría</th>
                <th>Cantidad</th>
                <th>Proveedor</th>
                <th>Fecha de Ingreso</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto}</td>
                  <td>{item.categoria}</td>
                  <td>{item.cantidad}</td>
                  <td>{item.proveedor}</td>
                  <td>{item.fechaIngreso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-inventario-message">No hay productos registrados en el inventario aún.</p>
        )}
      </div>
    </div>
  );
};

export default SeguimientoInventario;
