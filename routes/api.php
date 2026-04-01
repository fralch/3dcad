<?php

use App\Http\Controllers\Api\CamionApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('camiones')->group(function () {
    Route::get('placas', [CamionApiController::class, 'getPlacas']);
});

Route::apiResource('camiones', CamionApiController::class)
    ->parameters(['camiones' => 'camion']);
