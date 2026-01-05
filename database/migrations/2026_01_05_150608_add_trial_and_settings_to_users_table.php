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
        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('trial_ends_at')->nullable()->after('email_verified_at');
            $table->boolean('is_trial_expired')->default(false)->after('trial_ends_at');
            $table->string('core_activity')->nullable()->after('is_trial_expired');
            $table->string('theme_preference')->default('gray')->after('core_activity');
            $table->boolean('onboarding_completed')->default(false)->after('theme_preference');
            $table->string('subscription_status')->default('trial')->after('onboarding_completed');
            $table->string('stripe_customer_id')->nullable()->after('subscription_status');
            $table->timestamp('subscription_ends_at')->nullable()->after('stripe_customer_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'trial_ends_at',
                'is_trial_expired',
                'core_activity',
                'theme_preference',
                'onboarding_completed',
                'subscription_status',
                'stripe_customer_id',
                'subscription_ends_at',
            ]);
        });
    }
};
