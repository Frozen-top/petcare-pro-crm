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
use App\Http\Controllers\OnboardingController;
use App\Models\AppSetting;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'trialDays' => AppSetting::getTrialDays(),
    ]);
});

// Additional landing pages
Route::get('/about', fn() => Inertia::render('About'))->name('about');
Route::get('/features', fn() => Inertia::render('Features'))->name('features');
Route::get('/pricing', fn() => Inertia::render('Pricing', [
    'trialDays' => AppSetting::getTrialDays(),
    'monthlyPrice' => AppSetting::getMonthlyPrice(),
]))->name('pricing');
Route::get('/contact', fn() => Inertia::render('Contact'))->name('contact');

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

    // Onboarding routes
    Route::prefix('onboarding')->name('onboarding.')->group(function () {
        Route::get('/core-activity', [OnboardingController::class, 'coreActivity'])->name('core-activity');
        Route::post('/core-activity', [OnboardingController::class, 'storeCoreActivity']);

        Route::get('/theme', [OnboardingController::class, 'theme'])->name('theme');
        Route::post('/theme', [OnboardingController::class, 'storeTheme']);

        Route::get('/tutorial', [OnboardingController::class, 'tutorial'])->name('tutorial');
        Route::post('/complete', [OnboardingController::class, 'complete'])->name('complete');
    });

    // Admin routes
    Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
        Route::get('/settings', fn() => Inertia::render('Admin/Settings'))->name('settings');

        Route::get('/settings/current', function() {
            return response()->json([
                'trial_days' => \App\Models\AppSetting::getTrialDays(),
                'monthly_price' => \App\Models\AppSetting::getMonthlyPrice(),
            ]);
        });

        Route::post('/settings', function(\Illuminate\Http\Request $request) {
            $validated = $request->validate([
                'trial_days' => 'required|integer|min:1|max:90',
                'monthly_price' => 'required|numeric|min:0',
            ]);

            \App\Models\AppSetting::set('trial_days', $validated['trial_days'], 'integer');
            \App\Models\AppSetting::set('monthly_price', $validated['monthly_price'], 'string');

            return back()->with('success', 'Settings updated successfully.');
        })->name('settings.update');

        Route::get('/users', fn() => Inertia::render('Admin/Users', [
            'users' => \App\Models\User::with(['client', 'staff'])
                ->withCount(['client' => function($q) {
                    $q->withCount('pets');
                }])
                ->paginate(20)
        ]))->name('users');
    });

    // Theme settings
    Route::post('/settings/theme', function(\Illuminate\Http\Request $request) {
        $validated = $request->validate([
            'theme_preference' => 'required|in:white,gray,black,system',
        ]);

        auth()->user()->update(['theme_preference' => $validated['theme_preference']]);

        return back()->with('success', 'Theme updated successfully.');
    })->name('settings.theme');
});

require __DIR__.'/auth.php';
