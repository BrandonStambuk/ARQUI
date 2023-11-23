<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class UserControllerTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    //use RefreshDatabase; 


    public function testStoreUser(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);
    }

    public function testStoreUserWithoutNombre(){
        $userData = [
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => false,
            'message' => 'Error al insertar el usuario'
        ]);
    }

    public function testEditUser(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];


        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);

        $response = $this->json('PUT', '/api/users/1', ['nombre' => 'Usuario 2']);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario actualizado correctamente'
        ]);

    }

    public function testDeleteUser(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);

        $response = $this->json('DELETE', '/api/users/1');

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario eliminado correctamente'
        ]);

    }

    public function testGetUser(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);

        $response = $this->json('GET', '/api/users/1');

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario obtenido correctamente'
        ]);

    }

    public function testGetAllUsers(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);

        $response = $this->json('GET', '/api/users');

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuarios obtenidos correctamente'
        ]);

    }

    public function testLoginUser(){
        $userData = [
            'nombre' => 'Usuario 1',
            'email' => 'usuario@gmail.com',
            'password' => '12345678'
        ];

        $response = $this->json('POST', '/api/users', $userData);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario insertado correctamente'
        ]);

        $response = $this->json('POST', '/api/login', ['email' => 'usuario@gmail.com','password' => '12345678']);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario logueado correctamente'
        ]);

    }
}
