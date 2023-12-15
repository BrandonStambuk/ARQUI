import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/Plant.css';
import Navbar from './Navbar';
import Carrousel from './Carrousel';
import jardin from '../images/jardin3.jpg';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDzcgdq3uCqURkpfXTlptrtOfCSmbkivt0",
  authDomain: "jardinbotanico-28aed.firebaseapp.com",
  databaseURL: "https://jardinbotanico-28aed-default-rtdb.firebaseio.com",
  projectId: "jardinbotanico-28aed",
  storageBucket: "jardinbotanico-28aed.appspot.com",
  messagingSenderId: "1030784464482",
  appId: "1:1030784464482:web:b249b4d99201a2f2f6833b",
  measurementId: "G-NQJLT0HG64",
};
initializeApp(firebaseConfig);

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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const { id } = useParams();

  useEffect(() => {
    const obtenerDatosPlanta = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/obtenerPlanta/${id}`);
        const data = response.data.data;
  
        // Descargar las imágenes desde Firebase Storage
        const imagenesUrls = await Promise.all(
          data.imagenes.map(async (imageUrl) => {
            const storageRef = getStorage();
            const imageRef = ref(storageRef, `${imageUrl}`);
            const imageUrlDownload = await getDownloadURL(imageRef);
            return imageUrlDownload;
          })
        );
  
        setPlantaData({
          id: data.id || '',
          nombreCientifico: data.nombreCientifico || '',
          nombresComunes: data.nombresComunes || [], // Asignación directa del array de nombres comunes
          descripcion: data.descripcion || '',
          tipoPlanta: data.tipoPlanta || '',
          imagenes: imagenesUrls || [],
        });
  
        console.log('Datos de la planta:', data);
      } catch (error) {
        console.error('Error al obtener datos de la planta:', error);
      }
    };
  
    obtenerDatosPlanta();
  }, [id]);

  const styles = {
    carrouselContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: '80%', // Ajusta el ancho máximo del carrusel
      margin: 'auto', // Centra el carrusel
    },
    carrouselImage: {
      width: '200px', // Ancho deseado
      height: '200px', // Alto deseado
      objectFit: 'cover',
      margin: '0 10px',
    },
  };

  return (
    <div className="container-imagen-jardin" style={estiloFondo}>
      <Navbar />
      <div className="row justify-content-center align-items-center">
        <div className="col-md-12">
          <div className="card card-translucent p-4">
            <h1 className="titulo">{plantaData.nombreCientifico}</h1>
            <h5 className="subtitulo">Nombres Comunes: {plantaData.nombresComunes.join(', ')}</h5>
            <hr />
            <p className="descripcion-botanica text-left">
              <strong>Descripción Botánica:</strong>
              <div dangerouslySetInnerHTML={{ __html: plantaData.descripcion }} />
            </p>
            <div style={styles.carrouselContainer}>
              <Carrousel images={plantaData.imagenes} styles={styles.carrouselImage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plant;