import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const getFirebaseImageUrl = async (imagePath) => {
  const storage = getStorage();
  const imageRef = ref(storage, `${imagePath}`);
  const imageUrl = await getDownloadURL(imageRef);
  return imageUrl;
};

const ImageLoader = ({ imagePath, alt }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const url = await getFirebaseImageUrl(imagePath);
        setImageUrl(url);
      } catch (error) {
        console.error("Error al obtener la URL de la imagen desde Firebase Storage:", error);
      }
    };

    fetchImageUrl();
  }, [imagePath]);

  if (!imageUrl) {
    return <p>Cargando imagen...</p>;
  }

  return <img src={imageUrl} alt={alt} />;
};

const Types = () => {
  const estiloFondo = {
    backgroundImage: `url(${jardin2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "200vh",
  };

  const contenedorPrincipal = {
    padding: 0,
    margin: 0,
  };

  const renderCard = (tipo) => (
    <div className="col-md-4 mb-4" key={tipo.nombre}>
      <Link to={`/types/${tipo.id}`}  style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card">
          <ImageLoader imagePath={tipo.imagen} alt={tipo.nombre} />
          <div className="card-body">
            <h5 className="card-titulo">{tipo.nombre}</h5>
            <p className="card-text">{tipo.description}</p>
          </div>
        </div>
      </Link>
    </div>
  );

  const getFirebaseImageUrl = async (imagePath) => {
    const storage = getStorage();
    const imageRef = ref(storage, `Images/${imagePath}`);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  };

  const [tiposPlantas, setTiposPlantas] = useState([]);

  useEffect(() => {
    // Configura la configuración de Firebase (reemplaza con tu propia configuración)
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

    // Inicializa Firebase
    initializeApp(firebaseConfig);

    // Realizar la solicitud a la API para obtener los tipos de plantas
    fetch("http://127.0.0.1:8000/api/obtenerTiposPlantas")
      .then((response) => response.json())
      .then((data) => {
        // Verificar si 'data' es un array y tiene elementos
        if (Array.isArray(data.data) && data.data.length > 0) {
          // Imprimir la respuesta de la API
          console.log("Respuesta de la API:", data);

          // Actualizar el estado con los tipos de planta obtenidos
          setTiposPlantas(data.data);
        } else {
          console.error("La respuesta de la API no contiene un array válido de tipos de plantas.");
        }
      })
      .catch((error) => console.error("Error al obtener tipos de plantas:", error));
  }, []);

  return (
    <div style={{ ...contenedorPrincipal, ...estiloFondo }}>
      <Navbar />
      <div className="container mt-5">
        <h2>Tipo de Plantas</h2>
        <div className="row">
          {Array.isArray(tiposPlantas) && tiposPlantas.length > 0 ? (
            tiposPlantas.map((tipo) => renderCard(tipo))
          ) : (
            <p>Cargando tipos de plantas...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Types;