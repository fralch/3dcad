<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Subcategory;
use App\Models\Type;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    /**
     * Seed the types, categories, and subcategories.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => '3D',
                'slug' => '3d',
                'sort_order' => 1,
                'categories' => [
                    [
                        'name' => 'Mecánica',
                        'slug' => 'mecanica',
                        'sort_order' => 1,
                        'subcategories' => [
                            ['name' => 'ELEMENTOS DE MÁQUINAS', 'slug' => 'elementos-de-maquinas', 'sort_order' => 1],
                            ['name' => 'ESTRUCTURAS METÁLICAS', 'slug' => 'estructuras-metalicas', 'sort_order' => 2],
                            ['name' => 'INSTALACIONES MEP', 'slug' => 'instalaciones-mep', 'sort_order' => 3],
                            ['name' => 'MECANISMOS Y MÁQUINAS', 'slug' => 'mecanismos-y-maquinas', 'sort_order' => 4],
                        ],
                    ],
                    [
                        'name' => 'Arquitectura',
                        'slug' => 'arquitectura',
                        'sort_order' => 2,
                        'subcategories' => [
                            ['name' => 'VIVIENDA', 'slug' => 'vivienda', 'sort_order' => 1],
                            ['name' => 'MOBILIARIO', 'slug' => 'mobiliario', 'sort_order' => 2],
                            ['name' => 'PAISAJISMO', 'slug' => 'paisajismo', 'sort_order' => 3],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Planos',
                'slug' => 'planos',
                'sort_order' => 2,
                'categories' => [
                    [
                        'name' => 'Mecánica',
                        'slug' => 'mecanica',
                        'sort_order' => 1,
                        'subcategories' => [
                            ['name' => 'General', 'slug' => 'general', 'sort_order' => 1],
                        ],
                    ],
                    [
                        'name' => 'Arquitectura',
                        'slug' => 'arquitectura',
                        'sort_order' => 2,
                        'subcategories' => [
                            ['name' => 'General', 'slug' => 'general', 'sort_order' => 1],
                        ],
                    ],
                ],
            ],
        ];

        foreach ($data as $typeData) {
            $type = Type::create([
                'name' => $typeData['name'],
                'slug' => $typeData['slug'],
                'sort_order' => $typeData['sort_order'],
                'is_active' => true,
            ]);

            foreach ($typeData['categories'] as $categoryData) {
                $category = Category::create([
                    'type_id' => $type->id,
                    'name' => $categoryData['name'],
                    'slug' => $categoryData['slug'],
                    'sort_order' => $categoryData['sort_order'],
                    'is_active' => true,
                ]);

                foreach ($categoryData['subcategories'] as $subcategoryData) {
                    Subcategory::create([
                        'category_id' => $category->id,
                        'name' => $subcategoryData['name'],
                        'slug' => $subcategoryData['slug'],
                        'sort_order' => $subcategoryData['sort_order'],
                        'is_active' => true,
                    ]);
                }
            }
        }
    }
}
