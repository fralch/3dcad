<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CamionGeolocalizacion extends Model
{
    use HasFactory;

    protected $table = 'camion_geolocalizaciones';

    protected $fillable = [
        'camion_id',
        'latitud',
        'longitud',
        'timestamp',
    ];

    protected function casts(): array
    {
        return [
            'latitud' => 'float',
            'longitud' => 'float',
            'timestamp' => 'datetime',
        ];
    }

    public function camion(): BelongsTo
    {
        return $this->belongsTo(Camion::class);
    }
}
