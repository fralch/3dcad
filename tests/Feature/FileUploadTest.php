<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\File;
use App\Models\Subcategory;
use App\Models\Type;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class FileUploadTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;
    protected Type $type;
    protected Category $category;
    protected Subcategory $subcategory;

    protected function setUp(): void
    {
        parent::setUp();

        // Create test user
        $this->user = User::factory()->create();

        // Create test data
        $this->type = Type::create([
            'name' => 'Test Type',
            'slug' => 'test-type',
            'is_active' => true,
            'order' => 1,
        ]);

        $this->category = Category::create([
            'name' => 'Test Category',
            'slug' => 'test-category',
            'type_id' => $this->type->id,
            'is_active' => true,
            'order' => 1,
        ]);

        $this->subcategory = Subcategory::create([
            'name' => 'Test Subcategory',
            'slug' => 'test-subcategory',
            'category_id' => $this->category->id,
            'is_active' => true,
            'order' => 1,
        ]);
    }

    public function test_upload_page_requires_authentication(): void
    {
        $response = $this->get('/upload');

        $response->assertRedirect('/login');
    }

    public function test_authenticated_user_can_access_upload_page(): void
    {
        $response = $this->actingAs($this->user)->get('/upload');

        $response->assertStatus(200);
    }

    public function test_file_upload_with_thumbnail(): void
    {
        Storage::fake('public');

        // Create a test file
        $file = UploadedFile::fake()->create('test.stl', 1024);

        // Create a test thumbnail image
        $thumbnail = UploadedFile::fake()->image('thumbnail.jpg', 800, 600);

        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test File with Thumbnail',
            'description' => 'Test description',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'tags' => 'test,tag',
            'license' => 'free',
            'file' => $file,
            'thumbnail' => $thumbnail,
        ]);

        $response->assertRedirect();

        // Verify file was created in database
        $this->assertDatabaseHas('files', [
            'title' => 'Test File with Thumbnail',
            'user_id' => $this->user->id,
            'thumbnail_path' => 'thumbnails/' . $thumbnail->hashName(),
        ]);

        // Verify files exist in storage
        Storage::disk('public')->assertExists('files/' . $file->hashName());
        Storage::disk('public')->assertExists('thumbnails/' . $thumbnail->hashName());
    }

    public function test_file_upload_without_thumbnail(): void
    {
        Storage::fake('public');

        // Create a test file without thumbnail
        $file = UploadedFile::fake()->create('test.stl', 1024);

        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test File without Thumbnail',
            'description' => 'Test description',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'tags' => 'test',
            'license' => 'free',
            'file' => $file,
            'thumbnail' => null,
        ]);

        $response->assertRedirect();

        // Verify file was created in database
        $this->assertDatabaseHas('files', [
            'title' => 'Test File without Thumbnail',
            'user_id' => $this->user->id,
            'thumbnail_path' => null,
        ]);

        // Verify main file exists but thumbnail directory should be empty
        Storage::disk('public')->assertExists('files/' . $file->hashName());
    }

    public function test_thumbnail_validation_accepts_valid_image_formats(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('test.stl', 1024);

        // Test PNG
        $pngThumbnail = UploadedFile::fake()->image('thumbnail.png', 800, 600);
        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test PNG Thumbnail',
            'description' => 'Test',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'license' => 'free',
            'file' => $file,
            'thumbnail' => $pngThumbnail,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('files', [
            'title' => 'Test PNG Thumbnail',
        ]);

        // Test WEBP
        $webpThumbnail = UploadedFile::fake()->image('thumbnail.webp', 800, 600);
        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test WEBP Thumbnail',
            'description' => 'Test',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'license' => 'free',
            'file' => $file,
            'thumbnail' => $webpThumbnail,
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('files', [
            'title' => 'Test WEBP Thumbnail',
        ]);
    }

    public function test_thumbnail_file_size_validation(): void
    {
        Storage::fake('public');

        // Create a test file that's too large (>5MB)
        $largeThumbnail = UploadedFile::fake()->image('large.jpg', 800, 600)->size(6000); // 6MB
        $file = UploadedFile::fake()->create('test.stl', 1024);

        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test Large Thumbnail',
            'description' => 'Test',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'license' => 'free',
            'file' => $file,
            'thumbnail' => $largeThumbnail,
        ]);

        $response->assertSessionHasErrors('thumbnail');
    }

    public function test_upload_requires_title(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->create('test.stl', 1024);
        $thumbnail = UploadedFile::fake()->image('thumbnail.jpg', 800, 600);

        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => '',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'license' => 'free',
            'file' => $file,
            'thumbnail' => $thumbnail,
        ]);

        $response->assertSessionHasErrors('title');
    }

    public function test_upload_requires_file(): void
    {
        $thumbnail = UploadedFile::fake()->image('thumbnail.jpg', 800, 600);

        $response = $this->actingAs($this->user)->post('/upload', [
            'title' => 'Test File',
            'type_id' => $this->type->id,
            'category_id' => $this->category->id,
            'subcategory_id' => $this->subcategory->id,
            'license' => 'free',
            'file' => null,
            'thumbnail' => $thumbnail,
        ]);

        $response->assertSessionHasErrors('file');
    }
}
