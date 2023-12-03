import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PlantList = () => {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
    // Función para cargar la lista de plantas al montar el componente
    const cargarPlantas = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/obtenerPlantas');
        setPlantas(response.data.data);
        console.log('Plantas cargadas:', response.data);
      } catch (error) {
        console.error('Error al cargar las plantas:', error);
      }
      
    };

    cargarPlantas();
  }, []);

  const handleEditar = (id) => {
    // Lógica para editar una planta, puedes redirigir a una página de edición o mostrar un modal, etc.
    console.log('Editar planta con ID:', id);
    // Ejemplo de redirección a una página de edición

  };

  const handleEliminar = async (id) => {
    // Lógica para eliminar una planta
    try {
      await axios.delete(`http://127.0.0.1:8000/api/eliminarPlanta/${id}`);
      // Actualizar la lista de plantas después de eliminar
      setPlantas((prevPlantas) => prevPlantas.filter((planta) => planta.id !== id));
    } catch (error) {
      console.error('Error al eliminar la planta:', error);
    }
  };

  const obtenerNombresComunes = (nombresComunes) => {
    return nombresComunes.map((nombreComun) => nombreComun.nombre).join(', ');
  };
  
  
  const obtenerImagenes = (imagenes) => {
    return imagenes.map((imagen, index) => (
      <img
        key={index} // Asegúrate de que cada imagen tenga una clave única
        src={imagen}
        alt="Imagen de la planta"
        style={{ maxWidth: '100px', maxHeight: '100px' }} // Establece el tamaño deseado
      />
    ));
  };
  return (
    <div>
      <h1>Listado de Plantas</h1>
      <ul>
  {Array.isArray(plantas) && plantas.length > 0 ? (
    plantas.map((planta) => (
      <li key={planta.id}>
        <strong>Nombre Científico:</strong> {planta.nombreCientifico} <br />
        <strong>Nombres Comunes:</strong> {obtenerNombresComunes(planta.nombresComunes)} <br />
        <strong>Descripción:</strong> {planta.descripcion} <br />
        <strong>Imágenes:</strong> {obtenerImagenes(planta.imagenes)} <br />
        <Link to={`/editPlant/${planta.id}`}>
             Editar
        </Link>
        <button onClick={() => handleEliminar(planta.id)}>Eliminar</button>
        <hr />
      </li>
    ))
  ) : (
    <p>No hay plantas disponibles.</p>
  )}
</ul>
    </div>
  );
};

export default PlantList;
