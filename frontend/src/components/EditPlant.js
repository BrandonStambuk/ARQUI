import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const endpoint = "http://127.0.0.1:8000/api";

const EditPlant = () => {
  const { id } = useParams();
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombresComunes, setNombresComunes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await axios.get(`${endpoint}/obtenerPlanta/${id}`);
        setPlantData(response.data.data);

        const { nombreCientifico, nombresComunes, descripcion, imagenes } = response.data.data;
        setNombreCientifico(nombreCientifico);
        setNombresComunes(nombresComunes);
        setDescripcion(descripcion);
        setImagenes(imagenes);
        console.log("Datos de la planta cargados:", response.data.data);
      } catch (error) {
        console.error("Error al obtener los datos de la planta:", error);
      }
    };

    fetchPlantData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nombreCientifico", nombreCientifico);

    for (const nombreComun of nombresComunes) {
      formData.append("nombresComunes[]", nombreComun);
    }

    formData.append("descripcion", descripcion);

    for (const imagen of imagenes) {
      formData.append("imagenes[]", imagen);
    }

    try {
      const response = await axios.put(`${endpoint}/actualizarPlanta/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar la solicitud de edición:", error.response.data);
    }
  };

  const handleImagenesChange = (e) => {
    setImagenes([...e.target.files]);
  };

  const handleNombreComunChange = (index, value) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes[index] = { nombre: value }; // Guardamos los nombres como objetos
    setNombresComunes(newNombresComunes);
  };

  const handleAgregarNombreComun = () => {
    setNombresComunes([...nombresComunes, { nombre: "" }]);
  };

  const handleEliminarNombreComun = (index) => {
    const newNombresComunes = [...nombresComunes];
    newNombresComunes.splice(index, 1);
    setNombresComunes(newNombresComunes);
  };

  if (!plantData) {
    return <p>Cargando datos de la planta...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre Científico:
        <input
          type="text"
          value={nombreCientifico}
          onChange={(e) => setNombreCientifico(e.target.value)}
        />
      </label>
      <br />
      <label>
        Nombres Comunes:
        {nombresComunes.map((nombreComun, index) => (
          <div key={index}>
            <input
              type="text"
              value={nombreComun.nombre}
              onChange={(e) => handleNombreComunChange(index, e.target.value)}
            />
            <button type="button" onClick={() => handleEliminarNombreComun(index)}>
              -
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAgregarNombreComun}>
          +
        </button>
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
      <button type="submit">Guardar Cambios</button>
    </form>
  );
};

export default EditPlant;
