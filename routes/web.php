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

Route::get('/files', function () {
    return Inertia::render('Files/Index');
})->name('files.index');

Route::get('/files/{slug}', function ($slug) {
    return Inertia::render('Files/Show', [
        'slug' => $slug,
    ]);
})->name('files.show');

Route::get('/categories', function () {
    return Inertia::render('Categories/Index');
})->name('categories.index');

Route::get('/categories/{slug}', function ($slug) {
    return Inertia::render('Categories/Show', [
        'slug' => $slug,
    ]);
})->name('categories.show');

Route::get('/upload', function () {
    return Inertia::render('Upload');
})->name('upload');

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
