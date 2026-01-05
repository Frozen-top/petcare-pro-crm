<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            ['name' => 'General Checkup', 'description' => 'Routine health examination', 'base_price' => 50.00, 'duration_minutes' => 30, 'category' => 'veterinary', 'color' => '#10B981'],
            ['name' => 'Vaccination', 'description' => 'Preventive vaccination service', 'base_price' => 35.00, 'duration_minutes' => 15, 'category' => 'veterinary', 'color' => '#3B82F6'],
            ['name' => 'Bath & Brush', 'description' => 'Basic grooming with bath', 'base_price' => 40.00, 'duration_minutes' => 60, 'category' => 'grooming', 'color' => '#8B5CF6'],
            ['name' => 'Full Grooming', 'description' => 'Complete grooming package with haircut', 'base_price' => 75.00, 'duration_minutes' => 90, 'category' => 'grooming', 'color' => '#8B5CF6'],
            ['name' => 'Dental Cleaning', 'description' => 'Professional dental care', 'base_price' => 120.00, 'duration_minutes' => 45, 'category' => 'veterinary', 'color' => '#10B981'],
            ['name' => 'Nail Trimming', 'description' => 'Nail care service', 'base_price' => 15.00, 'duration_minutes' => 15, 'category' => 'grooming', 'color' => '#8B5CF6'],
            ['name' => 'Daycare (Full Day)', 'description' => 'Full day pet care', 'base_price' => 30.00, 'duration_minutes' => 480, 'category' => 'daycare', 'color' => '#F59E0B'],
            ['name' => 'Boarding (Per Night)', 'description' => 'Overnight pet boarding', 'base_price' => 45.00, 'duration_minutes' => 1440, 'category' => 'boarding', 'color' => '#EC4899'],
            ['name' => 'Basic Training Session', 'description' => 'Obedience and behavior training', 'base_price' => 60.00, 'duration_minutes' => 60, 'category' => 'training', 'color' => '#6366F1'],
            ['name' => 'Emergency Visit', 'description' => 'Urgent medical attention', 'base_price' => 150.00, 'duration_minutes' => 60, 'category' => 'veterinary', 'color' => '#EF4444'],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
