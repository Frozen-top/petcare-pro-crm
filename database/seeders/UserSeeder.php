<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Client;
use App\Models\Staff;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@petcare.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '(555) 123-4567',
            'address' => '123 Main St',
            'city' => 'New York',
            'state' => 'NY',
            'zip_code' => '10001',
            'is_active' => true,
        ]);

        // Create Staff Users
        $vet = User::create([
            'name' => 'Dr. Sarah Johnson',
            'email' => 'sarah@petcare.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '(555) 234-5678',
            'is_active' => true,
        ]);

        Staff::create([
            'user_id' => $vet->id,
            'position' => 'Veterinarian',
            'specializations' => 'General Practice, Surgery',
            'hire_date' => now()->subYears(3),
            'hourly_rate' => 75.00,
            'certifications' => 'DVM, Board Certified',
            'can_handle_appointments' => true,
        ]);

        $groomer = User::create([
            'name' => 'Mike Chen',
            'email' => 'mike@petcare.com',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '(555) 345-6789',
            'is_active' => true,
        ]);

        Staff::create([
            'user_id' => $groomer->id,
            'position' => 'Professional Groomer',
            'specializations' => 'All breeds grooming',
            'hire_date' => now()->subYears(2),
            'hourly_rate' => 35.00,
            'certifications' => 'Certified Master Groomer',
            'can_handle_appointments' => true,
        ]);

        // Create Sample Clients
        $client1 = User::create([
            'name' => 'John Smith',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '(555) 456-7890',
            'address' => '456 Oak Avenue',
            'city' => 'Brooklyn',
            'state' => 'NY',
            'zip_code' => '11201',
            'is_active' => true,
        ]);

        Client::create([
            'user_id' => $client1->id,
            'notes' => 'Regular client, prefers morning appointments',
            'preferred_contact' => 'email',
            'emergency_contact_name' => 'Jane Smith',
            'emergency_contact_phone' => '(555) 567-8901',
        ]);

        $client2 = User::create([
            'name' => 'Emily Davis',
            'email' => 'emily@example.com',
            'password' => Hash::make('password'),
            'role' => 'client',
            'phone' => '(555) 678-9012',
            'address' => '789 Pine Street',
            'city' => 'Queens',
            'state' => 'NY',
            'zip_code' => '11354',
            'is_active' => true,
        ]);

        Client::create([
            'user_id' => $client2->id,
            'notes' => 'First-time pet owner',
            'preferred_contact' => 'phone',
        ]);
    }
}
