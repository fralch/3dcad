<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\FileDownload;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class FileController extends Controller
{
    public function index(Request $request)
    {
        $files = File::with(['user', 'type', 'category', 'subcategory'])
            ->active()
            ->when($request->search, fn($q, $search) => $q->where('title', 'like', "%{$search}%"))
            ->when($request->tag, fn($q, $tag) => $q->where('tags', 'like', "%{$tag}%"))
            ->when($request->type, fn($q, $type) => $q->whereHas('type', fn($q2) => $q2->where('slug', $type)))
            ->when($request->category, fn($q, $category) => $q->whereHas('category', fn($q2) => $q2->where('slug', $category)))
            ->when($request->sort === 'popular', fn($q) => $q->orderByDesc('downloads'))
            ->when($request->sort === 'recent', fn($q) => $q->latest())
            ->when($request->sort === 'views', fn($q) => $q->orderByDesc('views'))
            ->when(!$request->sort, fn($q) => $q->latest())
            ->paginate(20)
            ->withQueryString();

        return Inertia::render('Files/Index', [
            'files' => $files,
            'filters' => $request->only(['search', 'tag', 'type', 'category', 'sort']),
        ]);
    }

    public function show(string $slug)
    {
        $file = File::with(['user', 'type', 'category', 'subcategory'])
            ->where('slug', $slug)
            ->firstOrFail();

        // Increment views
        $file->incrementViews();

        // Get related files
        $relatedFiles = File::with(['user', 'category'])
            ->active()
            ->where('id', '!=', $file->id)
            ->where(function ($query) use ($file) {
                $query->where('subcategory_id', $file->subcategory_id)
                    ->orWhere('category_id', $file->category_id);
            })
            ->limit(4)
            ->get();

        return Inertia::render('Files/Show', [
            'file' => $file,
            'relatedFiles' => $relatedFiles,
        ]);
    }

    public function upload()
    {
        $types = Type::with(['categories.subcategories'])
            ->active()
            ->ordered()
            ->get();

        return Inertia::render('Upload', [
            'types' => $types,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:5000',
            'type_id' => 'required|exists:types,id',
            'category_id' => 'required|exists:categories,id',
            'subcategory_id' => 'required|exists:subcategories,id',
            'tags' => 'nullable|string|max:500',
            'license' => 'required|in:free,attribution,commercial',
            'file' => 'required|file|max:102400',
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(6);
        $validated['user_id'] = auth()->id();
        $validated['is_active'] = true;
        $validated['is_featured'] = false;

        // Handle file upload
        $uploadedFile = $request->file('file');
        $validated['file_path'] = $uploadedFile->store('files', 'public');
        $validated['file_size'] = $uploadedFile->getSize();
        $validated['file_type'] = $uploadedFile->getClientOriginalExtension();

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail_path'] = $request->file('thumbnail')->store('thumbnails', 'public');
        }

        unset($validated['file'], $validated['thumbnail']);

        $file = File::create($validated);

        return redirect()->route('file.show', $file->slug)
            ->with('success', 'Archivo subido correctamente.');
    }

    public function download(string $slug)
    {
        $file = File::where('slug', $slug)->firstOrFail();

        if (!$file->file_path || !Storage::disk('public')->exists($file->file_path)) {
            abort(404, 'Archivo no encontrado.');
        }

        // Record download
        FileDownload::create([
            'file_id' => $file->id,
            'user_id' => auth()->id(),
            'ip_address' => request()->ip(),
        ]);

        // Increment download counter
        $file->incrementDownloads();

        $fileName = Str::slug($file->title) . '.' . $file->file_type;

        return Storage::disk('public')->download($file->file_path, $fileName);
    }

    public function like(File $file)
    {
        $user = auth()->user();

        if ($user->favorites()->where('file_id', $file->id)->exists()) {
            $user->favorites()->detach($file->id);
            $file->decrement('likes');
            $liked = false;
        } else {
            $user->favorites()->attach($file->id);
            $file->increment('likes');
            $liked = true;
        }

        return back()->with('success', $liked ? 'Archivo guardado en favoritos.' : 'Archivo eliminado de favoritos.');
    }
}
