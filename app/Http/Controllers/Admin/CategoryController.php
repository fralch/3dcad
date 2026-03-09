<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = Category::with('type')
            ->withCount(['subcategories', 'files'])
            ->when($request->type_id, fn($q) => $q->where('type_id', $request->type_id))
            ->ordered()
            ->get();

        $types = Type::active()->ordered()->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'types' => $types,
            'filters' => $request->only('type_id'),
        ]);
    }

    public function create()
    {
        $types = Type::active()->ordered()->get();

        return Inertia::render('Admin/Categories/Form', [
            'types' => $types,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type_id' => 'required|exists:types,id',
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories')->where(fn($q) => $q->where('type_id', $request->type_id)),
            ],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? Category::where('type_id', $validated['type_id'])->max('sort_order') + 1;

        Category::create($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría creada correctamente.');
    }

    public function edit(Category $category)
    {
        $types = Type::active()->ordered()->get();

        return Inertia::render('Admin/Categories/Form', [
            'category' => $category->load('type'),
            'types' => $types,
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'type_id' => 'required|exists:types,id',
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('categories')
                    ->where(fn($q) => $q->where('type_id', $request->type_id))
                    ->ignore($category->id),
            ],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        $category->update($validated);

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría actualizada correctamente.');
    }

    public function destroy(Category $category)
    {
        if ($category->subcategories()->exists()) {
            return back()->with('error', 'No se puede eliminar una categoría que tiene subcategorías asociadas.');
        }

        $category->delete();

        return redirect()->route('admin.categories.index')
            ->with('success', 'Categoría eliminada correctamente.');
    }
}
