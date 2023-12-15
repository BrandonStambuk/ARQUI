import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import QRious from 'qrious';
import NavbarAdmin from './NavbarAdmin';
import { Navbar } from 'react-bootstrap';
const PlantList = () => {
  const [plantas, setPlantas] = useState([]);

  useEffect(() => {
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

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/eliminarPlanta/${id}`);
      setPlantas((prevPlantas) => prevPlantas.filter((planta) => planta.id !== id));
    } catch (error) {
      console.error('Error al eliminar la planta:', error);
    }
  };

  const obtenerNombresComunes = (nombresComunes) => {
    const nombres = nombresComunes.map((nombreComun) => {
      if (typeof nombreComun === 'object') {
        return nombreComun.nombre;
      }
      return nombreComun;
    });

    return nombres.join(', ');
  };

  const convertirHtmlATexto = (htmlString) => {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || '';
  };

  return (
    <div>
      <NavbarAdmin></NavbarAdmin>
      <div className="card bg-transparent">
        <h1 className="card-header">Listado de Plantas</h1>
        <div className="tarjeta-body">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre Científico</th>
                <th>Nombres Comunes</th>
                <th>Descripción</th>
                <th>Tipo de planta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(plantas) && plantas.length > 0 ? (
                plantas.map((planta) => (
                  <tr key={planta.id}>
                    <td>{planta.nombreCientifico}</td>
                    <td>{obtenerNombresComunes(planta.nombresComunes)}</td>
                    <td>{convertirHtmlATexto(planta.descripcion)}</td>
                    <td>{planta.tipo_planta_id}</td>
                    <td>
                      <Link to={`/editPlant/${planta.id}`} className="btn btn-primary mr-2">
                        Editar
                      </Link>
                      <button onClick={() => handleEliminar(planta.id)} className="btn btn-danger">
                        Eliminar
                      </button>
                      {/* Botón para generar QR */}
                      <button
                        onClick={() => {
                          const qrCodeData = `https://JardinBotanicoMartinCardenas.com/plants/${planta.id}`;
                          const qr = new QRious({
                            value: qrCodeData,
                            size: 700, // Puedes ajustar el tamaño según tus necesidades
                          });

                          // Abrir el código QR en una nueva pestaña
                          const newWindow = window.open();
                          newWindow.document.write(`<img src="${qr.toDataURL('image/png')}" alt="QR Code"/>`);
                        }}
                        className="btn btn-info mr-2"
                      >
                        QR
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No hay plantas disponibles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlantList;