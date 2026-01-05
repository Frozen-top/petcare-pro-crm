<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'phone',
        'avatar',
        'address',
        'city',
        'state',
        'zip_code',
        'is_active',
        'trial_ends_at',
        'is_trial_expired',
        'core_activity',
        'theme_preference',
        'onboarding_completed',
        'subscription_status',
        'stripe_customer_id',
        'subscription_ends_at',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
            'trial_ends_at' => 'datetime',
            'subscription_ends_at' => 'datetime',
            'is_trial_expired' => 'boolean',
            'onboarding_completed' => 'boolean',
        ];
    }

    public function client()
    {
        return $this->hasOne(Client::class);
    }

    public function staff()
    {
        return $this->hasOne(Staff::class);
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isStaff(): bool
    {
        return $this->role === 'staff';
    }

    public function isClient(): bool
    {
        return $this->role === 'client';
    }

    /**
     * Check if user is on trial
     */
    public function isOnTrial(): bool
    {
        return $this->subscription_status === 'trial' &&
               $this->trial_ends_at &&
               $this->trial_ends_at->isFuture();
    }

    /**
     * Check if trial has expired
     */
    public function hasTrialExpired(): bool
    {
        return $this->trial_ends_at && $this->trial_ends_at->isPast();
    }

    /**
     * Get days remaining in trial
     */
    public function trialDaysRemaining(): int
    {
        if (!$this->trial_ends_at || $this->trial_ends_at->isPast()) {
            return 0;
        }

        return now()->diffInDays($this->trial_ends_at);
    }

    /**
     * Check if user needs onboarding
     */
    public function needsOnboarding(): bool
    {
        return !$this->onboarding_completed;
    }

    protected static function boot()
    {
        parent::boot();

        // Automatically create client/staff records and set trial when user is created
        static::created(function ($user) {
            // Set trial period for non-admin users
            if ($user->role !== 'admin' && !$user->trial_ends_at) {
                $trialDays = AppSetting::getTrialDays();
                $user->trial_ends_at = now()->addDays($trialDays);
                $user->subscription_status = 'trial';
                $user->save();
            }

            // Create client record for client users
            if ($user->role === 'client' && !$user->client) {
                Client::create([
                    'user_id' => $user->id,
                    'preferred_contact' => 'email',
                ]);
            }
        });
    }
}
