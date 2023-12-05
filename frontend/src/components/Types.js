import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";

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

  const renderCard = (title, description, link) => (
    <div className="col-md-4 mb-4">
      <Link to={link} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="card">
          <img src={jardin2} className="card-img-top" alt={title} />
          <div className="card-body">
            <h5 className="card-titulo">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div style={{ ...contenedorPrincipal, ...estiloFondo }}>
      <Navbar />
      <div className="container mt-5">
        <h2>Tipo de Plantas</h2>
        <div className="row">
          {/* Primera fila de cards */}
          {renderCard("Tipo 1", "Descripción del Tipo 1", "/tipo1")}
          {renderCard("Tipo 2", "Descripción del Tipo 2", "/tipo2")}
          {renderCard("Tipo 3", "Descripción del Tipo 3", "/tipo3")}
        </div>
        <div className="row">
          {/* Segunda fila de cards */}
          {renderCard("Tipo 4", "Descripción del Tipo 4", "/tipo4")}
          {renderCard("Tipo 5", "Descripción del Tipo 5", "/tipo5")}
          {renderCard("Tipo 6", "Descripción del Tipo 6", "/tipo6")}
        </div>
      </div>
    </div>
  );
};

export default Types;
