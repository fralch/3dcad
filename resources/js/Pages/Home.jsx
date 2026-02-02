import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/Components/Public/HeroSection';
import SectionTitle from '@/Components/Public/SectionTitle';
import FileCard from '@/Components/Public/FileCard';
import { categoriesData, getTotalFiles, getPopularElements } from '@/data/categories';

export default function Home({ recentFiles = [] }) {
    // Mock files for visual purposes
    const mockFiles = [
        { id: 1, title: 'Rodamiento SKF 6205', slug: 'rodamiento-skf', category: '3D / Mecánica', format: 'STEP', downloads: 234, likes: 45, author: 'Juan' },
        { id: 2, title: 'Casa Moderna 2 Pisos', slug: 'casa-moderna', category: '3D / Arquitectura', format: 'DWG', downloads: 189, likes: 32, author: 'Maria' },
        { id: 3, title: 'Engranaje Helicoidal Z40', slug: 'engranaje-helicoidal', category: '3D / Mecánica', format: 'STL', downloads: 156, likes: 28, author: 'Pedro' },
        { id: 4, title: 'Sistema HVAC Comercial', slug: 'sistema-hvac', category: '3D / Mecánica', format: 'STEP', downloads: 98, likes: 21, author: 'Ana' },
        { id: 5, title: 'Silla de Oficina Ergonomica', slug: 'silla-oficina', category: '3D / Arquitectura', format: 'OBJ', downloads: 87, likes: 19, author: 'Carlos' },
        { id: 6, title: 'Jardin Paisajista Moderno', slug: 'jardin-moderno', category: '3D / Arquitectura', format: 'SKP', downloads: 221, likes: 56, author: 'Laura' },
        { id: 7, title: 'Reductor de Velocidad', slug: 'reductor-velocidad', category: '3D / Mecánica', format: 'STEP', downloads: 67, likes: 15, author: 'Diego' },
        { id: 8, title: 'Estructura Metalica Nave', slug: 'estructura-nave', category: '3D / Mecánica', format: 'DWG', downloads: 45, likes: 12, author: 'Sofia' },
    ];

    const displayFiles = recentFiles.length > 0 ? recentFiles : mockFiles;
    const popularElements = getPopularElements(6);
    const totalFiles = getTotalFiles();

    return (
        <MainLayout>
            <Head title="Inicio - Archivos 3D CAD y Planos" />

            {/* Hero Section */}
            <HeroSection totalFiles={totalFiles} />

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Explora por Categoría"
                        subtitle="Encuentra exactamente lo que necesitas"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {categoriesData.categories.map((category) => (
                            <div key={category.id} className="bg-gray-50 rounded-2xl p-6">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                        category.slug === '3d'
                                            ? 'bg-gradient-to-br from-yellow-400 to-yellow-500'
                                            : 'bg-gradient-to-br from-blue-400 to-blue-600'
                                    }`}>
                                        {category.slug === '3d' ? (
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                            </svg>
                                        ) : (
                                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                                        <p className="text-gray-500">
                                            {category.subcategories.reduce((acc, sub) =>
                                                acc + sub.elements.reduce((a, el) => a + el.count, 0), 0
                                            )} archivos
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {category.subcategories.map((subcategory) => (
                                        <div key={subcategory.id}>
                                            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                                {subcategory.name}
                                            </h4>
                                            <div className="grid grid-cols-2 gap-2">
                                                {subcategory.elements.map((element) => (
                                                    <Link
                                                        key={element.id}
                                                        href={`/${category.slug}/${subcategory.slug}/${element.slug}`}
                                                        className="flex items-center justify-between bg-white rounded-lg p-3 hover:shadow-md transition-all group"
                                                    >
                                                        <span className="text-gray-700 group-hover:text-yellow-600 font-medium truncate">
                                                            {element.name}
                                                        </span>
                                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                                            {element.count}
                                                        </span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/${category.slug}`}
                                    className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
                                        category.slug === '3d'
                                            ? 'bg-yellow-400 hover:bg-yellow-300 text-zinc-900'
                                            : 'bg-blue-600 hover:bg-blue-500 text-white'
                                    }`}
                                >
                                    Ver todo {category.name}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Elements Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Más Populares"
                        subtitle="Las categorías con más archivos disponibles"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularElements.map((element, index) => (
                            <Link
                                key={element.id}
                                href={`/${element.categorySlug}/${element.subcategorySlug}/${element.slug}`}
                                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group"
                            >
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                                    index === 0 ? 'bg-yellow-100 text-yellow-600' :
                                    index === 1 ? 'bg-blue-100 text-blue-600' :
                                    index === 2 ? 'bg-green-100 text-green-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    <span className="text-lg font-bold">{element.count}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors text-sm">
                                    {element.name}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {element.category} / {element.subcategory}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Files Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Archivos Recientes"
                        subtitle="Los últimos modelos subidos a la plataforma"
                        viewAllLink="/3d"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayFiles.slice(0, 8).map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Comparte tus Diseños
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Sube tus modelos 3D y planos para ayudar a otros profesionales.
                        Tu conocimiento puede ser valioso para la comunidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/upload"
                            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Subir Archivo
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-zinc-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                        >
                            Crear Cuenta Gratis
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            ¿Por qué elegirnos?
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Organizado</h3>
                            <p className="text-gray-500">
                                Categorías bien estructuradas: 3D y Planos, divididos por Mecánica y Arquitectura.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Descarga Fácil</h3>
                            <p className="text-gray-500">
                                Descarga archivos en múltiples formatos: STEP, STL, DWG, OBJ y más.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Gratis</h3>
                            <p className="text-gray-500">
                                Acceso gratuito a {totalFiles} archivos de alta calidad para tus proyectos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
