import React, { useEffect, useState } from 'react';
import axios from 'axios';
import backgroundImage from '../public/computer21.jpeg'; // Asegúrate de que la imagen exista en la ruta especificada
import '../styles/SeguimientoInventario.css'; // Asegúrate de tener los estilos necesarios

const SeguimientoInventario = () => {
  const [inventario, setInventario] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Para controlar el estado de carga

  useEffect(() => {
    // Función para obtener los datos del inventario
    const fetchInventario = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/productos'); // Cambia la URL si tu API tiene otra ruta
        setInventario(response.data);
      } catch (error) {
        console.error('Error al obtener el inventario:', error);
      } finally {
        setIsLoading(false); // Desactiva el estado de carga
      }
    };

    fetchInventario();
  }, []);

  return (
    <div
      className="seguimiento-inventario-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="inventario-wrapper">
        <h1>Seguimiento de Inventario</h1>
        {isLoading ? (
          <p className="loading-message">Cargando inventario, por favor espera...</p>
        ) : inventario.length > 0 ? (
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
              {inventario
                .filter(
                  (item) =>
                    item.producto &&
                    item.categoria &&
                    item.cantidad &&
                    item.proveedor &&
                    item.fechaIngreso
                ) // Filtrar filas vacías o incompletas
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.producto}</td>
                    <td>{item.categoria}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.proveedor}</td>
                    <td>{new Date(item.fechaIngreso).toLocaleDateString()}</td> {/* Formateo de fecha */}
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
