import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import UploadZone from '@/Components/Public/UploadZone';

export default function Upload() {
    const [step, setStep] = useState(1);
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        tags: '',
        license: 'free',
    });

    const categories = [
        { value: '', label: 'Selecciona una categoria' },
        { value: 'mecanico', label: 'Mecanico' },
        { value: 'arquitectura', label: 'Arquitectura' },
        { value: 'electronica', label: 'Electronica' },
        { value: 'automotriz', label: 'Automotriz' },
        { value: 'industrial', label: 'Industrial' },
        { value: 'aeroespacial', label: 'Aeroespacial' },
        { value: 'medico', label: 'Medico' },
        { value: 'arte-diseno', label: 'Arte y Diseno' },
    ];

    const handleFilesSelected = (selectedFiles) => {
        setFiles(selectedFiles);
        if (selectedFiles.length > 0) {
            setStep(2);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStep(3);
        // Here you would submit to the server
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

                            {/* Selected Files */}
                            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm text-gray-500 mb-2">Archivos seleccionados:</p>
                                {files.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 text-sm">
                                        <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <span className="text-gray-700">{file.name}</span>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="mt-2 text-sm text-yellow-600 hover:text-yellow-700"
                                >
                                    Cambiar archivos
                                </button>
                            </div>

                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Titulo *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Ej: Motor V8 de Alto Rendimiento"
                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripcion *
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        rows={4}
                                        placeholder="Describe tu modelo 3D, incluye detalles como materiales, dimensiones, uso recomendado..."
                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none"
                                        required
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Categoria *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                        required
                                    >
                                        {categories.map((cat) => (
                                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Etiquetas
                                    </label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleInputChange}
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
                                            formData.license === 'free'
                                                ? 'border-yellow-400 bg-yellow-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="license"
                                                value="free"
                                                checked={formData.license === 'free'}
                                                onChange={handleInputChange}
                                                className="text-yellow-400 focus:ring-yellow-400"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Gratis</p>
                                                <p className="text-sm text-gray-500">Cualquiera puede descargarlo</p>
                                            </div>
                                        </label>
                                        <label className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                                            formData.license === 'attribution'
                                                ? 'border-yellow-400 bg-yellow-50'
                                                : 'border-gray-200 hover:border-gray-300'
                                        }`}>
                                            <input
                                                type="radio"
                                                name="license"
                                                value="attribution"
                                                checked={formData.license === 'attribution'}
                                                onChange={handleInputChange}
                                                className="text-yellow-400 focus:ring-yellow-400"
                                            />
                                            <div>
                                                <p className="font-medium text-gray-900">Con Atribucion</p>
                                                <p className="text-sm text-gray-500">Requiere dar credito</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    Volver
                                </button>
                                <button
                                    type="submit"
                                    className="bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-8 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Publicar Archivo
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
                                <Link
                                    href="/files/motor-v8"
                                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-zinc-900 px-6 py-3 rounded-lg font-bold transition-colors"
                                >
                                    Ver mi archivo
                                </Link>
                                <button
                                    onClick={() => {
                                        setStep(1);
                                        setFiles([]);
                                        setFormData({
                                            title: '',
                                            description: '',
                                            category: '',
                                            tags: '',
                                            license: 'free',
                                        });
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
                                <li>• Usa un titulo descriptivo que ayude a encontrar tu modelo</li>
                                <li>• Incluye una descripcion detallada con dimensiones y materiales</li>
                                <li>• Agrega etiquetas relevantes para mejorar la busqueda</li>
                                <li>• Asegurate de que el archivo este en un formato compatible</li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
