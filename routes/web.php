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

// Upload
Route::get('/upload', function () {
    return Inertia::render('Upload');
})->name('upload');

// About
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
