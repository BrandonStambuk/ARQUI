import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Table, Form, Button } from "react-bootstrap";
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import NavbarAdmin from './NavbarAdmin';

const endpoint = "http://127.0.0.1:8000/api";

const TiposPlanta = () => {
  const [tiposPlanta, setTiposPlanta] = useState([]);
  const [nombreTipoPlanta, setNombreTipoPlanta] = useState("");
  const [imagenTipoPlanta, setImagenTipoPlanta] = useState(null);
  const [tipoPlantaEditando, setTipoPlantaEditando] = useState(null);

  const storage = getStorage();

  useEffect(() => {
    obtenerTiposPlanta();
  }, [storage]);

  const obtenerTiposPlanta = async () => {
    try {
      const response = await axios.get(`${endpoint}/obtenerTiposPlantas`);
      const tiposPlantaConUrl = await Promise.all(
        response.data.data.map(async (tipoPlanta) => {
          if (tipoPlanta.imagen) {
            const imageRef = ref(storage, `${tipoPlanta.imagen}`);
            const imageUrl = await getDownloadURL(imageRef);
            return { ...tipoPlanta, imageUrl };
          }
          return tipoPlanta;
        })
      );
      setTiposPlanta(tiposPlantaConUrl);
      console.log("Tipos de planta cargados:", tiposPlantaConUrl);
    } catch (error) {
      console.error("Error al obtener tipos de planta:", error);
    }
  };

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
      <NavbarAdmin />
      <Card>
        <Card.Header>
          <h2>Tipos de Planta</h2>
        </Card.Header>
        <Card.Body>
          <Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(tiposPlanta) && tiposPlanta.length > 0 ? (
                  tiposPlanta.map((tipoPlanta) => (
                    <tr key={tipoPlanta.id}>
                      <td>{tipoPlanta.id}</td>
                      <td>{tipoPlanta.nombre}</td>
                      <td>
                        {tipoPlanta.imageUrl && (
                          <img
                            src={tipoPlanta.imageUrl}
                            alt={tipoPlanta.nombre}
                            style={{ width: "50px", height: "50px" }}
                          />
                        )}
                      </td>
                      <td>
                        <Button onClick={() => iniciarEdicionTipoPlanta(tipoPlanta)}>
                          Editar
                        </Button>
                        <Button variant="danger" onClick={() => eliminarTipoPlanta(tipoPlanta.id)}>
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay tipos de planta</td>
                  </tr>
                )}
              </tbody>
            </Table>
            <div>
              <h3>{tipoPlantaEditando ? "Editar" : "Agregar"} Tipo de Planta</h3>
              <Form.Group controlId="nombreTipoPlanta">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control
                  type="text"
                  value={nombreTipoPlanta}
                  onChange={handleNombreTipoPlantaChange}
                />
              </Form.Group>
              <Form.Group controlId="imagenTipoPlanta">
                <Form.Label>Imagen:</Form.Label>
                <Form.Control type="file" onChange={handleImagenTipoPlantaChange} />
              </Form.Group>
              {tipoPlantaEditando ? (
                <Button variant="success" onClick={editarTipoPlanta}>
                  Guardar Cambios
                </Button>
              ) : (
                <Button variant="primary" onClick={agregarTipoPlanta}>
                  Agregar
                </Button>
              )}

              {tipoPlantaEditando && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setTipoPlantaEditando(null);
                    setNombreTipoPlanta("");
                    setImagenTipoPlanta(null);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TiposPlanta;
