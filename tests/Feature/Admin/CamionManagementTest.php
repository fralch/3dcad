<?php

namespace Tests\Feature\Admin;

use App\Models\Camion;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CamionManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_camiones_index_requires_pin_access(): void
    {
        $response = $this->get(route('admin.camiones.index'));

        $response->assertRedirect(route('admin.camiones.access'));
    }

    public function test_camiones_ubicaciones_requires_pin_access(): void
    {
        $response = $this->get(route('admin.camiones.ubicaciones'));

        $response->assertRedirect(route('admin.camiones.access'));
    }

    public function test_can_unlock_camiones_access_with_valid_pin(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);

        $response = $this->post(route('admin.camiones.access.store'), [
            'pin' => '1234',
        ]);

        $response->assertRedirect(route('admin.camiones.index'));
        $response->assertSessionHas('camiones_access_granted', true);
    }

    public function test_pin_access_can_create_camion_without_authentication(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);
        $this->withSession(['camiones_access_granted' => true]);

        $response = $this->post(route('admin.camiones.store'), [
            'placa' => 'ABC-123',
            'marca' => 'Volvo',
            'modelo' => 'FH16',
            'anio' => 2024,
            'capacidad_carga' => 20.50,
            'estado' => 'activo',
            'conductor_asignado' => 'Juan Perez',
            'observaciones' => 'Unidad nueva',
        ]);

        $response->assertRedirect(route('admin.camiones.index'));
        $this->assertDatabaseHas('camiones', [
            'placa' => 'ABC-123',
            'marca' => 'Volvo',
            'modelo' => 'FH16',
            'estado' => 'activo',
        ]);
    }

    public function test_pin_access_can_update_camion_without_authentication(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);
        $this->withSession(['camiones_access_granted' => true]);
        $camion = Camion::create([
            'placa' => 'DEF-456',
            'marca' => 'Scania',
            'modelo' => 'R500',
            'anio' => 2022,
            'estado' => 'activo',
        ]);

        $response = $this->put(route('admin.camiones.update', $camion), [
            'placa' => 'DEF-456',
            'marca' => 'Scania',
            'modelo' => 'R560',
            'anio' => 2023,
            'capacidad_carga' => 18,
            'estado' => 'mantenimiento',
            'conductor_asignado' => 'Pedro Alvarez',
            'observaciones' => 'En taller',
        ]);

        $response->assertRedirect(route('admin.camiones.index'));
        $this->assertDatabaseHas('camiones', [
            'id' => $camion->id,
            'modelo' => 'R560',
            'estado' => 'mantenimiento',
        ]);
    }

    public function test_pin_access_can_view_camiones_ubicaciones(): void
    {
        $camion = Camion::create([
            'placa' => 'UBI-123',
            'marca' => 'Volvo',
            'modelo' => 'FH16',
            'anio' => 2024,
            'estado' => 'activo',
        ]);

        $camion->geolocalizaciones()->create([
            'latitud' => -12.0464,
            'longitud' => -77.0428,
            'timestamp' => now(),
        ]);

        $response = $this->withSession(['camiones_access_granted' => true])
            ->get(route('admin.camiones.ubicaciones'));

        $response->assertOk();
        $response->assertSee('Admin/Camiones/Ubicaciones');
        $response->assertSee('UBI-123');
    }

    public function test_pin_access_can_generate_daily_route_for_a_camion(): void
    {
        $camion = Camion::create([
            'placa' => 'RTA-456',
            'marca' => 'Scania',
            'modelo' => 'R560',
            'anio' => 2025,
            'estado' => 'activo',
        ]);

        $camion->geolocalizaciones()->createMany([
            [
                'latitud' => -12.0464,
                'longitud' => -77.0428,
                'timestamp' => '2026-03-28 08:00:00',
            ],
            [
                'latitud' => -12.0564,
                'longitud' => -77.0328,
                'timestamp' => '2026-03-28 09:00:00',
            ],
            [
                'latitud' => -12.0664,
                'longitud' => -77.0228,
                'timestamp' => '2026-03-28 10:00:00',
            ],
        ]);

        $response = $this->withSession(['camiones_access_granted' => true])
            ->get(route('admin.camiones.ubicaciones', [
                'camion_id' => $camion->id,
                'fecha' => '2026-03-28',
            ]));

        $response->assertOk();
        $response->assertSee('RTA-456');
        $response->assertSee('google_maps_url');
        $response->assertSee('google.com\\/maps\\/dir');
    }

    public function test_public_api_can_get_placas(): void
    {
        Camion::create([
            'placa' => 'PLA-001',
            'marca' => 'Test',
            'modelo' => 'X1',
            'anio' => 2020,
            'estado' => 'activo',
        ]);

        Camion::create([
            'placa' => 'PLA-002',
            'marca' => 'Test',
            'modelo' => 'X2',
            'anio' => 2020,
            'estado' => 'mantenimiento',
        ]);

        $response = $this->get('/api/camiones/placas');

        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
        $response->assertJsonPath('data.0.placa', 'PLA-001');
    }

    public function test_public_api_can_get_paginated_placas_for_autocomplete(): void
    {
        Camion::create([
            'placa' => 'AAA-001',
            'marca' => 'Test',
            'modelo' => 'A',
            'anio' => 2020,
            'estado' => 'activo',
        ]);

        Camion::create([
            'placa' => 'AAA-002',
            'marca' => 'Test',
            'modelo' => 'B',
            'anio' => 2020,
            'estado' => 'mantenimiento',
        ]);

        Camion::create([
            'placa' => 'BBB-001',
            'marca' => 'Test',
            'modelo' => 'C',
            'anio' => 2020,
            'estado' => 'inactivo',
        ]);

        $response = $this->getJson('/api/camiones/placas/paginado?per_page=2');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonCount(2, 'data');
        $response->assertJsonPath('pagination.current_page', 1);
        $response->assertJsonPath('pagination.per_page', 2);
        $response->assertJsonPath('pagination.total', 3);
        $response->assertJsonPath('pagination.has_more_pages', true);
    }

    public function test_public_api_can_filter_paginated_placas_for_autocomplete(): void
    {
        Camion::create([
            'placa' => 'ABC-123',
            'marca' => 'Test',
            'modelo' => 'A',
            'anio' => 2020,
            'estado' => 'activo',
        ]);

        Camion::create([
            'placa' => 'ABD-123',
            'marca' => 'Test',
            'modelo' => 'B',
            'anio' => 2020,
            'estado' => 'activo',
        ]);

        Camion::create([
            'placa' => 'XYZ-999',
            'marca' => 'Test',
            'modelo' => 'C',
            'anio' => 2020,
            'estado' => 'activo',
        ]);

        $response = $this->getJson('/api/camiones/placas/paginado?q=AB&per_page=10');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonCount(2, 'data');
        $response->assertJsonPath('pagination.total', 2);
    }

    public function test_public_api_can_list_camiones_without_authentication(): void
    {
        Camion::create([
            'placa' => 'LST-001',
            'marca' => 'Iveco',
            'modelo' => 'T-Way',
            'anio' => 2022,
            'estado' => 'activo',
        ]);

        $response = $this->getJson('/api/camiones');

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonCount(1, 'data');
    }

    public function test_public_api_can_create_camion_without_authentication(): void
    {
        $response = $this->postJson('/api/camiones', [
            'placa' => 'API-900',
            'marca' => 'Volvo',
            'modelo' => 'FH',
            'anio' => 2024,
            'capacidad_carga' => 19.5,
            'estado' => 'activo',
            'conductor_asignado' => 'Libre',
            'observaciones' => 'Alta pública',
        ]);

        $response->assertStatus(201);
        $response->assertJsonPath('success', true);
        $response->assertJsonPath('data.placa', 'API-900');
        $this->assertDatabaseHas('camiones', [
            'placa' => 'API-900',
            'modelo' => 'FH',
        ]);
    }

    public function test_public_api_can_update_camion_without_authentication(): void
    {
        $camion = Camion::create([
            'placa' => 'API-901',
            'marca' => 'Scania',
            'modelo' => 'R450',
            'anio' => 2021,
            'estado' => 'activo',
        ]);

        $response = $this->putJson("/api/camiones/{$camion->id}", [
            'placa' => 'API-901',
            'marca' => 'Scania',
            'modelo' => 'R560',
            'anio' => 2023,
            'capacidad_carga' => 20,
            'estado' => 'mantenimiento',
            'conductor_asignado' => 'API Driver',
            'observaciones' => 'Cambio público',
        ]);

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $response->assertJsonPath('data.modelo', 'R560');
        $this->assertDatabaseHas('camiones', [
            'id' => $camion->id,
            'modelo' => 'R560',
            'estado' => 'mantenimiento',
        ]);
    }

    public function test_public_api_can_delete_camion_without_authentication(): void
    {
        $camion = Camion::create([
            'placa' => 'API-902',
            'marca' => 'MAN',
            'modelo' => 'TGX',
            'anio' => 2020,
            'estado' => 'inactivo',
        ]);

        $response = $this->deleteJson("/api/camiones/{$camion->id}");

        $response->assertOk();
        $response->assertJsonPath('success', true);
        $this->assertDatabaseMissing('camiones', [
            'id' => $camion->id,
        ]);
    }

    public function test_public_api_can_register_camion_geolocalizacion_without_authentication(): void
    {
        Camion::create([
            'placa' => 'ABC-123',
            'marca' => 'Volvo',
            'modelo' => 'FH16',
            'anio' => 2024,
            'estado' => 'activo',
        ]);

        $response = $this->postJson('/api/camiones/geolocalizaciones', [
            'placa' => 'ABC-123',
            'latitud' => -12.0464,
            'longitud' => -77.0428,
            'timestamp' => '2026-03-28T10:30:00',
        ]);

        $response->assertStatus(201);
        $response->assertJsonPath('success', true);
        $response->assertJsonPath('data.placa', 'ABC-123');
        $this->assertDatabaseHas('camion_geolocalizaciones', [
            'latitud' => -12.0464,
            'longitud' => -77.0428,
        ]);
    }

    public function test_public_api_geolocalizacion_requires_existing_placa(): void
    {
        $response = $this->postJson('/api/camiones/geolocalizaciones', [
            'placa' => 'NO-EXISTE',
            'latitud' => -12.0464,
            'longitud' => -77.0428,
            'timestamp' => '2026-03-28T10:30:00',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['placa']);
    }
}
