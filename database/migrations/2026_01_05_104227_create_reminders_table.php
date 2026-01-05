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
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->foreignId('pet_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('appointment_id')->nullable()->constrained()->onDelete('set null');
            $table->enum('type', ['appointment', 'vaccination', 'checkup', 'medication', 'general'])->default('general');
            $table->string('title');
            $table->text('message');
            $table->dateTime('remind_at');
            $table->enum('status', ['pending', 'sent', 'cancelled'])->default('pending');
            $table->dateTime('sent_at')->nullable();
            $table->enum('delivery_method', ['email', 'sms', 'push'])->default('email');
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'remind_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
