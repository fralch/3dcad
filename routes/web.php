<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

// Categoría principal: 3D
Route::get('/3d', function () {
    return Inertia::render('Categories/Main', [
        'categorySlug' => '3d',
    ]);
})->name('3d.index');

// Categoría principal: PLANOS
Route::get('/planos', function () {
    return Inertia::render('Categories/Main', [
        'categorySlug' => 'planos',
    ]);
})->name('planos.index');

// Subcategoría: /3d/mecanica o /planos/arquitectura
Route::get('/{category}/{subcategory}', function ($category, $subcategory) {
    return Inertia::render('Categories/Subcategory', [
        'categorySlug' => $category,
        'subcategorySlug' => $subcategory,
    ]);
})->where(['category' => '3d|planos', 'subcategory' => '[a-z-]+']);

// Elemento/Lista de archivos: /3d/mecanica/elementos-de-maquinas
Route::get('/{category}/{subcategory}/{element}', function ($category, $subcategory, $element) {
    return Inertia::render('Files/Index', [
        'categorySlug' => $category,
        'subcategorySlug' => $subcategory,
        'elementSlug' => $element,
    ]);
})->where(['category' => '3d|planos', 'subcategory' => '[a-z-]+', 'element' => '[a-z-]+']);

// Archivo individual
Route::get('/file/{slug}', function ($slug) {
    return Inertia::render('Files/Show', [
        'slug' => $slug,
    ]);
})->name('file.show');

// Upload (con datos mock para visual)
Route::get('/upload', function () {
    return Inertia::render('Upload');
})->middleware(['auth'])->name('upload');

// About
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected)
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Files
    Route::get('/files', function () {
        return Inertia::render('Admin/Files/Index');
    })->name('files.index');

    Route::get('/files/upload', function () {
        return Inertia::render('Admin/Files/Upload');
    })->name('files.upload');

    Route::get('/files/{id}/edit', function ($id) {
        // Mock data para edición
        $file = [
            'id' => $id,
            'title' => 'Sistema de Ventilación HVAC',
            'slug' => 'sistema-ventilacion-hvac',
            'description' => 'Sistema completo de ventilación HVAC para edificios comerciales.',
            'type_id' => 1,
            'category_id' => 1,
            'subcategory_id' => 3,
            'tags' => 'hvac, ventilación, aire acondicionado',
            'license' => 'free',
            'is_featured' => true,
            'is_active' => true,
        ];
        return Inertia::render('Admin/Files/Upload', ['file' => $file]);
    })->name('files.edit');

    // Types
    Route::get('/types', function () {
        return Inertia::render('Admin/Types/Index');
    })->name('types.index');

    Route::get('/types/create', function () {
        return Inertia::render('Admin/Types/Form');
    })->name('types.create');

    Route::get('/types/{id}/edit', function ($id) {
        // Mock data para edición
        $type = ['id' => $id, 'name' => '3D', 'slug' => '3d', 'is_active' => true, 'sort_order' => 1];
        return Inertia::render('Admin/Types/Form', ['type' => $type]);
    })->name('types.edit');

    // Categories
    Route::get('/categories', function () {
        return Inertia::render('Admin/Categories/Index');
    })->name('categories.index');

    Route::get('/categories/create', function () {
        return Inertia::render('Admin/Categories/Form');
    })->name('categories.create');

    Route::get('/categories/{id}/edit', function ($id) {
        // Mock data para edición
        $category = ['id' => $id, 'type_id' => 1, 'name' => 'Mecánica', 'slug' => 'mecanica', 'is_active' => true, 'sort_order' => 1];
        return Inertia::render('Admin/Categories/Form', ['category' => $category]);
    })->name('categories.edit');

    // Subcategories
    Route::get('/subcategories', function () {
        return Inertia::render('Admin/Subcategories/Index');
    })->name('subcategories.index');

    Route::get('/subcategories/create', function () {
        return Inertia::render('Admin/Subcategories/Form');
    })->name('subcategories.create');

    Route::get('/subcategories/{id}/edit', function ($id) {
        // Mock data para edición
        $subcategory = ['id' => $id, 'category_id' => 1, 'name' => 'ELEMENTOS DE MÁQUINAS', 'slug' => 'elementos-de-maquinas', 'is_active' => true, 'sort_order' => 1];
        return Inertia::render('Admin/Subcategories/Form', ['subcategory' => $subcategory]);
    })->name('subcategories.edit');

    // Profile (dentro de admin)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
