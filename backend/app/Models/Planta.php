<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Kreait\Firebase\Database;

use Google\Cloud\Storage\StorageClient;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

use Kreait\Laravel\Firebase\Facades\Firebase;

class Planta extends Model
{
    use HasFactory;
    protected $database;
    protected $tablename;
    protected $storage;

    public function __construct(Database $database, StorageClient $storage){
        $this->database = $database;
        $this->tablename = 'plantas';
        $this->storage = $storage;
    }

    public function crearPlanta($nombre, $descripcion, $imagenes)
    {
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();

        $referenciasImagenes = [];

        foreach ($imagenes as $imagen) {
            $nombreImagen = $imagen->getClientOriginalName();
            $path = 'Images/' . $nombreImagen;

            $bucket->upload(
                file_get_contents($imagen->getPathName()),
                ['name' => $path]
            );

            $referenciasImagenes[] = $path;
        }

        // Guardar los datos de la planta en Firestore
        $database = app('firebase.database');
        $reference = $database->getReference($this->tablename);

        $reference->push([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'imagenes' => $referenciasImagenes, // Guardamos las rutas de las imágenes en Firestore
        ]);

        return $reference;
    }

    public function actualizarPlanta($id, $nombre, $descripcion, $imagen) {
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();
    
        // Verificar si se proporciona una nueva imagen y si es válida
        if ($imagen && $imagen->isValid()) {
            $nombreImagen = $imagen->getClientOriginalName();
            $path = 'Images/' . $nombreImagen;
    
            $bucket->upload(
                file_get_contents($imagen->getPathName()),
                ['name' => $path]
            );
    
            // Agregar la información de la imagen solo si se proporciona una nueva imagen
            $plantaData['imagen'] = $path;
        }
    
        // Guardar los datos de la planta en Firestore
        $database = app('firebase.database');
        $reference = $database->getReference($this->tablename);
    
        $plantaData = [
            'nombre' => $nombre,
            'descripcion' => $descripcion,
        ];
    
        // Agregar la información de la imagen solo si se proporciona una nueva imagen
        /*if ($imagen) {
            $plantaData['imagen'] = $path;
        }*/
    
        $reference->getChild($id)->update($plantaData);
    
        return $reference;
    }
    

    public function eliminarPlanta($id){
        $database = app('firebase.database');
        $reference = $database->getReference($this->tablename);

        $reference->getChild($id)->remove();

        return $reference;
    }

    public function obtenerPlantas(){
        $database = app('firebase.database');
        $reference = $database->getReference($this->tablename);

        $plantas = $reference->getValue();

        return $plantas;
    }

}
