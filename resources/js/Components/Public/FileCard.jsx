import { Link } from '@inertiajs/react';

export default function FileCard({ file }) {
    // Determine category name regardless of whether it's an object (real data) or string (mock)
    const categoryName = file?.category?.name || file?.category || 'General';
    
    // Determine author name
    const authorName = file?.user?.name || file?.author || 'Usuario';

    // Determine format
    const fileFormat = file?.file_type || file?.format || 'STL';

    // Default/mock data for visual purposes
    const defaultFile = {
        id: 1,
        title: 'Modelo 3D',
        slug: 'modelo-3d',
        thumbnail: null,
        downloads: 0,
        likes: 0,
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
                {defaultFile.thumbnail || defaultFile.thumbnail_path ? (
                    <img
                        src={defaultFile.thumbnail || `/storage/${defaultFile.thumbnail_path}`}
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
                <div className="absolute top-3 left-3 flex gap-2">
                    {defaultFile.is_featured && (
                        <span className="bg-secondary-400 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                            Destacado
                        </span>
                    )}
                    <span className="bg-zinc-900 text-white text-xs font-bold px-2 py-1 rounded shadow-sm uppercase">
                        {fileFormat}
                    </span>
                </div>

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3">
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-secondary-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                    <button className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center text-white hover:bg-secondary-400 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </button>
                    <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-primary-500 transition-colors shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                    {defaultFile.title}
                </h3>

                <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">por {authorName}</p>
                    <span className="text-xs text-gray-400">{file.file_size || '15.5 MB'}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-400">
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
            </div>
        </Link>
    );
}
