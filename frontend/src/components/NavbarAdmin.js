import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';

function Navbar() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Después de cerrar sesión, puedes realizar acciones adicionales si es necesario.
      // Por ejemplo, redirigir al usuario a la página de inicio.
      navigate('/');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/register">Agregar Planta</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tipoPlanta">Agregar tipo de planta</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/table">Tabla de plantas del jardín</Link>
            </li>
            <li className="nav-item">
              {/* Agrega la función handleSignOut al hacer clic en Cerrar Sesión */}
              <Link className="nav-link" onClick={handleSignOut}>Cerrar Sesión</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;