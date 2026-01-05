<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pet extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id', 'pet_type_id', 'breed_id', 'name', 'date_of_birth',
        'gender', 'color', 'weight', 'microchip_number', 'photo',
        'medical_notes', 'behavioral_notes', 'is_active'
    ];

    protected function casts(): array
    {
        return [
            'date_of_birth' => 'date',
            'weight' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function petType()
    {
        return $this->belongsTo(PetType::class);
    }

    public function breed()
    {
        return $this->belongsTo(Breed::class);
    }

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }

    public function reminders()
    {
        return $this->hasMany(Reminder::class);
    }

    public function getAgeAttribute(): ?string
    {
        if (!$this->date_of_birth) return null;
        
        $now = now();
        $years = $this->date_of_birth->diffInYears($now);
        $months = $this->date_of_birth->copy()->addYears($years)->diffInMonths($now);
        
        if ($years > 0) {
            return $years . ' year' . ($years > 1 ? 's' : '') .
                   ($months > 0 ? ' ' . $months . ' month' . ($months > 1 ? 's' : '') : '');
        }
        
        return $months . ' month' . ($months > 1 ? 's' : '');
    }
}
