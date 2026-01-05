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
        Schema::create('vaccinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pet_id')->constrained()->onDelete('cascade');
            $table->foreignId('medical_record_id')->nullable()->constrained()->onDelete('set null');
            $table->string('vaccine_name');
            $table->string('vaccine_type')->nullable();
            $table->date('administered_date');
            $table->date('expiry_date')->nullable();
            $table->date('next_due_date')->nullable();
            $table->string('batch_number')->nullable();
            $table->string('administered_by')->nullable();
            $table->text('notes')->nullable();
            $table->boolean('reminder_sent')->default(false);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['pet_id', 'next_due_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vaccinations');
    }
};
