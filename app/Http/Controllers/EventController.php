<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEventRequest;
use App\Http\Requests\UpdateEventRequest;
use App\Http\Requests\UpdateEventStatusRequest;
use App\Models\Event;
use App\Models\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class EventController extends Controller
{
    /**
     * Display a listing of the events.
     */
    public function index()
    {
        $events = Event::with('creator', 'clients', 'budget')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return inertia('Events/Index', [
            'events' => $events->map(fn($event) => [
                'id' => $event->id,
                'title' => $event->title,
                'location' => $event->location,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'status' => $event->status?->value,
                'created_by' => $event->creator->name,
                'client_count' => $event->clients->count(),
                'budget' => $event->budget?->total_planned ?? 0,
            ]),
            'filters' => request()->only(['search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new event.
     */
    public function create()
    {
        $clients = Client::select('id', 'name')->get();

        return inertia('Events/Create', [
            'clients' => $clients,
        ]);
    }

    /**
     * Store a newly created event in storage.
     */
    public function store(StoreEventRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::id();

        $event = Event::create($validated);

        // Attach clients if provided
        if (!empty($validated['client_ids'])) {
            foreach ($validated['client_ids'] as $clientId) {
                DB::table('client_event')->insert([
                    'id' => \Illuminate\Support\Str::uuid(),
                    'client_id' => $clientId,
                    'event_id' => $event->id,
                    'role' => 'organizer',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Create budget for the event
        $event->budget()->create([
            'total_planned' => 0,
            'total_actual' => 0,
        ]);

        return redirect(route('events.show', $event->id))
            ->with('success', 'Event created successfully.');
    }

    /**
     * Display the specified event.
     */
    public function show(Event $event)
    {
        $event->load('creator', 'clients', 'budget.items', 'timelines.assignee');

        return inertia('Events/Show', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'status' => $event->status?->value,
                'created_by' => $event->creator->name,
                'clients' => $event->clients->map(fn($c) => ['id' => $c->id, 'name' => $c->name]),
                'budget' => $event->budget ? [
                    'id' => $event->budget->id,
                    'total_planned' => $event->budget->total_planned,
                    'total_actual' => $event->budget->total_actual,
                    'items' => $event->budget->items->map(fn($item) => [
                        'id' => $item->id,
                        'category' => $item->category,
                        'description' => $item->description,
                        'planned_amount' => $item->planned_amount,
                        'actual_amount' => $item->actual_amount,
                        'status' => $item->status?->value,
                    ]),
                ] : null,
                'timelines' => $event->timelines->map(fn($t) => [
                    'id' => $t->id,
                    'title' => $t->title,
                    'description' => $t->description,
                    'due_date' => $t->due_date,
                    'status' => $t->status?->value,
                    'order' => $t->order,
                    'assigned_to' => $t->assignee?->name,
                ]),
            ],
            'can' => [
                'update' => Auth::user()->hasRole('admin'),
                'delete' => Auth::user()->hasRole('admin'),
                'updateStatus' => Auth::user()->hasRole('admin'),
            ],
        ]);
    }

    /**
     * Show the form for editing the specified event.
     */
    public function edit(Event $event)
    {
        $event->load('clients');
        $clients = Client::select('id', 'name')->get();

        return inertia('Events/Edit', [
            'event' => [
                'id' => $event->id,
                'title' => $event->title,
                'description' => $event->description,
                'location' => $event->location,
                'start_date' => $event->start_date,
                'end_date' => $event->end_date,
                'status' => $event->status?->value,
                'client_ids' => $event->clients->pluck('id')->toArray(),
            ],
            'clients' => $clients,
        ]);
    }

    /**
     * Update the specified event in storage.
     */
    public function update(UpdateEventRequest $request, Event $event)
    {
        $validated = $request->validated();
        $event->update($validated);

        // Update clients
        DB::table('client_event')->where('event_id', $event->id)->delete();
        if (!empty($validated['client_ids'])) {
            foreach ($validated['client_ids'] as $clientId) {
                DB::table('client_event')->insert([
                    'id' => \Illuminate\Support\Str::uuid(),
                    'client_id' => $clientId,
                    'event_id' => $event->id,
                    'role' => 'organizer',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        return redirect(route('events.show', $event->id))
            ->with('success', 'Event updated successfully.');
    }

    /**
     * Update event status.
     */
    public function updateStatus(UpdateEventStatusRequest $request, Event $event)
    {
        $event->update(['status' => $request->validated('status')]);

        return redirect(route('events.show', $event->id))
            ->with('success', 'Event status updated successfully.');
    }

    /**
     * Remove the specified event from storage.
     */
    public function destroy(Event $event)
    {
        $event->delete();

        return redirect(route('events.index'))
            ->with('success', 'Event deleted successfully.');
    }
}
