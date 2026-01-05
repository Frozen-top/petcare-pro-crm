<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MedicalRecord extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'pet_id', 'appointment_id', 'staff_id', 'visit_date', 'diagnosis',
        'symptoms', 'treatment', 'medications', 'weight', 'temperature',
        'notes', 'attachments', 'follow_up_date'
    ];

    protected function casts(): array
    {
        return [
            'visit_date' => 'date',
            'follow_up_date' => 'date',
            'weight' => 'decimal:2',
            'temperature' => 'decimal:2',
            'attachments' => 'array',
        ];
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function appointment()
    {
        return $this->belongsTo(Appointment::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function vaccinations()
    {
        return $this->hasMany(Vaccination::class);
    }
}
