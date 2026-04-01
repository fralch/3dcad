import { Head, Link } from '@inertiajs/react';
import CamionesLayout from '@/Layouts/CamionesLayout';

export default function CamionesUbicaciones({ geolocalizaciones }) {
    const registros = geolocalizaciones?.data || [];

    return (
        <CamionesLayout title="Ubicaciones de Camiones">
            <Head title="Ubicaciones - Camiones" />

            <div className="flex items-center justify-between mb-6">
                <p className="text-gray-500">Últimas geolocalizaciones reportadas por la API</p>
                <Link
                    href={route('admin.camiones.index')}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                >
                    Ver Camiones
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Fecha</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Placa</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Vehículo</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Estado</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Latitud</th>
                            <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">Longitud</th>
                            <th className="text-right px-6 py-4 text-sm font-medium text-gray-500">Mapa</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {registros.map((registro) => (
                            <tr key={registro.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-600">
                                    {registro.timestamp ? new Date(registro.timestamp).toLocaleString() : '-'}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{registro.placa || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{`${registro.marca || '-'} ${registro.modelo || ''}`.trim()}</td>
                                <td className="px-6 py-4 text-gray-600 capitalize">{registro.estado || '-'}</td>
                                <td className="px-6 py-4 text-gray-600">{registro.latitud}</td>
                                <td className="px-6 py-4 text-gray-600">{registro.longitud}</td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href={registro.maps_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium"
                                    >
                                        Abrir
                                        <ExternalLinkIcon className="w-4 h-4" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {registros.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500">Aún no hay ubicaciones registradas</p>
                    </div>
                )}
            </div>

            {geolocalizaciones?.links && geolocalizaciones.links.length > 3 && (
                <div className="mt-6 flex justify-center">
                    <nav className="flex items-center gap-1 flex-wrap">
                        {geolocalizaciones.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-lg transition-colors ${
                                    link.active
                                        ? 'bg-secondary-500 text-white font-semibold'
                                        : link.url
                                          ? 'text-gray-600 hover:bg-gray-100'
                                          : 'text-gray-400 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </CamionesLayout>
    );
}

function ExternalLinkIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h6m0 0v6m0-6L10 16m-4 1h11a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v11a2 2 0 002 2z" />
        </svg>
    );
}
