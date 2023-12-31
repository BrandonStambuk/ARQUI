import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import { Link } from 'react-router-dom'; // Importa el componente Link
import ImageSection from './ImageSection'; // Importa el componente ImageSection
import About from './About'; // Importa el componente About

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Usa Link para navegar a ImageSection */}
        <Link className="navbar-brand" to="/">Jardin Botanico Martin Cardenas</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {/* Cambia el enlace a través de Link */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {/* Usa Link para navegar a About */}
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Martin Cardenas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;