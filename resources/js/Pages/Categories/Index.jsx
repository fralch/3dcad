import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import CategoryCard from '@/Components/Public/CategoryCard';

export default function CategoriesIndex({ categories = [] }) {
    // Mock data for visual purposes
    const mockCategories = [
        { id: 1, name: 'Mecanico', slug: 'mecanico', files_count: 234, color: 'yellow', description: 'Piezas mecanicas, engranajes, rodamientos y mas' },
        { id: 2, name: 'Arquitectura', slug: 'arquitectura', files_count: 189, color: 'blue', description: 'Edificios, casas, estructuras y planos arquitectonicos' },
        { id: 3, name: 'Electronica', slug: 'electronica', files_count: 156, color: 'green', description: 'Carcasas, PCBs, conectores y componentes electronicos' },
        { id: 4, name: 'Automotriz', slug: 'automotriz', files_count: 98, color: 'red', description: 'Motores, carrocerias, piezas de vehiculos' },
        { id: 5, name: 'Industrial', slug: 'industrial', files_count: 87, color: 'purple', description: 'Maquinaria industrial, herramientas y equipos' },
        { id: 6, name: 'Aeroespacial', slug: 'aeroespacial', files_count: 67, color: 'cyan', description: 'Aviones, drones, satelites y componentes aeronauticos' },
        { id: 7, name: 'Medico', slug: 'medico', files_count: 45, color: 'pink', description: 'Equipos medicos, protesis, modelos anatomicos' },
        { id: 8, name: 'Arte y Diseno', slug: 'arte-diseno', files_count: 123, color: 'orange', description: 'Esculturas, decoracion, objetos artisticos' },
        { id: 9, name: 'Robotica', slug: 'robotica', files_count: 78, color: 'blue', description: 'Robots, brazos roboticos, automatizacion' },
        { id: 10, name: 'Impresion 3D', slug: 'impresion-3d', files_count: 321, color: 'yellow', description: 'Modelos optimizados para impresion 3D' },
        { id: 11, name: 'Joyeria', slug: 'joyeria', files_count: 56, color: 'purple', description: 'Anillos, collares, pulseras y accesorios' },
        { id: 12, name: 'Mobiliario', slug: 'mobiliario', files_count: 134, color: 'green', description: 'Muebles, sillas, mesas y decoracion' },
    ];

    const displayCategories = categories.length > 0 ? categories : mockCategories;

    return (
        <MainLayout>
            <Head title="Categorias" />

            {/* Page Header */}
            <div className="bg-zinc-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Categorias</h1>
                    <p className="text-gray-400">
                        Explora todas las categorias de archivos 3D CAD
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl font-bold text-yellow-500 mb-1">{displayCategories.length}</div>
                        <div className="text-sm text-gray-500">Categorias</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl font-bold text-blue-500 mb-1">
                            {displayCategories.reduce((sum, cat) => sum + cat.files_count, 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-500">Archivos Totales</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl font-bold text-green-500 mb-1">15+</div>
                        <div className="text-sm text-gray-500">Formatos</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm p-6 text-center">
                        <div className="text-3xl font-bold text-purple-500 mb-1">5K+</div>
                        <div className="text-sm text-gray-500">Usuarios</div>
                    </div>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>

                {/* Featured Categories */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Categorias Destacadas</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {displayCategories.slice(0, 4).map((category) => (
                            <a
                                key={category.id}
                                href={`/categories/${category.slug}`}
                                className="group relative bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
                            >
                                <div className="flex items-center gap-6 p-6">
                                    <div className={`w-20 h-20 bg-gradient-to-br from-${category.color}-400 to-${category.color}-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                            {category.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mt-1">{category.description}</p>
                                        <p className="text-yellow-600 font-semibold mt-2">{category.files_count} archivos</p>
                                    </div>
                                    <svg className="w-6 h-6 text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
