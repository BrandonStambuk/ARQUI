import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Importa los íconos

import Navbar from "./Navbar";
import fondoImagen from "../images/jardin3.jpg";

const Plants = () => {
  const params = useParams();
  const { tipoId } = params;
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    const obtenerPlantasPorTipo = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/obtenerTipoPlanta/${tipoId}`);
        const data = await response.json();
        if (Array.isArray(data.data) && data.data.length > 0) {
          setPlantas(data.data);
        } else {
          console.error("La respuesta de la API no contiene un array válido de plantas.");
        }
      } catch (error) {
        console.error("Error al obtener plantas:", error);
      }
    };

    obtenerPlantasPorTipo();
  }, [tipoId]);

  const settings = {
    infinite: true,
    slidesToShow: plantas.length > 0 ? Math.min(4, plantas.length) : 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  console.log("ID del Tipo de Planta:", tipoId); // Imprime el ID

  return (
    <div
      style={{
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <h2>Plantas Asociadas al Tipo {tipoId}</h2>
        {plantas.length > 0 ? (
          <Slider {...settings}>
            {plantas.map((planta) => (
              <div key={planta.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img variant="top" src={planta.imagen} />
                  <Card.Body>
                    <Card.Title>{planta.nombreCientifico}</Card.Title>
                    
                  </Card.Body>
                </Card>
              </div>
            ))}
          </Slider>
        ) : (
          <p>No hay plantas asociadas a este tipo.</p>
        )}
      </div>
    </div>
  );
};

// Componente para la flecha de siguiente
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronRight
      className={className}
      style={{ ...style, display: "block", color: "white", fontSize: "24px", cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

// Componente para la flecha anterior
const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <FaChevronLeft
      className={className}
      style={{ ...style, display: "block", color: "white", fontSize: "24px", cursor: "pointer" }}
      onClick={onClick}
    />
  );
};

export default Plants;
