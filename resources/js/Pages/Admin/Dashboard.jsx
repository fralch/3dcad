import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Dashboard({ stats = {} }) {
    // Mock data for visual
    const mockStats = {
        types: stats.types ?? 2,
        categories: stats.categories ?? 4,
        subcategories: stats.subcategories ?? 9,
        files: stats.files ?? 534,
    };

    const statCards = [
        { name: 'Tipos', value: mockStats.types, href: '/admin/types', color: 'bg-blue-500', icon: CubeIcon },
        { name: 'Categorías', value: mockStats.categories, href: '/admin/categories', color: 'bg-green-500', icon: FolderIcon },
        { name: 'Subcategorías', value: mockStats.subcategories, href: '/admin/subcategories', color: 'bg-purple-500', icon: TagIcon },
        { name: 'Archivos', value: mockStats.files, href: '#', color: 'bg-yellow-500', icon: FileIcon },
    ];

    const quickActions = [
        { name: 'Crear Tipo', href: '/admin/types/create', icon: PlusIcon },
        { name: 'Crear Categoría', href: '/admin/categories/create', icon: PlusIcon },
        { name: 'Crear Subcategoría', href: '/admin/subcategories/create', icon: PlusIcon },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Admin Dashboard" />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Link
                        key={stat.name}
                        href={stat.href}
                        className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.name}</p>
                                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
                            </div>
                            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Acciones Rápidas</h2>
                <div className="flex flex-wrap gap-3">
                    {quickActions.map((action) => (
                        <Link
                            key={action.name}
                            href={action.href}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                            <action.icon className="w-4 h-4" />
                            {action.name}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Hierarchy Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Estructura de Categorías</h2>
                    <div className="space-y-4">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                <CubeIcon className="w-5 h-5 text-blue-500" />
                                3D
                            </div>
                            <div className="ml-7 mt-2 space-y-2">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Mecánica</span>
                                    <span className="text-gray-400 ml-2">4 subcategorías</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Arquitectura</span>
                                    <span className="text-gray-400 ml-2">3 subcategorías</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-2 font-medium text-gray-900">
                                <CubeIcon className="w-5 h-5 text-blue-500" />
                                Planos
                            </div>
                            <div className="ml-7 mt-2 space-y-2">
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Mecánica</span>
                                    <span className="text-gray-400 ml-2">1 subcategoría</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    <span className="font-medium">Arquitectura</span>
                                    <span className="text-gray-400 ml-2">1 subcategoría</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Card */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Información</h2>
                    <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-medium text-blue-900 mb-2">Sistema de Jerarquía</h3>
                        <p className="text-sm text-blue-800 mb-3">
                            El sistema utiliza una estructura de 3 niveles:
                        </p>
                        <ul className="text-sm text-blue-800 space-y-1">
                            <li>• <strong>Tipos:</strong> Nivel superior (ej: 3D, Planos)</li>
                            <li>• <strong>Categorías:</strong> Pertenecen a un tipo</li>
                            <li>• <strong>Subcategorías:</strong> Pertenecen a una categoría</li>
                        </ul>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

// Icons
function CubeIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
    );
}

function FolderIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
    );
}

function TagIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
    );
}

function FileIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
    );
}

function PlusIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}
