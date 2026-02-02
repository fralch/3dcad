import { Link } from '@inertiajs/react';
import { categoriesData, getPopularElements } from '@/data/categories';

export default function Sidebar({ popularFiles = [] }) {
    const popularElements = getPopularElements(5);

    return (
        <aside className="space-y-6">
            {/* Categories */}
            {categoriesData.categories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        {category.slug === '3d' ? (
                            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        {category.name}
                    </h3>
                    <div className="space-y-4">
                        {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    {subcategory.name}
                                </div>
                                <ul className="space-y-1">
                                    {subcategory.elements.map((element) => (
                                        <li key={element.id}>
                                            <Link
                                                href={`/${category.slug}/${subcategory.slug}/${element.slug}`}
                                                className="flex items-center justify-between py-1.5 text-gray-600 hover:text-yellow-600 transition-colors group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform text-sm">
                                                    {element.name}
                                                </span>
                                                <span className="text-xs bg-gray-100 group-hover:bg-yellow-100 text-gray-500 group-hover:text-yellow-700 px-2 py-0.5 rounded-full transition-colors">
                                                    {element.count}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${category.slug}`}
                        className={`block mt-4 pt-4 border-t border-gray-100 text-sm font-medium ${
                            category.slug === '3d' ? 'text-yellow-600 hover:text-yellow-700' : 'text-blue-600 hover:text-blue-700'
                        }`}
                    >
                        Ver todo {category.name}
                    </Link>
                </div>
            ))}

            {/* Popular Elements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Más Populares</h3>
                <ul className="space-y-3">
                    {popularElements.map((element, index) => (
                        <li key={element.id}>
                            <Link
                                href={`/${element.categorySlug}/${element.subcategorySlug}/${element.slug}`}
                                className="flex items-start gap-3 group"
                            >
                                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-blue-100 text-blue-700' :
                                    index === 2 ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-yellow-600 truncate transition-colors">
                                        {element.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {element.category} / {element.subcategory}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {element.count} archivos
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-xl p-6 text-center">
                <h3 className="font-bold text-zinc-900 mb-2">Comparte tus modelos</h3>
                <p className="text-sm text-yellow-900 mb-4">
                    Sube tus archivos 3D y planos para ayudar a la comunidad
                </p>
                <Link
                    href="/upload"
                    className="inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Subir Archivo
                </Link>
            </div>
        </aside>
    );
}
