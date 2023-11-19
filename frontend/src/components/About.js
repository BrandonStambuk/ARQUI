// Importa la clase de estilo
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ImageSection.css';
import imageMartinCardenas from '../images/martinCardenas.jpg'; // Importa la imagen

function About() {
  return (
    <div className="container-imagen-aloe">
      <div className="row justify-content-center align-items-center vh-100 imagen-aloe">
        <div className="col-md-8"> {/* Aumenta el ancho del card a 8 columnas en pantallas grandes */}
          <div className="card text-center b-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6"> {/* Ocupa 6 columnas en pantallas grandes */}
                  <h5 className="card-title" id="about">Sobre Martin Cardenas</h5>
                  {/* Aplica ambas clases de estilo al elemento p */}
                  <p className="card-text custom-card-text justified-text">
                    Martín Cárdenas es considerado como el botánico más importante que ha tenido Bolivia. Realizó extensas expediciones botánicas por todo el territorio nacional recolectando especímenes de la flora local, de la cual llegó
                    a reunir 6500 ejemplares. Su prestigio traspasó las fronteras. La mayor parte de sus exploraciones las
                    realizó con medios propios demostrando que con voluntad y decisión se puede investigar en Bolivia, pese a no tener las condiciones favorables.
                        <br></br>
                        
                  </p>
                </div>
                <div className="col-md-6"> {/* Ocupa 6 columnas en pantallas grandes */}
                  <div className="row">
                    {/* Utiliza la variable imageMartinCardenas para establecer la ruta de la imagen */}
                    <img src={imageMartinCardenas} className="card-img-top rounded" alt="Imagen Martin Cardenas" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
