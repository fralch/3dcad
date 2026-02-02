import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import CreateModal from '@/Components/Admin/CreateModal';

export default function SubcategoriesIndex({ subcategories = [], types = [] }) {
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [selectedTypeId, setSelectedTypeId] = useState('');

    const { post, errors } = useForm();

    // Mock data for visual
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

    const mockSubcategories = subcategories.length > 0 ? subcategories : [
        { id: 1, name: 'ELEMENTOS DE MÁQUINAS', slug: 'elementos-de-maquinas', category_id: 1, category: { id: 1, name: 'Mecánica', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 1 },
        { id: 2, name: 'ESTRUCTURAS METÁLICAS', slug: 'estructuras-metalicas', category_id: 1, category: { id: 1, name: 'Mecánica', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 2 },
        { id: 3, name: 'INSTALACIONES MEP', slug: 'instalaciones-mep', category_id: 1, category: { id: 1, name: 'Mecánica', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 3 },
        { id: 4, name: 'MECANISMOS Y MÁQUINAS', slug: 'mecanismos-y-maquinas', category_id: 1, category: { id: 1, name: 'Mecánica', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 4 },
        { id: 5, name: 'VIVIENDA', slug: 'vivienda', category_id: 2, category: { id: 2, name: 'Arquitectura', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 1 },
        { id: 6, name: 'MOBILIARIO', slug: 'mobiliario', category_id: 2, category: { id: 2, name: 'Arquitectura', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 2 },
        { id: 7, name: 'PAISAJISMO', slug: 'paisajismo', category_id: 2, category: { id: 2, name: 'Arquitectura', type: { id: 1, name: '3D' } }, is_active: true, sort_order: 3 },
        { id: 8, name: 'General', slug: 'general', category_id: 3, category: { id: 3, name: 'Mecánica', type: { id: 2, name: 'Planos' } }, is_active: true, sort_order: 1 },
        { id: 9, name: 'General', slug: 'general', category_id: 4, category: { id: 4, name: 'Arquitectura', type: { id: 2, name: 'Planos' } }, is_active: true, sort_order: 1 },
    ];

    const selectedType = mockTypes.find(t => t.id === parseInt(filterType));
    const availableCategories = selectedType?.categories || [];

    let filteredSubcategories = mockSubcategories;
    if (filterCategory) {
        filteredSubcategories = filteredSubcategories.filter(s => s.category_id === parseInt(filterCategory));
    } else if (filterType) {
        const categoryIds = availableCategories.map(c => c.id);
        filteredSubcategories = filteredSubcategories.filter(s => categoryIds.includes(s.category_id));
    }

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta subcategoría?')) {
            router.delete(`/admin/subcategories/${id}`);
        }
    };

    const handleTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterCategory('');
    };

    const handleCreateSubcategory = (data) => {
        setProcessing(true);
        post('/admin/subcategories', {
            ...data,
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

    // Function to get fields dynamically based on selected type
    const getSubcategoryFields = () => {
        const selectedType = mockTypes.find(t => t.id === parseInt(selectedTypeId));
        const availableCategories = selectedType?.categories || [];
        
        return [
            {
                name: 'type_id',
                label: 'Tipo *',
                type: 'select',
                options: mockTypes.map(type => ({ value: type.id, label: type.name })),
                required: true,
                placeholder: 'Selecciona un tipo',
                helpText: 'Selecciona primero el tipo para ver las categorías disponibles'
            },
            {
                name: 'category_id',
                label: 'Categoría *',
                type: 'select',
                options: availableCategories.map(cat => ({ value: cat.id, label: cat.name })),
                required: true,
                placeholder: selectedTypeId ? 'Selecciona una categoría' : 'Primero selecciona un tipo',
                disabled: !selectedTypeId
            },
            {
                name: 'name',
                label: 'Nombre *',
                type: 'text',
                required: true,
                placeholder: 'Ej: ELEMENTOS DE MÁQUINAS, VIVIENDA',
                helpText: 'El nombre de la subcategoría'
            },
            {
                name: 'slug',
                label: 'Slug *',
                type: 'text',
                required: true,
                placeholder: 'ej: elementos-de-maquinas, vivienda',
                helpText: 'Se usa en la URL: /[tipo]/[categoria]/[slug]',
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
                helpText: 'Las subcategorías inactivas no aparecen en el formulario de upload'
            }
        ];
    };

    const subcategoryFields = getSubcategoryFields();

    return (
        <AdminLayout title="Subcategorías">
            <Head title="Subcategorías - Admin" />

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-gray-500">Gestiona las subcategorías de contenido</p>
                </div>
                <button
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-zinc-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nueva Subcategoría
                </button>
            </div>

            {/* Create Modal */}
            <CreateModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                title="Nueva Subcategoría"
                fields={subcategoryFields}
                onSubmit={handleCreateSubcategory}
                processing={processing}
                onFieldChange={(fieldName, value) => {
                    if (fieldName === 'type_id') {
                        setSelectedTypeId(value);
                    }
                }}
            />

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Tipo:</label>
                        <select
                            value={filterType}
                            onChange={handleTypeChange}
                            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                        >
                            <option value="">Todos</option>
                            {mockTypes.map((type) => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium text-gray-700">Categoría:</label>
                        <select
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                            disabled={!filterType}
                            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
                        >
                            <option value="">Todas</option>
                            {availableCategories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Nombre</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Tipo</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Categoría</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Slug</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Orden</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredSubcategories.map((subcategory) => (
                            <tr key={subcategory.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <span className="font-medium text-gray-900">{subcategory.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {subcategory.category?.type?.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {subcategory.category?.name}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <code className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                                        {subcategory.slug}
                                    </code>
                                </td>
                                <td className="px-6 py-4">
                                    {subcategory.is_active ? (
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
                                    <span className="text-gray-600">{subcategory.sort_order}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/admin/subcategories/${subcategory.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Editar"
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(subcategory.id)}
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

                {filteredSubcategories.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay subcategorías registradas</p>
                        <Link
                            href="/admin/subcategories/create"
                            className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Crear la primera subcategoría
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
