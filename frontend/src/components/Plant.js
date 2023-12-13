import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Plant.css';
import Navbar from './Navbar';
import Carrousel from './Carrousel';
import jardin from '../images/jardin3.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Plant() {
  const [plantaData, setPlantaData] = useState({
    id: '',
    nombreCientifico: '',
    nombresComunes: [],
    descripcion: '',
    tipoPlanta: '',
    imagenes: [],
  });

  const estiloFondo = {
    backgroundImage: `url(${jardin})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const images = plantaData.imagenes || [];
  const { id } = useParams(); // Obtenemos el id de la planta desde la URL usando useParams

  useEffect(() => {
    const obtenerDatosPlanta = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/obtenerPlanta/${id}`);
        const data = response.data.data; // Supongo que tu API devuelve un objeto con los datos de la planta

        // Actualizamos el estado con los datos de la planta
        setPlantaData({
          id: data.id || '',
          nombreCientifico: data.nombreCientifico || '',
          nombresComunes: data.nombresComunes || [],
          descripcion: data.descripcion || '',
          tipoPlanta: data.tipoPlanta || '',
          imagenes: data.imagenes || [],
        });

        // Imprimimos los datos por consola
        console.log('Datos de la planta:', data);
      } catch (error) {
        console.error('Error al obtener datos de la planta:', error);
      }
    };

    // Llamamos a la función para obtener los datos de la planta
    obtenerDatosPlanta();
  }, [id]); // Aseguramos que useEffect se ejecute cuando el valor de id cambie

  return (
    <div className="container-imagen-jardin" style={estiloFondo}>
      <Navbar />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          {/* Resto del código */}
          <div className="card card-translucent p-4">
            <h1 className="titulo">{plantaData.nombreCientifico}</h1>
            <h5 className="subtitulo">Nombres Comunes: {plantaData.nombresComunes.join(', ')}</h5>
            <hr />
            <p className="descripcion-botanica text-left">
              <strong>Descripción Botánica:</strong>
              {/* Usamos dangerouslySetInnerHTML para renderizar el HTML como texto */}
              <div dangerouslySetInnerHTML={{ __html: plantaData.descripcion }} />
            </p>
            {/* Resto del código */}
            <Carrousel images={images} />
          </div>
        </div>
        {/* Resto del código */}
      </div>
    </div>
  );
}

export default Plant;
