<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('camiones', function (Blueprint $table) {
            $table->id();
            $table->string('placa')->unique();
            $table->string('marca');
            $table->string('modelo');
            $table->unsignedSmallInteger('anio');
            $table->decimal('capacidad_carga', 10, 2)->nullable();
            $table->enum('estado', ['activo', 'mantenimiento', 'inactivo'])->default('activo');
            $table->string('conductor_asignado')->nullable();
            $table->text('observaciones')->nullable();
            $table->timestamps();

            $table->index('estado');
            $table->index('marca');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('camiones');
    }
};
