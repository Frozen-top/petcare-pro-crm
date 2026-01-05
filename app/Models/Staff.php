<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Staff extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id', 'position', 'specializations', 'hire_date',
        'hourly_rate', 'certifications', 'can_handle_appointments'
    ];

    protected function casts(): array
    {
        return [
            'hire_date' => 'date',
            'hourly_rate' => 'decimal:2',
            'can_handle_appointments' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    public function getFullNameAttribute(): string
    {
        return $this->user->name;
    }
}
