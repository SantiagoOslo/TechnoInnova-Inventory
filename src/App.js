import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegistroInventario from './pages/RegistroInventario';
import SeguimientoInventario from './pages/SeguimientoInventario';
import './styles/App.css';  
import './styles/RegistroInventario.css'; 

function App() {
  const [inventario, setInventario] = useState([]);

  const handleRegisterProduct = (nuevoProducto) => {
    // Actualizamos el inventario con el nuevo producto
    setInventario([...inventario, nuevoProducto]);
  };

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/registro-inventario">Registro de Inventario</Link>
            </li>
            <li>
              <Link to="/seguimiento-inventario">Seguimiento de Inventario</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/registro-inventario"
            element={<RegistroInventario onRegister={handleRegisterProduct} />}
          />
          <Route
            path="/seguimiento-inventario"
            element={<SeguimientoInventario inventario={inventario} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
