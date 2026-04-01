<?php

namespace Tests\Feature\Admin;

use App\Models\Camion;
use App\Models\User;
use Illuminate\Foundation\Http\Middleware\ValidateCsrfToken;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CamionManagementTest extends TestCase
{
    use RefreshDatabase;

    public function test_camiones_index_requires_authentication(): void
    {
        $response = $this->get(route('admin.camiones.index'));

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_create_camion(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('admin.camiones.store'), [
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

    public function test_authenticated_user_can_update_camion(): void
    {
        $this->withoutMiddleware(ValidateCsrfToken::class);
        $user = User::factory()->create();
        $camion = Camion::create([
            'placa' => 'DEF-456',
            'marca' => 'Scania',
            'modelo' => 'R500',
            'anio' => 2022,
            'estado' => 'activo',
        ]);

        $response = $this->actingAs($user)->put(route('admin.camiones.update', $camion), [
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
}
