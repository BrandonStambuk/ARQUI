import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";
import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api";

const RegisterPlant = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('descripcion', descripcion);

      for (const imagen of imagenes) {
          formData.append('imagenes[]', imagen);
      }

      try {
          const response = await axios.post(`${endpoint}/insertarPlanta`, formData, {
              headers: {
                  'Content-Type': 'multipart/form-data',
              },
          });

          console.log(response.data);
      } catch (error) {
          console.error('Error al enviar la solicitud:', error);
      }
  };

  const handleImagenesChange = (e) => {
      setImagenes([...e.target.files]);
  };

  return (

      <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </label>
            <br />
            <label>
                Descripción:
                <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </label>
            <br />
            <label>
                Imágenes:
                <input type="file" multiple onChange={handleImagenesChange} />
            </label>
            <br />
            <button type="submit">Enviar</button>
        </form>
  );
}

export default RegisterPlant;

