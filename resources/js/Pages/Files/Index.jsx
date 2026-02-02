import { Head } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import FileCard from '@/Components/Public/FileCard';
import Sidebar from '@/Components/Public/Sidebar';
import SearchFilters from '@/Components/Public/SearchFilters';

export default function FilesIndex({ files = [], categories = [], pagination = null }) {
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    // Mock data for visual purposes
    const mockFiles = [
        { id: 1, title: 'Motor V8 Completo', slug: 'motor-v8', category: 'Automotriz', format: 'STEP', downloads: 1234, likes: 89, author: 'Juan' },
        { id: 2, title: 'Casa Moderna Minimalista', slug: 'casa-moderna', category: 'Arquitectura', format: 'DWG', downloads: 987, likes: 67, author: 'Maria' },
        { id: 3, title: 'Engranaje Helicoidal', slug: 'engranaje-helicoidal', category: 'Mecanico', format: 'STL', downloads: 876, likes: 54, author: 'Pedro' },
        { id: 4, title: 'Caja de PCB Arduino', slug: 'caja-pcb', category: 'Electronica', format: 'STL', downloads: 765, likes: 43, author: 'Ana' },
        { id: 5, title: 'Turbina Industrial', slug: 'turbina-industrial', category: 'Industrial', format: 'STEP', downloads: 654, likes: 38, author: 'Carlos' },
        { id: 6, title: 'Soporte de Monitor', slug: 'soporte-monitor', category: 'Mecanico', format: 'OBJ', downloads: 543, likes: 32, author: 'Laura' },
        { id: 7, title: 'Drone Frame', slug: 'drone-frame', category: 'Aeroespacial', format: 'STL', downloads: 432, likes: 28, author: 'Diego' },
        { id: 8, title: 'Lampara Geometrica', slug: 'lampara-geometrica', category: 'Arte y Diseno', format: 'OBJ', downloads: 321, likes: 25, author: 'Sofia' },
        { id: 9, title: 'Valvula Hidraulica', slug: 'valvula-hidraulica', category: 'Industrial', format: 'STEP', downloads: 289, likes: 21, author: 'Roberto' },
        { id: 10, title: 'Carcasa de Telefono', slug: 'carcasa-telefono', category: 'Electronica', format: 'STL', downloads: 267, likes: 19, author: 'Carmen' },
        { id: 11, title: 'Puente Colgante', slug: 'puente-colgante', category: 'Arquitectura', format: 'DWG', downloads: 245, likes: 17, author: 'Luis' },
        { id: 12, title: 'Rodamiento SKF', slug: 'rodamiento-skf', category: 'Mecanico', format: 'STEP', downloads: 234, likes: 15, author: 'Elena' },
    ];

    const displayFiles = files.length > 0 ? files : mockFiles;

    const handleFilterChange = (filters) => {
        console.log('Filters changed:', filters);
        // Here you would make an Inertia request with the filters
    };

    return (
        <MainLayout>
            <Head title="Archivos 3D" />

            {/* Page Header */}
            <div className="bg-zinc-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Archivos 3D</h1>
                    <p className="text-gray-400">
                        Explora nuestra coleccion de modelos 3D CAD
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Filters */}
                        <SearchFilters onFilterChange={handleFilterChange} />

                        {/* Results Header */}
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-gray-600">
                                <span className="font-semibold text-gray-900">{displayFiles.length}</span> archivos encontrados
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-colors ${
                                        viewMode === 'grid'
                                            ? 'bg-yellow-100 text-yellow-700'
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
                                            ? 'bg-yellow-100 text-yellow-700'
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
                                    <div key={file.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-4 flex gap-4">
                                        <div className="w-32 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900 hover:text-yellow-600 transition-colors">
                                                        {file.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500 mt-1">{file.category}</p>
                                                </div>
                                                <span className="bg-yellow-400 text-zinc-900 text-xs font-bold px-2 py-1 rounded flex-shrink-0">
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
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-8 flex justify-center">
                            <nav className="flex items-center gap-1">
                                <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button className="px-4 py-2 bg-yellow-400 text-zinc-900 rounded-lg font-semibold">1</button>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">3</button>
                                <span className="px-2 text-gray-400">...</span>
                                <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">10</button>
                                <button className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        <Sidebar categories={categories} />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
