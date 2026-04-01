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
}
