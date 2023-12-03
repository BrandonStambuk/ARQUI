// Importa la clase de estilo
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";
import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api";

function RegisterPlant() {
  const [plantData, setPlantData] = useState({
    nombre: "",
    descripcion: "",
    imagen: [],
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
      imagen: files,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nombre", plantData.nombre);
      formData.append("descripcion", plantData.descripcion);
      formData.append("imagen", plantData.imagen[0]);

      const res = await axios.post(`${endpoint}/insertarPlanta`, formData);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
          <div className="col-md-8"> {/* Cambia col-md-6 a col-md-8 */}
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Registrar una Planta</h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre de la Planta
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={plantData.nombre}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                      Descripción Botánica
                    </label>
                    <textarea
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      rows="3"
                      value={plantData.descripcion}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">
                      Imágenes
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="imagen"
                      name="imagen"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Registrar
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Generar QR
                  </button>
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
