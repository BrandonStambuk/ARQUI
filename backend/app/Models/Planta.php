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
    //protected $fillable = ['nombre', 'descripcion'];

    public function __construct(Database $database, StorageClient $storage){
        $this->database = $database;
        $this->tablename = 'plantas';
        $this->storage = $storage;
    }

    public function nombresComunes()
    {
        return $this->hasMany(NombreComun::class);
    }

    public function tipoPlanta()
    {
        return $this->belongsTo(TipoPlanta::class);
    }

    public function crearPlanta($nombreCientifico, $nombresComunes, $descripcion, $tipoPlantaId, $imagenes)
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
    
        $plantaReference = $reference->push([
            'nombreCientifico' => $nombreCientifico,
            'nombresComunes' => $nombresComunes,
            'descripcion' => $descripcion,
            'tipo_planta_id' => $tipoPlantaId,
            'imagenes' => $referenciasImagenes, // Guardamos las rutas de las imágenes en Firestore
        ]);
    
        return $plantaReference;
    }

    public function actualizarPlanta($id, $nombreCientifico, $nombresComunes, $descripcion, $tipoPlantaId, $imagenes)
    {
        // Obtener la referencia de la planta en Firestore
        $reference = $this->database->getReference($this->tablename . '/' . $id);
        $planta = $reference->getValue();

        // Obtener el nombre del bucket del objeto StorageClient
        $storage = app('firebase.storage');
        $bucketName = $storage->getBucket();

        // Inicializar $referenciasImagenes con un array vacío
        $referenciasImagenes = [];

        // Eliminar las imágenes antiguas en el almacenamiento
        if ($imagenes != null) {
            // Verificar si la variable $planta['imagenes'] está definida
            if (isset($planta['imagenes'])) {
                foreach ($planta['imagenes'] as $imagen) {
                    $object = $bucketName->object($imagen);

                    if ($object->exists()) {
                        $object->delete();
                    }
                }
            }

            // Subir y obtener las referencias de las nuevas imágenes
            foreach ($imagenes as $imagen) {
                $nombreImagen = $imagen->getClientOriginalName();
                $path = 'Images/' . $nombreImagen;

                $bucketName->upload(
                    file_get_contents($imagen->getPathName()),
                    ['name' => $path]
                );

                $referenciasImagenes[] = $path;
            }
        } else {
            // Si no hay imágenes nuevas, mantener las referencias existentes
            $referenciasImagenes = $planta['imagenes'] ?? [];
        }

        // Actualizar los datos de la planta en Firestore
        $reference->update([
            'nombreCientifico' => $nombreCientifico,
            'nombresComunes' => $nombresComunes,
            'descripcion' => $descripcion,
            'tipo_planta_id' => $tipoPlantaId,
            'imagenes' => $referenciasImagenes,
        ]);

        // Devolver la referencia de la planta actualizada
        return $reference;
    }



    public function eliminarPlanta($id)
    {
        $reference = $this->database->getReference($this->tablename . '/' . $id);

        $reference->remove();

        return true;
    }

    public function listarPlantas()
    {
        $reference = $this->database->getReference($this->tablename);
        $plantas = $reference->getValue();

        $plantasArray = [];

        // Obtén la referencia a la tabla de tipos de planta
        $tiposPlantaReference = $this->database->getReference('tipos_plantas');
        $tiposPlanta = $tiposPlantaReference->getValue();

        foreach ($plantas as $id => $planta) {
            // Busca el tipo de planta por ID
            $tipoPlanta = $tiposPlanta[$planta['tipo_planta_id']];

            // Agrega el nombre del tipo de planta al array
            $plantasArray[] = [
                'id' => $id,
                'nombreCientifico' => $planta['nombreCientifico'],
                'nombresComunes' => $planta['nombresComunes'],
                'descripcion' => $planta['descripcion'],
                'tipo_planta_id' => $tipoPlanta['nombre'],
                'imagenes' => $planta['imagenes'],
            ];
        }

        return $plantasArray;
    }


    public function mostrarPlanta($id)
    {
        $reference = $this->database->getReference($this->tablename . '/' . $id);
        $planta = $reference->getValue();

        if (!$planta) {
            return null;
        }

        // Obtén la referencia a la tabla de tipos de planta
        $tiposPlantaReference = $this->database->getReference('tipos_plantas');
        $tiposPlanta = $tiposPlantaReference->getValue();

        // Busca el tipo de planta por ID
        $tipoPlanta = $tiposPlanta[$planta['tipo_planta_id']] ?? null;

        $plantaArray = [
            'id' => $id,
            'nombreCientifico' => $planta['nombreCientifico'],
            'nombresComunes' => $planta['nombresComunes'],
            'descripcion' => $planta['descripcion'],
            //'tipoPlanta' => $tipoPlanta ? $tipoPlanta['nombre'] : null,
            'tipoPlanta' => $planta['tipo_planta_id'],
            'imagenes' => $planta['imagenes'],
        ];

        return $plantaArray;
    }

        

}
