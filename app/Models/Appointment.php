<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Appointment extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'client_id', 'pet_id', 'service_id', 'staff_id', 'scheduled_at',
        'completed_at', 'duration_minutes', 'status', 'notes', 'client_notes',
        'price', 'cancellation_reason', 'cancelled_at'
    ];

    protected function casts(): array
    {
        return [
            'scheduled_at' => 'datetime',
            'completed_at' => 'datetime',
            'cancelled_at' => 'datetime',
            'price' => 'decimal:2',
        ];
    }

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function pet()
    {
        return $this->belongsTo(Pet::class);
    }

    public function service()
    {
        return $this->belongsTo(Service::class);
    }

    public function staff()
    {
        return $this->belongsTo(Staff::class);
    }

    public function medicalRecords()
    {
        return $this->hasMany(MedicalRecord::class);
    }

    public function invoice()
    {
        return $this->hasOne(Invoice::class);
    }

    public function reminders()
    {
        return $this->hasMany(Reminder::class);
    }

    public function isUpcoming(): bool
    {
        return $this->scheduled_at->isFuture() && in_array($this->status, ['scheduled', 'confirmed']);
    }

    public function isPast(): bool
    {
        return $this->scheduled_at->isPast();
    }

    public function canBeCancelled(): bool
    {
        return in_array($this->status, ['scheduled', 'confirmed']);
    }
}
