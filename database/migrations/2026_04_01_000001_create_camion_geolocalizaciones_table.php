<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('camion_geolocalizaciones', function (Blueprint $table) {
            $table->id();
            $table->foreignId('camion_id')->constrained('camiones')->cascadeOnDelete();
            $table->decimal('latitud', 10, 7);
            $table->decimal('longitud', 10, 7);
            $table->dateTime('timestamp');
            $table->timestamps();

            $table->index(['camion_id', 'timestamp']);
            $table->index('timestamp');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('camion_geolocalizaciones');
    }
};
