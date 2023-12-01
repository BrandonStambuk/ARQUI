<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\Planta;
use Kreait\Firebase\Database;
use Mockery;

class PruebaPlantTest extends TestCase
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

    public function testStorePlanta()
    {
        $this->plantaModelMock
            ->shouldReceive('crearPlanta')
            ->once()
            ->andReturn((object)[]); 

        Storage::fake('firebase');
        $imagen = UploadedFile::fake()->image('ImagenHelp.webp');

        $response = $this->postJson('/api/insertarPlanta', [
            'nombre' => 'Nombre de la planta',
            'descripcion' => 'Descripción de la planta',
            'imagen' => $imagen,
        ]);

        $response->assertStatus(200);

        $response-> assertJson([
            'success' => true,
            'message' => 'Planta creadaff correctamente',
        ]);

        $this->plantaModelMock->shouldHaveReceived('crearPlanta')->once();
}

}
