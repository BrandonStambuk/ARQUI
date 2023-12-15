// Importa la clase de estilo
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/About.css";
import imageMartinCardenas from "../images/martinCardenas.jpg"; // Importa la imagen
import imageAloe from "../images/aloe-vera.jpg";
import Navbar from "./Navbar";

function About() {
  // Estilo para el fondo con la imagen de aloe
  const estiloFondo = {
    backgroundImage: `url(${imageAloe})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "150vh", // Ajusta la altura según tus necesidades
    borderRadius: "50px",
    //boxShadow: "-2px -19px 34px 0px rgba(0,0,0,0.75)",
    //WebkitBoxShadow: "-2px -19px 34px 0px rgba(0,0,0,0.75)", // Prefijo para navegadores webkit (como Chrome y Safari)
    //MozBoxShadow: "-2px -19px 34px 0px rgba(0,0,0,0.75)", // Prefijo para navegadores Firefox (Mozilla)
    marginTop: "40px" // Ajusta el valor según tus necesidades

  };
  

  return (
    <div className="container-imagen-aloe" style={estiloFondo}>
      <div className="row justify-content-center align-items-center vh-100 imagen-aloe">
        <div className="col-md-8">
          {/* Aumenta el ancho del card a 8 columnas en pantallas grandes */}
          <div className="card text-center b-0">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  {/* Contenido de texto con imagen integrada */}
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
                    <br />
                    <br />
                    <img
                      src={imageMartinCardenas}
                      alt="Martin Cardenas"
                      style={{ width: "250px", height: "316px", float: "left", marginRight: "10px" }}
                    />
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
                    Municipal de La Paz. Por entonces le presentaron al botánico
                    sueco Erik Asplund, que había realizado muchos viajes por
                    Bolivia recogiendo plantas para su herbario. Cárdenas lo
                    acompañó en varias de sus travesías y aprendió en gran
                    medida en su compañía lo que afianzó su vocación de
                    botánico.
                  </p>
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
