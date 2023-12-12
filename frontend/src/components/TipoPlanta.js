import React, { useState, useEffect } from "react";
import axios from "axios";

const endpoint = "http://127.0.0.1:8000/api";

const TiposPlanta = () => {
  const [tiposPlanta, setTiposPlanta] = useState([]);
  const [nombreTipoPlanta, setNombreTipoPlanta] = useState("");
  const [imagenTipoPlanta, setImagenTipoPlanta] = useState(null);
  const [tipoPlantaEditando, setTipoPlantaEditando] = useState(null);

  const obtenerTiposPlanta = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerTiposPlantas`);
      setTiposPlanta(response.data.data);
      console.log("Tipos de planta cargados:", response.data);
    } catch (error) {
      console.error("Error al obtener tipos de planta:", error);
    }
  };

  useEffect(() => {
    obtenerTiposPlanta();
  }, []);

  const handleNombreTipoPlantaChange = (e) => {
    setNombreTipoPlanta(e.target.value);
  };

  const handleImagenTipoPlantaChange = (e) => {
    setImagenTipoPlanta(e.target.files[0]);
  };

  const agregarTipoPlanta = async () => {
    try {
      const formData = new FormData();
      formData.append("nombre", nombreTipoPlanta);
      formData.append("imagen", imagenTipoPlanta);

      const response = await axios.post(`${endpoint}/insertarTipoPlanta`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);

      obtenerTiposPlanta();
      setNombreTipoPlanta("");
      setImagenTipoPlanta(null);
    } catch (error) {
      console.error("Error al agregar tipo de planta:", error);
    }
  };

  const iniciarEdicionTipoPlanta = (tipoPlanta) => {
    setTipoPlantaEditando(tipoPlanta);
    setNombreTipoPlanta(tipoPlanta.nombre);
  };

  const editarTipoPlanta = async () => {
    if (!tipoPlantaEditando) return;

    try {
      const formData = new FormData();
      formData.append("nombre", nombreTipoPlanta);
      formData.append("imagen", imagenTipoPlanta);

      const response = await axios.put(
        `${endpoint}/actualizarTipoPlanta/${tipoPlantaEditando.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      obtenerTiposPlanta();
      setNombreTipoPlanta("");
      setImagenTipoPlanta(null);
      setTipoPlantaEditando(null);
    } catch (error) {
      console.error("Error al editar tipo de planta:", error);
    }
  };

  const eliminarTipoPlanta = async (id) => {
    try {
      const response = await axios.delete(`${endpoint}/eliminarTipoPlanta/${id}`);

      console.log(response.data);

      obtenerTiposPlanta();
    } catch (error) {
      console.error("Error al eliminar tipo de planta:", error);
    }
  };

  return (
    <div>
      <h2>Tipos de Planta</h2>
      <ul>
        {Array.isArray(tiposPlanta) && tiposPlanta.length > 0 ? (
          tiposPlanta.map((tipoPlanta) => (
            <li key={tipoPlanta.id}>
              {tipoPlanta.nombre}
              {tipoPlanta.imagen && (
                <img
                  src={`URL_DE_TU_API/${tipoPlanta.imagen}`}
                  alt={tipoPlanta.nombre}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
              <button onClick={() => iniciarEdicionTipoPlanta(tipoPlanta)}>Editar</button>
              <button onClick={() => eliminarTipoPlanta(tipoPlanta.id)}>Eliminar</button>
            </li>
          ))
        ) : (
          <p>No hay tipos de planta</p>
        )}
      </ul>
      <div>
        <h3>{tipoPlantaEditando ? "Editar" : "Agregar"} Tipo de Planta</h3>
        <label htmlFor="nombreTipoPlanta">Nombre:</label>
        <input
          type="text"
          id="nombreTipoPlanta"
          value={nombreTipoPlanta}
          onChange={handleNombreTipoPlantaChange}
        />
        <label htmlFor="imagenTipoPlanta">Imagen:</label>
        <input type="file" id="imagenTipoPlanta"onChange={handleImagenTipoPlantaChange} />
        {tipoPlantaEditando ? (
          <button onClick={editarTipoPlanta}>Guardar Cambios</button>
        ) : (
          <button onClick={agregarTipoPlanta}>Agregar</button>
        )}

        {tipoPlantaEditando && (
          <button
            onClick={() => {
              setTipoPlantaEditando(null);
              setNombreTipoPlanta("");
              setImagenTipoPlanta(null);
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
};

export default TiposPlanta;
