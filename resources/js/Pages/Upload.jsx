import { Head, Link, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import UploadZone from '@/Components/Public/UploadZone';
import CascadeSelect from '@/Components/CascadeSelect';

export default function Upload({ types = [] }) {
    const [step, setStep] = useState(1);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedSlug, setUploadedSlug] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const { data, setData, post, processing, errors, reset, progress } = useForm({
        title: '',
        description: '',
        type_id: '',
        category_id: '',
        subcategory_id: '',
        tags: '',
        license: 'free',
        file: null,
        thumbnail: null,
    });

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('thumbnail', file);
            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setThumbnailPreview(null);
    };

    const handleFilesSelected = (selectedFiles) => {
        if (selectedFiles.length > 0) {
            setUploadedFile(selectedFiles[0]);
            setData('file', selectedFiles[0]);
            setStep(2);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('upload.store'), {
            forceFormData: true,
            onSuccess: (page) => {
                // Get the slug from the redirect URL or flash message
                const url = page.url;
                const match = url.match(/\/file\/([^/]+)/);
                if (match) {
                    setUploadedSlug(match[1]);
                }
                setStep(3);
            },
            onError: () => {
                // Stay on step 2 to show errors
            },
        });
    };

    return (
        <MainLayout>
            <Head title="Subir Archivo" />

            {/* Page Header */}
            <div className="bg-zinc-900 text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">Subir Archivo</h1>
                    <p className="text-gray-400">
                        Comparte tus modelos 3D con la comunidad
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Steps */}
                <div className="max-w-3xl mx-auto mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                step >= 1 ? 'bg-yellow-400 text-zinc-900' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {step > 1 ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : '1'}
                            </div>
                            <span className={`ml-3 font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                                Subir Archivo
                            </span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                step >= 2 ? 'bg-yellow-400 text-zinc-900' : 'bg-gray-200 text-gray-500'
                            }`}>
                                {step > 2 ? (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : '2'}
                            </div>
                            <span className={`ml-3 font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                                Detalles
                            </span>
                        </div>
                        <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-yellow-400' : 'bg-gray-200'}`}></div>
                        <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                step >= 3 ? 'bg-yellow-400 text-zinc-900' : 'bg-gray-200 text-gray-500'
                            }`}>
                                3
                            </div>
                            <span className={`ml-3 font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>
                                Completado
                            </span>
                        </div>
                    </div>
                </div>

                <div className="max-w-3xl mx-auto">
                    {/* Step 1: Upload */}
                    {step === 1 && (
                        <div className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Selecciona tu archivo</h2>
                            <UploadZone onFilesSelected={handleFilesSelected} />
                        </div>
                    )}

                    {/* Step 2: Details */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Informacion del archivo</h2>

                            {/* Selected File */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-2">Archivo seleccionado:</p>
                                {uploadedFile && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{uploadedFile.name}</span>
                                        <span className="text-gray-400">({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)</span>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setUploadedFile(null);
                                        setData('file', null);
                                    }}
                                    className="mt-2 text-sm text-yellow-600 hover:text-yellow-700"
                                >
                                    Cambiar archivo
                                </button>
                                {errors.file && (
                                    <p className="mt-2 text-sm text-red-500">{errors.file}</p>
                                )}
                            </div>

                            {/* Upload Progress */}
                            {progress && (
                                <div className="mb-6">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Subiendo...</span>
                                        <span>{progress.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-yellow-400 h-2 rounded-full transition-all"
                                            style={{ width: `${progress.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Titulo *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        placeholder="Ej: Motor V8 de Alto Rendimiento"
                                        className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent ${
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
                                        Descripcion
                                    </label>
                                    <textarea
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        rows={4}
                                        placeholder="Describe tu modelo 3D, incluye detalles como materiales, dimensiones, uso recomendado..."
                                        className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none ${
                                            errors.description ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-500">{errors.description}</p>
                                    )}
                                </div>

                                {/* Cascade Select: Tipo > Categoria > Subcategoria */}
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="text-sm font-medium text-gray-900 mb-4">Clasificacion *</h3>
                                    <CascadeSelect
                                        types={types}
                                        data={data}
                                        setData={setData}
                                        errors={errors}
                                    />
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
                                        placeholder="Ej: motor, automotriz, renderizado (separadas por coma)"
                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    />
                                    <p className="mt-1 text-sm text-gray-500">Separa las etiquetas con comas</p>
                                </div>

                                {/* License */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Licencia
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            data.license === 'free'
                                                ? 'border-yellow-400 bg-yellow-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="license"
                                                value="free"
                                                checked={data.license === 'free'}
                                                onChange={(e) => setData('license', e.target.value)}
                                                className="text-yellow-400 focus:ring-yellow-400"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Gratis</p>
                                                <p className="text-sm text-gray-500">Cualquiera puede descargarlo</p>
                                            </div>
                                        </label>
                                        <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            data.license === 'attribution'
                                                ? 'border-yellow-400 bg-yellow-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="license"
                                                value="attribution"
                                                checked={data.license === 'attribution'}
                                                onChange={(e) => setData('license', e.target.value)}
                                                className="text-yellow-400 focus:ring-yellow-400"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Con Atribucion</p>
                                                <p className="text-sm text-gray-500">Requiere dar credito</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                                {/* Thumbnail Preview (Optional) */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Imagen de Previsualizacion <span className="text-gray-400 font-normal">(opcional)</span>
                                    </label>
                                    <p className="text-sm text-gray-500 mb-3">
                                        Sube una imagen para mostrar como previsualizacion de tu archivo
                                    </p>
                                    
                                    {thumbnailPreview ? (
                                        <div className="relative inline-block">
                                            <img 
                                                src={thumbnailPreview} 
                                                alt="Previsualizacion" 
                                                className="w-48 h-48 object-cover rounded-lg border-2 border-gray-200"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeThumbnail}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="text-sm text-gray-500">
                                                    <span className="font-medium text-yellow-600">Haz clic para subir</span> o arrastra
                                                </p>
                                                <p className="text-xs text-gray-400">PNG, JPG, WEBP (max 5MB)</p>
                                            </div>
                                            <input
                                                type="file"
                                                accept="image/png,image/jpeg,image/webp"
                                                onChange={handleThumbnailChange}
                                                className="hidden"
                                            />
                                        </label>
                                    )}
                                    {errors.thumbnail && (
                                        <p className="mt-2 text-sm text-red-500">{errors.thumbnail}</p>
                                    )}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setStep(1);
                                        setUploadedFile(null);
                                        setData('file', null);
                                        setThumbnailPreview(null);
                                    }}
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                    disabled={processing}
                                >
                                    Volver
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold transition-colors disabled:opacity-50"
                                >
                                    {processing ? 'Publicando...' : 'Publicar Archivo'}
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: Success */}
                    {step === 3 && (
                        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Archivo subido exitosamente!</h2>
                            <p className="text-gray-500 mb-8">
                                Tu modelo 3D ha sido publicado y ya esta disponible para la comunidad.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {uploadedSlug && (
                                    <Link
                                        href={route('file.show', uploadedSlug)}
                                        className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-6 py-3 rounded-lg font-bold transition-colors"
                                    >
                                        Ver mi archivo
                                    </Link>
                                )}
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setUploadedFile(null);
                                        setUploadedSlug(null);
                                        setThumbnailPreview(null);
                                        reset();
                                    }}
                                    className="inline-flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                                >
                                    Subir otro archivo
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tips */}
                {step !== 3 && (
                    <div className="max-w-3xl mx-auto mt-8">
                        <div className="bg-blue-50 rounded-xl p-6">
                            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Consejos para una buena publicacion
                            </h3>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li>Usa un titulo descriptivo que ayude a encontrar tu modelo</li>
                                <li>Incluye una descripcion detallada con dimensiones y materiales</li>
                                <li>Agrega etiquetas relevantes para mejorar la busqueda</li>
                                <li>Asegurate de que el archivo este en un formato compatible</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
