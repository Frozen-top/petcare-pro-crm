<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    /**
     * Show the core activity selection step
     */
    public function coreActivity()
    {
        return Inertia::render('Onboarding/CoreActivity');
    }

    /**
     * Save core activity and move to theme selection
     */
    public function storeCoreActivity(Request $request)
    {
        $validated = $request->validate([
            'core_activity' => 'required|string|max:255',
        ]);

        $user = auth()->user();
        $user->core_activity = $validated['core_activity'];
        $user->save();

        return redirect()->route('onboarding.theme');
    }

    /**
     * Show theme customization step
     */
    public function theme()
    {
        return Inertia::render('Onboarding/Theme');
    }

    /**
     * Save theme preference and move to tutorial
     */
    public function storeTheme(Request $request)
    {
        $validated = $request->validate([
            'theme_preference' => 'required|in:white,gray,black,system',
        ]);

        $user = auth()->user();
        $user->theme_preference = $validated['theme_preference'];
        $user->save();

        return redirect()->route('onboarding.tutorial');
    }

    /**
     * Show tutorial step
     */
    public function tutorial()
    {
        return Inertia::render('Onboarding/Tutorial');
    }

    /**
     * Complete onboarding
     */
    public function complete()
    {
        $user = auth()->user();
        $user->onboarding_completed = true;
        $user->save();

        return redirect()->route('dashboard')->with('success', 'Welcome to PetCare Pro! Your account is ready.');
    }
}
