import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { typesData, getCategoryBySlug } from '@/data/categories';

export default function CategoriesMain({ typeSlug, categorySlug }) {
    const category = getCategoryBySlug(typeSlug, categorySlug);

    if (!category) {
        return (
            <MainLayout>
                <Head title="Categoría no encontrada" />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Categoría no encontrada</h1>
                </div>
            </MainLayout>
        );
    }

    const totalFiles = category.subcategories.reduce((acc, sub) =>
        acc + sub.count, 0
    );

    const is3D = typeSlug === '3d';

    return (
        <MainLayout>
            <Head title={category.name} />

            {/* Page Header */}
            <div className="bg-primary-900 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-xl flex items-center justify-center bg-secondary-500 shadow-lg shadow-secondary-900/20">
                            {is3D ? (
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            ) : (
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold">{category.name}</h1>
                            <p className="text-primary-200 mt-2">
                                {is3D
                                    ? 'Modelos 3D CAD para tus proyectos de ingeniería y diseño'
                                    : 'Planos técnicos y documentación profesional'
                                }
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8">
                        <div>
                            <div className="text-3xl font-bold text-secondary-400">
                                {totalFiles}
                            </div>
                            <div className="text-sm text-primary-300">Archivos totales</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary-400">
                                {category.subcategories.length}
                            </div>
                            <div className="text-sm text-primary-300">Subcategorías</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-secondary-400">
                                {category.subcategories.length}
                            </div>
                            <div className="text-sm text-primary-300">Secciones</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Subcategories */}
                <div className="space-y-12">
                    {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id}>
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">{subcategory.name}</h2>
                                    <p className="text-gray-500 mt-1">
                                        {subcategory.count} archivos
                                    </p>
                                </div>
                                <Link
                                    href={`/${typeSlug}/${subcategory.slug}`}
                                    className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                                >
                                    Ver todo
                                </Link>
                            </div>

                            {/* Elements grid removed as they don't exist in current data structure */}
                            <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-100">
                                <p className="text-gray-600">
                                    {subcategory.count} archivos disponibles en esta subcategoría
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Other Category CTA */}
                <div className={`mt-16 rounded-2xl p-8 ${is3D ? 'bg-primary-50' : 'bg-secondary-50'} border border-gray-100`}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">
                                {is3D ? '¿Buscas planos técnicos?' : '¿Buscas modelos 3D?'}
                            </h3>
                            <p className="text-gray-600 mt-1">
                                {is3D
                                    ? 'Explora nuestra colección de planos y documentación técnica'
                                    : 'Descubre miles de modelos 3D CAD listos para usar'
                                }
                            </p>
                        </div>
                        <Link
                            href={is3D ? '/planos' : '/3d'}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors shadow-md ${
                                is3D
                                    ? 'bg-secondary-500 hover:bg-secondary-400 text-white shadow-secondary-900/20'
                                    : 'bg-primary-500 hover:bg-primary-400 text-white shadow-primary-900/20'
                            }`}
                        >
                            {is3D ? 'Ver Planos' : 'Ver 3D'}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
