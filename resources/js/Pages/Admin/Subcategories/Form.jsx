import { Head, Link, useForm } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function SubcategoriesForm({ subcategory = null, types = [], categories = [] }) {
    const isEditing = !!subcategory;

    // Mock types for visual
    const mockTypes = types.length > 0 ? types : [
        {
            id: 1,
            name: '3D',
            slug: '3d',
            categories: [
                { id: 1, name: 'Mecánica', slug: 'mecanica' },
                { id: 2, name: 'Arquitectura', slug: 'arquitectura' },
            ]
        },
        {
            id: 2,
            name: 'Planos',
            slug: 'planos',
            categories: [
                { id: 3, name: 'Mecánica', slug: 'mecanica' },
                { id: 4, name: 'Arquitectura', slug: 'arquitectura' },
            ]
        },
    ];

    // Find type_id from category
    const getTypeIdFromCategory = (categoryId) => {
        const category = categories.find(c => c.id === categoryId);
        return category ? category.type_id : '';
    };

    const [selectedTypeId, setSelectedTypeId] = useState(
        subcategory?.category_id ? getTypeIdFromCategory(subcategory.category_id) : ''
    );

    const availableCategories = selectedTypeId 
        ? categories.filter(c => c.type_id === parseInt(selectedTypeId))
        : [];

    const { data, setData, post, put, processing, errors } = useForm({
        category_id: subcategory?.category_id || '',
        name: subcategory?.name || '',
        slug: subcategory?.slug || '',
        is_active: subcategory?.is_active ?? true,
        sort_order: subcategory?.sort_order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/subcategories/${subcategory.id}`);
        } else {
            post('/admin/subcategories');
        }
    };

    const generateSlug = (name) => {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    };

    const handleNameChange = (e) => {
        const name = e.target.value;
        setData(data => ({
            ...data,
            name,
            slug: !isEditing ? generateSlug(name) : data.slug,
        }));
    };

    const handleTypeChange = (e) => {
        setSelectedTypeId(e.target.value);
        setData('category_id', '');
    };

    return (
        <AdminLayout title={isEditing ? 'Editar Subcategoría' : 'Nueva Subcategoría'}>
            <Head title={`${isEditing ? 'Editar' : 'Nueva'} Subcategoría - Admin`} />

            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href="/admin/subcategories" className="text-gray-500 hover:text-gray-700">
                        Subcategorías
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{isEditing ? 'Editar' : 'Nueva'}</span>
                </nav>
            </div>

            {/* Form */}
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="space-y-6">
                        {/* Type Select (helper, not stored) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo *
                            </label>
                            <select
                                value={selectedTypeId}
                                onChange={handleTypeChange}
                                className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                                required
                            >
                                <option value="">Selecciona un tipo</option>
                                {mockTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            <p className="mt-1 text-sm text-gray-500">
                                Selecciona primero el tipo para ver las categorías disponibles
                            </p>
                        </div>

                        {/* Category Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Categoría *
                            </label>
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                disabled={!selectedTypeId}
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                                    errors.category_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">
                                    {selectedTypeId ? 'Selecciona una categoría' : 'Primero selecciona un tipo'}
                                </option>
                                {availableCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
                            )}
                        </div>

                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={handleNameChange}
                                placeholder="Ej: ELEMENTOS DE MÁQUINAS, VIVIENDA"
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        {/* Slug */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slug *
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="ej: elementos-de-maquinas, vivienda"
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                    errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Se usa en la URL: /[tipo]/[categoria]/[slug]
                            </p>
                            {errors.slug && (
                                <p className="mt-1 text-sm text-red-500">{errors.slug}</p>
                            )}
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Orden
                            </label>
                            <input
                                type="number"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', parseInt(e.target.value) || 0)}
                                min="0"
                                className={`w-32 border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                                    errors.sort_order ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Menor número = aparece primero
                            </p>
                            {errors.sort_order && (
                                <p className="mt-1 text-sm text-red-500">{errors.sort_order}</p>
                            )}
                        </div>

                        {/* Active */}
                        <div>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-yellow-400 focus:ring-yellow-400"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Activo
                                </span>
                            </label>
                            <p className="mt-1 text-sm text-gray-500 ml-8">
                                Las subcategorías inactivas no aparecen en el formulario de upload
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/admin/subcategories"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-yellow-400 text-zinc-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Subcategoría')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
