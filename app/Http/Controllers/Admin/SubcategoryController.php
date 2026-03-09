<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SubcategoryController extends Controller
{
    public function index(Request $request)
    {
        $subcategories = Subcategory::with(['category.type'])
            ->withCount('files')
            ->when($request->category_id, fn($q) => $q->where('category_id', $request->category_id))
            ->when($request->type_id, fn($q) => $q->whereHas('category', fn($q2) => $q2->where('type_id', $request->type_id)))
            ->ordered()
            ->get();

        $types = Type::active()->ordered()->get();
        $categories = Category::with('type')->active()->ordered()->get();

        return Inertia::render('Admin/Subcategories/Index', [
            'subcategories' => $subcategories,
            'types' => $types,
            'categories' => $categories,
            'filters' => $request->only(['type_id', 'category_id']),
        ]);
    }

    public function create()
    {
        $types = Type::active()->ordered()->get();
        $categories = Category::with('type')->active()->ordered()->get();

        return Inertia::render('Admin/Subcategories/Form', [
            'types' => $types,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('subcategories')->where(fn($q) => $q->where('category_id', $request->category_id)),
            ],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? Subcategory::where('category_id', $validated['category_id'])->max('sort_order') + 1;

        Subcategory::create($validated);

        return redirect()->route('admin.subcategories.index')
            ->with('success', 'Subcategoría creada correctamente.');
    }

    public function edit(Subcategory $subcategory)
    {
        $types = Type::active()->ordered()->get();
        $categories = Category::with('type')->active()->ordered()->get();

        return Inertia::render('Admin/Subcategories/Form', [
            'subcategory' => $subcategory->load('category.type'),
            'types' => $types,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Subcategory $subcategory)
    {
        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'name' => 'required|string|max:255',
            'slug' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('subcategories')
                    ->where(fn($q) => $q->where('category_id', $request->category_id))
                    ->ignore($subcategory->id),
            ],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        $subcategory->update($validated);

        return redirect()->route('admin.subcategories.index')
            ->with('success', 'Subcategoría actualizada correctamente.');
    }

    public function destroy(Subcategory $subcategory)
    {
        if ($subcategory->files()->exists()) {
            return back()->with('error', 'No se puede eliminar una subcategoría que tiene archivos asociados.');
        }

        $subcategory->delete();

        return redirect()->route('admin.subcategories.index')
            ->with('success', 'Subcategoría eliminada correctamente.');
    }
}
