<?php

namespace App\Http\Controllers\Firebase;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Kreait\Firebase\Database;

class PlantaController extends Controller
{

    public function __construct(Database $database){
        $this->database = $database;
        $this->tablename = 'plantas';
    }

    public function index(){

    }

    public function store(Request $request){
        $postData = [
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,  
        ];
        $postRef = $this->database->getReference($this->tablename)->push($postData);
        if($postRef)
        {
            return response()->json([
                'success' => true,
                'message' => 'Planta insertada correctamente'
            ]);
        }
        else
        {
            return response()->json([
                'success' => false,
                'message' => 'Error al insertar la planta'
            ]);
        }
    }

    
}
