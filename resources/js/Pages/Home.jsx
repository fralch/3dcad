import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import HeroSection from '@/Components/Public/HeroSection';
import SectionTitle from '@/Components/Public/SectionTitle';
import FileCard from '@/Components/Public/FileCard';
import CategoryCard from '@/Components/Public/CategoryCard';

export default function Home({ categories = [], recentFiles = [], popularFiles = [] }) {
    // Mock data for visual purposes
    const mockCategories = [
        { id: 1, name: 'Mecanico', slug: 'mecanico', files_count: 234, color: 'yellow' },
        { id: 2, name: 'Arquitectura', slug: 'arquitectura', files_count: 189, color: 'blue' },
        { id: 3, name: 'Electronica', slug: 'electronica', files_count: 156, color: 'green' },
        { id: 4, name: 'Automotriz', slug: 'automotriz', files_count: 98, color: 'red' },
        { id: 5, name: 'Industrial', slug: 'industrial', files_count: 87, color: 'purple' },
        { id: 6, name: 'Aeroespacial', slug: 'aeroespacial', files_count: 67, color: 'cyan' },
        { id: 7, name: 'Medico', slug: 'medico', files_count: 45, color: 'pink' },
        { id: 8, name: 'Arte y Diseno', slug: 'arte-diseno', files_count: 123, color: 'orange' },
    ];

    const mockFiles = [
        { id: 1, title: 'Motor V8 Completo', slug: 'motor-v8', category: 'Automotriz', format: 'STEP', downloads: 1234, likes: 89, author: 'Juan' },
        { id: 2, title: 'Casa Moderna Minimalista', slug: 'casa-moderna', category: 'Arquitectura', format: 'DWG', downloads: 987, likes: 67, author: 'Maria' },
        { id: 3, title: 'Engranaje Helicoidal', slug: 'engranaje-helicoidal', category: 'Mecanico', format: 'STL', downloads: 876, likes: 54, author: 'Pedro' },
        { id: 4, title: 'Caja de PCB Arduino', slug: 'caja-pcb', category: 'Electronica', format: 'STL', downloads: 765, likes: 43, author: 'Ana' },
        { id: 5, title: 'Turbina Industrial', slug: 'turbina-industrial', category: 'Industrial', format: 'STEP', downloads: 654, likes: 38, author: 'Carlos' },
        { id: 6, title: 'Soporte de Monitor', slug: 'soporte-monitor', category: 'Mecanico', format: 'OBJ', downloads: 543, likes: 32, author: 'Laura' },
        { id: 7, title: 'Drone Frame', slug: 'drone-frame', category: 'Aeroespacial', format: 'STL', downloads: 432, likes: 28, author: 'Diego' },
        { id: 8, title: 'Lampara Geometrica', slug: 'lampara-geometrica', category: 'Arte y Diseno', format: 'OBJ', downloads: 321, likes: 25, author: 'Sofia' },
    ];

    const displayCategories = categories.length > 0 ? categories : mockCategories;
    const displayRecentFiles = recentFiles.length > 0 ? recentFiles : mockFiles;
    const displayPopularFiles = popularFiles.length > 0 ? popularFiles : mockFiles.slice(0, 4);

    return (
        <MainLayout>
            <Head title="Inicio" />

            {/* Hero Section */}
            <HeroSection />

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Categorias Populares"
                        subtitle="Explora nuestras categorias mas visitadas"
                        viewAllLink="/categories"
                    />

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {displayCategories.slice(0, 8).map((category) => (
                            <CategoryCard key={category.id} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Recent Files Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Archivos Recientes"
                        subtitle="Los ultimos modelos 3D subidos a la plataforma"
                        viewAllLink="/files"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayRecentFiles.slice(0, 8).map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Files Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <SectionTitle
                        title="Los Mas Populares"
                        subtitle="Modelos 3D con mas descargas de la comunidad"
                        viewAllLink="/files?sort=popular"
                        viewAllText="Ver mas"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayPopularFiles.map((file) => (
                            <FileCard key={file.id} file={file} />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Unete a la Comunidad
                    </h2>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Comparte tus modelos 3D, conecta con otros disenadores y
                        descarga miles de archivos CAD de alta calidad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold text-lg transition-all hover:shadow-lg"
                        >
                            Crear Cuenta Gratis
                        </a>
                        <a
                            href="/files"
                            className="inline-flex items-center justify-center gap-2 border-2 border-zinc-700 hover:border-zinc-600 text-white px-8 py-3 rounded-lg font-bold text-lg transition-all"
                        >
                            Explorar sin Cuenta
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Por que elegirnos?
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            La mejor plataforma para compartir y descargar archivos 3D CAD
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Subida Facil</h3>
                            <p className="text-gray-500">
                                Arrastra y suelta tus archivos. Soportamos todos los formatos CAD populares.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Busqueda Avanzada</h3>
                            <p className="text-gray-500">
                                Encuentra exactamente lo que necesitas con nuestros filtros avanzados.
                            </p>
                        </div>

                        <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Comunidad Activa</h3>
                            <p className="text-gray-500">
                                Conecta con miles de disenadores e ingenieros de todo el mundo.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
