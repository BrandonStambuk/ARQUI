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
use Kreait\Firebase\Exception\DatabaseException;

class TipoPlanta extends Model
{
    use HasFactory;
    protected $database;
    protected $tablename;
    protected $storage;
    //protected $fillable = ['nombre'];

    public function __construct(Database $database, StorageClient $storage){
        $this->database = $database;
        $this->tablename = 'tipos_plantas';
        $this->storage = $storage;
    }

    public function plantas()
    {
        return $this->hasMany(Planta::class);
    }

    public function crearTipoPlanta($nombre, $imagen)
    {
        /*$this->database->getReference($this->tablename)->push([
            'nombre' => $nombre
        ]);*/

        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();

        $nombreImagen = $imagen->getClientOriginalName();

        $path = 'Images/' . $nombreImagen;

        $bucket->upload(
            file_get_contents($imagen->getPathName()),
            ['name' => $path]
        );

        $this->database->getReference($this->tablename)->push([
            'nombre' => $nombre,
            'imagen' => $path
        ]);

        return true;
    }

    public function obtenerTiposPlantas()
{
    $reference = $this->database->getReference($this->tablename);
    $tiposPlantas = $reference->getValue();

    $tiposPlantasArray = [];

    foreach ($tiposPlantas as $id => $tipoPlanta) {
        // Verifica si 'nombre' está definido en $tipoPlanta
        if (isset($tipoPlanta['nombre'])) {
            $nombre = $tipoPlanta['nombre'];
        } else {
            $nombre = 'Nombre no definido'; // o el valor que desees establecer en caso de que 'nombre' no esté definido
        }

        $tiposPlantasArray[] = [
            'id' => $id,
            'imagen' => $tipoPlanta['imagen'],
            'nombre' => $nombre
        ];
    }

    return $tiposPlantasArray;
}
    public function obtenerTipoPlanta($id)
    {
        $tipoPlanta = $this->database->getReference($this->tablename)->getChild($id)->getValue();
        return $tipoPlanta;
    }

    public function actualizarTipoPlanta($id, $nombre, $imagen)
    {
        $storage = app('firebase.storage');
        $bucket = $storage->getBucket();

        $nombreImagen = $imagen->getClientOriginalName();

        $path = 'Images/' . $nombreImagen;

        $bucket->upload(
            file_get_contents($imagen->getPathName()),
            ['name' => $path]
        );

        $this->database->getReference($this->tablename)->getChild($id)->update([
            'nombre' => $nombre,
            'imagen' => $path
        ]);

        return true;
    }

    public function eliminarTipoPlanta($id)
    {
        // Obtén la referencia al tipo de planta
        $tipoPlantaReference = $this->database->getReference($this->tablename . '/' . $id);
        $tipoPlanta = $tipoPlantaReference->getValue();
    
        // Verifica si el tipo de planta existe
        if (!$tipoPlanta) {
            return ['success' => false, 'message' => 'Tipo de planta no encontrado'];
        }
    
        // Obtén la referencia a las plantas
        $plantasReference = $this->database->getReference('plantas');
        $plantas = $plantasReference->getValue();
    
        // Elimina todas las plantas asociadas a este tipo
        foreach ($plantas as $plantaId => $planta) {
            if ($planta['tipo_planta_id'] == $id) {
                // Elimina la planta
                $plantasReference->getChild($plantaId)->remove();
            }
        }
    
        // Elimina el tipo de planta
        $tipoPlantaReference->remove();
    
        return ['success' => true, 'message' => 'Tipo de planta y plantas asociadas eliminadas'];
    }

    public function obtenerPlantasPorTipoPlanta($tipoPlantaId)
    {
        $plantas = $this->database->getReference('plantas')->getValue();

        $plantasArray = [];

        foreach ($plantas as $plantaId => $planta) {
            if ($planta['tipo_planta_id'] == $tipoPlantaId) {
                $plantasArray[] = [
                    'id' => $plantaId,
                    'nombreCientifico' => $planta['nombreCientifico'],
                    'nombresComunes' => $planta['nombresComunes'],
                    'descripcion' => $planta['descripcion'],
                    'imagenes' => $planta['imagenes'],
                ];
            }
        }

        return $plantasArray;
    }


    public function obtenerPlantasPorTipoPlantaPaginado($id, $pagina, $cantidad)
    {
        $plantas = $this->database->getReference($this->tablename)->getChild($id)->getChild('plantas')->getValue();
        $plantasPaginadas = array_slice($plantas, ($pagina - 1) * $cantidad, $cantidad);
        return $plantasPaginadas;
    }

}
