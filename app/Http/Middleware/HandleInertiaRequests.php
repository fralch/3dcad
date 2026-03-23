<?php

namespace App\Http\Middleware;

use App\Models\File;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'stats' => [
                'totalFiles' => File::active()->count(),
            ],
            'sharedTypes' => \App\Models\Type::with(['categories' => function ($query) {
                $query->active()->ordered()->with(['subcategories' => function ($query) {
                    $query->active()->ordered()->withCount('files');
                }]);
            }])->active()->ordered()->get(),
        ];
    }
}
