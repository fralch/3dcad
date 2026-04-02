<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Camion;
use App\Models\CamionGeolocalizacion;
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

    public function ubicaciones(Request $request)
    {
        $validated = $request->validate([
            'camion_id' => 'nullable|integer|exists:camiones,id',
            'fecha' => 'nullable|date',
        ]);

        $camionId = $validated['camion_id'] ?? null;
        $fecha = $validated['fecha'] ?? null;

        $geolocalizaciones = CamionGeolocalizacion::query()
            ->with('camion:id,placa,marca,modelo,estado')
            ->when($camionId, fn ($query) => $query->where('camion_id', $camionId))
            ->when($fecha, fn ($query) => $query->whereDate('timestamp', $fecha))
            ->orderByDesc('timestamp')
            ->paginate(25)
            ->withQueryString()
            ->through(function (CamionGeolocalizacion $geolocalizacion) {
                return [
                    'id' => $geolocalizacion->id,
                    'camion_id' => $geolocalizacion->camion_id,
                    'placa' => $geolocalizacion->camion?->placa,
                    'marca' => $geolocalizacion->camion?->marca,
                    'modelo' => $geolocalizacion->camion?->modelo,
                    'estado' => $geolocalizacion->camion?->estado,
                    'latitud' => $geolocalizacion->latitud,
                    'longitud' => $geolocalizacion->longitud,
                    'timestamp' => $geolocalizacion->timestamp?->toIso8601String(),
                    'maps_url' => "https://www.google.com/maps?q={$geolocalizacion->latitud},{$geolocalizacion->longitud}",
                ];
            });

        $camiones = Camion::query()
            ->orderBy('placa')
            ->get(['id', 'placa', 'marca', 'modelo']);

        $ruta = null;

        if ($camionId && $fecha) {
            $puntosRuta = CamionGeolocalizacion::query()
                ->where('camion_id', $camionId)
                ->whereDate('timestamp', $fecha)
                ->orderBy('timestamp')
                ->get(['id', 'latitud', 'longitud', 'timestamp']);

            $googleMapsRouteUrl = null;

            if ($puntosRuta->count() >= 2) {
                $origen = "{$puntosRuta->first()->latitud},{$puntosRuta->first()->longitud}";
                $destino = "{$puntosRuta->last()->latitud},{$puntosRuta->last()->longitud}";
                $waypoints = $puntosRuta->slice(1, max(0, $puntosRuta->count() - 2))
                    ->take(23)
                    ->map(fn (CamionGeolocalizacion $point) => "{$point->latitud},{$point->longitud}")
                    ->implode('|');

                $googleMapsRouteUrl = 'https://www.google.com/maps/dir/?api=1'
                    .'&origin='.urlencode($origen)
                    .'&destination='.urlencode($destino)
                    .'&travelmode=driving'
                    .($waypoints ? '&waypoints='.urlencode($waypoints) : '');
            }

            $ruta = [
                'point_count' => $puntosRuta->count(),
                'google_maps_url' => $googleMapsRouteUrl,
                'points' => $puntosRuta->map(fn (CamionGeolocalizacion $point) => [
                    'id' => $point->id,
                    'latitud' => $point->latitud,
                    'longitud' => $point->longitud,
                    'timestamp' => $point->timestamp?->toIso8601String(),
                ]),
            ];
        }

        return Inertia::render('Admin/Camiones/Ubicaciones', [
            'geolocalizaciones' => $geolocalizaciones,
            'camiones' => $camiones,
            'filters' => [
                'camion_id' => $camionId,
                'fecha' => $fecha,
            ],
            'ruta' => $ruta,
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
