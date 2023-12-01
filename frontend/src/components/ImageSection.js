import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/ImageSection.css';
import Navbar from './Navbar';
import Carrousel from './Carrousel';
import jardin2 from "../images/jardin2.jpg";
import imagen1 from "../images/j1.jpg";
import imagen2 from "../images/j2.jpg";

function ImageSection() {
  const estiloFondo = {
    backgroundImage: `url(${jardin2})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  // ARREGLAR TAMAÑO DE FONDO
  
  };

  const images = [imagen1, imagen2];
  return (
    <div>
      <Navbar></Navbar>
      <div className="container-imagen" style={estiloFondo}>
        <div className="imagen-jardin">
          <div className="col-md-12">
            <div className="row justify-content-center">
              <div className="col-md-12 col-sm-12 text-center">
                <h1 className="text-left title" style={{ marginTop: '20px' }}>
                  Descubre la belleza natural
                  
                </h1>
                <h2 className='subtitulo'>¡Bienvenido al Jardín Botánico Martín Cárdenas!</h2>
                <p className="text-left parrafo text-justify" style={{ marginTop: '10px' }}>
                 Sumérgete en
                  un mundo de maravillas naturales y descubre la exuberancia de
                  la flora que nos rodea. En nuestro jardín, encontrarás un
                  oasis de plantas exóticas y autóctonas que te transportarán a
                  un viaje único a través de la belleza natural. Explora
                  senderos serpenteantes que te llevan a rincones secretos,
                  donde cada rincón cuenta una historia sobre la diversidad de
                  la vida vegetal. Desde las majestuosas palmas hasta las
                  delicadas orquídeas, cada especie tiene su lugar especial en
                  este santuario verde.
                </p>
                <br></br>
                <p className="text-left foot text-justify" style={{ marginTop: '10px' }}>
                  Ubicado en la ciudad de Cochabamba, Bolivia!
                </p>
                <Carrousel images={images}></Carrousel>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ImageSection;
