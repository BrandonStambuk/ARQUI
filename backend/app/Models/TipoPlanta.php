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

    public function crearTipoPlanta($nombre)
    {
        $this->database->getReference($this->tablename)->push([
            'nombre' => $nombre
        ]);
    }

    public function obtenerTiposPlantas()
    {
        $reference = $this->database->getReference($this->tablename);
        $tiposPlantas = $reference->getValue();

        $tiposPlantasArray = [];

        foreach ($tiposPlantas as $id => $tipoPlanta) {
            $tiposPlantasArray[] = [
                'id' => $id,
                'nombre' => $tipoPlanta['nombre']
            ];
        }

        return $tiposPlantasArray;
    }

    public function obtenerTipoPlanta($id)
    {
        $tipoPlanta = $this->database->getReference($this->tablename)->getChild($id)->getValue();
        return $tipoPlanta;
    }

    public function actualizarTipoPlanta($id, $nombre)
    {
        $this->database->getReference($this->tablename)->getChild($id)->update([
            'nombre' => $nombre
        ]);
    }

    public function eliminarTipoPlanta($id)
    {
        $this->database->getReference($this->tablename)->getChild($id)->remove();
    }

    public function obtenerPlantasPorTipoPlanta($id)
    {
        $plantas = $this->database->getReference($this->tablename)->getChild($id)->getChild('plantas')->getValue();
        return $plantas;
    }

    public function obtenerPlantasPorTipoPlantaPaginado($id, $pagina, $cantidad)
    {
        $plantas = $this->database->getReference($this->tablename)->getChild($id)->getChild('plantas')->getValue();
        $plantasPaginadas = array_slice($plantas, ($pagina - 1) * $cantidad, $cantidad);
        return $plantasPaginadas;
    }

}
