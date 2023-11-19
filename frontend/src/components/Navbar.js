
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Navbar.css';
function Navbar() {
  return (
<nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Jardin Botanico Martin Cardenas</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#about">Sobre Martin Cardenas</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
