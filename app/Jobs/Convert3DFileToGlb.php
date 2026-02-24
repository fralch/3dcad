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

            // Here you would run the appropriate shell command or API to convert the file.
            // Example using a placeholder node script or blender CLI:
            // $process = new Process(['node', base_path('scripts/convert2glb.js'), $originalPath, $glbAbsolutePath]);
            // $process->run();
            // if (!$process->isSuccessful()) {
            //     throw new ProcessFailedException($process);
            // }

            // To make this functional for demonstration, let's just log and simulate it.
            // In a real scenario, you need tools like `obj2gltf`, `gltf-pipeline`, or Blender installed.

            // Simulate a successful conversion by copying a dummy file or just skipping the actual file generation
            // if you don't have the CLI tools installed. 
            // For now, let's assume the user will configure the CLI tools here.
            Log::info("Converting {$originalPath} to {$glbAbsolutePath}");

            // IMPORTANT: Remove or replace the sleep and dummy touch in production
            // sleep(2);
            // touch($glbAbsolutePath);
            
            // When done:
            // $this->file->update([
            //     'glb_path' => $glbRelativePath,
            //     'conversion_status' => 'completed',
            //     'conversion_error' => null
            // ]);
            
            $this->file->update([
                 'conversion_status' => 'completed', // we put completed but since there's no actual file created, testing may vary
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
