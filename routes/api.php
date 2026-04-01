<?php

use App\Http\Controllers\Api\CamionApiController;
use App\Http\Controllers\Api\CamionGeolocalizacionApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('camiones')->group(function () {
    Route::get('placas', [CamionApiController::class, 'getPlacas']);
    Route::post('geolocalizaciones', [CamionGeolocalizacionApiController::class, 'store']);
});

Route::apiResource('camiones', CamionApiController::class)
    ->parameters(['camiones' => 'camion']);
