<?php

namespace Database\Seeders;

use App\Models\Budget;
use App\Models\BudgetItem;
use App\Models\Client;
use App\Models\Event;
use App\Models\Timeline;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create roles
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'staff']);

        // Create users
        $admin = User::firstOrCreate(
            ['email' => 'admin@demo.com'],
            [
                'name' => 'Admin User',
                'password' => bcrypt('password'),
            ]
        );
        $admin->assignRole('admin');

        $staff = User::firstOrCreate(
            ['email' => 'staff@demo.com'],
            [
                'name' => 'Staff User',
                'password' => bcrypt('password'),
            ]
        );
        $staff->assignRole('staff');

        // Create clients
        $clients = Client::factory(5)->create();

        // Create events with budgets and timelines
        for ($i = 0; $i < 3; $i++) {
            $event = Event::create([
                'title' => 'Event ' . ($i + 1),
                'description' => 'Description for event ' . ($i + 1),
                'location' => 'Location ' . ($i + 1),
                'start_date' => now()->addDays($i * 10),
                'end_date' => now()->addDays(($i * 10) + 2),
                'status' => ['planning', 'ongoing', 'selesai'][$i] ?? 'planning',
                'created_by' => $admin->id,
            ]);

            // Attach random clients to event
            $selectedClients = $clients->random(2)->pluck('id')->toArray();
            foreach ($selectedClients as $clientId) {
                \DB::table('client_event')->insert([
                    'id' => \Illuminate\Support\Str::uuid(),
                    'client_id' => $clientId,
                    'event_id' => $event->id,
                    'role' => 'organizer',
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            // Create budget
            $budget = Budget::create([
                'event_id' => $event->id,
                'total_planned' => 0,
                'total_actual' => 0,
            ]);

            // Create budget items
            $budgetItems = [
                ['category' => 'Venue', 'planned_amount' => 5000000],
                ['category' => 'Catering', 'planned_amount' => 3000000],
                ['category' => 'Decoration', 'planned_amount' => 2000000],
                ['category' => 'Entertainment', 'planned_amount' => 1500000],
            ];

            foreach ($budgetItems as $item) {
                BudgetItem::create([
                    'budget_id' => $budget->id,
                    'category' => $item['category'],
                    'description' => 'Budget for ' . $item['category'],
                    'planned_amount' => $item['planned_amount'],
                    'actual_amount' => rand(0, 100) % 2 == 0 ? $item['planned_amount'] * (0.9 + rand(0, 20) / 100) : 0,
                    'status' => rand(0, 100) % 3 == 0 ? 'paid' : 'pending',
                ]);
            }

            // Recalculate budget totals
            $budget->recalculateTotals();

            // Create timelines
            for ($j = 0; $j < 5; $j++) {
                Timeline::create([
                    'event_id' => $event->id,
                    'title' => 'Task ' . ($j + 1),
                    'description' => 'Description for task ' . ($j + 1),
                    'due_date' => $event->start_date->copy()->addDays($j),
                    'status' => ['pending', 'in_progress', 'done'][$j % 3],
                    'order' => $j + 1,
                    'assigned_to' => rand(0, 100) % 2 == 0 ? $staff->id : null,
                ]);
            }
        }
    }
}
