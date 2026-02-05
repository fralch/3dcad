<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Type;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TypeController extends Controller
{
    public function index()
    {
        $types = Type::withCount(['categories', 'files'])
            ->ordered()
            ->get();

        return Inertia::render('Admin/Types/Index', [
            'types' => $types,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Types/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|unique:types,slug',
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);
        $validated['is_active'] = $validated['is_active'] ?? true;
        $validated['sort_order'] = $validated['sort_order'] ?? Type::max('sort_order') + 1;

        Type::create($validated);

        return redirect()->route('admin.types.index')
            ->with('success', 'Tipo creado correctamente.');
    }

    public function edit(Type $type)
    {
        return Inertia::render('Admin/Types/Form', [
            'type' => $type,
        ]);
    }

    public function update(Request $request, Type $type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('types')->ignore($type->id)],
            'is_active' => 'boolean',
            'sort_order' => 'nullable|integer|min:0',
        ]);

        $validated['slug'] = $validated['slug'] ?? Str::slug($validated['name']);

        $type->update($validated);

        return redirect()->route('admin.types.index')
            ->with('success', 'Tipo actualizado correctamente.');
    }

    public function destroy(Type $type)
    {
        if ($type->categories()->exists()) {
            return back()->with('error', 'No se puede eliminar un tipo que tiene categorías asociadas.');
        }

        $type->delete();

        return redirect()->route('admin.types.index')
            ->with('success', 'Tipo eliminado correctamente.');
    }
}
