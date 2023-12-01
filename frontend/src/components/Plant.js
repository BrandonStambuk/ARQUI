// Importa la clase de estilo
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Plant.css'; // Asegúrate de tener un archivo CSS correspondiente
import Navbar from './Navbar';
import jardin from "../images/jardin3.jpg";
function Plant() {
  const estiloFondo = {
    backgroundImage: `url(${jardin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  // ARREGLAR TAMAÑO DE FONDO
  
  };
  return (



    
    <div className="container-imagen-jardin" style={estiloFondo}>
      <Navbar />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          {/* Columna del card */}
          <div className="card card-translucent p-4">
            <h1 className="titulo">Nombre de la Planta</h1>
            <h5 className="subtitulo">Nombre Científico</h5>
            <hr />
            <p className="descripcion-botanica text-left">
              <strong>Descripción Botánica:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor, urna in tempor consectetur, nisi leo fermentum dui, eget tincidunt est sapien vel libero. Nulla facilisi. Sed sed consequat justo. Pellentesque vel enim ut ligula commodo ultricies. Phasellus eu nunc ut ex eleifend facilisis. Vestibulum vel efficitur nunc. Sed dictum nisl vel ligula tincidunt, ut ullamcorper mi tincidunt. Vestibulum non sapien vel nulla luctus rhoncus id at odio. Ut vel sodales purus.
            </p>
            <p className="para-que-sirve text-left">
              <strong>Para qué Sirve la Planta:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor, urna in tempor consectetur, nisi leo fermentum dui, eget tincidunt est sapien vel libero. Nulla facilisi. Sed sed consequat justo. Pellentesque vel enim ut ligula commodo ultricies. Phasellus eu nunc ut ex eleifend facilisis. Vestibulum vel efficitur nunc. Sed dictum nisl vel ligula tincidunt, ut ullamcorper mi tincidunt. Vestibulum non sapien vel nulla luctus rhoncus id at odio. Ut vel sodales purus.
            </p>
            <p className="como-utilizar text-left">
              <strong>Cómo Utilizar la Planta:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin auctor, urna in tempor consectetur, nisi leo fermentum dui, eget tincidunt est sapien vel libero. Nulla facilisi. Sed sed consequat justo. Pellentesque vel enim ut ligula commodo ultricies. Phasellus eu nunc ut ex eleifend facilisis. Vestibulum vel efficitur nunc. Sed dictum nisl vel ligula tincidunt, ut ullamcorper mi tincidunt. Vestibulum non sapien vel nulla luctus rhoncus id at odio. Ut vel sodales purus.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          {/* Espacio reservado para la imagen */}
          <div className="imagen-placeholder"></div>
        </div>
      </div>
    </div>
  );
}

export default Plant;
