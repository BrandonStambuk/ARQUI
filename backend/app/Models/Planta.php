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

    public function crearPlanta($nombre, $descripcion, $imagen){
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();

        $nombreImagen = $imagen->getClientOriginalName();
        $path = 'Images/' . $nombreImagen;

        $bucket->upload(
            file_get_contents($imagen->getPathName()),
            ['name' => $path]
        );

        // Guardar los datos de la planta en Firestore
        $database = app('firebase.database');
        $reference = $database->getReference($this->tablename);

        $reference->push([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'imagen' => $path, // Guardamos la ruta de la imagen en Firestore
        ]);

        return $reference;
    }


}
