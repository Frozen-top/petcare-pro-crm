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

        if ($user->isAdmin()) {
            return $this->adminDashboard();
        }

        return $this->staffDashboard();
    }

    private function adminDashboard()
    {
        $stats = [
            'total_clients' => Client::count(),
            'total_pets' => Pet::count(),
            'total_appointments' => Appointment::count(),
            'total_revenue' => Invoice::where('status', 'paid')->sum('total'),
            'pending_invoices_count' => Invoice::whereIn('status', ['draft', 'sent'])->count(),
            'pending_invoices_amount' => Invoice::whereIn('status', ['draft', 'sent'])->sum('total'),
            'today_appointments' => Appointment::whereDate('scheduled_at', today())->count(),
            'this_month_revenue' => Invoice::where('status', 'paid')
                ->whereMonth('paid_at', now()->month)
                ->sum('total'),
        ];

        // Revenue trend (last 6 months)
        $revenue_trend = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $revenue_trend[] = [
                'month' => $date->format('M Y'),
                'revenue' => Invoice::where('status', 'paid')
                    ->whereYear('paid_at', $date->year)
                    ->whereMonth('paid_at', $date->month)
                    ->sum('total')
            ];
        }

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

        $overdue_invoices = Invoice::with('client.user')
            ->where('status', '!=', 'paid')
            ->where('due_date', '<', now())
            ->orderBy('due_date')
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard/AdminDashboard', compact(
            'stats',
            'revenue_trend',
            'todays_appointments',
            'upcoming_appointments',
            'recent_clients',
            'overdue_invoices'
        ));
    }

    private function clientDashboard()
    {
        $user = auth()->user();
        $client = $user->client;

        // If client record doesn't exist, create it
        if (!$client) {
            $client = Client::create([
                'user_id' => $user->id,
                'preferred_contact' => 'email',
            ]);
        }

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
