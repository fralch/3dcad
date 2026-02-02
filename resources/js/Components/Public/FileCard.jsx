import { Link } from '@inertiajs/react';

export default function FileCard({ file }) {
    // Default/mock data for visual purposes
    const defaultFile = {
        id: 1,
        title: 'Modelo 3D',
        slug: 'modelo-3d',
        thumbnail: null,
        category: 'General',
        format: 'STL',
        downloads: 0,
        likes: 0,
        author: 'Usuario',
        created_at: new Date().toISOString(),
        ...file
    };

    return (
        <Link
            href={`/files/${defaultFile.slug}`}
            className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
        >
            {/* Thumbnail */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                {defaultFile.thumbnail ? (
                    <img
                        src={defaultFile.thumbnail}
                        alt={defaultFile.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                        <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                )}

                {/* Format badge */}
                <div className="absolute top-3 left-3">
                    <span className="bg-yellow-400 text-zinc-900 text-xs font-bold px-2 py-1 rounded">
                        {defaultFile.format}
                    </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="bg-white/90 backdrop-blur-sm text-zinc-900 px-4 py-2 rounded-lg font-semibold shadow-lg">
                            Ver Detalles
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {defaultFile.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">{defaultFile.category}</p>

                {/* Stats */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            {defaultFile.downloads}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {defaultFile.likes}
                        </span>
                    </div>
                    <span className="text-xs text-gray-400">{defaultFile.author}</span>
                </div>
            </div>
        </Link>
    );
}
