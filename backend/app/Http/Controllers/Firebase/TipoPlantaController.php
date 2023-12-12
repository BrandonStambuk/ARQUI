<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Database;
use App\Models\TipoPlanta;
use Kreait\Firebase\Storage;
use Google\Cloud\Storage\StorageClient;
use App\Models\Planta;


class TipoPlantaController extends Controller
{
    protected $tipoPlantaModel;
    protected $firebaseDatabase;
    protected $firebaseStorage;

    public function __construct(TipoPlanta $tipoPlantaModel, Database $firebaseDatabase, StorageClient $firebaseStorage)
    {
        $this->tipoPlantaModel = $tipoPlantaModel;
        $this->firebaseDatabase = $firebaseDatabase;
        $this->firebaseStorage = $firebaseStorage;
    }

    public function index()
    {
        $tiposPlantas = $this->tipoPlantaModel->obtenerTiposPlantas();

        return response()->json([
            'success' => true,
            'message' => 'Tipos de plantas obtenidos correctamente.',
            'data' => $tiposPlantas,
        ]);
    }

    public function edit($id)
    {
        // Paso 1: Obtener los datos del tipo de planta existente
        $tipoPlanta = $this->tipoPlantaModel->find($id);

        if (!$tipoPlanta) {
            return response()->json([
                'success' => false,
                'message' => 'Tipo de planta no encontrado.',
            ], 404);
        }

        // Paso 2: Pasar los datos al formulario de edición (puedes hacerlo en el frontend)
        return response()->json([
            'success' => true,
            'message' => 'Datos del tipo de planta obtenidos correctamente.',
            'data' => $tipoPlanta,
        ]);
    }

    public function store(Request $request)
    {
        $nombre = $request->nombre;
        $imagen = $request->file('imagen');

        $this->tipoPlantaModel->crearTipoPlanta($nombre, $imagen);

        return response()->json([
            'success' => true,
            'message' => 'Tipo de planta creado correctamente.',
        ]);
    }

    public function update(Request $request, $id)
    {
        $nombre = $request->nombre;
        $imagen = $request->file('imagenes');

        $this->tipoPlantaModel->actualizarTipoPlanta($id, $nombre, $imagen);

        return response()->json([
            'success' => true,
            'message' => 'Tipo de planta actualizado correctamente.',
        ]);
    }

    public function destroy($id)
    {
        $respuesta = $this->tipoPlantaModel->eliminarTipoPlanta($id);

        return response()->json([
            'success' => true,
            'message' => 'Tipo de planta eliminado correctamente.',
            'data' => $respuesta,
        ]);
    }

    public function plantas($id)
    {
        
        $plantas = $this->tipoPlantaModel->obtenerPlantasPorTipoPlanta($id);

        return response()->json([
            'success' => true,
            'message' => 'Plantas obtenidas correctamente.',
            'data' => $plantas,
        ]);
    }

    public function plantasPaginado($id, $pagina, $cantidad)
    {
        $plantas = $this->tipoPlantaModel->obtenerPlantasPorTipoPlantaPaginado($id, $pagina, $cantidad);

        return response()->json([
            'success' => true,
            'message' => 'Plantas obtenidas correctamente.',
            'data' => $plantas,
        ]);
    }
}
