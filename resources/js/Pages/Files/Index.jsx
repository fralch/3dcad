import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import FileCard from '@/Components/Public/FileCard';
import Sidebar from '@/Components/Public/Sidebar';
import SearchFilters from '@/Components/Public/SearchFilters';
import { getCategoryBySlug, getSubcategoryBySlug } from '@/data/categories';

export default function FilesIndex({ categorySlug, subcategorySlug, elementSlug, files = [] }) {
    const [viewMode, setViewMode] = useState('grid');

    const category = getCategoryBySlug(categorySlug);
    const subcategory = getSubcategoryBySlug(categorySlug, subcategorySlug);
    const element = subcategory?.elements.find(el => el.slug === elementSlug);

    const is3D = categorySlug === '3d';

    // Mock files based on the element
    const mockFiles = element ? Array.from({ length: element.count > 12 ? 12 : element.count }, (_, i) => ({
        id: i + 1,
        title: `${element.name} - Modelo ${i + 1}`,
        slug: `${elementSlug}-modelo-${i + 1}`,
        category: `${category?.name} / ${subcategory?.name}`,
        format: ['STEP', 'STL', 'DWG', 'OBJ', 'FBX'][Math.floor(Math.random() * 5)],
        downloads: Math.floor(Math.random() * 500) + 10,
        likes: Math.floor(Math.random() * 100) + 5,
        author: ['Juan', 'Maria', 'Pedro', 'Ana', 'Carlos'][Math.floor(Math.random() * 5)],
    })) : [];

    const displayFiles = files.length > 0 ? files : mockFiles;

    if (!category || !subcategory || !element) {
        return (
            <MainLayout>
                <Head title="Archivos no encontrados" />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Sección no encontrada</h1>
                    <Link href="/" className="mt-4 inline-block text-yellow-600 hover:text-yellow-700">
                        Volver al inicio
                    </Link>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <Head title={`${element.name} - ${subcategory.name} - ${category.name}`} />

            {/* Page Header */}
            <div className={`${is3D ? 'bg-zinc-900' : 'bg-blue-900'} text-white py-12`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link>
                        <span className="text-gray-600">/</span>
                        <Link href={`/${categorySlug}`} className="text-gray-400 hover:text-white transition-colors">
                            {category.name}
                        </Link>
                        <span className="text-gray-600">/</span>
                        <Link href={`/${categorySlug}/${subcategorySlug}`} className="text-gray-400 hover:text-white transition-colors">
                            {subcategory.name}
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className={is3D ? 'text-yellow-400' : 'text-blue-300'}>{element.name}</span>
                    </nav>

                    <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                            is3D ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}>
                            <svg className={`w-7 h-7 ${is3D ? 'text-zinc-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                    is3D ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-400/20 text-blue-300'
                                }`}>
                                    {category.name}
                                </span>
                                <span className="text-gray-500">/</span>
                                <span className="text-xs text-gray-400">{subcategory.name}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold">{element.name}</h1>
                            <p className="text-gray-400 mt-1">{element.count} archivos disponibles</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Filters */}
                        <SearchFilters />

                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                Mostrando <span className="font-semibold text-gray-900">{displayFiles.length}</span> de{' '}
                                <span className="font-semibold text-gray-900">{element.count}</span> archivos
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === 'grid'
                                            ? is3D ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === 'list'
                                            ? is3D ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                                            : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Files Grid/List */}
                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayFiles.map((file) => (
                                    <FileCard key={file.id} file={file} />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {displayFiles.map((file) => (
                                    <Link
                                        key={file.id}
                                        href={`/file/${file.slug}`}
                                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4"
                                    >
                                        <div className="w-32 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className={`font-semibold text-gray-900 hover:${is3D ? 'text-yellow-600' : 'text-blue-600'} transition-colors`}>
                                                        {file.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">{file.category}</p>
                                                </div>
                                                <span className={`${is3D ? 'bg-yellow-400' : 'bg-blue-500'} text-${is3D ? 'zinc-900' : 'white'} text-xs font-bold px-2 py-1 rounded flex-shrink-0`}>
                                                    {file.format}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                    {file.downloads}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                    </svg>
                                                    {file.likes}
                                                </span>
                                                <span>por {file.author}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {element.count > 12 && (
                            <div className="mt-8 flex justify-center">
                                <nav className="flex items-center gap-1">
                                    <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <button className={`px-4 py-2 ${is3D ? 'bg-yellow-400 text-zinc-900' : 'bg-blue-500 text-white'} rounded-lg font-semibold`}>1</button>
                                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">3</button>
                                    <span className="px-2 text-gray-400">...</span>
                                    <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                        {Math.ceil(element.count / 12)}
                                    </button>
                                    <button className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <Sidebar />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
