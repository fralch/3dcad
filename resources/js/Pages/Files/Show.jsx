import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import FileCard from '@/Components/Public/FileCard';

export default function FileShow({ file, relatedFiles = [] }) {
    const { auth } = usePage().props;
    const [isLiked, setIsLiked] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        window.location.href = route('file.download', file.slug);
        setTimeout(() => setDownloading(false), 2000);
    };

    const handleLike = () => {
        if (!auth?.user) {
            router.visit(route('login'));
            return;
        }

        router.post(route('file.like', file.id), {}, {
            preserveScroll: true,
            onSuccess: () => setIsLiked(!isLiked),
        });
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return 'N/A';
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        let size = bytes;
        while (size >= 1024 && i < units.length - 1) {
            size /= 1024;
            i++;
        }
        return `${size.toFixed(2)} ${units[i]}`;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <MainLayout>
            <Head title={file.title} />

            {/* Breadcrumb */}
            <div className="bg-gray-100 py-3">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-yellow-600 transition-colors">Inicio</Link>
                        <span className="text-gray-400">/</span>
                        {file.type && (
                            <>
                                <Link href={route(file.type.slug === '2d' ? 'planos.index' : `${file.type.slug}.index`)} className="text-gray-500 hover:text-yellow-600 transition-colors">
                                    {file.type.name}
                                </Link>
                                <span className="text-gray-400">/</span>
                            </>
                        )}
                        {file.category && (
                            <>
                                <Link href={`/${file.type?.slug}/${file.category.slug}`} className="text-gray-500 hover:text-yellow-600 transition-colors">
                                    {file.category.name}
                                </Link>
                                <span className="text-gray-400">/</span>
                            </>
                        )}
                        <span className="text-gray-900 font-medium truncate">{file.title}</span>
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
                                {file.thumbnail_path ? (
                                    <img
                                        src={`/storage/${file.thumbnail_path}`}
                                        alt={file.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <svg className="w-32 h-32 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                        </svg>
                                        <p className="text-gray-400">Vista previa 3D</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* File Info */}
                        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                            <div className="flex items-start justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{file.title}</h1>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {file.views?.toLocaleString() || 0} vistas
                                        </span>
                                        <span>Subido el {formatDate(file.created_at)}</span>
                                    </div>
                                </div>
                                <span className="bg-yellow-400 text-zinc-900 text-sm font-bold px-3 py-1.5 rounded-lg uppercase">
                                    {file.file_type || 'N/A'}
                                </span>
                            </div>

                            {file.description && (
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    {file.description}
                                </p>
                            )}

                            {/* Tags */}
                            {file.tags && (
                                <div className="flex flex-wrap gap-2">
                                    {file.tags.split(',').map((tag, index) => (
                                        <Link
                                            key={index}
                                            href={`/?tag=${tag.trim()}`}
                                            className="bg-gray-100 hover:bg-yellow-100 text-gray-600 hover:text-yellow-700 px-3 py-1 rounded-full text-sm transition-colors"
                                        >
                                            #{tag.trim()}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Author */}
                        {file.user && (
                            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Subido por</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                                        <span className="text-xl font-bold text-yellow-700">
                                            {file.user.name?.charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{file.user.name}</p>
                                        <p className="text-sm text-gray-500">Miembro</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Related Files */}
                        {relatedFiles.length > 0 && (
                            <div className="bg-white rounded-xl shadow-sm p-6">
                                <h3 className="font-semibold text-gray-900 mb-4">Archivos relacionados</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {relatedFiles.map((relatedFile) => (
                                        <FileCard key={relatedFile.id} file={relatedFile} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="w-full lg:w-80 flex-shrink-0">
                        {/* Download Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Formato</span>
                                    <span className="font-semibold text-gray-900 uppercase">{file.file_type || 'N/A'}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Tamano</span>
                                    <span className="font-semibold text-gray-900">{formatFileSize(file.file_size)}</span>
                                </div>
                                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                    <span className="text-gray-500">Licencia</span>
                                    <span className="font-semibold text-gray-900 capitalize">{file.license || 'free'}</span>
                                </div>
                                {file.category && (
                                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                                        <span className="text-gray-500">Categoria</span>
                                        <Link href={`/${file.type?.slug}/${file.category.slug}`} className="font-semibold text-yellow-600 hover:text-yellow-700">
                                            {file.category.name}
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Stats */}
                            <div className="flex items-center justify-around py-4 bg-gray-50 rounded-lg mb-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{file.downloads?.toLocaleString() || 0}</div>
                                    <div className="text-xs text-gray-500">Descargas</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-gray-900">{file.likes || 0}</div>
                                    <div className="text-xs text-gray-500">Likes</div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleDownload}
                                    disabled={downloading}
                                    className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 py-3 rounded-lg font-bold transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-50"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {downloading ? 'Descargando...' : 'Descargar Gratis'}
                                </button>
                                <button
                                    onClick={handleLike}
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
                                    <a
                                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(file.title)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 p-2.5 bg-[#1DA1F2] hover:brightness-110 text-white rounded-lg transition-all"
                                    >
                                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                                        </svg>
                                    </a>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 p-2.5 bg-[#4267B2] hover:brightness-110 text-white rounded-lg transition-all"
                                    >
                                        <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                        </svg>
                                    </a>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                                        className="flex-1 p-2.5 bg-gray-600 hover:brightness-110 text-white rounded-lg transition-all"
                                        title="Copiar enlace"
                                    >
                                        <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
