<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

class PlantaControllerTest extends TestCase
{
    /**
     * A basic unit test example.
     *
     * @return void
     */

    //use RefreshDatabase;

    public function testStorePlanta(){
        /*$response = $this->json('POST', '/api/plantas', ['nombre' => 'Planta 1', 'descripcion' => 'Descripcion de la planta 1']);
        $response->assertStatus(200);*/

        $plantaData = [
            'nombreComun' => 'Planta 1',
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta insertada correctamente'
        ]);
    }

    public function testStorePlantaWithoutNombreComun(){
        $plantaData = [
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => false,
            'message' => 'Error al insertar la planta'
        ]);
    }

    public function testEditPlanta(){
        $plantaData = [
            'nombreComun' => 'Planta 1',
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta insertada correctamente'
        ]);

        $plantaData = [
            'nombreComun' => 'Planta F',
            'nombreCientifico' => 'Planta F',
            'descripcion' => 'Descripcion de la planta F',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('PUT', '/api/plantas/1', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta actualizada correctamente'
        ]);
    }

    public function testDeletePlanta(){
        $plantaData = [
            'nombreComun' => 'Planta 1',
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta insertada correctamente'
        ]);

        $response = $this->json('DELETE', '/api/plantas/1');
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta eliminada correctamente'
        ]);
    }

    public function testGetPlanta(){
        $plantaData = [
            'nombreComun' => 'Planta 1',
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta insertada correctamente'
        ]);

        $response = $this->json('GET', '/api/plantas/1');
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta obtenida correctamente'
        ]);
    }

    public function testGetAllPlantas(){
        $plantaData = [
            'nombreComun' => 'Planta 1',
            'nombreCientifico' => 'Planta 1',
            'descripcion' => 'Descripcion de la planta 1',
            'imagen' => 'imagen.jpg',
        ]; 

        $response = $this->json('POST', '/api/plantas', $plantaData);
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Planta insertada correctamente'
        ]);

        $response = $this->json('GET', '/api/plantas');
        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Plantas obtenidas correctamente'
        ]);
    }

}
