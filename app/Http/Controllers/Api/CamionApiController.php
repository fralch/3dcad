<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Camion;
use Illuminate\Http\JsonResponse;

class CamionApiController extends Controller
{
    /**
     * Obtener las placas de todos los camiones activos.
     *
     * @return JsonResponse
     */
    public function getPlacas(): JsonResponse
    {
        $placas = Camion::where('estado', 'activo')
            ->select('id', 'placa')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $placas
        ]);
    }
}
