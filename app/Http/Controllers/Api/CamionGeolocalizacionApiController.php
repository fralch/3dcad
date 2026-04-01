<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Camion;
use App\Models\CamionGeolocalizacion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CamionGeolocalizacionApiController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'placa' => 'required|string|max:20|exists:camiones,placa',
            'latitud' => 'required|numeric|between:-90,90',
            'longitud' => 'required|numeric|between:-180,180',
            'timestamp' => 'required|date',
        ]);

        $camion = Camion::where('placa', $validated['placa'])->firstOrFail();

        $geolocalizacion = CamionGeolocalizacion::create([
            'camion_id' => $camion->id,
            'latitud' => $validated['latitud'],
            'longitud' => $validated['longitud'],
            'timestamp' => $validated['timestamp'],
        ]);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $geolocalizacion->id,
                'camion_id' => $camion->id,
                'placa' => $camion->placa,
                'latitud' => $geolocalizacion->latitud,
                'longitud' => $geolocalizacion->longitud,
                'timestamp' => $geolocalizacion->timestamp,
            ],
        ], 201);
    }
}
