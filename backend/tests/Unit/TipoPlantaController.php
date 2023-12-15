<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\TipoPlanta;
use Kreait\Firebase\Database;
use Mockery;

class TipoPlantaController extends TestCase
{
    protected $tipoPlantaModel;

    public function setUp(): void
    {
        parent::setUp();
        $this->tipoPlantaModel = Mockery::mock(TipoPlanta::class);
        $this->app->instance(TipoPlanta::class, $this->tipoPlantaModel);
    }

    public function tearDown(): void
    {
        Mockery::close();
        parent::tearDown();
    }

    public function testStore()
    {
        $this->tipoPlantaModel
            ->shouldReceive('crearTipoPlanta')
            ->once()
            ->andReturn((object)[]);

        Storage::fake('firebase');
        $imagen = UploadedFile::fake()->image('imagenHelp.webp');

        $response = $this->postJson('/api/insertarTipoPlanta', [
            'tipoPlanta' => 'tipoPlanta1',
            'imagen' => $imagen,
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Tipo de planta creado correctamente.',
        ]);

        $this->tipoPlantaModel->shouldHaveReceived('crearTipoPlanta')->once();
    }

    public function testUpdate()
    {
        $this->tipoPlantaModel
            ->shouldReceive('actualizarTipoPlanta')
            ->once()
            ->andReturn((object)[]);

        $response = $this->putJson('/api/actualizarTipoPlanta/1', [
            'tipoPlanta' => 'tipoPlanta1',
            'imagen' => 'imagenHelp.webp',
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Tipo de planta actualizado correctamente.',
        ]);

        $this->tipoPlantaModel->shouldHaveReceived('actualizarTipoPlanta')->once();
    }

    public function testDestroy()
    {
        $this->tipoPlantaModel
            ->shouldReceive('eliminarTipoPlanta')
            ->once()
            ->andReturn((object)[]);

        $response = $this->deleteJson('/api/eliminarTipoPlanta/1');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Tipo de planta eliminado correctamente.',
        ]);

        $this->tipoPlantaModel->shouldHaveReceived('eliminarTipoPlanta')->once();
    }

    public function testShow()
    {
        $this->tipoPlantaModel
            ->shouldReceive('obtenerPlantasPorTipoPlanta')
            ->once()
            ->andReturn((object)[]);

        $response = $this->getJson('/api/obtenerTipoPlanta/1');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Plantas obtenidas correctamente.',
        ]);

        $this->tipoPlantaModel->shouldHaveReceived('obtenerPlantasPorTipoPlanta')->once();
    }

    public function testIndex()
    {
        $this->tipoPlantaModel
            ->shouldReceive('obtenerTiposPlantas')
            ->once()
            ->andReturn((object)[]);

        $response = $this->getJson('/api/obtenerTiposPlantas');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Tipos de plantas obtenidos correctamente.',
        ]);

        $this->tipoPlantaModel->shouldHaveReceived('obtenerTiposPlantas')->once();
    }


    public function testValidationOnCreateTipoPlanta()
    {
        $response = $this->postJson('/api/insertarTipoPlanta', [
            // No proporcionar el nombre y la imagen para provocar un error de validación
        ]);

        $response->assertStatus(500); // Verifica que se reciba un código de error de validación
        //$response->assertJsonValidationErrors(['tipoPlanta', 'imagen']);
    }

    public function testUpdateNonExistingTipoPlanta()
    {
        $this->tipoPlantaModel
            ->shouldReceive('actualizarTipoPlanta')
            ->once()
            ->andReturn(null); // Simula que el tipo de planta no existe

        $response = $this->putJson('/api/actualizarTipoPlanta/1', [
            'tipoPlanta' => 'tipoPlanta1',
        ]);

        $response->assertStatus(404); // Verifica que se reciba un código de error de recurso no encontrado
        $response->assertJson([
            'success' => false,
            'message' => 'Tipo de planta no encontrado.',
        ]);
    }
}
