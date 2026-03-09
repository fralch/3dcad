import { Link } from '@inertiajs/react';

export default function SectionTitle({ title, subtitle, viewAllLink, viewAllText = 'Ver todos' }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
                {subtitle && (
                    <p className="text-gray-500 mt-2">{subtitle}</p>
                )}
            </div>
            {viewAllLink && (
                <Link
                    href={viewAllLink}
                    className="inline-flex items-center gap-2 text-secondary-600 hover:text-secondary-700 font-semibold transition-colors group"
                >
                    {viewAllText}
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            )}
        </div>
    );
}
