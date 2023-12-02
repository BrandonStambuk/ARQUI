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
    //scientificName: "",
    descripcion: "",
    //purpose: "",
    //howToUse: "",
    imagen: [],
  });

  /*const handleStorePlanta = async () => {
    e.preventDefault();
    console.log("Datos de la planta:", plantData);
    await axios.post(`${endpoint}/plantas`, plantData);
  }*/

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Realiza la lógica de registro aquí, por ejemplo, envía los datos al servidor
    console.log("Datos de la planta:", plantData);


    try {
      const formData = new FormData();
      formData.append("nombre", plantData.nombre);
      formData.append("descripcion", plantData.descripcion);
      formData.append("imagen", plantData.imagen[0]);
      console.log(formData);
      const res = await axios.post(`${endpoint}/insertarPlanta`, formData);
      console.log(res);
      console.log("hola");
    } catch (err) {
      console.log(err);
    }
    //await axios.post(`${endpoint}/insertarPlanta`, plantData);

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
                    <label htmlFor="nombre" className="form-label">Nombre de la Planta</label>
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
                    <label htmlFor="descripcion" className="form-label">Descripción Botánica</label>
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
                    <label htmlFor="imagen" className="form-label">Imágenes</label>
                    <input
                      type="file"
                      className="form-control"
                      id="imagen"
                      name="imagen"
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

