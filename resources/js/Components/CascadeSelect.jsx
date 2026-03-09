export default function CascadeSelect({ types, data, setData, errors }) {
    const selectedType = types.find(t => t.id === parseInt(data.type_id)) || null;
    const selectedCategory = selectedType?.categories?.find(c => c.id === parseInt(data.category_id)) || null;

    const handleTypeChange = (e) => {
        setData({
            ...data,
            type_id: e.target.value,
            category_id: '',
            subcategory_id: '',
        });
    };

    const handleCategoryChange = (e) => {
        setData({
            ...data,
            category_id: e.target.value,
            subcategory_id: '',
        });
    };

    const handleSubcategoryChange = (e) => {
        setData({
            ...data,
            subcategory_id: e.target.value,
        });
    };

    return (
        <div className="space-y-4">
            {/* Tipo */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo *
                </label>
                <select
                    value={data.type_id}
                    onChange={handleTypeChange}
                    className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent ${
                        errors?.type_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                >
                    <option value="">Selecciona un tipo</option>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name}
                        </option>
                    ))}
                </select>
                {errors?.type_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.type_id}</p>
                )}
            </div>

            {/* Categoría */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoría *
                </label>
                <select
                    value={data.category_id}
                    onChange={handleCategoryChange}
                    disabled={!selectedType}
                    className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors?.category_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                >
                    <option value="">
                        {selectedType ? 'Selecciona una categoría' : 'Primero selecciona un tipo'}
                    </option>
                    {selectedType?.categories?.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors?.category_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.category_id}</p>
                )}
            </div>

            {/* Subcategoría */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategoría *
                </label>
                <select
                    value={data.subcategory_id}
                    onChange={handleSubcategoryChange}
                    disabled={!selectedCategory}
                    className={`w-full border rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-secondary-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed ${
                        errors?.subcategory_id ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                >
                    <option value="">
                        {selectedCategory ? 'Selecciona una subcategoría' : 'Primero selecciona una categoría'}
                    </option>
                    {selectedCategory?.subcategories?.map((subcategory) => (
                        <option key={subcategory.id} value={subcategory.id}>
                            {subcategory.name}
                        </option>
                    ))}
                </select>
                {errors?.subcategory_id && (
                    <p className="mt-1 text-sm text-red-500">{errors.subcategory_id}</p>
                )}
            </div>
        </div>
    );
}
