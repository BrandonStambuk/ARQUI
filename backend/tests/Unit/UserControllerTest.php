<?php

namespace Tests\Unit;

//use PHPUnit\Framework\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;
use App\Models\User;
use Kreait\Firebase\Database;
use Mockery;

class UserControllerTest extends TestCase
{
    protected $userModelMock;

    public function setUp(): void
    {
        parent::setUp();

        $this->userModelMock = Mockery::mock(User::class);
        $this->app->instance(User::class, $this->userModelMock);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        Mockery::close();
    }

    public function testStoreUser()
    {
        $this->userModelMock
            ->shouldReceive('storeUser')
            ->once()
            ->andReturn((object)[]); 

        $user = [
            'nombre' => 'Oliver',
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ];

        $response = $this->postJson('/api/storeUser', $user);

        $response->assertStatus(200);

        $response->assertJson([
            'success' => true,
            'message' => 'Usuario almacenado correctamente',
        ]);

        $this->userModelMock->shouldHaveReceived('storeUser')->once()->with($user);
    }

    public function testUpdateUser()
    {
        $usuarioInsertado = $this->userModelMock
            ->shouldReceive('storeUser')
            ->once()
            ->andReturn((object)[]) 
            ->getMock();

        $user = [
            'nombre' => 'Oliver',
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ];
        
        $response = $this->postJson('/api/storeUser', $user);

        $response->assertStatus(200);

        $usuarioId = $usuarioInsertado->id; 

        $responseUpdate = $this->putJson("/api/actualizarPlanta/{$usuarioId}", [
            'nombre' => 'Brandon',
            'email' => 'brandon@gmail.com',
            'password' => '12345678',
        ]);

        $responseUpdate->assertStatus(200);

        $responseUpdate->assertJson([
            'success' => true,
            'message' => 'Usuario actualizado correctamente',
        ]);

        $this->userModelMock->shouldHaveReceived('updateUser')->once();
    }


    public function testDeleteUser()
    {
        $usuarioInsertado = $this->userModelMock
            ->shouldReceive('storeUser')
            ->once()
            ->andReturn((object)[]) 
            ->getMock();

        $user = [
            'nombre' => 'Oliver',
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ];


        $response = $this->postJson('/api/storeUser', $user);

        $response->assertStatus(200);

        $usuarioId = $usuarioInsertado->id;  

        $responseDelete = $this->delete("/api/eliminarUser/{$usuarioId}");

        $responseDelete->assertStatus(200);

        $responseDelete->assertJson([
            'success' => true,
            'message' => 'Usuario eliminado correctamente',
        ]);

        $this->plantaModelMock->shouldHaveReceived('deleteUser')->once();
    }


    public function testGetPlanta()
    {
        $usuarioInsertado = $this->userModelMock
            ->shouldReceive('storeUser')
            ->once()
            ->andReturn((object)[]) 
            ->getMock();

        $user = [
            'nombre' => 'Oliver',
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ];
        
        $response = $this->postJson('/api/storeUser', $user);

        $response->assertStatus(200);

        $usuarioId = $usuarioInsertado->id; 

        $responseGet = $this->get("/api/getUser/{$usuarioId}");

        $responseGet->assertStatus(200);

        $responseGet->assertJson([
            'success' => true,
            'data' => [ 
                'id' => $usuarioId,
                'nombre' => 'Oliver',
                'email' => 'oliver@gmail.com',
                'password' => '12345678',
            ],
        ]);

        $this->userModelMock->shouldHaveReceived('getUser')->once();
    }


    public function testLoginUser()
    {
        $usuarioInsertado = $this->userModelMock
            ->shouldReceive('storeUser')
            ->once()
            ->andReturn((object)[]) 
            ->getMock();

        $user = [
            'nombre' => 'Oliver',
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ];

        $response = $this->postJson('/api/storeUser', $user);

        $response->assertStatus(200);

        $usuarioId = $usuarioInsertado->id; 

        $responseLogin = $this->postJson('/api/loginUser', [
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ]);

        $responseLogin->assertStatus(200);

        $responseLogin->assertJson([
            'success' => true,
            'message' => 'Usuario autenticado correctamente',
            'token' => 'token_simulado', 
        ]);

        $this->userModelMock->shouldHaveReceived('loginUser')->once()->with([
            'email' => 'oliver@gmail.com',
            'password' => '12345678',
        ]);
    }

}
