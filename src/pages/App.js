import React, { useState } from 'react';
import RegistroInventario from './RegistroInventario';
import SeguimientoInventario from './SeguimientoInventario';

const App = () => {
  const [inventario, setInventario] = useState([]); // Estado global para almacenar el inventario

  // Función para agregar un nuevo producto al inventario
  const agregarProducto = (producto) => {
    setInventario((prev) => [...prev, producto]); // Añade el producto al inventario local
  };

  return (
    <div>
      <RegistroInventario onRegister={agregarProducto} /> {/* Pasa la función como prop */}
      <SeguimientoInventario inventario={inventario} /> {/* Pasa el inventario como prop */}
    </div>
  );
};

export default App;
