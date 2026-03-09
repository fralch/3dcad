import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import FileCard from '@/Components/Public/FileCard';
import SearchFilters from '@/Components/Public/SearchFilters';

export default function CategoryShow({ category = null, files = [] }) {
    // Mock data for visual purposes
    const mockCategory = {
        id: 1,
        name: 'Mecanico',
        slug: 'mecanico',
        description: 'Encuentra modelos 3D de piezas mecanicas como engranajes, rodamientos, tornillos, tuercas, poleas y todo tipo de componentes para proyectos de ingenieria mecanica.',
        files_count: 234,
        color: 'secondary',
        ...category
    };

    const mockFiles = [
        { id: 1, title: 'Engranaje Helicoidal', slug: 'engranaje-helicoidal', category: 'Mecanico', format: 'STL', downloads: 876, likes: 54, author: 'Pedro' },
        { id: 2, title: 'Rodamiento SKF 6205', slug: 'rodamiento-skf', category: 'Mecanico', format: 'STEP', downloads: 654, likes: 43, author: 'Ana' },
        { id: 3, title: 'Tornillo M8x30', slug: 'tornillo-m8', category: 'Mecanico', format: 'STL', downloads: 543, likes: 38, author: 'Carlos' },
        { id: 4, title: 'Polea de Transmision', slug: 'polea-transmision', category: 'Mecanico', format: 'STEP', downloads: 432, likes: 32, author: 'Laura' },
        { id: 5, title: 'Eje Cardanico', slug: 'eje-cardanico', category: 'Mecanico', format: 'STEP', downloads: 389, likes: 28, author: 'Diego' },
        { id: 6, title: 'Soporte de Monitor', slug: 'soporte-monitor', category: 'Mecanico', format: 'OBJ', downloads: 321, likes: 25, author: 'Sofia' },
        { id: 7, title: 'Brida de Acero', slug: 'brida-acero', category: 'Mecanico', format: 'STEP', downloads: 287, likes: 21, author: 'Roberto' },
        { id: 8, title: 'Valvula de Bola', slug: 'valvula-bola', category: 'Mecanico', format: 'STL', downloads: 256, likes: 19, author: 'Carmen' },
    ];

    const displayCategory = category || mockCategory;
    const displayFiles = files.length > 0 ? files : mockFiles;

    return (
        <MainLayout>
            <Head title={displayCategory.name} />

            {/* Page Header */}
            <div className="bg-primary-900 text-white py-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-4">
                        <Link href="/" className="text-primary-200 hover:text-white transition-colors">Inicio</Link>
                        <span className="text-primary-400">/</span>
                        <Link href="/categories" className="text-primary-200 hover:text-white transition-colors">Categorias</Link>
                        <span className="text-primary-400">/</span>
                        <span className="text-secondary-400">{displayCategory.name}</span>
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-secondary-900/20">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">{displayCategory.name}</h1>
                            <p className="text-primary-200 mt-2 max-w-2xl">{displayCategory.description}</p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-8">
                        <div>
                            <div className="text-2xl font-bold text-secondary-400">{displayCategory.files_count}</div>
                            <div className="text-sm text-primary-300">Archivos</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-secondary-400">12.5K</div>
                            <div className="text-sm text-primary-300">Descargas</div>
                        </div>
                        <div>
                            <div className="text-2xl font-bold text-secondary-400">45</div>
                            <div className="text-sm text-primary-300">Contribuidores</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {/* Filters */}
                <SearchFilters />

                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-gray-600">
                        Mostrando <span className="font-semibold text-gray-900">{displayFiles.length}</span> archivos
                    </p>
                </div>

                {/* Files Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayFiles.map((file) => (
                        <FileCard key={file.id} file={file} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <nav className="flex items-center gap-1">
                        <button className="px-3 py-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className="px-4 py-2 bg-secondary-500 text-white rounded-lg font-semibold shadow-md shadow-secondary-900/20">1</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">2</button>
                        <button className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">3</button>
                        <button className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </MainLayout>
    );
}
