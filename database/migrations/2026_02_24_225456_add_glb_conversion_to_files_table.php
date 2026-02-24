<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('files', function (Blueprint $table) {
            $table->string('glb_path')->nullable()->after('file_type');
            $table->enum('conversion_status', ['pending', 'processing', 'completed', 'failed'])->default('pending')->after('glb_path');
            $table->text('conversion_error')->nullable()->after('conversion_status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files', function (Blueprint $table) {
            $table->dropColumn(['glb_path', 'conversion_status', 'conversion_error']);
        });
    }
};
