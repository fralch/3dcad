import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CategoriesIndex({ categories = [], types = [] }) {
    const [filterType, setFilterType] = useState('');

    // Mock data for visual
    const mockTypes = types.length > 0 ? types : [
        { id: 1, name: '3D', slug: '3d' },
        { id: 2, name: 'Planos', slug: 'planos' },
    ];

    const mockCategories = categories.length > 0 ? categories : [
        { id: 1, name: 'Mecánica', slug: 'mecanica', type_id: 1, type: { id: 1, name: '3D' }, is_active: true, sort_order: 1, subcategories_count: 4 },
        { id: 2, name: 'Arquitectura', slug: 'arquitectura', type_id: 1, type: { id: 1, name: '3D' }, is_active: true, sort_order: 2, subcategories_count: 3 },
        { id: 3, name: 'Mecánica', slug: 'mecanica', type_id: 2, type: { id: 2, name: 'Planos' }, is_active: true, sort_order: 1, subcategories_count: 1 },
        { id: 4, name: 'Arquitectura', slug: 'arquitectura', type_id: 2, type: { id: 2, name: 'Planos' }, is_active: true, sort_order: 2, subcategories_count: 1 },
    ];

    const filteredCategories = filterType
        ? mockCategories.filter(c => c.type_id === parseInt(filterType))
        : mockCategories;

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
            router.delete(`/admin/categories/${id}`);
        }
    };

    return (
        <AdminLayout title="Categorías">
            <Head title="Categorías - Admin" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-gray-500">Gestiona las categorías de contenido</p>
                </div>
                <Link
                    href="/admin/categories/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-zinc-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nueva Categoría
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700">Filtrar por tipo:</label>
                    <select
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                        className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                        <option value="">Todos los tipos</option>
                        {mockTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Nombre</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Tipo</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Slug</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Subcategorías</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Orden</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredCategories.map((category) => (
                            <tr key={category.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-900">{category.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {category.type?.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                        {category.slug}
                                    </code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{category.subcategories_count}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {category.is_active ? (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Activo
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                            Inactivo
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{category.sort_order}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/categories/${category.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Editar"
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredCategories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay categorías registradas</p>
                        <Link
                            href="/admin/categories/create"
                            className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Crear la primera categoría
                        </Link>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

function PlusIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}

function EditIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    );
}

function TrashIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}
