import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Card, Form, Button, Col, Row } from "react-bootstrap";
import Navbar from "./Navbar";
import fondoImagen from "../images/jardin3.jpg";
const endpoint = "http://127.0.0.1:8000/api";

const EditPlant = () => {
  const { id } = useParams();
  const [nombreCientifico, setNombreCientifico] = useState("");
  const [nombresComunes, setNombresComunes] = useState([]);
  const [descripcion, setDescripcion] = useState("");
  const [tipoPlanta, setTipoPlanta] = useState("");
  const [imagenes, setImagenes] = useState([]);
  const [plantData, setPlantData] = useState(null);

  useEffect(() => {
    const fetchPlantData = async () => {
      try {
        const response = await axios.get(`${endpoint}/obtenerPlanta/${id}`);
        setPlantData(response.data.data);

        const { nombreCientifico, nombresComunes, descripcion,tipoPlanta ,imagenes } =
          response.data.data;
        setNombreCientifico(nombreCientifico);
        setNombresComunes(nombresComunes);
        setDescripcion(descripcion);
        setTipoPlanta(tipoPlanta);
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
      const response = await axios.put(
        `${endpoint}/actualizarPlanta/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error(
        "Error al enviar la solicitud de edición:",
        error.response.data
      );
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
    <div style={{ backgroundImage: `url(${fondoImagen})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar></Navbar>
      <Card>
        <Card.Body>
          <Card.Title>Editar Planta</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={12}>
                <Form.Group controlId="formNombreCientifico">
                  <Form.Label>Nombre Científico:</Form.Label>
                  <Form.Control
                    type="text"
                    value={nombreCientifico}
                    onChange={(e) => setNombreCientifico(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="formNombresComunes">
                  <Form.Label>Nombres Comunes:</Form.Label>
                  {nombresComunes.map((nombreComun, index) => (
                    <div key={index} className="d-flex">
                      <Form.Control
                        type="text"
                        value={nombreComun.nombre}
                        onChange={(e) =>
                          handleNombreComunChange(index, e.target.value)
                        }
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        onClick={() => handleEliminarNombreComun(index)}
                      >
                        -
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline-primary"
                    type="button"
                    onClick={handleAgregarNombreComun}
                  >
                    +
                  </Button>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="formDescripcion">
                  <Form.Label>Descripción:</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Form.Group controlId="formImagenes">
                  <Form.Label>Imágenes:</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    onChange={handleImagenesChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Mostrar previsualización de imágenes */}
            <Row>
              <Col md={12}>
                <div className="d-flex">
                  {imagenes.map((imagen, index) => (
                    <img
                      key={index}
                      src={
                        imagen instanceof File
                          ? URL.createObjectURL(imagen)
                          : ""
                      }
                      alt={`Imagen ${index + 1}`}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        marginRight: "10px",
                      }}
                    />
                  ))}
                </div>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <Button variant="primary" type="submit">
                  Guardar Cambios
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditPlant;
