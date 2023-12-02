<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Database;
use App\Models\Planta;


class PlantaController extends Controller
{
    protected $plantaModel;

    public function __construct(Planta $plantaModel){
        $this->plantaModel = $plantaModel;
    }

    public function store(Request $request)
    {

        $nombre = $request->nombre;
        $descripcion = $request->descripcion;
        $imagen = $request->file('imagen');

        $reference = $this->plantaModel->crearPlanta($nombre, $descripcion, $imagen);

        return response()->json([
            'success' => true,
            'message' => 'Planta creada correctamente',
            //'key' => $reference->getKey(),
            //'imagen_path' => $imagenPath,
        ]);
    }

    public function update(Request $request, $id)
    {
        $nombre = $request->nombre;
        $descripcion = $request->descripcion;
        $imagen = $request->file('imagen');

        $reference = $this->plantaModel->actualizarPlanta($id, $nombre, $descripcion, $imagen);

        return response()->json([
            'success' => true,
            'message' => 'Planta actualizada correctamente',
            //'key' => $reference->getKey(),
            //'imagen_path' => $imagenPath,
        ]);
    }
}
