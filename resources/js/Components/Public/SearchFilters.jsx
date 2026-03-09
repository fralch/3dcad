import { useState } from 'react';

export default function SearchFilters({ onFilterChange }) {
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        format: '',
        sort: 'recent',
    });

    const handleChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const categories = [
        { value: '', label: 'Todas las categorias' },
        { value: 'mecanico', label: 'Mecanico' },
        { value: 'arquitectura', label: 'Arquitectura' },
        { value: 'electronica', label: 'Electronica' },
        { value: 'automotriz', label: 'Automotriz' },
        { value: 'industrial', label: 'Industrial' },
    ];

    const formats = [
        { value: '', label: 'Todos los formatos' },
        { value: 'stl', label: 'STL' },
        { value: 'obj', label: 'OBJ' },
        { value: 'step', label: 'STEP' },
        { value: 'dwg', label: 'DWG' },
        { value: 'fbx', label: 'FBX' },
    ];

    const sortOptions = [
        { value: 'recent', label: 'Mas recientes' },
        { value: 'popular', label: 'Mas populares' },
        { value: 'downloads', label: 'Mas descargados' },
        { value: 'name', label: 'Nombre A-Z' },
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleChange('search', e.target.value)}
                            placeholder="Buscar archivos..."
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 pl-10 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Category */}
                <div className="lg:w-48">
                    <select
                        value={filters.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                        {categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                </div>

                {/* Format */}
                <div className="lg:w-40">
                    <select
                        value={filters.format}
                        onChange={(e) => handleChange('format', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                        {formats.map((fmt) => (
                            <option key={fmt.value} value={fmt.value}>{fmt.label}</option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <div className="lg:w-44">
                    <select
                        value={filters.sort}
                        onChange={(e) => handleChange('sort', e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none cursor-pointer"
                    >
                        {sortOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
