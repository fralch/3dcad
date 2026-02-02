// Estructura de categorías del sistema
export const categoriesData = {
    categories: [
        {
            id: 1,
            name: '3D',
            slug: '3d',
            icon: 'cube',
            subcategories: [
                {
                    id: 1,
                    name: 'MECÁNICA',
                    slug: 'mecanica',
                    parent: '3d',
                    elements: [
                        { id: 1, name: 'ELEMENTOS DE MÁQUINAS', slug: 'elementos-de-maquinas', count: 44 },
                        { id: 2, name: 'ESTRUCTURAS METÁLICAS', slug: 'estructuras-metalicas', count: 15 },
                        { id: 3, name: 'INSTALACIONES MEP', slug: 'instalaciones-mep', count: 12 },
                        { id: 4, name: 'MECANISMOS Y MÁQUINAS', slug: 'mecanismos-y-maquinas', count: 22 },
                    ],
                },
                {
                    id: 2,
                    name: 'ARQUITECTURA',
                    slug: 'arquitectura',
                    parent: '3d',
                    elements: [
                        { id: 5, name: 'VIVIENDA', slug: 'vivienda', count: 124 },
                        { id: 6, name: 'MOBILIARIO', slug: 'mobiliario', count: 51 },
                        { id: 7, name: 'PAISAJISMO', slug: 'paisajismo', count: 221 },
                    ],
                },
            ],
        },
        {
            id: 2,
            name: 'PLANOS',
            slug: 'planos',
            icon: 'document',
            subcategories: [
                {
                    id: 3,
                    name: 'MECÁNICA',
                    slug: 'mecanica',
                    parent: 'planos',
                    elements: [
                        { id: 8, name: 'GENERAL', slug: 'general', count: 10 },
                    ],
                },
                {
                    id: 4,
                    name: 'ARQUITECTURA',
                    slug: 'arquitectura',
                    parent: 'planos',
                    elements: [
                        { id: 9, name: 'GENERAL', slug: 'general', count: 35 },
                    ],
                },
            ],
        },
    ],
};

// Helper functions
export const getTotalFiles = () => {
    let total = 0;
    categoriesData.categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
            sub.elements.forEach(el => {
                total += el.count;
            });
        });
    });
    return total;
};

export const getCategoryBySlug = (slug) => {
    return categoriesData.categories.find(cat => cat.slug === slug);
};

export const getSubcategoryBySlug = (categorySlug, subcategorySlug) => {
    const category = getCategoryBySlug(categorySlug);
    if (!category) return null;
    return category.subcategories.find(sub => sub.slug === subcategorySlug);
};

export const getAllElements = () => {
    const elements = [];
    categoriesData.categories.forEach(cat => {
        cat.subcategories.forEach(sub => {
            sub.elements.forEach(el => {
                elements.push({
                    ...el,
                    category: cat.name,
                    categorySlug: cat.slug,
                    subcategory: sub.name,
                    subcategorySlug: sub.slug,
                });
            });
        });
    });
    return elements;
};

export const getPopularElements = (limit = 5) => {
    return getAllElements()
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);
};

export default categoriesData;
