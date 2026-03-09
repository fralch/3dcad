import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/Components/Public/HeroSection';
import SectionTitle from '@/Components/Public/SectionTitle';
import FileCard from '@/Components/Public/FileCard';

export default function Home({ recentFiles = [], types = [], popularSubcategories = [], homeStats = {} }) {
    const displayFiles = recentFiles;

    const fallbackTotalFiles = types.reduce((acc, type) => 
        acc + type.categories.reduce((catAcc, cat) => 
            catAcc + cat.subcategories.reduce((subAcc, sub) => subAcc + (sub.files_count || 0), 0)
        , 0)
    , 0);
    const fallbackTotalSubcategories = types.reduce(
        (acc, type) => acc + type.categories.reduce((catAcc, cat) => catAcc + cat.subcategories.length, 0),
        0
    );
    const fallbackTotalTypes = types.length;
    const totalFiles = homeStats.totalFiles ?? fallbackTotalFiles;
    const totalSubcategories = homeStats.totalSubcategories ?? fallbackTotalSubcategories;
    const totalTypes = homeStats.totalTypes ?? fallbackTotalTypes;

    return (
        <MainLayout>
            <Head title="Inicio - Archivos 3D CAD y Planos" />

            <HeroSection
                totalFiles={totalFiles}
                totalSubcategories={totalSubcategories}
                totalTypes={totalTypes}
            />

            {/* Types Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Explora por Tipo"
                        subtitle="Encuentra exactamente lo que necesitas"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {types.map((type) => {
                            const is3D = type.slug === '3d';
                            const totalTypeFiles = type.categories.reduce((acc, cat) =>
                                acc + cat.subcategories.reduce((a, sub) => a + (sub.files_count || 0), 0), 0
                            );

                            return (
                                <div key={type.id} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                            is3D ? 'bg-gradient-to-br from-primary-400 to-primary-600' : 'bg-gradient-to-br from-secondary-400 to-secondary-600'
                                        }`}>
                                            {is3D ? (
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
                                            <h3 className="text-2xl font-bold text-gray-900">{type.name}</h3>
                                            <p className="text-gray-500">{totalTypeFiles} archivos</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {type.categories.map((category) => (
                                            <div key={category.id}>
                                                <Link
                                                    href={`/${type.slug}/${category.slug}`}
                                                    className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2 block hover:text-primary-600"
                                                >
                                                    {category.name}
                                                </Link>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {category.subcategories.map((sub) => (
                                                        <Link
                                                            key={sub.id}
                                                            href={`/${type.slug}/${category.slug}/${sub.slug}`}
                                                            className="flex items-center justify-between bg-white rounded-lg p-3 hover:shadow-md transition-all group border border-gray-100"
                                                        >
                                                            <span className="text-gray-700 group-hover:text-primary-600 font-medium truncate text-sm">
                                                                {sub.name}
                                                            </span>
                                                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full ml-2 flex-shrink-0">
                                                                {sub.files_count || 0}
                                                            </span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/${type.slug}`}
                                        className={`mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all shadow-lg ${
                                            is3D 
                                                ? 'bg-primary-600 hover:bg-primary-500 text-white shadow-primary-900/20' 
                                                : 'bg-secondary-500 hover:bg-secondary-400 text-white shadow-secondary-900/20'
                                        }`}
                                    >
                                        Ver todo {type.name}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Popular Subcategories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Más Populares"
                        subtitle="Las subcategorías con más archivos"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularSubcategories.map((sub, index) => (
                            <Link
                                key={sub.id}
                                href={`/${sub.category?.type?.slug}/${sub.category?.slug}/${sub.slug}`}
                                className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-all group border border-gray-100"
                            >
                                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                                    index === 0 ? 'bg-primary-100 text-primary-600' :
                                    index === 1 ? 'bg-secondary-100 text-secondary-600' :
                                    index === 2 ? 'bg-green-100 text-green-600' :
                                    'bg-gray-100 text-gray-600'
                                }`}>
                                    <span className="text-lg font-bold">{sub.files_count}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors text-sm">
                                    {sub.name}
                                </h4>
                                <p className="text-xs text-gray-500 mt-1">
                                    {sub.category?.type?.name} / {sub.category?.name}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Files */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Archivos Recientes"
                        subtitle="Los últimos modelos subidos"
                        viewAllLink="/3d"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayFiles.slice(0, 8).map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-primary-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Comparte tus Diseños</h2>
                    <p className="text-primary-200 text-lg mb-8 max-w-2xl mx-auto">
                        Sube tus modelos 3D y planos para ayudar a otros profesionales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/upload"
                            className="inline-flex items-center justify-center gap-2 bg-secondary-500 hover:bg-secondary-400 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all shadow-lg shadow-secondary-900/20"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            Subir Archivo
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 border-2 border-primary-700 hover:border-primary-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                        >
                            Crear Cuenta Gratis
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegirnos?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Organizado</h3>
                            <p className="text-gray-500">Tipos, categorías y subcategorías bien estructuradas.</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-secondary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Descarga Fácil</h3>
                            <p className="text-gray-500">Múltiples formatos: STEP, STL, DWG, OBJ y más.</p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm border border-gray-100">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Gratis</h3>
                            <p className="text-gray-500">Acceso gratuito a {totalFiles} archivos de alta calidad.</p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
