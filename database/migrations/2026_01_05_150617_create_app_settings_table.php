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
        Schema::create('app_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('type')->default('string'); // string, integer, boolean, json
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Insert default settings
        DB::table('app_settings')->insert([
            [
                'key' => 'trial_days',
                'value' => '14',
                'type' => 'integer',
                'description' => 'Number of trial days for new users',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'stripe_enabled',
                'value' => 'false',
                'type' => 'boolean',
                'description' => 'Enable Stripe payment processing',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'monthly_price',
                'value' => '29.99',
                'type' => 'string',
                'description' => 'Monthly subscription price',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('app_settings');
    }
};
