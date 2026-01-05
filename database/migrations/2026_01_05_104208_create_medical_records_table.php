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
        Schema::create('medical_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('staff_id')->nullable()->constrained()->onDelete('set null');
            $table->date('visit_date');
            $table->string('diagnosis')->nullable();
            $table->text('symptoms')->nullable();
            $table->text('treatment')->nullable();
            $table->text('medications')->nullable();
            $table->decimal('weight', 8, 2)->nullable();
            $table->decimal('temperature', 5, 2)->nullable();
            $table->text('notes')->nullable();
            $table->json('attachments')->nullable();
            $table->date('follow_up_date')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->index('visit_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medical_records');
    }
};
