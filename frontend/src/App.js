import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ImageSection from './components/ImageSection';
import About from './components/About';
import Plant from './components/Plant';
import Login from './components/Login';
import RegisterPlant from './components/RegisterPlant';
import Table from './components/Table';
import Types from './components/Types';
import EditPlant from './components/EditPlant';
import Plants from './components/Plants';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import SignOut from './components/SignOut';
import TipoPlanta from './components/TipoPlanta';

const firebaseConfig = {
  apiKey: "AIzaSyDzcgdq3uCqURkpfXTlptrtOfCSmbkivt0",
  authDomain: "jardinbotanico-28aed.firebaseapp.com",
  databaseURL: "https://jardinbotanico-28aed-default-rtdb.firebaseio.com",
  projectId: "jardinbotanico-28aed",
  storageBucket: "jardinbotanico-28aed.appspot.com",
  messagingSenderId: "1030784464482",
  appId: "1:1030784464482:web:b249b4d99201a2f2f6833b",
  measurementId: "G-NQJLT0HG64"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const App = () => {
  const [user, setUser] = useState(null);
  let sessionTimeout;
  let inactivityTimeout;

  const resetSessionTimeout = () => {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      console.log('Se acabo la sesion');
      signOutAndRedirect();
    }, 2 * 60 * 60 * 1000); // Cerrar sesión después de 2 minutos
  };

  const resetInactivityTimeout = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      console.log('Usuario deslogueado por inactividad');
      signOutAndRedirect();
    }, 30 * 60 * 1000); // Cerrar sesión después de 1 minuto de inactividad
  };

  const handleUserActivity = () => {
    resetInactivityTimeout(); // Reiniciar temporizador de inactividad con cada clic
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);

      if (user) {
        resetSessionTimeout();
        resetInactivityTimeout(); // Iniciar el temporizador de inactividad al inicio de sesión
      }
    });

    const handleUserClick = () => {
      handleUserActivity();
    };

    document.addEventListener('click', handleUserClick);

    return () => {
      unsubscribe();
      clearTimeout(sessionTimeout);
      clearTimeout(inactivityTimeout);
      document.removeEventListener('click', handleUserClick);
    };
  }, [auth]);

  const signOutAndRedirect = () => {
    signOut(auth);
    //console.log('Usuario deslogueado');
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ImageSection />} />
          <Route path="/about" element={<About />} />
          <Route path="/plant" element={<Plant />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPlant />} />
          <Route path="/table" element={user ? <Table /> : <Table />} />
          <Route path="/types" element={<Types />} />
          <Route path="/types/:tipoId" component={TipoPlanta} />
          <Route path="/editPlant/:id" element={<EditPlant />} />
          <Route path="/Plants" element={<Plants />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/registerUser" element={<RegisterUser />} />
          <Route path="/loginUser" element={<LoginUser />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/tipoPlanta" element={<TipoPlanta />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const Dashboard = () => {
  return <div>Dashboard (Ruta Protegida)</div>;
};

export default App;
