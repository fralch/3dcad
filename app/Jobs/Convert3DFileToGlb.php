<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

use App\Models\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class Convert3DFileToGlb implements ShouldQueue
{
    use Queueable;

    public $file;

    /**
     * Create a new job instance.
     */
    public function __construct(File $file)
    {
        $this->file = $file;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        // Indicate conversion started
        $this->file->update(['conversion_status' => 'processing']);

        try {
            $extension = strtolower(pathinfo($this->file->file_path, PATHINFO_EXTENSION));
            $supportedExtensions = ['stl', 'obj', 'fbx', 'blend', 'dwg', 'dxf', 'step', 'stp'];

            if (!in_array($extension, $supportedExtensions)) {
                throw new \Exception("Formato no soportado para conversión automática.");
            }

            // Path to the original file
            $originalPath = Storage::disk('public')->path($this->file->file_path);

            // Generate a new GLB filename
            $glbFileName = Str::random(10) . '_' . time() . '.glb';
            $glbRelativePath = 'files/glb/' . $glbFileName;
            
            // Ensure the directoy exists
            Storage::disk('public')->makeDirectory('files/glb');
            $glbAbsolutePath = Storage::disk('public')->path($glbRelativePath);

            // =========================================================================
            // AQUÍ DEBE IR TU LÓGICA DE CONVERSIÓN REAL (Node.js, Python, Blender)
            // =========================================================================
            // Ejemplo usando una hipotética librería node `obj2gltf` mediante consola:
            // $process = new Process(['node', base_path('scripts/convert2glb.js'), $originalPath, $glbAbsolutePath]);
            // $process->run();
            // if (!$process->isSuccessful()) {
            //     throw new ProcessFailedException($process);
            // }

            Log::info("Simulando la conversion de {$originalPath} -> {$glbAbsolutePath}");

            // Para evitar el error 403 (Archivo no encontrado en Frontend),
            // generaremos un modelo .glb genérico temporalmente copiando un archivo de prueba.
            // Una vez que integres tu script real, borra estas 3 líneas de aquí abajo.
            $dummyGlb = Storage::disk('public')->path('files/glb/placeholder.glb');
            if (file_exists($dummyGlb)) {
                copy($dummyGlb, $glbAbsolutePath);
            } else {
                // Si por alguna razón el placeholder no está, creamos un archivo vacío 
                // para evitar error de rutas, aunque el 3D pueda mostrar error de parseo.
                touch($glbAbsolutePath);
            }
            
            // Actualizamos la base de datos con éxito
            $this->file->update([
                 'conversion_status' => 'completed',
                 'glb_path' => $glbRelativePath
            ]);

        } catch (\Exception $e) {
            Log::error('Conversion failed: ' . $e->getMessage());
            $this->file->update([
                'conversion_status' => 'failed',
                'conversion_error' => $e->getMessage()
            ]);
        }
    }
}
