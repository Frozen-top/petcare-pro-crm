<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Vaccination extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'pet_id', 'medical_record_id', 'vaccine_name', 'vaccine_type',
        'administered_date', 'expiry_date', 'next_due_date', 'batch_number',
        'administered_by', 'notes', 'reminder_sent'
    ];

    protected function casts(): array
    {
        return [
            'administered_date' => 'date',
            'expiry_date' => 'date',
            'next_due_date' => 'date',
            'reminder_sent' => 'boolean',
        ];
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function medicalRecord()
    {
        return $this->belongsTo(MedicalRecord::class);
    }

    public function isDue(): bool
    {
        return $this->next_due_date && $this->next_due_date->isPast();
    }

    public function isExpired(): bool
    {
        return $this->expiry_date && $this->expiry_date->isPast();
    }
}
