import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function FilesIndex({ files = { data: [] }, types = [] }) {
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [filterSubcategory, setFilterSubcategory] = useState('');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'

    // Get files data (handle both paginated and array)
    const filesData = Array.isArray(files) ? files : (files.data || []);

    // Transform files to include type/category/subcategory names
    const transformedFiles = filesData.map(file => ({
        ...file,
        type: file.type?.name || '',
        category: file.category?.name || '',
        subcategory: file.subcategory?.name || '',
        thumbnail: file.thumbnail_path ? `/storage/${file.thumbnail_path}` : null,
    }));

    const selectedType = types.find(t => t.id === parseInt(filterType));
    const availableCategories = selectedType?.categories || [];
    const selectedCategory = availableCategories.find(c => c.id === parseInt(filterCategory));
    const availableSubcategories = selectedCategory?.subcategories || [];

    // Filter files locally for quick filtering (server already filters by type_id/category_id)
    let filteredFiles = transformedFiles;
    if (filterType) {
        const typeName = types.find(t => t.id === parseInt(filterType))?.name;
        filteredFiles = filteredFiles.filter(f => f.type === typeName);
    }
    if (filterCategory) {
        const catName = availableCategories.find(c => c.id === parseInt(filterCategory))?.name;
        filteredFiles = filteredFiles.filter(f => f.category === catName);
    }
    if (filterSubcategory) {
        const subName = availableSubcategories.find(s => s.id === parseInt(filterSubcategory))?.name;
        filteredFiles = filteredFiles.filter(f => f.subcategory === subName);
    }

    const handleTypeChange = (e) => {
        setFilterType(e.target.value);
        setFilterCategory('');
        setFilterSubcategory('');
    };

    const handleCategoryChange = (e) => {
        setFilterCategory(e.target.value);
        setFilterSubcategory('');
    };

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este archivo?')) {
            router.delete(`/admin/files/${id}`);
        }
    };

    const toggleFeatured = (id) => {
        router.post(`/admin/files/${id}/toggle-featured`, {}, {
            preserveScroll: true,
        });
    };

    const toggleActive = (id) => {
        router.post(`/admin/files/${id}/toggle-active`, {}, {
            preserveScroll: true,
        });
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' });
    };

    return (
        <AdminLayout title="Archivos">
            <Head title="Archivos - Admin" />

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <p className="text-sm sm:text-base text-gray-500">Gestiona todos los archivos del sistema</p>
                </div>
                <Link
                    href="/admin/files/upload"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-400 text-zinc-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors text-sm sm:text-base"
                >
                    <PlusIcon className="w-5 h-5" />
                    Subir Archivo
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Filters Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                        {/* Type Filter */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 lg:hidden">Tipo</label>
                            <select
                                value={filterType}
                                onChange={handleTypeChange}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            >
                                <option value="">Todos los tipos</option>
                                {types.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 lg:hidden">Categoría</label>
                            <select
                                value={filterCategory}
                                onChange={handleCategoryChange}
                                disabled={!filterType}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="">Todas las categorías</option>
                                {availableCategories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory Filter */}
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1 lg:hidden">Subcategoría</label>
                            <select
                                value={filterSubcategory}
                                onChange={(e) => setFilterSubcategory(e.target.value)}
                                disabled={!filterCategory}
                                className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent disabled:bg-gray-100"
                            >
                                <option value="">Todas las subcategorías</option>
                                {availableSubcategories.map((sub) => (
                                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center justify-between lg:justify-end gap-2">
                        <span className="text-sm text-gray-500 lg:hidden">Vista:</span>
                        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <GridIcon className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded-md transition-colors ${
                                    viewMode === 'table' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                }`}
                            >
                                <TableIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Filters Summary */}
                {(filterType || filterCategory || filterSubcategory) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-gray-500">Filtros activos:</span>
                            {filterType && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    {types.find(t => t.id === parseInt(filterType))?.name}
                                </span>
                            )}
                            {filterCategory && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    {availableCategories.find(c => c.id === parseInt(filterCategory))?.name}
                                </span>
                            )}
                            {filterSubcategory && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                    {availableSubcategories.find(s => s.id === parseInt(filterSubcategory))?.name}
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setFilterType('');
                                    setFilterCategory('');
                                    setFilterSubcategory('');
                                }}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Results count */}
            <div className="mb-4">
                <p className="text-sm text-gray-500">
                    Mostrando <span className="font-medium text-gray-900">{filteredFiles.length}</span> archivos
                </p>
            </div>

            {/* Grid View */}
            {viewMode === 'grid' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {filteredFiles.map((file) => (
                        <div key={file.id} className="bg-white rounded-xl shadow-sm overflow-hidden group">
                            {/* Thumbnail */}
                            <div className="aspect-video bg-gray-100 relative">
                                {file.thumbnail ? (
                                    <img src={file.thumbnail} alt={file.title} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <FileIcon className="w-16 h-16 text-gray-300" />
                                    </div>
                                )}
                                {/* Badges */}
                                <div className="absolute top-2 left-2 flex gap-1">
                                    {file.is_featured && (
                                        <span className="px-2 py-0.5 bg-yellow-400 text-zinc-900 text-xs font-medium rounded">
                                            Destacado
                                        </span>
                                    )}
                                    {file.conversion_status === 'pending' || file.conversion_status === 'processing' ? (
                                        <span className="px-2 py-0.5 bg-blue-500 text-white text-xs font-medium rounded">
                                            Convirtiendo 3D...
                                        </span>
                                    ) : file.conversion_status === 'failed' ? (
                                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded" title={file.conversion_error}>
                                            Error 3D
                                        </span>
                                    ) : file.conversion_status === 'completed' ? (
                                        <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded">
                                            GLB Listo
                                        </span>
                                    ) : null}
                                    {!file.is_active && (
                                        <span className="px-2 py-0.5 bg-gray-500 text-white text-xs font-medium rounded">
                                            Inactivo
                                        </span>
                                    )}
                                </div>
                                {/* Hover Actions */}
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Link
                                        href={`/admin/files/${file.id}/edit`}
                                        className="p-2 bg-white rounded-lg text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        <EditIcon className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => toggleFeatured(file.id)}
                                        className={`p-2 bg-white rounded-lg transition-colors ${
                                            file.is_featured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                                        }`}
                                    >
                                        <StarIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(file.id)}
                                        className="p-2 bg-white rounded-lg text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Info */}
                            <div className="p-4">
                                <h3 className="font-medium text-gray-900 truncate" title={file.title}>
                                    {file.title}
                                </h3>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 rounded">{file.type}</span>
                                    <span className="px-1.5 py-0.5 bg-green-50 text-green-700 rounded">{file.category}</span>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
                                    <span className="flex items-center gap-1">
                                        <DownloadIcon className="w-4 h-4" />
                                        {file.downloads}
                                    </span>
                                    <span>{formatDate(file.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Archivo</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Clasificación</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Descargas</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                                <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Fecha</th>
                                <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredFiles.map((file) => (
                                <tr key={file.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileIcon className="w-6 h-6 text-gray-400" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{file.title}</p>
                                                <p className="text-sm text-gray-500">{file.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                                                {file.type}
                                            </span>
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 ml-1">
                                                {file.category}
                                            </span>
                                            <p className="text-xs text-gray-500">{file.subcategory}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center gap-1 text-gray-600">
                                            <DownloadIcon className="w-4 h-4" />
                                            {file.downloads}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {file.is_featured && (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                    Destacado
                                                </span>
                                            )}
                                            {file.is_active ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                    Activo
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                                    Inactivo
                                                </span>
                                            )}
                                            {file.conversion_status === 'pending' || file.conversion_status === 'processing' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    Convirtiendo...
                                                </span>
                                            ) : file.conversion_status === 'failed' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800" title={file.conversion_error}>
                                                    Fallo 3D
                                                </span>
                                            ) : file.conversion_status === 'completed' ? (
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                                    GLB Listo
                                                </span>
                                            ) : null}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(file.created_at)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-end gap-1">
                                            <Link
                                                href={`/admin/files/${file.id}/edit`}
                                                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                                title="Editar"
                                            >
                                                <EditIcon className="w-5 h-5" />
                                            </Link>
                                            <button
                                                onClick={() => toggleFeatured(file.id)}
                                                className={`p-2 transition-colors ${
                                                    file.is_featured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                                                }`}
                                                title={file.is_featured ? 'Quitar destacado' : 'Destacar'}
                                            >
                                                <StarIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => toggleActive(file.id)}
                                                className={`p-2 transition-colors ${
                                                    file.is_active ? 'text-green-500' : 'text-gray-400 hover:text-green-500'
                                                }`}
                                                title={file.is_active ? 'Desactivar' : 'Activar'}
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(file.id)}
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
                </div>
            </div>
            )}

            {/* Empty State */}
            {filteredFiles.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                    <FileIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay archivos</h3>
                    <p className="text-gray-500 mb-6">No se encontraron archivos con los filtros seleccionados</p>
                    <Link
                        href="/admin/files/upload"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-zinc-900 rounded-lg font-medium hover:bg-yellow-300 transition-colors"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Subir el primer archivo
                    </Link>
                </div>
            )}
        </AdminLayout>
    );
}

// Icons
function PlusIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}

function GridIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    );
}

function TableIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
        </svg>
    );
}

function FileIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

function StarIcon({ className }) {
    return (
        <svg className={className} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
    );
}

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
    );
}

function EyeIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
    );
}
