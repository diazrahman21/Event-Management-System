<?php

use App\Http\Controllers\BudgetController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\TimelineController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect(route('login'));
});

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('events', EventController::class);
    Route::post('events/{event}/status', [EventController::class, 'updateStatus'])->name('events.updateStatus');
    
    Route::resource('clients', ClientController::class);
    
    Route::post('budgets/{budget}/items', [BudgetController::class, 'storeItem'])->name('budgets.storeItem');
    Route::patch('budget-items/{budgetItem}', [BudgetController::class, 'updateItem'])->name('budget-items.update');
    Route::delete('budget-items/{budgetItem}', [BudgetController::class, 'destroyItem'])->name('budget-items.destroy');
    
    Route::post('events/{event}/timelines', [TimelineController::class, 'store'])->name('timelines.store');
    Route::patch('timelines/{timeline}', [TimelineController::class, 'update'])->name('timelines.update');
    Route::delete('timelines/{timeline}', [TimelineController::class, 'destroy'])->name('timelines.destroy');
});

require __DIR__.'/auth.php';
