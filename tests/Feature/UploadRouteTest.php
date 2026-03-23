<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UploadRouteTest extends TestCase
{
    use RefreshDatabase;

    public function test_upload_route_requires_authentication(): void
    {
        $response = $this->get('/upload');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_users_are_redirected_to_dashboard_from_upload_route(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/upload');

        $response->assertRedirect(route('admin.dashboard'));
    }
}
