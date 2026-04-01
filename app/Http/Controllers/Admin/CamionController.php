<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Camion;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CamionController extends Controller
{
    public function index()
    {
        $camiones = Camion::latest()->get();

        return Inertia::render('Admin/Camiones/Index', [
            'camiones' => $camiones,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Camiones/Form');
    }

    public function store(Request $request)
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

        Camion::create($validated);

        return redirect()->route('admin.camiones.index')
            ->with('success', 'Camión creado correctamente.');
    }

    public function edit(Camion $camion)
    {
        return Inertia::render('Admin/Camiones/Form', [
            'camion' => $camion,
        ]);
    }

    public function update(Request $request, Camion $camion)
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

        return redirect()->route('admin.camiones.index')
            ->with('success', 'Camión actualizado correctamente.');
    }

    public function destroy(Camion $camion)
    {
        $camion->delete();

        return redirect()->route('admin.camiones.index')
            ->with('success', 'Camión eliminado correctamente.');
    }
}
