import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function TypesForm({ type = null }) {
    const isEditing = !!type;

    const { data, setData, post, put, processing, errors } = useForm({
        name: type?.name || '',
        slug: type?.slug || '',
        is_active: type?.is_active ?? true,
        sort_order: type?.sort_order || 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(`/admin/types/${type.id}`);
        } else {
            post('/admin/types');
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
        <AdminLayout title={isEditing ? 'Editar Tipo' : 'Nuevo Tipo'}>
            <Head title={`${isEditing ? 'Editar' : 'Nuevo'} Tipo - Admin`} />

            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href="/admin/types" className="text-gray-500 hover:text-gray-700">
                        Tipos
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{isEditing ? 'Editar' : 'Nuevo'}</span>
                </nav>
            </div>

            {/* Form */}
            <div className="max-w-2xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Nombre *
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={handleNameChange}
                                placeholder="Ej: 3D, Planos"
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
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
                                placeholder="ej: 3d, planos"
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
                                    errors.slug ? 'border-red-500' : 'border-gray-300'
                                }`}
                                required
                            />
                            <p className="mt-1 text-sm text-gray-500">
                                Se usa en la URL: /[slug]/...
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
                                Los tipos inactivos no aparecen en el formulario de upload
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href="/admin/types"
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-yellow-400 text-zinc-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Crear Tipo')}
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}
