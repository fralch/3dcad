<?php

use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\FileController as AdminFileController;
use App\Http\Controllers\Admin\SubcategoryController as AdminSubcategoryController;
use App\Http\Controllers\Admin\TypeController as AdminTypeController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Models\Category;
use App\Models\File;
use App\Models\Subcategory;
use App\Models\Type;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    $featuredFiles = File::with(['user', 'category', 'subcategory'])
        ->active()
        ->featured()
        ->latest()
        ->limit(8)
        ->get();

    $recentFiles = File::with(['user', 'category', 'subcategory'])
        ->active()
        ->latest()
        ->limit(8)
        ->get();

    $types = Type::withCount('files')->active()->ordered()->get();

    return Inertia::render('Home', [
        'featuredFiles' => $featuredFiles,
        'recentFiles' => $recentFiles,
        'types' => $types,
    ]);
})->name('home');

// Categoría principal: 3D
Route::get('/3d', function () {
    $type = Type::with(['categories' => function ($query) {
        $query->active()->ordered()->withCount('files');
    }])->where('slug', '3d')->firstOrFail();

    return Inertia::render('Categories/Main', [
        'type' => $type,
        'categorySlug' => '3d',
    ]);
})->name('3d.index');

// Categoría principal: PLANOS
Route::get('/planos', function () {
    $type = Type::with(['categories' => function ($query) {
        $query->active()->ordered()->withCount('files');
    }])->where('slug', 'planos')->firstOrFail();

    return Inertia::render('Categories/Main', [
        'type' => $type,
        'categorySlug' => 'planos',
    ]);
})->name('planos.index');

// Subcategoría: /3d/mecanica o /planos/arquitectura
Route::get('/{typeSlug}/{categorySlug}', function ($typeSlug, $categorySlug) {
    $type = Type::where('slug', $typeSlug)->firstOrFail();

    $category = Category::with(['subcategories' => function ($query) {
        $query->active()->ordered()->withCount('files');
    }])
        ->where('type_id', $type->id)
        ->where('slug', $categorySlug)
        ->firstOrFail();

    return Inertia::render('Categories/Subcategory', [
        'type' => $type,
        'category' => $category,
        'categorySlug' => $typeSlug,
        'subcategorySlug' => $categorySlug,
    ]);
})->where(['typeSlug' => '3d|planos', 'categorySlug' => '[a-z-]+']);

// Elemento/Lista de archivos: /3d/mecanica/elementos-de-maquinas
Route::get('/{typeSlug}/{categorySlug}/{subcategorySlug}', function ($typeSlug, $categorySlug, $subcategorySlug) {
    $type = Type::where('slug', $typeSlug)->firstOrFail();

    $category = Category::where('type_id', $type->id)
        ->where('slug', $categorySlug)
        ->firstOrFail();

    $subcategory = Subcategory::where('category_id', $category->id)
        ->where('slug', $subcategorySlug)
        ->firstOrFail();

    $files = File::with(['user', 'type', 'category', 'subcategory'])
        ->active()
        ->where('subcategory_id', $subcategory->id)
        ->latest()
        ->paginate(20);

    return Inertia::render('Files/Index', [
        'type' => $type,
        'category' => $category,
        'subcategory' => $subcategory,
        'files' => $files,
        'categorySlug' => $typeSlug,
        'subcategorySlug' => $categorySlug,
        'elementSlug' => $subcategorySlug,
    ]);
})->where(['typeSlug' => '3d|planos', 'categorySlug' => '[a-z-]+', 'subcategorySlug' => '[a-z-]+']);

// Archivo individual
Route::get('/files/{slug}', [FileController::class, 'show'])->name('file.show');

// Descargar archivo
Route::get('/files/{slug}/download', [FileController::class, 'download'])->name('file.download');

// Upload (requiere autenticación)
Route::middleware(['auth'])->group(function () {
    Route::get('/upload', [FileController::class, 'upload'])->name('upload');
    Route::post('/upload', [FileController::class, 'store'])->name('upload.store');
    Route::post('/files/{file}/like', [FileController::class, 'like'])->name('file.like');
});

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
        $stats = [
            'files' => File::count(),
            'types' => Type::count(),
            'categories' => Category::count(),
            'subcategories' => Subcategory::count(),
            'downloads' => File::sum('downloads'),
        ];

        $recentFiles = File::with(['user', 'type', 'category'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'recentFiles' => $recentFiles,
        ]);
    })->name('dashboard');

    // Types CRUD
    Route::resource('types', AdminTypeController::class)->except(['show']);

    // Categories CRUD
    Route::resource('categories', AdminCategoryController::class)->except(['show']);

    // Subcategories CRUD
    Route::resource('subcategories', AdminSubcategoryController::class)->except(['show']);

    // Files CRUD
    Route::get('/files', [AdminFileController::class, 'index'])->name('files.index');
    Route::get('/files/upload', [AdminFileController::class, 'create'])->name('files.upload');
    Route::post('/files', [AdminFileController::class, 'store'])->name('files.store');
    Route::get('/files/{file}/edit', [AdminFileController::class, 'edit'])->name('files.edit');
    Route::put('/files/{file}', [AdminFileController::class, 'update'])->name('files.update');
    Route::delete('/files/{file}', [AdminFileController::class, 'destroy'])->name('files.destroy');
    Route::post('/files/{file}/toggle-featured', [AdminFileController::class, 'toggleFeatured'])->name('files.toggle-featured');
    Route::post('/files/{file}/toggle-active', [AdminFileController::class, 'toggleActive'])->name('files.toggle-active');

    // Profile (dentro de admin)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
