<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Camion extends Model
{
    use HasFactory;

    protected $table = 'camiones';

    protected $fillable = [
        'placa',
        'marca',
        'modelo',
        'anio',
        'capacidad_carga',
        'estado',
        'conductor_asignado',
        'observaciones',
    ];

    protected function casts(): array
    {
        return [
            'anio' => 'integer',
            'capacidad_carga' => 'decimal:2',
        ];
    }

    public function geolocalizaciones(): HasMany
    {
        return $this->hasMany(CamionGeolocalizacion::class);
    }
}
