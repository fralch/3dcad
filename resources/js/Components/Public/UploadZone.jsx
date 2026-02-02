import { useState, useCallback } from 'react';

export default function UploadZone({ onFilesSelected }) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    }, []);

    const handleDragOut = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        const files = [...e.dataTransfer.files];
        if (files && files.length > 0) {
            setSelectedFiles(files);
            onFilesSelected?.(files);
        }
    }, [onFilesSelected]);

    const handleFileInput = useCallback((e) => {
        const files = [...e.target.files];
        if (files && files.length > 0) {
            setSelectedFiles(files);
            onFilesSelected?.(files);
        }
    }, [onFilesSelected]);

    const removeFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        onFilesSelected?.(newFiles);
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                    isDragActive
                        ? 'border-yellow-400 bg-yellow-50'
                        : 'border-gray-300 hover:border-yellow-400 hover:bg-gray-50'
                }`}
            >
                <input
                    type="file"
                    multiple
                    accept=".stl,.obj,.step,.stp,.iges,.igs,.dwg,.dxf,.3ds,.fbx,.blend,.skp"
                    onChange={handleFileInput}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                <div className="space-y-4">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center transition-colors ${
                        isDragActive ? 'bg-yellow-400' : 'bg-gray-100'
                    }`}>
                        <svg
                            className={`w-8 h-8 transition-colors ${
                                isDragActive ? 'text-zinc-900' : 'text-gray-400'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-700">
                            {isDragActive ? 'Suelta los archivos aqui' : 'Arrastra tus archivos aqui'}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            o <span className="text-yellow-600 font-medium">haz clic para seleccionar</span>
                        </p>
                    </div>

                    <p className="text-xs text-gray-400">
                        Formatos soportados: STL, OBJ, STEP, IGES, DWG, DXF, 3DS, FBX, BLEND, SKP
                    </p>
                </div>
            </div>

            {/* Selected Files */}
            {selectedFiles.length > 0 && (
                <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Archivos seleccionados:</h4>
                    <div className="space-y-2">
                        {selectedFiles.map((file, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
