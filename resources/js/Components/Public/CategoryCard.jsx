import { Link } from '@inertiajs/react';

export default function CategoryCard({ category }) {
    // Default/mock data for visual purposes
    const defaultCategory = {
        id: 1,
        name: 'Categoria',
        slug: 'categoria',
        icon: null,
        files_count: 0,
        color: 'yellow',
        ...category
    };

    const colorClasses = {
        yellow: 'from-yellow-400 to-yellow-500',
        blue: 'from-blue-400 to-blue-600',
        red: 'from-red-400 to-red-600',
        green: 'from-green-400 to-green-600',
        purple: 'from-purple-400 to-purple-600',
        pink: 'from-pink-400 to-pink-600',
        orange: 'from-orange-400 to-orange-600',
        cyan: 'from-cyan-400 to-cyan-600',
    };

    const gradientClass = colorClasses[defaultCategory.color] || colorClasses.yellow;

    return (
        <Link
            href={`/categories/${defaultCategory.slug}`}
            className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden p-6"
        >
            {/* Icon */}
            <div className={`w-14 h-14 bg-gradient-to-br ${gradientClass} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {defaultCategory.icon ? (
                    <img src={defaultCategory.icon} alt="" className="w-8 h-8" />
                ) : (
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                )}
            </div>

            {/* Content */}
            <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                {defaultCategory.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">
                {defaultCategory.files_count} archivos
            </p>

            {/* Arrow */}
            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </div>
        </Link>
    );
}
