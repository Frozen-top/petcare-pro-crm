<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\MedicalRecordController;
use App\Http\Controllers\VaccinationController;
use App\Http\Controllers\InvoiceController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Resource routes
    Route::resource('clients', ClientController::class);
    Route::resource('pets', PetController::class);
    Route::resource('appointments', AppointmentController::class);
    Route::resource('services', ServiceController::class);
    Route::resource('staff', StaffController::class);
    Route::resource('medical-records', MedicalRecordController::class);
    Route::resource('vaccinations', VaccinationController::class);
    Route::resource('invoices', InvoiceController::class);

    // Additional routes
    Route::post('/appointments/{appointment}/complete', [AppointmentController::class, 'complete'])
        ->name('appointments.complete');
    Route::post('/appointments/{appointment}/cancel', [AppointmentController::class, 'cancel'])
        ->name('appointments.cancel');
    Route::post('/invoices/{invoice}/pay', [InvoiceController::class, 'markAsPaid'])
        ->name('invoices.pay');
});

require __DIR__.'/auth.php';
