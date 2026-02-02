import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import FileCard from '@/Components/Public/FileCard';

export default function FileShow({ file = null, relatedFiles = [] }) {
    const [isLiked, setIsLiked] = useState(false);

    // Mock data for visual purposes
    const mockFile = {
        id: 1,
        title: 'Motor V8 Completo de Alto Rendimiento',
        slug: 'motor-v8',
        description: 'Modelo 3D detallado de un motor V8 de alto rendimiento. Incluye todos los componentes internos como pistones, bielas, ciguenal, arbol de levas, valvulas y sistema de refrigeracion. Ideal para proyectos de visualizacion automotriz, animaciones o impresion 3D a escala.',
        category: 'Automotriz',
        format: 'STEP',
        size: '45.6 MB',
        downloads: 1234,
        likes: 89,
        views: 5678,
        author: 'Juan Rodriguez',
        author_avatar: null,
        created_at: '2024-01-15',
        tags: ['motor', 'automotriz', 'v8', 'mecanico', 'renderizado'],
        ...file
    };

    const mockRelatedFiles = [
        { id: 2, title: 'Transmision Manual 6 Velocidades', slug: 'transmision-manual', category: 'Automotriz', format: 'STEP', downloads: 876, likes: 54, author: 'Pedro' },
        { id: 3, title: 'Sistema de Escape Deportivo', slug: 'escape-deportivo', category: 'Automotriz', format: 'STL', downloads: 654, likes: 43, author: 'Ana' },
        { id: 4, title: 'Turbocompresor GT35', slug: 'turbo-gt35', category: 'Automotriz', format: 'STEP', downloads: 543, likes: 38, author: 'Carlos' },
        { id: 5, title: 'Freno de Disco Brembo', slug: 'freno-brembo', category: 'Automotriz', format: 'OBJ', downloads: 432, likes: 32, author: 'Laura' },
    ];

    const displayFile = file || mockFile;
    const displayRelatedFiles = relatedFiles.length > 0 ? relatedFiles : mockRelatedFiles;

    return (
        <MainLayout>
            <Head title={displayFile.title} />

            {/* Breadcrumb */}
            <div className="bg-gray-100 py-3">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-yellow-600 transition-colors">Inicio</Link>
                        <span className="text-gray-400">/</span>
                        <Link href="/files" className="text-gray-500 hover:text-yellow-600 transition-colors">Archivos</Link>
                        <span className="text-gray-400">/</span>
                        <Link href={`/categories/${displayFile.category?.toLowerCase()}`} className="text-gray-500 hover:text-yellow-600 transition-colors">
                            {displayFile.category}
                        </Link>
                        <span className="text-gray-400">/</span>
                        <span className="text-gray-900 font-medium truncate">{displayFile.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Preview */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                            <div className="aspect-video bg-gray-100 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <svg className="w-32 h-32 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <p className="text-gray-400">Vista previa 3D interactiva</p>
                                    <button className="mt-4 text-yellow-600 hover:text-yellow-700 font-medium">
                                        Activar vista 3D
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* File Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{displayFile.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {displayFile.views?.toLocaleString()} vistas
                                        </span>
                                        <span>Subido el {displayFile.created_at}</span>
                                    </div>
                                </div>
                                <span className="bg-yellow-400 text-zinc-900 text-sm font-bold px-3 py-1.5 rounded-lg">
                                    {displayFile.format}
                                </span>
                            </div>

                            <p className="text-gray-600 leading-relaxed mb-6">
                                {displayFile.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                                {displayFile.tags?.map((tag) => (
                                    <Link
                                        key={tag}
                                        href={`/files?tag=${tag}`}
                                        className="bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-700 px-3 py-1 rounded-full text-sm transition-colors"
                                    >
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Author */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Subido por</h3>
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <span className="text-xl font-bold text-yellow-700">
                                        {displayFile.author?.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">{displayFile.author}</p>
                                    <p className="text-sm text-gray-500">Miembro desde 2023</p>
                                </div>
                                <Link
                                    href={`/users/${displayFile.author?.toLowerCase().replace(' ', '-')}`}
                                    className="ml-auto text-yellow-600 hover:text-yellow-700 font-medium"
                                >
                                    Ver perfil
                                </Link>
                            </div>
                        </div>

                        {/* Related Files */}
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Archivos Relacionados</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {displayRelatedFiles.map((relatedFile) => (
                                    <FileCard key={relatedFile.id} file={relatedFile} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        {/* Download Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Formato</span>
                                    <span className="font-semibold text-gray-900">{displayFile.format}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Tamano</span>
                                    <span className="font-semibold text-gray-900">{displayFile.size}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Categoria</span>
                                    <Link href={`/categories/${displayFile.category?.toLowerCase()}`} className="font-semibold text-yellow-600 hover:text-yellow-700">
                                        {displayFile.category}
                                    </Link>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-around py-4 bg-gray-50 rounded-lg mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{displayFile.downloads?.toLocaleString()}</div>
                                    <div className="text-xs text-gray-500">Descargas</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{displayFile.likes}</div>
                                    <div className="text-xs text-gray-500">Likes</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-3 rounded-lg font-bold transition-all hover:shadow-md active:scale-[0.98]">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Descargar Gratis
                                </button>
                                <button
                                    onClick={() => setIsLiked(!isLiked)}
                                    className={`w-full flex items-center justify-center gap-2 border py-3 rounded-lg font-medium transition-all ${
                                        isLiked
                                            ? 'border-red-300 bg-red-50 text-red-600'
                                            : 'border-gray-300 hover:border-red-300 hover:bg-red-50 text-gray-700 hover:text-red-600'
                                    }`}
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill={isLiked ? 'currentColor' : 'none'}
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                    {isLiked ? 'Guardado' : 'Guardar'}
                                </button>
                            </div>

                            {/* Share */}
                            <div className="mt-6 pt-6 border-t border-gray-100">
                                <p className="text-sm font-medium text-gray-700 mb-3">Compartir</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 p-2.5 bg-social-twitter hover:brightness-110 text-white rounded-lg transition-all">
                                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </button>
                                    <button className="flex-1 p-2.5 bg-social-facebook hover:brightness-110 text-white rounded-lg transition-all">
                                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </button>
                                    <button className="flex-1 p-2.5 bg-social-pinterest hover:brightness-110 text-white rounded-lg transition-all">
                                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/>
                                        </svg>
                                    </button>
                                    <button className="flex-1 p-2.5 bg-gray-600 hover:brightness-110 text-white rounded-lg transition-all">
                                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Report */}
                            <button className="w-full mt-4 text-sm text-gray-400 hover:text-red-500 transition-colors">
                                Reportar este archivo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
