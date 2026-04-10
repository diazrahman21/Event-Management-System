<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::paginate(15);

        return inertia('Clients/Index', [
            'clients' => $clients->map(fn($client) => [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'company' => $client->company,
            ]),
        ]);
    }

    public function create()
    {
        return inertia('Clients/Create');
    }

    public function store(StoreClientRequest $request)
    {
        Client::create($request->validated());

        return redirect(route('clients.index'))
            ->with('success', 'Client created successfully.');
    }

    public function show(Client $client)
    {
        $client->load('events');

        return inertia('Clients/Show', [
            'client' => [
                'id' => $client->id,
                'name' => $client->name,
                'email' => $client->email,
                'phone' => $client->phone,
                'company' => $client->company,
                'notes' => $client->notes,
                'events' => $client->events->map(fn($e) => [
                    'id' => $e->id,
                    'title' => $e->title,
                    'start_date' => $e->start_date,
                    'status' => $e->status?->value,
                ]),
            ],
        ]);
    }

    public function edit(Client $client)
    {
        return inertia('Clients/Edit', [
            'client' => $client,
        ]);
    }

    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return redirect(route('clients.show', $client->id))
            ->with('success', 'Client updated successfully.');
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return redirect(route('clients.index'))
            ->with('success', 'Client deleted successfully.');
    }
}
