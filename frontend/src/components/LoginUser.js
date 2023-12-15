import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import Navbar from "./Navbar";

const endpoint = "http://127.0.0.1:8000/api";

// Configura tu proyecto Firebase
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

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpia el evento al desmontar el componente
    return () => unsubscribe();
  }, [auth]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // El usuario se ha autenticado con éxito, puedes realizar acciones adicionales
      // (por ejemplo, redireccionar a la página de inicio, mostrar un mensaje, etc.).
        
       console.log('Usuario logueado:', email);
       navigate('/table');

    } catch (error) {
      console.error('Error durante el inicio de sesión:', error.message);
      // Maneja el error y muestra un mensaje al usuario.
    }
  };

  return (
    <div>
      <Navbar/>
      <Card style={{ width: '300px', margin: 'auto', marginTop: '50px' }}>
        <Card.Body>
          <Card.Title>Iniciar Sesión</Card.Title>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginComponent;
