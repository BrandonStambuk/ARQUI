import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
import { Link } from 'react-router-dom';
import ImageSection from './ImageSection';
import About from './About';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">Sobre Martin Cardenas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/types">Tipos de plantas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
