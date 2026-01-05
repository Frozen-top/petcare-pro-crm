<?php

namespace Database\Seeders;

use App\Models\PetType;
use App\Models\Breed;
use Illuminate\Database\Seeder;

class PetTypeSeeder extends Seeder
{
    public function run(): void
    {
        $petTypes = [
            [
                'name' => 'Dog',
                'icon' => '🐕',
                'breeds' => ['Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'Bulldog', 'Beagle', 'Poodle', 'Rottweiler', 'Yorkshire Terrier', 'Boxer', 'Dachshund']
            ],
            [
                'name' => 'Cat',
                'icon' => '🐈',
                'breeds' => ['Persian', 'Maine Coon', 'Siamese', 'Ragdoll', 'Bengal', 'British Shorthair', 'Abyssinian', 'Birman', 'Oriental Shorthair', 'Sphynx']
            ],
            [
                'name' => 'Bird',
                'icon' => '🦜',
                'breeds' => ['Parrot', 'Canary', 'Finch', 'Cockatiel', 'Budgerigar', 'Macaw', 'Cockatoo', 'Lovebird']
            ],
            [
                'name' => 'Rabbit',
                'icon' => '🐰',
                'breeds' => ['Holland Lop', 'Netherland Dwarf', 'Mini Rex', 'Lionhead', 'Flemish Giant', 'English Angora']
            ],
            [
                'name' => 'Hamster',
                'icon' => '🐹',
                'breeds' => ['Syrian', 'Dwarf Campbell Russian', 'Dwarf Winter White Russian', 'Roborovski', 'Chinese']
            ],
        ];

        foreach ($petTypes as $type) {
            $petType = PetType::create([
                'name' => $type['name'],
                'icon' => $type['icon'],
            ]);

            foreach ($type['breeds'] as $breedName) {
                Breed::create([
                    'pet_type_id' => $petType->id,
                    'name' => $breedName,
                ]);
            }
        }
    }
}
