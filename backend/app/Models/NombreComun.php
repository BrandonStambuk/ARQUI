<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NombreComun extends Model
{
    use HasFactory;
    protected $fillable = ['nombre'];

    public function planta()
    {
        return $this->belongsTo(Planta::class);
    }

    public function toArray()
    {
        return [
            'nombre' => $this->nombre,
        ];
    }
}
