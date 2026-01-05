<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use App\Models\Client;
use App\Models\PetType;
use App\Models\Breed;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pet::with(['client.user', 'petType', 'breed'])
            ->orderBy('created_at', 'desc');

        // Search by pet name or client name
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhereHas('client.user', function ($q) use ($request) {
                      $q->where('name', 'like', '%' . $request->search . '%');
                  });
            });
        }

        // Filter by pet type
        if ($request->pet_type_id) {
            $query->where('pet_type_id', $request->pet_type_id);
        }

        // Filter by client
        if ($request->client_id) {
            $query->where('client_id', $request->client_id);
        }

        $pets = $query->paginate(15)->withQueryString();

        $petTypes = PetType::all();
        $clients = Client::with('user')->get();

        return Inertia::render('Pets/Index', [
            'pets' => $pets,
            'petTypes' => $petTypes,
            'clients' => $clients,
            'filters' => $request->only(['search', 'pet_type_id', 'client_id']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $clients = Client::with('user')->get();
        $petTypes = PetType::all();
        $breeds = Breed::all();

        return Inertia::render('Pets/Create', [
            'clients' => $clients,
            'petTypes' => $petTypes,
            'breeds' => $breeds,
            'selectedClientId' => $request->client_id,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'pet_type_id' => 'required|exists:pet_types,id',
            'breed_id' => 'nullable|exists:breeds,id',
            'name' => 'required|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'color' => 'nullable|string|max:255',
            'weight' => 'nullable|numeric|min:0',
            'microchip_number' => 'nullable|string|max:255',
            'medical_notes' => 'nullable|string',
            'behavioral_notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        Pet::create($validated);

        return redirect()->route('pets.index')->with('success', 'Pet created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $pet)
    {
        $pet->load([
            'client.user',
            'petType',
            'breed',
            'appointments.service',
            'appointments.staff.user',
            'medicalRecords',
            'vaccinations',
        ]);

        return Inertia::render('Pets/Show', [
            'pet' => $pet,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pet $pet)
    {
        $pet->load(['client.user', 'petType', 'breed']);

        $clients = Client::with('user')->get();
        $petTypes = PetType::all();
        $breeds = Breed::all();

        return Inertia::render('Pets/Edit', [
            'pet' => $pet,
            'clients' => $clients,
            'petTypes' => $petTypes,
            'breeds' => $breeds,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $pet)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'pet_type_id' => 'required|exists:pet_types,id',
            'breed_id' => 'nullable|exists:breeds,id',
            'name' => 'required|string|max:255',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:male,female',
            'color' => 'nullable|string|max:255',
            'weight' => 'nullable|numeric|min:0',
            'microchip_number' => 'nullable|string|max:255',
            'medical_notes' => 'nullable|string',
            'behavioral_notes' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $pet->update($validated);

        return redirect()->route('pets.show', $pet)->with('success', 'Pet updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $pet)
    {
        $pet->delete();

        return redirect()->route('pets.index')->with('success', 'Pet deleted successfully.');
    }
}
