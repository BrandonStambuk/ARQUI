import React, { useState, useEffect } from "react";
import axios from "axios";


const endpoint = "http://127.0.0.1:8000/api";


const TiposPlanta = () => {
  const [tiposPlanta, setTiposPlanta] = useState([]);
  const [nombreTipoPlanta, setNombreTipoPlanta] = useState("");
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

  const agregarTipoPlanta = async () => {
    try {
      const response = await axios.post(`${endpoint}/insertarTipoPlanta`, {
        nombre: nombreTipoPlanta,
      });

      console.log(response.data);

      // Actualizar la lista de tipos de planta después de agregar uno nuevo
      obtenerTiposPlanta();
      setNombreTipoPlanta(""); // Limpiar el campo después de agregar
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
      const response = await axios.put(`${endpoint}/actualizarTipoPlanta/${tipoPlantaEditando.id}`, {
        nombre: nombreTipoPlanta,
      });

      console.log(response.data);

      // Actualizar la lista de tipos de planta después de editar
      obtenerTiposPlanta();
      setNombreTipoPlanta(""); // Limpiar el campo después de editar
      setTipoPlantaEditando(null); // Desactivar el modo de edición
    } catch (error) {
      console.error("Error al editar tipo de planta:", error);
    }
  };

  const eliminarTipoPlanta = async (id) => {
    try {
      const response = await axios.delete(`${endpoint}/eliminarTipoPlanta/${id}`);

      console.log(response.data);

      // Actualizar la lista de tipos de planta después de eliminar uno
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
            <button onClick={() => iniciarEdicionTipoPlanta(tipoPlanta)}>Editar</button>
            <button onClick={() => eliminarTipoPlanta(tipoPlanta.id)}>Eliminar</button>
          </li>
        ))
      ): (
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
        {tipoPlantaEditando ? (
          <button onClick={editarTipoPlanta}>Guardar Cambios</button>
        ) : (
          <button onClick={agregarTipoPlanta}>Agregar</button>
        )}
      </div>
    </div>
  );
};

export default TiposPlanta;
