import { Head, Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function CategoriesSubcategory({ type, category, categorySlug, subcategorySlug }) {
    if (!type || !category) {
        return (
            <MainLayout>
                <Head title="Categoría no encontrada" />
                <div className="container mx-auto px-4 py-20 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">Categoría no encontrada</h1>
                </div>
            </MainLayout>
        );
    }

    const totalFiles = category.subcategories.reduce((a, sub) => a + (sub.files_count || 0), 0);
    const is3D = type.slug === '3d';

    return (
        <MainLayout>
            <Head title={`${category.name} - ${type.name}`} />

            {/* Page Header */}
            <div className={`${is3D ? 'bg-zinc-900' : 'bg-blue-900'} text-white py-12`}>
                <div className="container mx-auto px-4">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm mb-6">
                        <Link href="/" className="text-gray-400 hover:text-white transition-colors">Inicio</Link>
                        <span className="text-gray-600">/</span>
                        <Link href={`/${type.slug}`} className="text-gray-400 hover:text-white transition-colors">
                            {type.name}
                        </Link>
                        <span className="text-gray-600">/</span>
                        <span className={is3D ? 'text-secondary-400' : 'text-blue-300'}>{category.name}</span>
                    </nav>

                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                            is3D ? 'bg-yellow-400' : 'bg-blue-400'
                        }`}>
                            <svg className={`w-8 h-8 ${is3D ? 'text-zinc-900' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className={`text-sm px-2 py-0.5 rounded ${
                                    is3D ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-400/20 text-blue-300'
                                }`}>
                                    {type.name}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold">{category.name}</h1>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8 mt-6">
                        <div>
                            <div className={`text-2xl font-bold ${is3D ? 'text-yellow-400' : 'text-blue-300'}`}>
                                {totalFiles}
                            </div>
                            <div className="text-sm text-gray-400">Archivos</div>
                        </div>
                        <div>
                            <div className={`text-2xl font-bold ${is3D ? 'text-yellow-400' : 'text-blue-300'}`}>
                                {category.subcategories.length}
                            </div>
                            <div className="text-sm text-gray-400">Subcategorías</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Elements Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {category.subcategories.map((sub) => (
                        <Link
                            key={sub.id}
                            href={`/${type.slug}/${category.slug}/${sub.slug}`}
                            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all group border border-gray-100"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                    is3D ? 'bg-yellow-100' : 'bg-blue-100'
                                }`}>
                                    <svg className={`w-7 h-7 ${is3D ? 'text-yellow-600' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                    </svg>
                                </div>
                                <span className={`text-2xl font-bold ${is3D ? 'text-yellow-500' : 'text-blue-500'}`}>
                                    {sub.files_count || 0}
                                </span>
                            </div>

                            <h3 className={`text-lg font-semibold text-gray-900 group-hover:${is3D ? 'text-yellow-600' : 'text-blue-600'} transition-colors mb-2`}>
                                {sub.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                                {sub.files_count || 0} archivos disponibles
                            </p>

                            <div className={`mt-4 flex items-center gap-2 text-sm font-medium ${
                                is3D ? 'text-yellow-600' : 'text-blue-600'
                            }`}>
                                Ver archivos
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Back Link */}
                <div className="mt-12 text-center">
                    <Link
                        href={`/${type.slug}`}
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Volver a {type.name}
                    </Link>
                </div>
            </div>
        </MainLayout>
    );
}
