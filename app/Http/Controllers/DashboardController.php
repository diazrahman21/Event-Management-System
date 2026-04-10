<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    /**
     * Show the dashboard.
     */
    public function index()
    {
        $user = Auth::user();

        // Get event statistics
        $totalEvents = Event::count();
        $planningCount = Event::where('status', 'planning')->count();
        $ongoingCount = Event::where('status', 'ongoing')->count();
        $completedCount = Event::where('status', 'selesai')->count();

        // Get budget statistics
        $totalBudget = \DB::table('budgets')->sum('total_planned');
        $totalActual = \DB::table('budgets')->sum('total_actual');

        // Get upcoming events (next 7 days)
        $upcomingEvents = Event::with('creator')
            ->where('start_date', '>=', now())
            ->where('start_date', '<=', now()->addDays(7))
            ->orderBy('start_date')
            ->get();

        return inertia('Dashboard', [
            'stats' => [
                'totalEvents' => $totalEvents,
                'planningCount' => $planningCount,
                'ongoingCount' => $ongoingCount,
                'completedCount' => $completedCount,
                'totalBudget' => $totalBudget ?? 0,
                'totalActual' => $totalActual ?? 0,
            ],
            'upcomingEvents' => $upcomingEvents->map(fn($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'start_date' => $event->start_date,
                'status' => $event->status->value,
            ]),
        ]);
    }
}
