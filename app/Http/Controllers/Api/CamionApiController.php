<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Camion;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CamionApiController extends Controller
{
    public function index(): JsonResponse
    {
        $camiones = Camion::latest()->get();

        return response()->json([
            'success' => true,
            'data' => $camiones,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'placa' => 'required|string|max:20|unique:camiones,placa',
            'marca' => 'required|string|max:120',
            'modelo' => 'required|string|max:120',
            'anio' => 'required|integer|min:1980|max:2100',
            'capacidad_carga' => 'nullable|numeric|min:0',
            'estado' => ['required', Rule::in(['activo', 'mantenimiento', 'inactivo'])],
            'conductor_asignado' => 'nullable|string|max:120',
            'observaciones' => 'nullable|string|max:5000',
        ]);

        $camion = Camion::create($validated);

        return response()->json([
            'success' => true,
            'data' => $camion,
        ], 201);
    }

    public function show(Camion $camion): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $camion,
        ]);
    }

    public function update(Request $request, Camion $camion): JsonResponse
    {
        $validated = $request->validate([
            'placa' => ['required', 'string', 'max:20', Rule::unique('camiones')->ignore($camion->id)],
            'marca' => 'required|string|max:120',
            'modelo' => 'required|string|max:120',
            'anio' => 'required|integer|min:1980|max:2100',
            'capacidad_carga' => 'nullable|numeric|min:0',
            'estado' => ['required', Rule::in(['activo', 'mantenimiento', 'inactivo'])],
            'conductor_asignado' => 'nullable|string|max:120',
            'observaciones' => 'nullable|string|max:5000',
        ]);

        $camion->update($validated);

        return response()->json([
            'success' => true,
            'data' => $camion->fresh(),
        ]);
    }

    public function destroy(Camion $camion): JsonResponse
    {
        $camion->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function getPlacas(): JsonResponse
    {
        $placas = Camion::where('estado', 'activo')
            ->select('id', 'placa')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $placas,
        ]);
    }
}
