<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Database;
use App\Models\Planta;
use Kreait\Firebase\Storage;
use Google\Cloud\Storage\StorageClient;
use App\Models\NombreComun;


class PlantaController extends Controller
{
    protected $plantaModel;
    protected $firebaseDatabase;
    protected $firebaseStorage;

    public function __construct(Planta $plantaModel, Database $firebaseDatabase, StorageClient $firebaseStorage)
    {
        $this->plantaModel = $plantaModel;
        $this->firebaseDatabase = $firebaseDatabase;
        $this->firebaseStorage = $firebaseStorage;
    }
    public function edit($id)
    {
        // Paso 1: Obtener los datos de la planta existente
        $planta = $this->plantaModel->find($id);

        if (!$planta) {
            return response()->json([
                'success' => false,
                'message' => 'Planta no encontrada.',
            ], 404);
        }

        // Paso 2: Pasar los datos al formulario de edición (puedes hacerlo en el frontend)
        return response()->json([
            'success' => true,
            'message' => 'Datos de la planta obtenidos correctamente.',
            'data' => $planta,
        ]);
    }
    public function store(Request $request)
    {
        $nombreCientifico = $request->nombreCientifico;
        $nombresComunes = $request->nombresComunes;
        $descripcion = $request->descripcion;
        $tipoPlanta = $request->tipoPlanta; // Nuevo campo agregado
        $imagenes = $request->file('imagenes');
    
        // No necesitas un array de objetos NombreComun
        
        $this->plantaModel->crearPlanta($nombreCientifico, $nombresComunes, $descripcion, $tipoPlanta, $imagenes);
    
        return response()->json([
            'success' => true,
            'message' => 'Planta creada correctamente.',
        ]);
    }

    public function update(Request $request, $id){
        $nombreCientifico = $request->nombreCientifico;
        $nombresComunes = $request->nombresComunes;
        $descripcion = $request->descripcion;
        $tipoPlanta = $request->tipoPlanta;
        $imagenes = $request->file('imagenes');
    
        $nombresComunesModels = [];
    
        foreach ($nombresComunes as $nombreComun) {
            $nombresComunesModels[] = new NombreComun(['nombre' => $nombreComun]);
        }
    
        $this->plantaModel->actualizarPlanta($id, $nombreCientifico, $nombresComunesModels, $descripcion,$tipoPlanta ,$imagenes);

        return response()->json([
            'success' => true,
            'message' => 'f nomas',
            'nombreCientifico' => $nombreCientifico,
            'nombresComunes' => $nombresComunes,
            'descripcion' => $descripcion,
            'tipoPlanta'=>$tipoPlanta,
            'imagenes' => $imagenes,
            //'planta' => $planta,
        ]);
    }

    public function destroy($id)
    {
        $reference = $this->plantaModel->eliminarPlanta($id);

        return response()->json([
            'success' => true,
            'message' => 'Planta eliminada correctamente',
            //'key' => $reference->getKey(),
            //'imagen_path' => $imagenPath,
        ]);
    }

    public function index()
    {
        $plantas = $this->plantaModel->listarPlantas();

        return response()->json([
            'success' => true,
            'message' => 'Plantas obtenidas correctamente',
            'data' => $plantas,
        ]);
    }

    public function show($id)
    {
        $planta = $this->plantaModel->mostrarPlanta($id);

        return response()->json([
            'success' => true,
            'message' => 'Planta obtenida correctamente',
            'data' => $planta,
        ]);
    }
}
