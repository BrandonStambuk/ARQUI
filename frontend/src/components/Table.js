import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";

const Table = () => {
  const plantData = [
    {
      id: 1,
      name: "Planta 1",
      scientificName: "Scientific Name 1",
      description: "Description 1",
      functionality: "Functionality 1",
      usage: "Usage 1",
    },
    {
      id: 2,
      name: "Planta 2",
      scientificName: "Scientific Name 2",
      description: "Description 2",
      functionality: "Functionality 2",
      usage: "Usage 2",
    },
    // Add more plant data as needed
  ];

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

  const handleEdit = (id) => {
    // Implementar lógica de edición
    console.log(`Editar planta con ID: ${id}`);
  };

  const handleDelete = (id) => {
    // Implementar lógica de eliminación
    console.log(`Eliminar planta con ID: ${id}`);
  };

  return (
    <div style={{ ...contenedorPrincipal, ...estiloFondo }}>
      <Navbar />
      <div className="container mt-5">
        <h2>Tabla de Plantas</h2>
        <table className="table mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Nombre Científico</th>
              <th>Descripción</th>
              <th>Funcionalidad</th>
              <th>Uso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {plantData.map((plant) => (
              <tr key={plant.id}>
                <td>{plant.id}</td>
                <td>{plant.name}</td>
                <td>{plant.scientificName}</td>
                <td>{plant.description}</td>
                <td>{plant.functionality}</td>
                <td>{plant.usage}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(plant.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(plant.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Link to="/register" className="btn btn-primary">
          Registrar Nueva Planta
        </Link>
      </div>
    </div>
  );
};

export default Table;
