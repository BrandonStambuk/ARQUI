// Importa la clase de estilo
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/About.css";
import imageMartinCardenas from "../images/martinCardenas.jpg"; // Importa la imagen
import imageAloe from "../images/aloe-vera.jpg";
import Navbar from "./Navbar";






function About() {

  const estiloFondo = {
    backgroundImage: `url(${imageAloe})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="container-imagen-aloe" style={estiloFondo}>
      <Navbar></Navbar>
      <div className="row justify-content-center align-items-center vh-100 imagen-aloe">
        <div className="col-md-8">
          {" "}
          {/* Aumenta el ancho del card a 8 columnas en pantallas grandes */}
          <div className="card text-center b-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {" "}
                  {/* Ocupa 6 columnas en pantallas grandes */}
                  <h5 className="card-title" id="about">
                    Sobre Martin Cardenas
                  </h5>
                  {/* Aplica ambas clases de estilo al elemento p */}
                  <p className="card-text custom-card-text justified-text">
                    Martín Cárdenas es considerado como el botánico más
                    importante que ha tenido Bolivia. Realizó extensas
                    expediciones botánicas por todo el territorio nacional
                    recolectando especímenes de la flora local, de la cual llegó
                    a reunir 6500 ejemplares. Su prestigio traspasó las
                    fronteras. La mayor parte de sus exploraciones las realizó
                    con medios propios demostrando que con voluntad y decisión
                    se puede investigar en Bolivia, pese a no tener las
                    condiciones favorables.
                    <br></br>
                    <br></br>
                    La educación básica la realizó en el Seminario Conciliar y
                    en la Escuela Municipal Bolívar. La secundaria en los
                    colegios fiscales Nacional Bolívar y Sucre de Cochabamba. En
                    1918, se graduó de bachiller en Ciencias y Letras y
                    consiguió una beca para continuar sus estudios en el
                    Instituto Normal Superior de La Paz, donde se especializó en
                    Ciencias Naturales y Química (1922). En sus vacaciones en
                    Cochabamba realizaba caminatas por sus alrededores
                    recogiendo plantas, de las que luego buscaba sus
                    características en los libros y revistas de la Biblioteca
                    Municipal de La Paz.
                  </p>
                </div>
                <div className="col-md-6">
                  {" "}
                  {/* Ocupa 6 columnas en pantallas grandes */}
                  <div className="row">
                    {/* Utiliza la variable imageMartinCardenas para establecer la ruta de la imagen */}
                    <img
                      src={imageMartinCardenas}
                      className="card-img-top rounded"
                      alt="Imagen Martin Cardenas"
                    />
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
