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
        Schema::create('pets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('pet_type_id')->constrained();
            $table->foreignId('breed_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->date('date_of_birth')->nullable();
            $table->enum('gender', ['male', 'female', 'unknown'])->default('unknown');
            $table->string('color')->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->string('microchip_number')->nullable()->unique();
            $table->string('photo')->nullable();
            $table->text('medical_notes')->nullable();
            $table->text('behavioral_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pets');
    }
};
