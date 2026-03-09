import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import CreateModal from '@/Components/Admin/CreateModal';

export default function TypesIndex({ types = [] }) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [processing, setProcessing] = useState(false);

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este tipo?')) {
            router.delete(route('admin.types.destroy', id));
        }
    };

    const handleCreateType = (data) => {
        setProcessing(true);
        router.post(route('admin.types.store'), data, {
            onSuccess: () => {
                setShowCreateModal(false);
                setProcessing(false);
            },
            onError: () => {
                setProcessing(false);
            },
            onFinish: () => {
                setProcessing(false);
            }
        });
    };

    const typeFields = [
        {
            name: 'name',
            label: 'Nombre *',
            type: 'text',
            required: true,
            placeholder: 'Ej: 3D, Planos',
            helpText: 'El nombre del tipo'
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            required: false,
            placeholder: 'ej: 3d, planos',
            helpText: 'Se genera automáticamente si se deja vacío',
            autoGenerate: true
        },
        {
            name: 'sort_order',
            label: 'Orden',
            type: 'number',
            defaultValue: 0,
            placeholder: '0',
            helpText: 'Menor número = aparece primero'
        },
        {
            name: 'is_active',
            label: 'Activo',
            type: 'checkbox',
            defaultValue: true,
            helpText: 'Los tipos inactivos no aparecen en el sitio'
        }
    ];

    return (
        <AdminLayout title="Tipos">
            <Head title="Tipos - Admin" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-gray-500">Gestiona los tipos principales de contenido</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-400 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nuevo Tipo
                </button>
            </div>

            {/* Create Modal */}
            <CreateModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Nuevo Tipo"
                fields={typeFields}
                onSubmit={handleCreateType}
                processing={processing}
            />

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Nombre</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Slug</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categorías</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Archivos</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Orden</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {types.map((type) => (
                            <tr key={type.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-900">{type.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                        {type.slug}
                                    </code>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{type.categories_count || 0}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-gray-600">{type.files_count || 0}</span>
                                </td>
                                <td className="px-6 py-4">
                                    {type.is_active ? (
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
                                    <span className="text-gray-600">{type.sort_order}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.types.edit', type.id)}
                                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Editar"
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(type.id)}
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

                {types.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay tipos registrados</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Crear el primer tipo
                        </button>
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
