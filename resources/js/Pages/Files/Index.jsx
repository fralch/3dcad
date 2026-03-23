import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';

export default function FilesIndex({ type, category, subcategory, categorySlug, subcategorySlug, elementSlug, files = [] }) {
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('recent');

    const is3D = categorySlug === '3d';

    const displayFiles = files?.data || files || [];

    if (!type || !category || !subcategory) {
        return (
            <MainLayout>
                <Head title="Archivos no encontrados" />
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Sección no encontrada</h1>
                        <p className="text-gray-500 mb-6">La categoría que buscas no existe o fue movida.</p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={`${subcategory.name} - ${category.name} - ${type.name}`} />

            {/* Hero Header */}
            <div className="bg-primary-900 text-white py-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/" className="text-primary-200 hover:text-white transition-colors">
                            Inicio
                        </Link>
                        <ChevronIcon className="w-4 h-4 text-primary-400" />
                        <Link href={`/${categorySlug}`} className="text-primary-200 hover:text-white transition-colors">
                            {type.name}
                        </Link>
                        <ChevronIcon className="w-4 h-4 text-primary-400" />
                        <Link href={`/${categorySlug}/${subcategorySlug}`} className="text-primary-200 hover:text-white transition-colors">
                            {category.name}
                        </Link>
                        <ChevronIcon className="w-4 h-4 text-primary-400" />
                        <span className="text-secondary-400">{subcategory.name}</span>
                    </nav>

                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-secondary-500 shadow-lg shadow-secondary-900/20">
                                <CubeIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary-800 text-primary-200 border border-primary-700">
                                        {type.name}
                                    </span>
                                    <span className="text-xs text-primary-500">•</span>
                                    <span className="text-xs text-primary-300">{category.name}</span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold">{subcategory.name}</h1>
                            </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-secondary-400">{subcategory.files_count || 0}</p>
                                <p className="text-primary-300">Archivos</p>
                            </div>
                            <div className="w-px h-10 bg-primary-800"></div>
                            <div className="text-center">
                                <p className="text-2xl font-bold text-secondary-400">{Math.floor((subcategory.files_count || 0) * 15)}</p>
                                <p className="text-primary-300">Descargas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-8">
                {/* Filters Bar */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-900">{displayFiles.length}</span> de{' '}
                                <span className="font-semibold text-gray-900">{subcategory.files_count || 0}</span> archivos
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            >
                                <option value="recent">Más recientes</option>
                                <option value="popular">Más populares</option>
                                <option value="downloads">Más descargados</option>
                                <option value="name">Nombre A-Z</option>
                            </select>


                            {/* View Toggle */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-white shadow-sm text-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <GridIcon className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-md transition-colors ${
                                        viewMode === 'list'
                                            ? 'bg-white shadow-sm text-gray-900'
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    <ListIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Files Grid */}
                {displayFiles.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CubeIcon className="w-10 h-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">No hay archivos todavía</h3>
                        <p className="text-gray-500 mb-6">Sé el primero en subir un archivo a esta subcategoría.</p>
                        <Link
                            href="/upload"
                            className="inline-flex items-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Subir Archivo
                        </Link>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayFiles.map((file) => (
                            <Link
                                key={file.id}
                                href={`/files/${file.slug}`}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-50 relative overflow-hidden">
                                    {file.thumbnail_path ? (
                                        <img 
                                            src={`/storage/${file.thumbnail_path}`} 
                                            alt={file.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <CubeIcon className="w-20 h-20 text-gray-200 group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    )}
                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        {file.isFeatured && (
                                            <span className="px-2 py-1 bg-secondary-400 text-white text-xs font-bold rounded-md shadow-sm">
                                                Destacado
                                            </span>
                                        )}
                                        <span className="px-2 py-1 text-xs font-bold rounded-md bg-zinc-900 text-white shadow-sm uppercase">
                                            {file.file_type || 'N/A'}
                                        </span>
                                    </div>
                                    {/* Quick Actions */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-3">
                                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-secondary-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                            <HeartIcon className="w-5 h-5" />
                                        </button>
                                        <button className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white hover:bg-secondary-400 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <DownloadIcon className="w-6 h-6" />
                                        </button>
                                        <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                            <EyeIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                                {/* Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                                        {file.title}
                                    </h3>
                                    <div className="flex justify-between items-center mt-1">
                                        <p className="text-xs text-gray-500">por {file.user?.name || 'Usuario'}</p>
                                        <span className="text-xs text-gray-400">{(file.file_size / 1024 / 1024).toFixed(2)} MB</span>
                                    </div>
                                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
                                        <span className="flex items-center gap-1">
                                            <DownloadIcon className="w-4 h-4" />
                                            {file.downloads || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HeartIcon className="w-4 h-4" />
                                            {file.likes || 0}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="space-y-4">
                        {displayFiles.map((file) => (
                            <Link
                                key={file.id}
                                href={`/files/${file.slug}`}
                                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4 border border-gray-100"
                            >
                                {/* Thumbnail */}
                                <div className="w-40 h-28 bg-gradient-to-br from-gray-100 to-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                                    {file.thumbnail_path ? (
                                        <img 
                                            src={`/storage/${file.thumbnail_path}`} 
                                            alt={file.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    ) : (
                                        <CubeIcon className="w-12 h-12 text-gray-200" />
                                    )}
                                    {file.isFeatured && (
                                        <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-secondary-400 text-white text-xs font-bold rounded shadow-sm">
                                            Destacado
                                        </span>
                                    )}
                                </div>
                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-primary-600 transition-colors">
                                                {file.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{file.description}</p>
                                        </div>
                                        <span className="px-3 py-1 text-sm font-bold rounded-lg flex-shrink-0 bg-zinc-900 text-white uppercase">
                                            {file.file_type || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-6 mt-4 text-sm text-gray-500">
                                        <span>por <strong className="text-gray-700">{file.user?.name || 'Usuario'}</strong></span>
                                        <span className="flex items-center gap-1">
                                            <DownloadIcon className="w-4 h-4" />
                                            {file.downloads || 0} descargas
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <HeartIcon className="w-4 h-4" />
                                            {file.likes || 0}
                                        </span>
                                        <span>{(file.file_size / 1024 / 1024).toFixed(2)} MB</span>
                                        <span className="text-gray-400">{new Date(file.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {files?.links && files.links.length > 3 && (
                    <div className="mt-10 flex justify-center">
                        <nav className="flex items-center gap-1 flex-wrap">
                            {files.links.map((link, i) => (
                                <Link
                                    key={i}
                                    href={link.url || '#'}
                                    className={`px-4 py-2 flex items-center justify-center rounded-lg transition-colors ${
                                        link.active
                                            ? 'bg-secondary-500 text-white font-semibold shadow-lg shadow-secondary-900/20'
                                            : link.url
                                            ? 'text-gray-600 hover:bg-gray-100'
                                            : 'text-gray-400 cursor-not-allowed'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}

                {/* Related Categories */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Otras subcategorías en {category.name}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {(category.subcategories || [])
                            .filter((subcat) => subcat.slug !== elementSlug)
                            .slice(0, 4)
                            .map((subcat) => (
                                <Link
                                    key={subcat.slug}
                                    href={`/${categorySlug}/${subcategorySlug}/${subcat.slug}`}
                                    className="p-4 rounded-xl border-2 transition-colors border-gray-200 hover:border-secondary-400 hover:bg-secondary-50"
                                >
                                    <h3 className="font-medium text-gray-900">{subcat.name}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{subcat.files_count || 0} archivos</p>
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

// Icons
function ChevronIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}

function CubeIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

function ListIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
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

function HeartIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
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

function ChevronLeftIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
    );
}

function ChevronRightIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    );
}
