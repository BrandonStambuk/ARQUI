<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\Planta;
use Kreait\Firebase\Database;
use Mockery;

class PlantaControllerTest extends TestCase
{
    protected $plantaModelMock;

    public function setUp(): void
    {
        parent::setUp();

        $this->plantaModelMock = Mockery::mock(Planta::class);
        $this->app->instance(Planta::class, $this->plantaModelMock);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }

    public function testStorePlanta() //Pasa
{
    $this->plantaModelMock
        ->shouldReceive('crearPlanta')
        ->once()
        ->andReturn((object)[]);

    Storage::fake('firebase');
    $imagen = UploadedFile::fake()->image('ImagenHelp.webp');

    $response = $this->postJson('/api/insertarPlanta', [
        'nombre' => 'Nombre de la planta',
        'nombresComunes' => ['NombreComun1', 'NombreComun2'], // Ajusta los nombres comunes según tus necesidades
        'descripcion' => 'Descripción de la planta',
        'tipoPlanta' => 'Tipo de planta', // Ajusta el tipo de planta según tus necesidades
        'imagen' => $imagen,
    ]);

    $response->assertStatus(200);

    $response->assertJson([
        'success' => true,
        'message' => 'Planta creada correctamente.',
    ]);

    $this->plantaModelMock->shouldHaveReceived('crearPlanta')->once();
}
    
public function testUpdatePlanta()
    {
        // Configuración del mock para el método actualizarPlanta
        $this->plantaModelMock
            ->shouldReceive('actualizarPlanta')
            ->once()
            ->andReturn((object)[]); // Puedes ajustar esto según tus necesidades

        // Haciendo la solicitud para actualizar la planta
        $responseUpdate = $this->postJson('/api/actualizarPlanta/1', [
            'nombre' => 'Nuevo nombre',
            'nombresComunes' => ['NuevoNombreComun1', 'NuevoNombreComun2'],
            'descripcion' => 'Nueva descripción',
            'tipoPlanta' => 'Nuevo tipo de planta',
            'imagen' => 'URL de la nueva imagen', // Asegúrate de proporcionar una URL válida
        ]);

        // Asegurar que la respuesta tenga el código de estado esperado
        $responseUpdate->assertStatus(200);

        // Asegurar que la respuesta JSON tiene la estructura esperada
        $responseUpdate->assertJsonFragment([
            'success' => true,
            'message' => 'f nomas',
        ]);

        // Asegurarnos de que el método actualizarPlanta se llamó una vez con los argumentos esperados
        $this->plantaModelMock->shouldHaveReceived('actualizarPlanta')->once();
    }


    public function testDeletePlanta()
    {
        $plantaInsertada = $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[]) // Devolver un objeto vacío o ajusta según tus necesidades
            ->getMock();

        Storage::fake('firebase');
        $imagen = UploadedFile::fake()->image('ImagenHelp.webp');

        $response = $this->postJson('/api/insertarPlanta', [
            'nombre' => 'Nombre de la planta',
            'nombresComunes' => ['NombreComun1', 'NombreComun2'], // Ajusta los nombres comunes según tus necesidades
            'descripcion' => 'Descripción de la planta',
            'tipoPlanta' => 'Tipo de planta', // Ajusta el tipo de planta según tus necesidades
            'imagen' => $imagen,
        ]);

        $response->assertStatus(200);

        $plantaId = $plantaInsertada->id; 

        $responseDelete = $this->delete("/api/eliminarPlanta/{$plantaId}");

        $responseDelete->assertStatus(200);

        $responseDelete->assertJson([
            'success' => true,
            'message' => 'Planta eliminada correctamente',
        ]);

        $this->plantaModelMock->shouldHaveReceived('eliminarPlanta')->once();
    }


    public function testGetPlanta()
    {
        $plantaInsertada = $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[]) 
            ->getMock();

        Storage::fake('firebase');
        $imagen = UploadedFile::fake()->image('ImagenHelp.webp');

        $response = $this->postJson('/api/insertarPlanta', [
            'nombre' => 'Nombre de la planta',
            'descripcion' => 'Descripción de la planta',
            'imagen' => $imagen,
        ]);
 
        $response->assertStatus(200);

        $plantaId = $plantaInsertada->id;

        $responseGet = $this->get("/api/obtenerPlanta/{$plantaId}");

        $responseGet->assertStatus(200);

        $responseGet->assertJson([
            'success' => true,
            'data' => [ 
                'id' => $plantaId,
                'nombre' => 'Nombre de la planta',
                'descripcion' => 'Descripción de la planta',
                'imagen' => $imagen->hashName(),
            ],
        ]);

        $this->plantaModelMock->shouldHaveReceived('obtenerPlanta')->once();
    }

    public function testGetAllPlantas()
    {
        $planta1 = $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[])
            ->getMock();

        $planta2 = $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[])
            ->getMock();

        Storage::fake('firebase');
        $imagen = UploadedFile::fake()->image('ImagenHelp.webp');

        $response1 = $this->postJson('/api/insertarPlanta', [
            'nombre' => 'planta 1',
            'descripcion' => 'Descripción de la planta 1',
            'imagen' => $imagen,
        ]);

        $response2 = $this->postJson('/api/insertarPlanta', [
            'nombre' => 'planta 2',
            'descripcion' => 'Descripción de la planta 2',
            'imagen' => $imagen,
        ]);

        $response1->assertStatus(200);
        $response2->assertStatus(200);

        $responseGetAll = $this->get('/api/obtenerTodasLasPlantas');

        $responseGetAll->assertStatus(200);

        $responseGetAll->assertJson([
            'success' => true,
            'data' => [ 
                [
                    'id' => $planta1->id,
                    'nombre' => 'planta 1',
                    'descripcion' => 'Descripción de la planta 1',
                    'imagen' => $imagen->hashName(),
                ],
                [
                    'id' => $planta2->id,
                    'nombre' => 'planta 2',
                    'descripcion' => 'Descripción de la planta 2',
                    'imagen' => $imagen->hashName(),
                ],
            ],
        ]);

        $this->plantaModelMock->shouldHaveReceived('obtenerTodasLasPlantas')->once();
    }


    public function testGenerateQRCodeForPlanta()
    {
        $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[]); 

        $planta = [
            'nombre' => 'Nombre de la planta',
            'descripcion' => 'Descripción de la planta',
            'imagen' => UploadedFile::fake()->image('ImagenHelp.webp'),
        ];

        $response = $this->postJson('/api/insertarPlanta', $planta);

        $response->assertStatus(200);

        $plantaId = $this->plantaModelMock->id; 
        $responseGet = $this->get("/api/getPlanta/{$plantaId}");

        $responseGet->assertStatus(200);

        $plantaId = $responseGet->json('data.id');

        $responseGenerateQR = $this->get("/api/generateQRCode/{$plantaId}");

        $responseGenerateQR->assertStatus(200);

        $responseGenerateQR->assertJson([
            'success' => true,
            'message' => 'Código QR generado correctamente',
        ]);

        $this->plantaModelMock->shouldHaveReceived('generateQRCode')->once()->with($plantaId);
    }

}
