import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="bg-zinc-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Comparte y Descarga
                            <span className="block text-yellow-400">Archivos 3D CAD</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
                            La plataforma mas completa para compartir modelos 3D. Encuentra miles de
                            archivos CAD de alta calidad para tus proyectos de ingenieria,
                            arquitectura y diseno.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/files"
                                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Explorar Archivos
                            </Link>
                            <Link
                                href="/upload"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Subir Archivo
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">10K+</div>
                                <div className="text-sm text-gray-400">Archivos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">5K+</div>
                                <div className="text-sm text-gray-400">Usuarios</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">50+</div>
                                <div className="text-sm text-gray-400">Categorias</div>
                            </div>
                        </div>
                    </div>

                    {/* Image/3D Preview */}
                    <div className="flex-1 relative">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-500/10 rounded-3xl"></div>
                            <div className="absolute inset-4 bg-zinc-800 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                                <div className="text-center p-8">
                                    <svg className="w-32 h-32 mx-auto text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <p className="text-gray-400 text-sm">Vista previa 3D</p>
                                </div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-xl shadow-lg flex items-center justify-center animate-bounce">
                                <svg className="w-10 h-10 text-zinc-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-zinc-700 rounded-xl shadow-lg flex items-center justify-center">
                                <span className="text-2xl font-bold text-yellow-400">.stl</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
