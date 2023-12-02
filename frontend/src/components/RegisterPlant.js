import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";

function RegisterPlant() {
  const [plantData, setPlantData] = useState({
    plantName: "",
    scientificName: "",
    botanicalDescription: "",
    purpose: "",
    howToUse: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlantData({
      ...plantData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setPlantData({
      ...plantData,
      images: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Realiza la lógica de registro aquí, por ejemplo, envía los datos al servidor
    console.log("Datos de la planta:", plantData);
  };

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

  return (
    <div style={{ ...contenedorPrincipal, ...estiloFondo }}>
      <Navbar />
      <div className="container">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-md-6">
            <div className="card text-center">
              <div className="card-body">
                <h5 className="card-titulo">Registrar una Planta</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="plantName" className="form-label">Nombre de la Planta</label>
                    <input
                      type="text"
                      className="form-control"
                      id="plantName"
                      name="plantName"
                      value={plantData.plantName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="scientificName" className="form-label">Nombre Científico</label>
                    <input
                      type="text"
                      className="form-control"
                      id="scientificName"
                      name="scientificName"
                      value={plantData.scientificName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="botanicalDescription" className="form-label">Descripción Botánica</label>
                    <textarea
                      className="form-control"
                      id="botanicalDescription"
                      name="botanicalDescription"
                      rows="3"
                      value={plantData.botanicalDescription}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="purpose" className="form-label">Propósito de la Planta</label>
                    <textarea
                      className="form-control"
                      id="purpose"
                      name="purpose"
                      rows="3"
                      value={plantData.purpose}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="howToUse" className="form-label">Cómo Utilizar la Planta</label>
                    <textarea
                      className="form-control"
                      id="howToUse"
                      name="howToUse"
                      rows="3"
                      value={plantData.howToUse}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="images" className="form-label">Imágenes</label>
                    <input
                      type="file"
                      className="form-control"
                      id="images"
                      name="images"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">Registrar</button>
                  <button type="submit" className="btn btn-primary">Generar QR</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPlant;

