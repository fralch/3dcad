import { Link } from '@inertiajs/react';
import { getTotalFiles, getTotalSubcategories, typesData } from '@/data/categories';

export default function HeroSection() {
    const totalFiles = getTotalFiles();
    const totalSubcategories = getTotalSubcategories();

    return (
        <section className="bg-zinc-900 text-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
                            Comparte y Descarga
                            <span className="block text-yellow-400">Archivos 3D CAD y Planos</span>
                        </h1>
                        <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl">
                            La plataforma más completa para compartir modelos 3D y planos técnicos.
                            Encuentra archivos de mecánica, arquitectura, instalaciones MEP y más.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link
                                href="/3d"
                                className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Explorar 3D
                            </Link>
                            <Link
                                href="/planos"
                                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Ver Planos
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">{totalFiles}</div>
                                <div className="text-sm text-gray-400">Archivos</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">{totalSubcategories}</div>
                                <div className="text-sm text-gray-400">Subcategorías</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-yellow-400">{typesData.types.length}</div>
                                <div className="text-sm text-gray-400">Tipos</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual */}
                    <div className="flex-1 relative">
                        <div className="relative w-full aspect-square max-w-lg mx-auto">
                            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-blue-500/10 rounded-3xl"></div>
                            <div className="absolute inset-4 bg-zinc-800 rounded-2xl shadow-2xl flex items-center justify-center overflow-hidden">
                                <div className="text-center p-8">
                                    <svg className="w-32 h-32 mx-auto text-yellow-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                    <p className="text-gray-400 text-sm">Modelos 3D de alta calidad</p>
                                </div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-xl shadow-lg flex items-center justify-center">
                                <span className="text-zinc-900 font-bold text-lg">3D</span>
                            </div>
                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500 rounded-xl shadow-lg flex items-center justify-center">
                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
