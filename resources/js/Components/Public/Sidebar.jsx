import { Link } from '@inertiajs/react';
import { typesData, getPopularSubcategories } from '@/data/categories';

export default function Sidebar() {
    const popularSubcategories = getPopularSubcategories(5);

    return (
        <aside className="space-y-6">
            {/* Types & Categories */}
            {typesData.types.map((type) => (
                <div key={type.id} className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        {type.slug === '3d' ? (
                            <svg className="w-5 h-5 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        )}
                        {type.name}
                    </h3>
                    <div className="space-y-4">
                        {type.categories.map((category) => (
                            <div key={category.id}>
                                <Link
                                    href={`/${type.slug}/${category.slug}`}
                                    className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block hover:text-secondary-600"
                                >
                                    {category.name}
                                </Link>
                                <ul className="space-y-1">
                                    {category.subcategories.map((sub) => (
                                        <li key={sub.id}>
                                            <Link
                                                href={`/${type.slug}/${category.slug}/${sub.slug}`}
                                                className="flex items-center justify-between py-1.5 text-gray-600 hover:text-secondary-600 transition-colors group"
                                            >
                                                <span className="group-hover:translate-x-1 transition-transform text-sm">
                                                    {sub.name}
                                                </span>
                                                <span className="text-xs bg-gray-100 group-hover:bg-secondary-100 text-gray-500 group-hover:text-secondary-700 px-2 py-0.5 rounded-full transition-colors">
                                                    {sub.count}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <Link
                        href={`/${type.slug}`}
                        className={`block mt-4 pt-4 border-t border-gray-100 text-sm font-medium ${
                            type.slug === '3d' ? 'text-secondary-600 hover:text-secondary-700' : 'text-primary-600 hover:text-primary-700'
                        }`}
                    >
                        Ver todo {type.name}
                    </Link>
                </div>
            ))}

            {/* Popular Subcategories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Más Populares</h3>
                <ul className="space-y-3">
                    {popularSubcategories.map((sub, index) => (
                        <li key={sub.id}>
                            <Link
                                href={`/${sub.typeSlug}/${sub.categorySlug}/${sub.slug}`}
                                className="flex items-start gap-3 group"
                            >
                                <span className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                                    index === 0 ? 'bg-secondary-100 text-secondary-700' :
                                    index === 1 ? 'bg-primary-100 text-primary-700' :
                                    index === 2 ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                }`}>
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-secondary-600 truncate transition-colors">
                                        {sub.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {sub.type} / {sub.category}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {sub.count} archivos
                                    </p>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-xl p-6 text-center">
                <h3 className="font-bold text-zinc-900 mb-2">Comparte tus modelos</h3>
                <p className="text-sm text-secondary-900 mb-4">
                    Sube tus archivos 3D y planos
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
