import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState, useCallback } from 'react';
import AdminLayout from '@/Layouts/AdminLayout';
import CascadeSelect from '@/Components/CascadeSelect';

export default function AdminUpload({ types = [], file = null }) {
    const isEditing = !!file;
    const [dragActive, setDragActive] = useState(false);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        title: file?.title || '',
        description: file?.description || '',
        type_id: file?.type_id || '',
        category_id: file?.category_id || '',
        subcategory_id: file?.subcategory_id || '',
        tags: file?.tags || '',
        license: file?.license || 'free',
        is_featured: file?.is_featured || false,
        is_active: file?.is_active ?? true,
        file: null,
        thumbnail: null,
    });

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            setData('file', droppedFiles[0]);
        }
    }, []);

    const handleFileInput = (e) => {
        if (e.target.files.length > 0) {
            setData('file', e.target.files[0]);
        }
    };

    const removeFile = () => {
        setData('file', null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.post(`/admin/files/${file.id}`, {
                _method: 'put',
                ...data,
            }, {
                forceFormData: true,
            });
        } else {
            post('/admin/files', {
                forceFormData: true,
            });
        }
    };

    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        const icons = {
            'stl': '🎲',
            'obj': '📦',
            'fbx': '🎮',
            'blend': '🎨',
            'dwg': '📐',
            'dxf': '📏',
            'pdf': '📄',
            'zip': '📁',
            'rar': '📁',
        };
        return icons[ext] || '📎';
    };

    return (
        <AdminLayout title={isEditing ? 'Editar Archivo' : 'Subir Archivo'}>
            <Head title={`${isEditing ? 'Editar' : 'Subir'} Archivo - Admin`} />

            {/* Breadcrumb */}
            <div className="mb-6">
                <nav className="flex items-center gap-2 text-sm">
                    <Link href="/admin/files" className="text-gray-500 hover:text-gray-700">
                        Archivos
                    </Link>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-900">{isEditing ? 'Editar' : 'Subir'}</span>
                </nav>
            </div>

            <div className="max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Upload Zone */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">
                            {isEditing ? 'Archivos (opcional reemplazar)' : 'Archivos'}
                        </h2>

                        {/* Show existing file info when editing */}
                        {isEditing && !data.file && (
                            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-800">
                                    El archivo actual se mantendrá. Solo sube un nuevo archivo si deseas reemplazarlo.
                                </p>
                            </div>
                        )}

                        <div
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                                dragActive
                                    ? 'border-secondary-400 bg-secondary-50'
                                    : 'border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            <input
                                type="file"
                                onChange={handleFileInput}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                accept=".stl,.obj,.fbx,.blend,.3ds,.dwg,.dxf,.step,.stp,.iges,.igs,.pdf,.zip,.rar"
                            />
                            <UploadIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600 mb-2">
                                Arrastra archivos aquí o <span className="text-secondary-600 font-medium">haz clic para seleccionar</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                STL, OBJ, FBX, BLEND, DWG, DXF, STEP, PDF, ZIP (máx. 100MB)
                            </p>
                        </div>

                        {/* Selected File */}
                        {data.file && (
                            <div className="mt-4 space-y-2">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <span className="text-2xl">{getFileIcon(data.file.name)}</span>
                                        <div>
                                            <p className="font-medium text-gray-900 text-sm">{data.file.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {(data.file.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <XIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Upload Progress */}
                        {progress && (
                            <div className="mt-4">
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div
                                        className="bg-secondary-400 h-2.5 rounded-full transition-all"
                                        style={{ width: `${progress.percentage}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{progress.percentage}% subido</p>
                            </div>
                        )}

                        {/* File error */}
                        {errors.file && (
                            <p className="mt-2 text-sm text-red-500">{errors.file}</p>
                        )}
                    </div>

                    {/* Basic Info */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Información Básica</h2>

                        <div className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Título *
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Ej: Motor V8 de Alto Rendimiento"
                                    className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                                        errors.title ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                    required
                                />
                                {errors.title && (
                                    <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                                )}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Descripción
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    placeholder="Describe el modelo, incluye dimensiones, materiales, uso recomendado..."
                                    className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent resize-none ${
                                        errors.description ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                />
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                )}
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Etiquetas
                                </label>
                                <input
                                    type="text"
                                    value={data.tags}
                                    onChange={(e) => setData('tags', e.target.value)}
                                    placeholder="motor, automotriz, renderizado (separadas por coma)"
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                                />
                                <p className="mt-1 text-sm text-gray-500">Separa las etiquetas con comas</p>
                            </div>
                        </div>
                    </div>

                    {/* Classification */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Clasificación</h2>
                        <CascadeSelect
                            types={types}
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>

                    {/* Options */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Opciones</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* License */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Licencia
                                </label>
                                <select
                                    value={data.license}
                                    onChange={(e) => setData('license', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent"
                                >
                                    <option value="free">Gratis</option>
                                    <option value="attribution">Con Atribución</option>
                                    <option value="commercial">Comercial</option>
                                </select>
                            </div>

                            {/* Checkboxes */}
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_featured}
                                        onChange={(e) => setData('is_featured', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-secondary-400 focus:ring-secondary-400"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Destacado
                                    </span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="w-5 h-5 rounded border-gray-300 text-secondary-400 focus:ring-secondary-400"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Publicar inmediatamente
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4">
                        <button
                            type="button"
                            onClick={() => reset()}
                            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                        >
                            Limpiar
                        </button>
                        <button
                            type="submit"
                            disabled={processing || (!isEditing && !data.file)}
                            className="px-8 py-3 bg-yellow-400 text-zinc-900 rounded-lg font-bold hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing
                                ? (isEditing ? 'Guardando...' : 'Subiendo...')
                                : (isEditing ? 'Guardar Cambios' : 'Subir Archivo')
                            }
                        </button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

function UploadIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
    );
}

function XIcon({ className }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}
