import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import NavbarAdmin from "./NavbarAdmin";

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

const RegisterComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // El usuario se ha registrado con éxito, puedes realizar acciones adicionales
      // (por ejemplo, redireccionar a la página de inicio, mostrar un mensaje, etc.).
    } catch (error) {
      console.error('Error durante el registro:', error.message);
      // Maneja el error y muestra un mensaje al usuario.
    }
  };

  return (
    <div>
      <NavbarAdmin />
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card>
              <Card.Title>Registrar Usuario</Card.Title>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" onClick={handleRegister}>
                    Register
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterComponent;
