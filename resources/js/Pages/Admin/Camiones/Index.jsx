import { Head, Link, router } from '@inertiajs/react';
import CamionesLayout from '@/Layouts/CamionesLayout';

export default function CamionesIndex({ camiones = [] }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este camión?')) {
            router.delete(route('admin.camiones.destroy', id));
        }
    };

    return (
        <CamionesLayout title="Camiones">
            <Head title="Camiones - Admin" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500">Subsistema de gestión de camiones</p>
                <Link
                    href={route('admin.camiones.create')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-lg font-medium hover:bg-secondary-400 transition-colors"
                >
                    <PlusIcon className="w-5 h-5" />
                    Nuevo Camión
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Placa</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Marca</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Modelo</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Año</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Conductor</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {camiones.map((camion) => (
                            <tr key={camion.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">{camion.placa}</td>
                                <td className="px-6 py-4 text-gray-600">{camion.marca}</td>
                                <td className="px-6 py-4 text-gray-600">{camion.modelo}</td>
                                <td className="px-6 py-4 text-gray-600">{camion.anio}</td>
                                <td className="px-6 py-4">
                                    <EstadoBadge estado={camion.estado} />
                                </td>
                                <td className="px-6 py-4 text-gray-600">{camion.conductor_asignado || '-'}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={route('admin.camiones.edit', camion.id)}
                                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="Editar"
                                        >
                                            <EditIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(camion.id)}
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Eliminar"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {camiones.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">No hay camiones registrados</p>
                        <Link
                            href={route('admin.camiones.create')}
                            className="inline-flex items-center gap-2 mt-4 text-yellow-600 hover:text-yellow-700"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Crear el primer camión
                        </Link>
                    </div>
                )}
            </div>
        </CamionesLayout>
    );
}

function EstadoBadge({ estado }) {
    if (estado === 'activo') {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Activo</span>;
    }

    if (estado === 'mantenimiento') {
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Mantenimiento</span>;
    }

    return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Inactivo</span>;
}

function PlusIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
    );
}

function EditIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    );
}

function TrashIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
    );
}
