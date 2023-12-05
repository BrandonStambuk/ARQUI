import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "react-bootstrap";
import Navbar from "./Navbar";
import fondoImagen from "../images/jardin3.jpg";

const RegisterPlant = () => {
  const plantas = [
    {
      id: 1,
      nombre: "Planta 1",
      descripcion: "Descripción de la Planta 1",
      imagen: "url_de_la_imagen_1.jpg",
    },
    {
      id: 2,
      nombre: "Planta 2",
      descripcion: "Descripción de la Planta 2",
      imagen: "url_de_la_imagen_2.jpg",
    },
    {
      id: 3,
      nombre: "Planta 3",
      descripcion: "Descripción de la Planta 3",
      imagen: "url_de_la_imagen_3.jpg",
    },
    {
      id: 4,
      nombre: "Planta 4",
      descripcion: "Descripción de la Planta 4",
      imagen: "url_de_la_imagen_4.jpg",
    },
    {
        id: 4,
        nombre: "Planta 4",
        descripcion: "Descripción de la Planta 4",
        imagen: "url_de_la_imagen_4.jpg",
      },
      {
        id: 4,
        nombre: "Planta 4",
        descripcion: "Descripción de la Planta 4",
        imagen: "url_de_la_imagen_4.jpg",
      }
  ];

  const settings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <div
      style={{
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",  // Añadido para ocupar al menos la altura completa de la pantalla
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <Slider {...settings}>
          {plantas.map((planta) => (
            <div key={planta.id}>
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={planta.imagen} />
                <Card.Body>
                  <Card.Title>{planta.nombre}</Card.Title>
                  <Card.Text>{planta.descripcion}</Card.Text>
                   
                </Card.Body>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RegisterPlant;