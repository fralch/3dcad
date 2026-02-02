import { Link } from '@inertiajs/react';

export default function Sidebar({ categories = [], formats = [], popularFiles = [] }) {
    // Mock data for visual purposes
    const defaultCategories = categories.length > 0 ? categories : [
        { id: 1, name: 'Mecanico', slug: 'mecanico', files_count: 234 },
        { id: 2, name: 'Arquitectura', slug: 'arquitectura', files_count: 189 },
        { id: 3, name: 'Electronica', slug: 'electronica', files_count: 156 },
        { id: 4, name: 'Automotriz', slug: 'automotriz', files_count: 98 },
        { id: 5, name: 'Industrial', slug: 'industrial', files_count: 87 },
    ];

    const defaultFormats = formats.length > 0 ? formats : [
        { name: 'STL', count: 456 },
        { name: 'OBJ', count: 234 },
        { name: 'STEP', count: 189 },
        { name: 'DWG', count: 123 },
        { name: 'FBX', count: 98 },
    ];

    const defaultPopularFiles = popularFiles.length > 0 ? popularFiles : [
        { id: 1, title: 'Motor V8 Completo', slug: 'motor-v8', downloads: 1234 },
        { id: 2, title: 'Casa Moderna 3D', slug: 'casa-moderna', downloads: 987 },
        { id: 3, title: 'Engranaje Helicoidal', slug: 'engranaje', downloads: 876 },
    ];

    return (
        <aside className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Categorias</h3>
                <ul className="space-y-2">
                    {defaultCategories.map((category) => (
                        <li key={category.id}>
                            <Link
                                href={`/categories/${category.slug}`}
                                className="flex items-center justify-between py-2 text-gray-600 hover:text-yellow-600 transition-colors group"
                            >
                                <span className="group-hover:translate-x-1 transition-transform">
                                    {category.name}
                                </span>
                                <span className="text-xs bg-gray-100 group-hover:bg-yellow-100 text-gray-500 group-hover:text-yellow-700 px-2 py-1 rounded-full transition-colors">
                                    {category.files_count}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
                <Link
                    href="/categories"
                    className="block mt-4 pt-4 border-t border-gray-100 text-sm text-yellow-600 hover:text-yellow-700 font-medium"
                >
                    Ver todas las categorias
                </Link>
            </div>

            {/* Formats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Formatos</h3>
                <div className="flex flex-wrap gap-2">
                    {defaultFormats.map((format) => (
                        <Link
                            key={format.name}
                            href={`/files?format=${format.name.toLowerCase()}`}
                            className="inline-flex items-center gap-1 bg-gray-100 hover:bg-yellow-100 text-gray-700 hover:text-yellow-700 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
                        >
                            {format.name}
                            <span className="text-xs text-gray-400">({format.count})</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Popular Downloads */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-bold text-gray-900 mb-4">Mas Descargados</h3>
                <ul className="space-y-4">
                    {defaultPopularFiles.map((file, index) => (
                        <li key={file.id}>
                            <Link
                                href={`/files/${file.slug}`}
                                className="flex items-start gap-3 group"
                            >
                                <span className="flex-shrink-0 w-8 h-8 bg-yellow-100 text-yellow-700 rounded-lg flex items-center justify-center font-bold text-sm">
                                    {index + 1}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-700 group-hover:text-yellow-600 truncate transition-colors">
                                        {file.title}
                                    </p>
                                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        {file.downloads.toLocaleString()} descargas
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
                    Sube tus archivos 3D y ayuda a la comunidad
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
