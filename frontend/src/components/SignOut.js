import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // Después de cerrar sesión, puedes realizar acciones adicionales si es necesario.
      // Por ejemplo, redirigir al usuario a la página de inicio.
      navigate('/');
    } catch (error) {
      console.error('Error durante el cierre de sesión:', error.message);
    }
  };

  return (
    <div>
      <h1>Dashboard (Ruta Protegida)</h1>
      <button onClick={handleSignOut}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
