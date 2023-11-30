import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ImageSection.css';
import Navbar from './Navbar';
function ImageSection() {
  return (
    <div>
      <Navbar></Navbar>
      <div class="container-imagen">
        <div class="imagen-jardin">
          <div class="col-md-12">
            <div class="row justify-content-center">
              <div class="col-md-12 col-sm-6 text-center">
                <h1 class="text-left title">Descubre la belleza natural</h1>
                <p class="text-left parrafo">Explora un oasis de plantas exóticas y disfruta de la tranquilidad del Jardín Martín Cardenas</p>
                <br></br>
                <p class="text-left foot">Ubicado en la ciudad de Cochabamba, Bolivia!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
