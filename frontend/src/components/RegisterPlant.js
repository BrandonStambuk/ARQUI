import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import NavbarAdmin from "./NavbarAdmin";
import axios from "axios";
import fondoImagen from "../images/jardin3.jpg"; // Asegúrate de proporcionar la ruta correcta
import { Editor } from "@tinymce/tinymce-react";
import MySwal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Importa useNavigate desde react-router-dom
// Usa useNavigate para obtener la función navigate

const endpoint = "http://127.0.0.1:8000/api";

const RegisterPlant = () => {
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombresComunes, setNombresComunes] = useState([""]);
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [tipoPlanta, setTipoPlanta] = useState("");
  const [tiposPlanta, setTiposPlanta] = useState([]);
  const navigate = useNavigate(); 
  useEffect(() => {
    // Obtener los tipos de planta disponibles
    const obtenerTiposPlanta = async () => {
      try {
        const response = await axios.get(`${endpoint}/obtenerTiposPlantas`);
        setTiposPlanta(response.data.data);
      } catch (error) {
        console.error("Error al obtener tipos de planta:", error);
      }
    };

    obtenerTiposPlanta();
  }, []);

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
      MySwal.fire({
        icon: "success",
        title: "Planta registrada correctamente",
        confirmButtonText: "Ir a tabla de plantas",
      }).then(() => {
        navigate("/table"); // O redirige a la página que desees después de la alerta
      });
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

  const handleTinyMCEChange = (content, editor) => {
    // Actualiza el estado de la descripción con el contenido del editor TinyMCE
    setDescripcion(content);
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
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <NavbarAdmin />
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
      {/* Integra TinyMCE como un componente de editor de texto enriquecido */}
      <Editor
        apiKey="hza3mgcarp7rukdgkhnua1airq2522z41s0btsk5gqq64632" // Reemplaza con tu clave de API de TinyMCE
        value={descripcion}
        init={{
          height: 300,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          toolbar: `undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help`,
        }}
        onEditorChange={handleTinyMCEChange}
      />
    </div>
              <div className="mb-3">
                <label htmlFor="tipoPlanta" className="form-label">
                  Tipo de Planta:
                </label>
                <select
                  className="form-control"
                  id="tipoPlanta"
                  value={tipoPlanta}
                  onChange={handleTipoPlantaChange}
                >
                  <option value="">Seleccionar Tipo de Planta</option>
                  {tiposPlanta.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPlant;
