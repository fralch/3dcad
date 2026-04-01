<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;

class RemoveCamionesSubsystem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'subsystem:remove-camiones';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Elimina temporalmente el subsistema de camiones y limpia los archivos y rutas asociados';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Iniciando la eliminación del subsistema de Camiones...');

        // 1. Drop table if exists
        if (Schema::hasTable('camiones')) {
            Schema::dropIfExists('camiones');
            $this->info('- Tabla camiones eliminada.');
        }

        // 2. Delete files
        $filesToDelete = [
            app_path('Models/Camion.php'),
            app_path('Http/Controllers/Admin/CamionController.php'),
            app_path('Http/Controllers/Api/CamionApiController.php'),
            base_path('tests/Feature/Admin/CamionManagementTest.php'),
        ];

        // Find migration file
        $migrations = File::glob(database_path('migrations/*_create_camiones_table.php'));
        $filesToDelete = array_merge($filesToDelete, $migrations);

        foreach ($filesToDelete as $file) {
            if (File::exists($file)) {
                File::delete($file);
                $this->info('- Archivo eliminado: ' . basename($file));
            }
        }

        // Delete React views directory
        $viewsDir = resource_path('js/Pages/Admin/Camiones');
        if (File::isDirectory($viewsDir)) {
            File::deleteDirectory($viewsDir);
            $this->info('- Directorio de vistas eliminado: ' . $viewsDir);
        }

        $layoutFile = resource_path('js/Layouts/CamionesLayout.jsx');
        if (File::exists($layoutFile)) {
            File::delete($layoutFile);
            $this->info('- Archivo de layout eliminado: ' . basename($layoutFile));
        }

        // 3. Clean up web.php
        $this->cleanFileBlocks(
            base_path('routes/web.php'),
            '// SUBSISTEMA_CAMIONES_START',
            '// SUBSISTEMA_CAMIONES_END'
        );

        $this->info('Subsistema de Camiones eliminado correctamente.');
        $this->info('Nota: Recuerda ejecutar "npm run build" o "npm run dev" para actualizar los assets.');

        // 5. Delete this command file itself
        $this->info('- Eliminando este comando de limpieza...');
        File::delete(__FILE__);
    }

    private function cleanFileBlocks($filePath, $startMarker, $endMarker)
    {
        if (!File::exists($filePath)) {
            return;
        }

        $content = File::get($filePath);
        // regex to match everything between start and end markers (including markers)
        $pattern = '/' . $startMarker . '.*?' . $endMarker . '\s*/s';
        
        if (preg_match($pattern, $content)) {
            $cleanContent = preg_replace($pattern, '', $content);
            File::put($filePath, $cleanContent);
            $this->info('- Limpiadas las referencias en: ' . basename($filePath));
        }
    }
}
