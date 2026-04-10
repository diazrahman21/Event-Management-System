<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Budget extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'event_id',
        'total_planned',
        'total_actual',
    ];

    protected $casts = [
        'total_planned' => 'decimal:2',
        'total_actual' => 'decimal:2',
    ];

    /**
     * Get the event for this budget.
     */
    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * Get the budget items for this budget.
     */
    public function items(): HasMany
    {
        return $this->hasMany(BudgetItem::class);
    }

    /**
     * Recalculate budget totals
     */
    public function recalculateTotals(): void
    {
        $this->total_planned = $this->items()->sum('planned_amount');
        $this->total_actual = $this->items()->where('status', '!=', 'cancelled')->sum('actual_amount');
        $this->save();
    }
}
