<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Client;
use App\Models\Pet;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();

        if ($user->isClient()) {
            return $this->clientDashboard();
        }

        return $this->staffDashboard();
    }

    private function clientDashboard()
    {
        $client = auth()->user()->client;

        $stats = [
            'total_pets' => $client->pets()->count(),
            'upcoming_appointments' => $client->appointments()
                ->where('status', 'scheduled')
                ->where('scheduled_at', '>', now())
                ->count(),
            'total_spent' => $client->invoices()
                ->where('status', 'paid')
                ->sum('total'),
            'pending_invoices' => $client->invoices()
                ->whereIn('status', ['draft', 'sent'])
                ->count(),
        ];

        $upcoming_appointments = $client->appointments()
            ->with(['pet', 'service', 'staff.user'])
            ->where('scheduled_at', '>', now())
            ->orderBy('scheduled_at')
            ->limit(5)
            ->get();

        $pets = $client->pets()
            ->with(['petType', 'breed'])
            ->where('is_active', true)
            ->get();

        $recent_invoices = $client->invoices()
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Dashboard/ClientDashboard', compact(
            'stats',
            'upcoming_appointments',
            'pets',
            'recent_invoices'
        ));
    }

    private function staffDashboard()
    {
        $stats = [
            'total_clients' => Client::count(),
            'total_pets' => Pet::count(),
            'today_appointments' => Appointment::whereDate('scheduled_at', today())->count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('total'),
        ];

        $todays_appointments = Appointment::with(['client.user', 'pet', 'service', 'staff.user'])
            ->whereDate('scheduled_at', today())
            ->orderBy('scheduled_at')
            ->get();

        $upcoming_appointments = Appointment::with(['client.user', 'pet', 'service', 'staff.user'])
            ->where('scheduled_at', '>', now())
            ->where('scheduled_at', '<', now()->addDays(7))
            ->orderBy('scheduled_at')
            ->limit(10)
            ->get();

        $recent_clients = Client::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $pending_invoices = Invoice::with('client.user')
            ->whereIn('status', ['draft', 'sent'])
            ->orderBy('due_date')
            ->get();

        return Inertia::render('Dashboard/StaffDashboard', compact(
            'stats',
            'todays_appointments',
            'upcoming_appointments',
            'recent_clients',
            'pending_invoices'
        ));
    }
}
