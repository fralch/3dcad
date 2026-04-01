import { Head, Link, useForm } from '@inertiajs/react';
import CamionesLayout from '@/Layouts/CamionesLayout';

export default function CamionesForm({ camion = null }) {
    const isEditing = !!camion;

    const { data, setData, post, put, processing, errors } = useForm({
        placa: camion?.placa || '',
        marca: camion?.marca || '',
        modelo: camion?.modelo || '',
        anio: camion?.anio || new Date().getFullYear(),
        capacidad_carga: camion?.capacidad_carga ?? '',
        estado: camion?.estado || 'activo',
        conductor_asignado: camion?.conductor_asignado || '',
        observaciones: camion?.observaciones || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('admin.camiones.update', camion.id));
            return;
        }

        post(route('admin.camiones.store'));
    };

    return (
        <CamionesLayout title={isEditing ? 'Editar Camión' : 'Nuevo Camión'}>
            <Head title={`${isEditing ? 'Editar' : 'Nuevo'} Camión - Admin`} />

            <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href={route('admin.camiones.index')} className="text-gray-500 hover:text-gray-700">
                        Camiones
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{isEditing ? 'Editar' : 'Nuevo'}</span>
                </nav>
            </div>

            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="Placa *"
                            value={data.placa}
                            onChange={(value) => setData('placa', value.toUpperCase())}
                            error={errors.placa}
                            placeholder="ABC-123"
                        />

                        <InputField
                            label="Marca *"
                            value={data.marca}
                            onChange={(value) => setData('marca', value)}
                            error={errors.marca}
                            placeholder="Volvo"
                        />

                        <InputField
                            label="Modelo *"
                            value={data.modelo}
                            onChange={(value) => setData('modelo', value)}
                            error={errors.modelo}
                            placeholder="FH16"
                        />

                        <InputField
                            label="Año *"
                            type="number"
                            value={data.anio}
                            onChange={(value) => setData('anio', parseInt(value, 10) || '')}
                            error={errors.anio}
                            placeholder="2024"
                            min={1980}
                            max={2100}
                        />

                        <InputField
                            label="Capacidad de carga (ton) "
                            type="number"
                            value={data.capacidad_carga}
                            onChange={(value) => setData('capacidad_carga', value)}
                            error={errors.capacidad_carga}
                            placeholder="18.5"
                            step="0.01"
                            min={0}
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Estado *</label>
                            <select
                                value={data.estado}
                                onChange={(e) => setData('estado', e.target.value)}
                                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                    errors.estado ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="activo">Activo</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="inactivo">Inactivo</option>
                            </select>
                            {errors.estado && <p className="mt-1 text-sm text-red-500">{errors.estado}</p>}
                        </div>
                    </div>

                    <div className="mt-6">
                        <InputField
                            label="Conductor asignado"
                            value={data.conductor_asignado}
                            onChange={(value) => setData('conductor_asignado', value)}
                            error={errors.conductor_asignado}
                            placeholder="Nombre del conductor"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Observaciones</label>
                        <textarea
                            value={data.observaciones}
                            onChange={(e) => setData('observaciones', e.target.value)}
                            rows={4}
                            className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                errors.observaciones ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Notas adicionales del camión"
                        />
                        {errors.observaciones && <p className="mt-1 text-sm text-red-500">{errors.observaciones}</p>}
                    </div>

                    <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                        <Link
                            href={route('admin.camiones.index')}
                            className="text-gray-600 hover:text-gray-900 font-medium"
                        >
                            Cancelar
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-yellow-400 text-zinc-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : isEditing ? 'Guardar Cambios' : 'Crear Camión'}
                        </button>
                    </div>
                </form>
            </div>
        </CamionesLayout>
    );
}

function InputField({
    label,
    value,
    onChange,
    error,
    placeholder,
    type = 'text',
    min,
    max,
    step,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                min={min}
                max={max}
                step={step}
                className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                    error ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        </div>
    );
}
