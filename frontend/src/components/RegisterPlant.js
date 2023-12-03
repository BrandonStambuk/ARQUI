import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";
import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api";

const RegisterPlant = () => {
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [nombresComunes, setNombresComunes] = useState(['']);
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nombreCientifico', nombreCientifico);

    for (const nombreComun of nombresComunes) {
      formData.append('nombresComunes[]', nombreComun);
    }

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

  const handleNombreComunChange = (index, value) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes[index] = value;
    setNombresComunes(newNombresComunes);
  };

  const handleAgregarNombreComun = () => {
    setNombresComunes([...nombresComunes, '']);
  };

  const handleEliminarNombreComun = (index) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes.splice(index, 1);
    setNombresComunes(newNombresComunes);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre Científico:
        <input type="text" value={nombreCientifico} onChange={(e) => setNombreCientifico(e.target.value)} />
      </label>
      <br />
      <label>
        Nombres Comunes:
        {nombresComunes.map((nombreComun, index) => (
          <div key={index}>
            <input
              type="text"
              value={nombreComun}
              onChange={(e) => handleNombreComunChange(index, e.target.value)}
            />
            <button type="button" onClick={() => handleEliminarNombreComun(index)}>-</button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarNombreComun}>+</button>
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
      {/* Mostrar previsualización de imágenes */}
      <div>
      {imagenes.map((imagen, index) => (
        <img
          key={index}
          src={imagen instanceof File ? URL.createObjectURL(imagen) : ''}
          alt={`Imagen ${index + 1}`}
          style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }}
        />
      ))}
      </div>
      <br />
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
};

export default RegisterPlant;
