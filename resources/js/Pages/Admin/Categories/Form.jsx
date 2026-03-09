import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function CategoriesForm({ category = null, types = [] }) {
    const isEditing = !!category;

    const { data, setData, post, put, processing, errors } = useForm({
        type_id: category?.type_id || '',
        name: category?.name || '',
        slug: category?.slug || '',
        is_active: category?.is_active ?? true,
        sort_order: category?.sort_order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.categories.update', category.id));
        } else {
            post(route('admin.categories.store'));
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

    return (
        <AdminLayout title={isEditing ? 'Editar Categoría' : 'Nueva Categoría'}>
            <Head title={`${isEditing ? 'Editar' : 'Nueva'} Categoría - Admin`} />

            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href={route('admin.categories.index')} className="text-gray-500 hover:text-gray-700">
                        Categorías
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{isEditing ? 'Editar' : 'Nueva'}</span>
                </nav>
            </div>

            {/* Form */}
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="space-y-6">
                        {/* Type Select */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Tipo *
                            </label>
                            <select
                                value={data.type_id}
                                onChange={(e) => setData('type_id', e.target.value)}
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                    errors.type_id ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            >
                                <option value="">Selecciona un tipo</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                            {errors.type_id && (
                                <p className="mt-1 text-sm text-red-500">{errors.type_id}</p>
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
                                placeholder="Ej: Mecánica, Arquitectura"
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
                                Slug
                            </label>
                            <input
                                type="text"
                                value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)}
                                placeholder="ej: mecanica, arquitectura"
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                                    errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Se genera automáticamente si se deja vacío
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
                                Las categorías inactivas no aparecen en el sitio
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href={route('admin.categories.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-yellow-400 text-zinc-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Categoría')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
