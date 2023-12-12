import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/ImageSection.css";
import Navbar from "./Navbar";
import jardin2 from "../images/jardin2.jpg";

function Login() {
  const estiloFondo = {
    backgroundImage: `url(${jardin2})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh", // Ajusta la altura según tus necesidades
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Centra horizontalmente los contenidos
  };

  const contenedorPrincipal = {
    
  };

  return (
    <div style={contenedorPrincipal}>
      {/* Agrega tus contenidos dentro de este div */}
      <div className="container-fluid" style={estiloFondo}>
        {/* Aquí puedes agregar tu contenido */}
        <div className="card" style={{ width: "300px", padding: "20px", backgroundColor: "rgba(255, 255, 255, 0.8)" }}>
          <h2 className="text-center text-dark mb-4">Inicio de Sesión</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" placeholder="Ingresa tu email" />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
