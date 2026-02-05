<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\File;
use App\Models\Subcategory;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $files = File::with(['user', 'type', 'category', 'subcategory'])
            ->when($request->search, fn($q, $search) => $q->where('title', 'like', "%{$search}%"))
            ->when($request->type_id, fn($q, $typeId) => $q->where('type_id', $typeId))
            ->when($request->category_id, fn($q, $categoryId) => $q->where('category_id', $categoryId))
            ->when($request->is_active !== null, fn($q) => $q->where('is_active', $request->boolean('is_active')))
            ->when($request->is_featured !== null, fn($q) => $q->where('is_featured', $request->boolean('is_featured')))
            ->latest()
            ->paginate(20)
            ->withQueryString();

        $types = Type::active()->ordered()->get();

        return Inertia::render('Admin/Files/Index', [
            'files' => $files,
            'types' => $types,
            'filters' => $request->only(['search', 'type_id', 'category_id', 'is_active', 'is_featured']),
        ]);
    }

    public function create()
    {
        $types = Type::with(['categories.subcategories'])->active()->ordered()->get();

        return Inertia::render('Admin/Files/Upload', [
            'types' => $types,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:files,slug',
            'description' => 'nullable|string|max:5000',
            'type_id' => 'required|exists:types,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
            'tags' => 'nullable|string|max:500',
            'license' => 'required|in:free,attribution,commercial',
            'file' => 'required|file|max:102400|mimes:stl,obj,fbx,blend,3ds,dwg,dxf,step,stp,iges,igs,pdf,zip,rar',
            'thumbnail' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['user_id'] = auth()->id();
        $validated['is_featured'] = $validated['is_featured'] ?? false;
        $validated['is_active'] = $validated['is_active'] ?? true;

        // Handle file upload
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $validated['file_path'] = $file->store('files', 'public');
            $validated['file_size'] = $file->getSize();
            $validated['file_type'] = $file->getClientOriginalExtension();
        }

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail_path'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        unset($validated['file'], $validated['thumbnail']);

        File::create($validated);

        return redirect()->route('admin.files.index')
            ->with('success', 'Archivo creado correctamente.');
    }

    public function edit(File $file)
    {
        $types = Type::with(['categories.subcategories'])->active()->ordered()->get();

        return Inertia::render('Admin/Files/Upload', [
            'file' => $file->load(['type', 'category', 'subcategory']),
            'types' => $types,
        ]);
    }

    public function update(Request $request, File $file)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('files')->ignore($file->id)],
            'description' => 'nullable|string|max:5000',
            'type_id' => 'required|exists:types,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
            'tags' => 'nullable|string|max:500',
            'license' => 'required|in:free,attribution,commercial',
            'file' => 'nullable|file|max:102400|mimes:stl,obj,fbx,blend,3ds,dwg,dxf,step,stp,iges,igs,pdf,zip,rar',
            'thumbnail' => 'nullable|image|max:5120',
            'is_featured' => 'boolean',
            'is_active' => 'boolean',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['title']) . '-' . Str::random(6);

        // Handle new file upload
        if ($request->hasFile('file')) {
            // Delete old file
            if ($file->file_path) {
                Storage::disk('public')->delete($file->file_path);
            }
            $uploadedFile = $request->file('file');
            $validated['file_path'] = $uploadedFile->store('files', 'public');
            $validated['file_size'] = $uploadedFile->getSize();
            $validated['file_type'] = $uploadedFile->getClientOriginalExtension();
        }

        // Handle new thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail
            if ($file->thumbnail_path) {
                Storage::disk('public')->delete($file->thumbnail_path);
            }
            $validated['thumbnail_path'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        unset($validated['file'], $validated['thumbnail']);

        $file->update($validated);

        return redirect()->route('admin.files.index')
            ->with('success', 'Archivo actualizado correctamente.');
    }

    public function destroy(File $file)
    {
        // Delete associated files from storage
        if ($file->file_path) {
            Storage::disk('public')->delete($file->file_path);
        }
        if ($file->thumbnail_path) {
            Storage::disk('public')->delete($file->thumbnail_path);
        }

        // Delete download records
        $file->downloadRecords()->delete();

        // Delete favorites
        $file->favoritedBy()->detach();

        $file->delete();

        return redirect()->route('admin.files.index')
            ->with('success', 'Archivo eliminado correctamente.');
    }

    public function toggleFeatured(File $file)
    {
        $file->update(['is_featured' => !$file->is_featured]);

        return back()->with('success', $file->is_featured ? 'Archivo destacado.' : 'Archivo quitado de destacados.');
    }

    public function toggleActive(File $file)
    {
        $file->update(['is_active' => !$file->is_active]);

        return back()->with('success', $file->is_active ? 'Archivo activado.' : 'Archivo desactivado.');
    }
}
