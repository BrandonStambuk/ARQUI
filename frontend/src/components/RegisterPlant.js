import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import axios from "axios";
import fondoImagen from "../images/jardin3.jpg"; // Asegúrate de proporcionar la ruta correcta
const endpoint = "http://127.0.0.1:8000/api";

const RegisterPlant = () => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombresComunes, setNombresComunes] = useState([""]);
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [tipoPlanta, setTipoPlanta] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombreCientifico", nombreCientifico);

    for (const nombreComun of nombresComunes) {
      formData.append("nombresComunes[]", nombreComun);
    }

    formData.append("descripcion", descripcion);
    formData.append("tipoPlanta", tipoPlanta);

    for (const imagen of imagenes) {
      formData.append("imagenes[]", imagen);
    }

    try {
      const response = await axios.post(`${endpoint}/insertarPlanta`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log("Error al enviar la solicitud:", error);
    }
  };

  const handleImagenesChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const inputStyle = {
    width: "50%",
  };

  const handleNombreComunChange = (index, value) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes[index] = value;
    setNombresComunes(newNombresComunes);
  };

  const handleAgregarNombreComun = () => {
    setNombresComunes([...nombresComunes, ""]);
  };

  const handleEliminarNombreComun = (index) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes.splice(index, 1);
    setNombresComunes(newNombresComunes);
  };

  const handleTipoPlantaChange = (e) => {
    setTipoPlanta(e.target.value);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${fondoImagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Navbar />
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Registrar Planta</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nombreCientifico" className="form-label">
                  Nombre Científico:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombreCientifico"
                  value={nombreCientifico}
                  onChange={(e) => setNombreCientifico(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombres Comunes:</label>
                {nombresComunes.map((nombreComun, index) => (
                  <div key={index} className="input-group mb-2">
                    <input
                      type="text"
                      className="form-control"
                      value={nombreComun}
                      onChange={(e) => handleNombreComunChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => handleEliminarNombreComun(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={handleAgregarNombreComun}
                >
                  +
                </button>
              </div>
              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">
                  Descripción:
                </label>
                <textarea
                  className="form-control"
                  id="descripcion"
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="tipoPlanta" className="form-label">
                  Tipo de Planta:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tipoPlanta"
                  value={tipoPlanta}
                  onChange={handleTipoPlantaChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imagenes" className="form-label">
                  Imágenes:
                </label>
                <input
                  type="file"
                  multiple
                  className="form-control"
                  id="imagenes"
                  onChange={handleImagenesChange}
                />
              </div>
              {/* Mostrar previsualización de imágenes */}
              <div className="mb-3">
                {imagenes.map((imagen, index) => (
                  <img
                    key={index}
                    src={imagen instanceof File ? URL.createObjectURL(imagen) : ""}
                    alt={`Imagen ${index + 1}`}
                    style={{ maxWidth: "100px", maxHeight: "100px", marginRight: "10px" }}
                  />
                ))}
              </div>
              <div className="mb-3 text-center">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
                <button type="submit" style={{ marginLeft: "5px" }} className="btn btn-primary">
                  Generar QR
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPlant;
