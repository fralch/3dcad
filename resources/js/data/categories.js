// Estructura de datos del sistema
// Tipos > Categorías > Subcategorías

export const typesData = {
    types: [
        {
            id: 1,
            name: '3D',
            slug: '3d',
            categories: [
                {
                    id: 1,
                    name: 'Mecánica',
                    slug: 'mecanica',
                    subcategories: [
                        { id: 1, name: 'ELEMENTOS DE MÁQUINAS', slug: 'elementos-de-maquinas', count: 44 },
                        { id: 2, name: 'ESTRUCTURAS METÁLICAS', slug: 'estructuras-metalicas', count: 15 },
                        { id: 3, name: 'INSTALACIONES MEP', slug: 'instalaciones-mep', count: 12 },
                        { id: 4, name: 'MECANISMOS Y MÁQUINAS', slug: 'mecanismos-y-maquinas', count: 22 },
                    ],
                },
                {
                    id: 2,
                    name: 'Arquitectura',
                    slug: 'arquitectura',
                    subcategories: [
                        { id: 5, name: 'VIVIENDA', slug: 'vivienda', count: 124 },
                        { id: 6, name: 'MOBILIARIO', slug: 'mobiliario', count: 51 },
                        { id: 7, name: 'PAISAJISMO', slug: 'paisajismo', count: 221 },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: 'Planos',
            slug: 'planos',
            categories: [
                {
                    id: 3,
                    name: 'Mecánica',
                    slug: 'mecanica',
                    subcategories: [
                        { id: 8, name: 'General', slug: 'general', count: 10 },
                    ],
                },
                {
                    id: 4,
                    name: 'Arquitectura',
                    slug: 'arquitectura',
                    subcategories: [
                        { id: 9, name: 'General', slug: 'general', count: 35 },
                    ],
                },
            ],
        },
    ],
};

// Helper functions
export const getTotalFiles = () => {
    let total = 0;
    typesData.types.forEach(type => {
        type.categories.forEach(cat => {
            cat.subcategories.forEach(sub => {
                total += sub.count;
            });
        });
    });
    return total;
};

export const getTypeBySlug = (slug) => {
    return typesData.types.find(type => type.slug === slug);
};

export const getCategoryBySlug = (typeSlug, categorySlug) => {
    const type = getTypeBySlug(typeSlug);
    if (!type) return null;
    return type.categories.find(cat => cat.slug === categorySlug);
};

export const getSubcategoryBySlug = (typeSlug, categorySlug, subcategorySlug) => {
    const category = getCategoryBySlug(typeSlug, categorySlug);
    if (!category) return null;
    return category.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getAllSubcategories = () => {
    const subcategories = [];
    typesData.types.forEach(type => {
        type.categories.forEach(cat => {
            cat.subcategories.forEach(sub => {
                subcategories.push({
                    ...sub,
                    type: type.name,
                    typeSlug: type.slug,
                    category: cat.name,
                    categorySlug: cat.slug,
                });
            });
        });
    });
    return subcategories;
};

export const getPopularSubcategories = (limit = 5) => {
    return getAllSubcategories()
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

export const getTotalSubcategories = () => {
    let total = 0;
    typesData.types.forEach(type => {
        type.categories.forEach(cat => {
            total += cat.subcategories.length;
        });
    });
    return total;
};

export default typesData;
